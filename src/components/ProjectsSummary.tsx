"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProjectsSummary() {
    const projects = [
        {
            title: "Residential Rooftop",
            location: "Dhule City",
            image: "/images/gallery-project-1.jpg",
        },
        {
            title: "Commercial Installation",
            location: "MIDC Dhule",
            image: "/images/gallery-project-2.jpg",
        },
        {
            title: "Farm Solar Pump",
            location: "Sakri",
            image: "/images/gallery-project-3.jpg",
        },
    ];

    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
                        Our Recent Projects
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See how we are powering homes and businesses across Maharashtra.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-xl">{project.title}</h3>
                                <p className="text-gray-300 text-sm">{project.location}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-navy-dark hover:bg-navy-light md:text-lg transition-colors"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
