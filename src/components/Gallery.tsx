import Image from "next/image";

export default function Gallery() {
  const projects = [
    { src: "/images/gallery-project-1.jpg", caption: "5 kW Residential Rooftop – Dhule, Maharashtra" },
    { src: "/images/gallery-project-2.jpg", caption: "10 kW Commercial Installation – Dhule" },
    { src: "/images/gallery-project-3.jpg", caption: "Solar Panel Array – Industrial Setup" },
    { src: "/images/gallery-project-4.jpg", caption: "Rooftop Solar System – Residential" },
    { src: "/images/gallery-project-5.jpg", caption: "Large Scale Solar Installation" },
    { src: "/images/gallery-project-6.jpg", caption: "Solar Water Pump System – Farm, near Dhule" },
    { src: "/images/gallery-project-7.jpg", caption: "Commercial Rooftop Solar – Dhule" },
    { src: "/images/gallery-project-8.jpg", caption: "Residential Solar Setup – Maharashtra" },
    { src: "/images/gallery-project-9.jpg", caption: "Solar Installation Project" },
    { src: "/images/gallery-project-10.jpg", caption: "Farm Solar Water Pump – Rural Maharashtra" },
    { src: "/images/gallery-project-11.jpg", caption: "Industrial Solar System" },
    { src: "/images/gallery-project-12.png", caption: "Complete Solar EPC Project" },
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Our Recent Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Glimpses of our successful installations and happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <Image
                src={project.src}
                alt={project.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium">
                  {project.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

