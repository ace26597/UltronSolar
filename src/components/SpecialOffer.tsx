import Image from "next/image";

export default function SpecialOffer() {
  return (
    <section id="special-offer" className="py-20 bg-gradient-to-br from-solar-red via-solar-red-light to-primary-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-block bg-solar-red text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              Special Deal
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-navy-dark mb-4">
              Solar Rooftop System Under ₹1,00,000
            </h2>
            <div className="text-5xl md:text-6xl font-bold text-solar-red mb-6">
              ₹99,999
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-navy-dark mb-4">
                  What&apos;s Included
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-solar-red text-xl mr-3">✓</span>
                    <p className="text-gray-700">State-of-the-art solar panel systems</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-solar-red text-xl mr-3">✓</span>
                    <p className="text-gray-700">Robust and reliable installation</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-solar-red text-xl mr-3">✓</span>
                    <p className="text-gray-700">Exceptional after-sales service</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-solar-red text-xl mr-3">✓</span>
                    <p className="text-gray-700">Comprehensive maintenance support</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-solar-red text-xl mr-3">✓</span>
                    <p className="text-gray-700">Best quality solar solutions</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-navy-dark mb-4">
                  Benefits
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-energy-green text-xl mr-3">🌱</span>
                    <p className="text-gray-700">Energy savings and reduced carbon footprint</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-energy-green text-xl mr-3">💰</span>
                    <p className="text-gray-700">Significant reduction in electricity bills</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-energy-green text-xl mr-3">🏠</span>
                    <p className="text-gray-700">Perfect for home, business, or farm</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-energy-green text-xl mr-3">⚡</span>
                    <p className="text-gray-700">Harness clean, renewable energy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[400px] lg:h-auto rounded-xl overflow-hidden shadow-lg border-4 border-gray-100">
              <Image
                src="/images/special-offer-brochure.jpg"
                alt="Solar System Special Offer Brochure"
                fill
                className="object-contain bg-white hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="text-center border-t border-gray-100 pt-8">
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Experience the power of the sun at an unbeatable price! Invest in the best quality 
              solar solutions and enjoy the dual benefits of energy savings and a reduced carbon footprint.
            </p>
            <a
              href="#contact"
              className="inline-block bg-energy-green text-white px-10 py-4 rounded-lg font-bold text-xl hover:bg-energy-green-dark transition-colors shadow-lg"
            >
              Claim Offer Now
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Limited time offer - Contact us today to take a step towards a greener tomorrow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

