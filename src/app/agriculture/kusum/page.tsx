import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";

export const metadata: Metadata = {
    title: "PM-KUSUM Scheme Details | Solar Subsidy for Farmers | Ultron Solar",
    description: "Detailed guide on PM-KUSUM Yojana for solar water pumps in Maharashtra. Learn about eligibility, benefits, and how to apply with Ultron Power Systems.",
    alternates: {
        canonical: "https://www.ultronsolar.in/agriculture/kusum",
    },
};

export default function KusumYojana() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Kusum Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-[#1A4D2E] to-[#0D2416] text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-8">
                        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-green-400">
                            Agriculture Energy Security
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 leading-tight">
                        PM-KUSUM Yojana <br />
                        <span className="text-solar-orange text-green-400">Scheme Guide for Farmers</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) aims to de-dieselize the farm sector and provide financial security to farmers.
                    </p>
                </div>
            </section>

            {/* Components of PM-KUSUM */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">The Three Pillars</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-black text-navy-dark mb-6">How PM-KUSUM Benefits You</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 transition-all hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center text-3xl font-black mb-6 group-hover:bg-green-600 transition-colors">A</div>
                            <h4 className="text-xl font-bold text-navy mb-4">Component A</h4>
                            <p className="text-gray-600">Setting up 10,000 MW of Decentralized Ground Mounted Grid Connected Solar or other Renewable Energy based Power Plants by individual farmers.</p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 transition-all hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center text-3xl font-black mb-6 group-hover:bg-green-600 transition-colors">B</div>
                            <h4 className="text-xl font-bold text-navy mb-4">Component B</h4>
                            <p className="text-gray-600">Installation of 20 Lakh Stand-alone Solar Water Pumps. This is the <span className="font-bold">most popular component</span> for individual farmers.</p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 transition-all hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center text-3xl font-black mb-6 group-hover:bg-green-600 transition-colors">C</div>
                            <h4 className="text-xl font-bold text-navy mb-4">Component C</h4>
                            <p className="text-gray-600">Solarisation of 15 Lakh Grid-connected Agriculture Pumps including 통해 feeder level solarisation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application & Support */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-brand-bg rounded-[3rem] p-12 md:p-20 border border-gray-100">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-navy mb-8">Ready to Apply for Your Subsidy?</h2>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                            The application process involves multiple steps including state nodal agency approvals. With Ultron Power Systems, you don&apos;t have to worry about the complexity.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <CtaButton
                                ctaId="residential_quote_en"
                                variantOverride={{ label: "Consult Our KUSUM Expert" }}
                                className="px-10 py-5 text-lg"
                            />
                            <a href="tel:+919422787438" className="bg-white border border-gray-200 text-navy px-10 py-5 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                Call: +91 94227 87438
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
