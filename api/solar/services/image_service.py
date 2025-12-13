"""Service for image editing using OpenAI's gpt-image-1 model."""
import os
import base64
import time
import logging
from typing import Optional, Tuple
from openai import OpenAI
from io import BytesIO

logger = logging.getLogger(__name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_SOLAR_IMAGE_MODEL = os.getenv("OPENAI_SOLAR_IMAGE_MODEL", os.getenv("OPENAI_IMAGE_MODEL", "gpt-image-1"))
OPENAI_SOLAR_ANALYSIS_MODEL = os.getenv("OPENAI_SOLAR_ANALYSIS_MODEL", os.getenv("OPENAI_MODEL_NAME", "gpt-5.2"))

# Retry configuration
MAX_RETRIES = 3
RETRY_DELAY = 1  # seconds
TIMEOUT = 60  # seconds for Vercel serverless


class ImageService:
    """Service for processing images with OpenAI models."""
    
    def __init__(self):
        if not OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        
        self.client = OpenAI(api_key=OPENAI_API_KEY)
        self.image_model = OPENAI_SOLAR_IMAGE_MODEL
        self.analysis_model = OPENAI_SOLAR_ANALYSIS_MODEL

    @staticmethod
    def _uses_max_completion_tokens(model_name: str) -> bool:
        """
        Some newer/reasoning models (e.g. GPT-5 / o-series) reject `max_tokens`
        and require `max_completion_tokens` instead.
        """
        name = (model_name or "").lower()
        return name.startswith("gpt-5") or name.startswith("o1") or name.startswith("o3") or name.startswith("o4")

    @staticmethod
    def _supports_sampling_params(model_name: str) -> bool:
        """
        Some models only support default sampling params (e.g. temperature must be default).
        For those, we should omit temperature/top_p/etc entirely.
        """
        name = (model_name or "").lower()
        return not (name.startswith("gpt-5") or name.startswith("o1") or name.startswith("o3") or name.startswith("o4"))
    
    def _retry_with_backoff(self, func, *args, **kwargs):
        """Execute function with exponential backoff retry logic."""
        last_exception = None
        
        for attempt in range(MAX_RETRIES):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                last_exception = e
                # Don't retry invalid requests (bad params, etc.)
                status_code = getattr(e, "status_code", None) or getattr(e, "status", None)
                if status_code == 400:
                    raise
                if attempt < MAX_RETRIES - 1:
                    delay = RETRY_DELAY * (2 ** attempt)  # Exponential backoff
                    logger.warning(f"Attempt {attempt + 1} failed: {str(e)}. Retrying in {delay}s...")
                    time.sleep(delay)
                else:
                    logger.error(f"All {MAX_RETRIES} attempts failed: {str(e)}")
        
        raise last_exception
    
    def analyze_image(self, image_b64: str, system_specs: dict) -> dict:
        """
        Analyze terrace image using GPT-5.2 Vision to understand layout and generate editing instructions.
        
        Args:
            image_b64: Base64 encoded image
            system_specs: System specifications from calculation_service
        
        Returns:
            Dictionary with analysis results and editing instructions
        """
        try:
            # Decode base64 to bytes
            image_bytes = base64.b64decode(image_b64)
            
            # Create analysis prompt
            prompt = f"""Analyze this rooftop terrace image and provide detailed information for solar panel installation.

System Requirements:
- Required System Size: {system_specs.get('kw', 'N/A')} kW
- Number of Panels: {system_specs.get('panel_count', 'N/A')}
- Required Area: {system_specs.get('terrace_area', 'N/A')} m²
- Panel Dimensions: {system_specs.get('panel_dimensions', 'N/A')} meters (L x W)

Please analyze:
1. Current terrace layout and obstacles (water tanks, AC units, structures, etc.)
2. Available space for solar panels
3. Optimal panel placement locations
4. Items that need to be removed or relocated (people, temporary items, clutter)
5. Best orientation for panels (typically south-facing in India)

Provide a detailed analysis in JSON format with:
- available_area: estimated available area in m²
- obstacles: list of obstacles and their locations
- recommended_panel_layout: description of optimal panel arrangement
- cleanup_items: list of items to remove (people, clutter, temporary structures)
- orientation: recommended panel orientation
"""

            def _analyze():
                # For GPT-5 / o-series, avoid optional params (some reject non-default temperature
                # and/or token limit fields). Let the API apply defaults.
                if self._supports_sampling_params(self.analysis_model):
                    token_kwargs = {"max_tokens": 1000, "temperature": 0.3}
                else:
                    token_kwargs = {}
                response = self.client.chat.completions.create(
                    model=self.analysis_model,
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt
                                },
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:image/jpeg;base64,{image_b64}"
                                    }
                                }
                            ]
                        }
                    ],
                    **token_kwargs,
                )
                return response.choices[0].message.content
            
            analysis_text = self._retry_with_backoff(_analyze)
            
            # Parse analysis (simplified - in production, use structured output)
            return {
                "analysis": analysis_text,
                "system_specs": system_specs
            }
        
        except Exception as e:
            logger.error(f"Error analyzing image: {str(e)}")
            raise
    
    def cleanup_image(self, image_b64: str, cleanup_instructions: str) -> str:
        """
        Clean up image by removing people, clutter, and temporary items.
        
        Args:
            image_b64: Base64 encoded original image
            cleanup_instructions: Instructions for what to remove
        
        Returns:
            Base64 encoded cleaned image
        """
        try:
            cleanup_prompt = f"""Edit this rooftop terrace image to remove the following items:
{cleanup_instructions}

Remove all people, temporary items, clutter, and non-permanent structures. Keep only the permanent terrace structure, walls, and fixed installations. Make the terrace look clean and ready for solar panel installation."""

            def _cleanup():
                # Use gpt-image-1 for image editing
                # Note: API structure may vary - adjust based on actual OpenAI API
                response = self.client.images.edit(
                    model=self.image_model,
                    image=base64.b64decode(image_b64),
                    prompt=cleanup_prompt,
                    n=1,
                    size="1024x1024"
                )
                # Handle both URL and base64 responses
                if hasattr(response.data[0], 'url') and response.data[0].url:
                    return response.data[0].url
                elif hasattr(response.data[0], 'b64_json'):
                    return response.data[0].b64_json
                else:
                    raise ValueError("Unexpected response format from image API")
            
            edited_result = self._retry_with_backoff(_cleanup)
            
            # Handle both URL and base64 responses
            if edited_result.startswith('http'):
                # Download the edited image and convert to base64
                import urllib.request
                with urllib.request.urlopen(edited_result) as response:
                    edited_bytes = response.read()
                    edited_b64 = base64.b64encode(edited_bytes).decode("utf-8")
            else:
                # Already base64
                edited_b64 = edited_result
            
            return edited_b64
        
        except Exception as e:
            logger.error(f"Error cleaning up image: {str(e)}")
            raise
    
    def add_solar_panels(self, image_b64: str, panel_layout_instructions: str, system_specs: dict) -> str:
        """
        Add solar panels to the cleaned terrace image.
        
        Args:
            image_b64: Base64 encoded cleaned image
            panel_layout_instructions: Instructions for panel placement
            system_specs: System specifications
        
        Returns:
            Base64 encoded final image with solar panels
        """
        try:
            panel_prompt = f"""Add a professional solar panel installation to this rooftop terrace.

System Specifications:
- System Size: {system_specs.get('kw', 'N/A')} kW
- Number of Panels: {system_specs.get('panel_count', 'N/A')} panels
- Panel Layout: {panel_layout_instructions}

Installation Requirements:
1. Place {system_specs.get('panel_count', 'N/A')} solar panels in the optimal locations
2. Use proper mounting structures (rails and brackets)
3. Ensure proper spacing between panels (minimum 0.5m for maintenance)
4. Orient panels for maximum sun exposure (typically south-facing)
5. Keep panels aligned and professionally installed
6. Show proper wiring and junction boxes
7. Maintain realistic proportions and perspective

Make the installation look professional, clean, and realistic. The panels should be properly mounted on the terrace with appropriate mounting hardware."""

            def _add_panels():
                # Use gpt-image-1 for image editing
                # Note: API structure may vary - adjust based on actual OpenAI API
                response = self.client.images.edit(
                    model=self.image_model,
                    image=base64.b64decode(image_b64),
                    prompt=panel_prompt,
                    n=1,
                    size="1024x1024"
                )
                # Handle both URL and base64 responses
                if hasattr(response.data[0], 'url') and response.data[0].url:
                    return response.data[0].url
                elif hasattr(response.data[0], 'b64_json'):
                    return response.data[0].b64_json
                else:
                    raise ValueError("Unexpected response format from image API")
            
            final_result = self._retry_with_backoff(_add_panels)
            
            # Handle both URL and base64 responses
            if final_result.startswith('http'):
                # Download the final image and convert to base64
                import urllib.request
                with urllib.request.urlopen(final_result) as response:
                    final_bytes = response.read()
                    final_b64 = base64.b64encode(final_bytes).decode("utf-8")
            else:
                # Already base64
                final_b64 = final_result
            
            return final_b64
        
        except Exception as e:
            logger.error(f"Error adding solar panels: {str(e)}")
            raise
    
    def process_solar_simulation(self, image_b64: str, system_specs: dict) -> str:
        """
        Complete two-pass image processing: cleanup then add panels.
        
        Args:
            image_b64: Base64 encoded original terrace image
            system_specs: System specifications from calculation_service
        
        Returns:
            Base64 encoded final image with solar panels
        """
        try:
            # Step 1: Analyze the image
            logger.info("Analyzing terrace image...")
            analysis = self.analyze_image(image_b64, system_specs)
            
            # Extract cleanup and layout instructions from analysis
            cleanup_instructions = analysis.get("analysis", "Remove all people, temporary items, and clutter from the terrace.")
            panel_layout = analysis.get("analysis", f"Install {system_specs.get('panel_count', 'N/A')} panels in optimal locations.")
            
            # Step 2: Cleanup pass
            logger.info("Cleaning up image (removing clutter)...")
            cleaned_image_b64 = self.cleanup_image(image_b64, cleanup_instructions)
            
            # Step 3: Add solar panels
            logger.info("Adding solar panels...")
            final_image_b64 = self.add_solar_panels(cleaned_image_b64, panel_layout, system_specs)
            
            return final_image_b64
        
        except Exception as e:
            logger.error(f"Error processing solar simulation: {str(e)}")
            raise
