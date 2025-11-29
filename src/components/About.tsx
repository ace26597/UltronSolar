"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function About() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  return (
    <section id="about" className="py-20 bg-futuristic-bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ultron_marketing_fam.jpg"
                alt="Happy Indian Family with Solar Savings - Ultron Power Systems Marketing"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass border border-futuristic-accent-primary/30 p-6 rounded-none shadow-xl hidden lg:block">
              <div className="text-3xl font-orbitron font-bold text-futuristic-accent-primary">10+</div>
              <div className="text-sm text-futuristic-text-main font-montserrat">{t.about.yearsExperience}</div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-futuristic-text-main mb-6 uppercase tracking-wide">
              {t.about.title}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-futuristic-accent-primary text-xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold font-montserrat text-futuristic-text-main">{t.about.completeEPC.title}</h3>
                  <p className="text-futuristic-text-muted font-montserrat">{t.about.completeEPC.description}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-futuristic-accent-primary text-xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold font-montserrat text-futuristic-text-main">{t.about.multipleApplications.title}</h3>
                  <p className="text-futuristic-text-muted font-montserrat">{t.about.multipleApplications.description}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-futuristic-accent-primary text-xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold font-montserrat text-futuristic-text-main">{t.about.highQuality.title}</h3>
                  <p className="text-futuristic-text-muted font-montserrat">{t.about.highQuality.description}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-futuristic-accent-primary text-xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold font-montserrat text-futuristic-text-main">{t.about.customizedSolutions.title}</h3>
                  <p className="text-futuristic-text-muted font-montserrat">{t.about.customizedSolutions.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-16 glass border border-futuristic-accent-primary/20 p-8 rounded-none shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-futuristic-text-main uppercase tracking-wide">{t.about.aboutUs.title}</h3>
              <p className="mb-6 text-lg leading-relaxed font-montserrat text-futuristic-text-muted">
                {t.about.aboutUs.description}
              </p>
            </div>
            <div>
              <p className="mb-6 text-lg leading-relaxed font-montserrat text-futuristic-text-muted">
                {t.about.aboutUs.description2}
              </p>
              <a
                href="#contact"
                className="inline-block btn-power text-sm px-6 py-3"
              >
                {t.about.aboutUs.contactButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

