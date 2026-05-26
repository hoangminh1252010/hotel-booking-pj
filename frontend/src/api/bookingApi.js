import axiosClient from "./axiosClient";

export const bookingApi = {
  createBooking: (data) => axiosClient.post("/bookings", data),

  getUserBookings: (userId) => axiosClient.get(`/bookings/user/${userId}`),

  cancelBooking: (bookingId) =>
    axiosClient.put(`/bookings/${bookingId}/cancel`),

  getAllBookings: () => axiosClient.get("/admin/bookings"),

  updateBookingStatus: (bookingId, status) =>
    axiosClient.put(`/admin/bookings/${bookingId}/status?status=${status}`),
};