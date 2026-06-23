import { Routes, Route } from "react-router-dom";

// Pages publiques
import Home           from "../pages/Home";
import Login          from "../pages/Login";
import Register       from "../pages/Register";
import EventDetails   from "../pages/EventDetails";

// Dashboards
import DashboardStudent   from "../pages/DashboardStudent";
import DashboardOrganizer from "../pages/DashboardOrganizer";
import DashboardAdmin     from "../pages/DashboardAdmin";

// Formulaire événement
import EventForm from "../components/EventForm";

// Inscriptions
import MyInscriptions from "../pages/MyInscriptions";

// Erreurs
import NotFound    from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

// Garde
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Publiques ─────────────────────────────────────── */}
      <Route path="/"          element={<Home />} />
      <Route path="/login"     element={<Login />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/evenements/:id" element={<EventDetails />} />

      {/* ── Étudiant ──────────────────────────────────────── */}
      <Route path="/dashboard/etudiant" element={
        <ProtectedRoute allowedRoles={["etudiant"]}>
          <DashboardStudent />
        </ProtectedRoute>
      } />
      <Route path="/mes-inscriptions" element={
        <ProtectedRoute allowedRoles={["etudiant"]}>
          <MyInscriptions />
        </ProtectedRoute>
      } />

      {/* ── Organisateur ──────────────────────────────────── */}
      <Route path="/dashboard/organisateur" element={
        <ProtectedRoute allowedRoles={["organisateur"]}>
          <DashboardOrganizer />
        </ProtectedRoute>
      } />
      <Route path="/evenements/nouveau" element={
        <ProtectedRoute allowedRoles={["organisateur"]}>
          <EventForm />
        </ProtectedRoute>
      } />
      <Route path="/evenements/:id/modifier" element={
        <ProtectedRoute allowedRoles={["organisateur", "admin"]}>
          <EventForm />
        </ProtectedRoute>
      } />

      {/* ── Admin ─────────────────────────────────────────── */}
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <DashboardAdmin />
        </ProtectedRoute>
      } />

      {/* ── Erreurs ───────────────────────────────────────── */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*"             element={<NotFound />} />
    </Routes>
  );
}
