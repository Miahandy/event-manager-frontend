import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import authService from '../services/authService';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

export default function Login() {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", mot_de_passe: "" });

  const handleChange = (e) => {
    clearError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      // Redirection selon le rôle
      const role = user?.role?.toLowerCase();
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "organisateur") navigate("/dashboard/organisateur");
      else navigate("/dashboard/etudiant");
    } catch {
      // L'erreur est déjà gérée dans AuthContext
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* En-tête */}
        <div className="auth-card__header">
          <span className="auth-card__icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
          </span>
          <h1 className="auth-card__title">Connexion</h1>
          <p className="auth-card__subtitle">Accédez à votre espace événements</p>
        </div>

        {/* Erreur globale */}
        {error && (
          <div className="auth-card__alert" role="alert">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__group">
            <label htmlFor="email" className="auth-form__label">Adresse e-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              className="auth-form__input"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-form__group">
            <label htmlFor="mot_de_passe" className="auth-form__label">Mot de passe</label>
            <input
              id="mot_de_passe"
              type="password"
              name="mot_de_passe"
              className="auth-form__input"
              placeholder="••••••••"
              value={form.mot_de_passe}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-form__btn" disabled={loading}>
            {loading ? (
              <span className="auth-form__spinner" aria-hidden="true" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Se connecter
              </>
            )}
          </button>
        </form>

        <p className="auth-card__footer">
          Pas encore de compte ?{" "}
          <Link to="/register" className="auth-card__link">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
