import { createContext, useState } from "react";
import { getAuthToken } from "../lib/auth-token.util";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = getAuthToken();

  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
