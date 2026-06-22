import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";;
import "./Navbar.css";

/* --- Icônes en SVG inline (aucune dépendance externe) --- */
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
    <path d="M12 13.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" fill="currentColor" stroke="none" />
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);
const IconUserPlus = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="8" r="4" />
    <path d="M2 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </svg>
);
const IconLogIn = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const NAV_LINKS = [
  { to: "/", label: "Accueil", icon: IconHome, end: true },
  { to: "/login", label: "Connexion", icon: IconUser, end: false },
  { to: "/register", label: "Inscription", icon: IconUserPlus, end: false },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon"><IconCalendar /></span>
          <span className="navbar__logo-text">Event Manager</span>
        </NavLink>

        {/* Liens - version desktop */}
        <nav className="navbar__links">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => "navbar__link" + (isActive ? " navbar__link--active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/login" className="navbar__cta navbar__cta--desktop">
          Connexion
        </NavLink>

        <button
          type="button"
          className="navbar__burger"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <IconMenu />
        </button>
      </div>

      {/* Overlay + tiroir - version mobile */}
      <div
        className={"navbar__overlay" + (isMenuOpen ? " navbar__overlay--visible" : "")}
        onClick={closeMenu}
      />
      <aside className={"navbar__drawer" + (isMenuOpen ? " navbar__drawer--open" : "")}>
        <button
          type="button"
          className="navbar__drawer-close"
          aria-label="Fermer le menu"
          onClick={closeMenu}
        >
          <IconClose />
        </button>

        <nav className="navbar__drawer-links">
          {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={closeMenu}
              className={({ isActive }) => "navbar__drawer-link" + (isActive ? " navbar__drawer-link--active" : "")}
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <NavLink to="/login" className="navbar__cta navbar__cta--drawer" onClick={closeMenu}>
          <IconLogIn />
          <span>Connexion</span>
        </NavLink>
      </aside>
    </header>
  );
}
