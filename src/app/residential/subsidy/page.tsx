import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";

export const metadata: Metadata = {
    title: "PM Surya Ghar Muft Bijli Yojana Guide | Solar Subsidy 2024 | Ultron Solar",
    description: "Learn how to save up to ₹78,000 with the PM Surya Ghar Muft Bijli Yojana. Step-by-step guide to solar subsidy application in Maharashtra with Ultron Power Systems.",
    alternates: {
        canonical: "https://www.ultronsolar.in/residential/subsidy",
    },
};

export default function SubsidyGuide() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-navy to-navy-dark text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 bg-solar-orange/20 border border-solar-orange/30 rounded-full px-4 py-1.5 mb-8">
                        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-solar-orange">
                            National Government Scheme 2024
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 leading-tight">
                        PM Surya Ghar <br />
                        <span className="text-solar-orange">Muft Bijli Yojana Guide</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        The Government of India is providing up to <span className="text-white font-bold">₹78,000 direct subsidy</span> to residential consumers. Discover how you can avail this benefit and get free electricity for life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CtaButton
                            ctaId="residential_quote_en"
                            variantOverride={{ label: "Calculate My Subsidy" }}
                            className="px-10 py-5 text-lg"
                        />
                        <a href="#how-to-apply" className="px-10 py-5 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all">
                            How to Apply?
                        </a>
                    </div>
                </div>
            </section>

            {/* Subsidy Structure Table */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex gap-16 items-center">
                        <div className="lg:w-1/2 mb-12 lg:mb-0">
                            <h2 className="text-solar-orange font-bold tracking-widest uppercase text-sm mb-4">Financial Support</h2>
                            <h3 className="text-3xl md:text-5xl font-heading font-black text-navy-dark mb-8">How Much Will You Save?</h3>
                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-solar-orange transition-transform hover:-translate-y-1">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-bold text-navy">First 2 kW Capacity</span>
                                        <span className="text-2xl font-black text-solar-orange">₹30,000 / kW</span>
                                    </div>
                                    <p className="text-gray-600">For the first 2 kW, you receive a flat subsidy of ₹30,000 per kilo-watt.</p>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-navy-light transition-transform hover:-translate-y-1">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-bold text-navy">Next 1 kW Capacity</span>
                                        <span className="text-2xl font-black text-navy-light">₹18,000 / kW</span>
                                    </div>
                                    <p className="text-gray-600">For additional capacity above 2 kW up to 3 kW, you receive ₹18,000 per kilo-watt.</p>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-gray-200 transition-transform hover:-translate-y-1">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-bold text-navy">Total Max Subsidy</span>
                                        <span className="text-3xl font-black text-navy-dark">₹78,000</span>
                                    </div>
                                    <p className="text-gray-600">The total subsidy for a 3 kW system (or higher) is capped at ₹78,000 for residential properties.</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white shadow-solar-orange/10">
                                <Image
                                    src="/images/gallery-project-1.jpg"
                                    alt="Rooftop Solar in Maharashtra"
                                    width={600}
                                    height={800}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-60"></div>
                                <div className="absolute bottom-10 left-10 text-white">
                                    <div className="text-5xl font-black mb-2 italic">₹0</div>
                                    <div className="text-2xl font-bold">Electricity Bill Target</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Steps */}
            <section id="how-to-apply" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-solar-orange font-bold tracking-widest uppercase text-sm mb-4">Simplified Process</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-black text-navy-dark mb-6">4 Steps to Your Subsidy</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                        {/* Connecting Line (hidden on mobile) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-navy text-white rounded-full flex items-center justify-center text-3xl font-black mb-6 border-4 border-white shadow-xl transition-all group-hover:bg-solar-orange group-hover:scale-110">1</div>
                            <h4 className="text-xl font-bold text-navy mb-3">Registration</h4>
                            <p className="text-gray-500 text-sm">Register on PM Surya Ghar portal with your electricity bill.</p>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-navy text-white rounded-full flex items-center justify-center text-3xl font-black mb-6 border-4 border-white shadow-xl transition-all group-hover:bg-solar-orange group-hover:scale-110">2</div>
                            <h4 className="text-xl font-bold text-navy mb-3">Feasibility</h4>
                            <p className="text-gray-500 text-sm">Wait for MSEDCL/Utility feasibility approval of your site.</p>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-navy text-white rounded-full flex items-center justify-center text-3xl font-black mb-6 border-4 border-white shadow-xl transition-all group-hover:bg-solar-orange group-hover:scale-110">3</div>
                            <h4 className="text-xl font-bold text-navy mb-3">Installation</h4>
                            <p className="text-gray-500 text-sm">Get system installed by Ultron Power Systems (Registered Vendor).</p>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-navy text-white rounded-full flex items-center justify-center text-3xl font-black mb-6 border-4 border-white shadow-xl transition-all group-hover:bg-solar-orange group-hover:scale-110">4</div>
                            <h4 className="text-xl font-bold text-navy mb-3">Claim</h4>
                            <p className="text-gray-500 text-sm">Post-installation, subsidy is credited to your bank account.</p>
                        </div>
                    </div>

                    <div className="mt-20 p-12 bg-brand-bg rounded-[3rem] border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:max-w-xl">
                            <h4 className="text-2xl font-heading font-black text-navy mb-4">We Handle the Paperwork!</h4>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Subsidy applications can be complex. As an authorized vendor, Ultron Power Systems handles the entire documentation and liaison with MSEDCL, ensuring you get your subsidy without any hassle.
                            </p>
                        </div>
                        <CtaButton
                            ctaId="residential_quote_en"
                            variantOverride={{ label: "Get Help with My Application" }}
                            className="px-10 py-5 text-lg"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
