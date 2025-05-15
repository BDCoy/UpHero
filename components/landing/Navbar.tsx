'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Creators", href: "#creators" },
  { label: "Features", href: "#features" },
  { label: "Success stories", href: "#success" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full text-[#42354e] bg-white backdrop-blur border-b border-[#e5e6ea]">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 animate-fade">
          <Image src="/sensei_logo.svg" alt="UGC Sensei" width={32} height={32} className="h-8 w-auto" />
        </Link>
        {/* Nav links */}
        <nav className="hidden md:flex gap-8 items-center animate-fade">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-medium hover:text-[#5b21b6] transition-colors hover:scale-105 transform duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* Right CTAs */}
        <div className="flex gap-2 items-center animate-fade">
          <Link
            href="/signin"
            className="text-sm font-medium px-2 py-1 rounded hover:bg-[#f7f8fa] transition-colors"
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
            className="ml-2 text-sm px-3 py-2 rounded-lg border border-[#e5e6ea] hover:bg-[#f7f8fa] transition-all hover:scale-105 duration-200"
          >
            Become a creator
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;