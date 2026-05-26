import { useEffect, useState } from "react";
import { bookingApi } from "../api/bookingApi";

function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await bookingApi.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await bookingApi.updateBookingStatus(bookingId, status);
      fetchBookings();
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Booking Management
      </h1>

      <div className="mt-8 space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl bg-white p-6 shadow"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-semibold">Booking ID: {booking.id}</p>

                <p className="mt-1 text-sm text-slate-600">
                  User ID: {booking.userId}
                </p>

                <p className="text-sm text-slate-600">
                  Room ID: {booking.roomId}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  {booking.checkInDate} → {booking.checkOutDate}
                </p>

                <p className="mt-2 font-semibold">
                  {booking.totalPrice?.toLocaleString()} VND
                </p>
              </div>

              <div>
                <select
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusChange(booking.id, e.target.value)
                  }
                  className="rounded-xl border px-4 py-2"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookingsPage;