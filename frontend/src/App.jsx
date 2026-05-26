import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminRoomsPage from "./pages/AdminRoomsPage";
import AdminBookingsPage from "./pages/AdminBookingsPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/rooms" element={<AdminRoomsPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;