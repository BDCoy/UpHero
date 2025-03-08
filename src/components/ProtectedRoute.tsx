import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-gray-500 animate-spin" />
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};