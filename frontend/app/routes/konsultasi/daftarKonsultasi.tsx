import React, { useState } from 'react';

// Interface berdasarkan struktur data dari BRD kelompok 2


export default function DaftarKonsultasi() {
  // Mock data gabungan berdasarkan spesifikasi BRD & kategori
  const [sessions] = useState<[]>([
    {
      id: 1,
      title: "Pelatihan Dasar Laravel",
      mentor: "Nama Mentor",
      price: 15000,
      start_time: "2026-06-01 10:00:00",
      description: "Belajar membuat REST API dasar menggunakan Laravel untuk kebutuhan modern web application.",
      category: "Pelatihan",
      status: "available"
    },
    {
      id: 2,
      title: "Konsultasi Akademik: Tugas Akhir & Skripsi",
      mentor: "Dr. Ahmad Subagja",
      price: 15000,
      start_time: "2026-06-02 13:00:00",
      description: "Bimbingan intensif mengenai penentuan topik, metodologi penelitian, dan troubleshooting code.",
      category: "Konsultasi",
      status: "available"
    },
    {
      id: 3,
      title: "Pelatihan Frontend React & Tailwind",
      mentor: "Siti Nurhaliza, M.T.",
      price: 15000,
      start_time: "2026-06-03 09:00:00",
      description: "Transformasikan desain menjadi web responsif menggunakan React dan utility-first CSS Tailwind.",
      category: "Pelatihan",
      status: "full"
    },
    {
      id: 4,
      title: "Konsultasi Karier & Review CV Tech",
      mentor: "Budi Setiawan (Tech Lead)",
      price: 15000,
      start_time: "2026-06-04 15:30:00",
      description: "Persiapkan portofolio dan CV Anda agar dilirik oleh HR startup maupun tech company nasional.",
      category: "Konsultasi",
      status: "available"
    }
  ]);

  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const filteredSessions = filterCategory === 'Semua' 
    ? sessions 
    : sessions.filter(s => s.category === filterCategory);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleBooking = (sessionId: number) => {
    alert(`Memproses pemesanan untuk Session ID: ${sessionId}. Sistem akan meminta snap_token ke Midtrans...`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-mint-lembut)] text-[var(--color-charcoal)] font-sans">
      
      {/* Top Navbar */}
      <nav className="bg-[var(--color-hijau-botol)] text-[var(--color-putih-bersih)] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <i className="ri-graduation-cap-fill text-2xl text-[var(--color-kuning-emas)]"></i>
            <span className="font-bold text-lg tracking-wide">Platform Konsultasi & Bantuan Akademik</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-[var(--color-soft-ochre)] transition">
              <i className="ri-history-line"></i>
              <span className="text-sm font-medium">Tiket Saya</span>
            </button>
            <div className="h-6 w-px bg-[var(--color-hijau-lumut)]"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[var(--color-hijau-zamrud)] flex items-center justify-center text-xs font-bold">
                M
              </div>
              <span className="text-sm hidden sm:inline">Mahasiswa</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="bg-[var(--color-putih-bersih)] rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--color-abu-perak)] mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-hijau-botol)]">
              Daftar Jadwal Konsultasi & Pelatihan
            </h1>
            <p className="text-[var(--color-forest-khaki)] mt-1">
              Pilih jadwal konsultasi on-demand atau kelas pelatihan software sesuai kebutuhan akademikmu.
            </p>
          </div>
          
          {/* Filter Kategori */}
          <div className="flex bg-[var(--color-mint-lembut)] p-1 rounded-xl border border-[var(--color-sage)] w-full md:w-auto">
            {['Semua', 'Konsultasi', 'Pelatihan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-[var(--color-hijau-uin)] text-[var(--color-putih-bersih)] shadow-sm'
                    : 'text-[var(--color-forest-khaki)] hover:text-[var(--color-hijau-botol)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List Sessions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <div 
              key={session.id} 
              className="bg-[var(--color-putih-bersih)] rounded-xl shadow-sm border border-[var(--color-abu-perak)] overflow-hidden flex flex-col hover:shadow-md transition-all duration-300"
            >
              {/* Badge Kategori & Status */}
              <div className="p-4 pb-0 flex justify-between items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  session.category === 'Konsultasi' 
                    ? 'bg-[var(--color-champagne)] text-[var(--color-emas-gelap)]' 
                    : 'bg-emerald-100 text-[var(--color-hijau-botol)]'
                }`}>
                  <i className={`${session.category === 'Konsultasi' ? 'ri-user-voice-line' : 'ri-code-box-line'} mr-1`}></i>
                  {session.category}
                </span>

                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  session.status === 'available'
                    ? 'bg-[var(--color-mint-lembut)] text-[var(--color-hijau-zamrud)]'
                    : 'bg-rose-100 text-[var(--color-terracotta)]'
                }`}>
                  {session.status === 'available' ? 'Tersedia' : 'Penuh'}
                </span>
              </div>

              {/* Konten Utama Kartu */}
              <div className="p-5 flex-1">
                <h3 className="font-bold text-lg text-[var(--color-charcoal)] line-clamp-2 min-h-[3.5rem] mb-2 hover:text-[var(--color-hijau-uin)] transition">
                  {session.title}
                </h3>
                
                {/* Detail Mentor */}
                <div className="flex items-center space-x-2 text-sm text-[var(--color-forest-khaki)] mb-3">
                  <i className="ri-user-follow-line text-[var(--color-hijau-lumut)] text-base"></i>
                  <span className="font-medium truncate">{session.mentor}</span>
                </div>

                <p className="text-xs text-gray-500 line-clamp-3 mb-4 bg-gray-50 p-2.5 rounded-lg border border-dashed border-gray-200">
                  {session.description}
                </p>

                <hr className="border-[var(--color-abu-perak)] my-3" />

                {/* Waktu Pelaksanaan */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-xs text-[var(--color-dark-slate)]">
                    <i className="ri-calendar-event-line text-[var(--color-hijau-uin)]"></i>
                    <span>{new Date(session.start_time).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-[var(--color-dark-slate)]">
                    <i className="ri-time-line text-[var(--color-hijau-uin)]"></i>
                    <span>{new Date(session.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                  </div>
                </div>
              </div>

              {/* Footer Kartu (Harga & Aksi) */}
              <div className="p-4 bg-[var(--color-mint-lembut)] border-t border-[var(--color-abu-perak)] flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-forest-khaki)] font-semibold">Commitment Fee</p>
                  <p className="text-base font-bold text-[var(--color-hijau-botol)]">{formatRupiah(session.price)}</p>
                </div>

                <button
                  onClick={() => handleBooking(session.id)}
                  disabled={session.status !== 'available'}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                    session.status === 'available'
                      ? 'bg-[var(--color-hijau-uin)] text-[var(--color-putih-bersih)] hover:bg-[var(--color-hijau-botol)] active:scale-95'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>{session.status === 'available' ? 'Pesan Sekarang' : 'Habis'}</span>
                  {session.status === 'available' && <i className="ri-arrow-right-line"></i>}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Info Tambahan */}
        <div className="mt-12 bg-[var(--color-cream)] rounded-xl p-4 border border-[var(--color-soft-ochre)] flex items-start space-x-3">
          <i className="ri-information-fill text-xl text-[var(--color-emas-gelap)] mt-0.5"></i>
          <div className="text-xs text-[var(--color-dark-slate)] leading-relaxed">
            <span className="font-bold text-[var(--color-emas-gelap)]">Informasi Alur Pembayaran:</span> Setelah menekan tombol <strong>Pesan Sekarang</strong>, backend Laravel akan mendaftarkan pesanan dan memicu integrasi gateway pembayaran menggunakan <strong>Midtrans Snap API</strong>. Anda dapat menyelesaikan transaksi dengan QRIS, Bank Transfer, atau metode lainnya secara instan.
          </div>
        </div>

      </main>
    </div>
  );
}
