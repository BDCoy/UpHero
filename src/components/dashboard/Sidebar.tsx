import { Link, useLocation } from "react-router-dom";
import { Logo } from "../Logo";
import { Settings, LogOut, X } from "lucide-react";
import { sidebarLinks } from "./navigation";

interface SidebarProps {
  onClose?: () => void;
  onSignOut: () => void;
}

export function Sidebar({ onClose, onSignOut }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 border-b border-upwork-background">
        <Logo />
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 text-upwork-gray-light hover:text-upwork-gray hover:bg-upwork-background rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </button>
        )}
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-upwork-background text-upwork-green"
                      : "text-upwork-gray-light hover:bg-upwork-background hover:text-upwork-gray"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom links with separator */}
        <div className="p-4 border-t border-upwork-background">
          <div className="space-y-1">
            <Link
              to="/dashboard/settings"
              onClick={onClose}
              className="flex items-center px-3 py-2 text-sm font-medium text-upwork-gray-light hover:bg-upwork-background hover:text-upwork-gray rounded-lg"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={onSignOut}
              className="flex w-full items-center px-3 py-2 text-sm font-medium text-upwork-gray-light hover:bg-upwork-background hover:text-upwork-gray rounded-lg"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
