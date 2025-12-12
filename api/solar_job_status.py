import json
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler

# Import shared jobs store
from solar_jobs_store import jobs


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse query string
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            job_id = query_params.get('jobId', [None])[0]

            if not job_id:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "jobId required"
                }).encode('utf-8'))
                return

            # Get job status
            job = jobs.get(job_id)
            if not job:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "unknown jobId"
                }).encode('utf-8'))
                return

            # Return job status
            response = {
                "jobId": job_id,
                "status": job["status"],
            }

            # Include result image if available
            if job.get("output_b64"):
                response["resultImage"] = job["output_b64"]

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))

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
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

