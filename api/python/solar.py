"""Vercel serverless function handler for Solar API (ASGI)."""
import sys
import os
import logging
from pathlib import Path

# Configure logging to stdout (Vercel captures this)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    force=True
)
logger = logging.getLogger(__name__)

# Print to stderr as well (Vercel captures both)
import sys as sys_module
def log_both(message):
    logger.info(message)
    print(message, file=sys_module.stderr)

log_both("=" * 60)
log_both("=== SOLAR API HANDLER INITIALIZING ===")
log_both(f"Python version: {sys.version}")
log_both(f"Current directory: {os.getcwd()}")
log_both(f"Script path: {__file__}")
log_both(f"Python path: {sys.path}")

# Add api_py directory to path (go up from api/python to root, then to api_py)
root_dir = Path(__file__).parent.parent.parent
api_py_dir = root_dir / "api_py"
sys.path.insert(0, str(api_py_dir))
log_both(f"Added to path: {api_py_dir}")

try:
    log_both("Importing solar.app...")
    from solar.app import app as fastapi_app
    log_both("Solar app imported successfully")
    
    # Configure root_path for Vercel routing
    # When requests come to /api/python/solar/jobs, FastAPI needs to know
    # the base path is /api/python/solar to correctly match /jobs route
    fastapi_app.root_path = "/api/python/solar"
    
    # For Vercel Python runtime with ASGI (FastAPI), we export 'app' directly
    # Vercel natively supports ASGI applications, no need for Mangum wrapper
    # According to Vercel docs: "define an app variable that exposes a WSGI or ASGI Application"
    app = fastapi_app
    log_both("=== APP EXPORTED SUCCESSFULLY ===")
    log_both(f"Root path configured: {app.root_path}")
    log_both("=" * 60)
    
except Exception as e:
    log_both("=" * 60)
    log_both("=== ERROR INITIALIZING APP ===")
    log_both(f"Error type: {type(e).__name__}")
    log_both(f"Error message: {str(e)}")
    import traceback
    log_both(f"Traceback:\n{traceback.format_exc()}")
    log_both("=" * 60)
    raise

# Export app for Vercel (ASGI application)
# According to Vercel docs: "define an app variable that exposes a WSGI or ASGI Application"
__all__ = ['app']
