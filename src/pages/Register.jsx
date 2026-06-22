import Input from '../components/common/Input';
import Button from '../components/common/Button';
import authService from '../services/authService';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Register.css";

const ROLES = [
  { value: "etudiant", label: "Étudiant(e)" },
  { value: "organisateur", label: "Organisateur" },
];

export default function Register() {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    mot_de_passe: "",
    confirmer_mot_de_passe: "",
    role: "etudiant",
  });

  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    clearError();
    setLocalError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (form.mot_de_passe !== form.confirmer_mot_de_passe) {
      setLocalError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (form.mot_de_passe.length < 6) {
      setLocalError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    const { confirmer_mot_de_passe, ...payload } = form;

    try {
      await register(payload);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      // L'erreur est gérée dans AuthContext
    }
  };

  const displayError = localError || error;

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        {/* En-tête */}
        <div className="auth-card__header">
          <span className="auth-card__icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="10" cy="8" r="4" />
              <path d="M2 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="16" y1="11" x2="22" y2="11" />
            </svg>
          </span>
          <h1 className="auth-card__title">Créer un compte</h1>
          <p className="auth-card__subtitle">Rejoignez la plateforme d'événements</p>
        </div>

        {/* Succès */}
        {success && (
          <div className="auth-card__success" role="status">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Compte créé ! Redirection vers la connexion…
          </div>
        )}

        {/* Erreur globale */}
        {displayError && !success && (
          <div className="auth-card__alert" role="alert">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {displayError}
          </div>
        )}

        {/* Formulaire */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Nom / Prénom */}
          <div className="auth-form__row">
            <div className="auth-form__group">
              <label htmlFor="nom" className="auth-form__label">Nom</label>
              <input
                id="nom" type="text" name="nom"
                className="auth-form__input"
                placeholder="Rakoto"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-form__group">
              <label htmlFor="prenom" className="auth-form__label">Prénom</label>
              <input
                id="prenom" type="text" name="prenom"
                className="auth-form__input"
                placeholder="Jean"
                value={form.prenom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-form__group">
            <label htmlFor="email" className="auth-form__label">Adresse e-mail</label>
            <input
              id="email" type="email" name="email"
              className="auth-form__input"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Rôle */}
          <div className="auth-form__group">
            <label htmlFor="role" className="auth-form__label">Rôle</label>
            <select
              id="role" name="role"
              className="auth-form__input auth-form__select"
              value={form.role}
              onChange={handleChange}
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Mot de passe */}
          <div className="auth-form__group">
            <label htmlFor="mot_de_passe" className="auth-form__label">Mot de passe</label>
            <input
              id="mot_de_passe" type="password" name="mot_de_passe"
              className="auth-form__input"
              placeholder="Min. 6 caractères"
              value={form.mot_de_passe}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Confirmation */}
          <div className="auth-form__group">
            <label htmlFor="confirmer_mot_de_passe" className="auth-form__label">Confirmer le mot de passe</label>
            <input
              id="confirmer_mot_de_passe" type="password" name="confirmer_mot_de_passe"
              className="auth-form__input"
              placeholder="••••••••"
              value={form.confirmer_mot_de_passe}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="auth-form__btn" disabled={loading || success}>
            {loading ? (
              <span className="auth-form__spinner" aria-hidden="true" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Créer mon compte
              </>
            )}
          </button>
        </form>

        <p className="auth-card__footer">
          Déjà inscrit ?{" "}
          <Link to="/login" className="auth-card__link">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
