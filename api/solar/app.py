"""FastAPI application for Solar Simulation API."""
import os
import sys
import base64
import uuid
import json
import logging
from pathlib import Path
from typing import Optional

import time
from collections import OrderedDict

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Import shared jobs store (from parent api directory)
import sys as sys_module
api_dir = Path(__file__).parent.parent
sys_module.path.insert(0, str(api_dir))

from solar_jobs_store import jobs

# Import solar API modules using relative imports
from .models import SolarMeta, SolarJobResponse, SolarJobStatus, SolarRunRequest
from .services.image_service import ImageService
from .services.calculation_service import calculate_system_specs

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Ultron Solar Simulation API",
    description="API for solar panel simulation on terrace images",
    version="2.0.0"
)

# Add request logging middleware
@app.middleware("http")
async def log_requests(request, call_next):
    request_id = str(uuid.uuid4())
    logger.info("=" * 60)
    logger.info("=== INCOMING REQUEST ===")
    logger.info(f"Request ID: {request_id}")
    logger.info(f"Method: {request.method}")
    logger.info(f"URL: {str(request.url)}")
    logger.info(f"Path: {request.url.path}")
    # Starlette Request exposes parsed query params on request.query_params
    logger.info(f"Query params: {dict(request.query_params)}")
    logger.info(f"Headers: {dict(request.headers)}")
    try:
        response = await call_next(request)
        logger.info(f"Response status: {response.status_code}")
        logger.info(f"Request ID: {request_id} completed")
        logger.info("=" * 60)
        return response
    except Exception as e:
        logger.error(f"=== ERROR IN MIDDLEWARE ===")
        logger.error(f"Request ID: {request_id}")
        logger.error(f"Error: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        # Ensure client gets JSON (Vercel otherwise may show plain text 500)
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "requestId": request_id,
            },
        )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request, exc):
    """
    Final catch-all so we always respond with JSON + a requestId.
    This makes debugging on Vercel much easier than the generic 'Internal Server Error'.
    """
    request_id = str(uuid.uuid4())
    logger.error("=== UNHANDLED EXCEPTION ===")
    logger.error(f"Request ID: {request_id}")
    logger.error(f"Path: {request.url.path} Method: {request.method}")
    import traceback
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "requestId": request_id,
        },
    )

# ---------------------------------------------------------------------------
# Abuse limits. These endpoints are public and unauthenticated, and one run
# makes three paid OpenAI calls (one vision analysis, two image edits).
# ---------------------------------------------------------------------------

# Origins allowed to call this API from a browser: the site itself. The page
# calls /python/solar on its own origin, so it needs no CORS at all; this list
# only decides which *other* sites' pages may read responses. Extra origins
# (for example a preview domain) can be added with SOLAR_ALLOWED_ORIGINS, a
# comma-separated list. CORS is enforced by browsers only - it does not stop a
# script or curl, which is why the limits below exist as well.
SITE_ORIGINS = [
    "https://www.ultronsolar.in",
    "https://ultronsolar.in",
]


def _allowed_origins() -> list:
    origins = list(SITE_ORIGINS)
    for value in os.getenv("SOLAR_ALLOWED_ORIGINS", "").split(","):
        value = value.strip().rstrip("/")
        if value.startswith("https://") or value.startswith("http://localhost"):
            origins.append(value)
    # Vercel sets VERCEL_URL to the deployment's own hostname (previews included).
    vercel_url = os.getenv("VERCEL_URL", "").strip()
    if vercel_url:
        origins.append(f"https://{vercel_url}")
    return sorted(set(origins))


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins(),
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Set SOLAR_SIMULATION_DISABLED=1 in Vercel to switch the paid endpoints off
# without a code change (job creation and job runs then answer 503).
SIMULATION_DISABLED = os.getenv("SOLAR_SIMULATION_DISABLED", "").strip().lower() in ("1", "true", "yes")

MAX_IMAGE_BYTES = int(4.5 * 1024 * 1024)  # Vercel refuses larger request bodies anyway
MAX_META_CHARS = 2000
MAX_NOTES_CHARS = 500
MAX_STORED_JOBS = 20  # each job holds up to three base64 images in memory

# Best-effort, in-memory, per-IP rate limits. They live in one serverless
# instance and vanish when it is recycled, and parallel instances each keep
# their own count - so this slows casual abuse, it is not a spending
# guarantee. The durable limit belongs in Vercel Firewall (a rate-limit rule
# on /python/*) plus a monthly budget cap at OpenAI, both set by the owner.
CREATE_LIMIT = (10, 60 * 60)  # job creations per IP per hour
RUN_LIMIT = (5, 60 * 60)      # paid runs per IP per hour
_rate_buckets: "OrderedDict[str, list]" = OrderedDict()
_MAX_RATE_BUCKETS = 2000


