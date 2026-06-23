import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//import { useFetch } from "../hooks/useFetch";
import { getMyEvents, deleteEvent } from "../services/eventService";
import "./Dashboard.css";

const IconPlus = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);

export default function DashboardOrganizer() {
  const { user, logout } = useAuth();
  const { data: events, loading, error, refetch } = useFetch(getMyEvents);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet événement ?")) return;
    setDeleting(id);
    try {
      await deleteEvent(id);
      refetch();
    } catch (e) {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeleting(null);
    }
  };

  const stats = {
    total: events?.length ?? 0,
    ouverts: events?.filter(e => e.statut === "ouvert").length ?? 0,
    complets: events?.filter(e => e.statut === "complet").length ?? 0,
  };

  return (
    <main className="dashboard">
      {/* ── Top bar ── */}
      <div className="dashboard__topbar">
        <div>
          <h1 className="dashboard__title">Espace Organisateur</h1>
          <p className="dashboard__subtitle">Bienvenue, {user?.prenom ?? user?.nom}</p>
        </div>
        <div className="dashboard__topbar-actions">
          <Link to="/evenements/nouveau" className="dashboard__cta">
            <IconPlus /> Nouvel événement
          </Link>
          <button onClick={logout} className="dashboard__logout">Déconnexion</button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="dashboard__stats">
        {[
          { label: "Total événements", value: stats.total },
          { label: "Ouverts",          value: stats.ouverts },
          { label: "Complets",         value: stats.complets },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div>
              <span className="stat-card__value">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Liste de mes événements ── */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Mes événements</h2>
        {loading && <div className="dashboard__loading"><span className="spinner" />Chargement…</div>}
        {error   && <p className="dashboard__error">{error}</p>}
        {!loading && events?.length === 0 && (
          <p className="dashboard__empty">Aucun événement créé. <Link to="/evenements/nouveau" className="link-pink">Créez le premier →</Link></p>
        )}
        {events?.length > 0 && (
          <div className="event-table-wrapper">
            <table className="event-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Lieu</th>
                  <th>Inscrits</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id}>
                    <td className="event-table__titre">{ev.titre}</td>
                    <td>{ev.date_debut ? new Date(ev.date_debut).toLocaleDateString("fr-FR") : "—"}</td>
                    <td>{ev.lieu ?? "—"}</td>
                    <td>{ev.inscrits ?? 0} / {ev.capacite ?? "∞"}</td>
                    <td><span className={`badge badge--${ev.statut === "ouvert" ? "green" : ev.statut === "complet" ? "orange" : "gray"}`}>{ev.statut}</span></td>
                    <td className="event-table__actions">
                      <Link to={`/evenements/${ev.id}/modifier`} className="icon-btn icon-btn--edit" title="Modifier">
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        disabled={deleting === ev.id}
                        className="icon-btn icon-btn--delete"
                        title="Supprimer"
                      >
                        <IconTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
