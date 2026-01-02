"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function SpecialOffer() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  return (
    <section id="special-offer" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-navy-dark to-navy-DEFAULT text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-solar-red text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 animate-pulse">
            {t.specialOffer.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t.specialOffer.title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            {t.specialOffer.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: Pricing & Inclusions */}
          <div className="lg:w-1/2 p-6 sm:p-8 md:p-12 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-navy-dark mb-2">{t.specialOffer.systemTitle}</h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 flex-wrap">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-solar-red">{t.specialOffer.price}</span>
                <span className="text-gray-500 text-base sm:text-lg line-through">{t.specialOffer.originalPrice}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t.specialOffer.exclusiveNote}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-navy-dark uppercase tracking-wide text-sm">{t.specialOffer.whatsIncluded}</h4>
              <ul className="space-y-3">
                {t.specialOffer.includedItems.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Benefits & CTA */}
          <div className="lg:w-1/2 p-6 sm:p-8 md:p-12 bg-white flex flex-col justify-center">
            <div className="mb-8">
              <h4 className="font-bold text-navy-dark uppercase tracking-wide text-sm mb-6">{t.specialOffer.whyGrab}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 rounded-xl mr-4 text-primary-blue shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-dark">{t.specialOffer.benefits.saveMoney.title}</h5>
                    <p className="text-sm text-gray-600">{t.specialOffer.benefits.saveMoney.description}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-xl mr-4 text-energy-green shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-dark">{t.specialOffer.benefits.ecoFriendly.title}</h5>
                    <p className="text-sm text-gray-600">{t.specialOffer.benefits.ecoFriendly.description}</p>
                  </div>
                </div>
                {/* New Benefits to fill space and improve visibility */}
                <div className="flex items-start">
                  <div className="p-3 bg-orange-100 rounded-xl mr-4 text-solar-orange shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-dark">{t.specialOffer.benefits.govtSubsidy.title}</h5>
                    <p className="text-sm text-gray-600">{t.specialOffer.benefits.govtSubsidy.description}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-3 bg-purple-100 rounded-xl mr-4 text-purple-600 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-dark">{t.specialOffer.benefits.lowMaintenance.title}</h5>
                    <p className="text-sm text-gray-600">{t.specialOffer.benefits.lowMaintenance.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <a
                href="/contact"
                className="block w-full text-center bg-solar-red text-white px-6 sm:px-8 py-4 rounded-xl font-bold text-lg sm:text-xl hover:bg-solar-red-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 touch-manipulation min-h-[48px] flex items-center justify-center"
              >
                {t.specialOffer.claimButton}
              </a>
              <p className="text-xs text-gray-400 text-center mt-4">
                {t.specialOffer.terms}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

