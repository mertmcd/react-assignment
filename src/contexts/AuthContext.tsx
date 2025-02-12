// contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { TokenPayload, AuthContextType } from "../types/authTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const [, payload] = token.split(".");

        // Decode the payload from base64
        const decodedPayload: TokenPayload = JSON.parse(atob(payload));
        if (decodedPayload.exp > Date.now()) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
