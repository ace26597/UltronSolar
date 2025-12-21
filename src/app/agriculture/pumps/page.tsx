import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";

export const metadata: Metadata = {
    title: "Solar Water Pumps for Farmers | PM-KUSUM Scheme | Ultron Solar",
    description: "Reliable solar water pumping solutions for agriculture in Maharashtra. Save on diesel and grid costs with high-efficiency solar pumps and PM-KUSUM subsidy benefits.",
    alternates: {
        canonical: "https://www.ultronsolar.in/agriculture/pumps",
    },
};

export default function SolarPumps() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Agriculture Hero */}
            <section className="relative pt-32 pb-24 bg-[#0D2416] overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/images/gallery-project-6.jpg"
                        alt="Solar Water Pump in Field"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D2416] via-[#0D2416]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:w-2/3">
                        <div className="inline-flex items-center gap-2 bg-[#1A4D2E]/40 border border-[#1A4D2E] rounded-full px-4 py-1.5 mb-8">
                            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-eco-200 text-green-400">
                                Empowering Farmers Since 2006
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
                            Smart Irrigation with <br />
                            <span className="text-solar-orange text-green-400">High-Performance Solar Pumps</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                            Stop worrying about load shedding or rising diesel prices. Bring 24/7 reliability to your farm with Ultron&apos;s advanced solar pumping systems.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <CtaButton
                                ctaId="residential_quote_en"
                                variantOverride={{ label: "Get Free Site Survey" }}
                                className="px-10 py-5 text-lg font-bold"
                            />
                            <Link
                                href="/agriculture/kusum"
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 transition-all text-center"
                            >
                                PM-KUSUM Subsidy Details
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="text-5xl font-black text-navy mb-2">₹0</div>
                            <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">Monthly Fuel Cost</div>
                        </div>
                        <div className="border-x border-gray-100">
                            <div className="text-5xl font-black text-navy mb-2">15+</div>
                            <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">Years Pump Life</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-navy mb-2">24/7</div>
                            <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">Irrigation Access</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types of Pumps */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">Our Technology</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-black text-navy-dark mb-6">Pumps for Every Need</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl group border border-gray-100 hover:border-green-500/30 transition-all">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src="/images/product-solar-pump.jpg"
                                    alt="Solar Submersible Pump"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-8 text-white">
                                    <h4 className="text-2xl font-black">Submersible Pumps</h4>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Ideal for deep bore-wells. Built with high-grade stainless steel for maximum corrosion resistance and durability in Indian soil conditions.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-navy font-bold">
                                        <span className="text-green-500">✓</span> 1HP to 10HP Capacity
                                    </li>
                                    <li className="flex items-center gap-3 text-navy font-bold">
                                        <span className="text-green-500">✓</span> Deep Head up to 150m
                                    </li>
                                    <li className="flex items-center gap-3 text-navy font-bold">
                                        <span className="text-green-500">✓</span> BLDC High Efficiency Motor
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl group border border-gray-100 hover:border-green-500/30 transition-all">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src="/images/gallery-project-10.jpg"
                                    alt="Solar Surface Pump"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-8 text-white">
                                    <h4 className="text-2xl font-black">Surface Pumps</h4>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Perfect for wells, canals, and river lifting. Easy to transport and maintain, offering high water discharge for rapid irrigation.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-navy font-bold">
                                        <span className="text-green-500">✓</span> High Discharge Volume
                                    </li>
                                    <li className="flex items-center gap-3 text-navy font-bold">
                                        <span className="text-green-500">✓</span> PM-KUSUM Eligible
                                    </li>
                                    <li className="flex items-center gap-3 text-navy font-bold">
                                        <span className="text-green-500">✓</span> Automatic Dusk-to-Dawn Operation
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Ultron for Farmers? */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-navy rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h3 className="text-3xl md:text-5xl font-heading font-black text-white mb-8">Why Trust Ultron?</h3>
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                                        <div>
                                            <h5 className="text-xl font-bold text-white mb-2">Regional Expertise</h5>
                                            <p className="text-gray-400">Deep understanding of water tables and soil in Dhule, Nashik, and Jalgaon.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                                        <div>
                                            <h5 className="text-xl font-bold text-white mb-2">Service Network</h5>
                                            <p className="text-gray-400">Mobile service vans for fast on-field support and maintenance.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                                        <div>
                                            <h5 className="text-xl font-bold text-white mb-2">Subsidy Experts</h5>
                                            <p className="text-gray-400">Complete assistance with PM-KUSUM and state government applications.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 backdrop-blur-md">
                                    <p className="text-xl text-white italic mb-6">
                                        &quot;Ultron switched my farm from diesel to solar 3 years ago. It&apos;s the best decision I ever made for my agriculture business.&quot;
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                        <div>
                                            <div className="font-bold text-white italic">Rajendra Patil</div>
                                            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Farmer, Sakri</div>
                                        </div>
                                    </div>
                                </div>
                                <CtaButton
                                    ctaId="residential_quote_en"
                                    className="w-full text-center py-5"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
