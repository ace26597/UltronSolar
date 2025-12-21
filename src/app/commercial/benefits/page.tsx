import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";

export const metadata: Metadata = {
    title: "Solar ROI & Tax Benefits for Businesses | Ultron Solar",
    description: "Discover the financial advantages of commercial solar. Learn about accelerated depreciation, carbon credits, and 4-year payback periods for businesses in India.",
    alternates: {
        canonical: "https://www.ultronsolar.in/commercial/benefits",
    },
};

export default function CommercialBenefits() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Benefits Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-navy to-navy-dark text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 bg-solar-orange/20 border border-solar-orange/30 rounded-full px-4 py-1.5 mb-8">
                        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-solar-orange">
                            Strategic Financial Asset
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 leading-tight">
                        Maximum ROI & <br />
                        <span className="text-solar-orange">Commercial Tax Benefits</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Beyond lower bills, solar offers significant tax advantages and high returns on investment that outperform traditional financial instruments.
                    </p>
                </div>
            </section>

            {/* The 4-Way Advantage */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                        <div className="flex gap-8 group">
                            <div className="flex-shrink-0 w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-solar-orange group-hover:bg-solar-orange group-hover:text-white transition-all shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-navy mb-4">Accelerated Depreciation</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Avail up to 40% accelerated depreciation in the very first year of installation. This significantly reduces your corporate tax liability and speeds up your ROI.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-8 group">
                            <div className="flex-shrink-0 w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-solar-orange group-hover:bg-solar-orange group-hover:text-white transition-all shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-navy mb-4">Short Payback Period</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Most commercial solar projects achieve a full return on investment (Payback) within 3 to 4 years, followed by 20+ years of practically free energy.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-8 group">
                            <div className="flex-shrink-0 w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-solar-orange group-hover:bg-solar-orange group-hover:text-white transition-all shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-navy mb-4">ESG & Carbon Credits</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Improve your Environment, Social, and Governance (ESG) rating. Transitioning to renewable energy opens doors to green financing and international sustainability certifications.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-8 group">
                            <div className="flex-shrink-0 w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-solar-orange group-hover:bg-solar-orange group-hover:text-white transition-all shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-navy mb-4">Protection from Tariff Hikes</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Commercial electricity tariffs have historically increased by 5-7% annually. Solar fixes your energy cost for the next 25 years, shielding your business from future hikes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industrial Quote Section */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl md:text-5xl font-heading font-black text-navy mb-8">Future-Proof Your Business</h3>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Connect with our industrial energy consultants for a custom ROI projection based on your historical electricity consumption.
                    </p>
                    <CtaButton
                        ctaId="commercial_quote_en"
                        variantOverride={{ label: "Request a Financial Feasibility Report" }}
                        className="px-12 py-5 text-xl font-bold"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
