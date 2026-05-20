import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch rooms:", error);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            StayEase Hotel Booking
          </h1>

          <p className="mt-2 text-slate-600">
            Find and book beautiful homestays for your next trip.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="overflow-hidden rounded-2xl bg-white shadow"
            >
              <img
                src={room.imageUrls?.[0]}
                alt={room.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  {room.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {room.location}
                </p>

                <p className="mt-3 text-slate-600">{room.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    {room.pricePerNight?.toLocaleString()} VND/night
                  </span>

                  <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;