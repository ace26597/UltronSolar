import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Solar Projects Gallery | Ultron Power Systems Dhule",
    description: "View our completed solar installation projects in Dhule, Jalgaon, and Nandurbar. Residential rooftops, commercial plants, and agricultural pumps.",
};

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: "Residential Rooftop",
            location: "Dhule City",
            capacity: "3kW",
            image: "/images/gallery-project-1.jpg",
        },
        {
            id: 2,
            title: "Commercial Installation",
            location: "MIDC Dhule",
            capacity: "50kW",
            image: "/images/gallery-project-2.jpg",
        },
        {
            id: 3,
            title: "Farm Solar Pump",
            location: "Sakri",
            capacity: "5HP",
            image: "/images/gallery-project-3.jpg",
        },
        {
            id: 4,
            title: "Hospital Solar Plant",
            location: "Shirpur",
            capacity: "20kW",
            image: "/images/gallery-project-4.jpg",
        },
        {
            id: 5,
            title: "Residential System",
            location: "Deopur",
            capacity: "5kW",
            image: "/images/gallery-project-5.jpg",
        },
        {
            id: 6,
            title: "School Project",
            location: "Sindkheda",
            capacity: "10kW",
            image: "/images/gallery-project-6.jpg",
        },
    ];

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-navy-dark text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Showcasing our successful solar installations across Maharashtra.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-navy-dark mb-2">{project.title}</h3>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>📍 {project.location}</span>
                                        <span className="font-semibold text-solar-red">⚡ {project.capacity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary-blue py-16 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Want to see your roof here?</h2>
                    <Link
                        href="/#contact"
                        className="inline-block bg-white text-primary-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Get Your Free Quote
                    </Link>
                </div>
            </section>
        </main>
    );
}
