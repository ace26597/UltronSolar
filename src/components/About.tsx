export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
              Why Ultron Power Systems?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Ultron Power Systems is the go-to provider of solar power systems and products. 
                Our team of experts is dedicated to customizing solutions tailored to meet the unique 
                needs of each customer. From rooftop installations to farm, residential and business 
                applications, we have you covered.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">Complete EPC Solutions</h4>
                    <p className="text-gray-600">From initial design and engineering to procurement and construction, we handle every aspect of your solar project.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">Multiple Applications</h4>
                    <p className="text-gray-600">We serve residential properties, commercial businesses, industrial facilities, farms, and apartments with customized solutions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">High-Quality & Reliable</h4>
                    <p className="text-gray-600">Our full-service approach ensures peace of mind with premium equipment and expert installation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">Customized Solutions</h4>
                    <p className="text-gray-600">We tailor solutions to meet the unique needs of each customer, ensuring optimal performance and value.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-solar-yellow to-solar-orange p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4">About Us</h3>
            <p className="mb-6 text-lg leading-relaxed">
              Ultron Power Systems is the go-to provider of solar power systems and products. 
              Our team of experts is dedicated to customizing solutions tailored to meet the unique 
              needs of each customer. From rooftop installations to farm, residential and business 
              applications, we have you covered.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Our high-quality, reliable and full-service approach ensures peace of mind. 
              Contact us today to learn how we can power your future with solar technology.
            </p>
            <a
              href="#contact"
              className="inline-block bg-white text-navy-dark px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

