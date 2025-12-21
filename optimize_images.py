import os
from PIL import Image

def optimize_images(directory, quality=85):
    """
    Recursively finds all JPG, JPEG, and PNG images and converts them to WebP.
    """
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                output_path = os.path.splitext(file_path)[0] + '.webp'
                
                try:
                    with Image.open(file_path) as img:
                        # Convert to RGB if necessary (e.g. for PNG with transparency if saving to JPEG, but WebP handles alpha)
                        img.save(output_path, 'WEBP', quality=quality)
                        print(f"✅ Optimized: {file} -> {os.path.basename(output_path)}")
                except Exception as e:
                    print(f"❌ Failed to optimize {file}: {e}")

if __name__ == "__main__":
    # Target directories for optimization
    targets = [
        'public/images',
        'public/logo'
    ]
    
    for target in targets:
        full_path = os.path.join(os.getcwd(), target)
        if os.path.exists(full_path):
            print(f"🔍 Optimizing images in {target}...")
            optimize_images(full_path)
        else:
            print(f"⚠️ Directory not found: {target}")
