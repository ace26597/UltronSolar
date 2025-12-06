"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function Brands() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  
  const brands = [
    { name: "Tata Power Solar", icon: "⚡" },
    { name: "Adani Solar", icon: "☀️" },
    { name: "Waaree Energies", icon: "🔋" },
    { name: "Havells", icon: "💡" },
    { name: "Luminous", icon: "⚙️" },
    { name: "Su-Kam", icon: "🔌" },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-dark mb-3 sm:mb-4">
            {t.brands.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            {t.brands.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 flex flex-col items-center justify-center text-center min-h-[90px] sm:min-h-[120px] md:min-h-[140px]"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 md:mb-3">
                <span role="img" aria-label={`${brand.name} logo`}>{brand.icon}</span>
              </div>
              <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-navy-dark leading-tight">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

