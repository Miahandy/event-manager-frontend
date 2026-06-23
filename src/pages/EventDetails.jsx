import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import { useFetch } from "../hooks/useFetch";
import { getEventById } from "../services/eventService";
import { getMyInscriptions } from "../services/inscriptionService";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../utils/roles";
import { formatDateTime } from "../utils/formatDate";
import InscriptionButton from "../components/InscriptionButton";
import StatusBadge from "../components/StatusBadge";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";
import api from "../services/api";
import "./EventDetails.css";

export default function EventDetails() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const { data: event,        loading: loadingE, error: errorE }  = useFetch(() => getEventById(id), [id]);
  const { data: inscriptions, loading: loadingI, refetch }        = useFetch(getMyInscriptions);

  const myInscription = inscriptions?.find(i => i.evenement_id === Number(id));
  const isEtudiant    = user?.role?.toLowerCase() === ROLES.ETUDIANT;
  const placesRestantes = event ? (event.capacite - (event.inscrits ?? 0)) : null;

  if (loadingE) return <Spinner label="Chargement…" size="lg" />;
  if (errorE)   return <p className="dashboard__error" style={{ padding: 40 }}>{errorE}</p>;
  if (!event)   return null;

  return (
    <main className="event-details">
      {/* Bouton retour */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="event-details__back">
        ← Retour
      </Button>

      <div className="event-details__card">
        {/* En-tête */}
        <div className="event-details__header">
          <div className="event-details__tags">
            {event.categorie && <span className="event-card__category">{event.categorie}</span>}
            <StatusBadge statut={event.statut} type="event" />
          </div>
          <h1 className="event-details__title">{event.titre}</h1>
        </div>

        {/* Infos */}
        <div className="event-details__meta-grid">
          <div className="event-details__meta-item">
            <span className="event-details__meta-label">📅 Date de début</span>
            <span className="event-details__meta-value">{formatDateTime(event.date_debut)}</span>
          </div>
          {event.date_fin && (
            <div className="event-details__meta-item">
              <span className="event-details__meta-label">🏁 Date de fin</span>
              <span className="event-details__meta-value">{formatDateTime(event.date_fin)}</span>
            </div>
          )}
          {event.lieu && (
            <div className="event-details__meta-item">
              <span className="event-details__meta-label">📍 Lieu</span>
              <span className="event-details__meta-value">{event.lieu}</span>
            </div>
          )}
          <div className="event-details__meta-item">
            <span className="event-details__meta-label">👥 Places</span>
            <span className="event-details__meta-value">
              {placesRestantes > 0 ? `${placesRestantes} restante(s) / ${event.capacite}` : "Complet"}
            </span>
          </div>
          <div className="event-details__meta-item">
            <span className="event-details__meta-label">💰 Prix</span>
            <span className="event-details__meta-value event-details__prix">
              {event.prix === 0 ? "Gratuit" : `${event.prix} Ar`}
            </span>
          </div>
          {event.organisateur && (
            <div className="event-details__meta-item">
              <span className="event-details__meta-label">🎤 Organisateur</span>
              <span className="event-details__meta-value">
                {event.organisateur.prenom} {event.organisateur.nom}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <div className="event-details__desc">
            <h2 className="event-details__desc-title">À propos</h2>
            <p>{event.description}</p>
          </div>
        )}

        {/* Bouton inscription */}
        {isAuthenticated && isEtudiant && !loadingI && (
          <div className="event-details__cta">
            {event.statut === "ouvert" && placesRestantes > 0 ? (
              <InscriptionButton
                eventId={event.id}
                inscriptionId={myInscription?.id}
                onSuccess={refetch}
              />
            ) : (
              <p className="event-details__closed">
                {event.statut !== "ouvert" ? "Inscriptions fermées." : "Événement complet."}
              </p>
            )}
            {myInscription && (
              <p className="event-details__my-status">
                Votre statut : <StatusBadge statut={myInscription.statut} type="inscription" />
              </p>
            )}
          </div>
        )}

        {!isAuthenticated && (
          <div className="event-details__cta">
            <Button onClick={() => navigate("/login")}>Se connecter pour s'inscrire</Button>
          </div>
        )}
      </div>
    </main>
  );
}
