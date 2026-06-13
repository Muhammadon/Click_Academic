import { RiArrowLeftLine, RiCalendarView, RiExternalLinkLine } from "@remixicon/react";

import { useEffect, useState } from "react";
import type {
  Booking,
  BookingHistoryType,
  Mentoring,
} from "~/core/types";
import { GetApiData, sendPostData,  Mentorings, SignIn, BookingHistory } from "~/core/Conections";
import { useNavigate, useParams } from "react-router";
import CardMentoring from "~/component/cardMentoring";



export default function HistoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State Array Utama Mentoring dari Respons Tunggal BookingCon
  const [mentoringsList, setMentoringsList] = useState<Mentoring[]>([]);

  // Status Loading & Interaksi
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(true);
  const [isSubmittingId, setIsSubmittingId] = useState<number | null>(null);

  // States Penanganan Pesan
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);
  // SINGLE EFFECT: Ambil Data Koleksi Menggunakan Struktur BookingsResponse
  // EFFECT: Ambil Data Menggunakan Opsi Authorization Token Bearer
  useEffect(() => {
  async function loadMentoringData() {
    setIsFetchLoading(true);
    setFetchError(null);
    try {
      // 1. Ambil token mentah dari localStorage
      const rawToken = localStorage.getItem("user_token");
      let token = "";

      // 2. Lakukan parsing aman
      if (rawToken) {
        try {
          token = JSON.parse(rawToken);
        } catch {
          token = rawToken; 
        }
      }

      // 3. Bangun headers secara dinamis
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      // KUNCI PERBAIKAN: Hanya masukkan Authorization jika token valid/ada isinya
      if (token && token.trim() !== "") {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        console.warn("Peringatan: Token kosong atau tidak ditemukan di localStorage.");
      }

      // 4. Konfigurasi opsi RequestInit untuk Fetch
      const options: RequestInit = {
        method: "GET",
        headers: headers, // Gunakan objek headers dinamis di sini
      };

      console.info("Endpoint Log dengan Auth:", BookingHistory);

      const response = await GetApiData<BookingHistoryType>(BookingHistory, options);

      if (response.status === "success") {
        setMentoringsList(response.mentorings || []);
      } else {
        setFetchError(response.message || "Gagal memuat list kelas bimbingan.");
      }
    } catch (error: any) {
      console.error("Gagal mengambil histori pendaftaran:", error);
      setFetchError(error.message || "Terjadi kendala autentikasi atau koneksi dengan server.");
    } finally {
      setIsFetchLoading(false);
    }
  }

  loadMentoringData();
}, [bookingSuccessData, BookingHistory]); 
  // JALUR PENCARIAN DATA: Cari 1 Data Spesifik dari Array Berdasarkan Parameter URL ID
  const selectedMentoring = mentoringsList.find(
    (item) => item.id === Number(id)
  );

  // Handler Kirim Transaksi ke Midtrans
  const handleProcessBooking = async (mentoringId: number) => {
    setIsSubmittingId(mentoringId);
    setBookingError(null);
    setBookingSuccessData(null);

    try {
      const response = await sendPostData<any>("bookings", { mentoring_id: mentoringId });
      if (response.status === "success") {
        setBookingSuccessData(response.data);

        if ((window as any).snap) {
          (window as any).snap.pay(response.data.snap_token, {
            onSuccess: () => navigate("/user/payment/history?status=success"),
            onPending: () => navigate("/user/payment/history?status=pending"),
            onError: () => setBookingError("Pembayaran gagal diproses oleh Midtrans."),
            onClose: () => alert("Anda menutup jendela sebelum menyelesaikan pembayaran."),
          });
        } else {
          alert(`Booking Sukses! Order ID: ${response.data.order_id}`);
        }
      }
    } catch (error: any) {
      setBookingError(error.message || "Gagal terhubung ke server Midtrans.");
    } finally {
      setIsSubmittingId(null);
    }
  };

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
              <h1 className="mt-1 text-2xl font-black text-charcoal">Konfirmasi Tiket</h1>
            </div>
          </div>
          <a
            href="#histori-bimbingan"
            className="rounded-2xl bg-hijau-uin px-5 py-3 text-sm font-bold text-putih-bersih shadow-lg hover:bg-hijau-botol"
          >
            Riwayat Kelas
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-hijau-botol via-hijau-uin to-deep-teal px-6 py-12 text-putih-bersih lg:px-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-kuning-emas/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-4 py-2 text-sm font-medium">
              <RiCalendarView size={20} /> Checkout Satu Tempat Kelas Privat
            </div>
            <h2 className="mt-4 text-4xl font-black leading-tight">
              Satu Langkah Lagi <br /> Untuk Memulai Kelas Anda.
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">

        {/* KOLOM KIRI: Detail Checkout Item Spesifik */}
        <div className="space-y-7">
          {bookingError && (
            <div className="rounded-2xl border border-terracotta/20 bg-terracotta/10 p-4 text-sm font-semibold text-terracotta">
              Proses Gagal: {bookingError}
            </div>
          )}

          {bookingSuccessData && (
            <div className="rounded-2xl border border-hijau-zamrud/20 bg-mint-lembut p-4 text-sm font-semibold text-hijau-botol">
              ✅ Tiket Berhasil Dipesan! Order ID: <span className="font-mono font-bold">{bookingSuccessData.order_id}</span>
            </div>
          )}

          {isFetchLoading && (
            <div className="animate-pulse rounded-[32px] bg-putih-bersih p-8 h-56 border border-abu-perak" />
          )}

          {!isFetchLoading && (fetchError || !selectedMentoring) && (
            <div className="rounded-[32px] border border-terracotta/20 bg-putih-bersih p-12 text-center shadow-xl">
              <h3 className="text-2xl font-black text-charcoal">Kelas Tidak Ditemukan</h3>
              <p className="mt-3 text-sm text-dark-slate/70">
                {fetchError || `Kelas bimbingan dengan ID #${id} tidak tersedia di dalam riwayat pendaftaran.`}
              </p>
            </div>
          )}

          {/* Render Aman menggunakan data hasil pencarian .find() */}
          {!isFetchLoading && selectedMentoring && (
            <div className="overflow-hidden rounded-[32px] border border-hijau-zamrud/10 bg-putih-bersih shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
                <div className="bg-gradient-to-br from-hijau-botol to-deep-teal p-8 text-putih-bersih flex flex-col justify-between">
                  <span className="rounded-full bg-putih-bersih/10 border border-putih-bersih/20 px-3 py-1 text-xs font-bold w-fit">
                    ID: #{selectedMentoring.id}
                  </span>
                  <h3 className="mt-4 text-2xl font-black leading-tight">{selectedMentoring.title}</h3>
                  <p className="mt-6 text-xs text-putih-bersih/60">Status: <span className="text-kuning-emas font-bold capitalize">{selectedMentoring.status}</span></p>
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <p className="text-sm text-dark-slate/80">{selectedMentoring.description || "Tidak ada deskripsi rincian."}</p>
                  <div className="mt-8 rounded-2xl bg-mint-lembut/40 border border-mint-lembut p-5">
                    <h4 className="text-3xl font-black text-hijau-botol">{formatRupiah(selectedMentoring.price)}</h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: Ringkasan Summary Berdasarkan Kelas Terpilih */}
        <div className="h-fit rounded-[32px] border border-sage/20 bg-putih-bersih p-7 shadow-xl lg:sticky lg:top-28">
          <h3 className="text-2xl font-black text-charcoal">Ringkasan Booking</h3>
          {!isFetchLoading && selectedMentoring ? (
            <>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-mint-lembut p-5">
                  <h4 className="text-base font-bold text-hijau-botol line-clamp-2">{selectedMentoring.title}</h4>
                </div>
                <div className="rounded-3xl bg-champagne p-5">
                  <h4 className="text-2xl font-black text-olive">{formatRupiah(selectedMentoring.price)}</h4>
                </div>
              </div>
              <button
                disabled={isSubmittingId !== null || selectedMentoring.status === "full"}
                onClick={() => handleProcessBooking(selectedMentoring.id)}
                className="mt-8 w-full rounded-2xl bg-hijau-uin px-5 py-4 text-base font-bold text-putih-bersih transition-all hover:bg-hijau-botol shadow-md"
              >
                {isSubmittingId === selectedMentoring.id ? "Menghubungkan Midtrans..." : selectedMentoring.status === "full" ? "Kelas Penuh" : "Konfirmasi & Bayar"}
              </button>
            </>
          ) : (
            <div className="my-12 text-center text-dark-slate/40 text-xs">Menunggu data kelas...</div>
          )}
        </div>
      </section>

      {/* SEKSI HISTORI JADWAL USER (Menampilkan Semua Item dari Array yang Sama) */}
      <section id="histori-bimbingan" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 border-t border-sage/10 mt-6 pt-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-black text-charcoal">Jadwal Bimbingan Saya</h3>
            <p className="text-xs text-dark-slate/50 mt-1">Daftar seluruh kelas bimbingan aktif milik Anda yang ditarik dari sistem.</p>
          </div>
          <span className="bg-hijau-botol text-white text-xs font-bold px-3 py-1 rounded-full">
            {mentoringsList.length} Kelas
          </span>
        </div>

        {isFetchLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-white animate-pulse rounded-2xl" />
            <div className="h-24 bg-white animate-pulse rounded-2xl" />
          </div>
        ) : mentoringsList.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-sage/30 rounded-3xl bg-white text-dark-slate/40 text-sm">
            📭 Anda belum memiliki riwayat pendaftaran kelas bimbingan aktif.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.map((kelas) => (
              <CardMentoring
                key={kelas.id}
                item={kelas}
                onViewDetail={(id) => navigate(`/kelas/booking/${id}`)} // Diarahkan kembali ke id tersebut untuk diperbarui di panel atas
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
