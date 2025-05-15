import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CircleUser } from 'lucide-react';

interface LinkItem {
  href: string;
  label: string;
  ariaLabel?: string;
  Icon?: React.ReactNode;
}

const socialLinks: LinkItem[] = [
  { href: '#tiktok', label: 'TikTok' },
  { href: '#facebook', label: 'Facebook' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#other', label: 'Other' },
];

const storeLinks: LinkItem[] = [
  {
    href: '#appstore',
    label: 'App Store',
    Icon: <Image src="https://ext.same-assets.com/2921571504/3018777734.svg"
               alt="Download on the App Store"
               width={24}
               height={24}
               className="h-6"
            />,
  },
  {
    href: '#playstore',
    label: 'Play Store',
    Icon: <Image src="https://ext.same-assets.com/2921571504/4065543851.svg"
               alt="Get it on Google Play"
               width={24}
               height={24}
               className="h-6"
            />,
  },
];

const legalLinks: LinkItem[] = [
  { href: '#terms',  label: 'Terms of Service' },
  { href: '#privacy',label: 'Privacy Policy' },
  { href: '#refund', label: 'Refund Policy' },
  { href: '#cookie', label: 'Cookie Policy' },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 animate-fade">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Brand + Social */}
        <div className="space-y-4 text-center md:text-left">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Go to homepage">
            <Image src="/sensei_logo.svg" alt="Sensei" width={32} height={32} className="h-8 w-auto" />
          </Link>

          <nav className="flex flex-wrap justify-center md:justify-start gap-4">
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-sm hover:text-[#5b21b6] transition-colors hover:scale-105 transform duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex justify-center md:justify-start gap-4">
            {storeLinks.map(({ href, Icon, label }) => (
              <a 
                key={label} 
                href={href} 
                aria-label={label}
                className="hover:scale-105 transform duration-200"
              >
                {Icon}
              </a>
            ))}
          </div>
        </div>

        {/* Legal + Copyright */}
        <div className="space-y-4 text-center md:text-right">
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-xs">
            {legalLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="hover:text-[#5b21b6] transition-colors hover:scale-105 transform duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-gray-500">
            © {year} Sensei. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;