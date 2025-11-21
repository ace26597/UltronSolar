import Link from "next/link";

export default function WeServe() {
  const sectors = [
    { title: "Homeowners", icon: "🏠", link: "#contact" },
    { title: "Offices & Shops", icon: "🏢", link: "#contact" },
    { title: "Industries", icon: "🏭", link: "#contact" },
    { title: "Farms & Pumps", icon: "🚜", link: "#contact" },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sectors.map((sector, index) => (
            <Link 
              key={index} 
              href={sector.link}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group text-center"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {sector.icon}
              </span>
              <span className="font-semibold text-navy-dark">{sector.title}</span>
              <span className="text-xs text-primary-blue font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Get Quote →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

