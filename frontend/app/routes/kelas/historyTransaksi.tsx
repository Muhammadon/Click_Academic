import { RiArrowLeftLine, RiCalendarView, RiExternalLinkLine } from "@remixicon/react";

import { useEffect, useState } from "react";
import type {
    Booking,
    BookingHistoryItem,
  Mentoring,
} from "~/core/types";
import { GetApiData, sendPostData,  Mentorings, SignIn, BookingHistory } from "~/core/Conections";
import { useNavigate, useParams } from "react-router";
import CardMentoring from "~/component/cardMentoring";
import StatusComponent from "~/component/infoComponents";


// Sub-komponen Loading Animasi
const SkeletonLoading = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="h-24 bg-white animate-pulse rounded-2xl" />
    <div className="h-24 bg-white animate-pulse rounded-2xl" />
  </div>
);

// Sub-komponen State Kosong
const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-8 border border-dashed border-sage/30 rounded-3xl bg-white text-dark-slate/40 text-xs">
    📭 {message}
  </div>
);

export default function HistoryTransaksiPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string | null >(null);
  // State Array Utama Mentoring dari Respons Tunggal BookingCon
  const [mentoringsList, setMentoringsList] = useState<Booking[]>([]);

  // Status Loading & Interaksi
  const [isSubmittingId, setIsSubmittingId] = useState<number | null>(null);

  // States Penanganan Pesan
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);
  // SINGLE EFFECT: Ambil Data Koleksi Menggunakan Struktur BookingsResponse
  useEffect(() => {
  async function loadMentoringData() {
    setIsLoading(true);
    setMessage(null);
    try {
      // Ambil token mentah dari localStorage
      const rawToken = localStorage.getItem("user_token");
      let token = "";

      if (rawToken) {
        try {
          token = JSON.parse(rawToken);
        } catch {
          token = rawToken; 
        }
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      if (token && token.trim() !== "") {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        console.warn("Peringatan: Token kosong atau tidak ditemukan di localStorage.");
      }

      const options: RequestInit = {
        method: "GET",
        headers: headers, // Gunakan objek headers dinamis di sini
      };

      console.info("Endpoint Log dengan Auth:", BookingHistory);

      const response = await GetApiData<BookingHistoryItem>(BookingHistory, options);

      if (response.status === "success") {
        setIsSuccess(true);
        console.info("response history : ",response.data)
        setMentoringsList(response.data || []);
      } else {
        setIsSuccess(false);
        setMessage(response.message || "Gagal memuat list kelas bimbingan.");
      }
    } catch (error: any) {
        setIsSuccess(false);
      console.error("Gagal mengambil histori pendaftaran:", error);
      setMessage(error.message || "Terjadi kendala autentikasi atau koneksi dengan server.");
    } finally {
      setIsLoading(false);

    }
  }

  loadMentoringData();
}, [bookingSuccessData, BookingHistory]); 
    const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

return (
  <div className="min-h-screen bg-mint-lembut">
    {/* Header Navigasi */}
    <header className="sticky top-0 z-50 border-b border-sage/20 bg-putih-bersih/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/kelas")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-sage/30 bg-white text-dark-slate hover:bg-mint-lembut"
          >
            <RiArrowLeftLine size={20} />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-mint-lembut px-3 py-1 text-xs font-bold text-hijau-botol">
              Detail Reservation Checkout
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="#pending"
            className="rounded-xl border border-amber-500/30 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100"
          >
            Menunggu
          </a>
          <a
            href="#paid"
            className="rounded-xl border border-emerald-500/30 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            Berhasil
          </a>
          <a
            href="#failed"
            className="rounded-xl border border-rose-500/30 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
          >
            Gagal
          </a>
        </div>
      </div>
    </header>

    {/* Status Pembayaran Terakhir */}
    <StatusComponent isSuccess={isSuccess} message={message ? message : ""} />

    {/* MAIN CONTENT AREA */}
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 mt-6 space-y-12">
      
      {/* 1. SECTION MENUNGGU PEMBAYARAN (PENDING) */}
      <section id="pending" className="scroll-mt-24 pt-6 border-t border-sage/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-black text-amber-600 flex items-center gap-2">
              ⏳ Menunggu Pembayaran
            </h3>
            <p className="text-xs text-dark-slate/50 mt-1">Selesaikan pembayaran Paylater/Transfer sebelum batas waktu habis.</p>
          </div>
          <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {mentoringsList.filter(k => k.status === 'pending').length} Kelas
          </span>
        </div>

        {isLoading ? (
          <SkeletonLoading />
        ) : mentoringsList.filter(k => k.status === 'pending').length === 0 ? (
          <EmptyState message="Tidak ada transaksi yang sedang menunggu pembayaran." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.filter(k => k.status === 'pending').map((kelas) => (
              <CardMentoring
                key={kelas.id}
                item={kelas}
                onViewDetail={(id) => navigate(`/kelas/booking/${id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2. SECTION BERHASIL (PAID) */}
      <section id="paid" className="scroll-mt-24 pt-6 border-t border-sage/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-black text-emerald-600 flex items-center gap-2">
              ✅ Pembayaran Berhasil
            </h3>
            <p className="text-xs text-dark-slate/50 mt-1">Daftar kelas bimbingan aktif yang siap Anda ikuti.</p>
          </div>
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {mentoringsList.filter(k => k.status === 'paid').length} Kelas
          </span>
        </div>

        {isLoading ? (
          <SkeletonLoading />
        ) : mentoringsList.filter(k => k.status === 'paid').length === 0 ? (
          <EmptyState message="Belum ada transaksi sukses." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.filter(k => k.status === 'paid').map((kelas) => (
              <CardMentoring
                key={kelas.id}
                item={kelas}
                onViewDetail={(id) => navigate(`/kelas/booking/${id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. SECTION GAGAL / EXPIRED (FAILED) */}
      <section id="failed" className="scroll-mt-24 pt-6 border-t border-sage/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-black text-rose-600 flex items-center gap-2">
              ❌ Transaksi Gagal / Batal
            </h3>
            <p className="text-xs text-dark-slate/50 mt-1">Daftar riwayat transaksi yang kedaluwarsa atau ditolak.</p>
          </div>
          <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {mentoringsList.filter(k => k.status === 'failed').length} Kelas
          </span>
        </div>

        {isLoading ? (
          <SkeletonLoading />
        ) : mentoringsList.filter(k => k.status === 'failed').length === 0 ? (
          <EmptyState message="Tidak ada transaksi gagal." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.filter(k => k.status === 'failed').map((kelas) => (
              <CardMentoring
                key={kelas.id}
                item={kelas}
                onViewDetail={(id) => navigate(`/kelas/booking/${id}`)}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  </div>
);}
