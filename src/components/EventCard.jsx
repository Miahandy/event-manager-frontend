import { Link } from "react-router-dom";
import "./EventCard.css";

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const STATUS_LABELS = {
  ouvert: { label: "Ouvert", color: "green" },
  complet: { label: "Complet", color: "orange" },
  annule: { label: "Annulé", color: "red" },
  termine: { label: "Terminé", color: "gray" },
};

export default function EventCard({ event }) {
  const {
    id, titre, description, date_debut, lieu, capacite,
    inscrits = 0, categorie, statut = "ouvert", prix = 0,
  } = event;

  const status = STATUS_LABELS[statut?.toLowerCase()] ?? STATUS_LABELS.ouvert;
  const dateStr = date_debut
    ? new Date(date_debut).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
    : "Date à définir";
  const placesRestantes = capacite - inscrits;

  return (
    <article className="event-card">
      <div className="event-card__header">
        {categorie && <span className="event-card__category">{categorie}</span>}
        <span className={`event-card__status event-card__status--${status.color}`}>
          {status.label}
        </span>
      </div>

      <h3 className="event-card__title">{titre}</h3>
      {description && (
        <p className="event-card__desc">{description.slice(0, 100)}{description.length > 100 ? "…" : ""}</p>
      )}

      <div className="event-card__meta">
        <span><IconCalendar /> {dateStr}</span>
        {lieu && <span><IconPin /> {lieu}</span>}
        <span><IconUsers /> {placesRestantes > 0 ? `${placesRestantes} place(s)` : "Complet"}</span>
      </div>

      <div className="event-card__footer">
        <span className="event-card__prix">
          {prix === 0 ? "Gratuit" : `${prix} Ar`}
        </span>
        <Link to={`/evenements/${id}`} className="event-card__btn">
          Voir détails →
        </Link>
      </div>
    </article>
  );
}
