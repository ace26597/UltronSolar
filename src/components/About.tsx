export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
              Why Ultron Solar?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                At Ultron Solar, we are committed to providing top-quality solar energy solutions 
                that help you save money while protecting the environment.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">Certified Installers</h4>
                    <p className="text-gray-600">Our team consists of certified and experienced solar installation professionals.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">Premium Equipment</h4>
                    <p className="text-gray-600">We use only the highest quality solar panels and inverters from trusted manufacturers.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">Comprehensive Support</h4>
                    <p className="text-gray-600">From initial consultation to post-installation maintenance, we&apos;re with you every step of the way.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-solar-gold text-xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-navy-dark">Proven Track Record</h4>
                    <p className="text-gray-600">Years of experience and hundreds of satisfied customers across the region.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-solar-yellow to-solar-orange p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Make the Switch?</h3>
            <p className="mb-6 text-lg">
              Join thousands of homeowners and businesses who have already made the switch to solar energy. 
              Start your journey towards energy independence today.
            </p>
            <a
              href="#contact"
              className="inline-block bg-white text-navy-dark px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

