"use client";

import { useState } from "react";
import QuickEstimate from "./QuickEstimate";
import { SimulatorTab, EstimateOutput } from "@/types/solar";

// Lazy load other tabs when needed
import dynamic from "next/dynamic";

const SolarSimulation = dynamic(
    () => import("@/components/SolarSimulation"),
    {
        loading: () => <TabLoadingPlaceholder />,
        ssr: false
    }
);

function TabLoadingPlaceholder() {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-primary-blue-200 border-t-primary-blue-500 rounded-full animate-spin" />
        </div>
    );
}

interface TabConfig {
    id: SimulatorTab;
    label: string;
    icon: React.ReactNode;
    description: string;
}

const TABS: TabConfig[] = [
    {
        id: "quick-estimate",
        label: "Quick Estimate",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        description: "Calculate savings from your electricity bill",
    },
    {
        id: "draw-roof",
        label: "Draw Roof",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        ),
        description: "Draw your roof on a map for accurate sizing",
    },
    {
        id: "photo",
        label: "Photo Visualization",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        description: "Upload a photo to see panels on your roof",
    },
];

export default function SolarSimulatorClient() {
    const [activeTab, setActiveTab] = useState<SimulatorTab>("quick-estimate");
    const [latestEstimate, setLatestEstimate] = useState<EstimateOutput | null>(null);

    const handleEstimateComplete = (result: EstimateOutput) => {
        setLatestEstimate(result);
    };

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-4">
                        Solar Savings Calculator
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover how much you can save with solar energy. Get instant estimates,
                        design your system, or visualize panels on your roof.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all
                  ${activeTab === tab.id
                                        ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/25"
                                        : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200"
                                    }
                `}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Description */}
                    <p className="text-center text-gray-500 mt-4 text-sm">
                        {TABS.find((t) => t.id === activeTab)?.description}
                    </p>
                </div>

                {/* Tab Content */}
                <div className="min-h-[500px]">
                    {activeTab === "quick-estimate" && (
                        <QuickEstimate onEstimateComplete={handleEstimateComplete} />
                    )}

                    {activeTab === "draw-roof" && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-blue-100 to-primary-blue-200 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-primary-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-navy-dark mb-3">Map-Based Roof Designer</h3>
                            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                                Draw your roof outline on Google Maps to get accurate panel placement and sizing.
                                This feature uses your actual roof dimensions for precise estimates.
                            </p>
                            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>Coming soon in Phase 2</span>
                            </div>
                        </div>
                    )}

                    {activeTab === "photo" && <SolarSimulation />}
                </div>

                {/* Latest Estimate Summary (if available) */}
                {latestEstimate && activeTab !== "quick-estimate" && (
                    <div className="mt-8 bg-white rounded-xl shadow-md p-4 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-solar-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-solar-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Your last estimate</div>
                                <div className="font-semibold text-navy-dark">
                                    {latestEstimate.recommendedKw} kW system • ₹{latestEstimate.monthlySavings.toLocaleString('en-IN')}/month savings
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setActiveTab("quick-estimate")}
                            className="text-primary-blue hover:text-primary-blue-dark font-medium text-sm"
                        >
                            View Details →
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
