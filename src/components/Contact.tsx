"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "Home Solar System",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Check if response has content before parsing JSON
      const contentType = res.headers.get("content-type");
      let data: any = {};

      if (contentType && contentType.includes("application/json")) {
        const text = await res.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch (parseError) {
            console.error("Failed to parse JSON response:", parseError);
            throw new Error("Invalid response from server");
          }
        }
      }

      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.status} ${res.statusText}`);
      }

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        requirement: "Home Solar System",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again or call us directly.");
    }
  };

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
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4 mb-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white"
                    placeholder="Your Name"
                    disabled={status === "loading"}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white"
                    placeholder="10-digit mobile number"
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white"
                    placeholder="your@email.com"
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="requirement" className="block text-sm font-medium text-gray-700 mb-1">Requirement</label>
                  <select
                    id="requirement"
                    name="requirement"
                    value={form.requirement}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-700"
                    disabled={status === "loading"}
                  >
                    <option value="Home Solar System">Home Solar System</option>
                    <option value="Commercial Solar">Commercial / Office</option>
                    <option value="Solar Pump">Solar Water Pump</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details / Query (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white resize-vertical"
                    placeholder="Tell us more about your requirements, questions, or any specific details..."
                    disabled={status === "loading"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-energy-green text-white font-bold py-3 rounded-lg hover:bg-energy-green-dark transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Get Free Quote"}
                </button>

                {status === "success" && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center">
                    Thank you! Your request has been sent. We will contact you within 24 hours.
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center">
                    {errorMessage || "Something went wrong. Please try again or call us directly."}
                  </div>
                )}
              </form>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:ace.tech.gg@gmail.com?subject=Solar%20Inquiry&body=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20solar%20energy%20solutions."
                  className="bg-primary-blue text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-blue-dark transition-colors shadow-lg inline-block text-center"
                >
                  📧 Email Us Now
                </a>
                <a
                  href="tel:+919422787438"
                  className="bg-energy-green text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-energy-green-dark transition-colors shadow-lg inline-block text-center"
                >
                  📞 Call Us: 9422787438
                </a>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">
                  Email:{" "}
                  <a 
                    href="mailto:ace.tech.gg@gmail.com" 
                    className="text-primary-blue hover:underline font-semibold"
                  >
                    ultronvij@gmail.com
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  Phone:{" "}
                  <a 
                    href="tel:+919422787438" 
                    className="text-primary-blue hover:underline font-semibold"
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
                  <div className="text-2xl font-bold text-solar-red mb-2">Dedicated</div>
                  <div className="text-gray-600">Support Team</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-blue mb-2">Free</div>
                  <div className="text-gray-600">Consultation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-energy-green mb-2">Fast</div>
                  <div className="text-gray-600">Response (24hrs)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-4 h-[400px] overflow-hidden">
          <iframe 
            src={`https://www.google.com/maps?q=20.916225468005663,74.76856980970072&hl=en&z=17&output=embed`}
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
