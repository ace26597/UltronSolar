"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function Contact() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    requirement: t.contact.requirements[0],
    message: "",
  });
  const [showOptional, setShowOptional] = useState(false);

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
        city: "",
        requirement: t.contact.requirements[0],
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t.contact.form.error);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-3 sm:mb-4">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">
            <h3 className="text-2xl font-bold text-navy-dark mb-6">
              {t.contact.formTitle || 'Request a Free Quote'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Essential fields - always visible */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.name} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white touch-manipulation"
                    placeholder={t.contact.form.namePlaceholder || 'Your Name'}
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.phone} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    autoComplete="tel"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white touch-manipulation"
                    placeholder={t.contact.form.phonePlaceholder || '10-digit mobile'}
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.email || 'Email Address'}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white touch-manipulation"
                    placeholder={t.contact.form.emailPlaceholder || 'your@email.com (optional)'}
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.city || 'City'} *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    autoComplete="address-level2"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white touch-manipulation"
                    placeholder={t.contact.form.cityPlaceholder || 'Dhule, Nashik, etc.'}
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="requirement" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.requirement} *</label>
                  <div className="relative">
                    <select
                      id="requirement"
                      name="requirement"
                      value={form.requirement}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white text-gray-900 appearance-none touch-manipulation"
                      disabled={status === "loading"}
                    >
                      {t.contact.requirements.map((req, index) => (
                        <option key={index} value={req}>{req}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional fields - collapsible on mobile */}
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="text-sm text-primary-blue hover:text-primary-blue-dark flex items-center gap-1 touch-manipulation"
                >
                  {showOptional ? '− Hide' : '+ Add'} message (optional)
                </button>
              </div>

              <div className={`${showOptional ? 'block' : 'hidden'} sm:block`}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.form.message} <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white resize-none touch-manipulation"
                  placeholder={t.contact.form.messagePlaceholder || 'Any specific requirements? (optional)'}
                  disabled={status === "loading"}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-solar-red text-white font-bold py-4 rounded-lg hover:bg-solar-red-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none touch-manipulation min-h-[48px] text-base sm:text-lg"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.contact.form.submitting}
                  </span>
                ) : t.contact.form.submit}
              </button>

              {status === "success" && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center border border-green-200 animate-fade-in">
                  <p className="font-semibold">{t.contact.form.success}</p>
                  <p className="text-sm mt-1">{t.contact.form.successSubtext || 'We will contact you within 24 hours.'}</p>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center border border-red-200 animate-fade-in">
                  {errorMessage || t.contact.form.error}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-navy-dark text-white rounded-2xl shadow-lg p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-solar-red opacity-10 rounded-full blur-3xl"></div>

              <h3 className="text-2xl font-bold mb-6 relative z-10">{t.contact.contactInfo?.title || 'Contact Information'}</h3>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{t.contact.contactInfo?.visitUs || 'Visit Us'}</p>
                    <p className="text-gray-300 mt-1">
                      {t.contact.contactInfo?.address || 'Kanishka Apartment, Kshire Colony, Deopur, Dhule, Maharashtra 424002'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{t.contact.contactInfo?.callUs || 'Call Us'}</p>
                    <a href="tel:+919422787438" className="text-gray-300 mt-1 block hover:text-white transition-colors">
                      +91 94227 87438
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{t.contact.contactInfo?.emailUs || 'Email Us'}</p>
                    <a href="mailto:ultronvij@gmail.com" className="text-gray-300 mt-1 block hover:text-white transition-colors">
                      ultronvij@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                <a href="https://facebook.com/ultronpowersystems" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://instagram.com/ultronpowersystems" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584 0.012 4.85 0.072 3.252 0.148 4.771 1.691 4.919 4.919 0.058 1.265 0.069 1.645 0.069 4.849 0 3.205-0.012 3.584-0.069 4.849-0.149 3.225-1.664 4.771-4.919 4.919-1.266 0.058-1.644 0.069-4.85 0.069-3.204 0-3.584-0.012-4.849-0.069-3.225-0.149-4.771-1.664-4.919-4.919-0.058-1.265-0.069-1.644-0.069-4.849 0-3.204 0.012-3.584 0.069-4.849 0.149-3.225 1.664-4.771 4.919-4.919 1.266-0.057 1.645-0.069 4.849-0.069zm0-2.163c-3.259 0-3.667 0.014-4.947 0.072-4.358 0.2-6.78 2.618-6.98 6.98-0.059 1.281-0.073 1.689-0.073 4.948 0 3.259 0.014 3.668 0.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281 0.058 1.689 0.072 4.948 0.072 3.259 0 3.668-0.014 4.948-0.072 4.354-0.2 6.782-2.618 6.979-6.98 0.059-1.28 0.073-1.689 0.073-4.949-0.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-0.796 0-1.441 0.645-1.441 1.44s0.645 1.44 1.441 1.44c0.795 0 1.439-0.645 1.439-1.44s-0.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[250px] sm:h-[300px] md:h-[400px] border border-gray-100">
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
        </div>
      </div>
    </section>
  );
}
