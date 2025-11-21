"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 text-center mx-auto max-w-2xl relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-md border-4 border-white">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div className="flex justify-center text-solar-red mb-6 mt-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-2xl">★</span>
                      ))}
                    </div>

                    <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>

                    <div>
                      <h3 className="text-xl font-bold text-navy-dark">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 font-medium">
                        {testimonial.role} – {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-solar-red w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/search?q=Ultron+Power+Systems+Dhule"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-navy-dark hover:text-primary-blue font-semibold transition-colors bg-gray-50 px-6 py-3 rounded-full hover:bg-gray-100"
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

