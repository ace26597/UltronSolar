# Debugging Guide for Solar API 405/500 Errors

## Current Issue
- `/api/test` returns 500 Internal Server Error (Next.js error page)
- `/api/solar/jobs` returns 405 Method Not Allowed
- Both suggest Python functions aren't being recognized by Vercel

## What We've Done

1. ✅ Created `api/test.py` - Simple test handler
2. ✅ Added `requirements.txt` in root directory
3. ✅ Added `api/runtime.txt` with Python version
4. ✅ Updated `vercel.json` to include Python functions
5. ✅ Fixed handler format to use `event, context` parameters
6. ✅ Added comprehensive logging

## Next Steps to Debug

### 1. Check Vercel Function Logs
Go to Vercel Dashboard → Your Project → Functions tab → Look for `api/test` or `api/solar`

**What to look for:**
- Do you see initialization logs? (`=== TEST HANDLER INITIALIZING ===`)
- Are there any import errors?
- Is the function being invoked at all?

### 2. Check Build Logs
Go to Vercel Dashboard → Your Project → Deployments → Latest deployment → Build Logs

**What to look for:**
- Are Python dependencies being installed?
- Are there any Python-related errors?
- Is `requirements.txt` being found?

### 3. Test Directly
Try accessing the function directly:
- `https://www.ultronsolar.in/api/test`
- `https://www.ultronsolar.in/api/solar`

**Expected:**
- If Python function works: JSON response
- If Next.js catches it: HTML error page (current behavior)

### 4. Verify File Structure
Ensure these files exist:
- `api/test.py` (with `handler` function)
- `api/solar.py` (with `handler` variable)
- `requirements.txt` (in root)
- `api/runtime.txt` (optional, but helps)

### 5. Check Vercel Configuration
In `vercel.json`, ensure:
```json
{
  "functions": {
    "api/test.py": {
      "maxDuration": 10
    },
    "api/solar.py": {
      "maxDuration": 60
    }
  }
}
```

## Possible Issues

1. **Next.js Taking Precedence**: Next.js routes in `src/app/api/` might be catching requests before Python functions
2. **Python Not Detected**: Vercel might not be detecting Python files
3. **Build Issue**: Python dependencies might not be installing
4. **Handler Format**: Handler might not match Vercel's expected format

## Solutions to Try

### Solution 1: Use Different Path
If Next.js is catching `/api/*`, try using a different base path:
- Change to `/python-api/test` or `/serverless/test`
- Update `vercel.json` rewrites if needed

### Solution 2: Check Python Detection
Ensure Vercel detects Python:
- File should be in `api/` directory
- Should have `.py` extension
- Should export `handler` function

### Solution 3: Verify Requirements
Check if `requirements.txt` is being read:
- Should be in root directory
- Should list all dependencies
- Vercel should install them during build

### Solution 4: Check Environment Variables
Ensure all required env vars are set in Vercel:
- `OPENAI_API_KEY`
- `OPENAI_IMAGE_MODEL` (optional)
- `OPENAI_MODEL_NAME` (optional)

## Current Handler Format

```python
def handler(event, context=None):
    # event is a dict with httpMethod, path, headers, body, etc.
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({...})
    }
```

This matches Vercel's expected format for Python serverless functions.

