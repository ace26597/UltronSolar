"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  const testimonials = [
    {
      name: "Pradip Deore",
      seoInfo: "Best Solar • Quality Products",
      content: "My experience at Ultron Power Systems was outstanding! Their hassle-free process made installation a breeze. The high-quality solar products exceeded my expectations, and I appreciated the available discounts. Timely delivery and a reliable partner ensured everything arrived as promised. The experienced staff provided excellent support throughout. Highly recommended!",
      rating: 5,
    },
    {
      name: "Pritish Mekha",
      seoInfo: "Best Solar Installation • Professional Service",
      content: "Exceptional service and top-notch installation from Ultron Solar Power System. The team was professional, knowledgeable, and efficient from initial consultation to final setup. The installation process was smooth and timely, with clear communication throughout. Their attention to detail and commitment to customer satisfaction truly sets them apart. A solid 5/5 experience—highly recommended for anyone considering solar energy.",
      rating: 5,
    },
    {
      name: "Shubham Mali",
      seoInfo: "Best Home Solar • Expert Team",
      content: "We had an absolutely fantastic experience with Ultron Services for our home solar installation! From our very first inquiry to the final activation, their team demonstrated professionalism, expertise, and a genuine commitment to customer satisfaction.",
      rating: 5,
    },
    {
      name: "Rohit Patil",
      seoInfo: "Quality Products • Best Solar",
      content: "The experience was wonderful with Ultron solar team was very humble and cooperative, they have given quality products and even more than they have promised, and also completed there job in Time. Thank you Ultron solar team, For dedication of your work and have bright future in what you do.",
      rating: 5,
    },
    {
      name: "Shubham Patil",
      seoInfo: "Best Net Metering • 3kW Solar System",
      content: "I Have Installed 3kw net metering solar system from Ultron Power Systems. Good workmanship of installation and work was executed in time. Fully satisfied with services provided. Experienced good team work of company.",
      rating: 5,
    },
    {
      name: "Nilesh Rajput",
      seoInfo: "Best Solar Inverter • Battery System",
      content: "Using battery inverters for the past eight years and using solar net meter system for the past four years has been a great service from time to time. Owner's nature is very nice.",
      rating: 5,
    },
    {
      name: "Nagaraj Mahajan",
      seoInfo: "Best Solar Service • Expert Guidance",
      content: "Excellent coordination and great team work and enthusiastic staff nice and useful guidance for the customer and service very good",
      rating: 5,
    },
    {
      name: "Narendra Khalane",
      seoInfo: "4KW Solar System • Quality Products • Technical Advice",
      content: "I have installed 4KW solar system, genuinely satisfied. Technical advice, Quality products/instruments/meters provided & Excellent team of staff",
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
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
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

        <div className="relative overflow-hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 text-center flex flex-col mx-auto max-w-[calc(100vw-3rem)] sm:max-w-none">
                    <div className="flex flex-col">
                      <div className="flex justify-center text-solar-red mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-base sm:text-lg">★</span>
                        ))}
                      </div>

                      <p className="text-gray-700 mb-4 sm:mb-6 italic leading-relaxed text-xs sm:text-sm md:text-base">
                        &quot;{testimonial.content}&quot;
                      </p>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-navy-dark">
                          {testimonial.name}
                        </h3>
                        <p className="text-primary-blue text-xs font-medium mt-1">
                          {testimonial.seoInfo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-navy-dark z-10 border border-gray-200 hidden md:block touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-navy-dark z-10 border border-gray-200 hidden md:block touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center mt-8 gap-1 sm:gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all duration-300 touch-manipulation ${
                    i === currentIndex 
                      ? 'w-6 sm:w-8 h-3 bg-solar-red' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
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
            className="inline-flex items-center text-navy-dark hover:text-primary-blue font-semibold transition-colors bg-gray-50 px-6 py-3 rounded-full hover:bg-gray-100 border border-gray-200 touch-manipulation min-h-[48px] text-sm sm:text-base"
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

