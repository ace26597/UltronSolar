# API Directory Structure

This directory contains Vercel serverless function entry points.

## Structure

- `api/` - Vercel serverless function entry points (Python)
- `api_py/` - Python application code (FastAPI app, services, models)

## How It Works

1. **Entry Points** (`api/`):
   - `api/solar/index.py` - Exports FastAPI ASGI app for solar simulation API (handles all `/api/solar/*` routes)
   - `api/test.py` - Simple test endpoint

2. **Application Code** (`api_py/`):
   - `api_py/solar/app.py` - Main FastAPI application
   - `api_py/solar/models.py` - Pydantic models
   - `api_py/solar/services/` - Business logic (image processing, calculations)
   - `api_py/solar_jobs_store.py` - Job storage

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
