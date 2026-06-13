import { Link } from "react-router";
import { useNavigate } from "react-router";
import type { Route } from "../+types/home";
import { type TypeResponseUserLogin, type TypeUserApi } from "~/core/types";
import { sendPostData, SignIn } from "~/core/Conections";
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiGoogleLine,
  RiHand2,
} from "@remixicon/react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SignIn" },
    { name: "description", content: "Masuk ke Platform Konsultasi Akademik" },
  ];
}

export default function SignInPage() {
  const redirect = useNavigate();

  const [formData, setFormData] = useState<TypeUserApi>({
    username: "",
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await sendPostData<TypeResponseUserLogin>(
        SignIn,
        formData,
      );

      console.info("data login : ", response);

      if (
        response.data &&
        (response.message === "success" ||
          (response as any).status === "success")
      ) {
        setIsSuccess(true);
        setMessage("Login Berhasil! Mengalihkan ke dashboard...");

        // Simpan data user login ke localStorage
        localStorage.setItem("user_token", JSON.stringify(response.token));

        setTimeout(() => {
          redirect("/user/");
        }, 3000);
      } else {
        setIsSuccess(false);
        console.info("execusis :", response.message);
        setMessage(response.message || "Email atau password salah.");
      }
    } catch (error: any) {
      setIsSuccess(false);
      console.error("Error ditangkap di UI:", error);

      // // Cek apakah error mengandung info status 401 dari sendPostData
      // if (error.message && error.message.includes("401")) {
      //   // Ini adalah error terencana dari Laravel (Kredensial salah)
      //   setMessage("Akun tidak di temukan");
      // } else {
      //   // Ini adalah error jika server Laravel mati / jaringan terputus
      //   setMessage(
      //     "Gagal terhubung ke server. Periksa jaringan atau coba lagi nanti.",
      //   );
      // }

      setMessage(error.message || "Terjadi kesalahan koneksi atau server.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-mint-lembut flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-2 bg-putih-bersih border border-abu-perak">
        {/* Kolom Kiri: Informasi & Branding (Sama persis dengan SignUp) */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-hijau-botol via-hijau-uin to-deep-teal p-10 text-putih-bersih overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-kuning-emas/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-soft-ochre/10 blur-2xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full bg-putih-bersih/10 px-4 py-2 backdrop-blur-sm border border-putih-bersih/20">
              <div className="w-3 h-3 rounded-full bg-kuning-emas" />
              <span className="text-sm font-medium tracking-wide">
                Platform Konsultasi Akademik Mahasiswa
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight">
              Belajar,
              <br />
              Konsultasi,
              <br />
              dan Berkembang.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-putih-bersih/80">
              Aplikasi konsultasi akademik dan pelatihan mahasiswa untuk
              mempermudah pemesanan kelas, mentoring, dan pengelolaan tiket
              pembelajaran secara online.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 mt-10">
            <div className="rounded-2xl bg-putih-bersih/10 p-4 backdrop-blur-sm border border-putih-bersih/10">
              <p className="text-3xl font-bold text-kuning-emas">24+</p>
              <p className="mt-1 text-sm text-putih-bersih/70">Mentor Aktif</p>
            </div>

            <div className="rounded-2xl bg-putih-bersih/10 p-4 backdrop-blur-sm border border-putih-bersih/10">
              <p className="text-3xl font-bold text-soft-ochre">120+</p>
              <p className="mt-1 text-sm text-putih-bersih/70">Kelas Online</p>
            </div>

            <div className="rounded-2xl bg-putih-bersih/10 p-4 backdrop-blur-sm border border-putih-bersih/10">
              <p className="text-3xl font-bold text-champagne">98%</p>
              <p className="mt-1 text-sm text-putih-bersih/70">Kepuasan User</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-putih-bersih px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-mint-lembut px-4 py-2 text-sm font-medium text-hijau-botol border border-sage/30">
                Selamat Datang <RiHand2 size={18} />
              </div>

              <h2 className="mt-5 text-4xl font-black text-charcoal">
                Sign In
              </h2>

              <p className="mt-3 text-base leading-7 text-dark-slate/80">
                Masuk untuk melihat jadwal konsultasi, memesan kelas pelatihan,
                dan mengelola tiket pembelajaran Anda.
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 flex items-start gap-3 rounded-2xl p-4 text-sm font-semibold border transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                  isSuccess
                    ? "bg-emerald-50 text-hijau-botol border-emerald-200"
                    : "bg-rose-50 text-terracotta border-rose-200"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isSuccess ? (
                    <RiCheckboxCircleLine
                      size={20}
                      className="text-hijau-zamrud"
                    />
                  ) : (
                    <RiErrorWarningLine size={20} className="text-terracotta" />
                  )}
                </div>
                <div>{message}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kolom Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-dark-slate">
                  Email Kampus
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mahasiswa@kampus.ac.id"
                  required
                  className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 text-charcoal outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-dark-slate">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-deep-teal hover:text-hijau-botol transition-colors"
                  >
                    Lupa Password?
                  </button>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 text-charcoal outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                />
              </div>

              {/* Opsi Ingat Saya & Secure Login info */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm text-dark-slate cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-sage text-hijau-zamrud focus:ring-hijau-zamrud"
                  />
                  Ingat Saya
                </label>

                <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-olive border border-soft-ochre/40">
                  Secure Login
                </span>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-hijau-uin px-5 py-4 text-base font-bold text-putih-bersih shadow-lg shadow-hijau-uin/20 transition-all duration-300 hover:bg-hijau-botol hover:shadow-xl hover:shadow-hijau-botol/30"
              >
                Masuk ke Dashboard
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>

            {/* Pembatas / Separator */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-abu-perak" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-putih-bersih px-4 text-dark-slate/60">
                  atau lanjutkan dengan
                </span>
              </div>
            </div>

            {/* Alternatif Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex justify-center items-center rounded-2xl border border-abu-perak bg-putih-bersih px-4 py-3 font-semibold text-dark-slate transition-all duration-300 hover:border-sage hover:bg-mint-lembut"
              >
                <RiGoogleLine />
              </button>
              <button
                type="button"
                className="rounded-2xl border border-abu-perak bg-putih-bersih px-4 py-3 font-semibold text-dark-slate transition-all duration-300 hover:border-sage hover:bg-mint-lembut"
              >
                SSO Kampus
              </button>
            </div>

            {/* Link Menuju Halaman SignUp */}
            <p className="mt-8 text-center text-sm text-dark-slate/70">
              Belum memiliki akun?{" "}
              <Link
                to={"/user/signUp"}
                className="font-semibold text-terracotta hover:text-burnt-orange transition-colors"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
