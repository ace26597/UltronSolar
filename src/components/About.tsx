"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function About() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative w-full">
            <div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[550px] rounded-xl overflow-hidden shadow-2xl bg-gray-50">
              <Image
                src="/images/ultron_marketing_fam_1.jpg"
                alt="Happy Indian Family with Solar Savings - Ultron Power Systems Marketing"
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFESEGEhMxQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwCvq2oarHbkSG9ZRFYqoWRgAAo2AA9AADj2Mxh6i1U9azNLJNJI7sWZnYkkn2Sf3GYpVr0lTGJJWf/Z"
              />
            </div>
            {/* Years experience badge - visible on all screens */}
            <div className="absolute -bottom-3 right-2 sm:-bottom-4 sm:right-4 lg:-bottom-6 lg:-right-6 bg-solar-orange p-6 sm:p-8 rounded-3xl shadow-2xl animate-bounce-slow">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-none">10+</div>
              <div className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider">{t.about.yearsExperience}</div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-navy mb-8">
              {t.about.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-bg transition-colors group">
                <span className="text-solar-orange text-2xl group-hover:scale-110 transition-transform">✓</span>
                <div>
                  <h3 className="font-heading font-bold text-navy mb-1">{t.about.completeEPC.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.about.completeEPC.description}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-bg transition-colors group">
                <span className="text-solar-orange text-2xl group-hover:scale-110 transition-transform">✓</span>
                <div>
                  <h3 className="font-heading font-bold text-navy mb-1">{t.about.multipleApplications.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.about.multipleApplications.description}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-bg transition-colors group">
                <span className="text-solar-orange text-2xl group-hover:scale-110 transition-transform">✓</span>
                <div>
                  <h3 className="font-heading font-bold text-navy mb-1">{t.about.highQuality.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.about.highQuality.description}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-bg transition-colors group">
                <span className="text-solar-orange text-2xl group-hover:scale-110 transition-transform">✓</span>
                <div>
                  <h3 className="font-heading font-bold text-navy mb-1">{t.about.customizedSolutions.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.about.customizedSolutions.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-16 bg-gradient-to-br from-navy to-navy-dark p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-solar-orange/10 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-solar-orange/20"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-6">
                {t.about.aboutUs.title}
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                {t.about.aboutUs.description}
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-gray-200 text-lg leading-relaxed italic border-l-4 border-solar-orange pl-6">
                {t.about.aboutUs.description2}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-solar-orange text-white px-10 py-5 rounded-full font-bold hover:bg-solar-orange/90 hover:scale-105 transition-all shadow-xl shadow-solar-orange/20 group"
              >
                {t.about.aboutUs.contactButton}
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

