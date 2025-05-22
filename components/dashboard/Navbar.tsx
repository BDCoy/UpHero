import { useState } from "react";

import { Menu, User, ChevronDown, Settings, LogOut } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenSidebar: () => void;
  onSignOut: () => void;
}

export function Navbar({ onOpenSidebar, onSignOut }: NavbarProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow-sm">
      <div className="flex flex-1 items-center px-4">
        {/* Left side - Mobile menu button */}
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 text-upwork-gray-light hover:text-upwork-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-upwork-green rounded-lg"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Right side navigation items - Always aligned to the right */}
      <div className="flex items-center pr-4 space-x-2 md:space-x-4">
        {/* Notifications */}
        {/* <button className="p-2 text-upwork-gray-light hover:text-upwork-gray rounded-lg hover:bg-upwork-background">
          <Bell className="h-5 w-5" />
        </button> */}

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg text-upwork-gray-light hover:text-upwork-gray hover:bg-upwork-background"
          >
            <div className="h-8 w-8 rounded-full bg-upwork-background flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <ChevronDown className="h-4 w-4" />{" "}
            {/* Removed hidden md:block classes to show on mobile */}
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-upwork-gray hover:bg-upwork-background"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    onSignOut();
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-upwork-gray hover:bg-upwork-background"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
