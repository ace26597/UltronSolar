# How to Add Images and Videos to Your Website

## 📁 Folder Structure

All static assets (images, videos, GIFs) should be placed in the `public/` folder.

```
public/
  ├── images/
  │   ├── hero-banner.jpg
  │   ├── products/
  │   │   ├── solar-pump.jpg
  │   │   ├── solar-plant.jpg
  │   │   └── stabilizer.jpg
  │   └── projects/
  │       └── project-1.jpg
  ├── videos/
  │   ├── promo-video.mp4
  │   └── installation-demo.mp4
  └── gifs/
      └── animation.gif
```

## 🖼️ Adding Images

### Method 1: Using Next.js Image Component (Recommended)

The `next/image` component provides automatic optimization, lazy loading, and responsive images.

```tsx
import Image from "next/image";

// In your component
<Image
  src="/images/hero-banner.jpg"
  alt="Solar panel installation"
  width={1200}
  height={600}
  className="rounded-lg"
/>
```

### Method 2: Using Regular HTML img Tag

For simple cases or when you need more control:

```tsx
<img
  src="/images/hero-banner.jpg"
  alt="Solar panel installation"
  className="w-full rounded-lg"
/>
```

### Example: Adding Image to Hero Section

```tsx
// src/components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <Image
        src="/images/solar-hero.jpg"
        alt="Ultron Power Systems - Solar Energy"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}
```

## 🎥 Adding Videos

### Method 1: HTML5 Video Tag

```tsx
<video
  controls
  className="w-full rounded-lg"
  poster="/images/video-thumbnail.jpg"
>
  <source src="/videos/promo-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### Method 2: Embedded YouTube/Vimeo Videos

```tsx
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="w-full aspect-video rounded-lg"
></iframe>
```

### Example: Video in Products Section

```tsx
// src/components/Products.tsx
export default function Products() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <video controls className="w-full rounded-lg">
          <source src="/videos/solar-installation.mp4" type="video/mp4" />
        </video>
      </div>
      <div>
        {/* Product description */}
      </div>
    </div>
  );
}
```

## 🎬 Adding GIFs

GIFs work the same as images:

```tsx
import Image from "next/image";

<Image
  src="/gifs/animation.gif"
  alt="Solar panel animation"
  width={500}
  height={300}
/>
```

Or with regular img tag:

```tsx
<img
  src="/gifs/animation.gif"
  alt="Solar panel animation"
  className="w-full"
/>
```

## 📝 Step-by-Step Guide

### 1. Add Your Files

1. Create folders in `public/`:
   - `public/images/` - for photos
   - `public/videos/` - for video files
   - `public/gifs/` - for animated GIFs

2. Copy your files into these folders

### 2. Update Components

Edit the component files in `src/components/` to include your images/videos.

### 3. Image Optimization Tips

- **Format**: Use JPG for photos, PNG for graphics with transparency, WebP for best compression
- **Size**: Optimize images before uploading (use tools like TinyPNG, Squoosh)
- **Dimensions**: Resize images to the size you'll display them (don't use 4000px images for 800px display)

### 4. Video Optimization Tips

- **Format**: MP4 (H.264 codec) is most compatible
- **Size**: Compress videos to reduce file size
- **Hosting**: For large videos, consider using YouTube/Vimeo and embedding

## 🔗 URL Paths

Files in `public/` are served from the root URL:

- `public/images/hero.jpg` → `/images/hero.jpg`
- `public/videos/demo.mp4` → `/videos/demo.mp4`

## 📱 Responsive Images

For responsive images that adapt to screen size:

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

## 🎨 Example: Gallery Component

```tsx
// src/components/Gallery.tsx
import Image from "next/image";

const images = [
  "/images/projects/project-1.jpg",
  "/images/projects/project-2.jpg",
  "/images/projects/project-3.jpg",
];

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Project ${index + 1}`}
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
      ))}
    </div>
  );
}
```

## ⚠️ Important Notes

1. **File Size**: Keep images under 1MB and videos under 10MB for better performance
2. **Naming**: Use lowercase, hyphens for file names (e.g., `solar-panel-installation.jpg`)
3. **Alt Text**: Always include descriptive alt text for accessibility
4. **Next.js Image**: Use `next/image` for automatic optimization (but requires width/height)
5. **Static Export**: Since we're using `output: 'export'`, all images must be in `public/` folder

## 🚀 Quick Start

1. Add your images to `public/images/`
2. Update components to reference them: `src="/images/your-image.jpg"`
3. Build and deploy - images will be included automatically!

