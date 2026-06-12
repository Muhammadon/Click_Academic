import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { CardKelas } from "~/component/cardKelas"; // nantik aja
// import { exampleApiData } from "~/example/exampleApiData"; // gal pakai lagi

// Import fungsi fetcher yang sudah kita perbaiki sebelumnya
// Import interface sesuai struktur data yang Anda miliki
import { GetApiData, Mentorings } from "~/core/Conections";
import type { Mentoring, MentoringListResponse } from "~/core/types";

export default function ClassListPage() {
  // State untuk menampung data mentoring dari API
  const [mentorings, setMentorings] = useState<Mentoring[]>([]);
  // State loading untuk memberikan feedback visual ke user
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State error untuk menampung pesan kesalahan jika API gagal dicall
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("user_token");

    if (!localToken) {
      console.info("token tidka ada");
      // Jika data tidak ada di localStorage, paksa redirect ke halaman signIn
      navigate("/user/signIn");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchMentoringData() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        // Menggunakan interface MentoringListResponse pada generic GetApiData
        const response = await GetApiData<MentoringListResponse>(Mentorings);

        if (response.status === "success") {
          setMentorings(response.data);
        } else {
          setErrorMessage(response.message || "Gagal memuat data kelas.");
        }
      } catch (error: any) {
        // Menangkap error dari network atau server throw
        setErrorMessage(
          error.message || "Terjadi kesalahan jaringan saat mengambil data.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchMentoringData();
  }, []);

  return (
    <>
      <section className="relative bg-hijau-botol py-16 text-putih-bersih">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-kuning-emas/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-soft-ochre/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl p-3.5">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              🎓 Program Pelatihan Mahasiswa
            </div>

            <h2 className="mt-6 text-5xl font-black leading-tight">
              Tingkatkan Skill
              <br />
              dan Kompetensi
              <br />
              Akademikmu.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-putih-bersih/80">
              Pilih berbagai kelas pelatihan mulai dari teknologi, desain,
              kepemimpinan, hingga pengembangan soft skill bersama mentor
              profesional.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mt-10 grid gap-4 rounded-3xl border border-putih-bersih/10 bg-putih-bersih/10 p-5 backdrop-blur-xl lg:grid-cols-4">
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

            <select className="rounded-2xl border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-4 text-putih-bersih outline-none focus:border-kuning-emas">
              <option className="text-charcoal">Semua Level</option>
              <option className="text-charcoal">Beginner</option>
              <option className="text-charcoal">Intermediate</option>
              <option className="text-charcoal">Advanced</option>
            </select>

            <button className="rounded-2xl bg-kuning-emas px-5 py-4 font-bold text-charcoal transition-all duration-300 hover:bg-soft-ochre">
              Cari Kelas
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">
            Total Kelas
          </p>
          <h3 className="mt-3 text-4xl font-black text-hijau-botol">120+</h3>
        </div>

        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">
            Mentor Aktif
          </p>
          <h3 className="mt-3 text-4xl font-black text-deep-teal">35+</h3>
        </div>

        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">
            Peserta Aktif
          </p>
          <h3 className="mt-3 text-4xl font-black text-terracotta">1.2K</h3>
        </div>

        <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
          <p className="text-sm font-semibold text-dark-slate/70">
            Tingkat Kelulusan
          </p>
          <h3 className="mt-3 text-4xl font-black text-olive">95%</h3>
        </div>
      </section>

      {/* Content Section: Handling Loading, Error, & Data Map */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        {/* 1. Kondisi saat Loading - Menggunakan Skeleton Sederhana */}
        {isLoading && (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-abu-perak bg-putih-bersih p-6 h-64"
              >
                <div className="h-6 w-2/3 rounded bg-abu-perak mb-4"></div>
                <div className="h-4 w-full rounded bg-abu-perak mb-2"></div>
                <div className="h-4 w-5/6 rounded bg-abu-perak mb-6"></div>
                <div className="h-10 w-full rounded-2xl bg-abu-perak"></div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Kondisi saat Gagal / Error Response - Warna Terracotta */}
        {!isLoading && errorMessage && (
          <div className="rounded-2xl border border-terracotta/20 bg-terracotta/10 p-6 text-center text-charcoal">
            <span className="text-3xl">⚠️</span>
            <h4 className="mt-2 text-lg font-bold text-terracotta">
              Gagal Memuat Data
            </h4>
            <p className="mt-1 text-sm text-charcoal/80">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-terracotta px-4 py-2 text-sm font-bold text-putih-bersih hover:bg-burnt-orange transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* 3. Kondisi saat Sukses & Data Kosong */}
        {!isLoading && !errorMessage && mentorings.length === 0 && (
          <div className="rounded-2xl border border-sage/30 bg-mint-lembut py-12 text-center text-charcoal">
            <span className="text-4xl">📚</span>
            <p className="mt-3 font-medium text-dark-slate">
              Belum ada kelas mentoring yang tersedia saat ini.
            </p>
          </div>
        )}

        {/* 4. Kondisi saat Sukses & Data Berhasil Didapatkan */}
        {!isLoading && !errorMessage && mentorings.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {mentorings.map((item) => (
              <CardKelas item={item} key={item.id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

// Komponen CardKelas yang sudah disesuaikan dengan tema warna & interface Mentoring
interface CardKelasProps {
  item: Mentoring;
}

function CardKelas({ item }: CardKelasProps) {
  // Format harga Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div>
        {/* Badge Kategori dummy sebagai penunjang visual */}
        <span className="inline-block rounded-lg bg-mint-lembut px-3 py-1 text-xs font-semibold text-hijau-botol">
          Academic Mentoring
        </span>
        <h4 className="mt-3 text-xl font-bold text-charcoal line-clamp-2">
          {item.title}
        </h4>
        <p className="mt-2 text-sm text-dark-slate/70 line-clamp-3">
          Ikuti bimbingan intensif materi kuliah untuk mendongkrak pemahaman
          akademik Anda secara berkala.
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-xs text-dark-slate/60">Investasi:</span>
          <span className="text-2xl font-black text-hijau-zamrud">
            {formatRupiah(item.price)}
          </span>
        </div>

        <button className="w-full rounded-2xl bg-hijau-botol py-3.5 text-center font-bold text-putih-bersih transition-all duration-300 hover:bg-hijau-uin hover:shadow-lg">
          Daftar Kelas
        </button>
      </div>
    </div>
  );
}
