"""Vercel serverless function handler for Solar API."""
import sys
from pathlib import Path

# Add api directory to path
api_dir = Path(__file__).parent
sys.path.insert(0, str(api_dir))

from mangum import Mangum
from solar.app import app

# Create ASGI handler for Vercel
handler = Mangum(app, lifespan="off")

