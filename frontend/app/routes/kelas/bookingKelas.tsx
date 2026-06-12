import { exampleApiData } from "~/example/exampleApiData";
import { RiCalendarView } from "@remixicon/react";

import { useEffect, useState } from "react";
import type { BookingDetail, CreateBookingRequest, CreateBookingResponse, Mentoring, MentoringListResponse } from "~/core/types";
import { Bookings, GetApiData, sendPostData } from "~/core/Conections";
// Import kedua helper API (GET dan POST) yang sudah kita buat sebelumnya
// Import interfaces akademik Anda

export default function BookingClassPage() {
  // State untuk menampung daftar kelas hasil fetch dari server
  const [mentoringList, setMentoringList] = useState<Mentoring[]>([]);
  // State untuk melacak data kelas yang sedang dipilih untuk masuk ke Ringkasan Booking (Sidebar)
  const [selectedClass, setSelectedClass] = useState<Mentoring | null>(null);
  
  // States untuk handling status server dan loading
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(true);
  const [isSubmittingId, setIsSubmittingId] = useState<number | null>(null);
  
  // States untuk handling error message (Fetch & Post)
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessData, setBookingSuccessData] = useState<BookingDetail | null>(null);

  // 1. Fetch data daftar kelas dari server saat halaman pertama kali dimuat
  useEffect(() => {
    async function loadMentoringClasses() {
      setIsFetchLoading(true);
      setFetchError(null);
      try {
        const response = await GetApiData<MentoringListResponse>(Bookings);
        if (response.status === "success") {
          setMentoringList(response.data);
        } else {
          setFetchError(response.message || "Gagal mengambil daftar kelas.");
        }
      } catch (error: any) {
        // Menangkap kondisi jika server tidak aktif / offline / rto
        setFetchError("Server tidak merespons. Silakan periksa koneksi internet Anda atau hubungi admin.");
      } finally {
        setIsFetchLoading(false);
      }
    }

    loadMentoringClasses();
  }, []);

  // 2. Handler untuk mengirim data booking (POST) ke server Laravel
  const handleProcessBooking = async (mentoringId: number) => {
    setIsSubmittingId(mentoringId);
    setBookingError(null);
    setBookingSuccessData(null);

    const payload: CreateBookingRequest = {
      mentoring_id: mentoringId,
    };

    try {
      const response = await sendPostData<CreateBookingResponse>(Bookings, payload);

      if (response.status === "success") {
        setBookingSuccessData(response.data);
        
        // Integrasi Midtrans Snap jika script terdeteksi
        if ((window as any).snap) {
          (window as any).snap.pay(response.data.snap_token, {
            onSuccess: () => alert("Pembayaran sukses!"),
            onPending: () => alert("Menunggu pembayaran."),
            onError: () => alert("Pembayaran gagal."),
            onClose: () => alert("Popup ditutup.")
          });
        } else {
          alert(`Booking Sukses! Order ID: ${response.data.order_id}`);
        }
      }
    } catch (error: any) {
      setBookingError(error.message || "Gagal terhubung ke server pembayaran Midtrans.");
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
      {/* Header */}
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
              <RiCalendarView size={20} /> Reservasi Kelas Mahasiswa
            </div>
            <h2 className="mt-6 text-5xl font-black leading-tight">
              Pesan Kelas <br /> dan Mulai <br /> Belajar Sekarang.
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">
        
        {/* KOLOM KIRI: Daftar Kelas dari Server */}
        <div className="space-y-7">
          {bookingError && (
            <div className="rounded-2xl border border-terracotta/20 bg-terracotta/10 p-4 text-sm font-semibold text-terracotta">
              Proses Gagal: {bookingError}
            </div>
          )}

          {bookingSuccessData && (
            <div className="rounded-2xl border border-hijau-zamrud/20 bg-mint-lembut p-4 text-sm font-semibold text-hijau-botol">
              ✅ Tiket Berhasil Dipesan! Order ID: <span className="font-mono">{bookingSuccessData.order_id}</span>
            </div>
          )}

          {/* KONDISI 1: Loading Saat Mengambil Data Server */}
          {isFetchLoading && (
            <div className="space-y-5">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-[32px] bg-putih-bersih p-8 h-56 border border-abu-perak" />
              ))}
            </div>
          )}

          {/* KONDISI 2: Server Tidak Aktif / Error Fetch (Komponen Data Kosong) */}
          {!isFetchLoading && fetchError && (
            <div className="rounded-xl border border-terracotta/30 bg-putih-bersih p-10 text-center shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-between rounded-full bg-terracotta/10 text-center text-3xl justify-center text-terracotta">
                📡
              </div>
              <h3 className="mt-5 text-xl font-bold text-charcoal">Koneksi Server Terputus</h3>
              <p className="mt-2 text-sm text-dark-slate/75 max-w-md mx-auto">
                {fetchError}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-hijau-botol px-5 py-2.5 text-sm font-bold text-putih-bersih hover:bg-hijau-uin transition-colors"
              >
                Muat Ulang Halaman
              </button>
            </div>
          )}

          {/* KONDISI 3: Server Aktif Tapi Data Memang Kosong */}
          {!isFetchLoading && !fetchError && mentoringList.length === 0 && (
            <div className="rounded-[32px] border border-sage/20 bg-putih-bersih p-10 text-center shadow-lg">
              <div className="text-4xl">📭</div>
              <h3 className="mt-4 text-lg font-bold text-charcoal">Belum Ada Jadwal Tersedia</h3>
              <p className="mt-1 text-sm text-dark-slate/70">
                Tidak ada kelas mentoring aktif yang dapat dipesan untuk saat ini.
              </p>
            </div>
          )}

          {/* KONDISI 4: Server Aktif & Data Berhasil Di-render */}
          {!isFetchLoading && !fetchError && mentoringList.map((item) => (
            <div
              key={item.id}
              className={`overflow-hidden rounded-[32px] border bg-putih-bersih shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                selectedClass?.id === item.id ? "border-hijau-zamrud ring-2 ring-hijau-zamrud/20" : "border-sage/20"
              }`}
            >
              <div className="grid lg:grid-cols-[280px_1fr]">
                {/* Visual Banner Kiri menggunakan warna statis bertema hijau botol */}
                <div className="relative overflow-hidden bg-gradient-to-br from-hijau-botol to-toska-tua p-8 text-putih-bersih">
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-putih-bersih/10 blur-2xl" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <span className="rounded-full bg-putih-bersih/10 border border-putih-bersih/20 px-3 py-1 text-xs font-bold">
                        ID: #{item.id}
                      </span>
                      <h3 className="mt-4 text-xl font-black leading-tight line-clamp-3">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-xs text-putih-bersih/60">Academic Mentoring Program</p>
                  </div>
                </div>

                {/* Info Detail Kanan */}
                <div className="p-8 flex flex-col justify-between">
                  <div className="rounded-3xl bg-mint-lembut p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-dark-slate/60">Biaya Investasi</p>
                    <h4 className="mt-2 text-2xl font-black text-hijau-botol">
                      {formatRupiah(item.price)}
                    </h4>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => setSelectedClass(item)}
                      className="rounded-2xl bg-hijau-zamrud px-5 py-3.5 text-sm font-bold text-putih-bersih transition-all duration-300 hover:bg-hijau-botol"
                    >
                      Pilih Kelas
                    </button>

                    <button
                      disabled={isSubmittingId !== null}
                      onClick={() => handleProcessBooking(item.id)}
                      className="rounded-2xl border border-sage/30 bg-putih-bersih px-5 py-3.5 text-sm font-bold text-dark-slate transition-all duration-300 hover:bg-mint-lembut disabled:opacity-40"
                    >
                      {isSubmittingId === item.id ? "Memproses..." : "Instant Booking"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* KOLOM KANAN: Sticky Summary Widget */}
        <div className="h-fit rounded-[32px] border border-sage/20 bg-putih-bersih p-7 shadow-xl lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-soft-ochre/30 bg-cream px-4 py-2 text-xs font-bold text-terracotta">
            Booking Summary
          </div>

          <h3 className="mt-5 text-3xl font-black text-charcoal">
            Ringkasan Booking
          </h3>

          {selectedClass ? (
            <>
              <div className="mt-8 space-y-5">
                <div className="rounded-3xl bg-mint-lembut p-5">
                  <p className="text-sm font-semibold text-dark-slate/70">Kelas Dipilih</p>
                  <h4 className="mt-2 text-lg font-black text-hijau-botol">
                    {selectedClass.title}
                  </h4>
                </div>

                <div className="rounded-3xl bg-champagne p-5">
                  <p className="text-sm font-semibold text-dark-slate/70">Total Pembayaran</p>
                  <h4 className="mt-2 text-2xl font-black text-olive">
                    {formatRupiah(selectedClass.price)}
                  </h4>
                </div>
              </div>

              <button
                disabled={isSubmittingId !== null}
                onClick={() => handleProcessBooking(selectedClass.id)}
                className="mt-8 w-full rounded-2xl bg-hijau-uin px-5 py-4 text-base font-bold text-putih-bersih transition-all duration-300 hover:bg-hijau-botol disabled:bg-abu-perak"
              >
                {isSubmittingId === selectedClass.id ? "Menghubungkan..." : "Konfirmasi Booking"}
              </button>
            </>
          ) : (
            <div className="my-12 text-center text-dark-slate/50">
              <p className="text-sm">Silakan pilih salah satu kelas di sebelah kiri untuk meninjau detail checkout.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
