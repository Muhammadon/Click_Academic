import { useState, useEffect } from "react";
import {
  RiArrowLeftLine,
  RiTimeLine,
  RiCalendarEventLine,
  RiSecurePaymentLine,
  RiInformationLine
} from "@remixicon/react";
import type { CreateBookingResponse, DetailMentoringResponse, Mentoring } from "~/core/types";
import { BookingCreate, GetApiData, Mentorings, sendPostData } from "~/core/Conections";
import { useNavigate, useParams } from "react-router";

export default function DetailBooking() {
  const { id } = useParams<{ id: string }>();
  console.info("is : ", id)
  const navigate = useNavigate();

  // State Manajemen Data & Status Server
  const [mentoring, setMentoring] = useState<Mentoring | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string | null>(null);

 useEffect(() => {
  async function fetchDetailMentoring() {
    if (!id) {
      setErrorText("Tautan tidak valid. ID Kelas bimbingan tidak ditemukan.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorText(null);

    try {
      // 1. Ambil token mentah dari localStorage
      const rawToken = localStorage.getItem("user_token");
      let token = "";

      // 2. Bersihkan token dari tanda kutip hasil stringify jika ada
      if (rawToken) {
        try {
          token = JSON.parse(rawToken);
        } catch {
          token = rawToken; // Fallback jika ternyata yang disimpan string biasa
        }
      }

      //  Bangun opsi request fetch secara eksplisit
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // Menyisipkan token Bearer murni tanpa kutip tambahan jika token ada
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      };

      // Memanggil endpoint controller show($id) Anda
      const response = await GetApiData<DetailMentoringResponse>(`${Mentorings}/${id}`, options);

      if (response.status === "success") {
        setMentoring(response.data);
      } else {
        setErrorText(response.message || "Gagal memuat informasi kelas.");
      }
    } catch (error: any) {
      setErrorText(
        error.message || "Gagal terhubung ke server bimbingan akademik. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  }

  fetchDetailMentoring();
}, [id, Mentorings]);
  // Helper Format Rupiah Mata Uang
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Helper Format Tanggal Indonesia Bersih
  const formatDateIndonesia = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper Format Jam Menit
  const formatTimeInterval = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).replace(".", ":");
  };

  const handleCheckout = async (mentoringId: number) => {
  // 1. Set loading menjadi true & bersihkan error lama menggunakan state Anda
  setIsLoading(true);
  setErrorText(null);

  try {
    // 2. Ambil token dari localStorage
    const token = localStorage.getItem("user_token");
    
    // Validasi awal jika token benar-benar tidak ada di storage
    if (!token) {
      setErrorText("Sesi Anda telah berakhir atau Anda belum login. Silakan login kembali.");
      setIsLoading(false);
      return;
    }


    //  Kirim data ke endpoint backend menggunakan variabel BookingCreate Anda
    const response = await sendPostData<CreateBookingResponse>(BookingCreate, {mentoring_id : mentoringId}, token );

    // Validasi status response dari Laravel
    if (response.status === "success") {
      
      // 5. Panggil pop-up Midtrans Snap menggunakan snap_token dari root response
      if ((window as any).snap) {
        (window as any).snap.pay(response.snap_token, {
          onSuccess: (result: any) => {
            console.info("Pembayaran Sukses:", result);
            navigate("/user/payment/history?status=success");
          },
          onPending: (result: any) => {
            console.info("Pembayaran Pending/Menunggu:", result);
            navigate("/user/payment/history?status=pending");
          },
          onError: (result: any) => {
            console.error("Pembayaran Gagal:", result);
            setErrorText("Proses pembayaran ditolak atau gagal dilakukan oleh Midtrans.");
          },
          onClose: () => {
            alert("Anda telah menutup jendela pembayaran sebelum menyelesaikan transaksi.");
          },
        });
      } else {
        // Membaca order_id dengan aman dari properti response.data sesuai interface Booking
        alert(`Booking berhasil dibuat! Order ID: ${response.data.order_id}. Namun, Snap SDK Midtrans tidak terdeteksi.`);
      }
    } else {
      // Menangani jika status string murni dari response bukan "success" (error handlings)
      setErrorText((response as any).message || "Gagal membuat reservasi bimbingan.");
    }
  } catch (error: any) {
    console.error("Checkout Error:", error);
    setErrorText(error.message || "Terjadi kesalahan internal saat menghubungkan ke server gateway.");
  } finally {
    // 6. Kembalikan status loading ke false setelah proses selesai
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-lembut via-white to-mint-lembut/30 pb-20">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-sage/20 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate(-1)} // Kembali ke halaman kelas sebelumnya
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-sage/30 bg-white text-dark-slate transition-all hover:bg-mint-lembut active:scale-95"
          >
            <RiArrowLeftLine size={20} />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-hijau-botol/60">
              Rincian Informasi Program
            </span>
            <h1 className="text-xl font-black text-charcoal">
              Detail Kelas Mentoring
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 mt-8">
        {/* KONDISI 1: SKELETON LOADING STATE */}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-48 rounded-[32px] bg-white border border-sage/20" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 md:col-span-2 rounded-2xl bg-white border border-sage/20" />
              <div className="h-32 rounded-2xl bg-white border border-sage/20" />
            </div>
          </div>
        )}

        {/* KONDISI 2: ERROR STATE / KELAS TIDAK DITEMUKAN */}
        {!isLoading && (errorText || !mentoring) && (
          <div className="rounded-[32px] border border-terracotta/20 bg-white p-12 text-center shadow-xl max-w-xl mx-auto mt-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/10 text-3xl text-terracotta">
              ⚠️
            </div>
            <h3 className="mt-6 text-2xl font-black text-charcoal">
              Kelas Terkendala
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-dark-slate/75">
              {errorText || "Maaf, rincian data bimbingan akademik gagal ditarik dari server database MySQL."}
            </p>
            <button
              onClick={() => navigate("/kelas")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-hijau-uin px-6 py-3.5 text-sm font-bold text-putih-bersih shadow-md transition-all hover:bg-hijau-botol"
            >
              Kembali ke Daftar Kelas
            </button>
          </div>
        )}

        {/* KONDISI 3: DATA BERHASIL DITAMPILKAN SECARA KETAT */}
        {!isLoading && mentoring && (
          <div className="space-y-8">

            {/* Banner Utama Judul Kelas */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-hijau-botol via-hijau-uin to-deep-teal p-8 text-putih-bersih shadow-lg shadow-hijau-uin/10">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-3">
             
                  <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
                    {mentoring.title}
                  </h2>
                </div>

                {/* Badge Ketersediaan Sesuai Atribut Status */}
                <div className="shrink-0">
                  <span className={`inline-flex rounded-2xl px-5 py-3 text-sm font-black shadow-inner uppercase tracking-wider ${mentoring.status === "full"
                    ? "bg-dark-slate/20 text-white/50 border border-white/10"
                    : "bg-kuning-emas text-hijau-botol shadow-md"
                    }`}>
                    Kelas {mentoring.status === "full" ? "Penuh" : "Tersedia"}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Konten Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Blok Kiri: Deskripsi & Materi */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-[28px] border border-sage/20 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-charcoal flex items-center gap-2">
                    <RiInformationLine className="text-hijau-uin" size={20} />
                    Deskripsi & Pokok Pembahasan
                  </h3>
                  <div className="mt-4 border-t border-sage/10 pt-4">
                    <p className="text-sm leading-relaxed text-dark-slate/80 whitespace-pre-line">
                      {mentoring.description || "Tidak ada deskripsi tertulis resmi yang dilampirkan mentor untuk mata bimbingan ini."}
                    </p>
                  </div>
                </div>

                {/* Sesi Warning Keamanan */}
                <div className="rounded-2xl border border-soft-ochre/40 bg-cream/50 p-4 flex gap-3 text-xs font-medium text-olive/80">
                  <RiSecurePaymentLine size={18} className="shrink-0 text-olive" />
                  <p>
                    Seluruh proses pendaftaran dilindungi enkripsi. Pembayaran resmi hanya diproses melalui gerbang pembayaran Midtrans Snap menggunakan token resmi sistem bimbingan.
                  </p>
                </div>
              </div>

              {/* Blok Kanan: Jadwal Waktu & Tombol Aksi Akhir */}
              <div className="space-y-6">
                <div className="rounded-[28px] border border-sage/20 bg-white p-6 shadow-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-charcoal">Waktu Pelaksanaan</h3>

                    {/* Detail Tanggal */}
                    <div className="mt-5 flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-lembut text-hijau-botol">
                        <RiCalendarEventLine size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-dark-slate/40">Hari & Tanggal</p>
                        <p className="text-sm font-bold text-charcoal mt-0.5">{formatDateIndonesia(mentoring.start_time)}</p>
                      </div>
                    </div>

                    {/* Detail Jam */}
                    <div className="mt-4 flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-champagne text-olive">
                        <RiTimeLine size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-dark-slate/40">Alokasi Jam Belajar</p>
                        <p className="text-sm font-bold text-charcoal mt-0.5">
                          {formatTimeInterval(mentoring.start_time)} - {formatTimeInterval(mentoring.end_time)} WIB
                        </p>
                      </div>
                    </div>

                    <div className="my-5 border-t border-sage/10" />

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-dark-slate/40">Investasi Pendidikan</p>
                      <h4 className="text-3xl font-black text-hijau-botol mt-1">
                        {mentoring.price === 0 ? "Gratis / Free" : formatCurrency(mentoring.price)}
                      </h4>
                    </div>
                  </div>

                  {/* Tombol Ambil Seat / Alihkan ke Halaman Checkout Utama */}
                                 </div>
              <button
  // Tombol akan terkunci otomatis jika sedang loading ATAU kelas sudah penuh
  disabled={isLoading || mentoring.status === "full"}
  onClick={() => handleCheckout(mentoring.id)}
  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-putih-bersih shadow-md transition-all duration-300 ${
    mentoring.status === "full"
      ? "bg-dark-slate/30 text-dark-slate/50 cursor-not-allowed shadow-none"
      : isLoading
      ? "bg-hijau-botol/70 cursor-wait opacity-80 shadow-none" // Gaya visual saat memproses data
      : "bg-hijau-uin hover:bg-hijau-botol hover:shadow-lg hover:shadow-hijau-uin/20 active:scale-[0.99]"
  }`}
>
  {/* Teks teks tombol berubah sesuai state dinamis backend */}
  {isLoading 
    ? "Menghubungkan Midtrans..." 
    : mentoring.status === "full" 
    ? "Pendaftaran Ditutup" 
    : "Daftar & Ambil Tempat"
  }
</button>
                                 </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}
