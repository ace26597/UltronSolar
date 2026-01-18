"use client";

import Image from "next/image";
import CtaButton from "@/components/cta/CtaButton";
import { useLanguage } from "@/context/LanguageContext";
import { selectCta } from "@/utils/ctaSelector";
import { getTranslations } from "@/lib/translations";

export default function Hero() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  const primaryCta = selectCta({
    page: 'home',
    audience: 'residential',
    language: currentLanguage,
  });

  return (
    <section id="home" className="relative min-h-[90svh] lg:min-h-screen flex items-center justify-center text-white overflow-hidden w-full font-sans">
      {/* Background Image with Strategic Overlays */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/gallery-project-9.jpg"
          alt="Rooftop Solar Panel Installation in Dhule, North Maharashtra"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
        />
        {/* Multi-stage gradient for text focus */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent hidden lg:block"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy lg:hidden"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:w-2/3 xl:w-1/2 text-center lg:text-left">
          {/* Badge for trust/localization */}
          <div className="inline-flex items-center gap-2 bg-solar-orange/20 border border-solar-orange/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-solar-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-solar-orange"></span>
            </span>
            {t.hero.trustBadge}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-black mb-6 leading-tight lg:leading-[1.1] tracking-tight">
            <span className="block">{t.hero.title}</span>
            <span className="block text-solar-orange drop-shadow-sm">{t.hero.titleHighlight}</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6">
            <CtaButton
              ctaId={primaryCta.id}
              variant="primary"
              variantOverride={{ label: t.nav.getQuote }}
              className="w-full sm:w-auto px-10 py-5 text-base sm:text-lg font-bold shadow-2xl shadow-solar-orange/20"
              trackEventName="hero_primary_cta_click"
              showSubtext={true}
            />

            <a
              href="https://share.google/CH2sVR1u2AtKPQ9R1"
              target="_blank"
              rel="noopener noreferrer"
              className="group/rating hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-navy bg-gray-200 overflow-hidden">
                      <Image src={`/images/team/team-${i}.jpg`} alt="Ultron Team" width={32} height={32} className="grayscale group-hover/rating:grayscale-0 transition-all object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-navy bg-solar-orange flex items-center justify-center text-[10px] font-bold text-navy">
                    50+
                  </div>
                </div>
                <span className="font-bold text-white">{t.hero.rating}</span>
              </div>
              <span className="text-gray-400">{t.hero.reviews}</span>
            </a>
          </div>

          <div className="mt-12 lg:mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-12">
            <div className="font-sans flex flex-col group">
              <span className="text-solar-orange text-3xl font-black mb-1 drop-shadow-md">{t.hero.stats.years}</span>
              <span className="text-white/80 font-bold text-xs tracking-[0.2em] uppercase transition-colors group-hover:text-white">{t.hero.stats.yearsLabel}</span>
            </div>
            <div className="font-sans flex flex-col group">
              <span className="text-solar-orange text-3xl font-black mb-1 drop-shadow-md">{t.hero.stats.installed}</span>
              <span className="text-white/80 font-bold text-xs tracking-[0.2em] uppercase transition-colors group-hover:text-white">{t.hero.stats.installedLabel}</span>
            </div>
            <div className="font-sans flex flex-col group">
              <span className="text-solar-orange text-3xl font-black mb-1 drop-shadow-md">{t.hero.stats.subsidy}</span>
              <span className="text-white/80 font-bold text-xs tracking-[0.2em] uppercase transition-colors group-hover:text-white">{t.hero.stats.subsidyLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(116%+1.3px)] h-[40px] md:h-[80px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105,114.24,103,172,94.52,232,85,285.49,70.52,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}


