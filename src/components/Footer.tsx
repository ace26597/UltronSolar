"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);

  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-navy-light/10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Information */}
          <div className="space-y-6">
            <div className="mb-6">
              <Image
                src="/logo/Ultron_Power_Logo_1.png"
                alt="Ultron Power Systems"
                width={180}
                height={70}
                className="h-14 w-auto bg-white rounded-lg px-3 py-1.5 shadow-lg"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex flex-col space-y-4 pt-2">
              <div className="flex items-start group">
                <span className="text-solar-orange mr-3 mt-1">📍</span>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  Kanishka Apartment, Kshire Colony,<br />
                  Deopur, Dhule, Maharashtra 424002
                </p>
              </div>
              <div className="flex items-center group">
                <span className="text-solar-orange mr-3">📞</span>
                <a href="tel:+919422787438" className="text-gray-400 text-sm group-hover:text-solar-orange transition-colors">
                  +91 94227 87438
                </a>
              </div>
              <div className="flex items-center group">
                <span className="text-solar-orange mr-3">✉️</span>
                <a href="mailto:info@ultronsolar.in" className="text-gray-400 text-sm group-hover:text-solar-orange transition-colors">
                  info@ultronsolar.in
                </a>
              </div>
            </div>

            <div className="flex space-x-4 pt-4 border-t border-white/5">
              <a href="https://facebook.com/ultronpowersystems" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-solar-orange hover:text-white transition-all duration-300 group">
                <span className="sr-only">Facebook</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 opacity-80 group-hover:opacity-100"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://instagram.com/ultronpowersystems" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-solar-orange hover:text-white transition-all duration-300 group">
                <span className="sr-only">Instagram</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 opacity-80 group-hover:opacity-100"><path d="M12 2.163c3.204 0 3.584 0.012 4.85 0.072 3.252 0.148 4.771 1.691 4.919 4.919 0.058 1.265 0.069 1.645 0.069 4.849 0 3.205-0.012 3.584-0.069 4.849-0.149 3.225-1.664 4.771-4.919 4.919-1.266 0.058-1.644 0.069-4.85 0.069-3.204 0-3.584-0.012-4.849-0.069-3.225-0.149-4.771-1.664-4.919-4.919-0.058-1.265-0.069-1.644-0.069-4.849 0-3.204 0.012-3.584 0.069-4.849 0.149-3.225 1.664-4.771 4.919-4.919 1.266-0.057 1.645-0.069 4.849-0.069zm0-2.163c-3.259 0-3.667 0.014-4.947 0.072-4.358 0.2-6.78 2.618-6.98 6.98-0.059 1.281-0.073 1.689-0.073 4.948 0 3.259 0.014 3.668 0.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281 0.058 1.689 0.072 4.948 0.072 3.259 0 3.668-0.014 4.948-0.072 4.354-0.2 6.782-2.618 6.979-6.98 0.059-1.28 0.073-1.689 0.073-4.949-0.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-0.796 0-1.441 0.645-1.441 1.44s0.645 1.44 1.441 1.44c0.795 0 1.439-0.645 1.439-1.44s-0.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://wa.me/919422787438" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-solar-orange hover:text-white transition-all duration-300 group">
                <span className="sr-only">WhatsApp</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 opacity-80 group-hover:opacity-100"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              </a>
              <a href="https://youtube.com/@ultronpowersystems" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-solar-orange hover:text-white transition-all duration-300 group">
                <span className="sr-only">YouTube</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 opacity-80 group-hover:opacity-100"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.017 3.017 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-8 text-white relative inline-block">
              {t.footer.quickLinks}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-solar-orange rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> {t.footer.quickLinksItems.home}</Link></li>
              <li><Link href="/gallery" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> Our Work</Link></li>
              <li><Link href="/blog" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> Knowledge Hub</Link></li>
              <li><Link href="/about" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> About Ultron</Link></li>
              <li><Link href="/contact" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> {t.footer.quickLinksItems.contact}</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-8 text-white relative inline-block">
              Our Solutions
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-solar-orange rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/residential/rooftop" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> {t.footer.servicesList.residential}</Link></li>
              <li><Link href="/agriculture/pumps" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> {t.footer.servicesList.pumps}</Link></li>
              <li><Link href="/commercial/industrial" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> {t.footer.servicesList.industrial}</Link></li>
              <li><Link href="/maintenance" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> {t.footer.servicesList.maintenance}</Link></li>
              <li><Link href="/residential/subsidy" className="hover:text-solar-orange transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-solar-orange/30 mr-3 group-hover:bg-solar-orange transition-colors"></span> Govt. Subsidy Guide</Link></li>
            </ul>
          </div>

          {/* Local SEO / Service Areas */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-8 text-white relative inline-block">
              {t.serviceAreas.title}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-solar-orange rounded-full"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We provide expert solar installations across North Maharashtra, ensuring clean energy access for all.
            </p>
            <div className="flex flex-wrap gap-2">
              {t.serviceAreas.locations.split(' • ').map(city => (
                <span key={city} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10 hover:border-solar-orange/30 hover:text-solar-orange transition-all cursor-default">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 gap-6">
          <div className="flex flex-col md:items-start gap-1">
            <p>{t.footer.copyright.replace('2024', currentYear.toString())}</p>
            <p className="opacity-60 text-[10px] uppercase tracking-widest">Digital Transformation by Ultron Tech Team</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-solar-orange transition-colors">{t.footer.links.privacy}</Link>
            <Link href="/cookies" className="hover:text-solar-orange transition-colors">{t.footer.links.cookies}</Link>
            <button
              onClick={() => (window as any).reopenCookieBanner?.()}
              className="hover:text-solar-orange transition-colors"
            >
              {t.footer.links.cookieSettings}
            </button>
            <Link href="/sitemap.xml" className="hover:text-solar-orange transition-colors">{t.footer.links.sitemap}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
