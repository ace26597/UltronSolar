export default function FAQ() {
  const faqs = [
    {
      question: "How much does a 3kW solar system cost in Dhule?",
      answer: "A standard 3kW on-grid solar system typically ranges from ₹1.8 Lakh to ₹2.2 Lakh before subsidy. Prices vary based on component brands (panels, inverters) and site conditions. Contact us for a precise quote tailored to your roof."
    },
    {
      question: "What subsidies are available in Maharashtra?",
      answer: "Under the PM Surya Ghar Muft Bijli Yojana, residential consumers can get subsidies up to ₹30,000 per kW for the first 2kW and ₹18,000 for additional capacity up to 3kW. We assist with the entire application process."
    },
    {
      question: "How many units will a 3kW system generate?",
      answer: "In Maharashtra's climate, a 3kW system generates approximately 12-15 units per day, or about 360-450 units per month, depending on sunlight availability and panel efficiency."
    },
    {
      question: "What is the warranty on your solar systems?",
      answer: "We provide a standard 25-year performance warranty on solar panels and a 5-10 year warranty on inverters, backed by the respective manufacturers. Our installation workmanship is also guaranteed."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Common questions about solar installation in Maharashtra
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-navy-dark mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