def _client_ip(request: Request) -> str:
    """The caller's IP as set by Vercel (it overwrites these headers itself)."""
    forwarded = (
        request.headers.get("x-vercel-forwarded-for")
        or request.headers.get("x-real-ip")
        or request.headers.get("x-forwarded-for")
        or ""
    )
    first = forwarded.split(",")[0].strip()
    return first[:64] or "unknown"


def _enforce_rate_limit(scope: str, request: Request, limit: tuple) -> None:
    max_hits, window_seconds = limit
    now = time.time()
    key = f"{scope}:{_client_ip(request)}"
    bucket = _rate_buckets.get(key)
    if bucket is None or bucket[1] <= now:
        if len(_rate_buckets) >= _MAX_RATE_BUCKETS:
            _rate_buckets.popitem(last=False)
        bucket = [0, now + window_seconds]
        _rate_buckets[key] = bucket
    bucket[0] += 1
    if bucket[0] > max_hits:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later.",
            headers={"Retry-After": str(max(1, int(bucket[1] - now)))},
        )


def _require_enabled() -> None:
    if SIMULATION_DISABLED:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Solar simulation is not available right now.",
        )


def _sniff_image_type(data: bytes) -> Optional[str]:
    """Identify the upload from its first bytes instead of the declared type."""
    if data[:3] == b"\xff\xd8\xff":
        return "image/jpeg"
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None

# Initialize image service
image_service = None
try:
    image_service = ImageService()
except ValueError as e:
    logger.warning(f"ImageService initialization failed: {e}. Some endpoints may not work.")


@app.post("/jobs", response_model=SolarJobResponse)
async def create_solar_job(
    request: Request,
    image: UploadFile = File(...),
    meta: str = Form(...)
):
    """
    Create a new solar simulation job.
    
    Args:
        image: Terrace photo file
        meta: JSON string with SolarMeta (kW, bill, notes, extra)
    
    Returns:
        Job ID and initial status
    """
    logger.info("=" * 50)
    logger.info("=== CREATE SOLAR JOB ENDPOINT CALLED ===")
    logger.info(f"Image filename: {image.filename}")
    logger.info(f"Image content_type: {image.content_type}")
    logger.info(f"Meta data length: {len(meta)}")
    _require_enabled()
    _enforce_rate_limit("create", request, CREATE_LIMIT)
    try:
        # Parse metadata
        if len(meta) > MAX_META_CHARS:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Metadata is too large."
            )
        try:
            meta_dict = json.loads(meta)
            if not isinstance(meta_dict, dict):
                raise ValueError("metadata must be an object")
            solar_meta = SolarMeta(**meta_dict)
        except (json.JSONDecodeError, ValueError, TypeError):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid metadata format."
            )

        if solar_meta.kW is not None and not (0 < solar_meta.kW <= 1000):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="kW is out of range.")
        if solar_meta.bill is not None and not (0 < solar_meta.bill <= 100_000_000):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="bill is out of range.")

        # Keep only the fields this API uses, with bounded text.
        meta_dict = {
            "kW": solar_meta.kW,
            "bill": solar_meta.bill,
            "notes": (solar_meta.notes or "")[:MAX_NOTES_CHARS] or None,
        }

        # Read the image, refusing anything over the size limit or not an image
        image_bytes = await image.read(MAX_IMAGE_BYTES + 1)
        if len(image_bytes) > MAX_IMAGE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Image is too large. Please upload a photo smaller than 4.5 MB."
            )
        if _sniff_image_type(image_bytes) is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported image. Please upload a JPG, PNG or WebP photo."
            )
        img_b64 = base64.b64encode(image_bytes).decode("utf-8")

        # Bound the in-memory store: drop the oldest jobs first.
        while len(jobs) >= MAX_STORED_JOBS:
            jobs.pop(next(iter(jobs)))

        # Create job
        job_id = str(uuid.uuid4())
        jobs[job_id] = {
            "status": "queued",
            "step": "queued",
            "message": "Queued",
            "meta": meta_dict,
            "image_b64": img_b64,
            "analysis": None,
            "cleaned_b64": None,
            "output_b64": None,
            "error": None
        }
        
        logger.info(f"Created job {job_id} with status: queued")
        
        return SolarJobResponse(
            jobId=job_id,
            status="queued"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating job: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create job."
        )


