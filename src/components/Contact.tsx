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

            <div className="flex flex-col items-center space-y-4">
              <a
                href="mailto:info@ultronsolar.in?subject=Solar%20Inquiry&body=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20solar%20energy%20solutions."
                className="bg-solar-gold text-navy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-solar-orange transition-colors shadow-lg inline-block"
              >
                📧 Email Us Now
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Or send an email directly to:{" "}
                <a 
                  href="mailto:info@ultronsolar.in" 
                  className="text-solar-gold hover:underline font-semibold"
                >
                  info@ultronsolar.in
                </a>
              </p>
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
      </div>
    </section>
  );
}

