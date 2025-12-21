"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function TrustBar() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    const partners = [
        { name: "Tata Power", logo: "/logo/tata-solar.png" },
        { name: "Adani Solar", logo: "/logo/adani-solar.png" },
        { name: "Waaree", logo: "/logo/waaree.png" },
        { name: "Vikram Solar", logo: "/logo/vikram-solar.png" },
        { name: "GoodWe", logo: "/logo/goodwe.png" },
        { name: "Growatt", logo: "/logo/growatt.png" },
    ];

    return (
        <div className="bg-white py-8 border-b border-gray-100 shadow-sm relative z-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <h3 className="text-sm sm:text-base font-bold text-navy/40 uppercase tracking-[0.2em] mb-1">
                            {t.trustBar.title.split(' in ')[0]}
                        </h3>
                        <p className="text-navy font-heading font-black text-xl lg:text-2xl">
                            Partnering with Industry Giants
                        </p>
                    </div>

                    <div className="lg:w-2/3 w-full">
                        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-8 md:gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            {partners.map((partner) => (
                                <div key={partner.name} className="h-8 md:h-10 w-auto relative">
                                    {/* Note: In a real app we'd use themed SVGs or high-res PNGs. Using text placeholders if logos aren't ready */}
                                    <span className="text-navy font-black text-lg md:text-xl tracking-tighter italic">
                                        {partner.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
