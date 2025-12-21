"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function HowItWorks() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    return (
        <section className="py-24 bg-brand-bg relative overflow-hidden font-sans">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-solar-orange/5 -skew-x-12 transform translate-x-1/2"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-base font-bold text-solar-orange uppercase tracking-[0.3em] mb-4">
                        The Process
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-navy mb-6">
                        {t.howItWorks.title}
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        {t.howItWorks.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-navy/5"></div>

                    {t.howItWorks.steps.map((step, index) => (
                        <div key={index} className="relative group p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            {/* Number Circle */}
                            <div className="w-14 h-14 bg-navy text-solar-orange rounded-2xl flex items-center justify-center font-black text-2xl mb-8 group-hover:bg-solar-orange group-hover:text-navy transition-colors duration-500 relative z-10 shadow-lg shadow-navy/10">
                                0{index + 1}
                            </div>

                            <h4 className="text-xl font-heading font-bold text-navy mb-4 group-hover:text-solar-orange transition-colors">
                                {step.title}
                            </h4>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {step.description}
                            </p>

                            {/* Decorative dot */}
                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-100 group-hover:bg-solar-orange transition-colors"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
