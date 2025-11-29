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

