"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";
import Link from "next/link";

export default function MobileContactBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Show on tablets too
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show after scrolling 200px
      if (currentScrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Show on scroll up, hide on scroll down
      if (currentScrollY > lastScrollY + 10) {
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsScrollingUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  if (!isMobile) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${isVisible && isScrollingUp ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
    >
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-4 py-3 safe-area-pb">
        <div className="flex gap-3 max-w-md mx-auto">
          {/* Call Button */}
          <a
            href="tel:+919422787438"
            className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold py-3.5 px-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-navy/20"
            aria-label="Call Now"
          >
            <svg className="w-5 h-5 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm tracking-wide uppercase">Call</span>
          </a>

          {/* Get Quote Button */}
          <Link
            href="/contact"
            className="flex-[2] flex items-center justify-center gap-2 bg-solar-orange text-navy font-bold py-3.5 px-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-solar-orange/30"
            aria-label="Get Quote"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm tracking-wide uppercase">{t.nav.getQuote}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
