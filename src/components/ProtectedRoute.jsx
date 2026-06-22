
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Children } from "react";


/**
 * Protège une route :
 * - Redirige vers /login si non connecté
 * - Redirige vers /unauthorized si le rôle ne correspond pas
 *
 * Usage :
 *   <ProtectedRoute allowedRoles={["admin"]}>
 *     <DashboardAdmin />
 *   </ProtectedRoute>
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Pas connecté → login (on mémorise la page demandée)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Connecté mais mauvais rôle
  if (allowedRoles && !allowedRoles.includes(user?.role?.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
