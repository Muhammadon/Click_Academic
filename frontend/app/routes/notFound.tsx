
import { RiErrorWarningFill } from "@remixicon/react";


// 1. Tambahkan fungsi loader kosong ini di bagian atas/bawah file
export function loader() {
  return null;
}

// 2. Komponen bawaan Anda tetap seperti biasa
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-mint-lembut)] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-pale-eucalyptus)]">
          <RiErrorWarningFill
            size={52}
            className="text-[var(--color-hijau-uin)]"
          />
        </div>

        <h1 className="text-6xl font-bold text-[var(--color-hijau-uin)]">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-[var(--color-charcoal)]">
          Halaman Tidak Ditemukan
        </h2>

        <p className="mt-3 text-[var(--color-dark-slate)]">
          Halaman yang Anda cari mungkin telah dipindahkan,
          dihapus, atau URL yang dimasukkan tidak valid.
        </p>

        {/*
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--color-hijau-zamrud)] px-5 py-3 text-white font-medium transition hover:opacity-90"
        >
          <RiHomeLine size={18} />
          Kembali ke Beranda
        </Link>
        */}
      </div>
    </div>);
}
