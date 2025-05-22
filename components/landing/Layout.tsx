'use client';

import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { usePathname } from "next/navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  const isHomePage = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-upwork-background to-white">
      {/* Header */}
      <Header scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main className="pt-16">
        <div className="min-h-screen bg-gradient-to-b from-upwork-background to-white">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
