import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { roomApi } from "../api/roomApi";

function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await roomApi.getRoomById(id);
        setRoom(response.data);
      } catch (error) {
        console.error("Failed to fetch room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return <main className="p-10 text-slate-600">Loading room...</main>;
  }

  if (!room) {
    return <main className="p-10 text-slate-600">Room not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <img
        src={room.imageUrls?.[0]}
        alt={room.name}
        className="h-[420px] w-full rounded-3xl object-cover shadow"
      />

      <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl bg-white p-8 shadow">
          <p className="text-sm font-medium text-slate-500">
            {room.location}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {room.name}
          </h1>

          <p className="mt-5 text-slate-600">{room.description}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 p-4">
              Capacity: {room.capacity} guests
            </div>
            <div className="rounded-2xl bg-slate-100 p-4">
              Beds: {room.bedCount}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-slate-900">Amenities</h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {room.amenities?.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Price per night</p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {room.pricePerNight?.toLocaleString()} VND
          </p>

          <Link
            to={`/booking/${room.id}`}
            className="mt-6 block rounded-2xl bg-slate-900 px-6 py-3 text-center font-medium text-white"
          >
            Book this room
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default RoomDetailPage;