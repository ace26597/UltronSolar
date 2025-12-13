"""Vercel serverless function handler for Solar API (ASGI)."""
import sys
import os
import logging
from pathlib import Path
from typing import Callable, Awaitable, Any, Dict
from urllib.parse import parse_qs, urlencode

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

# Add api directory to path (for imports)
api_dir = Path(__file__).parent.parent
sys.path.insert(0, str(api_dir))
log_both(f"Added to path: {api_dir}")

try:
    log_both("Importing solar.app...")
    from solar.app import app as fastapi_app
    log_both("Solar app imported successfully")
    
    class _StripPrefixASGI:
        """
        Our public API paths are `/python/solar/*` but we route traffic to the
        single Vercel function mounted at `/api/solar` (index.py).

        Depending on Vercel's rewrite behavior, the ASGI scope may contain:
        - the original path (e.g. `/python/solar/jobs`), OR
        - the destination path (e.g. `/api/solar`) + a query param carrying the
          intended sub-path (e.g. `?__path=jobs`)

        This wrapper normalizes the ASGI scope path so FastAPI routes like
        `/jobs`, `/health`, etc, continue to match.
        """

        def __init__(self, inner_app, prefixes):
            self.inner_app = inner_app
            # Normalize prefixes: no trailing slash (except root)
            self.prefixes = []
            for p in prefixes:
                if not p or p == "/":
                    continue
                self.prefixes.append(p[:-1] if p.endswith("/") else p)

        async def __call__(self, scope: Dict[str, Any], receive: Callable[[], Awaitable[Any]], send: Callable[[Any], Awaitable[None]]):
            if scope.get("type") in ("http", "websocket"):
                path = scope.get("path") or ""
                query_bytes: bytes = scope.get("query_string") or b""

                new_path = None

                # Case A: scope has original path including known prefix.
                for prefix in self.prefixes:
                    if path == prefix:
                        new_path = "/"
                        break
                    if path.startswith(prefix + "/"):
                        new_path = path[len(prefix):] or "/"
                        break

                # Case B: scope only has destination path; recover intended sub-path from query.
                if new_path is None and path in ("/", "/api/solar", "/python/solar"):
                    try:
                        qs = parse_qs(query_bytes.decode("utf-8"), keep_blank_values=True)
                    except Exception:
                        qs = {}

                    forwarded = (qs.get("__path") or [None])[0]
                    if forwarded is not None:
                        forwarded = str(forwarded).lstrip("/")
                        new_path = "/" + forwarded if forwarded else "/"

                        # Remove the internal routing param so it doesn't leak into the app.
                        qs.pop("__path", None)
                        scope = dict(scope)
                        scope["query_string"] = urlencode(qs, doseq=True).encode("utf-8") if qs else b""

                if new_path is not None and new_path != path:
                    scope = dict(scope)
                    scope["path"] = new_path
                    # Keep raw_path aligned for frameworks/middleware that use it
                    scope["raw_path"] = new_path.encode("utf-8")

            return await self.inner_app(scope, receive, send)

    # Public routes are under /python/solar/* (frontend), and we also accept /api/solar/*
    # in case it's called directly.
    app = _StripPrefixASGI(fastapi_app, prefixes=["/python/solar", "/api/solar"])
    log_both("=== APP EXPORTED SUCCESSFULLY ===")
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
