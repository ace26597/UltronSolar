"""Vercel Python runtime test endpoint.

Vercel's Python Serverless Functions expect a `BaseHTTPRequestHandler` subclass
named `handler`.
"""

import json
import sys
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code: int, payload: dict):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type,Authorization")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        # CORS preflight
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type,Authorization")
        self.end_headers()

    def do_GET(self):
        # Helpful debug signals in Vercel logs
        print("TEST HANDLER CALLED", flush=True)
        print(f"Python version: {sys.version}", flush=True)
        print(f"Request path: {getattr(self, 'path', 'unknown')}", flush=True)

        self._send_json(
            200,
            {
                "message": "Test handler working!",
                "python_version": sys.version.split()[0],
                "status": "success",
                "path": getattr(self, "path", None),
            },
        )
