import fitz  # PyMuPDF
import os

logo_dir = r"c:\Users\chank\OneDrive\Documents\UltronSolar\public\logo"
output_dir = logo_dir

def convert_pdf_to_png(pdf_path, output_path):
    try:
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)  # Get the first page
        pix = page.get_pixmap(alpha=True)  # Render page to an image
        pix.save(output_path)
        print(f"Converted: {pdf_path} -> {output_path}")
    except Exception as e:
        print(f"Failed to convert {pdf_path}: {e}")

files = [f for f in os.listdir(logo_dir) if f.lower().endswith(".pdf")]

for file in files:
    pdf_path = os.path.join(logo_dir, file)
    # Create a clean filename
    clean_name = file.replace(" ", "_").replace("(", "").replace(")", "").replace(".pdf", ".png")
    output_path = os.path.join(output_dir, clean_name)
    convert_pdf_to_png(pdf_path, output_path)
