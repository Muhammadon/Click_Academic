import { RiArrowLeftLine } from "@remixicon/react"
import type { Mentoring } from "~/core/types";

interface CardKelasProps {
  item: Mentoring;
}


import { RiCalendarEventLine, RiTimeLine } from "@remixicon/react";
import { useState } from "react";
import { NavLink, redirect } from "react-router";

// Definisikan props agar TypeScript membaca tipe data dengan benar
interface CardKelasProps {
  item: Mentoring;
}

export const CardKelas = ({ item }: CardKelasProps) => {

  // 1. Format Harga ke Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Format Tanggal (Contoh: 15 Juni 2026)
  const formatTanggal = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // 3. Format Jam (Contoh: 13:00)
  const formatJam = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(".", ":");
  };

  // 4. Cek apakah kelas penuh
  const isFull = item.status === "full";



  return (
    <div className="group overflow-hidden rounded-[32px] border border-hijau-zamrud/10 bg-putih-bersih shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className={`relative h-48 overflow-hidden bg-gradient-to-br p-6 text-putih-bersih ${isFull ? "from-dark-slate/80 to-charcoal" : "from-hijau-uin to-hijau-botol"
        }`}>
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-putih-bersih/10 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            {/* Status Badge */}
            <span className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm border ${isFull
              ? "bg-terracotta/20 border-terracotta/40 text-rose-300"
              : "bg-putih-bersih/10 border-putih-bersih/20 text-putih-bersih"
              }`}>
              {isFull ? "Kelas Penuh" : "Tersedia"}
            </span>

            {/* Label Harga */}
            <span className="rounded-full bg-kuning-emas px-3 py-1 text-xs font-black text-charcoal shadow-sm">
              {item.price === 0 ? "GRATIS" : formatRupiah(item.price)}
            </span>
          </div>

          <div>
            {/* Judul Mentoring dari Database */}
            <h3 className="line-clamp-2 text-2xl font-black leading-tight tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-1 text-xs text-putih-bersih/70">
              {item.description || "Tidak ada deskripsi tambahan untuk sesi bimbingan ini."}
            </p>
          </div>
        </div>
      </div>

      {/* Bagian Bawah Card (Konten Detail) */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3">

          {/* Info Tanggal */}
          <div className="rounded-2xl bg-mint-lembut/30 border border-mint-lembut p-3 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-dark-slate/60">
              <RiCalendarEventLine size={14} className="text-hijau-zamrud" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Tanggal</span>
            </div>
            <p className="mt-1 text-sm font-bold text-hijau-botol truncate">
              {formatTanggal(item.start_time)}
            </p>
          </div>

          <div className="rounded-2xl bg-cream/40 border border-cream p-3 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-dark-slate/60">
              <RiTimeLine size={14} className="text-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Waktu (WIB)</span>
            </div>
            <p className="mt-1 text-sm font-bold text-charcoal">
              {formatJam(item.start_time)} - {formatJam(item.end_time)}
            </p>
          </div>

        </div>

        {/* Tombol Aksi */}
        <NavLink
          to={`/kelas/detail/${item.id}`} // Sesuaikan dengan jalur URL halaman booking Anda
          onClick={(e) => {
            if (isFull) {
              e.preventDefault(); // Mencegah navigasi / klik jika kelas sudah penuh
            }
          }}
          className={`mt-6 flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-base font-bold text-putih-bersih transition-all duration-300 ${isFull
            ? "bg-dark-slate/30 text-dark-slate/50 cursor-not-allowed border border-dark-slate/10 pointer-events-none"
            : "bg-hijau-uin hover:bg-hijau-botol shadow-md hover:shadow-lg"
            }`}
        >
          {isFull ? "Pendaftaran Ditutup" : "Daftar Sekarang"}
          {!isFull && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
