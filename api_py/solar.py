"""Vercel serverless function handler for Solar API."""
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

# Add api_py directory to path
api_py_dir = Path(__file__).parent
sys.path.insert(0, str(api_py_dir))
log_both(f"Added to path: {api_py_dir}")

try:
    log_both("Importing mangum...")
    from mangum import Mangum
    log_both("Mangum imported successfully")
    
    log_both("Importing solar.app...")
    from solar.app import app
    log_both("Solar app imported successfully")
    
    log_both("Creating Mangum handler...")
    handler = Mangum(app, lifespan="off")
    log_both("=== HANDLER CREATED SUCCESSFULLY ===")
    log_both("=" * 60)
    
except Exception as e:
    log_both("=" * 60)
    log_both("=== ERROR INITIALIZING HANDLER ===")
    log_both(f"Error type: {type(e).__name__}")
    log_both(f"Error message: {str(e)}")
    import traceback
    log_both(f"Traceback:\n{traceback.format_exc()}")
    log_both("=" * 60)
    raise

