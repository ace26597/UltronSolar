"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function EMICalculatorPage() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    const [systemSize, setSystemSize] = useState(3);
    const [loanTerm, setLoanTerm] = useState(5); // years
    const [interestRate, setInterestRate] = useState(10.5); // %

    // Constants for calculation
    const costPerKW = 55000;
    const subsidyPerKW = 18000;
    const baselineSubsidy = 12000;

    const totalCost = systemSize * costPerKW;
    const totalSubsidy = Math.min(systemSize, 3) * subsidyPerKW + baselineSubsidy;
    const loanAmount = Math.max(0, totalCost - totalSubsidy);

    // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyRate = (interestRate / 100) / 12;
    const months = loanTerm * 12;
    const emi = loanAmount > 0
        ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
        : 0;

    // Savings Calculation
    const unitsPerDayPerKW = 4;
    const monthlyUnits = systemSize * unitsPerDayPerKW * 30;
    const unitRate = 8.5; // Average rate in MH
    const monthlySavings = Math.round(monthlyUnits * unitRate);

    const netMonthly = monthlySavings - emi;
    const isPositiveCashflow = netMonthly > 0;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <section className="flex-1 py-12 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-navy mb-4">EMI vs Savings Calculator</h1>
                        <p className="text-gray-600">See how solar panels pay for their own loan from month 1.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Controls Panel */}
                        <div className="lg:col-span-1 space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-xl font-bold text-navy mb-6">Financing Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase">System Size (kW)</label>
                                        <span className="text-solar-orange font-bold font-mono">{systemSize} kW</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="10" step="1"
                                        value={systemSize}
                                        onChange={(e) => setSystemSize(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-solar-orange"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
                                        <span>1kW</span>
                                        <span>10kW</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase">Loan Tenure (Years)</label>
                                        <span className="text-solar-orange font-bold font-mono">{loanTerm} Years</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="10" step="1"
                                        value={loanTerm}
                                        onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-solar-orange"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
                                        <span>1Y</span>
                                        <span>10Y</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase">Interest Rate (%)</label>
                                        <span className="text-solar-orange font-bold font-mono">{interestRate}%</span>
                                    </div>
                                    <input
                                        type="range" min="7" max="15" step="0.5"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-solar-orange"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
                                        <span>7%</span>
                                        <span>15%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100 italic text-xs text-gray-400">
                                *Interest rates vary by bank (SBI/BoM/HDFC). Subsidy is auto-deducted from the loan amount.
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="lg:col-span-2 space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-navy p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden"
                                >
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Monthly Loan EMI</p>
                                    <p className="text-4xl font-black text-solar-orange">₹{emi.toLocaleString()}</p>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                                >
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Expected Savings</p>
                                    <p className="text-4xl font-black text-green-600">₹{monthlySavings.toLocaleString()}</p>
                                    <p className="text-[10px] text-gray-400 mt-2">BASED ON {monthlyUnits} UNITS GENERATED / MONTH</p>
                                </motion.div>
                            </div>

                            {/* Comparison Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`p-10 rounded-3xl border-2 flex flex-col md:flex-row items-center gap-8 ${isPositiveCashflow ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}
                            >
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg bg-white ${isPositiveCashflow ? 'text-green-500' : 'text-orange-500'}`}>
                                    {isPositiveCashflow ? "📈" : "⚖️"}
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className={`text-2xl font-black mb-2 ${isPositiveCashflow ? 'text-green-800' : 'text-orange-800'}`}>
                                        {isPositiveCashflow ? `Monthly Profit: ₹${netMonthly.toLocaleString()}` : `Net Cost: ₹${Math.abs(netMonthly).toLocaleString()}`}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {isPositiveCashflow
                                            ? "Your solar system is paying for its own loan plus giving you extra cash every month! It's a risk-free investment."
                                            : "The EMI is slightly higher than savings, but you'll own the system for free after the loan tenure and save 100% after that."}
                                    </p>
                                </div>

                                <div className="flex-shrink-0">
                                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${isPositiveCashflow ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'}`}>
                                        {isPositiveCashflow ? "Positive Cashflow" : "System Ownership Flow"}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Call to Action Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <button
                                        onClick={() => window.location.href = '/contact'}
                                        className="w-full bg-navy text-white font-bold py-6 rounded-2xl hover:shadow-2xl transition-all text-xl"
                                    >
                                        Apply for Solar Loan Now
                                    </button>
                                </div>
                                <div className="md:col-span-1">
                                    <a
                                        href={`https://wa.me/919922992442?text=Hi! I checked your EMI calculator. I want a ${systemSize}kW system with ${loanTerm}yr loan.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-green-500 text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 transition-all"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
