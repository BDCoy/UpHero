import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Logo } from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-upwork-background to-upwork-background-alt flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <Link
              to="/"
              className="p-2 text-upwork-gray-light hover:text-upwork-gray hover:bg-upwork-background rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      {children}
    </div>
  );
}