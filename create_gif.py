from PIL import Image
import os

def create_gif(image_paths, output_path, duration=1500):
    images = []
    
    # Target size for all images (using the first one as reference, or standard HD)
    # The generated images are usually 1024x1024
    
    for path in image_paths:
        try:
            img = Image.open(path)
            # Resize if necessary to ensure all are same size
            if len(images) > 0:
                img = img.resize(images[0].size, Image.Resampling.LANCZOS)
            images.append(img)
        except Exception as e:
            print(f"Error loading {path}: {e}")
            return

    if images:
        images[0].save(
            output_path,
            save_all=True,
            append_images=images[1:],
            duration=duration,  # duration in milliseconds
            loop=0
        )
        print(f"GIF saved successfully to {output_path}")

if __name__ == "__main__":
    artifact_dir = r"C:\Users\chank\.gemini\antigravity\brain\6915b9cb-29d2-460c-b15b-a9134305429b"
    
    # Note: These filenames must match exactly what was returned by the generate_image tool
    # I will need to verify the exact filenames from the tool output
    image_files = [
        "diesel_pump_waste_1768779611658.png",
        "solar_pump_savings_1768779623945.png",
        "switch_to_solar_text_1768779634888.png"
    ]
    
    full_paths = [os.path.join(artifact_dir, img) for img in image_files]
    output_gif = os.path.join(artifact_dir, "solar_explanation.gif")
    
    create_gif(full_paths, output_gif, duration=2000) # 2 seconds per frame
