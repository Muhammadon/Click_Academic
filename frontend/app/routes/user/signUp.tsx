import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiUserSharedLine,
} from "@remixicon/react";
import { useState } from "react";
import { Link, useNavigate, type ErrorResponse } from "react-router";
import { StatusComponent } from "~/component/infoComponents";

import { sendPostData, SignUp } from "~/core/Conections";
import { type TypeResponseUserApi, type TypeUserApi } from "~/core/types";

export default function SignUpPage() {
  const [dataUser, setDataUser] = useState<TypeUserApi>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleInputChange = (field: keyof TypeUserApi, value: string) => {
    setDataUser((prev) => ({
      ...prev,
      [field]: value, // Memperbarui field secara real-time
    }));
  };

  const handleSendServer = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman bawaan browser
    setMessage("");

    // Validasi Klien: Pastikan password dan konfirmasi cocok sebelum menembak API
    if (dataUser.password !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Konfirmasi password tidak cocok!");
      return;
    }

    try {
      const response = await sendPostData<TypeResponseUserApi>(
        SignUp,
        dataUser,
      );

      // Menampilkan feedback dinamis dari properti status dan message backend Laravel
      if (response.status === "success" || response.status === "true") {
        console.info("Data User:", response.data);
        setIsSuccess(true);
        setMessage(
          "Registrasi Berhasil! Mengalihkan ke halaman Sign In dalam 3 detik...",
        );

        setTimeout(() => {
          navigate("/user/signIn");
        }, 3000);
      } else {
        setIsSuccess(false);
        setMessage(`Gagal: ${response.message}`);
      }
    } catch (error: any) {
      console.error("Error submit ditangkap di UI:", error);
      setIsSuccess(false);

      setMessage(error.message || "Terjadi kesalahan koneksi atau server.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-mint-lembut via-putih-bersih to-cream px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-7xl overflow-hidden rounded-4xl border border-abu-perak bg-putih-bersih text-black shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Left Content Column */}
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-deep-teal via-hijau-botol to-hijau-uin p-10 text-putih-bersih">
            <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-kuning-emas/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-soft-ochre/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-4 py-2 backdrop-blur-sm">
                <div className="h-3 w-3 rounded-full bg-kuning-emas" />
                <span className="text-sm font-medium tracking-wide">
                  Sistem Konsultasi Akademik
                </span>
              </div>

              <h1 className="mt-8 text-5xl font-black leading-tight">
                Mulai
                <br />
                Perjalanan
                <br />
                Akademikmu.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-putih-bersih/80">
                Daftar dan dapatkan akses ke mentoring akademik, pelatihan,
                konsultasi dosen, serta pemesanan kelas pembelajaran digital.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-5 mt-10">
              <div className="rounded-3xl border border-putih-bersih/10 bg-putih-bersih/10 p-5 backdrop-blur-sm">
                <div className="text-4xl font-black text-kuning-emas">24/7</div>
                <p className="mt-2 text-sm leading-6 text-putih-bersih/70">
                  Akses platform pembelajaran dan konsultasi kapan saja.
                </p>
              </div>

              <div className="rounded-3xl border border-putih-bersih/10 bg-putih-bersih/10 p-5 backdrop-blur-sm">
                <div className="text-4xl font-black text-soft-ochre">100+</div>
                <p className="mt-2 text-sm leading-6 text-putih-bersih/70">
                  Program pelatihan dan mentoring aktif setiap semester.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column - Diberikan relative z-50 agar lapisan form berada paling atas */}
          <div className="relative z-50 flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16 bg-putih-bersih">
            <div className="w-full max-w-xl">
              <div className="mb-6">
                <div className="inline-flex items-center rounded-full border border-pale-eucalyptus bg-mint-lembut px-4 py-2 text-sm font-semibold text-hijau-botol">
                  Registrasi Mahasiswa
                </div>

                <h2 className="mt-5 text-4xl font-black text-charcoal">
                  Create Account
                </h2>

                <p className="mt-3 text-base leading-7 text-dark-slate/75">
                  Lengkapi data untuk membuat akun dan mulai menggunakan
                  platform konsultasi akademik.
                </p>
              </div>

              {/* TAMPILAN MESSAGE NOTIFIKASI DI SINI */}

              <StatusComponent isSuccess={isSuccess} message={message}/>

                      <form onSubmit={handleSendServer} className="space-y-5">
                {/* Kolom Username tunggal (Menghapus gabungan Nama Depan/Belakang) */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-dark-slate">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan username Anda"
                    required
                    value={dataUser.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full rounded-2xl border border-sage/40 bg-putih-bersih text-black px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-dark-slate">
                    Email Kampus
                  </label>
                  <input
                    type="email"
                    placeholder="mahasiswa@kampus.ac.id"
                    required
                    value={dataUser.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full rounded-2xl border border-sage/40 bg-putih-bersih text-black px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                  />
                </div>

                {/* Baris Password & Konfirmasi Password */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={dataUser.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="w-full rounded-2xl border border-sage/40 bg-putih-bersih text-black px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      Konfirmasi Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-sage/40 bg-putih-bersih text-black px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 cursor-pointer rounded-2xl bg-hijau-uin hover:bg-hijau-botol text-putih-bersih px-5 py-4 font-bold transition-all duration-300 hover:opacity-90 shadow-lg"
                >
                  Daftar Sekarang
                </button>
              </form>

              <div className="w-full p-3 flex justify-center items-center">
                <Link
                  to="/user/signIn"
                  className="inline-flex items-center gap-2 rounded-full border border-pale-eucalyptus bg-mint-lembut px-4 py-1.5 text-xs font-semibold text-hijau-botol transition-all duration-300 hover:bg-hijau-botol hover:text-putih-bersih hover:shadow-md"
                >
                  <RiUserSharedLine size={14} />
                  <span>Sudah punya akun? Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
