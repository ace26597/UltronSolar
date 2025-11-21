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
            <Link href="/" className="text-2xl font-bold text-solar-red">
              Ultron Power Systems
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-navy-dark hover:text-primary-blue transition-colors">
                Home
              </a>
              <a href="#features" className="text-navy-dark hover:text-primary-blue transition-colors">
                Services
              </a>
              <a href="#products" className="text-navy-dark hover:text-primary-blue transition-colors">
                Products
              </a>
              <a href="#about" className="text-navy-dark hover:text-primary-blue transition-colors">
                About
              </a>
              <a href="#contact" className="text-navy-dark hover:text-primary-blue transition-colors">
                Contact
              </a>
              <a
                href="#contact"
                className="bg-energy-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-energy-green-dark transition-colors shadow-md ml-4"
              >
                Get Free Quote
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-dark hover:text-primary-blue focus:outline-none"
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
            <a href="#home" className="block px-3 py-2 text-navy-dark hover:text-primary-blue">
              Home
            </a>
            <a href="#features" className="block px-3 py-2 text-navy-dark hover:text-primary-blue">
              Services
            </a>
            <a href="#products" className="block px-3 py-2 text-navy-dark hover:text-primary-blue">
              Products
            </a>
            <a href="#about" className="block px-3 py-2 text-navy-dark hover:text-primary-blue">
              About
            </a>
            <a href="#contact" className="block px-3 py-2 text-navy-dark hover:text-primary-blue">
              Contact
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 bg-energy-green text-white rounded-lg font-semibold hover:bg-energy-green-dark transition-colors text-center mt-2"
            >
              Get Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

