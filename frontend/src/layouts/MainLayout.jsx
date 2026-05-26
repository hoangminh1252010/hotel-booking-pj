import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-slate-900">
            StayEase
          </Link>

          <div className="flex gap-4 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <Link to="/rooms" className="hover:text-slate-900">
              Rooms
            </Link>
            <Link to="/my-bookings" className="hover:text-slate-900">
              My Bookings
            </Link>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export default MainLayout;