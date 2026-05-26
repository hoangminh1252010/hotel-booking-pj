import axiosClient from "./axiosClient";

export const roomApi = {
  getAllRooms: () => axiosClient.get("/rooms"),

  getRoomById: (id) => axiosClient.get(`/rooms/${id}`),

searchRooms: ({ location, checkInDate, checkOutDate, guests }) => {
  const params = new URLSearchParams();

  if (location) params.append("location", location);
  if (checkInDate) params.append("checkInDate", checkInDate);
  if (checkOutDate) params.append("checkOutDate", checkOutDate);
  if (guests) params.append("guests", guests);

  return axiosClient.get(`/rooms/search?${params.toString()}`);
},

  createRoom: (data) => axiosClient.post("/admin/rooms", data),

  updateRoom: (id, data) => axiosClient.put(`/admin/rooms/${id}`, data),

  deleteRoom: (id) => axiosClient.delete(`/admin/rooms/${id}`),
};