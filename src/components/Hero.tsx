"use client";

import Image from "next/image";
import { Zap, ArrowRight, Sun } from "lucide-react";
import CtaButton from "@/components/cta/CtaButton";
import { useLanguage } from "@/context/LanguageContext";
import { selectCta } from "@/utils/ctaSelector";
import { getTranslations } from "@/lib/translations";

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl md:text-3xl font-orbitron font-bold text-futuristic-text-main drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
      {value}
    </span>
    <span className="text-xs md:text-sm text-futuristic-text-muted uppercase tracking-wider font-montserrat mt-1">
      {label}
    </span>
  </div>
);

export default function Hero() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  const primaryCta = selectCta({
    page: 'home',
    audience: 'residential',
    language: currentLanguage,
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-futuristic-bg-primary text-white">
      {/* --- 1. VIDEO BACKGROUND (Optional - fallback to grid) --- */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40">
        <Image
          src="/images/gallery-project-9.jpg"
          alt="Rooftop Solar Panel Installation in Dhule, Maharashtra"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* --- 2. OVERLAYS (Grid & Dark Gradient) --- */}
      {/* Gradient to darken image for text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-futuristic-bg-primary/80 via-futuristic-bg-primary/60 to-futuristic-bg-primary z-10"></div>
      
      {/* Tech Grid Pattern Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 opacity-10 pointer-events-none bg-grid-pattern"></div>

      {/* --- 3. MAIN CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        
        {/* Animated Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-futuristic-accent-primary/30 bg-futuristic-accent-primary/10 backdrop-blur-md animate-fade-in-down">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-futuristic-accent-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-futuristic-accent-primary"></span>
          </span>
          <span className="text-futuristic-accent-primary text-xs font-orbitron tracking-widest uppercase">
            Next Gen Energy Systems
          </span>
        </div>

        {/* Main Headline with Glow Effect */}
        <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] uppercase">
          ULTRON <br className="md:hidden" />
          <span className="text-futuristic-accent-primary">SOLAR</span>
        </h1>

        {/* Subtitle */}
        <p className="font-montserrat text-futuristic-text-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {t.hero.subtitle || "Powering Maharashtra with futuristic solar solutions. Save money, gain independence, and upgrade to the Energy Grid of Tomorrow."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          
          {/* Primary Button (The "Ultron" Button) */}
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border-2 border-futuristic-accent-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] animate-pulse-glow"
          >
            <div className="absolute inset-0 w-0 bg-futuristic-accent-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative flex items-center justify-center gap-3 text-futuristic-accent-primary font-orbitron font-bold tracking-widest uppercase group-hover:text-futuristic-bg-primary transition-colors">
              Get Free Quote <Zap className="w-5 h-5 fill-current" />
            </span>
          </button>

          {/* Secondary Button */}
          <button 
            onClick={() => {
              const element = document.getElementById('products');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 glass hover:glass-strong border border-futuristic-accent-primary/30 hover:border-futuristic-accent-primary text-futuristic-text-main font-montserrat font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* --- 4. BOTTOM STATS BAR --- */}
      <div className="absolute bottom-0 w-full border-t border-futuristic-accent-primary/20 glass-strong z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem label="Energy Generated" value="1.2 GW" />
            <StatItem label="Happy Homes" value="500+" />
            <StatItem label="Co2 Saved" value="850 Tons" />
            <StatItem label="Warranty" value="25 Years" />
          </div>
        </div>
      </div>
    </div>
  );
}

