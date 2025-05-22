import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const isAuthenticated = false;
  return (
    <Link
      href={!isAuthenticated ? "/" : "/dashboard"}
      className={`flex items-center space-x-2 ${className}`}
    >
      <div className="flex items-center justify-center h-8 w-8 bg-upwork-green rounded-full text-white">
        <ArrowUpRight className="h-5 w-5 transform rotate-12" />
      </div>
      <span className="text-xl font-bold text-upwork-gray">UpHero</span>
    </Link>
  );
}
