"""
Shared in-memory job store for solar simulation jobs.
In production, replace with Redis, Vercel KV, or a database.
"""
from typing import Dict, Any

jobs: Dict[str, Dict[str, Any]] = {}
