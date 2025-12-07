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
    <section id="home" className="relative min-h-[100svh] sm:min-h-[500px] sm:max-h-[800px] md:min-h-[600px] md:max-h-none flex items-center justify-center text-white overflow-hidden w-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/gallery-project-9.jpg"
          alt="Rooftop Solar Panel Installation in Dhule, Maharashtra"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
          quality={60}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFESEGEhMxQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwCvq2oarHbkSG9ZRFYqoWRgAAo2AA9AADj2Mxh6i1U9azNLJNJI7sWZnYkkn2Sf3GYpVr0lTGJJWf/Z"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/60 to-navy-dark/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          {t.hero.title} <br />
          <span className="text-solar-red">{t.hero.titleHighlight}</span>
        </h1>

        <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-100 max-w-3xl mx-auto font-light px-1">
          {t.hero.subtitle}
        </p>

        <div className="flex justify-center items-center">
          <CtaButton
            ctaId={primaryCta.id}
            variant="primary"
            className="!text-white text-sm sm:text-base"
            trackEventName="hero_primary_cta_click"
            showSubtext={true}
          />
        </div>

        <div className="mt-6 md:mt-12 inline-block bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 md:px-6 py-2 border border-white/20">
          <span className="text-white font-medium text-xs sm:text-sm md:text-base">{t.hero.priceNote}</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-white opacity-80 hover:opacity-100 transition-opacity touch-manipulation" aria-label="Scroll to features">
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

