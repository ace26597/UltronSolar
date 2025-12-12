# Ultron Solar - Next.js Marketing Site

A modern, high-performance marketing website for Ultron Solar built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Static Site Generation** - Lightning-fast performance with Next.js static export
- 🎨 **Modern Design** - Clean, solar-themed aesthetic with Tailwind CSS
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🔍 **SEO Optimized** - Includes structured data (LocalBusiness schema)
- 🚀 **Vercel Ready** - Optimized for deployment on Vercel
- 🤖 **AI Chatbot** - LLM-powered chat widget for customer support
- 🖼️ **Solar Simulation** - AI-powered terrace image editing to visualize solar panel installations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (for chatbot functionality)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory (or copy from `.env.example`):
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL_NAME=gpt-5.2
OPENAI_IMAGE_MODEL=gpt-image-1
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
DEFAULT_TARIFF_RATE=7.0
NEXT_PUBLIC_SOLAR_API_URL=/api/solar
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

For the AI chatbot to work, you need to set up the following environment variables:

**Local Development (`.env.local`):**
- `OPENAI_API_KEY` (required): Your OpenAI API key
- `OPENAI_MODEL_NAME` (optional): Model for chat/analysis, defaults to `gpt-5.2`
- `OPENAI_IMAGE_MODEL` (optional): Model for image editing, defaults to `gpt-image-1`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (optional): Google Maps API key for map features
- `DEFAULT_TARIFF_RATE` (optional): Electricity tariff rate in ₹/kWh, defaults to `7.0`
- `NEXT_PUBLIC_SOLAR_API_URL` (optional): Solar API base URL, defaults to `/api/solar`

**Vercel Deployment:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the following variables:
   - `OPENAI_API_KEY` = your OpenAI API key (required)
   - `OPENAI_MODEL_NAME` = `gpt-5.2` (optional, for chat/analysis)
   - `OPENAI_IMAGE_MODEL` = `gpt-image-1` (optional, for image editing)
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = your Google Maps API key (optional)
   - `DEFAULT_TARIFF_RATE` = `7.0` (optional, Indian residential rate)
   - `NEXT_PUBLIC_SOLAR_API_URL` = `/api/solar` (optional)

**Important Security Notes:**
- The OpenAI API key is kept secure on the server-side. Never expose it in client-side code.
- The Google Maps API key uses the `NEXT_PUBLIC_` prefix because it's needed client-side. **Always restrict your Google Maps API key** in Google Cloud Console to specific domains (e.g., `ultronsolar.in`, `ultronsolar.vercel.app`) to prevent unauthorized usage.
- Never commit API keys to the repository. Always use environment variables.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `out` directory, ready for static hosting.

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Your site will be live after deployment!

### DNS Configuration

To point your domain `ultronsolar.in` to Vercel:

1. In Vercel dashboard, go to your project settings → Domains
2. Add `ultronsolar.in` and `www.ultronsolar.in`
3. Update your DNS records at GoDaddy:
   - Add a CNAME record: `www` → `cname.vercel-dns.com`
   - Or change nameservers to Vercel's (recommended)

## Solar Simulation API

The Solar Simulation API allows users to upload terrace photos and get AI-generated visualizations of solar panel installations.

### API Endpoints

#### POST `/api/solar/jobs`
Create a new solar simulation job.

**Request:**
- `multipart/form-data` with:
  - `image`: File (terrace photo, automatically compressed client-side)
  - `meta`: JSON string with `{kW?, bill?, notes?, extra?}`

**Response:**
```json
{
  "jobId": "uuid",
  "status": "queued"
}
```

#### POST `/api/solar/jobs/{job_id}/run`
Process a solar simulation job (edits image with AI).

**Request:**
- Empty body (job_id from URL)

**Response:**
```json
{
  "jobId": "uuid",
  "status": "processing" | "done" | "error"
}
```

#### GET `/api/solar/jobs/{job_id}`
Get the status and result of a solar simulation job.

**Response:**
```json
{
  "jobId": "uuid",
  "status": "queued" | "processing" | "done" | "error",
  "resultImage": "base64_string" // if status is "done"
}
```

### Usage Example

```typescript
import { createSolarJob, runSolar, checkSolarStatus } from '@/lib/solarApi';

// 1. Create job
const { jobId } = await createSolarJob(imageFile, {
  bill: 5000, // Monthly bill in ₹
  notes: "South-facing terrace"
});

// 2. Process job
await runSolar(jobId);

// 3. Poll for status
const status = await checkSolarStatus(jobId);
if (status.status === 'done' && status.resultImage) {
  // Display resultImage (base64)
}
```

### Features

- **Automatic Image Compression**: Images are compressed client-side (max 3000px, 85% quality) before upload
- **KW/Bill Conversion**: Automatically calculates required system size from monthly electricity bill
- **Two-Pass Image Editing**: 
  1. Cleanup pass (removes people, clutter, temporary items)
  2. Panel installation pass (adds solar panels with proper layout)
- **AI-Powered Analysis**: Uses GPT-5.2 Vision to analyze terrace layout and optimize panel placement

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata and structured data
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Features.tsx    # Features grid
│   │   ├── About.tsx       # About section
│   │   ├── Contact.tsx     # Contact section with mailto
│   │   └── Footer.tsx      # Footer
│   └── lib/
│       ├── solarApi.ts     # Solar simulation API client
│       └── chatApi.ts      # Chat API client
├── api/
│   ├── solar/              # Solar simulation FastAPI endpoints
│   │   ├── app.py          # FastAPI application
│   │   ├── models.py       # Pydantic models
│   │   └── services/       # Business logic services
│   └── solar.py            # Vercel serverless handler
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration with solar theme
└── next.config.js          # Next.js configuration
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:
- `solar.*` - Solar yellow/gold/orange colors
- `navy.*` - Professional navy blue shades
- `eco.*` - Eco-friendly green accents

### Content

Edit the component files in `src/components/` to update:
- Hero messaging
- Features list
- About section content
- Contact email address

### SEO

Update metadata in `src/app/layout.tsx`:
- Title and description
- Open Graph tags
- Structured data (LocalBusiness schema)

## License

Private project for Ultron Solar.

