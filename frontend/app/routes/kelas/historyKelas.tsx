// KELAS DI SINI ADA DARI MENTORING DI BACKEENT

import { RiArrowLeftLine, RiBookOpenLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { GetApiData, MentoringsHistory, sendPostData } from "~/core/Conections";
import type { Mentoring, MentoringListResponse } from "~/core/types";


const SkeletonLoading = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="h-28 bg-white animate-pulse rounded-2xl border border-sage/10 shadow-sm" />
    <div className="h-28 bg-white animate-pulse rounded-2xl border border-sage/10 shadow-sm" />
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-10 border border-dashed border-sage/30 rounded-3xl bg-white text-dark-slate/40 text-sm shadow-sm">
    📭 {message}
  </div>
);

export default function KelasHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mentoringsList, setMentoringsList] = useState<Mentoring[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    // 1. Ambil token dari localStorage
    const localToken = localStorage.getItem("user_token"); 
    
    const fetchBookingHistory = async () => {
      setIsLoading(true);
      setErrorText(null);
      
      // Jika token tidak ditemukan, langsung tendang ke Sign In
      if (!localToken) {
        setErrorText("Sesi Anda habis. Silakan login kembali.");
        setIsLoading(false);
        navigate("/user/signIn");
        return;
      }

      try {
        // Parsing token jika disimpan menggunakan JSON.stringify sebelumnya
        const cleanToken = localToken.startsWith('"') ? JSON.parse(localToken) : localToken;

        // 3. Kirim request GET disertai dengan Headers Authorization Bearer Token
        const response = await GetApiData<MentoringListResponse>(
          MentoringsHistory, 
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${cleanToken}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          }
        );

        if (response && response.status === "success") {
          // Masuk ke root key 'data' murni (Mentoring[]) sesuai skema backend Anda
          setMentoringsList(response.data); 
        } else {
          setErrorText(response.message || "Gagal memuat histori bimbingan.");
        }
      } catch (err: any) {
        console.error("Fetch History Error:", err);
        setErrorText(err.message || "Terjadi kesalahan sistem saat menghubungi server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingHistory();
  }, [navigate]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div className="min-h-screen bg-mint-lembut">
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
                Riwayat Kelas Anda
              </div>
            </div>
          </div>

          <span className="bg-hijau-botol text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
            Total: {mentoringsList.length} Kelas
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 mt-8">
        
        <div className="mb-6">
          <h3 className="text-2xl font-black text-charcoal">Semua Riwayat Kelas</h3>
          <p className="text-xs text-dark-slate/50 mt-1">
            Daftar seluruh kelas bimbingan yang terdaftar pada akun Anda di sistem.
          </p>
        </div>

        {errorText && (
          <div className="text-center text-rose-600 bg-white border border-rose-200 p-6 rounded-3xl shadow-sm mb-6">
            ⚠️ {errorText}
          </div>
        )}

        {/* AREA DATA / LOADING / KOSONG */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-white animate-pulse rounded-2xl border border-sage/10 shadow-sm" />
            <div className="h-32 bg-white animate-pulse rounded-2xl border border-sage/10 shadow-sm" />
          </div>
        ) : mentoringsList.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-sage/30 rounded-3xl bg-white text-dark-slate/40 text-sm shadow-sm">
            📭 Anda belum memiliki riwayat pendaftaran kelas bimbingan apa pun.
          </div>
        ) : (
          /* GRID DATA BERHASIL DI-LOAD */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoringsList.map((kelas) => (
              <div 
                key={kelas.id} 
                className="bg-white border border-sage/20 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-bold text-base text-charcoal line-clamp-1">{kelas.title}</h4>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      kelas.status === 'available' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {kelas.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-dark-slate/60 line-clamp-2 mt-2">
                    {kelas.description || "Tidak ada deskripsi bimbingan."}
                  </p>
                </div>

                <div className="mt-5 flex justify-between items-center pt-3 border-t border-dashed border-sage/20">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-dark-slate/40 uppercase tracking-wider font-bold">Harga Kelas</span>
                    <span className="text-sm font-black text-hijau-botol">{formatRupiah(kelas.price)}</span>
                  </div>
                  
                  {/* nantik aja<button 
                    onClick={() => navigate(`/kelas/booking/${kelas.id}`)}
                    className="flex items-center gap-1.5 text-xs bg-dark-slate hover:bg-charcoal text-white font-bold px-4 py-2.5 rounded-xl transition-all"
                  >
                    <RiBookOpenLine size={14} />
                    Lihat Detail
                  </button>
                  */}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
