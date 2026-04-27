import api from "./api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getBookings = () =>
  api.get("/bookings", authHeader());

export const createBooking = (data) =>
  api.post("/bookings", data, authHeader());

export const updateBooking = (id, data) =>
  api.put(`/bookings/${id}`, data, authHeader());

export const deleteBooking = (id) =>
  api.delete(`/bookings/${id}`, authHeader());

export const getBookingStats = () =>
  api.get("/bookings/stats", authHeader());

export const getCustomers = () =>
  api.get("/bookings/customers", authHeader());