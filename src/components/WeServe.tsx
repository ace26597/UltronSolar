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
    <section className="bg-futuristic-bg-primary py-12 border-b border-futuristic-accent-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {sectors.map((sector, index) => (
            <Link
              key={index}
              href={sector.link}
              className="flex flex-col items-center p-4 rounded-none glass border border-futuristic-accent-primary/10 hover:border-futuristic-accent-primary hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 group text-center"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {sector.icon}
              </span>
              <span className="font-semibold font-montserrat text-futuristic-text-main">{sector.title}</span>
              <span className="text-xs text-futuristic-accent-primary font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-montserrat">
                {sector.getQuote}
              </span>
            </Link>
          ))}
        </div>
        
        {/* Commercial CTA Section */}
        <div className="mt-8 pt-8 border-t border-futuristic-accent-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-orbitron font-bold text-futuristic-text-main mb-3 uppercase tracking-wide">
              {t.weServe.commercial.title}
            </h3>
            <p className="text-futuristic-text-muted mb-6 max-w-2xl mx-auto font-montserrat">
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

