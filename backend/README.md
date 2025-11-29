# Ultron Solar Chat API Backend

FastAPI backend for LLM-powered chat widget on the Ultron Solar website.

## Features

- OpenAI GPT integration for conversational AI
- Session-based conversation memory
- CORS-enabled for Next.js frontend
- Extensible architecture for future RAG (MongoDB Atlas vector search)

## Setup

### Prerequisites

- Python 3.9+
- OpenAI API key

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
OPENAI_MODEL_NAME=gpt-4o-mini
ALLOWED_ORIGINS=http://localhost:3000,https://www.ultronsolar.in,https://ultronsolar.vercel.app
```

## Running Locally

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "Chat API is running"
}
```

### POST /chat
Main chat endpoint.

**Request:**
```json
{
  "message": "What is the price of a 3kW solar system?",
  "session_id": "session_123456",
  "metadata": {
    "page": "/",
    "lang": "en",
    "utm_source": "google"
  }
}
```

**Response:**
```json
{
  "reply": "A 3kW solar system typically costs between ₹1.8-2.2 Lakh before subsidy...",
  "session_id": "session_123456",
  "sources": []
}
```

## Deployment

This backend can be deployed to any PaaS that supports Python:

### Render
1. Connect your GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
4. Add environment variables in Render dashboard

### Fly.io
1. Install flyctl: `curl -L https://fly.io/install.sh | sh`
2. Run: `fly launch`
3. Set secrets: `fly secrets set OPENAI_API_KEY=sk-...`

### Railway
1. Connect GitHub repository
2. Railway will auto-detect Python
3. Add environment variables in Railway dashboard

## Environment Variables

- `OPENAI_API_KEY` (required): Your OpenAI API key
- `OPENAI_MODEL_NAME` (optional): Model to use, default: `gpt-4o-mini`
- `ALLOWED_ORIGINS` (required): Comma-separated list of allowed CORS origins
- `PORT` (optional): Server port, default: 8000
- `HOST` (optional): Server host, default: 0.0.0.0

## Future Enhancements

- MongoDB Atlas vector search integration for RAG
- Rate limiting
- Authentication/API keys
- Analytics and logging
- Streaming responses

## Project Structure

```
backend/
  app.py                    # FastAPI application
  models.py                 # Pydantic models
  services/
    openai_client.py        # OpenAI API wrapper
    chat_service.py         # Chat orchestration with memory
    retrieval_service.py    # RAG stub (future MongoDB integration)
  requirements.txt
  .env.example
  README.md
```

