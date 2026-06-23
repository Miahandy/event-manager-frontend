import api from "./api";

export const getMyInscriptions = () => api.get("/inscriptions/mes-inscriptions").then(r => r.data);
export const getAllInscriptions = () => api.get("/inscriptions").then(r => r.data);
export const inscrireEvent = (eventId) => api.post("/inscriptions", { evenement_id: eventId }).then(r => r.data);
export const updateStatutInscription = (id, statut) => api.put(`/inscriptions/${id}/statut`, { statut }).then(r => r.data);
export const deleteInscription = (id) => api.delete(`/inscriptions/${id}`).then(r => r.data);
