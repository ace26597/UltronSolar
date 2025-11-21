import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative py-20 lg:py-32 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery-project-2.jpg"
          alt="Solar Panel Installation"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/90 via-navy-light/85 to-navy-dark/90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to
            <span className="block text-solar-red mt-2">Ultron Power Systems</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            Your one-stop solution for solar power and solar system installation. We are dedicated 
            to providing high-quality and sustainable energy solutions for residential, commercial 
            and industrial properties. Join the green energy revolution today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-energy-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-energy-green-dark transition-colors shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="#features"
              className="bg-primary-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-blue-dark transition-colors shadow-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

