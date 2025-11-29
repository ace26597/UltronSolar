export default function Brands() {
  const brands = [
    { name: "Tata Power Solar", icon: "⚡" },
    { name: "Adani Solar", icon: "☀️" },
    { name: "Waaree Energies", icon: "🔋" },
    { name: "Havells", icon: "💡" },
    { name: "Luminous", icon: "⚙️" },
    { name: "Su-Kam", icon: "🔌" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">
            Trusted Brands We Work With
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with leading solar energy brands to deliver the best quality products and solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 flex flex-col items-center justify-center text-center"
            >
              <div className="text-4xl mb-3">
                <span role="img" aria-label={`${brand.name} logo`}>{brand.icon}</span>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-navy-dark">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

