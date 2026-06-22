import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook principal pour accéder à l'authentification.
 *
 * Usage :
 *   const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
  }
  return context;
}
