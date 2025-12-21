"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function TrustBar() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    const partners = [
        { name: "Tata Power", logo: "/logo/tata-solar.png", color: "text-blue-700" },
        { name: "Adani Solar", logo: "/logo/adani-solar.png", color: "text-orange-600" },
        { name: "Waaree", logo: "/logo/waaree.png", color: "text-blue-900" },
        { name: "Vikram Solar", logo: "/logo/vikram-solar.png", color: "text-red-700" },
        { name: "GoodWe", logo: "/logo/goodwe.png", color: "text-red-600" },
        { name: "Growatt", logo: "/logo/growatt.png", color: "text-green-600" },
    ];

    return (
        <div className="bg-white py-10 border-b border-gray-100 shadow-sm relative z-20 font-sans overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-solar-orange via-navy to-solar-orange/50"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="lg:w-1/3 text-center lg:text-left relative">
                        <div className="inline-block bg-navy/5 text-navy px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                            Certified EPC Partner
                        </div>
                        <p className="text-navy font-heading font-black text-2xl lg:text-3xl leading-tight">
                            Authorized Dealer for <span className="text-solar-orange">Industry Leaders</span>
                        </p>
                    </div>

                    <div className="lg:w-2/3 w-full">
                        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                            {partners.map((partner) => (
                                <div key={partner.name} className="flex flex-col items-center group cursor-help">
                                    <span className={`font-heading font-black text-xl md:text-2xl tracking-tighter italic ${partner.color} transition-transform duration-300 group-hover:scale-110`}>
                                        {partner.name}
                                    </span>
                                    <div className="h-0.5 w-0 group-hover:w-full bg-current transition-all duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
