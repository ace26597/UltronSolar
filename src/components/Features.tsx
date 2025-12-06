"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function Features() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  
  const services = [
    {
      title: t.features.expertInstallations.title,
      description: t.features.expertInstallations.description,
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      number: "01",
    },
    {
      title: t.features.flexiblePayment.title,
      description: t.features.flexiblePayment.description,
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      number: "02",
    },
    {
      title: t.features.completeEPC.title,
      description: t.features.completeEPC.description,
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      number: "03",
    },
    {
      title: t.features.warranty.title,
      description: t.features.warranty.description,
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      number: "04",
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-3 sm:mb-4">
            {t.features.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                <div className="flex-shrink-0 p-2 sm:p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy-dark group-hover:text-solar-red transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-100 group-hover:text-red-50 transition-colors select-none flex-shrink-0" aria-hidden="true">
                      {service.number}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center text-solar-red font-semibold hover:text-solar-red-dark transition-colors text-sm sm:text-base">
                    {t.common.learnMore}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

