"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);

  return (
    <footer className="bg-futuristic-bg-primary text-futuristic-text-main pt-16 pb-8 border-t border-futuristic-accent-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Information */}
          <div className="space-y-6">
            <div>
              <div className="mb-4">
                <img src="/logo/Ultron_Power_Logo_1.png" alt="Ultron Power Systems Logo" className="h-16 w-auto bg-white rounded px-2 py-1" />
              </div>
              <p className="text-futuristic-text-muted text-sm leading-relaxed font-montserrat">
                {t.footer.description}
              </p>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.facebook.com/ultronpowersystems" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-none glass border border-futuristic-accent-primary/30 flex items-center justify-center hover:border-futuristic-accent-primary hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-300 group">
                <svg className="w-5 h-5 text-futuristic-accent-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://www.instagram.com/ultronpowersystems/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-none glass border border-futuristic-accent-primary/30 flex items-center justify-center hover:border-futuristic-accent-primary hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-300 group">
                <svg className="w-5 h-5 text-futuristic-accent-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://wa.me/919422787438" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-none glass border border-futuristic-accent-primary/30 flex items-center justify-center hover:border-futuristic-accent-primary hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-300 group">
                <svg className="w-5 h-5 text-futuristic-accent-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              </a>
              <a href="https://www.youtube.com/@ultronpowersystems" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-none glass border border-futuristic-accent-primary/30 flex items-center justify-center hover:border-futuristic-accent-primary hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-300 group">
                <svg className="w-5 h-5 text-futuristic-accent-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-6 text-futuristic-text-main uppercase tracking-wide">{t.footer.quickLinks}</h4>
            <ul className="space-y-3 text-sm text-futuristic-text-muted font-montserrat">
              <li><a href="#home" className="hover:text-futuristic-accent-primary transition-colors flex items-center"><span className="mr-2 text-futuristic-accent-primary">›</span> {t.footer.quickLinksItems.home}</a></li>
              <li><a href="#features" className="hover:text-futuristic-accent-primary transition-colors flex items-center"><span className="mr-2 text-futuristic-accent-primary">›</span> {t.footer.quickLinksItems.services}</a></li>
              <li><a href="#products" className="hover:text-futuristic-accent-primary transition-colors flex items-center"><span className="mr-2 text-futuristic-accent-primary">›</span> {t.footer.quickLinksItems.products}</a></li>
              <li><a href="#projects" className="hover:text-futuristic-accent-primary transition-colors flex items-center"><span className="mr-2 text-futuristic-accent-primary">›</span> {t.footer.quickLinksItems.projects}</a></li>
              <li><a href="#contact" className="hover:text-futuristic-accent-primary transition-colors flex items-center"><span className="mr-2 text-futuristic-accent-primary">›</span> {t.footer.quickLinksItems.contact}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-6 text-futuristic-text-main uppercase tracking-wide">{t.footer.services}</h4>
            <ul className="space-y-3 text-sm text-futuristic-text-muted font-montserrat">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-futuristic-accent-primary rounded-full mr-2"></span> {t.footer.servicesList.residential}</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-futuristic-accent-primary rounded-full mr-2"></span> {t.footer.servicesList.commercial}</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-futuristic-accent-primary rounded-full mr-2"></span> {t.footer.servicesList.pumps}</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-futuristic-accent-primary rounded-full mr-2"></span> {t.footer.servicesList.industrial}</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-futuristic-accent-primary rounded-full mr-2"></span> {t.footer.servicesList.maintenance}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-6 text-futuristic-text-main uppercase tracking-wide">{t.footer.newsletter.title}</h4>
            <p className="text-futuristic-text-muted text-sm mb-4 font-montserrat">
              {t.footer.newsletter.description}
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t.footer.newsletter.placeholder}
                  aria-label="Email Address"
                  className="w-full bg-futuristic-bg-secondary/50 border border-futuristic-accent-primary/30 text-futuristic-text-main px-4 py-3 rounded-none focus:outline-none focus:ring-2 focus:ring-futuristic-accent-primary focus:border-futuristic-accent-primary placeholder:text-futuristic-text-muted/50 text-sm font-montserrat"
                />
              </div>
              <button className="w-full btn-power text-sm">
                {t.footer.newsletter.button}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-futuristic-accent-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-futuristic-text-muted font-montserrat">
          <p>{t.footer.copyright.replace('2024', currentYear.toString())}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-futuristic-accent-primary transition-colors">{t.footer.links.privacy}</a>
            <a href="/cookies" className="hover:text-futuristic-accent-primary transition-colors">{t.footer.links.cookies}</a>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.reopenCookieBanner) {
                  window.reopenCookieBanner();
                }
              }}
              className="hover:text-futuristic-accent-primary transition-colors"
            >
              {t.footer.links.cookieSettings}
            </button>
            <a href="/sitemap.xml" className="hover:text-futuristic-accent-primary transition-colors">{t.footer.links.sitemap}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
