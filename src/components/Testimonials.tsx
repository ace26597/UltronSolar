"use client";

import { useState } from "react";

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState(0);

  const testimonials = [
    {
      name: "Pradip Deore",
      seoInfo: "4 Google Reviews • 5 months ago",
      content: "My experience at Ultron Power Systems was outstanding! Their hassle-free process made installation a breeze. The high-quality solar products exceeded my expectations, and I appreciated the available discounts. Timely delivery and a reliable partner ensured everything arrived as promised. The experienced staff provided excellent support throughout. Highly recommended!",
      rating: 5,
      systemType: "Solar Installation & Products",
    },
    {
      name: "Pritish Mekha",
      seoInfo: "3 Google Reviews • 5 months ago",
      content: "Exceptional service and top-notch installation from Ultron Solar Power System. The team was professional, knowledgeable, and efficient from initial consultation to final setup. The installation process was smooth and timely, with clear communication throughout. Their attention to detail and commitment to customer satisfaction truly sets them apart. A solid 5/5 experience—highly recommended for anyone considering solar energy.",
      rating: 5,
      systemType: "Rooftop Solar Installation",
    },
    {
      name: "Shubham Mali",
      seoInfo: "1 Google Review • 5 months ago",
      content: "We had an absolutely fantastic experience with Ultron Services for our home solar installation! From our very first inquiry to the final activation, their team demonstrated professionalism, expertise, and a genuine commitment to customer satisfaction.",
      rating: 5,
      systemType: "Home Solar System",
    },
    {
      name: "Rohit Patil",
      seoInfo: "1 Google Review • 5 months ago",
      content: "The experience was wonderful with Ultron solar team was very humble and cooperative, they have given quality products and even more than they have promised, and also completed there job in Time. Thank you Ultron solar team, For dedication of your work and have bright future in what you do.",
      rating: 5,
      systemType: "Solar Products & Installation",
    },
    {
      name: "Shubham Patil",
      seoInfo: "1 Google Review • 1 year ago",
      content: "I Have Installed 3kw net metering solar system from Ultron Power Systems. Good workmanship of installation and work was executed in time. Fully satisfied with services provided. Experienced good team work of company.",
      rating: 5,
      systemType: "3kW Net Metering System",
    },
    {
      name: "Nilesh Rajput",
      seoInfo: "5 Google Reviews • 1 year ago",
      content: "Using battery inverters for the past eight years and using solar net meter system for the past four years has been a great service from time to time. Owner's nature is very nice.",
      rating: 5,
      systemType: "Solar Net Metering & Battery Inverters",
    },
    {
      name: "Nagaraj Mahajan",
      seoInfo: "1 Google Review • 1 year ago",
      content: "Excellent coordination and great team work and enthusiastic staff nice and useful guidance for the customer and service very good",
      rating: 5,
      systemType: "Solar Consultation & Service",
    }
  ];

  // Split testimonials into tabs with 3 reviews per tab
  const tabs = [
    testimonials.slice(0, 3),  // Tab 1: 3 reviews
    testimonials.slice(3, 6),  // Tab 2: 3 reviews
    testimonials.slice(6, 7),  // Tab 3: 1 review
  ].filter(tab => tab.length > 0); // Remove empty tabs

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

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 pb-4">
          {tabs.map((tab, tabIndex) => (
            <button
              key={tabIndex}
              onClick={() => setActiveTab(tabIndex)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tabIndex
                  ? "bg-solar-red text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={`View reviews tab ${tabIndex + 1}`}
            >
              Review {tabIndex + 1}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative">
          <div className={`grid gap-6 ${
            tabs[activeTab]?.length === 1 
              ? 'grid-cols-1 max-w-2xl mx-auto' 
              : tabs[activeTab]?.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {tabs[activeTab]?.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 text-center h-full flex flex-col relative"
              >
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
                  <h3 className="text-lg font-bold text-navy-dark mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium mb-2">
                    {testimonial.seoInfo}
                  </p>
                  <p className="text-primary-blue text-xs font-semibold uppercase tracking-wide">
                    {testimonial.systemType}
                  </p>
                </div>
              </div>
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

