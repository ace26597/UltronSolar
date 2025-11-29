"use client";

import Image from "next/image";

export default function SpecialOffer() {
  return (
    <section id="special-offer" className="py-20 bg-gradient-to-br from-navy-dark to-navy-DEFAULT text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-solar-red text-white px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
            LIMITED TIME OFFER
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Power Your Home for Less
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get a complete 3kW Solar Rooftop System at an unbeatable price.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: Pricing & Inclusions */}
          <div className="lg:w-1/2 p-8 md:p-12 bg-gray-50 border-r border-gray-100">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-navy-dark mb-2">3kW Rooftop Solar System</h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-5xl md:text-6xl font-black text-solar-red">₹99,999</span>
                <span className="text-gray-500 text-lg line-through">₹1,45,000</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                *Exclusive offer for Dhule & North Maharashtra
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-navy-dark uppercase tracking-wide text-sm">What&apos;s Included:</h4>
              <ul className="space-y-3">
                {[
                  "High-efficiency Polycrystalline Panels",
                  "Advanced Solar Inverter (On-grid)",
                  "Complete Mounting Structure",
                  "Professional Installation & Wiring",
                  "Net Metering Assistance",
                  "Subsidy Documentation Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Benefits & CTA */}
          <div className="lg:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
            <div className="mb-8">
              <h4 className="font-bold text-navy-dark uppercase tracking-wide text-sm mb-6">Why Grab This Deal?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-lg mr-4 text-primary-blue">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-dark">Save Money</h5>
                    <p className="text-sm text-gray-600">Reduce electricity bills by up to 90%</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-green-50 rounded-lg mr-4 text-energy-green">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-dark">Eco-Friendly</h5>
                    <p className="text-sm text-gray-600">Reduce your carbon footprint</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <a
                href="#contact"
                className="block w-full text-center bg-solar-red text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-solar-red-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Claim Offer Now
              </a>
              <p className="text-xs text-gray-400 text-center mt-4">
                *Terms & Conditions apply. Price subject to site inspection and government subsidy availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

