"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CtaButton from "./cta/CtaButton";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

type WizardStep = 1 | 2 | 3 | 4 | 5;

export default function SolarWizard() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);
    const [step, setStep] = useState<WizardStep>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const nextStep = () => {
        // Track step completion in GA4
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'wizard_step_complete', {
                'step_number': step,
                'sector': formData.sector,
                'location': formData.location
            });
        }
        setStep(prev => (prev < 5 ? (prev + 1) as WizardStep : prev));
    };
    const prevStep = () => setStep(prev => (prev > 1 ? (prev - 1) as WizardStep : prev));

    const formatCurrency = (val: string) => {
        if (!val) return "";
        const num = val.replace(/\D/g, "");
        if (!num) return "";
        // Always use en-IN to ensure ASCII digits are returned (no Devanagari numerals)
        // This prevents input issues when the formatted value is used in onChange
        return new Intl.NumberFormat('en-IN').format(parseInt(num));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'generate_lead', {
                    'event_category': 'engagement',
                    'event_label': 'Solar Wizard Completion',
                    'value': parseInt(formData.bill) || 0
                });
            }

            const systemSize = calculateEstimatedSystem(formData.bill);
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    requirement: `Solar Recommendation (${formData.sector})`,
                    message: `Estimated System: ${systemSize}\r\nMonthly Bill: ₹${formatCurrency(formData.bill)}\r\nLocation: ${formData.location}\r\nSector: ${formData.sector}`
                }),
            });

            if (!res.ok) throw new Error("Failed to send lead");

            nextStep();
        } catch (error) {
            console.error("Error sending wizard lead:", error);
            // Even if it fails, we move to success step to not block user, 
            // but in a real app we might show an error.
            nextStep();
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateEstimatedSystem = (bill: string) => {
        const amount = parseInt(bill) || 0;
        if (amount < 2000) return "1-2 kW";
        if (amount < 5000) return "3-5 kW";
        if (amount < 10000) return "5-8 kW";
        return "10+ kW";
    };

    return (
        <section className="py-24 bg-brand-bg relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-solar-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-solar-orange/10 border border-solar-orange/20 text-solar-orange text-xs font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full mb-6">
                        {t.wizard.badge}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-navy-dark mb-6 leading-tight">
                        {t.wizard.title.split('Solar Solution').map((part, i, arr) => (
                            <span key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="text-solar-orange">Solar Solution</span>}
                            </span>
                        ))}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
                        {t.wizard.subtitle}
                    </p>
                </div>

                <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-navy/5 border border-white/20 overflow-hidden relative">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                        <motion.div
                            className="h-full bg-solar-orange"
                            initial={{ width: "20%" }}
                            animate={{ width: `${(step / 5) * 100}%` }}
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
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">{t.wizard.steps.step1.title}</h3>
                                        <p className="text-gray-500">{t.wizard.steps.step1.subtitle}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { id: "residential", label: t.wizard.steps.step1.options.residential, icon: "🏠" },
                                            { id: "agriculture", label: t.wizard.steps.step1.options.agriculture, icon: "🚜" },
                                            { id: "commercial", label: t.wizard.steps.step1.options.commercial, icon: "🏢" },
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
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">{t.wizard.steps.step2.title}</h3>
                                        <p className="text-gray-500">{t.wizard.steps.step2.subtitle}</p>
                                    </div>
                                    <div className="max-w-md mx-auto relative group">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300 group-focus-within:text-solar-orange transition-colors">₹</span>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder={t.wizard.steps.step2.placeholder}
                                            value={formatCurrency(formData.bill)}
                                            onChange={(e) => updateField("bill", e.target.value.replace(/\D/g, ""))}
                                            className="w-full pl-14 pr-8 py-6 rounded-2xl border-2 border-gray-100 focus:border-solar-orange outline-none text-2xl font-black text-navy-dark transition-all bg-white/50"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="flex justify-center gap-4 mt-8">
                                        <button onClick={prevStep} className="px-8 py-4 font-bold text-gray-400 hover:text-navy-dark transition-colors">{t.wizard.common.back}</button>
                                        <button
                                            onClick={nextStep}
                                            disabled={!formData.bill}
                                            className="px-12 py-4 bg-navy text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-solar-orange transition-all disabled:opacity-50"
                                        >
                                            {t.wizard.common.next}
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
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">{t.wizard.steps.step3.title}</h3>
                                        <p className="text-gray-500">{t.wizard.steps.step3.subtitle}</p>
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
                                        <button onClick={prevStep} className="px-8 py-4 font-bold text-gray-400 hover:text-navy-dark transition-colors">{t.wizard.common.back}</button>
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
                                        <h3 className="text-2xl font-black text-navy-dark mb-2">{t.wizard.steps.step4.title}</h3>
                                        <p className="text-gray-500">{t.wizard.steps.step4.subtitle}</p>
                                    </div>
                                    <div className="max-w-md mx-auto space-y-4">
                                        <input
                                            type="text"
                                            placeholder={t.wizard.steps.step4.namePlaceholder}
                                            value={formData.name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                            className="w-full px-8 py-4 rounded-xl border-2 border-gray-100 focus:border-solar-orange outline-none font-bold text-navy-dark transition-all"
                                        />
                                        <input
                                            type="tel"
                                            placeholder={t.wizard.steps.step4.phonePlaceholder}
                                            value={formData.phone}
                                            onChange={(e) => updateField("phone", e.target.value)}
                                            className="w-full px-8 py-4 rounded-xl border-2 border-gray-100 focus:border-solar-orange outline-none font-bold text-navy-dark transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-6 mt-8">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!formData.name || !formData.phone || isSubmitting}
                                            className="w-full max-w-md py-6 text-xl rounded-xl font-black bg-solar-orange text-white shadow-2xl shadow-solar-orange/30 hover:bg-navy hover:text-white transition-all transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    {t.wizard.steps.step4.processing}
                                                </>
                                            ) : t.wizard.steps.step4.submit}
                                        </button>
                                        <button onClick={prevStep} className="font-bold text-gray-400 hover:text-navy-dark transition-colors text-sm">{t.wizard.common.review}</button>
                                    </div>
                                    <p className="text-center text-[10px] text-gray-400">
                                        {t.wizard.steps.step4.privacyNote}
                                    </p>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-8"
                                >
                                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
                                        ✓
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-navy-dark">
                                            {t.wizard.steps.step5.title.replace('{name}', formData.name.split(' ')[0])}
                                        </h3>
                                        <p className="text-xl text-gray-600">
                                            {t.wizard.steps.step5.subtitle.replace('{phone}', formData.phone)}
                                        </p>
                                    </div>

                                    <div className="bg-brand-bg rounded-[2rem] p-8 max-w-md mx-auto border border-gray-100 text-left">
                                        <h4 className="font-black text-navy-dark uppercase tracking-widest text-sm mb-6 pb-4 border-b border-gray-200">{t.wizard.steps.step5.summaryTitle}</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">{t.wizard.steps.step5.labels.location}</span>
                                                <span className="font-bold text-navy-dark">{formData.location}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">{t.wizard.steps.step5.labels.bill}</span>
                                                <span className="font-bold text-navy-dark">₹{formatCurrency(formData.bill)}</span>
                                            </div>
                                            <div className="flex justify-between pt-4 border-t border-dashed border-gray-300">
                                                <span className="text-navy-dark font-black">{t.wizard.steps.step5.labels.system}</span>
                                                <span className="font-black text-solar-orange text-lg">{calculateEstimatedSystem(formData.bill)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <p className="text-gray-500 mb-6">{t.wizard.steps.step5.subtitle}</p>
                                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                                            <a
                                                href={`https://wa.me/919422787438?text=${encodeURIComponent(
                                                    `${t.wizard.steps.step5.cta.whatsappText}\n\nRequired for: ${formData.sector}\nEstimated System: ${calculateEstimatedSystem(formData.bill)}\nLocation: ${formData.location}\nName: ${formData.name}`
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-navy transition-all flex items-center justify-center gap-2"
                                            >
                                                <span>{t.wizard.steps.step5.cta.whatsapp}</span>
                                            </a>
                                            <a href="/gallery" className="px-8 py-4 bg-navy text-white rounded-full font-bold hover:bg-solar-orange transition-all flex items-center justify-center">{t.wizard.steps.step5.cta.gallery}</a>
                                        </div>
                                        <button onClick={() => setStep(1)} className="mt-6 text-gray-400 hover:text-navy transition-all text-sm font-bold">{t.wizard.steps.step5.cta.restart}</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Trust Footnote */}
                    <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-center gap-8 opacity-50 text-[10px] font-black uppercase tracking-widest text-gray-500 grayscale group-hover:grayscale-0 transition-all">
                        {t.wizard.trustLines.map((line, i) => (
                            <span key={i} className="flex items-center gap-2">{line}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
