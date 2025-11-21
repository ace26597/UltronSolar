import Image from "next/image";

export default function Products() {
  const products = [
    {
      title: "Solar Water Pump System",
      description: "Green farms with solar power. Solar powered water pump installation for farms and poultry in Maharashtra.",
      icon: "💧",
      image: "/images/product-solar-pump.jpg",
    },
    {
      title: "Solar Power Systems (UPS)",
      description: "Trusty & Reliable Green Power. Solar power systems for business applications.",
      icon: "☀️",
      image: "/images/product-solar-ups.jpg",
    },
    {
      title: "Servo Controlled Voltage Stabilizer",
      description: "Precise Performance. Solar inverter, UPS and on-grid system product seller.",
      icon: "⚙️",
      image: "/images/product-servo-stabilizer.jpg",
    },
    {
      title: "Solar Street Lights",
      description: "Efficient and automatic lighting solutions for streets, gardens, and campuses.",
      icon: "💡",
      image: "/images/product-solar-lights.jpg",
    },
    {
      title: "Solar Panels",
      description: "High-efficiency monocrystalline and polycrystalline solar panels for maximum energy output.",
      icon: "🔋",
      image: "/images/gallery-project-2.jpg",
    },
    {
      title: "Solar Water Heater",
      description: "Eco-friendly water heating solutions for residential and commercial use.",
      icon: "🔥",
      image: "/images/gallery-project-1.jpg",
    },
    {
      title: "Solar Inverters",
      description: "Advanced solar inverters to convert DC to AC power efficiently.",
      icon: "🔌",
      image: "/images/product-servo-stabilizer.jpg",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-semibold text-navy-dark mb-3">
                  {product.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
                <div className="pt-6 border-t border-gray-200 mt-auto">
                  <a
                    href="#contact"
                    className="block text-center bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-blue-dark transition-colors"
                  >
                    Get Quote
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

