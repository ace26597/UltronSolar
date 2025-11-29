from typing import List, Dict, Optional
from services.openai_client import OpenAIChatService
from services.retrieval_service import RetrievalService


class MemoryStore:
    """In-memory storage for conversation history per session."""
    
    def __init__(self, max_messages: int = 15):
        self.sessions: Dict[str, List[Dict[str, str]]] = {}
        self.max_messages = max_messages
    
    def add_message(self, session_id: str, role: str, content: str):
        """Add a message to the session history."""
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        
        self.sessions[session_id].append({
            "role": role,
            "content": content
        })
        
        # Keep only last max_messages
        if len(self.sessions[session_id]) > self.max_messages:
            self.sessions[session_id] = self.sessions[session_id][-self.max_messages:]
    
    def get_history(self, session_id: str) -> List[Dict[str, str]]:
        """Get conversation history for a session."""
        return self.sessions.get(session_id, [])
    
    def clear_session(self, session_id: str):
        """Clear conversation history for a session."""
        if session_id in self.sessions:
            del self.sessions[session_id]


class ChatService:
    """Main chat service that orchestrates OpenAI calls with memory and RAG."""
    
    def __init__(self):
        self.openai_client = OpenAIChatService()
        self.retrieval_service = RetrievalService()
        self.memory_store = MemoryStore(max_messages=15)
    
    def process_message(
        self,
        message: str,
        session_id: str
    ) -> str:
        """
        Process a user message and return assistant response.
        
        Args:
            message: User's message
            session_id: Session identifier for conversation history
        
        Returns:
            Assistant's response text
        """
        # Add user message to history
        self.memory_store.add_message(session_id, "user", message)
        
        # Retrieve context (for future RAG)
        context_docs = self.retrieval_service.retrieve_context(message)
        
        # Get conversation history
        history = self.memory_store.get_history(session_id)
        
        # Generate response
        response = self.openai_client.generate_response(
            messages=history,
            context_docs=context_docs
        )
        
        # Add assistant response to history
        self.memory_store.add_message(session_id, "assistant", response)
        
        return response

