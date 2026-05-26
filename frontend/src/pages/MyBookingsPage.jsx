import { useState } from "react";
import { bookingApi } from "../api/bookingApi";

function MyBookingsPage() {
  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async (e) => {
    e.preventDefault();

    try {
      const response = await bookingApi.getUserBookings(userId);
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await bookingApi.cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "CANCELLED" }
            : booking
        )
      );
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>

      <form onSubmit={fetchBookings} className="mt-6 flex gap-3">
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your userId"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
        />

        <button className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white">
          Load
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  Booking ID: {booking.id}
                </p>
                <p className="text-sm text-slate-600">
                  {booking.checkInDate} → {booking.checkOutDate}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Total: {booking.totalPrice?.toLocaleString()} VND
                </p>
              </div>

              <div className="text-right">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {booking.status}
                </span>

                {booking.status !== "CANCELLED" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="mt-3 block rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyBookingsPage;