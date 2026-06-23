import { useAuth } from "../hooks/useAuth";
//import { useFetch } from "../hooks/useFetch";
import { getAllEvents } from "../services/eventService";
import { getMyInscriptions } from "../services/inscriptionService";
import EventCard from "../components/EventCard";
import "./Dashboard.css";

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>
  </svg>
);
const IconClipboard = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1"/>
  </svg>
);

const STATUT_BADGE = {
  en_attente: { label: "En attente", cls: "badge--orange" },
  confirme:   { label: "Confirmé",   cls: "badge--green"  },
  refuse:     { label: "Refusé",     cls: "badge--red"    },
};

export default function DashboardStudent() {
  const { user, logout } = useAuth();
  const { data: events, loading: loadingE, error: errorE } = useFetch(getAllEvents);
  const { data: inscriptions, loading: loadingI, error: errorI } = useFetch(getMyInscriptions);

  return (
    <main className="dashboard">
      {/* ── Top bar ── */}
      <div className="dashboard__topbar">
        <div>
          <h1 className="dashboard__title">Bonjour, {user?.prenom ?? user?.nom ?? "Étudiant"} 👋</h1>
          <p className="dashboard__subtitle">Découvrez et inscrivez-vous aux événements disponibles</p>
        </div>
        <button onClick={logout} className="dashboard__logout">Déconnexion</button>
      </div>

      {/* ── Stats rapides ── */}
      <div className="dashboard__stats">
        <div className="stat-card">
          <IconCalendar />
          <div>
            <span className="stat-card__value">{events?.length ?? "—"}</span>
            <span className="stat-card__label">Événements disponibles</span>
          </div>
        </div>
        <div className="stat-card">
          <IconClipboard />
          <div>
            <span className="stat-card__value">{inscriptions?.length ?? "—"}</span>
            <span className="stat-card__label">Mes inscriptions</span>
          </div>
        </div>
      </div>

      {/* ── Événements ── */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Événements disponibles</h2>
        {loadingE && <div className="dashboard__loading"><span className="spinner" />Chargement…</div>}
        {errorE   && <p className="dashboard__error">{errorE}</p>}
        {!loadingE && events?.length === 0 && <p className="dashboard__empty">Aucun événement pour le moment.</p>}
        <div className="events-grid">
          {events?.map(ev => <EventCard key={ev.id} event={ev} />)}
        </div>
      </section>

      {/* ── Mes inscriptions ── */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Mes inscriptions</h2>
        {loadingI && <div className="dashboard__loading"><span className="spinner" />Chargement…</div>}
        {errorI   && <p className="dashboard__error">{errorI}</p>}
        {!loadingI && inscriptions?.length === 0 && (
          <p className="dashboard__empty">Vous n'êtes inscrit à aucun événement.</p>
        )}
        {inscriptions?.length > 0 && (
          <div className="inscriptions-list">
            {inscriptions.map(insc => {
              const badge = STATUT_BADGE[insc.statut] ?? { label: insc.statut, cls: "badge--gray" };
              return (
                <div key={insc.id} className="inscription-row">
                  <div>
                    <p className="inscription-row__titre">{insc.evenement?.titre ?? "Événement"}</p>
                    <p className="inscription-row__date">
                      {insc.evenement?.date_debut
                        ? new Date(insc.evenement.date_debut).toLocaleDateString("fr-FR")
                        : ""}
                    </p>
                  </div>
                  <span className={`badge ${badge.cls}`}>{badge.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
