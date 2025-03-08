import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@lib/supabase";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  checkAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  loading: true,
  checkAuth: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
      setUser(data.user);
      setLoading(false);
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
      setUser(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    const { data } = await supabase.auth.getUser();
    setIsAuthenticated(!!data.user);
    setUser(data.user);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, checkAuth, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);