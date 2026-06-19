import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { sendPostData, SignOut, User as userPath } from "~/core/Conections";
import CardMentoring from "~/component/cardMentoring";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiBookLine,
  RiShieldUserLine,
} from "@remixicon/react";
import Sidebar from "~/component/sidebar";

import { GetApiData } from "~/core/Conections";
import type { GetUserData, TypeResponseUserApi } from "~/core/types";
import { StatusComponent } from "~/component/infoComponents";

export default function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<GetUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);


  useEffect(() => {
    const localToken = localStorage.getItem("user_token");

    async function fetchUserData() {
      if (!localToken) {
        console.info("Token tidak ada, mengalihkan ke halaman Sign In...");
        setIsLoading(false);
        navigate("/user/signIn");
        return; // Stop eksekusi kode di bawahnya
      }

      // Jika token ada, ambil data dari API Laravel
      try {
        const response = await GetApiData<GetUserData>(userPath, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(localToken)}`, // Mengurai kutip token jika saat simpan menggunakan JSON.stringify
            "Content-Type": "application/json",
          },
        });

        if (response.status === "success" && response) {
          setIsSuccess(true)
          setUserData(response);
        } else {
          // Jika status response dari server error/401
          navigate("/user/signIn");
        }
      } catch (error) {
        console.error("Gagal mengambil data user dari server:", error);
        setIsSuccess(false)
        navigate("/user/signIn");
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, []);


  const handleLogout = async () => {
    try {
      // 1. Ambil token mentah langsung dari localStorage (biarkan sendPostData yang melakukan JSON.parse)
      const rawToken = localStorage.getItem("user_token") || "";
      // 3. Panggil method sendPostData bawaan Anda
      //    Kosongkan parameter data ({}) karena logout tidak membutuhkan body data tambahan
      await sendPostData<TypeResponseUserApi>(SignOut, {}, rawToken);

      localStorage.removeItem("user_token");
      navigate("/"); // balek rumah

    } catch (error: any) {
      console.error("Logout Error:", error);

      // Tampilkan pesan error dari Laravel jika diperlukan
      alert(error.message || "Terjadi kesalahan saat menghubungi server.");

      // Fallback Tetap Bersihkan Frontend: 
      // Jika token di server sudah hangus duluan (401), user harus tetap bisa keluar dari aplikasi frontend
      localStorage.removeItem("user_token");
      navigate("/user/signIn");
    }
  };

  // Tampilkan layar memuat kosong sejenak selagi proses verifikasi localStorage berjalan
  if (isLoading || !userData) {
    return <div className="min-h-screen bg-mint-lembut" />;
  }

  return (

    <div className="flex flex-col md:flex-row">

      <Sidebar />

      <div className="h-full w-full bg-mint-lembut max-h-screen overflow-y-scroll overflow-x-hidden">
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
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${userData.data.username}&background=0D9488&color=fff`;
                }}
              />
            </div>
          </div>
        </section>

        <main className="pt-20 md:pt-24 px-4 md:px-8 max-w-7xl mx-auto">
          <section className="text-center md:text-left mb-8">
            {/* Mengambil nilai nama/username dinamis dari Laravel */}
            <h1 className="text-3xl font-bold text-[var(--color-charcoal)] capitalize">
              {userData.data.username}
            </h1>

            <p className="text-[var(--color-dark-slate)] mt-2 uppercase text-xs font-bold tracking-wider bg-[var(--color-pale-eucalyptus)] inline-block px-3 py-1 rounded-full text-[var(--color-hijau-botol)]">
              Hak Akses: {userData.data.role}
            </p>

            <div className="mt-4 flex justify-center md:justify-start gap-3">

            {/*

              <button className="px-5 py-2 rounded-lg bg-[var(--color-hijau-zamrud)] text-white font-medium hover:opacity-90 transition text-sm shadow-sm">
                Edit Profile
              </button>
              */}
              <button
                onClick={handleLogout}
                // onClick={() => {
                //   localStorage.removeItem("user_data");
                //   navigate("/user/signIn");
                // }}
                className="px-5 py-2 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition text-sm shadow-sm"
              >
                Sign Out
              </button>
            </div>


            {/* <StatusComponent  message={userData.message} isSuccess={isSuccess}/> */}
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card Informasi Profil */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-charcoal">
                Informasi Profil
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-3 text-sm text-dark-slate ">
                  <RiMailLine
                    size={20}
                    className="text-[var(--color-toska-tua)] shrink-0"
                  />
                  <span>{userData.data.email}</span>
                </div>

                {/*    <div className="flex items-center gap-3 text-sm text-[var(--color-dark-slate)]">
                  <RiPhoneLine
                    size={20}
                    className="text-[var(--color-toska-tua)] shrink-0"
                  />
                  <span>+62 812 3456 7890</span>
                </div>
                */}
                <div className="flex items-center gap-3 text-sm text-[var(--color-dark-slate)]">
                  <RiMapPinLine
                    size={20}
                    className="text-[var(--color-toska-tua)] shrink-0"
                  />

                {/* sementara aja  */}
                  <span>Banda Aceh, Indonesia</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-charcoal ">
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
                    Total Kursus 
                  </p>
                  <h3 className="text-2xl font-black mt-1 text-[var(--color-charcoal)]">
                  {userData.total_kelas}
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
                    {userData.data.role}
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
                {userData.data.role}
              </strong>
              . Fokus mengelola pemesanan kelas pelatihan, mentoring, serta
              administrasi konsultasi online secara digital.
            </p>
          </section>

        </main>
      </div>
    </div >
  );
}
