import { PATHSERVER } from "~/core/Conections";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-lembut via-putih-bersih to-cream px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-7xl overflow-hidden rounded-[32px] border border-abu-perak bg-putih-bersih shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Left Content */}
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
                <div className="text-4xl font-black text-kuning-emas">
                  24/7
                </div>
                <p className="mt-2 text-sm leading-6 text-putih-bersih/70">
                  Akses platform pembelajaran dan konsultasi kapan saja.
                </p>
              </div>

              <div className="rounded-3xl border border-putih-bersih/10 bg-putih-bersih/10 p-5 backdrop-blur-sm">
                <div className="text-4xl font-black text-soft-ochre">
                  100+
                </div>
                <p className="mt-2 text-sm leading-6 text-putih-bersih/70">
                  Program pelatihan dan mentoring aktif setiap semester.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16 bg-putih-bersih">
            <div className="w-full max-w-xl">
              <div className="mb-8">
                <div className="inline-flex items-center rounded-full border border-pale-eucalyptus bg-mint-lembut px-4 py-2 text-sm font-semibold text-hijau-botol">
                  Registrasi Mahasiswa 🎓
                </div>

                <h2 className="mt-5 text-4xl font-black text-charcoal">
                  Create Account
                </h2>

                <p className="mt-3 text-base leading-7 text-dark-slate/75">
                  Lengkapi data untuk membuat akun dan mulai menggunakan
                  platform konsultasi akademik.
                </p>
              </div>

              <form className="space-y-5" action={PATHSERVER} method="POST">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      Nama Depan
                    </label>

                    <input
                      type="text"
                      placeholder="Muhammad"
                      className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      Nama Belakang
                    </label>

                    <input
                      type="text"
                      placeholder="Nadhar"
                      className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-dark-slate">
                    Email Kampus
                  </label>

                  <input
                    type="email"
                    placeholder="mahasiswa@kampus.ac.id"
                    className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      NIM
                    </label>

                    <input
                      type="text"
                      placeholder="22000123"
                      className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      Fakultas
                    </label>

                    <select className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20">
                      <option>Teknik</option>
                      <option>Ekonomi</option>
                      <option>Hukum</option>
                      <option>Tarbiyah</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      Password
                    </label>

                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark-slate">
                      Konfirmasi Password
                    </label>

                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-sage/40 bg-putih-bersih px-5 py-4 outline-none transition-all duration-300 focus:border-hijau-zamrud focus:ring-4 focus:ring-hijau-zamrud/20"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-champagne bg-cream p-4">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-sage text-hijau-zamrud focus:ring-hijau-zamrud"
                  />

                  <p className="text-sm leading-6 text-dark-slate/80">
                    Saya menyetujui syarat penggunaan platform dan kebijakan
                    privasi sistem konsultasi akademik.
                  </p>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-hijau-zamrud px-5 py-4 text-base font-bold text-putih-bersih shadow-lg shadow-hijau-zamrud/30 transition-all duration-300 hover:bg-hijau-botol hover:shadow-xl hover:shadow-hijau-botol/30"
                >
                  Buat Akun Sekarang

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-abu-perak" />
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="bg-putih-bersih px-4 text-dark-slate/60">
                    atau daftar menggunakan
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="rounded-2xl border border-abu-perak bg-putih-bersih px-4 py-3 font-semibold text-dark-slate transition-all duration-300 hover:border-sage hover:bg-mint-lembut">
                  Google
                </button>

                <button className="rounded-2xl border border-abu-perak bg-putih-bersih px-4 py-3 font-semibold text-dark-slate transition-all duration-300 hover:border-sage hover:bg-mint-lembut">
                  SSO Kampus
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-dark-slate/70">
                Sudah memiliki akun?{' '}
                <button className="font-semibold text-terracotta transition-colors hover:text-burnt-orange">
                  Masuk Sekarang
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

