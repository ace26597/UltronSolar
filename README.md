# Ultron Solar - Next.js Marketing Site

A modern, high-performance marketing website for Ultron Solar built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Static Site Generation** - Lightning-fast performance with Next.js static export
- 🎨 **Modern Design** - Clean, solar-themed aesthetic with Tailwind CSS
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🔍 **SEO Optimized** - Includes structured data (LocalBusiness schema)
- 🚀 **Vercel Ready** - Optimized for deployment on Vercel

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

2. Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL_NAME=gpt-4o-mini
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
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
- `OPENAI_MODEL_NAME` (optional): Model to use, defaults to `gpt-4o-mini`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (optional): Google Maps API key for map features

**Vercel Deployment:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the following variables:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `OPENAI_MODEL_NAME` = `gpt-4o-mini` (optional)
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = your Google Maps API key (optional)

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

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata and structured data
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   └── components/
│       ├── Navbar.tsx      # Navigation bar
│       ├── Hero.tsx        # Hero section
│       ├── Features.tsx    # Features grid
│       ├── About.tsx       # About section
│       ├── Contact.tsx     # Contact section with mailto
│       └── Footer.tsx      # Footer
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

