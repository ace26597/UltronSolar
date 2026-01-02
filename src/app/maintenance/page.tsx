"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";
import CtaButton from "@/components/cta/CtaButton";
import { selectCta } from "@/utils/ctaSelector";

export default function MaintenancePage() {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);
    const maintenanceCta = selectCta({
        page: 'home',
        audience: 'generic',
        language: currentLanguage,
    });

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-navy-dark text-white py-20 pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Solar Operation & Maintenance (O&M)
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Ensure your solar system performs at its peak with our professional maintenance and repair services in North Maharashtra.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Maintenance Service 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🧼</div>
                            <h3 className="text-2xl font-bold text-navy-dark mb-4">Professional Cleaning</h3>
                            <p className="text-gray-600 mb-6">
                                Dust and bird droppings can reduce your energy generation by up to 30%. Our team uses specialized equipment and demineralized water for safe, effective cleaning.
                            </p>
                        </div>

                        {/* Maintenance Service 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-navy-dark mb-4">Health Checkups</h3>
                            <p className="text-gray-600 mb-6">
                                Regular inspection of inverters, wiring, and mounting structures to identify potential issues before they cause system downtime.
                            </p>
                        </div>

                        {/* Maintenance Service 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🛠️</div>
                            <h3 className="text-2xl font-bold text-navy-dark mb-4">Repair & AMC</h3>
                            <p className="text-gray-600 mb-6">
                                Comprehensive Annual Maintenance Contracts (AMC) for complete peace of mind, including breakdown support and component replacements.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
                        <h3 className="text-3xl font-bold text-navy-dark mb-6">Need Solar Service or Repair?</h3>
                        <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
                            Whether we installed your system or not, our expert team is ready to help you maximize your solar investment.
                        </p>
                        <div className="flex justify-center">
                            <CtaButton
                                ctaId={maintenanceCta.id}
                                variant="primary"
                                className="px-10 py-5 text-lg"
                                trackEventName="maintenance_page_cta_click"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