@app.post("/jobs/{job_id}/run", response_model=SolarJobResponse)
async def run_solar_job(job_id: str, request: Request):
    """
    Process a solar simulation job.
    
    Args:
        job_id: Job ID from create_solar_job
    
    Returns:
        Updated job status
    """
    try:
        # Check if job exists
        if job_id not in jobs:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        
        job = jobs[job_id]

        _require_enabled()

        # Check if already processing or done
        if job["status"] == "processing":
            return SolarJobResponse(jobId=job_id, status="processing")
        
        if job["status"] == "done":
            return SolarJobResponse(jobId=job_id, status="done")
        
        if job["status"] == "error":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Job failed previously: {job.get('error', 'Unknown error')}"
            )
        
        # Check if image service is available
        if not image_service:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Image processing service not available"
            )
        
        # Count this paid run against the caller only once it will really start
        _enforce_rate_limit("run", request, RUN_LIMIT)

        # Update status to processing
        job["status"] = "processing"
        job["step"] = "analyzing"
        job["message"] = "Analyzing terrace image..."
        job["error"] = None
        
        logger.info(f"Processing job {job_id}...")
        
        # Get image and metadata
        image_b64 = job["image_b64"]
        meta_dict = job["meta"]
        
        # Calculate system specifications
        system_specs = calculate_system_specs(
            kw=meta_dict.get("kW"),
            bill=meta_dict.get("bill")
        )
        
        # Process image (analyze -> cleanup -> add panels) and write intermediate outputs
        try:
            # Step 1: Analyze
            analysis = image_service.analyze_image(image_b64, system_specs)
            analysis_text = analysis.get("analysis")
            job["analysis"] = analysis_text

            cleanup_instructions = analysis_text or "Remove all people, temporary items, and clutter from the terrace."
            panel_layout = analysis_text or f"Install {system_specs.get('panel_count', 'N/A')} panels in optimal locations."

            # Step 2: Cleanup
            job["step"] = "cleanup"
            job["message"] = "Cleaning up terrace image..."
            cleaned_image_b64 = image_service.cleanup_image(image_b64, cleanup_instructions)
            job["cleaned_b64"] = cleaned_image_b64

            # Step 3: Add panels
            job["step"] = "panels"
            job["message"] = "Adding solar panels..."
            final_image_b64 = image_service.add_solar_panels(cleaned_image_b64, panel_layout, system_specs)
            
            # Update job with result
            job["output_b64"] = final_image_b64
            job["status"] = "done"
            job["step"] = "done"
            job["message"] = "Completed"
            
            logger.info(f"Job {job_id} completed successfully")
            
            return SolarJobResponse(
                jobId=job_id,
                status="done"
            )
        
        except Exception as e:
            # Update job with error
            error_msg = str(e)
            job["status"] = "error"
            job["step"] = "error"
            job["message"] = "Failed"
            job["error"] = error_msg
            
            logger.error(f"Job {job_id} failed: {error_msg}")
            
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Image processing failed: {error_msg}"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing job {job_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process job: {str(e)}"
        )


@app.get("/jobs/{job_id}", response_model=SolarJobStatus)
async def get_solar_job_status(job_id: str):
    """
    Get the status of a solar simulation job.
    
    Args:
        job_id: Job ID from create_solar_job
    
    Returns:
        Job status and result image if available
    """
    try:
        # Check if job exists
        if job_id not in jobs:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        
        job = jobs[job_id]
        
        response = SolarJobStatus(
            jobId=job_id,
            status=job["status"],
            step=job.get("step"),
            message=job.get("message"),
            analysis=job.get("analysis"),
            cleanedImage=job.get("cleaned_b64"),
            error=job.get("error"),
        )
        
        # Include result image if available
        if job.get("output_b64"):
            response.resultImage = job["output_b64"]
        
        return response
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting job status {job_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get job status: {str(e)}"
        )


@app.get("/")
async def root():
    """Root endpoint for debugging."""
    logger.info("=== ROOT ENDPOINT CALLED ===")
    routes_info = []
    for route in app.routes:
        if hasattr(route, 'path') and hasattr(route, 'methods'):
            routes_info.append({
                "path": route.path,
                "methods": list(route.methods)
            })
    
    return {
        "service": "solar-simulation-api",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "POST /jobs": "Create a solar simulation job",
            "POST /jobs/{job_id}/run": "Process a solar simulation job",
            "GET /jobs/{job_id}": "Get job status",
            "GET /health": "Health check"
        },
        "registered_routes": routes_info,
        "image_service_available": image_service is not None
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "solar-simulation-api",
        "image_service_available": image_service is not None
    }

# Catch-all route for debugging (must be last, after all specific routes)
@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def catch_all_solar(path: str, request):
    """Catch-all route for paths that don't match specific routes."""
    logger.error(f"=== CATCH-ALL ROUTE HIT ===")
    logger.error(f"Path: {path}")
    logger.error(f"Method: {request.method}")
    logger.error(f"Full URL: {request.url}")
    logger.error(f"Available routes: {[route.path for route in app.routes if hasattr(route, 'path')]}")
    
    return JSONResponse(
        status_code=404,
        content={
            "error": "Route not found",
            "requested_path": f"/{path}",
            "method": request.method,
            "available_routes": [{"path": route.path, "methods": list(route.methods)} for route in app.routes if hasattr(route, 'path') and hasattr(route, 'methods')]
        }
    )
