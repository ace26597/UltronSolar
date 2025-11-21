import Image from "next/image";

export default function Gallery() {
  const images = [
    "/images/gallery-project-1.jpg",
    "/images/gallery-project-2.jpg",
    "/images/gallery-project-3.jpg",
    "/images/gallery-project-4.jpg",
    "/images/gallery-project-5.jpg",
    "/images/gallery-project-6.jpg",
    "/images/gallery-project-7.jpg",
    "/images/gallery-project-8.jpg",
    "/images/gallery-project-9.jpg",
    "/images/gallery-project-10.jpg",
    "/images/gallery-project-11.jpg",
    "/images/gallery-project-12.png",
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
          {images.map((src, index) => (
            <div 
              key={index} 
              className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <Image
                src={src}
                alt={`Project installation ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

