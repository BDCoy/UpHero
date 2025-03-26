import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../lib/AuthProvider';
import { Button } from './Button';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, signOut } = useAuth();
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-upwork-background to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-upwork-background">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo />
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
              >
                About
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/signin" className="text-upwork-gray-light hover:text-upwork-gray transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup">
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
          <div className="fixed inset-0 z-40" onClick={() => setIsMobileMenuOpen(false)} />
        )}
        <div
          className={`md:hidden fixed inset-x-0 top-16 bottom-0 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-screen bg-white overflow-y-auto pb-12">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <button
                onClick={() => scrollToSection('features')}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('about')}
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
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white bg-upwork-green hover:bg-upwork-green-dark"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
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
                      to="/signin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-upwork-gray hover:bg-upwork-background"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
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

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-upwork-gray">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-upwork-gray-lighter uppercase tracking-wider">Product</h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="text-base text-upwork-gray-light hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('pricing')} 
                    className="text-base text-upwork-gray-light hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-upwork-gray-lighter uppercase tracking-wider">Company</h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="text-base text-upwork-gray-light hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                {/* <li>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="text-base text-upwork-gray-light hover:text-white transition-colors"
                  >
                    Blog
                  </button>
                </li> */}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-upwork-gray-lighter uppercase tracking-wider">Legal</h4>
              <ul className="mt-4 space-y-4">
                <li><Link to="/privacy" className="text-base text-upwork-gray-light hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-base text-upwork-gray-light hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-upwork-gray-lighter/20 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <p className="text-base text-upwork-gray-light">
                © 2025 UpHero. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}