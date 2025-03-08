import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center justify-center h-8 w-8 bg-upwork-green rounded-full text-white">
        <ArrowUpRight className="h-5 w-5 transform rotate-12" />
      </div>
      <span className="text-xl font-bold text-upwork-gray">UpHero</span>
    </Link>
  );
}