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
2. `vercel.json` rewrites to `/api/solar/jobs`
3. Vercel calls `api/solar.py` serverless function
4. Vercel strips `/api/solar` prefix and passes `/jobs` to FastAPI
5. FastAPI matches `@app.post("/jobs")` route

## Notes

- Vercel automatically strips the `/api/` prefix when calling serverless functions
- FastAPI routes are defined relative to the function path (e.g., `/jobs` not `/api/solar/jobs`)
- No `root_path` configuration needed - Vercel handles path stripping automatically
