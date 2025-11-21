export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Patil",
      role: "Homeowner",
      content: "Excellent service from Ultron Power Systems. The team was professional and completed the solar installation for my home on time. Seeing a significant drop in my electricity bill already!",
      rating: 5,
    },
    {
      name: "Amit Deshmukh",
      role: "Business Owner",
      content: "We installed a 10kW system for our office. The guidance on subsidies and the seamless installation process made it a great experience. Highly recommended for commercial solar needs.",
      rating: 5,
    },
    {
      name: "Suresh Choudhary",
      role: "Farm Owner",
      content: "The solar water pump system has been a game changer for my farm. No more worries about power cuts. Thank you to the Ultron team for the suggestion and support.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by homeowners and businesses across Maharashtra
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <span className="text-solar-red text-xl font-bold">4.9/5</span>
            <div className="flex text-solar-red">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-gray-500 text-sm">(based on Google Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex text-solar-red mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-dark">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/search?q=Ultron+Power+Systems+Dhule"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-navy-dark hover:text-primary-blue font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-2.14-.15-2.14z" />
            </svg>
            Read more reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

