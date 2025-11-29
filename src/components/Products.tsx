"use client";

import Image from "next/image";
import { useRef } from "react";
import CtaButton from "@/components/cta/CtaButton";
import { useLanguage } from "@/context/LanguageContext";
import { selectCta } from "@/utils/ctaSelector";

const ProductCard = ({ product, ctaId }: { product: any; ctaId: string }) => (
  <div className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 group">
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={product.image}
        alt={product.alt || product.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white font-semibold">View Details</span>
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-navy-dark mb-2 group-hover:text-solar-red transition-colors">
        {product.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
        {product.description}
      </p>
      <CtaButton
        ctaId={ctaId}
        className="!w-full !text-center !bg-gray-50 !text-navy-dark !px-4 !py-2 !text-base !font-semibold hover:!bg-solar-red hover:!text-white !border !border-gray-200 hover:!border-solar-red !shadow-none hover:!shadow-md !transform-none hover:!-translate-y-0"
        variant="outline"
        trackEventName="product_card_cta_click"
      />
    </div>
  </div>
);

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();
  const productCta = selectCta({
    page: 'residential',
    audience: 'residential',
    language: currentLanguage,
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -340 : 340;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const products = [
    {
      title: "Solar Water Pump",
      description: "Reliable solar powered water pump systems for agriculture and irrigation needs.",
      image: "/images/product-solar-pump.jpg",
      alt: "Solar Water Pump System for Agriculture",
    },
    {
      title: "Solar Power UPS",
      description: "Uninterrupted power supply solutions for homes and businesses.",
      image: "/images/product-solar-ups.jpg",
      alt: "Solar Power UPS and Battery Backup System",
    },
    {
      title: "Voltage Stabilizer",
      description: "Servo controlled voltage stabilizers for equipment protection.",
      image: "/images/product-servo-stabilizer.jpg",
      alt: "Servo Controlled Voltage Stabilizer",
    },
    {
      title: "Solar Street Lights",
      description: "Automatic, energy-efficient lighting for streets and campuses.",
      image: "/images/product-solar-lights.jpg",
      alt: "Automatic Solar Street Light System",
    },
    {
      title: "Rooftop Solar Panels",
      description: "High-efficiency solar panels for maximum energy generation.",
      image: "/images/gallery-project-2.jpg",
      alt: "Rooftop Solar Panel Installation for Home and Business",
    },
    {
      title: "Solar Water Heater",
      description: "Cost-effective water heating solutions for all seasons.",
      image: "/images/gallery-project-1.jpg",
      alt: "Solar Water Heater System",
    },
  ];

  return (
    <section id="products" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600">
              Premium quality solar equipment for residential, commercial, and agricultural use.
            </p>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white border border-gray-300 text-navy-dark hover:bg-solar-red hover:text-white hover:border-solar-red transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white border border-gray-300 text-navy-dark hover:bg-solar-red hover:text-white hover:border-solar-red transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} ctaId={productCta.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

