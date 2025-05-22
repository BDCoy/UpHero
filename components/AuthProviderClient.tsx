"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function ClientAuthProvider({
  children,
  user: initialUser,
}: {
  children: ReactNode;
  user: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const isAuthenticated = user ? true : false;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
