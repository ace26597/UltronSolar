"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function SpecialOffer() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  return (
    <section id="special-offer" className="py-20 bg-futuristic-bg-primary text-futuristic-text-main overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block glass border border-futuristic-accent-secondary/50 text-futuristic-accent-secondary px-4 py-1 rounded-none text-sm font-orbitron font-bold mb-4 animate-pulse uppercase tracking-wide">
            {t.specialOffer.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 uppercase tracking-wide">
            {t.specialOffer.title}
          </h2>
          <p className="text-futuristic-text-muted max-w-2xl mx-auto font-montserrat">
            {t.specialOffer.subtitle}
          </p>
        </div>

        <div className="glass border border-futuristic-accent-primary/20 rounded-none shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: Pricing & Inclusions */}
          <div className="lg:w-1/2 p-8 md:p-12 bg-futuristic-bg-secondary/30 border-r border-futuristic-accent-primary/20">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-orbitron font-bold text-futuristic-text-main mb-2 uppercase tracking-wide">{t.specialOffer.systemTitle}</h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-5xl md:text-6xl font-orbitron font-black text-futuristic-accent-secondary">{t.specialOffer.price}</span>
                <span className="text-futuristic-text-muted text-lg line-through font-montserrat">{t.specialOffer.originalPrice}</span>
              </div>
              <p className="text-sm text-futuristic-text-muted mt-2 font-montserrat">
                {t.specialOffer.exclusiveNote}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-orbitron font-bold text-futuristic-text-main uppercase tracking-wide text-sm">{t.specialOffer.whatsIncluded}</h4>
              <ul className="space-y-3">
                {t.specialOffer.includedItems.map((item, i) => (
                  <li key={i} className="flex items-center text-futuristic-text-muted font-montserrat">
                    <svg className="w-5 h-5 text-futuristic-accent-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Benefits & CTA */}
          <div className="lg:w-1/2 p-8 md:p-12 glass flex flex-col justify-center">
            <div className="mb-8">
              <h4 className="font-orbitron font-bold text-futuristic-text-main uppercase tracking-wide text-sm mb-6">{t.specialOffer.whyGrab}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="p-2 bg-futuristic-accent-primary/10 border border-futuristic-accent-primary/20 rounded-none mr-4 text-futuristic-accent-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold font-montserrat text-futuristic-text-main">{t.specialOffer.benefits.saveMoney.title}</h5>
                    <p className="text-sm text-futuristic-text-muted font-montserrat">{t.specialOffer.benefits.saveMoney.description}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-futuristic-accent-primary/10 border border-futuristic-accent-primary/20 rounded-none mr-4 text-futuristic-accent-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold font-montserrat text-futuristic-text-main">{t.specialOffer.benefits.ecoFriendly.title}</h5>
                    <p className="text-sm text-futuristic-text-muted font-montserrat">{t.specialOffer.benefits.ecoFriendly.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <a
                href="#contact"
                className="block w-full text-center btn-power-cta px-8 py-4 text-xl"
              >
                {t.specialOffer.claimButton}
              </a>
              <p className="text-xs text-futuristic-text-muted text-center mt-4 font-montserrat">
                {t.specialOffer.terms}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

