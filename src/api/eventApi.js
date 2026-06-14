import api from "./axios";

export const getAllEvents = () => api.get("/events");
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (data) => api.post("/events", data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const searchEvents = (keyword) => api.get(`/events/search?keyword=${keyword}`);
export const getEventsByCategory = (category) => api.get(`/events/category/${category}`);
export const getMyEvents = () => api.get("/events/my-events");