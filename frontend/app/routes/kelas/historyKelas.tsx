import { useState } from "react";
// import { exampleApiData } from "../../example/exampleApiData";

export default function ClassHistoryPage() {
  return (
    <div className="min-h-screen bg-mint-lembut">
      <header className="sticky top-0 z-50 border-b border-sage/20 bg-putih-bersih/80 backdrop-blur-xl">
        <div className="mx-auto   flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-mint-lembut px-3 py-1 text-xs font-bold text-hijau-botol">
              Learning Activity History
            </div>

            <h1 className="mt-3 text-3xl font-black text-charcoal">
              Riwayat Kelas Saya
            </h1>
          </div>

          <button className="rounded-2xl bg-hijau-uin px-5 py-3 text-sm font-bold text-putih-bersih shadow-lg shadow-hijau-uin/20 transition-all duration-300 hover:bg-hijau-botol">
            Download Sertifikat
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-hijau-botol via-hijau-uin to-deep-teal px-6 py-16 text-putih-bersih lg:px-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-kuning-emas/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-soft-ochre/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              📚 Aktivitas Pembelajaran Mahasiswa
            </div>

            <h2 className="mt-6 text-5xl font-black leading-tight">
              Pantau Progress
              <br />
              dan Riwayat
              <br />
              Pembelajaranmu.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-putih-bersih/80">
              Lihat seluruh kelas yang pernah diikuti, status pembelajaran,
              progress pelatihan, dan pencapaian akademik Anda.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">
            Total Kelas
          </p>
          <h3 className="mt-3 text-4xl font-black text-hijau-botol">12</h3>
        </div>

        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">
            Kelas Selesai
          </p>
          <h3 className="mt-3 text-4xl font-black text-deep-teal">8</h3>
        </div>

        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">Sertifikat</p>
          <h3 className="mt-3 text-4xl font-black text-terracotta">6</h3>
        </div>

        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">
            Rata-rata Nilai
          </p>
          <h3 className="mt-3 text-4xl font-black text-olive">A</h3>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
        <div className="rounded-[32px] border border-sage/20 bg-putih-bersih p-5 shadow-lg">
          <div className="grid gap-4 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Cari riwayat kelas..."
              className="rounded-2xl border border-sage/30 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
            />

            <select className="rounded-2xl border border-sage/30 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20">
              <option>Semua Status</option>
              <option>Selesai</option>
              <option>Berjalan</option>
              <option>Dibatalkan</option>
            </select>

            <select className="rounded-2xl border border-sage/30 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20">
              <option>Semua Tahun</option>
              <option>2026</option>
              <option>2025</option>
            </select>

            <button className="rounded-2xl bg-hijau-zamrud px-5 py-4 font-bold text-putih-bersih transition-all duration-300 hover:bg-hijau-botol">
              Filter Data
            </button>
          </div>
        </div>
      </section>

      {/* History List */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="space-y-6"></div>
      </section>
    </div>
  );
}
