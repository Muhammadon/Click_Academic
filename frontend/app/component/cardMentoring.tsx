import { RiArrowRightUpLine, RiCalendarLine, RiRefund2Line, RiTimeLine } from "@remixicon/react";
import type { Mentoring } from "~/core/types";

interface CardMentoringProps {
  item: Mentoring;
  onViewDetail?: (id: number) => void; // Fungsi opsional jika card diklik untuk melihat detail ruang bimbingan
}

const CardMentoring = ({ item, onViewDetail }: CardMentoringProps) => {

  // Format Mata Uang Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Format Tanggal Singkat (Contoh: 15 Jun 2026)
  const formatTanggalSingkat = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format Jam Menit (Contoh: 09:00)
  const formatJam = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(".", ":");
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-sage/20 bg-putih-bersih p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      {/* Batang Dekoratif Hijau di Sisi Kiri Card */}
      <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-hijau-uin to-hijau-botol" />

      <div className="pl-2 flex flex-col justify-between h-full">

        {/* Baris Atas: ID & Label Investasi */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-dark-slate/40">
            ID KELAS: #{item.id}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-hijau-botol bg-mint-lembut/60 px-2.5 py-1 rounded-lg">
            <RiRefund2Line size={12} />
            {item.price === 0 ? "Gratis" : formatRupiah(item.price)}
          </span>
        </div>

        {/* Baris Tengah: Judul & Deskripsi */}
        <div className="mt-3">
          <h4 className="text-base font-black text-charcoal line-clamp-1 group-hover:text-hijau-uin transition-colors">
            {item.title}
          </h4>
          <p className="mt-1 text-xs text-dark-slate/60 line-clamp-2 leading-relaxed">
            {item.description || "Tidak ada deskripsi tambahan untuk kelas bimbingan akademik ini."}
          </p>
        </div>

        {/* Garis Pembatas Halus */}
        <div className="my-4 border-t border-sage/10" />

        {/* Baris Bawah: Jadwal Waktu & Tombol Akses */}
        <div className="flex items-center justify-between gap-2">

          {/* Kelompok Informasi Jadwal */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {/* Tanggal */}
            <div className="flex items-center gap-1 text-dark-slate/70">
              <RiCalendarLine size={13} className="text-hijau-zamrud" />
              <span className="text-xs font-medium">{formatTanggalSingkat(item.start_time)}</span>
            </div>

            {/* Jam */}
            <div className="flex items-center gap-1 text-dark-slate/70">
              <RiTimeLine size={13} className="text-terracotta" />
              <span className="text-xs font-medium">
                {formatJam(item.start_time)} - {formatJam(item.end_time)} WIB
              </span>
            </div>
          </div>

          {/* Tombol Akses Masuk */}
          <button
            onClick={() => onViewDetail && onViewDetail(item.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream border border-soft-ochre/20 text-terracotta transition-all duration-300 hover:bg-hijau-uin hover:text-white"
            title="Masuk Kelas"
          >
            <RiArrowRightUpLine size={16} />
          </button>

        </div>

      </div>
    </div>
  );
};




export default CardMentoring;
