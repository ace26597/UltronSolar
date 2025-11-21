import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery-project-4.jpg"
          alt="Solar Panel Installation"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/50 to-navy-dark/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Power Your Future <br />
          <span className="text-solar-red">With Solar Energy</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto font-light">
          Premium rooftop solar solutions for homes, farms, and businesses in Dhule & North Maharashtra.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="bg-solar-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-solar-red-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Free Quote
          </a>
          <a
            href="tel:+919422787438"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-navy-dark transition-all shadow-lg hover:shadow-xl"
          >
            Call Us Now
          </a>
        </div>

        <div className="mt-12 inline-block bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
          <span className="text-white font-medium">⚡ Systems starting at ₹99,999</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-white opacity-80 hover:opacity-100 transition-opacity">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

