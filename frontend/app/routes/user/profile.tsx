import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiBookLine,
  RiShieldUserLine,
} from "@remixicon/react";

// 1. Definisikan interface sesuai dengan respons json data dari controller Laravel Anda
interface UserProfileData {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localToken = localStorage.getItem("user_token");

    if (!localToken) {
      console.info("token tidka ada");
      // Jika data tidak ada di localStorage, paksa redirect ke halaman signIn
      navigate("/user/signIn");
    } else {
      try {
        const parsedData = JSON.parse(localToken);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/user/signIn");
      } finally {
        setIsLoading(false);
      }
    }
  }, [navigate]);

  // Tampilkan layar memuat kosong sejenak selagi proses verifikasi localStorage berjalan
  if (isLoading || !userData) {
    return <div className="min-h-screen bg-mint-lembut" />;
  }

  return (
    <div className="min-h-screen bg-mint-lembut">
      <section className="relative">
        <div className="h-52 md:h-72 bg-[var(--color-hijau-uin)]" />

        <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 md:left-16 md:translate-x-0">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-[var(--color-kuning-emas)] bg-[var(--color-pale-eucalyptus)] overflow-hidden shadow-lg">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback avatar jika gambar lokal /profile.jpg tidak ditemukan
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${userData.username}&background=0D9488&color=fff`;
              }}
            />
          </div>
        </div>
      </section>

      <main className="pt-20 md:pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <section className="text-center md:text-left mb-8">
          {/* Mengambil nilai nama/username dinamis dari Laravel */}
          <h1 className="text-3xl font-bold text-[var(--color-charcoal)] capitalize">
            {userData.username}
          </h1>

          <p className="text-[var(--color-dark-slate)] mt-2 uppercase text-xs font-bold tracking-wider bg-[var(--color-pale-eucalyptus)] inline-block px-3 py-1 rounded-full text-[var(--color-hijau-botol)]">
            Hak Akses: {userData.role}
          </p>

          <div className="mt-4 flex justify-center md:justify-start gap-3">
            <button className="px-5 py-2 rounded-lg bg-[var(--color-hijau-zamrud)] text-white font-medium hover:opacity-90 transition text-sm shadow-sm">
              Edit Profile
            </button>
            <button
              // onClick={() => {
              //   localStorage.removeItem("user_data");
              //   navigate("/user/signIn");
              // }}
              className="px-5 py-2 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition text-sm shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card Informasi Profil */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-[var(--color-charcoal)]">
              Informasi Profil
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-3 text-sm text-[var(--color-dark-slate)]">
                <RiUserLine
                  size={20}
                  className="text-[var(--color-toska-tua)] shrink-0"
                />
                <span>ID Pengguna: {userData.id}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--color-dark-slate)]">
                <RiMailLine
                  size={20}
                  className="text-[var(--color-toska-tua)] shrink-0"
                />
                <span>{userData.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--color-dark-slate)]">
                <RiPhoneLine
                  size={20}
                  className="text-[var(--color-toska-tua)] shrink-0"
                />
                <span>+62 812 3456 7890</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--color-dark-slate)]">
                <RiMapPinLine
                  size={20}
                  className="text-[var(--color-toska-tua)] shrink-0"
                />
                <span>Banda Aceh, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Card Statistik */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-[var(--color-charcoal)]">
              Statistik & Sistem
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Box Kursus Aktif */}
              <div className="rounded-xl bg-[var(--color-champagne)] p-5 border border-[var(--color-soft-ochre)]/20">
                <RiBookLine
                  size={28}
                  className="mb-3 text-[var(--color-olive)]"
                />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                  Kursus Diikuti
                </p>
                <h3 className="text-2xl font-black mt-1 text-[var(--color-charcoal)]">
                  12
                </h3>
              </div>

              {/* BOX ROLE TAMBAHAN DI BAGIAN KURSUS STATISTIK */}
              <div className="rounded-xl bg-mint-lembut p-5 border border-[var(--color-sage)]/30">
                <RiShieldUserLine
                  size={28}
                  className="mb-3 text-[var(--color-hijau-botol)]"
                />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                  Sistem Role
                </p>
                <h3 className="text-lg font-extrabold mt-2 text-[var(--color-hijau-botol)] capitalize truncate">
                  {userData.role}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Tentang Saya */}
        <section className="mt-6 bg-white rounded-2xl shadow-md p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-charcoal)]">
            Tentang Saya
          </h2>

          <p className="leading-7 text-[var(--color-dark-slate)] text-sm">
            Saya adalah pengguna terdaftar pada Platform Konsultasi Akademik
            dengan hak akses sebagai{" "}
            <strong className="text-[var(--color-hijau-botol)] capitalize">
              {userData.role}
            </strong>
            . Fokus mengelola pemesanan kelas pelatihan, mentoring, serta
            administrasi konsultasi online secara digital.
          </p>
        </section>
      </main>
    </div>
  );
}
