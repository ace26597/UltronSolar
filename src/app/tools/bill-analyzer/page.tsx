"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";
import BillUploader from "@/components/simulator/BillUploader";
import { BillData } from "@/types/billExtract";
import Link from "next/link";

export default function BillAnalyzerPage() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedData, setExtractedData] = useState<BillData | null>(null);
    const [showLeadForm, setShowLeadForm] = useState(false);

    const handleFileSelect = async (file: File) => {
        setIsLoading(true);
        setError(null);
        setExtractedData(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/bill-extract", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setExtractedData(result.data);
            } else {
                setError(result.error || "Failed to extract data. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while analyzing the bill. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    // Solar Calculation Logic
    const calculateSolar = (units: string) => {
        const consumption = parseFloat(units.replace(/[^0-9.]/g, ""));
        if (isNaN(consumption)) return null;

        // Avg generation in Maharashtra is ~4 units per kW per day
        // Monthly units = kW * 4 * 30 => kW = units / 120
        const recommendedKW = Math.ceil(consumption / 120);
        const estimatedSavings = recommendedKW * 4 * 30 * 7; // Approx Rs. 7 per unit

        // Subsidy logic
        let subsidy = 0;
        if (recommendedKW >= 1) {
            subsidy = Math.min(recommendedKW, 3) * 18000; // Simplified subsidy logic
            if (recommendedKW >= 1) subsidy += 12000; // Baseline
        }

        return {
            recommendedKW,
            estimatedSavings,
            subsidy: Math.min(subsidy, 78000), // Max cap
            paybackYears: 4, // Average
        };
    };

    const solarData = extractedData?.unitsConsumed ? calculateSolar(extractedData.unitsConsumed) : null;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <section className="flex-1 py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 bg-solar-orange/10 text-solar-orange font-bold text-sm rounded-full mb-4"
                        >
                            FREE AI TOOL
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-navy mb-4"
                        >
                            Analyze Your Bill & Save
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            Upload a photo of your electricity bill. Our AI will extract your usage and show you exactly how much you can save with solar.
                        </motion.p>
                    </div>

                    {!extractedData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-navy/5 border border-gray-100"
                        >
                            <BillUploader onFileSelect={handleFileSelect} isLoading={isLoading} />

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-2xl mb-2 block">📄</span>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">1. UPLOAD</p>
                                    <p className="text-sm text-gray-600">Snap a photo of your bill</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-2xl mb-2 block">🤖</span>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2. ANALYZE</p>
                                    <p className="text-sm text-gray-600">AI reads your usage units</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-2xl mb-2 block">📊</span>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">3. RESULT</p>
                                    <p className="text-sm text-gray-600">Get your ROI & size</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {extractedData && solarData && (
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                            >
                                {/* Header section */}
                                <div className="bg-navy p-8 text-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1">Your Solar Potential</h2>
                                            <p className="text-gray-400 text-sm">Based on {extractedData.unitsConsumed} units consumption</p>
                                        </div>
                                        <button
                                            onClick={() => setExtractedData(null)}
                                            className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                                        >
                                            Try Another Bill
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Recommended Size</p>
                                            <p className="text-2xl font-bold text-solar-orange">{solarData.recommendedKW} kW</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Monthly Savings</p>
                                            <p className="text-2xl font-bold text-green-400">₹{solarData.estimatedSavings.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Govt. Subsidy</p>
                                            <p className="text-2xl font-bold text-blue-400">₹{solarData.subsidy.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Avg. Payback</p>
                                            <p className="text-2xl font-bold">{solarData.paybackYears} Years</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Analysis detail */}
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Bill Summary
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2 border-b border-gray-50 text-sm">
                                                    <span className="text-gray-500">Consumer Name</span>
                                                    <span className="font-semibold text-navy">{extractedData.consumerName || "Extracted from Image"}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-50 text-sm">
                                                    <span className="text-gray-500">Provider</span>
                                                    <span className="font-semibold text-navy">{extractedData.provider}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-50 text-sm">
                                                    <span className="text-gray-500">Address</span>
                                                    <span className="font-semibold text-navy text-right max-w-[200px] truncate">{extractedData.address}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-50 text-sm">
                                                    <span className="text-gray-500">Sanctioned Load</span>
                                                    <span className="font-semibold text-navy">{extractedData.sanctionedLoad || "Not found"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl p-6">
                                            <h3 className="text-lg font-bold text-navy mb-4">What happens next?</h3>
                                            <ul className="space-y-4">
                                                <li className="flex gap-3 text-sm text-gray-600">
                                                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">✓</div>
                                                    <span>A {solarData.recommendedKW}kW system will eliminate ~90% of your bill.</span>
                                                </li>
                                                <li className="flex gap-3 text-sm text-gray-600">
                                                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">✓</div>
                                                    <span>You are eligible for PM Surya Ghar subsidy of ₹{solarData.subsidy.toLocaleString()}.</span>
                                                </li>
                                                <li className="flex gap-3 text-sm text-gray-600">
                                                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">✓</div>
                                                    <span>Your environment impact: Save ~{solarData.recommendedKW * 1.2} tons of CO2 yearly.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => setShowLeadForm(true)}
                                            className="flex-1 bg-solar-orange text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-solar-orange/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            Get Detailed Quotation
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                        <a
                                            href={`https://wa.me/919922992442?text=Hi! I just analyzed my bill. My recommended size is ${solarData.recommendedKW}kW. Send me a quote!`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            Quick Quote on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {showLeadForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-navy rounded-3xl p-8 text-white text-center"
                                >
                                    <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
                                    <p className="text-gray-400 mb-8">Our engineers will call you for a free site survey in Dhule/Jalgaon.</p>
                                    <div className="max-w-md mx-auto space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:border-solar-orange outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:border-solar-orange outline-none"
                                        />
                                        <button className="w-full bg-solar-orange py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-solar-orange/30 transition-all">
                                            Confirm Free Site Survey
                                        </button>
                                        <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest font-bold">BY SUBMITTING YOU AGREE TO OUR PRIVACY POLICY</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
