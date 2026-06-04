
import { RiCustomerService2Line } from 'react-icons/ri';

export default function Konsultasi() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] w-full overflow-hidden bg-putih-bersih">

      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.12]"
        style={{
          backgroundImage: `url('https://unsplash.com')`
        }}
      />

      {/* 2. LAPISAN GRADASI WARNA DAN BLUR OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-mint-lembut/40 via-putih-bersih/60 to-champagne/40" />

      <div className="absolute bottom-[-150px] left-[-150px] z-10 h-[450px] w-[450px] rounded-full bg-hijau-zamrud/10 blur-3xl" />

      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]" />

      <div className="relative z-20 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 text-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg border border-hijau-zamrud/20">
          <RiCustomerService2Line size={48} className="text-hijau-uin" />
        </div>

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-hijau-botol md:text-7xl">
          Konsultasi
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-slate/80 md:text-xl">
          Hubungi mentor ahli kami untuk bimbingan akademis, konsultasi karir, atau diskusi personal demi mendukung perkembangan studi Anda.
        </p>

        <div className="mt-12 h-1 w-32 rounded-full bg-gradient-to-r from-hijau-zamrud to-kuning-emas" />

      </div>
    </div>
  );
}
