export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600">
            Ready to go solar? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-navy-dark mb-4">
                Let&apos;s Start Your Solar Journey
              </h3>
              <p className="text-gray-600 mb-8">
                Fill out the form below or reach out to us directly via email. 
                Our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:ultronvij@gmail.com?subject=Solar%20Inquiry&body=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20solar%20energy%20solutions."
                  className="bg-solar-gold text-navy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-solar-orange transition-colors shadow-lg inline-block text-center"
                >
                  📧 Email Us Now
                </a>
                <a
                  href="tel:+919422787438"
                  className="bg-eco-green text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-eco-dark transition-colors shadow-lg inline-block text-center"
                >
                  📞 Call Us: 9422787438
                </a>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">
                  Email:{" "}
                  <a 
                    href="mailto:ultronvij@gmail.com" 
                    className="text-solar-gold hover:underline font-semibold"
                  >
                    ultronvij@gmail.com
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  Phone:{" "}
                  <a 
                    href="tel:+919422787438" 
                    className="text-solar-gold hover:underline font-semibold"
                  >
                    +91 9422787438
                  </a>
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Address:</strong><br />
                  Kanishka Apartment, Kshire Colony, Deopur<br />
                  Dhule, Maharashtra 424002, India
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-solar-gold mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-solar-gold mb-2">Free</div>
                  <div className="text-gray-600">Consultation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-solar-gold mb-2">Fast</div>
                  <div className="text-gray-600">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-4 h-[400px] overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.7548876849747!2d74.76768777596325!3d20.89703839142645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdbed9700000001%3A0x800d33f0365357d6!2sUltron%20Power%20Systems!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ultron Power Systems Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

