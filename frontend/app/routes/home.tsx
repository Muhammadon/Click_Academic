import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Client" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-mint-lembut">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-charcoal/85 via-hijau-botol/70 to-deep-teal/80" />

      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div>
            <h1 className="text-2xl font-black text-putih-bersih">
              Click Academic
            </h1>
          </div>

          {/*<nav className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="text-sm font-medium text-putih-bersih/80 transition hover:text-putih-bersih"
            >
              Home
            </a>

            <a
              href="#"
              className="text-sm font-medium text-putih-bersih/80 transition hover:text-putih-bersih"
            >
              Kelas
            </a>

            <a
              href="#"
              className="text-sm font-medium text-putih-bersih/80 transition hover:text-putih-bersih"
            >
              Mentor
            </a>

            <a
              href="#"
              className="text-sm font-medium text-putih-bersih/80 transition hover:text-putih-bersih"
            >
              Kontak
            </a>
          </nav> */}

          <Link
            to={"/user/SignIn"}
            className="rounded-2xl bg-kuning-emas px-5 py-3 text-sm font-bold text-charcoal transition-all duration-300 hover:bg-soft-ochre"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-[85vh] items-center justify-center px-6 py-10 text-center lg:px-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-2 backdrop-blur-xl">
            <div className="h-2.5 w-2.5 rounded-full bg-kuning-emas" />

            <span className="text-sm font-medium text-putih-bersih">
              Platform Konsultasi & Pelatihan Mahasiswa
            </span>
          </div>

          <h2 className="mt-8 text-5xl font-black leading-tight text-putih-bersih sm:text-6xl lg:text-7xl">
            Belajar Lebih
            <br />
            Terarah dan
            <br />
            Profesional.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-putih-bersih/75 sm:text-lg">
            Platform modern untuk booking kelas pelatihan,
            untuk pengembangan skill mahasiswa secara online.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link to={"/user"} className="rounded-2xl border border-putih-bersih/20 bg-putih-bersih/10 px-8 py-4 text-base font-bold text-putih-bersih backdrop-blur-xl transition-all duration-300 hover:bg-putih-bersih/20">

          Lihat Kelas
          </Link>
            {/* <button className="rounded-2xl bg-hijau-zamrud px-8 py-4 text-base font-bold text-putih-bersih shadow-xl shadow-hijau-zamrud/30 transition-all duration-300 hover:bg-hijau-botol">
              Konsultasi
            </button>
            */}
          </div>
        </div>
      </main>
    </div>
  );
}
