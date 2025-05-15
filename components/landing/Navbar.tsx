'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Creators", href: "#creators" },
  { label: "Features", href: "#features" },
  { label: "Success stories", href: "#success" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
      isScrolled ? 'bg-white backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 animate-fade">
          <Image src="/sensei_logo.svg" alt="Sensei" width={32} height={32} className="h-8 w-auto" />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-current mb-1.5"></div>
          <div className="w-6 h-0.5 bg-current mb-1.5"></div>
          <div className="w-6 h-0.5 bg-current"></div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center animate-fade">
          {NAV_LINKS.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-base text-gray-700 font-medium hover:text-[#5b21b6] transition-colors hover:scale-105 transform duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex gap-2 items-center animate-fade">
          <Link
            href="/signin"
            className="text-sm font-medium px-2 py-1 text-gray-700 rounded hover:bg-[#f7f8fa] transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signin"
            className="text-sm font-semibold px-4 py-2 bg-[#5b21b6] text-white rounded-lg hover:bg-[#4a1d96] shadow transition-all hover:scale-105 duration-200"
          >
            Sign up
          </Link>
          <a
            href="#become-creator"
            className="ml-2 text-sm px-3 py-2 rounded-lg border text-gray-700 border-[#e5e6ea] hover:bg-[#f7f8fa] transition-all hover:scale-105 duration-200"
          >
            Become a creator
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <Image src="/sensei_logo.svg" alt="Sensei" width={80} height={80} />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-700"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-lg text-gray-700 font-medium border border-[#e5e6ea] rounded-lg py-2 hover:text-[#5b21b6]"
                >
                  {link.label}
                </button>
              ))}
              <hr className="my-4" />
              <Link
                href="/signin"
                className="text-center py-2 text-gray-700 hover:text-[#5b21b6]"
              >
                Login
              </Link>
              <Link
                href="/signin"
                className="text-center py-2 bg-[#5b21b6] text-white rounded-lg"
              >
                Sign up
              </Link>
              <a
                href="#become-creator"
                className="text-center py-2 border text-gray-700 border-[#e5e6ea] rounded-lg mt-2"
              >
                Become a creator
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;