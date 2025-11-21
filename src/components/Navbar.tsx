"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-solar-gold">
              Ultron Power Systems
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-navy-dark hover:text-solar-gold transition-colors">
                Home
              </a>
              <a href="#features" className="text-navy-dark hover:text-solar-gold transition-colors">
                Services
              </a>
              <a href="#products" className="text-navy-dark hover:text-solar-gold transition-colors">
                Products
              </a>
              <a href="#about" className="text-navy-dark hover:text-solar-gold transition-colors">
                About
              </a>
              <a href="#contact" className="text-navy-dark hover:text-solar-gold transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-dark hover:text-solar-gold focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <a href="#home" className="block px-3 py-2 text-navy-dark hover:text-solar-gold">
              Home
            </a>
            <a href="#features" className="block px-3 py-2 text-navy-dark hover:text-solar-gold">
              Services
            </a>
            <a href="#products" className="block px-3 py-2 text-navy-dark hover:text-solar-gold">
              Products
            </a>
            <a href="#about" className="block px-3 py-2 text-navy-dark hover:text-solar-gold">
              About
            </a>
            <a href="#contact" className="block px-3 py-2 text-navy-dark hover:text-solar-gold">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

