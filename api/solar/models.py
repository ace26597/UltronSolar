"""Pydantic models for Solar API."""
from pydantic import BaseModel
from typing import Optional, Dict, Any


class SolarMeta(BaseModel):
    """Metadata for solar installation simulation."""
    kW: Optional[float] = None
    bill: Optional[float] = None
    notes: Optional[str] = None
    extra: Optional[Dict[str, Any]] = None


class SolarJobResponse(BaseModel):
    """Response from creating a solar simulation job."""
    jobId: str
    status: str  # queued, processing, done, error


class SolarJobStatus(BaseModel):
    """Status of a solar simulation job."""
    jobId: str
    status: str  # queued, processing, done, error
    resultImage: Optional[str] = None  # base64 encoded image
    # Progress / intermediate outputs (best-effort; may not persist across serverless instances)
    step: Optional[str] = None  # analyzing, cleanup, panels, done, error
    message: Optional[str] = None
    analysis: Optional[str] = None
    cleanedImage: Optional[str] = None
    error: Optional[str] = None


class SolarRunRequest(BaseModel):
    """Request to run a solar simulation job."""
    jobId: str
