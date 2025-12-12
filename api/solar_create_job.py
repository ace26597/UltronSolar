import os
import base64
import uuid
from typing import Dict
from http.server import BaseHTTPRequestHandler
import json
import cgi
import io

# Import shared jobs store
from solar_jobs_store import jobs

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Parse content type
            content_type = self.headers.get('Content-Type', '')
            
            if not content_type.startswith('multipart/form-data'):
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "Content-Type must be multipart/form-data"
                }).encode('utf-8'))
                return

            # Parse multipart form data
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={'REQUEST_METHOD': 'POST'}
            )

            # Get image file and metadata
            image_field = form.getfirst('image')
            meta = form.getfirst('meta')

            if not image_field or not meta:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "Missing image or meta"
                }).encode('utf-8'))
                return

            # Handle file upload - FieldStorage object
            if hasattr(image_field, 'file'):
                # It's a file upload with file attribute
                image_field.file.seek(0)
                img_bytes = image_field.file.read()
            elif hasattr(image_field, 'value'):
                # It's a FieldStorage with value attribute
                img_bytes = image_field.value if isinstance(image_field.value, bytes) else image_field.value.encode('utf-8')
            elif isinstance(image_field, bytes):
                # It's already bytes
                img_bytes = image_field
            else:
                # Try to convert to bytes
                img_bytes = str(image_field).encode('utf-8')

            # Encode to base64
            img_b64 = base64.b64encode(img_bytes).decode("utf-8")

            # Create job
            job_id = str(uuid.uuid4())
            jobs[job_id] = {
                "status": "queued",
                "meta": meta,
                "image_b64": img_b64,
                "output_b64": None,
            }

            # Return job ID
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                "jobId": job_id,
                "status": "queued"
            }).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": str(e)
            }).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

