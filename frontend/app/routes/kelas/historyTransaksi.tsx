//  TRANSAKSI DARI BOOKING DI BACKEND

import { RiArrowLeftLine, RiCalendarEventLine, RiCalendarView, RiCheckboxCircleLine, RiCloseCircleLine, RiExternalLinkLine, RiFileList3Line, RiSecurePaymentLine, RiTimeLine } from "@remixicon/react"
;

import { useEffect, useState } from "react";
import type {
    Booking,
    BookingHistoryItem,
  Mentoring,
} from "~/core/types";
import { GetApiData, sendPostData,  Mentorings, SignIn, BookingHistory } from "~/core/Conections";
import { useNavigate, useParams } from "react-router";
import CardMentoring from "~/component/cardMentoring";
import { StatusComponent } from "~/component/infoComponents";


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
  const [message, setMessage] = useState<string | null>(null);
  const [mentoringsList, setMentoringsList] = useState<Booking[]>([]);
  const [isSubmittingId, setIsSubmittingId] = useState<number | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);

  // . PINDAHKAN FUNGSI AMBIL DATA KE LUAR AGAR BISA DIPANGGIL ULANG KAPAN SAJA
  const loadMentoringData = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
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
      }

      const options: RequestInit = {
        method: "GET",
        headers: headers,
      };

      const response = await GetApiData<BookingHistoryItem>(BookingHistory, options);

      if (response.status === "success") {
        setIsSuccess(true);
        setMentoringsList(response.data || []);
      } else {
        setIsSuccess(false);
        setMessage(response.message || "Gagal memuat list kelas bimbingan.");
      }
    } catch (error: any) {
      setIsSuccess(false);
      setMessage(error.message || "Terjadi kendala autentikasi.");
    } finally {
      setIsLoading(false);
    }
  };

  // . EFFECT UTAMA SEKARANG TINGGAL MEMANGGIL FUNGSI DI ATAS
  useEffect(() => {
    loadMentoringData();
  }, [bookingSuccessData, BookingHistory]); 

 const handlePayAgain = (snapToken: string) => {
  // 1. Set loading menjadi true saat pop-up mulai disiapkan
  setIsLoading(true);
  setMessage(null);

  if ((window as any).snap) {
    (window as any).snap.pay(snapToken, {
      onSuccess: (result: any) => {
        console.info("Pembayaran sukses via pop-up:", result);
        
        setIsSuccess(true);
        setMessage("Selamat! Pembayaran Anda berhasil diverifikasi oleh sistem.");
        // Ambil data terbaru dari backend agar list berpindah ke section "Berhasil"
        loadMentoringData(); 
      },
      onPending: (result: any) => {
        console.info("Menunggu pembayaran:", result);
        setIsSuccess(true); // true karena proses pemicuan transaksi VA berhasil terbentuk
        setMessage("Instruksi pembayaran telah dibuat. Silakan selesaikan di aplikasi bank Anda.");
        
        loadMentoringData();
      },
      onError: (err: any) => {
        console.error("Gagal bayar:", err);
        setIsSuccess(false);
        setMessage("Terjadi kesalahan pada gerbang pembayaran. Silakan coba beberapa saat lagi.");
        setIsLoading(false);
      },
      onClose: () => {
        //Jika user hanya menutup pop-up tanpa menyelesaikan pembayaran
        setIsLoading(false);
      }
    });
  } else {
    setIsSuccess(false);
    setIsLoading(false);
    setMessage("SDK Midtrans Snap gagal dimuat. Silakan muat ulang halaman browser Anda.");
  }
};
  // Fungsi pembantu lainnya
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-sage/30 bg-white text-dark-slate hover:bg-mint-lembut transition-all"
          >
            <RiArrowLeftLine size={20} />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-mint-lembut px-3 py-1 text-xs font-bold text-hijau-botol">
              Riwayat Pendaftaran Kelas
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="#pending"
            className="rounded-xl border border-amber-500/30 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-all"
          >
            Menunggu
          </a>
          <a
            href="#paid"
            className="rounded-xl border border-emerald-500/30 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all"
          >
            Berhasil
          </a>
          <a
            href="#failed"
            className="rounded-xl border border-rose-500/30 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all"
          >
            Gagal
          </a>
        </div>
      </div>
    </header>

    <StatusComponent isSuccess={isSuccess} message={message ? message : ""} />

    {/* MAIN CONTENT AREA */}
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 mt-6 space-y-12">
      
      {/* 1. SECTION MENUNGGU PEMBAYARAN (PENDING) */}
      <section id="pending" className="scroll-mt-24 pt-6 border-t border-sage/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-black text-amber-600 flex items-center gap-2">
              <RiTimeLine size={22} /> Menunggu Pembayaran
            </h3>
            <p className="text-xs text-dark-slate/50 mt-1">Selesaikan pembayaran sebelum batas waktu transaksi kedaluwarsa.</p>
          </div>
          <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {mentoringsList.filter(k => k.status === 'pending').length} Transaksi
          </span>
        </div>

        {isLoading ? (
          <SkeletonLoading />
        ) : mentoringsList.filter(k => k.status === 'pending').length === 0 ? (
          <EmptyState message="Tidak ada transaksi yang sedang menunggu pembayaran." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.filter(k => k.status === 'pending').map((booking) => (
              <div key={booking.id} className="border border-amber-200 bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                      <RiFileList3Line size={14} /> ID Mentoring: #{booking.mentoring_id}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      Pending
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-base mb-1">Order ID: {booking.order_id}</h4>
                  {booking.created_at && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                      <RiCalendarEventLine size={14} /> Waktu Daftar: {new Date(booking.created_at).toLocaleString("id-ID")}
                    </p>
                  )}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => handlePayAgain(booking.snap_token)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <RiSecurePaymentLine size={16} /> Bayar Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. SECTION BERHASIL (PAID) */}
      <section id="paid" className="scroll-mt-24 pt-6 border-t border-sage/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-black text-emerald-600 flex items-center gap-2">
              <RiCheckboxCircleLine size={22} /> Pembayaran Berhasil
            </h3>
            <p className="text-xs text-dark-slate/50 mt-1">Akses bimbingan Anda telah aktif dan siap digunakan.</p>
          </div>
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {mentoringsList.filter(k => k.status === 'paid').length} Transaksi
          </span>
        </div>

        {isLoading ? (
          <SkeletonLoading />
        ) : mentoringsList.filter(k => k.status === 'paid').length === 0 ? (
          <EmptyState message="Belum ada transaksi sukses." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.filter(k => k.status === 'paid').map((booking) => (
              <div key={booking.id} className="border border-emerald-100 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                    <RiFileList3Line size={14} /> ID Mentoring: #{booking.mentoring_id}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Paid
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 text-base mb-1">Order ID: {booking.order_id}</h4>
                {booking.created_at && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                    <RiCalendarEventLine size={14} /> Waktu Bayar: {new Date(booking.created_at).toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. SECTION GAGAL / EXPIRED (FAILED) */}
      <section id="failed" className="scroll-mt-24 pt-6 border-t border-sage/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-black text-rose-600 flex items-center gap-2">
              <RiCloseCircleLine size={22} /> Transaksi Gagal / Batal
            </h3>
            <p className="text-xs text-dark-slate/50 mt-1">Daftar transaksi yang kedaluwarsa, ditolak, atau dibatalkan.</p>
          </div>
          <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {mentoringsList.filter(k => k.status === 'failed').length} Transaksi
          </span>
        </div>

        {isLoading ? (
          <SkeletonLoading />
        ) : mentoringsList.filter(k => k.status === 'failed').length === 0 ? (
          <EmptyState message="Tidak ada transaksi gagal." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.filter(k => k.status === 'failed').map((booking) => (
              <div key={booking.id} className="border border-rose-100 bg-white rounded-2xl p-5 shadow-sm opacity-75 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                    <RiFileList3Line size={14} /> ID Mentoring: #{booking.mentoring_id}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Failed
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 text-base mb-1">Order ID: {booking.order_id}</h4>
                {booking.created_at && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                    <RiCalendarEventLine size={14} /> Tanggal Sistem: {new Date(booking.created_at).toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  </div>
);}
