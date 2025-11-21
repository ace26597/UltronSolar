export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-navy-dark via-navy-light to-navy-dark text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to
            <span className="block text-solar-gold mt-2">Ultron Power Systems</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Your one-stop solution for solar power and solar system installation. We are dedicated 
            to providing high-quality and sustainable energy solutions for residential, commercial 
            and industrial properties. Join the green energy revolution today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-solar-gold text-navy-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-solar-orange transition-colors shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="#features"
              className="bg-transparent border-2 border-solar-gold text-solar-gold px-8 py-4 rounded-lg font-semibold text-lg hover:bg-solar-gold hover:text-navy-dark transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

