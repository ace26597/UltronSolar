"use client";

import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";
import { useLanguage } from "@/context/LanguageContext";
import { selectCta } from "@/utils/ctaSelector";
import { getTranslations } from "@/lib/translations";

export default function WeServe() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  const commercialCta = selectCta({
    page: 'home',
    audience: 'commercial',
    language: currentLanguage,
  });

  const sectors = [
    { title: t.weServe.sectors[0].title, icon: "🏠", link: "#contact", getQuote: t.weServe.sectors[0].getQuote },
    { title: t.weServe.sectors[1].title, icon: "🏢", link: "#contact", getQuote: t.weServe.sectors[1].getQuote },
    { title: t.weServe.sectors[2].title, icon: "🏭", link: "#contact", getQuote: t.weServe.sectors[2].getQuote },
    { title: t.weServe.sectors[3].title, icon: "🚜", link: "#contact", getQuote: t.weServe.sectors[3].getQuote },
    { title: t.weServe.sectors[4].title, icon: "🏢", link: "#contact", getQuote: t.weServe.sectors[4].getQuote },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {sectors.map((sector, index) => (
            <Link
              key={index}
              href={sector.link}
              className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors group text-center touch-manipulation min-h-[100px] sm:min-h-[120px] justify-center"
            >
              <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                {sector.icon}
              </span>
              <span className="font-semibold text-navy-dark text-sm sm:text-base">{sector.title}</span>
              <span className="text-xs text-primary-blue font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {sector.getQuote}
              </span>
            </Link>
          ))}
        </div>
        
        {/* Commercial CTA Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-navy-dark mb-3">
              {t.weServe.commercial.title}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t.weServe.commercial.description}
            </p>
            <div className="flex justify-center">
              <CtaButton
                ctaId={commercialCta.id}
                variant="outline"
                trackEventName="commercial_cta_click"
                showSubtext={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

