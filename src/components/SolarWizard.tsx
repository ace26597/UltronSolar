"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CtaButton from "./cta/CtaButton";

type WizardStep = 1 | 2 | 3 | 4;

export default function SolarWizard() {
    const [step, setStep] = useState<WizardStep>(1);
    const [formData, setFormData] = useState({
        sector: "",
        bill: "",
        location: "",
        name: "",
        phone: ""
    });

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(prev => (prev < 4 ? (prev + 1) as WizardStep : prev));
    const prevStep = () => setStep(prev => (prev > 1 ? (prev - 1) as WizardStep : prev));

    return (
        <section className="py-24 bg-brand-bg relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-solar-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-solar-orange/10 border border-solar-orange/20 text-solar-orange text-xs font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full mb-6">
                        Personalized Recommendations
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-navy-dark mb-6 leading-tight">
                        Find the perfect <span className="text-solar-orange">Solar Solution</span> in 60 seconds.
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
                        Tell us about your needs and get an instant ROI summary tailored for North Maharashtra.
                    </p>
                </div>

                <div className="bg-white rounded-[3rem] shadow-2xl shadow-navy/5 border border-gray-100 overflow-hidden relative">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                        <motion.div
                            className="h-full bg-solar-orange"
                            initial={{ width: "25%" }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="p-8 md:p-16">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">Where would you like to install solar?</h3>
                                        <p className="text-gray-500">Select the sector that best describes your project.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { id: "residential", label: "My Home", icon: "🏠" },
                                            { id: "agriculture", label: "My Farm", icon: "🚜" },
                                            { id: "commercial", label: "My Business", icon: "🏢" },
                                        ].map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => { updateField("sector", opt.id); nextStep(); }}
                                                className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 hover:-translate-y-1 ${formData.sector === opt.id
                                                    ? "border-solar-orange bg-solar-orange/5 shadow-lg shadow-solar-orange/10"
                                                    : "border-gray-100 hover:border-solar-orange/30 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <span className="text-4xl">{opt.icon}</span>
                                                <span className="font-black text-navy-dark uppercase tracking-widest text-sm">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">What&apos;s your average monthly bill?</h3>
                                        <p className="text-gray-500">This helps us estimate the system size you need.</p>
                                    </div>
                                    <div className="max-w-md mx-auto relative group">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300 group-focus-within:text-solar-orange transition-colors">₹</span>
                                        <input
                                            type="number"
                                            placeholder="5,000"
                                            value={formData.bill}
                                            onChange={(e) => updateField("bill", e.target.value)}
                                            className="w-full pl-14 pr-8 py-6 rounded-2xl border-2 border-gray-100 focus:border-solar-orange outline-none text-2xl font-black text-navy-dark transition-all"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="flex justify-center gap-4 mt-8">
                                        <button onClick={prevStep} className="px-8 py-4 font-bold text-gray-400 hover:text-navy-dark transition-colors">Back</button>
                                        <button
                                            onClick={nextStep}
                                            disabled={!formData.bill}
                                            className="px-12 py-4 bg-navy text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-solar-orange transition-all disabled:opacity-50"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">Where is the property located?</h3>
                                        <p className="text-gray-500">We optimize designs based on local solar irradiation.</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {["Dhule", "Jalgaon", "Nashik", "Sakri", "Shirpur", "Malegaon", "Bhusawal", "Other"].map((city) => (
                                            <button
                                                key={city}
                                                onClick={() => { updateField("location", city); nextStep(); }}
                                                className={`py-4 rounded-xl border-2 transition-all font-bold text-sm ${formData.location === city
                                                    ? "border-solar-orange bg-solar-orange/5 text-navy-dark shadow-md"
                                                    : "border-gray-100 hover:border-solar-orange/30 text-gray-600"
                                                    }`}
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <button onClick={prevStep} className="px-8 py-4 font-bold text-gray-400 hover:text-navy-dark transition-colors">Back</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">Final Step: Where should we send your plan?</h3>
                                        <p className="text-gray-500">Our engineers will draft a quick summary for you.</p>
                                    </div>
                                    <div className="max-w-md mx-auto space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Your Full Name"
                                            value={formData.name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                            className="w-full px-8 py-4 rounded-xl border-2 border-gray-100 focus:border-solar-orange outline-none font-bold text-navy-dark transition-all"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="WhatsApp Number"
                                            value={formData.phone}
                                            onChange={(e) => updateField("phone", e.target.value)}
                                            className="w-full px-8 py-4 rounded-xl border-2 border-gray-100 focus:border-solar-orange outline-none font-bold text-navy-dark transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-6 mt-8">
                                        <CtaButton
                                            ctaId="expert_consultation"
                                            variantOverride={{ label: "Get My Expert Summary" }}
                                            className="w-full max-w-md py-6 text-xl font-black bg-solar-orange shadow-2xl shadow-solar-orange/30 hover:bg-navy hover:text-white transition-all transform hover:-translate-y-1"
                                        />
                                        <button onClick={prevStep} className="font-bold text-gray-400 hover:text-navy-dark transition-colors text-sm">Review My Answers</button>
                                    </div>
                                    <p className="text-center text-[10px] text-gray-400">
                                        By clicking, you agree to our privacy policy. No spam, we promise.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Trust Footnote */}
                    <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-center gap-8 opacity-50 text-[10px] font-black uppercase tracking-widest text-gray-500 grayscale group-hover:grayscale-0 transition-all">
                        <span className="flex items-center gap-2">🛡️ ISO Certified</span>
                        <span className="flex items-center gap-2">☀️ Authorized Dealer</span>
                        <span className="flex items-center gap-2">⚡ 500+ Installs</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
