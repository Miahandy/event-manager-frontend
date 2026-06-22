
import { Routes, Route } from "react-router-dom";

// Pages publiques
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Dashboards 
import DashboardStudent from "../pages/DashboardStudent";
import DashboardOrganizer from "../pages/DashboardOrganizer";
import DashboardAdmin from "../pages/DashboardAdmin";

// Pages d'erreur
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

// Garde de route
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Publiques ───────────────────────────────────── */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Étudiant ────────────────────────────────────── */}
      <Route
        path="/dashboard/etudiant"
        element={
          <ProtectedRoute allowedRoles={["etudiant"]}>
            <DashboardStudent />
          </ProtectedRoute>
        }
      />

      {/* ── Organisateur ────────────────────────────────── */}
      <Route
        path="/dashboard/organisateur"
        element={
          <ProtectedRoute allowedRoles={["organisateur"]}>
            <DashboardOrganizer />
          </ProtectedRoute>
        }
      />

      {/* ── Admin ───────────────────────────────────────── */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      {/* ── Erreurs ─────────────────────────────────────── */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
