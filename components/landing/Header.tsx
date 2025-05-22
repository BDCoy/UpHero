import React, { useState } from "react";
import { Logo } from "../ui/Logo";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { useAuth } from "../AuthProviderClient";

interface Props {
  scrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<Props> = ({ scrollToSection }) => {
  const { isAuthenticated, user } = useAuth();
  const signOut = () => {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-upwork-background">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo />

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
            >
              FAQ
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/signin/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-upwork-gray-light hover:text-upwork-gray hover:bg-upwork-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-upwork-green"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-screen bg-white overflow-y-auto pb-12">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <button
              onClick={() => scrollToSection("features")}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
            >
              About
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-upwork-background">
            <div className="px-2 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-upwork-green hover:bg-upwork-green-dark"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signin/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-upwork-green hover:bg-upwork-green-dark"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
