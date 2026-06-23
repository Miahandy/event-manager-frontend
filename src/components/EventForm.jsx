import api from "../services/api";
import FiliereSelect from "./FiliereSelect";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEvent, updateEvent, getEventById } from "../services/eventService";
import { toInputDatetime } from "../utils/formatDate";
import { EVENT_STATUTS, EVENT_STATUT_LABELS } from "../utils/constants";
import CategorySelect from "./CategorySelect";
import LieuSelect from "./LieuSelect";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import "./EventForm.css";

const INITIAL = {
  titre: "", description: "", date_debut: "", date_fin: "",
  lieu_id: "", categorie_id: "", capacite: "", prix: "0", statut: "ouvert",
};

export default function EventForm() {
  const { id } = useParams();              // présent = mode édition
  const isEdit  = Boolean(id);
  const navigate = useNavigate();

  const [form,    setForm]    = useState(INITIAL);
  const [loading, setLoading] = useState(isEdit);
  const [saving,  setSaving]  = useState(false);
  const [errors,  setErrors]  = useState({});
  const [apiError, setApiError] = useState(null);

  /* Chargement en mode édition */
  useEffect(() => {
    if (!isEdit) return;
    getEventById(id)
      .then(ev => setForm({
        titre:        ev.titre        ?? "",
        description:  ev.description  ?? "",
        date_debut:   toInputDatetime(ev.date_debut),
        date_fin:     toInputDatetime(ev.date_fin),
        lieu_id:      ev.lieu_id      ?? "",
        categorie_id: ev.categorie_id ?? "",
        capacite:     ev.capacite     ?? "",
        prix:         ev.prix         ?? "0",
        statut:       ev.statut       ?? "ouvert",
      }))
      .catch(() => setApiError("Impossible de charger l'événement."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    setApiError(null);
  };

  const validate = () => {
    const errs = {};
    if (!form.titre.trim())    errs.titre      = "Le titre est requis.";
    if (!form.date_debut)      errs.date_debut = "La date de début est requise.";
    if (!form.capacite || form.capacite <= 0)
                               errs.capacite   = "La capacité doit être supérieure à 0.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const payload = {
        ...form,
        capacite: Number(form.capacite),
        prix:     Number(form.prix),
      };
      if (isEdit) await updateEvent(id, payload);
      else        await createEvent(payload);
      navigate("/dashboard/organisateur");
    } catch (err) {
      setApiError(err.response?.data?.detail || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner label="Chargement de l'événement…" size="lg" />;

  return (
    <div className="event-form-page">
      <div className="event-form-card">
        <h1 className="event-form__title">
          {isEdit ? "Modifier l'événement" : "Créer un événement"}
        </h1>

        {apiError && <div className="auth-card__alert">{apiError}</div>}

        <form className="event-form" onSubmit={handleSubmit} noValidate>

          {/* Titre */}
          <Input
            label="Titre *"
            id="titre" name="titre" type="text"
            placeholder="Nom de l'événement"
            value={form.titre} onChange={handleChange}
            error={errors.titre} required
          />

          {/* Description */}
          <div className="input-group">
            <label htmlFor="description" className="input-group__label">Description</label>
            <textarea
              id="description" name="description"
              className="auth-form__input event-form__textarea"
              placeholder="Décrivez l'événement…"
              value={form.description} onChange={handleChange}
              rows={4}
            />
          </div>

          {/* Dates */}
          <div className="event-form__row">
            <Input label="Date de début *" id="date_debut" name="date_debut"
              type="datetime-local" value={form.date_debut}
              onChange={handleChange} error={errors.date_debut} required />
            <Input label="Date de fin" id="date_fin" name="date_fin"
              type="datetime-local" value={form.date_fin}
              onChange={handleChange} />
          </div>

          {/* Catégorie */}
          <div className="input-group">
            <label className="input-group__label">Catégorie</label>
            <CategorySelect value={form.categorie_id} onChange={handleChange} />
          </div>

          {/* Lieu */}
          <div className="input-group">
            <label className="input-group__label">Lieu</label>
            <LieuSelect value={form.lieu_id} onChange={handleChange} />
          </div>

          {/* Capacité + Prix */}
          <div className="event-form__row">
            <Input label="Capacité *" id="capacite" name="capacite"
              type="number" min="1" placeholder="Ex: 50"
              value={form.capacite} onChange={handleChange}
              error={errors.capacite} required />
            <Input label="Prix (Ar)" id="prix" name="prix"
              type="number" min="0" placeholder="0 = Gratuit"
              value={form.prix} onChange={handleChange} />
          </div>

          {/* Statut */}
          <div className="input-group">
            <label htmlFor="statut" className="input-group__label">Statut</label>
            <select id="statut" name="statut"
              className="auth-form__input auth-form__select"
              value={form.statut} onChange={handleChange}>
              {Object.entries(EVENT_STATUTS).map(([, val]) => (
                <option key={val} value={val}>{EVENT_STATUT_LABELS[val]}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="event-form__actions">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {isEdit ? "Enregistrer les modifications" : "Créer l'événement"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
