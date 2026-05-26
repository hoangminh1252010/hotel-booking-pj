import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingApi } from "../api/bookingApi";
import { roomApi } from "../api/roomApi";

function BookingPage() {
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({
    userId: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await roomApi.getRoomById(roomId);
        setRoom(response.data);
      } catch (error) {
        console.error("Failed to fetch room:", error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        userId: form.userId,
        roomId: roomId,
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
      };

      const response = await bookingApi.createBooking(payload);

      setMessage(
        `Booking created successfully. Total price: ${response.data.totalPrice?.toLocaleString()} VND`
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Booking failed. Please try again.";

      setMessage(errorMessage);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900">Book Room</h1>

        {room && (
          <div className="mt-4 rounded-2xl bg-slate-100 p-4">
            <p className="font-semibold text-slate-900">{room.name}</p>
            <p className="text-slate-600">{room.location}</p>
            <p className="mt-2 font-bold">
              {room.pricePerNight?.toLocaleString()} VND/night
            </p>
          </div>
        )}

        <form onSubmit={handleBooking} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              User ID
            </label>
            <input
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="Paste userId from login/register response"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Check-in Date
            </label>
            <input
              type="date"
              name="checkInDate"
              value={form.checkInDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Check-out Date
            </label>
            <input
              type="date"
              name="checkOutDate"
              value={form.checkOutDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <button className="w-full rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white">
            Confirm Booking
          </button>
        </form>

        {message && (
          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-slate-700">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}

export default BookingPage;