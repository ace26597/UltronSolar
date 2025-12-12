import os
import base64
import json
from http.server import BaseHTTPRequestHandler
from openai import OpenAI

# Import shared jobs store
from solar_jobs_store import jobs

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_IMAGE_MODEL = os.getenv("OPENAI_IMAGE_MODEL", "dall-e-3")

client = None
if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            if not client:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "OpenAI API key not configured"
                }).encode('utf-8'))
                return

            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))

            job_id = data.get("jobId")
            if not job_id or job_id not in jobs:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "invalid jobId"
                }).encode('utf-8'))
                return

            job = jobs[job_id]
            job["status"] = "processing"

            # Get original image and metadata
            orig_b64 = job["image_b64"]
            meta = job["meta"]

            # Decode base64 image
            image_bytes = base64.b64decode(orig_b64)

            # Parse metadata
            try:
                meta_dict = json.loads(meta) if isinstance(meta, str) else meta
            except:
                meta_dict = {"notes": str(meta)}

            # Create prompt for image generation
            prompt_parts = ["A professional rooftop terrace with a solar PV array installed"]
            if meta_dict.get("kW"):
                prompt_parts.append(f"rated at {meta_dict['kW']} kW")
            if meta_dict.get("notes"):
                prompt_parts.append(f"with specifications: {meta_dict['notes']}")
            prompt_parts.append("Clean, realistic installation with proper panel layout and mounting structure")
            
            prompt = ". ".join(prompt_parts) + "."

            # Use DALL-E 3 to generate a new image based on the prompt
            # Note: DALL-E 3 doesn't support direct image editing from an input image
            # For actual image editing (adding panels to existing terrace photo), you would need:
            # 1. DALL-E 2's edit endpoint (requires mask image)
            # 2. GPT-4 Vision to analyze the image + DALL-E 3 to generate
            # 3. A two-pass approach: cleanup pass + panel installation pass
            
            # For now, we'll use DALL-E 3 to generate a new image based on the prompt
            # In production, you might want to use a two-step process:
            # 1. Use GPT-4 Vision to analyze the image
            # 2. Use DALL-E 3 to generate the final image
            
            try:
                response = client.images.generate(
                    model=OPENAI_IMAGE_MODEL,
                    prompt=prompt,
                    size="1024x1024",
                    quality="standard",
                    n=1,
                )

                # Get the generated image URL
                image_url = response.data[0].url

                # Download the image and convert to base64
                import urllib.request
                with urllib.request.urlopen(image_url) as response_img:
                    edited_bytes = response_img.read()
                    edited_b64 = base64.b64encode(edited_bytes).decode("utf-8")

                # Update job
                job["output_b64"] = edited_b64
                job["status"] = "done"

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "jobId": job_id,
                    "status": "done"
                }).encode('utf-8'))

            except Exception as e:
                job["status"] = "error"
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": f"OpenAI API error: {str(e)}"
                }).encode('utf-8'))

        except json.JSONDecodeError:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": "Invalid JSON in request body"
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

