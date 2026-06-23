import api from "./api";

export const getLieux    = ()     => api.get("/lieux").then(r => r.data);
export const createLieu = (data) => api.post("/lieux", data).then(r => r.data);
export const deleteLieu = (id)   => api.delete(`/lieux/${id}`).then(r => r.data);
