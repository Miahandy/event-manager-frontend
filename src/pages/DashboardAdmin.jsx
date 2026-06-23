import { useAuth } from "../hooks/useAuth";
//import { useFetch } from "../hooks/useFetch";
import { getAllEvents } from "../services/eventService";
import { getAllInscriptions } from "../services/inscriptionService";
import { updateStatutInscription } from "../services/inscriptionService";
import "./Dashboard.css";

const STATUTS = ["en_attente", "confirme", "refuse"];

const STATUT_BADGE = {
  en_attente: { label: "En attente", cls: "badge--orange" },
  confirme:   { label: "Confirmé",   cls: "badge--green" },
  refuse:     { label: "Refusé",     cls: "badge--red" },
};

export default function DashboardAdmin() {
  const { user, logout } = useAuth();
  const { data: events, loading: loadingE } = useFetch(getAllEvents);
  const { data: inscriptions, loading: loadingI, refetch } = useFetch(getAllInscriptions);

  const handleStatut = async (id, statut) => {
    try {
      await updateStatutInscription(id, statut);
      refetch();
    } catch {
      alert("Erreur lors de la mise à jour.");
    }
  };

  const stats = [
    { label: "Événements",    value: events?.length ?? "—" },
    { label: "Inscriptions",  value: inscriptions?.length ?? "—" },
    { label: "En attente",    value: inscriptions?.filter(i => i.statut === "en_attente").length ?? "—" },
    { label: "Confirmées",    value: inscriptions?.filter(i => i.statut === "confirme").length ?? "—" },
  ];

  return (
    <main className="dashboard">
      {/* ── Top bar ── */}
      <div className="dashboard__topbar">
        <div>
          <h1 className="dashboard__title">Administration</h1>
          <p className="dashboard__subtitle">Bienvenue, {user?.prenom ?? user?.nom} — vue globale de la plateforme</p>
        </div>
        <button onClick={logout} className="dashboard__logout">Déconnexion</button>
      </div>

      {/* ── Stats ── */}
      <div className="dashboard__stats">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div>
              <span className="stat-card__value">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tous les événements ── */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Tous les événements</h2>
        {loadingE && <div className="dashboard__loading"><span className="spinner" />Chargement…</div>}
        {!loadingE && events?.length === 0 && <p className="dashboard__empty">Aucun événement.</p>}
        {events?.length > 0 && (
          <div className="event-table-wrapper">
            <table className="event-table">
              <thead>
                <tr><th>Titre</th><th>Organisateur</th><th>Date</th><th>Inscrits</th><th>Statut</th></tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id}>
                    <td className="event-table__titre">{ev.titre}</td>
                    <td>{ev.organisateur?.nom ?? "—"}</td>
                    <td>{ev.date_debut ? new Date(ev.date_debut).toLocaleDateString("fr-FR") : "—"}</td>
                    <td>{ev.inscrits ?? 0} / {ev.capacite ?? "∞"}</td>
                    <td>
                      <span className={`badge badge--${ev.statut === "ouvert" ? "green" : ev.statut === "complet" ? "orange" : "gray"}`}>
                        {ev.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Toutes les inscriptions ── */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Gestion des inscriptions</h2>
        {loadingI && <div className="dashboard__loading"><span className="spinner" />Chargement…</div>}
        {!loadingI && inscriptions?.length === 0 && <p className="dashboard__empty">Aucune inscription.</p>}
        {inscriptions?.length > 0 && (
          <div className="event-table-wrapper">
            <table className="event-table">
              <thead>
                <tr><th>Étudiant</th><th>Événement</th><th>Date</th><th>Statut</th><th>Action</th></tr>
              </thead>
              <tbody>
                {inscriptions.map(insc => {
                  const badge = STATUT_BADGE[insc.statut] ?? { label: insc.statut, cls: "badge--gray" };
                  return (
                    <tr key={insc.id}>
                      <td>{insc.etudiant?.prenom} {insc.etudiant?.nom}</td>
                      <td>{insc.evenement?.titre ?? "—"}</td>
                      <td>{insc.date_inscription ? new Date(insc.date_inscription).toLocaleDateString("fr-FR") : "—"}</td>
                      <td><span className={`badge ${badge.cls}`}>{badge.label}</span></td>
                      <td>
                        <select
                          className="admin-select"
                          value={insc.statut}
                          onChange={e => handleStatut(insc.id, e.target.value)}
                        >
                          {STATUTS.map(s => <option key={s} value={s}>{STATUT_BADGE[s]?.label ?? s}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
