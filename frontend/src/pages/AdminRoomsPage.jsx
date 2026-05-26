import { useEffect, useState } from "react";
import { roomApi } from "../api/roomApi";

const initialForm = {
  name: "",
  description: "",
  location: "",
  pricePerNight: "",
  capacity: "",
  bedCount: "",
  imageUrls: "",
  amenities: "",
};

function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchRooms = async () => {
    try {
      const response = await roomApi.getAllRooms();
      setRooms(response.data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const buildPayload = () => {
    return {
      name: form.name,
      description: form.description,
      location: form.location,
      pricePerNight: Number(form.pricePerNight),
      capacity: Number(form.capacity),
      bedCount: Number(form.bedCount),
      imageUrls: form.imageUrls
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      amenities: form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = buildPayload();

      if (editingId) {
        await roomApi.updateRoom(editingId, payload);
      } else {
        await roomApi.createRoom(payload);
      }

      setForm(initialForm);
      setEditingId(null);
      fetchRooms();
    } catch (error) {
      console.error("Failed to save room:", error);
    }
  };

  const handleEdit = (room) => {
    setEditingId(room.id);

    setForm({
      name: room.name || "",
      description: room.description || "",
      location: room.location || "",
      pricePerNight: room.pricePerNight || "",
      capacity: room.capacity || "",
      bedCount: room.bedCount || "",
      imageUrls: room.imageUrls?.join(", ") || "",
      amenities: room.amenities?.join(", ") || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await roomApi.deleteRoom(id);
      fetchRooms();
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Room Management</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-4 rounded-2xl bg-white p-6 shadow"
      >
        <h2 className="text-xl font-semibold">
          {editingId ? "Update Room" : "Create Room"}
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Room name"
          className="rounded-xl border px-4 py-3"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="rounded-xl border px-4 py-3"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="rounded-xl border px-4 py-3"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="pricePerNight"
            value={form.pricePerNight}
            onChange={handleChange}
            placeholder="Price per night"
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="bedCount"
            value={form.bedCount}
            onChange={handleChange}
            placeholder="Bed count"
            className="rounded-xl border px-4 py-3"
          />
        </div>

        <input
          name="imageUrls"
          value={form.imageUrls}
          onChange={handleChange}
          placeholder="Image URLs, separated by comma"
          className="rounded-xl border px-4 py-3"
        />

        <input
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          placeholder="Amenities, separated by comma"
          className="rounded-xl border px-4 py-3"
        />

        <div className="flex gap-3">
          <button className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white">
            {editingId ? "Update Room" : "Create Room"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
              className="rounded-xl border px-6 py-3 font-medium"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Room List</h2>

        <div className="mt-4 space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <p className="font-semibold">{room.name}</p>
                <p className="text-sm text-slate-500">{room.location}</p>
                <p className="text-sm text-slate-500">
                  {room.pricePerNight?.toLocaleString()} VND/night
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="rounded-xl border px-4 py-2 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(room.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminRoomsPage;