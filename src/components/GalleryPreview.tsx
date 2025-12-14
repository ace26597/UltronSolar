"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

// Shared project data - export for use in full gallery page
export const projects = [
    { src: "/images/gallery-project-1.jpg", caption: "5 kW Residential Rooftop Solar System – Dhule, Maharashtra" },
    { src: "/images/gallery-project-2.jpg", caption: "10 kW Commercial Solar Installation – Dhule" },
    { src: "/images/gallery-project-3.jpg", caption: "Industrial Solar Panel Array Setup" },
    { src: "/images/gallery-project-4.jpg", caption: "Residential Rooftop Solar Power System" },
    { src: "/images/gallery-project-5.jpg", caption: "Large Scale Commercial Solar Installation" },
    { src: "/images/gallery-project-6.jpg", caption: "Agricultural Solar Water Pump System – Near Dhule" },
    { src: "/images/gallery-project-7.jpg", caption: "Commercial Rooftop Solar Plant – Dhule" },
    { src: "/images/gallery-project-8.jpg", caption: "Home Solar Energy Setup – Maharashtra" },
    { src: "/images/gallery-project-9.jpg", caption: "Professional Solar Installation Project" },
    { src: "/images/gallery-project-10.jpg", caption: "Farm Solar Water Pump Solution – Rural Maharashtra" },
    { src: "/images/gallery-project-11.jpg", caption: "Industrial Solar Power System" },
    { src: "/images/gallery-project-12.png", caption: "Complete Solar EPC Project Execution" },
];

interface GalleryPreviewProps {
    /** Number of images to show (default: 4) */
    limit?: number;
}

export default function GalleryPreview({ limit = 4 }: GalleryPreviewProps) {
    const { currentLanguage } = useLanguage();
    const t = getTranslations(currentLanguage);

    const previewProjects = projects.slice(0, limit);
    const remainingCount = projects.length - limit;

    return (
        <section id="gallery" className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
                        {t.gallery.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t.gallery.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {previewProjects.map((project, index) => (
                        <div
                            key={index}
                            className="relative h-56 sm:h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group bg-gray-200"
                        >
                            <Image
                                src={project.src}
                                alt={project.caption}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                loading="lazy"
                                quality={70}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFESEGEhMxQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwCvq2oarHbkSG9ZRFYqoWRgAAo2AA9AADj2Mxh6i1U9azNLJNJI7sWZnYkkn2Sf3GYpVr0lTGJJWf/Z"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {project.caption}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 bg-primary-blue text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-blue-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        View All Projects
                        {remainingCount > 0 && (
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                                +{remainingCount} more
                            </span>
                        )}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
