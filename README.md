# ☀️ Ultron Power Systems - Strategic Digital Asset

Welcome to the digital command center of **Ultron Power Systems**, a regional leader in renewable energy solutions serving Dhule and the North Maharashtra belt.

This platform is more than just a website; it is a dynamic lead-generation engine designed to educate, validate, and convert residential, agricultural, and industrial stakeholders into solar energy advocates.

---

## 👨‍👩‍👧‍👦 For the Content Editor (Non-Developers)

If you are a family member or marketing manager at Ultron Solar, here is how you can manage the site:

### 📸 Managing Images
- **Projects**: Upload new installation photos to `public/images/projects`.
- **Team**: Place team or office photos in `public/images/team`.
- **Tip**: Always try to use the `.webp` format for faster loading. If you have a `.jpg` or `.png`, use an online converter first.

### 📝 Updating Content
- **Testimonials**: Customer reviews are managed in `src/data/testimonials.json` (planned).
- **Blog Posts**: Each blog post is a file in `src/content/blog/`. You can edit the text there using simple Markdown.

### 🚀 Deploying Changes
Every time you save a change and "push" it to the **main** branch on GitHub, the website will automatically update on the live domain: [ultronsolar.in](https://ultronsolar.in).

---

## 🛠️ Technical Overview (For Developers)

Built with a high-performance modern stack:
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS (Solar-themed design system)
- **Language**: TypeScript (Type-safe development)
- **Deployment**: Vercel (CI/CD Integrated)
- **Features**: AI-Powered Solar Simulation, LLM Chatbot, Local SEO Optimization.

### ⚙️ Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API Key

### 🚀 Setup & Development
1. **Clone & Install**:
   ```bash
   git clone https://github.com/ace26597/UltronSolar.git
   cd UltronSolar
   npm install
   ```
2. **Environment Configuration**:
   Create a `.env.local` file with:
   ```env
   OPENAI_API_KEY=sk-...
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
   DEFAULT_TARIFF_RATE=7.0
   ```
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

### 📁 Project Architecture
```text
├── src/
│   ├── app/            # Routes & Layouts (App Router)
│   ├── components/     # UI Design System & Reusable Blocks
│   ├── content/        # Markdown files for Blog & Legal pages
│   ├── data/           # JSON files for structured data (Reviews, etc.)
│   ├── lib/            # Shared business logic and API clients
│   └── types/          # TypeScript definitions
├── public/             # Optimized static assets (Images, Icons)
├── api/                # Backend services (FastAPI/Python)
└── next.config.js      # Build & Image optimization settings
```

---

## 🛡️ Security & Performance
- **Image Pipeline**: Uses Next.js `next/image` for automatic AVIF/WebP conversion.
- **SEO**: Dynamic JSON-LD structured data for local business ranking.
- **HTTPS**: Enforced via Vercel for all traffic.

## 📄 License
Proprietary software for **Ultron Power Systems, Dhule**.
For support, contact [info@ultronsolar.in](mailto:info@ultronsolar.in).


