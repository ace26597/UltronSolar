import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery-project-4.jpg"
                alt="Ultron Power Systems Installation"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-solar-gold p-6 rounded-lg shadow-xl hidden lg:block">
              <div className="text-3xl font-bold text-navy-dark">10+</div>
              <div className="text-sm text-navy-dark">Years Experience</div>
            </div>
          </div>
          
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
        </div>
        
        {/* Additional Info Card */}
        <div className="mt-16 bg-gradient-to-br from-solar-yellow to-solar-orange p-8 rounded-xl shadow-lg text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">About Us</h3>
              <p className="mb-6 text-lg leading-relaxed">
                Ultron Power Systems is the go-to provider of solar power systems and products. 
                Our team of experts is dedicated to customizing solutions tailored to meet the unique 
                needs of each customer. From rooftop installations to farm, residential and business 
                applications, we have you covered.
              </p>
            </div>
            <div>
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
      </div>
    </section>
  );
}

