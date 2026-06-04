

import { RiBookOpenLine } from "@remixicon/react";



export default function Kelas() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] w-full overflow-hidden bg-putih-bersih">

      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80')`
        }}
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-mint-lembut/40 via-putih-bersih/60 to-champagne/40" />

      <div className="absolute bottom-[-150px] right-[-150px] z-10 h-[450px] w-[450px] rounded-full bg-kuning-emas/10 blur-3xl" />

      {/* Pattern Grid Halus */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]" />

      <div className="relative z-20 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 text-center">

        {/* Ikon Kontainer */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg border border-hijau-zamrud/20">
          <RiBookOpenLine size={48} className="text-hijau-uin" />
        </div>

        {/* Judul */}
        <h1 className="mt-8 text-5xl font-bold tracking-tight text-hijau-botol md:text-7xl">
          Kelas
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-slate/80 md:text-xl">
          Kelola seluruh aktivitas pembelajaran, pemesanan kelas, dan riwayat kelas dalam satu tempat yang terintegrasi.
        </p>

        <div className="mt-12 h-1 w-32 rounded-full bg-gradient-to-r from-hijau-zamrud to-kuning-emas" />

      </div>
    </div>
  );
}

