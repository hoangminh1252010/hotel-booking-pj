import axiosClient from "./axiosClient";

export const roomApi = {
  getAllRooms: () => axiosClient.get("/rooms"),

  getRoomById: (id) => axiosClient.get(`/rooms/${id}`),

  searchRooms: (location) =>
    axiosClient.get(`/rooms/search?location=${location}`),

  createRoom: (data) => axiosClient.post("/admin/rooms", data),

  updateRoom: (id, data) => axiosClient.put(`/admin/rooms/${id}`, data),

  deleteRoom: (id) => axiosClient.delete(`/admin/rooms/${id}`),
};