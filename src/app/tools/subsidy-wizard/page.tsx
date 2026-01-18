"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

const questions = [
    {
        id: "sector",
        question: "Which sector do you belong to?",
        options: [
            { label: "Residential (Home)", value: "residential" },
            { label: "Agricultural (Farm)", value: "agricultural" },
            { label: "Commercial / Business", value: "commercial" },
        ]
    },
    {
        id: "connection",
        question: "Do you have an active electricity connection?",
        options: [
            { label: "Yes, I have a meter", value: "yes" },
            { label: "No, or new connection needed", value: "no" },
        ]
    },
    {
        id: "ownership",
        question: "Do you own the property/roof?",
        options: [
            { label: "Yes, I am the owner", value: "yes" },
            { label: "No, it is rented/leased", value: "no" },
        ]
    },
    {
        id: "taxPayer",
        question: "Are you an income tax payer?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
        hint: "Tax status doesn't disqualify you, but helps us check specific bank loan subventions."
    }
];

export default function SubsidyWizardPage() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (value: string) => {
        const newAnswers = { ...answers, [questions[step].id]: value };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setShowResult(true);
        }
    };

    const isEligible = answers.sector !== 'commercial' && answers.connection === 'yes' && answers.ownership === 'yes';

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <section className="flex-1 py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-navy mb-4">Subsidy Eligibility Wizard</h1>
                        <p className="text-gray-600">PM Surya Ghar & PM-KUSUM Scheme Eligibility Check</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
                            >
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-solar-orange uppercase tracking-widest">Question {step + 1} of {questions.length}</span>
                                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-solar-orange transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-navy">{questions[step].question}</h2>
                                    {questions[step].hint && <p className="text-sm text-gray-500 mt-2 italic">{questions[step].hint}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {questions[step].options.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleAnswer(option.value)}
                                            className="group flex items-center justify-between p-6 rounded-2xl border-2 border-gray-50 hover:border-solar-orange hover:bg-solar-orange/5 transition-all text-left"
                                        >
                                            <span className="text-lg font-bold text-navy group-hover:text-solar-orange transition-colors">{option.label}</span>
                                            <div className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-solar-orange flex items-center justify-center transition-colors">
                                                <div className="w-3 h-3 bg-solar-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {step > 0 && (
                                    <button onClick={() => setStep(step - 1)} className="mt-8 text-gray-400 font-bold hover:text-navy transition-colors flex items-center gap-2">
                                        ← Previous Question
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                            >
                                <div className={`${isEligible ? 'bg-green-600' : 'bg-orange-600'} p-10 text-white text-center`}>
                                    <div className="text-5xl mb-6">{isEligible ? "🎉" : "📋"}</div>
                                    <h2 className="text-3xl font-bold mb-2">
                                        {isEligible ? "You are Eligible!" : "Custom Plan Needed"}
                                    </h2>
                                    <p className="opacity-90">
                                        {isEligible
                                            ? "Great news! You qualify for the PM Surya Ghar Muft Bijli Yojana."
                                            : "The standard subsidy may not apply, but we have great financing options."}
                                    </p>
                                </div>

                                <div className="p-8 md:p-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div>
                                            <h3 className="text-xl font-bold text-navy mb-6">Required Documents Checklist</h3>
                                            <ul className="space-y-4">
                                                {[
                                                    "Latest Electricity Bill (Last 3 months)",
                                                    "Property Tax Receipt / Index 2",
                                                    "Passport size photo of owner",
                                                    "Canceled Cheque / Passbook (for subsidy deposit)",
                                                    "Aadhar Card & Mobile linked to Aadhar",
                                                ].map((doc, i) => (
                                                    <li key={i} className="flex gap-4 items-start text-gray-600">
                                                        <div className="mt-1 w-5 h-5 rounded border-2 border-gray-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                                                            {i + 1}
                                                        </div>
                                                        <span>{doc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                            <h3 className="text-xl font-bold text-navy mb-4">How we help you:</h3>
                                            <div className="space-y-6">
                                                <div className="flex gap-4">
                                                    <div className="text-2xl">⚡</div>
                                                    <div>
                                                        <p className="font-bold text-sm">Design & Install</p>
                                                        <p className="text-xs text-gray-500">Tier-1 equipment with 25yr warranty.</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-2xl">📋</div>
                                                    <div>
                                                        <p className="font-bold text-sm">Paperwork Handled</p>
                                                        <p className="text-xs text-gray-500">We manage portals, Discom & Govt approvals.</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-2xl">💰</div>
                                                    <div>
                                                        <p className="font-bold text-sm">EMI Assistance</p>
                                                        <p className="text-xs text-gray-500">Low-interest solar loans from top banks.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10">
                                                <button
                                                    onClick={() => window.location.href = '/contact'}
                                                    className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy/90 transition-all shadow-lg"
                                                >
                                                    Book Free Consultant Visit
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 text-center text-xs text-gray-400">
                                        <p>*Eligibility is subject to final verification of documents and site survey by UltronSolar team.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </section>

            <Footer />
        </main>
    );
}
