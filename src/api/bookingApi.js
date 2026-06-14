import api from "./axios";

export const bookEvent = (eventId) => api.post("/bookings", { eventId });
export const getMyBookings = () => api.get("/bookings/my-bookings");
export const cancelBooking = (bookingId) => api.put(`/bookings/cancel/${bookingId}`);
export const getBookingsForEvent = (eventId) => api.get(`/bookings/event/${eventId}`);