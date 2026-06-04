import React, { useState } from 'react';
import { BookingHistory } from '~/example/exampleApiData';

// Interface sesuai dengan struktur tabel bookings & sessions di BRD
// interface BookingHistory {
//   id: number;          // booking id
//   order_id: string;    // order id unik untuk Midtrans
//   session_title: string;
//   mentor: string;
//   price: number;
//   start_time: string;
//   status: 'pending' | 'paid' | 'failed'; // enum status dari BRD
//   category: 'Konsultasi' | 'Pelatihan';
// }

export default function HistoryKonsultasi() {
  // Mock data riwayat transaksi berdasarkan spesifikasi Fitur 5 di BRD
 

  const [activeTab, setActiveTab] = useState<'all' | 'paid' | 'pending'>('all');

  const filteredHistory = BookingHistory.filter(item => {
    if (activeTab === 'paid') return item.status === 'paid';
    if (activeTab === 'pending') return item.status === 'pending';
    return true; // 'all'
  });

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Helper styling status badge berdasarkan enum BRD
  const getStatusBadge = (status: 'pending' | 'paid' | 'failed') => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[var(--color-hijau-botol)]">
            <i className="ri-checkbox-circle-fill"></i>
            <span>Selesai / Lunas</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-[var(--color-terracotta)]">
            <i className="ri-time-fill animate-pulse"></i>
            <span>Menunggu Pembayaran</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
            <i className="ri-close-circle-fill"></i>
            <span>Gagal / Expired</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-mint-lembut)] text-[var(--color-charcoal)] font-sans pb-12">
      
      {/* Top Navbar */}
      <nav className="bg-[var(--color-hijau-botol)] text-[var(--color-putih-bersih)] shadow-md h-16 flex items-center mb-8">
        <div className="max-w-5xl mx-auto px-4 w-full flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-[var(--color-soft-ochre)] transition">
            <i className="ri-home-4-line text-lg"></i>
            <span className="font-medium text-sm">Dashboard Utama</span>
          </div>
          <span className="font-bold text-sm tracking-wide">Riwayat Tiket & Konsultasi</span>
          <div className="w-8 h-8 rounded-full bg-[var(--color-hijau-zamrud)] flex items-center justify-center text-xs font-bold">M</div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4">
        
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[var(--color-hijau-botol)] flex items-center space-x-2">
            <i className="ri-ticket-2-line text-[var(--color-kuning-emas)]"></i>
            <span>Tiket Saya</span>
          </h1>
          <p className="text-xs text-[var(--color-forest-khaki)] mt-1">
            Pantau status transaksi token Midtrans dan jadwal pertemuan aktif Anda di sini.
          </p>
        </div>

        <div className="flex space-x-2 border-b border-[var(--color-abu-perak)] mb-6">
          {(['all', 'paid', 'pending'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-xs font-bold tracking-wide capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-[var(--color-hijau-uin)] text-[var(--color-hijau-uin)]'
                  : 'border-transparent text-[var(--color-forest-khaki)] hover:text-[var(--color-hijau-botol)]'
              }`}
            >
              {tab === 'all' ? 'Semua Tiket' : tab === 'paid' ? 'Sudah Dibayar' : 'Menunggu Kontribusi'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div 
                key={item.id}
                className="bg-[var(--color-putih-bersih)] rounded-xl border border-[var(--color-abu-perak)] shadow-sm overflow-hidden flex flex-col md:flex-row justify-between md:items-center p-5 gap-4 hover:border-[var(--color-sage)] transition"
              >
                
                {/* Bagian Kiri: Info Utama Tiket */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                      item.category === 'Konsultasi' 
                        ? 'bg-[var(--color-champagne)] text-[var(--color-emas-gelap)]' 
                        : 'bg-emerald-100 text-[var(--color-hijau-botol)]'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-semibold">
                      ID: {item.order_id}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--color-charcoal)] hover:text-[var(--color-hijau-uin)] transition">
                    {item.session_title}
                  </h3>

                  {/* Detil Waktu & Mentor */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-forest-khaki)] pt-1">
                    <div className="flex items-center space-x-1">
                      <i className="ri-user-star-line text-[var(--color-hijau-lumut)]"></i>
                      <span className="font-medium">{item.mentor}</span>
                    </div>
                    <div className="hidden md:inline text-gray-300">|</div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-calendar-event-line text-[var(--color-hijau-lumut)]"></i>
                      <span>
                        {new Date(item.start_time).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-time-line text-[var(--color-hijau-lumut)]"></i>
                      <span>
                        {new Date(item.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-gray-100 pt-3 md:pt-0 gap-2 min-w-[160px]">
                  <div className="md:mb-1">
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-tight">Total Komitmen</p>
                    <p className="text-sm font-extrabold text-[var(--color-hijau-botol)]">{formatRupiah(item.price)}</p>
                  </div>

                  {item.status === 'paid' && (
                    <button className="hidden md:flex items-center space-x-1 text-xs font-bold text-[var(--color-hijau-uin)] hover:text-[var(--color-hijau-botol)] transition mt-1">
                      <i className="ri-qr-code-line"></i>
                      <span>Buka Link Kelas</span>
                    </button>
                  )}
                  {item.status === 'pending' && (
                    <button className="hidden md:block bg-[var(--color-kuning-emas)] text-[var(--color-charcoal)] text-[11px] font-bold py-1 px-3 rounded hover:bg-[var(--color-emas-gelap)] transition shadow-sm mt-1">
                      Bayar Sekarang
                    </button>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-[var(--color-putih-bersih)] rounded-xl border border-[var(--color-abu-perak)]">
              <i className="ri-coupon-3-line text-4xl text-gray-300 block mb-2"></i>
              <p className="text-sm text-[var(--color-forest-khaki)] font-medium">Tidak ada tiket dalam kategori ini.</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-[var(--color-forest-khaki)] font-mono flex items-center justify-center space-x-1">
            <i className="ri-shield-check-line text-[var(--color-hijau-zamrud)]"></i>
            <span>Endpoint: <code>GET /api/v1/my-bookings</code> (Bearer Token Required)</span>
          </p>
        </div>

      </main>
    </div>
  );
}
