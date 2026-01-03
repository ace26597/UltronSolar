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
    { src: "/images/gallery-project-1.jpg", caption: "5 kW Residential Rooftop Solar System – Dhule, Maharashtra", impact: "Electricity bill reduced to zero", city: "Dhule" },
    { src: "/images/gallery-project-2.jpg", caption: "10 kW Commercial Solar Installation – Dhule", impact: "₹1.2 Lakh annual savings", city: "Dhule" },
    { src: "/images/gallery-project-3.jpg", caption: "Industrial Solar Panel Array Setup", impact: "3-Year ROI achieved", city: "North Maharashtra" },
    { src: "/images/gallery-project-4.jpg", caption: "Residential Rooftop Solar Power System", impact: "Zero grid dependence", city: "Jalgaon" },
    { src: "/images/gallery-project-5.jpg", caption: "Large Scale Commercial Solar Installation", impact: "35% reduction in OPEX", city: "Dhule" },
    { src: "/images/gallery-project-6.jpg", caption: "Agricultural Solar Water Pump System – Near Dhule", impact: "Diesel costs eliminated", city: "Sakri" },
    { src: "/images/gallery-project-7.jpg", caption: "Commercial Rooftop Solar Plant – Dhule", impact: "Tax benefits and accelerated depreciation", city: "Dhule" },
    { src: "/images/gallery-project-8.jpg", caption: "Home Solar Energy Setup – Maharashtra", impact: "₹4,500 monthly savings", city: "Maharashtra" },
    { src: "/images/gallery-project-9.jpg", caption: "Professional Solar Installation Project", impact: "Certified high-yield design", city: "Jalgaon" },
    { src: "/images/gallery-project-10.jpg", caption: "Farm Solar Water Pump Solution – Rural Maharashtra", impact: "Reliable irrigation for 10+ acres", city: "Maharashtra" },
    { src: "/images/gallery-project-11.jpg", caption: "Industrial Solar Power System", impact: "Carbon footprint reduced by 60%", city: "Dhule" },
    { src: "/images/gallery-project-12.png", caption: "Complete Solar EPC Project Execution", impact: "End-to-end turnkey solution", city: "North Maharashtra" },
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-20">
          <div className="inline-block bg-navy/5 text-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            Our Proven Track Record
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-navy-dark mb-6">
            Recent Deployments Across <span className="text-solar-orange">Maharashtra</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto italic">
            Visual proof of our commitment to engineering excellence and customer success. 50+ projects executed with 100% technical compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative h-64 md:h-72 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:-translate-y-2 touch-manipulation bg-navy/10 border-2 border-white/50"
            >
              <Image
                src={project.src}
                alt={project.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/40 to-transparent p-6 pt-12 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-solar-orange text-[10px] font-black uppercase tracking-widest mb-1">{project.city}</div>
                <div className="text-white text-sm font-bold line-clamp-2 mb-2">{project.caption}</div>
                <div className="h-1 w-0 group-hover:w-12 bg-solar-orange transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[60] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl hover:text-solar-orange transition-all z-50 focus:outline-none touch-manipulation p-4 rounded-full bg-white/5 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>

          <div
            className="relative w-full max-w-6xl h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex-1 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
              <Image
                src={projects[selectedImage].src}
                alt={projects[selectedImage].caption}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
              />

              {/* Overlay Stat */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] max-w-2xl text-white shadow-2xl shadow-black/30">
                  <div className="text-solar-orange text-xs font-black uppercase tracking-[0.3em] mb-3">Project Impact</div>
                  <div className="text-2xl md:text-3xl font-black mb-4 leading-tight">{projects[selectedImage].impact}</div>
                  <div className="text-sm text-white/70 italic">&quot;{projects[selectedImage].caption}&quot;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
