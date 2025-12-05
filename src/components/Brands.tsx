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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">
            {t.brands.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.brands.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[140px]"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                <span role="img" aria-label={`${brand.name} logo`}>{brand.icon}</span>
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-navy-dark">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

