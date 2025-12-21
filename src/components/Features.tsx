"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function Features() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);

  const features = [
    {
      title: t.features.expertInstallations.title,
      description: t.features.expertInstallations.description,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: t.features.flexiblePayment.title,
      description: t.features.flexiblePayment.description,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t.features.completeEPC.title,
      description: t.features.completeEPC.description,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: t.features.warranty.title,
      description: t.features.warranty.description,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-solar-orange font-bold tracking-widest uppercase text-sm mb-4">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-5xl font-heading font-black text-navy mb-6">
            {t.features.title}
          </h3>
          <div className="w-20 h-1.5 bg-solar-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-8 rounded-3xl bg-brand-bg border border-gray-100 hover:border-solar-orange/30 hover:shadow-xl hover:shadow-solar-orange/5 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-solar-orange shadow-sm group-hover:bg-solar-orange group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-solar-orange transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
