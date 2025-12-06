"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function ServiceAreas() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  
  return (
    <section className="py-10 sm:py-12 bg-navy-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-solar-gold">
          {t.serviceAreas.title}
        </h2>
        <p className="text-gray-300 text-base sm:text-lg">
          {t.serviceAreas.locations}
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          {t.serviceAreas.note}
        </p>
      </div>
    </section>
  );
}

