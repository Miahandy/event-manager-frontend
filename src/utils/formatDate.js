/**
 * Formate une date ISO en "12 jan. 2025"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "Date inconnue";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric", month: "short", year: "numeric",
  });
};

/**
 * Formate une date ISO en "12 janv. 2025 à 14h30"
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("fr-FR", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

/**
 * Retourne "Il y a 3 jours", "Dans 2 heures", etc.
 */
export const formatRelative = (dateStr) => {
  if (!dateStr) return "";
  const diff = new Date(dateStr) - new Date();
  const abs = Math.abs(diff);
  const past = diff < 0;

  const minutes = Math.floor(abs / 60000);
  const hours   = Math.floor(abs / 3600000);
  const days    = Math.floor(abs / 86400000);

  let str;
  if (minutes < 60)      str = `${minutes} min`;
  else if (hours < 24)   str = `${hours} h`;
  else                   str = `${days} jour${days > 1 ? "s" : ""}`;

  return past ? `Il y a ${str}` : `Dans ${str}`;
};

/**
 * Formate pour un input[type="datetime-local"]
 */
export const toInputDatetime = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 16);
};
