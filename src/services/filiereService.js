import api from "./api";

export const getFilieres    = ()     => api.get("/filieres").then(r => r.data);
export const createFiliere  = (data) => api.post("/filieres", data).then(r => r.data);
export const deleteFiliere  = (id)   => api.delete(`/filieres/${id}`).then(r => r.data);
