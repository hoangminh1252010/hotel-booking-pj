import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { roomApi } from "../api/roomApi";

function RoomsPage() {
  const [searchParams] = useSearchParams();

  const initialLocation = searchParams.get("location") || "";
  const initialCheckIn = searchParams.get("checkInDate") || "";
  const initialCheckOut = searchParams.get("checkOutDate") || "";
  const initialGuests = searchParams.get("guests") || "";

  const [rooms, setRooms] = useState([]);
  const [location, setLocation] = useState(initialLocation);
  const [loading, setLoading] = useState(true);

  const searchRooms = async ({
    locationValue = "",
    checkInDate = "",
    checkOutDate = "",
    guests = "",
  }) => {
    try {
      setLoading(true);

      const response = await roomApi.searchRooms({
        location: locationValue,
        checkInDate,
        checkOutDate,
        guests,
      });

      setRooms(response.data);
    } catch (error) {
      console.error("Failed to search rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await roomApi.getAllRooms();
      setRooms(response.data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    await searchRooms({
      locationValue: location,
      checkInDate: initialCheckIn,
      checkOutDate: initialCheckOut,
      guests: initialGuests,
    });
  };

  const handleReset = async () => {
    setLocation("");
    await fetchRooms();
  };

  useEffect(() => {
    const hasSearchParams =
      initialLocation || initialCheckIn || initialCheckOut || initialGuests;

    if (hasSearchParams) {
      searchRooms({
        locationValue: initialLocation,
        checkInDate: initialCheckIn,
        checkOutDate: initialCheckOut,
        guests: initialGuests,
      });
    } else {
      fetchRooms();
    }
  }, [initialLocation, initialCheckIn, initialCheckOut, initialGuests]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Available Rooms</h1>
        <p className="mt-2 text-slate-600">
          Search and book hotel or homestay rooms.
        </p>
      </div>

      {(initialLocation || initialCheckIn || initialCheckOut || initialGuests) && (
        <div className="mb-8 rounded-2xl bg-white p-5 shadow">
          <p className="font-semibold text-slate-900">Thông tin tìm kiếm</p>

          <div className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-4">
            <p>Điểm đến: {initialLocation || "Tất cả"}</p>
            <p>Nhận phòng: {initialCheckIn || "Chưa chọn"}</p>
            <p>Trả phòng: {initialCheckOut || "Chưa chọn"}</p>
            <p>Số khách: {initialGuests || "Chưa chọn"}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSearch} className="mb-8 flex gap-3">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location, e.g. Da Lat"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
        />

        <button className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white">
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700"
        >
          Reset
        </button>
      </form>

      {loading ? (
        <p className="text-slate-600">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-slate-600 shadow">
          No rooms found.
        </div>
      ) : (
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
                <p className="text-sm text-slate-500">{room.location}</p>

                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {room.name}
                </h2>

                <p className="mt-3 line-clamp-2 text-slate-600">
                  {room.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    {room.pricePerNight?.toLocaleString()} VND/night
                  </span>

                  <Link
                    to={`/rooms/${room.id}`}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default RoomsPage;