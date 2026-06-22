import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
    <path d="M12 13.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" fill="currentColor" stroke="none" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-icon"><IconCalendar /></span>
          <span className="footer__logo-text">Event Manager</span>
        </div>

        <nav className="footer__links" aria-label="Liens du bas de page">
          <NavLink to="/" end className="footer__link">Accueil</NavLink>
          <NavLink to="/login" className="footer__link">Connexion</NavLink>
          <NavLink to="/register" className="footer__link">Inscription</NavLink>
        </nav>

        <p className="footer__copy">
          © {year} Event Manager — Gestion d'événements universitaires
        </p>
      </div>
    </footer>
  );
}
