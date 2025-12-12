"""FastAPI application for Solar Simulation API."""
import os
import sys
import base64
import uuid
import json
import logging
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Add parent directory to path for imports
api_dir = Path(__file__).parent.parent
sys.path.insert(0, str(api_dir))

# Import shared jobs store
from solar_jobs_store import jobs

# Import solar API modules
from solar.models import SolarMeta, SolarJobResponse, SolarJobStatus, SolarRunRequest
from solar.services.image_service import ImageService
from solar.services.calculation_service import calculate_system_specs

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
    logger.info(f"=== INCOMING REQUEST ===")
    logger.info(f"Method: {request.method}")
    logger.info(f"URL: {request.url}")
    logger.info(f"Path: {request.url.path}")
    logger.info(f"Headers: {dict(request.headers)}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize image service
image_service = None
try:
    image_service = ImageService()
except ValueError as e:
    logger.warning(f"ImageService initialization failed: {e}. Some endpoints may not work.")


@app.post("/api/solar/jobs", response_model=SolarJobResponse)
async def create_solar_job(
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
    logger.info("=== CREATE SOLAR JOB ENDPOINT CALLED ===")
    logger.info(f"Request received - image filename: {image.filename}, content_type: {image.content_type}")
    logger.info(f"Meta data: {meta}")
    try:
        # Parse metadata
        try:
            meta_dict = json.loads(meta)
            solar_meta = SolarMeta(**meta_dict)
        except (json.JSONDecodeError, ValueError) as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid metadata format: {str(e)}"
            )
        
        # Read and encode image
        image_bytes = await image.read()
        img_b64 = base64.b64encode(image_bytes).decode("utf-8")
        
        # Create job
        job_id = str(uuid.uuid4())
        jobs[job_id] = {
            "status": "queued",
            "meta": meta_dict,
            "image_b64": img_b64,
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
            detail=f"Failed to create job: {str(e)}"
        )


@app.post("/api/solar/jobs/{job_id}/run", response_model=SolarJobResponse)
async def run_solar_job(job_id: str):
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
        
        # Update status to processing
        job["status"] = "processing"
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
        
        # Process image (two-pass: cleanup + add panels)
        try:
            final_image_b64 = image_service.process_solar_simulation(
                image_b64,
                system_specs
            )
            
            # Update job with result
            job["output_b64"] = final_image_b64
            job["status"] = "done"
            
            logger.info(f"Job {job_id} completed successfully")
            
            return SolarJobResponse(
                jobId=job_id,
                status="done"
            )
        
        except Exception as e:
            # Update job with error
            error_msg = str(e)
            job["status"] = "error"
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


@app.get("/api/solar/jobs/{job_id}", response_model=SolarJobStatus)
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
            status=job["status"]
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


@app.get("/api/solar")
async def root():
    """Root endpoint for debugging."""
    return {
        "service": "solar-simulation-api",
        "version": "2.0.0",
        "endpoints": {
            "POST /api/solar/jobs": "Create a solar simulation job",
            "POST /api/solar/jobs/{job_id}/run": "Process a solar simulation job",
            "GET /api/solar/jobs/{job_id}": "Get job status",
            "GET /api/solar/health": "Health check"
        }
    }

@app.get("/api/solar/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "solar-simulation-api",
        "image_service_available": image_service is not None
    }


# Vercel serverless handler
def handler(request):
    """Vercel serverless function handler."""
    from mangum import Mangum
    asgi_handler = Mangum(app)
    return asgi_handler(request)

