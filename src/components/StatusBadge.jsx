import { INSCRIPTION_STATUT_LABELS, EVENT_STATUT_LABELS } from "../utils/constants";

const COLORS = {
  ouvert:     "green",  confirme:   "green",
  complet:    "orange", en_attente: "orange",
  annule:     "red",    refuse:     "red",
  termine:    "gray",
};

export default function StatusBadge({ statut, type = "inscription" }) {
  const labels  = type === "event" ? EVENT_STATUT_LABELS : INSCRIPTION_STATUT_LABELS;
  const color   = COLORS[statut] ?? "gray";
  const label   = labels[statut] ?? statut;

  return <span className={`badge badge--${color}`}>{label}</span>;
}
