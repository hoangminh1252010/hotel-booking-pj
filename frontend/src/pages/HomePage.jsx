// import { Link } from "react-router-dom";

// function HomePage() {
//   return (
//     <main className="mx-auto max-w-6xl px-6 py-16">
//       <section className="rounded-3xl bg-white p-10 shadow">
//         <p className="mb-3 text-sm font-semibold uppercase text-slate-500">
//           Hotel & Homestay Booking
//         </p>

//         <h1 className="max-w-3xl text-5xl font-bold leading-tight text-slate-900">
//           Find your perfect stay for your next trip.
//         </h1>

//         <p className="mt-5 max-w-2xl text-lg text-slate-600">
//           Browse beautiful rooms, check details, and book your stay easily with
//           StayEase.
//         </p>

//         <Link
//           to="/rooms"
//           className="mt-8 inline-block rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white"
//         >
//           Explore Rooms
//         </Link>
//       </section>
//     </main>
//   );
// }

// export default HomePage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    location: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.location) params.append("location", search.location);
    if (search.checkInDate) params.append("checkInDate", search.checkInDate);
    if (search.checkOutDate) params.append("checkOutDate", search.checkOutDate);
    if (search.guests) params.append("guests", search.guests);

    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="fixed left-0 top-0 z-50 w-full bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <h1 className="text-sm font-semibold tracking-wide">
            L'Horizon Luxury
          </h1>

          <div className="hidden gap-10 text-sm font-medium md:flex">
            <a href="#rooms" className="hover:text-slate-500">
              Rooms
            </a>
            <a href="#facilities" className="hover:text-slate-500">
              Facilities
            </a>
            <a href="#offers" className="hover:text-slate-500">
              Offers
            </a>
          </div>

          <button className="rounded bg-slate-950 px-6 py-3 text-xs font-bold text-white">
            BOOK NOW
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative flex min-h-[760px] items-center justify-center bg-cover bg-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800')",
        }}
      >
        <div className="mt-24 text-center text-white">
          <h2 className="mx-auto max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
            Nơi Sự Sang Trọng Gặp Gỡ Đường Chân Trời
          </h2>

          <p className="mt-6 text-base text-white/90">
            Trải nghiệm dịch vụ đẳng cấp thế giới tại những điểm đến tuyệt vời
            nhất.
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="absolute bottom-[-38px] left-1/2 grid w-[92%] max-w-6xl -translate-x-1/2 gap-4 rounded-xl bg-white p-5 shadow-2xl md:grid-cols-[1.3fr_1fr_1fr_1fr_auto]"
        >
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">
              Điểm đến
            </label>
            <input
              name="location"
              value={search.location}
              onChange={handleChange}
              placeholder="Tìm thành phố..."
              className="mt-2 w-full border-none text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">
              Nhận phòng
            </label>
            <input
              type="date"
              name="checkInDate"
              value={search.checkInDate}
              onChange={handleChange}
              className="mt-2 w-full border-none text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">
              Trả phòng
            </label>
            <input
              type="date"
              name="checkOutDate"
              value={search.checkOutDate}
              onChange={handleChange}
              className="mt-2 w-full border-none text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">
              Khách
            </label>
            <select
              name="guests"
              value={search.guests}
              onChange={handleChange}
              className="mt-2 w-full border-none bg-white text-sm outline-none"
            >
              <option value="1">1 Người lớn</option>
              <option value="2">2 Người lớn</option>
              <option value="3">3 Người lớn</option>
              <option value="4">4 Người lớn</option>
              <option value="5">5+ Người lớn</option>
            </select>
          </div>

          <button className="rounded bg-slate-950 px-8 py-4 text-sm font-bold text-white">
            Tìm kiếm
          </button>
        </form>
      </section>

      {/* Rooms */}
      <section id="rooms" className="mx-auto max-w-7xl px-8 pb-24 pt-32">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Bộ sưu tập độc bản
          </p>
          <h2 className="mt-4 text-4xl font-semibold">
            Phòng & Suite Đẳng Cấp
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Grand Ocean Suite",
              price: "12.500.000đ",
              img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
            },
            {
              name: "Presidential Penthouse",
              price: "45.000.000đ",
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
            },
            {
              name: "Tropical Garden Villa",
              price: "18.200.000đ",
              img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200",
            },
          ].map((room) => (
            <div key={room.name} className="rounded-xl bg-white p-4 shadow-sm">
              <img
                src={room.img}
                alt={room.name}
                className="h-72 w-full rounded-lg object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="mt-3 text-sm text-slate-500">
                  Không gian nghỉ dưỡng sang trọng, tinh tế và riêng tư.
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-bold">{room.price}</span>
                  <button className="rounded border px-5 py-2 text-sm">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="bg-slate-100 px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Tiện ích độc quyền
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row">
            <h2 className="max-w-xl text-4xl font-semibold leading-tight">
              Nâng Tầm Trải Nghiệm Nghỉ Dưỡng Của Bạn
            </h2>

            <p className="max-w-lg text-sm leading-7 text-slate-600">
              Chúng tôi mang đến những dịch vụ tinh tế nhất, được thiết kế riêng
              để đáp ứng mọi nhu cầu khắt khe của quý khách.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {["Spa & Trị Liệu", "Ẩm Thực Tinh Hoa", "Hồ Bơi Vô Cực", "Quản Gia Riêng"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-xl bg-white p-8 text-center shadow-sm"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                    ✦
                  </div>
                  <h3 className="text-lg font-semibold">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Trải nghiệm dịch vụ cao cấp với tiêu chuẩn sang trọng.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto grid max-w-7xl gap-16 px-8 py-28 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200"
          alt="Luxury breakfast"
          className="h-[480px] w-full rounded-2xl object-cover"
        />

        <div className="flex flex-col justify-center">
          <p className="text-5xl text-yellow-600">”</p>
          <p className="mt-6 text-2xl italic leading-relaxed">
            “Một trải nghiệm tuyệt vời chưa từng có. Dịch vụ quản gia tại
            L'Horizon thực sự làm tôi ngạc nhiên bởi sự tinh tế và chu đáo.”
          </p>

          <div className="mt-8">
            <p className="font-semibold">Nguyễn Minh Tuấn</p>
            <p className="text-sm text-slate-500">CEO tại TechVision Group</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-950 px-8 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold">
            Nhận Những Ưu Đãi Đặc Quyền
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            Đăng ký bản tin để nhận những chương trình khuyến mãi và điểm đến
            mới nhất.
          </p>

          <div className="mt-8 flex gap-3">
            <input
              placeholder="Địa chỉ email của bạn"
              className="flex-1 rounded border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none"
            />
            <button className="rounded bg-yellow-700 px-8 font-semibold">
              Gửi
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-8 py-10 text-center text-sm text-slate-400">
        © 2026 L'Horizon Luxury Hotels & Resorts. All rights reserved.
      </footer>
    </main>
  );
}

export default HomePage;