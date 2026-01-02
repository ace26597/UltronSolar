"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CtaButton from "@/components/cta/CtaButton";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { selectCta } from "@/utils/ctaSelector";
import { getTranslations } from "@/lib/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  const navbarCta = selectCta({
    page: 'home',
    audience: 'residential',
    language: currentLanguage,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Utility Top Bar */}
      <div className="bg-navy text-white py-1.5 text-xs sm:text-sm hidden md:block border-b border-navy-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-solar-orange animate-pulse"></span>
              Serving Dhule, Jalgaon & North Maharashtra since 2006
            </span>
            <div className="flex items-center space-x-4 border-l border-white/20 pl-6">
              <a href="tel:+919422787438" className="hover:text-solar-orange transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +91 94227 87438
              </a>
              <a href="mailto:info@ultronsolar.in" className="hover:text-solar-orange transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                info@ultronsolar.in
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <div className="flex items-center space-x-3 border-l border-white/20 pl-4">
              <a href="https://facebook.com/ultronpowersystems" target="_blank" rel="noopener noreferrer" className="hover:text-solar-orange transform hover:scale-110 transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
              <a href="https://youtube.com/@ultronpowersystems" target="_blank" rel="noopener noreferrer" className="hover:text-solar-orange transform hover:scale-110 transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.017 3.017 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative overflow-hidden">
                  <Image
                    src="/logo/Ultron_Power_Logo_1.png"
                    alt="Ultron Power Systems"
                    width={220}
                    height={85}
                    className="h-10 sm:h-12 md:h-16 w-auto transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1 lg:space-x-4">
                <Link href="/" className="px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                  {t.nav.home}
                </Link>

                <Link href="/about" className="px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                  {t.nav.about}
                </Link>

                {/* Segmented Dropdowns */}
                <div className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                    {t.nav.residential}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-gray-100 overflow-hidden">
                    <Link href="/residential/rooftop" className="block px-4 py-2.5 text-sm text-navy hover:bg-solar-orange/5 hover:text-solar-orange transition-colors">
                      Rooftop Solar Solutions
                    </Link>
                    <Link href="/residential/subsidy" className="block px-4 py-2.5 text-sm text-navy hover:bg-solar-orange/5 hover:text-solar-orange transition-colors">
                      PM Surya Ghar Guide
                    </Link>
                  </div>
                </div>

                <div className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                    {t.nav.agriculture}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-gray-100 overflow-hidden">
                    <Link href="/agriculture/pumps" className="block px-4 py-2.5 text-sm text-navy hover:bg-solar-orange/5 hover:text-solar-orange transition-colors">
                      Solar Water Pumps
                    </Link>
                    <Link href="/agriculture/kusum" className="block px-4 py-2.5 text-sm text-navy hover:bg-solar-orange/5 hover:text-solar-orange transition-colors">
                      PM-KUSUM Yojana
                    </Link>
                  </div>
                </div>

                <div className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                    {t.nav.commercial}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-gray-100 overflow-hidden">
                    <Link href="/commercial/industrial" className="block px-4 py-2.5 text-sm text-navy hover:bg-solar-orange/5 hover:text-solar-orange transition-colors">
                      Industrial Captive Plants
                    </Link>
                    <Link href="/commercial/benefits" className="block px-4 py-2.5 text-sm text-navy hover:bg-solar-orange/5 hover:text-solar-orange transition-colors">
                      Tax & ROI Benefits
                    </Link>
                  </div>
                </div>

                <Link href="/products" className="px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                  {t.nav.products}
                </Link>

                <Link href="/gallery" className="px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                  Our Work
                </Link>

                <Link href="/blog" className="px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                  Knowledge Hub
                </Link>

                <Link href="/contact" className="px-3 py-2 text-navy hover:text-solar-orange font-semibold transition-colors text-sm uppercase tracking-wider">
                  {t.nav.contact}
                </Link>

                <div className="ml-4 flex items-center">
                  <CtaButton
                    ctaId={navbarCta.id}
                    variantOverride={{ label: t.nav.getQuote }}
                    className="px-6 py-3 text-sm font-bold shadow-lg shadow-solar-orange/20 hover:shadow-solar-orange/40"
                    trackEventName="navbar_cta_click"
                  />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-4">
              <a href="tel:+919422787438" className="p-2 text-solar-orange bg-solar-orange/10 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="text-navy hover:text-solar-orange transition-colors p-2"
                aria-label="Open menu"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 z-[100] transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out lg:hidden`}>
          <div className={`absolute inset-0 bg-navy/80 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpen(false)}></div>

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <span className="text-xl font-bold text-navy uppercase tracking-widest">{t.nav.menu}</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-solar-orange transition-colors p-2 rounded-full hover:bg-gray-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-navy hover:text-solar-orange transition-colors">
                {t.nav.home}
              </Link>

              <Link href="/about" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-navy hover:text-solar-orange transition-colors">
                {t.nav.about}
              </Link>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.nav.residential}</h4>
                <div className="pl-4 space-y-3">
                  <Link href="/residential/rooftop" onClick={() => setIsOpen(false)} className="block text-base text-navy hover:text-solar-orange">Rooftop Solar</Link>
                  <Link href="/residential/subsidy" onClick={() => setIsOpen(false)} className="block text-base text-navy hover:text-solar-orange">PM Surya Ghar</Link>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.nav.agriculture}</h4>
                <div className="pl-4 space-y-3">
                  <Link href="/agriculture/pumps" onClick={() => setIsOpen(false)} className="block text-base text-navy hover:text-solar-orange">Solar Pumps</Link>
                  <Link href="/agriculture/kusum" onClick={() => setIsOpen(false)} className="block text-base text-navy hover:text-solar-orange">PM-KUSUM</Link>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.nav.commercial}</h4>
                <div className="pl-4 space-y-3">
                  <Link href="/commercial/industrial" onClick={() => setIsOpen(false)} className="block text-base text-navy hover:text-solar-orange">Industrial Plants</Link>
                  <Link href="/commercial/benefits" onClick={() => setIsOpen(false)} className="block text-base text-navy hover:text-solar-orange">Tax Benefits</Link>
                </div>
              </div>

              <Link href="/products" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-navy hover:text-solar-orange transition-colors">
                {t.nav.products}
              </Link>

              <Link href="/gallery" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-navy hover:text-solar-orange transition-colors">
                Our Work
              </Link>

              <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-navy hover:text-solar-orange transition-colors">
                Knowledge Hub
              </Link>

              <div className="pt-8 border-t border-gray-100">
                <CtaButton
                  ctaId={navbarCta.id}
                  variantOverride={{ label: t.nav.getQuote }}
                  className="w-full text-center py-4 text-base font-bold"
                  trackEventName="mobile_navbar_cta_click"
                />
              </div>

              <div className="mt-8 pt-8 space-y-4 px-2">
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="w-8 h-8 rounded-full bg-solar-orange/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <span>+91 94227 87438</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="w-8 h-8 rounded-full bg-solar-orange/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <span>info@ultronsolar.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
