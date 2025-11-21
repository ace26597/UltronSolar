"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  const testimonials = [
    {
      name: "Rajesh Patil",
      role: "Homeowner",
      location: "Dhule",
      content: "Excellent service from Ultron Power Systems. The team was professional and completed the solar installation for my home on time. Seeing a significant drop in my electricity bill already!",
      rating: 5,
    },
    {
      name: "Amit Deshmukh",
      role: "Business Owner",
      location: "Dhule",
      content: "We installed a 10kW system for our office. The guidance on subsidies and the seamless installation process made it a great experience. Highly recommended for commercial solar needs.",
      rating: 5,
    },
    {
      name: "Suresh Choudhary",
      role: "Farm Owner",
      location: "Near Dhule",
      content: "The solar water pump system has been a game changer for my farm. No more worries about power cuts. Thank you to the Ultron team for the suggestion and support.",
      rating: 5,
    },
    {
      name: "Dr. Sanjay Gupta",
      role: "Hospital Owner",
      location: "Jalgaon",
      content: "Reliable power backup was crucial for my hospital. Ultron's solar hybrid system works perfectly. Their after-sales support is also very responsive.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Industrialist",
      location: "Nashik",
      content: "Ultron provided a comprehensive EPC solution for our factory. Their technical expertise and project management were impressive. The system is performing above expectations.",
      rating: 5,
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - itemsToShow + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length, itemsToShow]);

  const maxIndex = testimonials.length - itemsToShow;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by homeowners and businesses across Maharashtra
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <span className="text-solar-red text-xl font-bold">4.9/5</span>
            <div className="flex text-solar-red">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-gray-500 text-sm">(based on Google Reviews)</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden px-4 -mx-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 text-center h-full flex flex-col relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-md border-4 border-white">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div className="flex justify-center text-solar-red mb-4 mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>

                    <p className="text-gray-700 mb-6 italic leading-relaxed flex-grow text-sm md:text-base">
                      &quot;{testimonial.content}&quot;
                    </p>

                    <div>
                      <h3 className="text-lg font-bold text-navy-dark">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {testimonial.role} – {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-navy-dark z-10 border border-gray-200 hidden md:block"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-navy-dark z-10 border border-gray-200 hidden md:block"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-solar-red w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/search?q=Ultron+Power+Systems+Dhule"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-navy-dark hover:text-primary-blue font-semibold transition-colors bg-gray-50 px-6 py-3 rounded-full hover:bg-gray-100 border border-gray-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-2.14-.15-2.14z" />
            </svg>
            Read more reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

