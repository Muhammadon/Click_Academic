import { exampleApiData } from "~/example/exampleApiData";
import { RiCalendarView } from "@remixicon/react";


export default function BookingClassPage() {
  return (
    <div className="min-h-screen bg-mint-lembut">
      <header className="sticky top-0 z-50 border-b border-sage/20 bg-putih-bersih/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-mint-lembut px-3 py-1 text-xs font-bold text-hijau-botol">
              Online Learning Reservation
            </div>

            <h1 className="mt-3 text-3xl font-black text-charcoal">
              Booking Kelas Pelatihan
            </h1>
          </div>

          <button className="rounded-2xl bg-hijau-uin px-5 py-3 text-sm font-bold text-putih-bersih shadow-lg shadow-hijau-uin/20 transition-all duration-300 hover:bg-hijau-botol">
            Riwayat Booking
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-r from-hijau-botol via-hijau-uin to-deep-teal px-6 py-16 text-putih-bersih lg:px-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-kuning-emas/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-soft-ochre/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <RiCalendarView  size={20}/> Reservasi Kelas Mahasiswa
            </div>

            <h2 className="mt-6 text-5xl font-black leading-tight">
              Pesan Kelas
              <br />
              dan Mulai
              <br />
              Belajar Sekarang.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-putih-bersih/80">
              Pilih jadwal kelas pelatihan sesuai kebutuhanmu dan lakukan
              booking secara online dengan cepat dan mudah.
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 grid gap-4 rounded-[32px] border border-putih-bersih/10 bg-putih-bersih/10 p-5 backdrop-blur-xl lg:grid-cols-4">
            <input
              type="text"
              placeholder="Cari kelas pelatihan..."
              className="rounded-2xl border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-4 text-putih-bersih placeholder:text-putih-bersih/60 outline-none focus:border-kuning-emas"
            />

            <select className="rounded-2xl border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-4 text-putih-bersih outline-none focus:border-kuning-emas">
              <option className="text-charcoal">Semua Kategori</option>
              <option className="text-charcoal">Programming</option>
              <option className="text-charcoal">Design</option>
              <option className="text-charcoal">Security</option>
            </select>

            <input
              type="date"
              className="rounded-2xl border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-4 text-putih-bersih outline-none focus:border-kuning-emas"
            />

            <button className="rounded-2xl bg-kuning-emas px-5 py-4 font-bold text-charcoal transition-all duration-300 hover:bg-soft-ochre">
              Cari Jadwal
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">
        <div className="space-y-7">
          {exampleApiData.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[32px] border border-sage/20 bg-putih-bersih shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="grid lg:grid-cols-[320px_1fr]">
                {/* Left Banner */}
                <div
                  className={`relative overflow-hidden bg-gradient-to-br ${item.color} p-8 text-putih-bersih`}
                >
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-putih-bersih/10 blur-3xl" />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <span className="rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                        {item.category}
                      </span>

                      <h3 className="mt-5 text-3xl font-black leading-tight">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm text-putih-bersih/80">
                        Mentor: {item.mentor}
                      </p>
                    </div>

                    <div className="mt-8 rounded-2xl bg-putih-bersih/10 p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-wide text-putih-bersih/60">
                        Jadwal Kelas
                      </p>

                      <p className="mt-2 text-lg font-bold">{item.schedule}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-3xl bg-mint-lembut p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-dark-slate/60">
                        Harga
                      </p>

                      <h4 className="mt-3 text-3xl font-black text-hijau-botol">
                        {item.price}
                      </h4>
                    </div>

                    <div className="rounded-3xl bg-cream p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-dark-slate/60">
                        Kuota
                      </p>

                      <h4 className="mt-3 text-2xl font-black text-terracotta">
                        {item.quota}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button className="rounded-2xl bg-hijau-zamrud px-5 py-4 text-sm font-bold text-putih-bersih transition-all duration-300 hover:bg-hijau-botol">
                      Booking Sekarang
                    </button>

                    <button className="rounded-2xl border border-sage/30 bg-putih-bersih px-5 py-4 text-sm font-bold text-dark-slate transition-all duration-300 hover:bg-mint-lembut">
                      Detail Kelas
                    </button>

                    <button className="rounded-2xl border border-soft-ochre/40 bg-cream px-5 py-4 text-sm font-bold text-terracotta transition-all duration-300 hover:bg-soft-ochre/20">
                      Simpan Jadwal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-[32px] border border-sage/20 bg-putih-bersih p-7 shadow-xl lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-soft-ochre/30 bg-cream px-4 py-2 text-xs font-bold text-terracotta">
            Booking Summary
          </div>

          <h3 className="mt-5 text-3xl font-black text-charcoal">
            Ringkasan Booking
          </h3>

          <div className="mt-8 space-y-5">
            <div className="rounded-3xl bg-mint-lembut p-5">
              <p className="text-sm font-semibold text-dark-slate/70">
                Kelas Dipilih
              </p>

              <h4 className="mt-2 text-xl font-black text-hijau-botol">
                Fullstack Web Development
              </h4>
            </div>

            <div className="rounded-3xl bg-cream p-5">
              <p className="text-sm font-semibold text-dark-slate/70">Jadwal</p>

              <h4 className="mt-2 text-lg font-black text-terracotta">
                Senin & Rabu • 19:00 WIB
              </h4>
            </div>

            <div className="rounded-3xl bg-champagne p-5">
              <p className="text-sm font-semibold text-dark-slate/70">
                Total Pembayaran
              </p>

              <h4 className="mt-2 text-3xl font-black text-olive">Gratis</h4>
            </div>
          </div>

          <button className="mt-8 w-full rounded-2xl bg-hijau-uin px-5 py-4 text-base font-bold text-putih-bersih transition-all duration-300 hover:bg-hijau-botol">
            Konfirmasi Booking
          </button>

          <p className="mt-5 text-center text-sm leading-6 text-dark-slate/60">
            Pastikan jadwal yang dipilih sudah sesuai sebelum melakukan
            konfirmasi booking kelas.
          </p>
        </div>
      </section>
    </div>
  );
}
