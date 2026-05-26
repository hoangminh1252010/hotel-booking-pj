import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 p-6 text-white">
        <h1 className="text-2xl font-bold">StayEase Admin</h1>

        <nav className="mt-8 space-y-3">
          <Link
            to="/admin/dashboard"
            className="block rounded-xl px-4 py-3 hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/rooms"
            className="block rounded-xl px-4 py-3 hover:bg-slate-800"
          >
            Rooms
          </Link>

          <Link
            to="/admin/bookings"
            className="block rounded-xl px-4 py-3 hover:bg-slate-800"
          >
            Bookings
          </Link>

          <Link
            to="/"
            className="block rounded-xl px-4 py-3 hover:bg-slate-800"
          >
            Back to Website
          </Link>
        </nav>
      </aside>

      <main className="ml-64 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;