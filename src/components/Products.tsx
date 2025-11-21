export default function Products() {
  const products = [
    {
      title: "Solar Water Pump System",
      description: "Green farms with solar power. Solar powered water pump installation for farms and poultry in Maharashtra.",
      icon: "💧",
      image: "Solar Powered Water pump installation in Maharashtra at Farms and poultry",
    },
    {
      title: "Solar Plants",
      description: "Trusty & Reliable Green Power. Solar power systems for business applications.",
      icon: "☀️",
      image: "Solar power Systems for business",
    },
    {
      title: "Servo Controlled Voltage Stabilizer",
      description: "Precise Performance. Solar inverter, UPS and on-grid system product seller.",
      icon: "⚙️",
      image: "Solar Intervter , UPS and on grid System Product seller",
    },
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Products We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our Supplies - Quality solar solutions for every need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-semibold text-navy-dark mb-3">
                  {product.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="#contact"
                  className="block text-center bg-solar-gold text-navy-dark px-6 py-3 rounded-lg font-semibold hover:bg-solar-orange transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

