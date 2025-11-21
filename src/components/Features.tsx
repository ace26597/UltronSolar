export default function Features() {
  const services = [
    {
      title: "Expert Installations",
      description: "We specialize in offering premium solar panel installation services for homes, businesses, apartments, and farms. Our team of experts is skilled in effective installation and deeply knowledgeable about optimizing the positioning of solar panels to maximize sunlight exposure and energy generation.",
      icon: "⚡",
      number: "01",
    },
    {
      title: "Flexible Payment Options",
      description: "We understand that every customer has different preferences when it comes to payment. We provide assistance for bank loans with streamlined processing specifically for solar projects. Additionally, we guide our customers in availing government subsidies designed to support the adoption of solar technology.",
      icon: "💳",
      number: "02",
    },
    {
      title: "Complete Solar Solutions",
      description: "At Ultron Power Systems, we offer complete solar EPC (Engineering, Procurement, and Construction) solutions. From initial design and engineering to procurement of high-quality solar equipment and construction of the solar power system, we handle every aspect of the project.",
      icon: "🏗️",
      number: "03",
    },
    {
      title: "Peace of Mind Warranty",
      description: "We stand behind the quality of our work and the products we install. That&apos;s why we offer a comprehensive warranty on all our solar installations as per terms and conditions of principal suppliers of solar panels and materials. With us, you can have peace of mind knowing that your solar system is protected.",
      icon: "🛡️",
      number: "04",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solar solutions tailored to meet your unique needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-solar-red"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="text-5xl mb-2">{service.icon}</div>
                  <div className="text-2xl font-bold text-primary-blue">{service.number}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-navy-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

