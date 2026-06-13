import { RiWallet3Line } from "@remixicon/react";

export default function Payment() {
  return (
    <div className="relative h-full w-full bg-putih-bersih">
    
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80')`
        }}
      />

      {/* Layer Gradasi Warna Lembut */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-mint-lembut/40 via-putih-bersih/60 to-champagne/40" />

      {/* Ornamen Blur Estetik di Sisi Kiri Bawah */}
      <div className="absolute bottom-37.5 left-37.5 z-10 h-112.5 w-24 rounded-full bg-hijau-zamrud/10 blur-3xl" />

      {/* Pattern Grid Halus */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]" />

      {/* Konten Utama */}
      <div className="relative z-20 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 text-center">

        {/* Ikon Kontainer Menggunakan Remix Icon Dompet */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg border border-hijau-zamrud/20">
          <RiWallet3Line size={48} className="text-hijau-uin" />
        </div>

        {/* Judul Halaman */}
        <h1 className="mt-8 text-5xl font-bold tracking-tight text-hijau-botol md:text-7xl">
          Payment
        </h1>

        {/* Deskripsi Halaman */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-slate/80 md:text-xl">
          Selesaikan transaksi bimbingan Anda, kelola metode pembayaran Midtrans, dan pantau status tagihan secara aman dan instan.
        </p>

        {/* Garis Pembatas Gradasi Khas */}
        <div className="mt-12 h-1 w-32 rounded-full bg-gradient-to-r from-hijau-zamrud to-kuning-emas" />

      </div>
    </div>
  );
}
