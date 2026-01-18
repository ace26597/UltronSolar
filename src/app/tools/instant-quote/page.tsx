"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

const steps = [
    { id: 1, title: "Basic Info", subtitle: "Where and how much?" },
    { id: 2, title: "Technical Details", subtitle: "Roof type and phase" },
    { id: 3, title: "Preferences", subtitle: "Brands and warranty" },
    { id: 4, title: "Get Your Quote", subtitle: "Calculate now" },
];

export default function InstantQuotePage() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        city: "",
        monthlyBill: "",
        roofType: "concrete",
        connectionType: "1-phase",
        solarType: "on-grid",
        brandPreference: "tier-1",
        name: "",
        phone: "",
        pincode: "",
    });

    const [isCalculating, setIsCalculating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const calculateQuote = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            setShowResult(true);
        }, 1500);
    };

    // Simplified pricing logic
    const bill = parseFloat(formData.monthlyBill) || 0;
    const recommendedKW = Math.ceil(bill / 130) || 3;
    const basePrice = recommendedKW * 55000;
    const subsidy = recommendedKW >= 3 ? 78000 : recommendedKW * 18000 + 12000;
    const finalPrice = basePrice - subsidy;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <section className="flex-1 py-12 md:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Instant Solar Quote</h1>
                        <p className="text-gray-600 uppercase text-xs font-bold tracking-widest">Get a detailed estimate in 30 seconds</p>
                    </div>

                    {/* Stepper */}
                    {!showResult && (
                        <div className="flex justify-between mb-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
                            {steps.map((step) => (
                                <div key={step.id} className="relative z-10 flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${currentStep >= step.id ? 'bg-solar-orange text-white' : 'bg-white text-gray-400 border-2 border-gray-200'}`}>
                                        {step.id}
                                    </div>
                                    <span className={`text-[10px] mt-2 font-bold uppercase transition-colors ${currentStep >= step.id ? 'text-navy' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
                            >
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-navy mb-6">Where is your property?</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">City in Maharashtra</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Dhule, Jalgaon, Nashik"
                                                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Average Monthly Bill (₹)</label>
                                                <input
                                                    type="number"
                                                    name="monthlyBill"
                                                    value={formData.monthlyBill}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. 3500"
                                                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-navy mb-6">Technical Configuration</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Roof Type</label>
                                                <select
                                                    name="roofType"
                                                    value={formData.roofType}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none appearance-none"
                                                >
                                                    <option value="concrete">Concrete / RCC Box</option>
                                                    <option value="sheet">Tin / Galvalume Sheet</option>
                                                    <option value="slanted">Slanted Roof (Tiles)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Electricity Connection</label>
                                                <select
                                                    name="connectionType"
                                                    value={formData.connectionType}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none appearance-none"
                                                >
                                                    <option value="1-phase">Single Phase (Residential)</option>
                                                    <option value="3-phase">Three Phase (Heavy Load)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-navy mb-6">Your Preferences</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">System Type</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button
                                                        onClick={() => setFormData(p => ({ ...p, solarType: 'on-grid' }))}
                                                        className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.solarType === 'on-grid' ? 'border-solar-orange bg-solar-orange/5 text-solar-orange' : 'border-gray-100 hover:border-gray-200'}`}
                                                    >
                                                        On-Grid (Savings)
                                                    </button>
                                                    <button
                                                        onClick={() => setFormData(p => ({ ...p, solarType: 'hybrid' }))}
                                                        className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.solarType === 'hybrid' ? 'border-solar-orange bg-solar-orange/5 text-solar-orange' : 'border-gray-100 hover:border-gray-200'}`}
                                                    >
                                                        Hybrid (Backup)
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Brand Priority</label>
                                                <select
                                                    name="brandPreference"
                                                    value={formData.brandPreference}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none appearance-none"
                                                >
                                                    <option value="premium">Premium (Top Efficiency)</option>
                                                    <option value="tier-1">Standard (Best Value)</option>
                                                    <option value="budget">Budget (Fast Payback)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-navy mb-6">Who should we send the quote to?</h2>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your Full Name"
                                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none"
                                            />
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="WhatsApp Number"
                                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none"
                                            />
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                placeholder="PIN Code"
                                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-solar-orange outline-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-12 flex justify-between items-center">
                                    {currentStep > 1 ? (
                                        <button onClick={prevStep} className="text-gray-400 font-bold hover:text-navy transition-colors">
                                            Back
                                        </button>
                                    ) : <div></div>}

                                    {currentStep < 4 ? (
                                        <button
                                            onClick={nextStep}
                                            disabled={currentStep === 1 && (!formData.city || !formData.monthlyBill)}
                                            className="bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-navy/90 transition-all shadow-lg hover:shadow-navy/20 disabled:opacity-50"
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            onClick={calculateQuote}
                                            disabled={!formData.name || !formData.phone}
                                            className="bg-solar-orange text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-solar-orange/20 transition-all flex items-center gap-2"
                                        >
                                            {isCalculating ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Calculating...
                                                </>
                                            ) : "Generate Final Quote"}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                            >
                                <div className="bg-navy p-10 text-white text-center">
                                    <div className="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                                    <h2 className="text-3xl font-bold mb-2">Quote Generated!</h2>
                                    <p className="text-gray-400">Personalized for {formData.name} in {formData.city}</p>
                                </div>

                                <div className="p-8 md:p-12 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Recommended System</p>
                                                <p className="text-3xl font-bold text-navy">{recommendedKW} kW <span className="text-lg font-normal text-gray-500">Solar Rooftop</span></p>
                                            </div>
                                            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                                                <p className="text-xs font-bold text-green-600 uppercase mb-1">Estimated Annual Savings</p>
                                                <p className="text-3xl font-bold text-green-700">₹{(recommendedKW * 4 * 365 * 7).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="bg-navy/5 rounded-2xl p-6 space-y-4">
                                            <h4 className="font-bold text-navy mb-4 border-b border-navy/10 pb-2">Investment Summary</h4>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Base Price (approx)</span>
                                                <span className="font-bold">₹{basePrice.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-green-600 font-bold">
                                                <span>PM Surya Ghar Subsidy</span>
                                                <span>- ₹{subsidy.toLocaleString()}</span>
                                            </div>
                                            <div className="pt-4 border-t border-navy/10 flex justify-between items-center">
                                                <span className="font-bold text-navy text-lg">Net Investment</span>
                                                <span className="text-2xl font-black text-solar-orange">₹{finalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-solar-orange/5 p-6 rounded-2xl border border-solar-orange/10 flex items-start gap-4">
                                        <div className="text-2xl">⚡</div>
                                        <div>
                                            <h4 className="font-bold text-navy">Bonus: 100% Paperwork Managed</h4>
                                            <p className="text-sm text-gray-600">Our team handles all net-metering and subsidy applications for you. Installation timeline: 7-10 days.</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <button
                                            onClick={() => window.location.href = '/contact'}
                                            className="flex-1 bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy/90 transition-all"
                                        >
                                            Book Free Site Visit
                                        </button>
                                        <a
                                            href={`https://wa.me/919922992442?text=Hi! I just generated a quote for ${recommendedKW}kW in ${formData.city}. My PIN is ${formData.pincode}. Let's discuss!`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            Continue on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!showResult && (
                        <div className="mt-12 text-center text-gray-400 flex items-center justify-center gap-8">
                            <div className="flex items-center gap-2"><span className="text-green-500">✓</span> ISO Certified</div>
                            <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Serving North MH</div>
                            <div className="flex items-center gap-2"><span className="text-green-500">✓</span> No Junk Calls</div>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    );
}
