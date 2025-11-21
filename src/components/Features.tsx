"use client";

export default function Features() {
  const services = [
    {
      title: "Expert Installations",
      description: "We specialize in offering premium solar panel installation services for homes, businesses, apartments, and farms. Our team of experts is skilled in effective installation and deeply knowledgeable about optimizing the positioning of solar panels to maximize sunlight exposure and energy generation.",
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      number: "01",
    },
    {
      title: "Flexible Payment Options",
      description: "We understand that every customer has different preferences when it comes to payment. We provide assistance for bank loans with streamlined processing specifically for solar projects. Additionally, we guide our customers in availing government subsidies designed to support the adoption of solar technology.",
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      number: "02",
    },
    {
      title: "Complete EPC Solutions",
      description: "At Ultron Power Systems, we offer complete solar EPC (Engineering, Procurement, and Construction) solutions. From initial design and engineering to procurement of high-quality solar equipment and construction of the solar power system, we handle every aspect of the project.",
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      number: "03",
    },
    {
      title: "Peace of Mind Warranty",
      description: "We stand behind the quality of our work and the products we install. That's why we offer a comprehensive warranty on all our solar installations as per terms and conditions of principal suppliers of solar panels and materials. With us, you can have peace of mind knowing that your solar system is protected.",
      icon: (
        <svg className="w-12 h-12 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      number: "04",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Why Choose Ultron?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solar solutions tailored to meet your unique needs with quality and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold text-navy-dark group-hover:text-solar-red transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-4xl font-black text-gray-100 group-hover:text-red-50 transition-colors select-none">
                      {service.number}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center text-solar-red font-semibold hover:text-solar-red-dark transition-colors">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

