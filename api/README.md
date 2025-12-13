# API Directory Structure

This directory contains all Python code for Vercel serverless functions.

## Structure

All Python code is in the `api/` directory so Vercel can detect and deploy it:

- `api/solar/index.py` - Entry point that exports FastAPI ASGI app (handles all `/api/solar/*` routes)
- `api/solar/app.py` - Main FastAPI application
- `api/solar/models.py` - Pydantic models
- `api/solar/services/` - Business logic (image processing, calculations)
  - `image_service.py` - OpenAI image processing
  - `calculation_service.py` - Solar system calculations
- `api/solar_jobs_store.py` - In-memory job storage
- `api/test.py` - Simple test endpoint

## Request Flow

1. Frontend calls `/python/solar/jobs` (POST)
2. `vercel.json` rewrites to `/api/solar` (single Python function)
3. Vercel executes `api/solar/index.py` (ASGI app export)
4. The ASGI wrapper strips `/python/solar` from the incoming path
5. FastAPI matches routes like `@app.post("/jobs")`

## Notes

- Vercel rewrites keep the browser URL the same (e.g. `/python/solar/jobs`)
- The function receives that original path, so we strip the public prefix in `api/solar/index.py`
