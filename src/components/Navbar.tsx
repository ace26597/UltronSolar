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
      {/* Top Bar */}
      <div className="bg-navy-dark text-white py-2 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>+91 94227 87438</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>ultronvij@gmail.com</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <span>{t.topBar.serving}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-white shadow-lg py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/logo/Ultron_Power_Logo_1.png" 
                  alt="Ultron Power Systems" 
                  width={200}
                  height={80}
                  className="h-12 sm:h-16 md:h-20 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {[
                  { key: 'home', label: t.nav.home, href: '/' },
                  { key: 'services', label: t.nav.services, href: '/#services' },
                  { key: 'products', label: t.nav.products, href: '/products' },
                  { key: 'about', label: t.nav.about, href: '/#about' },
                  { key: 'blog', label: t.nav.blog, href: '/blog' },
                  { key: 'contact', label: t.nav.contact, href: '/#contact' },
                ].map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-navy-light hover:text-solar-red font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <LanguageToggle />
                <div className="flex items-center">
                  <CtaButton
                    ctaId={navbarCta.id}
                    className="px-6 py-2.5 text-base"
                    trackEventName="navbar_cta_click"
                  />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="text-navy-dark hover:text-solar-red focus:outline-none p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpen(false)}></div>

          {/* Drawer Content */}
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="p-6 flex justify-between items-center border-b">
              <span className="text-xl font-bold text-navy-DEFAULT">{t.nav.menu}</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-solar-red">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
              {[
                { key: 'home', label: t.nav.home, href: '/' },
                { key: 'services', label: t.nav.services, href: '/#services' },
                { key: 'products', label: t.nav.products, href: '/products' },
                { key: 'about', label: t.nav.about, href: '/#about' },
                { key: 'blog', label: t.nav.blog, href: '/blog' },
                { key: 'contact', label: t.nav.contact, href: '/#contact' },
              ].map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-navy-dark hover:bg-gray-50 hover:text-solar-red rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-6 border-t mt-6">
                <div onClick={() => setIsOpen(false)}>
                  <CtaButton
                    ctaId={navbarCta.id}
                    className="w-full text-center px-6 py-3 text-base"
                    trackEventName="mobile_navbar_cta_click"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4 px-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <svg className="w-5 h-5 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>+91 94227 87438</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <svg className="w-5 h-5 text-solar-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>ultronvij@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
