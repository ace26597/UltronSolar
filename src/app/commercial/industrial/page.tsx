import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";

export const metadata: Metadata = {
    title: "Industrial Solar Solutions | MW Scale Captive Plants | Ultron Solar",
    description: "Scale your business with sustainable energy. Premium industrial solar installations in North Maharashtra. Reduce operational costs and ensure energy security with Ultron Power Systems.",
    alternates: {
        canonical: "https://www.ultronsolar.in/commercial/industrial",
    },
};

export default function IndustrialSolar() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Commercial Hero */}
            <section className="relative pt-32 pb-24 bg-navy-dark overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image
                        src="/images/gallery-project-12.jpg"
                        alt="Utility Scale Solar Plant"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:w-2/3">
                        <div className="inline-flex items-center gap-2 bg-solar-orange/10 border border-solar-orange/20 rounded-full px-4 py-1.5 mb-8">
                            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-solar-orange">
                                Enterprise Energy Partners
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
                            Powering Industries with <br />
                            <span className="text-solar-orange">Efficiency & Scale</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                            Transform your idle factory roof into a profit-generating asset. We provide end-to-end MW-scale solar EPC services tailored for high-demand industrial environments.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <CtaButton
                                ctaId="commercial_quote_en"
                                variantOverride={{ label: "Request Industrial Audit" }}
                                className="px-10 py-5 text-lg font-bold"
                            />
                            <Link
                                href="/commercial/benefits"
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 transition-all text-center"
                            >
                                View ROI & Tax Benefits
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scale & Reliability */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex gap-16 items-center mb-24">
                        <div className="lg:w-1/2">
                            <h2 className="text-solar-orange font-bold tracking-widest uppercase text-sm mb-4">Industrial Grade</h2>
                            <h3 className="text-3xl md:text-5xl font-heading font-black text-navy-dark mb-8">Engineering for Maximum Uptime</h3>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Industrial solar requires more than just panels. It demands robust engineering, grid stability analysis, and high-performance inverters capable of handling heavy electrical loads.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-navy/5 p-3 rounded-xl text-navy">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-navy mb-1">Grid Stability</h5>
                                        <p className="text-sm text-gray-500 text-pretty">Seamless integration with industrial grids.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-navy/5 p-3 rounded-xl text-navy">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-navy mb-1">High Performance</h5>
                                        <p className="text-sm text-gray-500 text-pretty">Tier-1 Monocrystalline PERC modules.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 mt-12 lg:mt-0">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-solar-orange/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Image
                                    src="/images/gallery-project-5.jpg"
                                    alt="Industrial Solar Roof"
                                    width={600}
                                    height={400}
                                    className="relative rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Industrial Verticals */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
                        {['Cold Storages', 'Spinning Mills', 'Educational Institutions', 'Hospitals', 'Solar Carports & Parking'].map((industry) => (
                            <div key={industry} className="bg-brand-bg rounded-[2rem] p-6 text-center border border-gray-100 hover:border-solar-orange transition-all group">
                                <div className="w-12 h-12 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center text-navy shadow-sm group-hover:bg-navy group-hover:text-white transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                </div>
                                <h4 className="font-bold text-navy text-sm md:text-base">{industry}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industrial Quote Flow */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl md:text-5xl font-heading font-black text-navy mb-12">Move Towards Energy Independence</h3>
                    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100">
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            Our industrial team specializes in Capex and Opex models tailored for North Maharashtra&apos;s climate. Let us conduct a site feasibility and shadow analysis at no cost to you.
                        </p>
                        <CtaButton
                            ctaId="commercial_quote_en"
                            className="px-16 py-6 text-xl"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
