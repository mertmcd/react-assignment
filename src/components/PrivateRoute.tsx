import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, logout } = useAuth();

  const token = localStorage.getItem("token");

  if (!isAuthenticated || !token) {
    return <Navigate to="/" />;
  }

  try {
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));

    if (decodedPayload.exp < Date.now()) {
      logout();
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    logout();
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
