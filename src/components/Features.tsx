export default function Features() {
  const features = [
    {
      title: "Cost Savings",
      description: "Dramatically reduce your electricity bills with solar power. Payback period typically 5-7 years.",
      icon: "💰",
    },
    {
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint and contribute to a cleaner environment for future generations.",
      icon: "🌱",
    },
    {
      title: "Low Maintenance",
      description: "Solar panels require minimal maintenance and come with long-term warranties for peace of mind.",
      icon: "🔧",
    },
    {
      title: "Energy Independence",
      description: "Generate your own power and reduce dependence on the grid. Store excess energy for later use.",
      icon: "⚡",
    },
    {
      title: "Government Incentives",
      description: "Take advantage of tax credits, rebates, and net metering programs available in your area.",
      icon: "📋",
    },
    {
      title: "Increased Property Value",
      description: "Solar installations increase your property value and make your home more attractive to buyers.",
      icon: "🏠",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Why Choose Solar Energy?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the numerous benefits of switching to solar power
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-solar-gold"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

