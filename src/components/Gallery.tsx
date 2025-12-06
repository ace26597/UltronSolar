"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);

  const projects = [
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

  return (
    <section id="gallery" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 touch-manipulation bg-gray-200"
            >
              <Image
                src={project.src}
                alt={project.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                quality={70}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFESEGEhMxQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADESEx/9oADAMBAAIRAxEAPwCvq2oarHbkSG9ZRFYqoWRgAAo2AA9AADj2Mxh6i1U9azNLJNJI7sWZnYkkn2Sf3GYpVr0lTGJJWf/Z"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.caption}
                  <div className="mt-2 text-xs text-gray-300 uppercase tracking-wider">{t.gallery.clickToView}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-3xl sm:text-4xl md:text-5xl hover:text-solar-red transition-colors z-50 focus:outline-none touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/50 rounded-full"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            &times;
          </button>

          {/* Mobile swipe navigation hint */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors bg-black/30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === null || prev === 0 ? projects.length - 1 : prev - 1));
            }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div
            className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center mx-8 sm:mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={projects[selectedImage].src}
                alt={projects[selectedImage].caption}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                quality={90}
              />
            </div>
            <p className="text-white text-sm sm:text-base md:text-lg mt-2 sm:mt-4 font-medium text-center bg-black/50 px-3 sm:px-6 py-2 rounded-full backdrop-blur-md max-w-[90vw]">
              {projects[selectedImage].caption}
            </p>
          </div>

          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors bg-black/30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === null || prev === projects.length - 1 ? 0 : prev + 1));
            }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}
