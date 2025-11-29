import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Solar Services in Dhule | Residential, Commercial & Agricultural Solar",
    description: "Expert solar installation services in Dhule & North Maharashtra. Rooftop solar for homes, commercial solar plants, and solar water pumps for farms.",
};

export default function ServicesPage() {
    const services = [
        {
            title: "Residential Rooftop Solar",
            description: "Slash your electricity bills by up to 90% with our premium rooftop solar systems. We handle everything from design to subsidy processing.",
            icon: "🏠",
            features: ["Subsidy Support", "25-Year Warranty", "Net Metering Setup"],
        },
        {
            title: "Commercial & Industrial Solar",
            description: "Reduce operational costs and carbon footprint. Customized solar power plants for factories, hospitals, schools, and offices.",
            icon: "🏢",
            features: ["High ROI", "Tax Benefits", "Custom Engineering"],
        },
        {
            title: "Solar Water Pumps",
            description: "Reliable irrigation solutions for farmers. Day-time running without electricity bills. Government subsidy schemes available.",
            icon: "🚜",
            features: ["Kusum Yojana Support", "Zero Running Cost", "Durable Pumps"],
        },
        {
            title: "Operation & Maintenance",
            description: "Keep your solar plant running at peak efficiency with our cleaning and maintenance services.",
            icon: "🛠️",
            features: ["Regular Cleaning", "Performance Monitoring", "Repairs"],
        },
    ];

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-navy-dark text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Solar Services</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Comprehensive solar energy solutions tailored for homes, businesses, and farms in Dhule and North Maharashtra.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="text-5xl mb-6">{service.icon}</div>
                                <h2 className="text-2xl font-bold text-navy-dark mb-4">{service.title}</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                <ul className="space-y-2 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <span className="text-solar-red mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/#contact"
                                    className="inline-block bg-primary-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-navy-dark transition-colors"
                                >
                                    Get a Quote
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-solar-red py-16 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Switch to Solar?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contact us today for a free site survey and consultation. Let's power your future together.
                    </p>
                    <Link
                        href="/#contact"
                        className="bg-white text-solar-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Contact Us Now
                    </Link>
                </div>
            </section>
        </main>
    );
}
