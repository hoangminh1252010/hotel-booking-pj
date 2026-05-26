import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-3xl bg-white p-10 shadow">
        <p className="mb-3 text-sm font-semibold uppercase text-slate-500">
          Hotel & Homestay Booking
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight text-slate-900">
          Find your perfect stay for your next trip.
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Browse beautiful rooms, check details, and book your stay easily with
          StayEase.
        </p>

        <Link
          to="/rooms"
          className="mt-8 inline-block rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white"
        >
          Explore Rooms
        </Link>
      </section>
    </main>
  );
}

export default HomePage;