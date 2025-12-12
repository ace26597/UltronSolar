from pydantic import BaseModel
from typing import Optional, Dict, List, Any


class ChatRequest(BaseModel):
    message: str
    session_id: str
    metadata: Optional[Dict[str, Any]] = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    sources: List[Dict[str, Any]] = []


class HealthResponse(BaseModel):
    status: str
    message: str


# Solar simulation models
class SolarMeta(BaseModel):
    """Metadata for solar installation simulation."""
    kW: Optional[float] = None
    bill: Optional[float] = None
    notes: Optional[str] = None
    extra: Optional[Dict[str, Any]] = None


class SolarJobRequest(BaseModel):
    """Request to create a solar simulation job."""
    meta: SolarMeta
    # Note: image_file would be handled separately as UploadFile in FastAPI


class SolarJobResponse(BaseModel):
    """Response from creating a solar simulation job."""
    jobId: str
    status: str  # queued, processing, done, error


class SolarJobStatus(BaseModel):
    """Status of a solar simulation job."""
    jobId: str
    status: str  # queued, processing, done, error
    resultImage: Optional[str] = None  # base64 encoded image
