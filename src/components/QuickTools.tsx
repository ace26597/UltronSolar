"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

const quickTools = [
    {
        id: "bill-analyzer",
        href: "/tools/bill-analyzer",
        title: "Bill Analyzer",
        desc: "AI-powered ROI from your bill",
        icon: "📄",
        color: "bg-blue-500",
    },
    {
        id: "instant-quote",
        href: "/tools/instant-quote",
        title: "Instant Quote",
        desc: "30-second system estimation",
        icon: "💰",
        color: "bg-green-500",
    },
    {
        id: "subsidy-wizard",
        href: "/tools/subsidy-wizard",
        title: "Subsidy Wizard",
        desc: "Check PM Surya Ghar eligibility",
        icon: "🏛️",
        color: "bg-orange-500",
    },
];

export default function QuickTools() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-navy/5 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-navy mb-2">Smart Solar Tools</h2>
                            <p className="text-gray-500">Calculated specifically for Maharashtra region</p>
                        </div>
                        <Link
                            href="/tools"
                            className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition-all flex items-center gap-2"
                        >
                            View All Tools
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickTools.map((tool, index) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={tool.href}
                                    className="group flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-solar-orange hover:bg-white hover:shadow-lg transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-navy group-hover:text-solar-orange transition-colors">{tool.title}</h3>
                                        <p className="text-xs text-gray-500">{tool.desc}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
