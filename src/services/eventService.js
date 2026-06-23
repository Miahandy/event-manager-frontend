import api from "./api";

export const getAllEvents = () => api.get("/evenements").then(r => r.data);
export const getEventById = (id) => api.get(`/evenements/${id}`).then(r => r.data);
export const getMyEvents = () => api.get("/evenements/mes-evenements").then(r => r.data);
export const createEvent = (data) => api.post("/evenements", data).then(r => r.data);
export const updateEvent = (id, data) => api.put(`/evenements/${id}`, data).then(r => r.data);
export const deleteEvent = (id) => api.delete(`/evenements/${id}`).then(r => r.data);
