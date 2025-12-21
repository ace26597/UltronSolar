import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";

interface LeadMagnetProps {
    title: string;
    description: string;
    buttonText: string;
    ctaId?: string;
}

export default function LeadMagnet({ title, description, buttonText, ctaId = "residential_quote_en" }: LeadMagnetProps) {
    return (
        <div className="my-12 p-8 md:p-12 bg-navy rounded-[3rem] text-white relative overflow-hidden shadow-2xl border-4 border-white shadow-navy/20 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-solar-orange/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-block bg-solar-orange/20 border border-solar-orange/30 text-solar-orange text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-6">
                        Limited Time Guide
                    </div>
                    <h4 className="text-3xl md:text-4xl font-heading font-black mb-4 leading-tight">
                        {title}
                    </h4>
                    <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                </div>

                <div className="flex-shrink-0 w-full lg:w-auto">
                    <CtaButton
                        ctaId={ctaId}
                        variantOverride={{ label: buttonText }}
                        className="w-full lg:w-auto px-12 py-5 text-xl font-black bg-solar-orange hover:bg-white hover:text-navy transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-xl shadow-solar-orange/30"
                    />
                </div>
            </div>
        </div>
    );
}
