import os
import sys
from pathlib import Path

# Add backend directory to path for imports
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import ChatRequest, ChatResponse, HealthResponse
from services.chat_service import ChatService

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Ultron Solar Chat API",
    description="LLM-powered chat API for Ultron Power Systems",
    version="1.0.0"
)

# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize chat service
chat_service = ChatService()


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        message="Chat API is running"
    )


@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Main chat endpoint that processes user messages and returns AI responses.
    
    Request body:
    - message: User's message text
    - session_id: Session identifier for conversation history
    - metadata: Optional metadata (page, lang, utm_source, etc.)
    
    Returns:
    - reply: Assistant's response
    - session_id: Same session ID
    - sources: List of source documents (empty for now, future RAG)
    """
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if not request.session_id:
            raise HTTPException(status_code=400, detail="Session ID is required")
        
        # Process message through chat service
        reply = chat_service.process_message(
            message=request.message,
            session_id=request.session_id
        )
        
        return ChatResponse(
            reply=reply,
            session_id=request.session_id,
            sources=[]  # Empty for now, will be populated with RAG
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port)

