import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero"; // Reusing but maybe customizing later
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/cta/CtaButton";

export const metadata: Metadata = {
    title: "Residential Rooftop Solar Solutions | Zero Electricity Bills | Ultron Solar",
    description: "Install premium rooftop solar systems for your home in Dhule & North Maharashtra. Reduce electricity bills by 90%, avail government subsidies, and enjoy green energy.",
    alternates: {
        canonical: "https://www.ultronsolar.in/residential/rooftop",
    },
};

export default function ResidentialRooftop() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Custom Sub-Hero for Residential */}
            <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="/images/gallery-project-4.jpg"
                        alt="Residential Solar Installation"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/60"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
                    <div className="lg:flex items-center gap-12">
                        <div className="lg:w-3/5">
                            <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
                                Switch to Home Solar, <br />
                                <span className="text-solar-orange">Watch Your Bills Drop to Zero</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                                Join 50+ families in North Maharashtra who are saving thousands every month. Premium quality, hassle-free installation, and maximum government subsidy guaranteed.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <CtaButton
                                    ctaId="residential_quote_en"
                                    className="px-10 py-5 text-lg font-bold shadow-xl shadow-solar-orange/20"
                                />
                                <Link
                                    href="/residential/subsidy"
                                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 transition-all text-center"
                                >
                                    Check Subsidy Eligibility
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:block lg:w-2/5">
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white/10 group">
                                <Image
                                    src="/images/gallery-project-8.jpg"
                                    alt="Ultron Solar Family"
                                    width={500}
                                    height={600}
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="bg-solar-orange p-2 rounded-full text-white">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                        <span className="font-bold text-navy">Average Monthly Savings</span>
                                    </div>
                                    <div className="text-3xl font-black text-navy-dark">₹3,500 - ₹8,000+</div>
                                    <div className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">*Based on 3kW-5kW systems</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Savings & ROI Table */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-solar-orange font-bold tracking-widest uppercase text-sm mb-4">Financial Growth</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-black text-navy-dark mb-6">Smart Investment, Smarter Savings</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Solar isn&apos;t an expense—it&apos;s a high-yield investment. See how much you can save with the new government subsidy.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] shadow-2xl bg-white border border-gray-100">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-navy text-white">
                                    <th className="p-8 font-black uppercase tracking-wider">System Size</th>
                                    <th className="p-8 font-black uppercase tracking-wider">Estimated Goal</th>
                                    <th className="p-8 font-black uppercase tracking-wider">System Cost (Approx)</th>
                                    <th className="p-8 font-black uppercase tracking-wider text-solar-orange">Govt. Subsidy</th>
                                    <th className="p-8 font-black uppercase tracking-wider">Your Net Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-navy font-medium">
                                <tr className="hover:bg-brand-bg transition-colors">
                                    <td className="p-8">
                                        <span className="block font-black text-2xl">2 kW</span>
                                        <span className="text-xs text-gray-400">Perfect for small homes</span>
                                    </td>
                                    <td className="p-8">300 Units / Month</td>
                                    <td className="p-8">₹1,20,000</td>
                                    <td className="p-8 bg-solar-orange/5 font-black text-solar-orange">₹60,000</td>
                                    <td className="p-8 font-black text-xl">₹60,000</td>
                                </tr>
                                <tr className="hover:bg-brand-bg transition-colors">
                                    <td className="p-8">
                                        <span className="block font-black text-2xl">3 kW</span>
                                        <span className="text-xs text-gray-400">Most Popular choice</span>
                                    </td>
                                    <td className="p-8">450 Units / Month</td>
                                    <td className="p-8">₹1,80,000</td>
                                    <td className="p-8 bg-solar-orange/5 font-black text-solar-orange">₹78,000</td>
                                    <td className="p-8 font-black text-xl">₹1,02,000</td>
                                </tr>
                                <tr className="hover:bg-brand-bg transition-colors">
                                    <td className="p-8">
                                        <span className="block font-black text-2xl">5 kW</span>
                                        <span className="text-xs text-gray-400">For large family homes</span>
                                    </td>
                                    <td className="p-8">750 Units / Month</td>
                                    <td className="p-8">₹2,80,000</td>
                                    <td className="p-8 bg-solar-orange/5 font-black text-solar-orange">₹78,000</td>
                                    <td className="p-8 font-black text-xl">₹2,02,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        *Prices are indicative and subject to site conditions, brand selection, and current government policies.
                    </div>
                </div>
            </section>

            {/* Key Benefits */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-10 rounded-[2.5rem] bg-brand-bg border border-gray-100 hover:border-solar-orange transition-all group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-solar-orange shadow-sm mb-6 group-hover:bg-solar-orange group-hover:text-white transition-all">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h4 className="text-2xl font-heading font-black text-navy mb-4">Financial Freedom</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Redirect your monthly electricity expenses into building assets. Most systems pay for themselves within 3-4 years.
                            </p>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-brand-bg border border-gray-100 hover:border-solar-orange transition-all group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-solar-orange shadow-sm mb-6 group-hover:bg-solar-orange group-hover:text-white transition-all">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <h4 className="text-2xl font-heading font-black text-navy mb-4">25-Year Reliability</h4>
                            <p className="text-gray-600 leading-relaxed">
                                We use only Tier-1 components (TATA, Waaree, Adani) ensuring your investment generates power for decades.
                            </p>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-brand-bg border border-gray-100 hover:border-solar-orange transition-all group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-solar-orange shadow-sm mb-6 group-hover:bg-solar-orange group-hover:text-white transition-all">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            </div>
                            <h4 className="text-2xl font-heading font-black text-navy mb-4">Property Value Up</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Houses equipped with high-efficiency solar systems have a higher market resale value and attract premium buyers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-20 bg-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-8">
                        Ready to Power Your Home with <br />
                        <span className="text-solar-orange text-4xl md:text-6xl">Free Energy?</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto text-center">
                        Our experts are ready to visit your site for a free shadow analysis and custom ROI proposal. No obligations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <CtaButton
                            ctaId="residential_quote_en"
                            className="px-12 py-5 text-xl font-bold"
                        />
                        <a href="tel:+919422787438" className="text-white font-bold flex items-center gap-3 hover:text-solar-orange transition-colors">
                            <span className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </span>
                            Or Talk to an Expert: +91 94227 87438
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
