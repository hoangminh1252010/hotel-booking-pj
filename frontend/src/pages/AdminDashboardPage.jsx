import { useEffect, useState } from "react";
import { roomApi } from "../api/roomApi";
import { bookingApi } from "../api/bookingApi";

function AdminDashboardPage() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsResponse = await roomApi.getAllRooms();
        const bookingsResponse = await bookingApi.getAllBookings();

        setRooms(roomsResponse.data);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "CANCELLED"
  ).length;

  const totalRevenue = bookings
    .filter((booking) => booking.status !== "CANCELLED")
    .reduce((sum, booking) => sum + Number(booking.totalPrice || 0), 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Overview of rooms, bookings and revenue.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Total Rooms</p>
          <p className="mt-2 text-3xl font-bold">{rooms.length}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="mt-2 text-3xl font-bold">{pendingBookings}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Confirmed</p>
          <p className="mt-2 text-3xl font-bold">{confirmedBookings}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Cancelled</p>
          <p className="mt-2 text-3xl font-bold">{cancelledBookings}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <p className="text-sm text-slate-500">Estimated Revenue</p>
        <p className="mt-2 text-3xl font-bold">
          {totalRevenue.toLocaleString()} VND
        </p>
      </div>
    </div>
  );
}

export default AdminDashboardPage;