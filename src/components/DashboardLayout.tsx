import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";
import { supabase } from "../lib/supabase";
import { Sidebar } from "./dashboard/Sidebar";
import { Navbar } from "./dashboard/Navbar";
import { Loader2 } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  // Validate that the user's signup is complete.
  useEffect(() => {
    const checkSignupCompletion = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("signup_completed")
            .eq("id", data.user.id)
            .single();
          // If there's an error or signup_completed is false, redirect to /signup.
          if (error || !profile?.signup_completed) {
            navigate("/signup");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking signup status:", error);
        navigate("/signup");
        return;
      } finally {
        setLoading(false);
      }
    };

    checkSignupCompletion();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 text-gray-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-upwork-background">
      {/* Mobile sidebar backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-upwork-gray bg-opacity-50 z-20 transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} onSignOut={handleSignOut} />
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar onSignOut={handleSignOut} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <Navbar onOpenSidebar={() => setIsMobileMenuOpen(true)} onSignOut={handleSignOut} />

        <main className="flex-1 bg-upwork-background">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
