"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  const faqs = t.faq.questions;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-dark mb-4">
            {t.faq.title}
          </h2>
          <p className="text-gray-600">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-navy-dark text-lg pr-8">{faq.question}</span>
                <span className={`transform transition-transform duration-300 text-primary-blue ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

