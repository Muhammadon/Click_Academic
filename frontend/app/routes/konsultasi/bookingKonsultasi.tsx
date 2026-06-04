import React, { useState } from 'react';
import type { TypeApi } from '~/core/type';

// Interface Data berdasarkan tabel sessions & bookings di BRD
// interface SessionDetail {
//   id: number;
//   title: string;
//   mentor: string;
//   price: number;
//   start_time: string;
//   end_time: string;
//   description: string;
//   category: 'Konsultasi' | 'Pelatihan';
//   status: 'available' | 'full';
// }

export default function BookingKonsultasi() {
  // Mock data detail sesi yang sedang dipilih (contoh mengambil Session ID 1 / 2)
  const [session] = useState<TypeApi>({
    id: 1,
    title: "Pelatihan Dasar Laravel (On-Demand)",
    mentor: "Nama Mentor", // Sesuai contoh response Fitur 2 di BRD
    price: 15000,          // Sesuai tabel sessions & Fitur 2
    start_time: "2026-06-01 10:00:00",
    end_time: "2026-06-01 12:00:00",
    description: "Membahas arsitektur backend menggunakan Laravel, pembuatan REST API, integrasi database MySQL, hingga pembungkusan aplikasi menggunakan Docker agar siap di-deploy oleh tim DevOps.",
    category: "Pelatihan",
    status: "available"
  });

  // State untuk alur loading pemesanan (Simulasi Request ke Backend & Midtrans)
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<'idle' | 'created_order' | 'waiting_payment' | 'success'>('idle');
  const [snapToken, setSnapToken] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Simulasi Fitur 3: Create Booking & Request Midtrans
  const handlePaymentInitiation = () => {
    setIsProcessing(true);
    setBookingStep('created_order');

    // Meniru jeda waktu hit API ke Backend Laravel & Midtrans Snap
    setTimeout(() => {
      const mockOrderId = `TRX-${Math.floor(100000 + Math.random() * 900000)}`; // Contoh: TRX-998877
      const mockSnapToken = "b789123-abc-" + Math.random().toString(36).substring(2, 7);

      setOrderId(mockOrderId);
      setSnapToken(mockSnapToken);
      setIsProcessing(false);
      setBookingStep('waiting_payment');
    }, 1500);
  };

  // Simulasi jika pembayaran diselesaikan (meniru trigger sukses dari Webhook Midtrans)
  const handleSimulatePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingStep('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-mint-lembut)] text-[var(--color-charcoal)] font-sans pb-12">
      
      {/* Top Navbar */}
      <nav className="bg-[var(--color-hijau-botol)] text-[var(--color-putih-bersih)] shadow-md h-16 flex items-center mb-8">
        <div className="max-w-4xl mx-auto px-4 w-full flex items-center justify-between">
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-[var(--color-soft-ochre)] transition">
            <i className="ri-arrow-left-line text-lg"></i>
            <span>Kembali ke Daftar</span>
          </button>
          <span className="font-bold text-sm tracking-wide">Konfirmasi & Pembayaran</span>
          <div className="w-8 h-8 rounded-full bg-[var(--color-hijau-zamrud)] flex items-center justify-center text-xs font-bold">M</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            
            <div className="bg-[var(--color-putih-bersih)] rounded-2xl p-6 shadow-sm border border-[var(--color-abu-perak)]">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-[var(--color-hijau-botol)] mb-4">
                <i className="ri-bookmark-3-line mr-1"></i>
                {session.category}
              </span>
              
              <h1 className="text-xl md:text-2xl font-bold text-[var(--color-charcoal)] leading-tight mb-4">
                {session.title}
              </h1>

              <div className="flex items-center space-x-3 bg-[var(--color-mint-lembut)] p-3 rounded-xl border border-[var(--color-sage)] mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--color-hijau-uin)] text-white flex items-center justify-center font-bold">
                  {session.mentor.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-[var(--color-forest-khaki)] font-medium">Mentor / Pemateri</p>
                  <p className="text-sm font-bold text-[var(--color-hijau-botol)]">{session.mentor}</p>
                </div>
              </div>

              <h4 className="text-sm font-bold text-[var(--color-dark-slate)] mb-2">Deskripsi Kelas / Konsultasi:</h4>
              <p className="text-sm text-[var(--color-forest-khaki)] leading-relaxed mb-6">
                {session.description}
              </p>

              <hr className="border-[var(--color-abu-perak)] my-4" />

              {/* Waktu & Lokasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-calendar-todo-fill text-[var(--color-hijau-uin)] text-lg mt-0.5"></i>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Tanggal</p>
                    <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                      {new Date(session.start_time).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-time-fill text-[var(--color-hijau-uin)] text-lg mt-0.5"></i>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Waktu / Jam</p>
                    <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                      {new Date(session.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {new Date(session.end_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-[var(--color-cream)] border border-[var(--color-soft-ochre)] rounded-xl p-4 flex space-x-3">
              <i className="ri-shield-user-fill text-xl text-[var(--color-emas-gelap)]"></i>
              <div className="text-xs text-[var(--color-dark-slate)] leading-relaxed">
                <span className="font-bold">Ketentuan Pembatalan:</span> Dana komitmen (commitment fee) yang telah dibayarkan melalui sistem Midtrans tidak dapat ditarik kembali jika mahasiswa membatalkan secara sepihak, kecuali jadwal diubah atau dibatalkan oleh pihak mentor terkait.
              </div>
            </div>

          </div>

          <div className="md:col-span-1">
            <div className="bg-[var(--color-putih-bersih)] rounded-2xl p-6 shadow-sm border border-[var(--color-abu-perak)] sticky top-24 space-y-6">
              
              <h3 className="font-bold text-base text-[var(--color-charcoal)] border-b border-[var(--color-abu-perak)] pb-3">
                Ringkasan Transaksi
              </h3>

              {/* Rincian Biaya */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-[var(--color-forest-khaki)]">
                  <span>Biaya Sesi ({session.category})</span>
                  <span>{formatRupiah(session.price)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--color-forest-khaki)]">
                  <span>Pajak & Administrasi</span>
                  <span className="text-emerald-600">Gratis</span>
                </div>
                <hr className="border-[var(--color-abu-perak)]" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[var(--color-charcoal)]">Total Bayar</span>
                  <span className="text-lg font-extrabold text-[var(--color-hijau-botol)]">{formatRupiah(session.price)}</span>
                </div>
              </div>

              {/* Alur Interaksi Dinamis Berdasarkan State Pemesanan */}
              {bookingStep === 'idle' && (
                <button
                  onClick={handlePaymentInitiation}
                  className="w-full bg-[var(--color-hijau-uin)] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm hover:bg-[var(--color-hijau-botol)] transition active:scale-98 flex items-center justify-center space-x-2"
                >
                  <i className="ri-secure-payment-line text-base"></i>
                  <span>Konfirmasi & Bayar</span>
                </button>
              )}

              {bookingStep === 'created_order' && (
                <div className="text-center py-4 bg-gray-50 border border-dashed rounded-xl space-y-2">
                  <div className="w-6 h-6 border-2 border-[var(--color-hijau-uin)] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs text-[var(--color-forest-khaki)] font-medium">Menghubungi Midtrans Gateway...</p>
                </div>
              )}

              {bookingStep === 'waiting_payment' && (
                <div className="space-y-4 p-4 bg-amber-50 border border-[var(--color-dusty-rose)] rounded-xl">
                  <div className="flex items-center space-x-2 text-[var(--color-terracotta)] font-bold text-xs">
                    <i className="ri-time-line animate-pulse"></i>
                    <span>Menunggu Pembayaran (QRIS/Bank)</span>
                  </div>
                  
                  <div className="text-[11px] text-gray-600 bg-white p-2 rounded border space-y-1 font-mono">
                    <div><span className="font-semibold text-gray-400">Order ID:</span> {orderId}</div>
                    <div className="truncate"><span className="font-semibold text-gray-400">Token:</span> {snapToken}</div>
                  </div>

                  {/* Tombol Simulasi Pembayaran Sukses */}
                  <button
                    onClick={handleSimulatePaymentSuccess}
                    disabled={isProcessing}
                    className="w-full bg-[var(--color-kuning-emas)] hover:bg-[var(--color-emas-gelap)] text-[var(--color-charcoal)] font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition flex items-center justify-center space-x-1"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <i className="ri-checkbox-circle-line"></i>
                        <span>Simulasi Bayar Sukses (Webhook)</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {bookingStep === 'success' && (
                <div className="p-4 bg-emerald-50 border border-[var(--color-hijau-zamrud)] rounded-xl text-center space-y-3">
                  <div className="w-10 h-10 bg-[var(--color-hijau-zamrud)] text-white rounded-full flex items-center justify-center mx-auto text-xl">
                    <i className="ri-check-line"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-hijau-botol)]">Pembayaran Sukses!</h4>
                    <p className="text-[11px] text-[var(--color-forest-khaki)] mt-1">Status booking di tabel telah diubah menjadi <strong>'paid'</strong>.</p>
                  </div>
                  <button className="w-full bg-[var(--color-hijau-botol)] text-white text-xs py-2 rounded-lg font-medium hover:bg-emerald-900 transition">
                    Lihat Tiket Saya
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[var(--color-forest-khaki)] pt-2">
                <i className="ri-lock-2-fill text-[var(--color-hijau-lumut)]"></i>
                <span>Secure payment powered by Midtrans Snap API</span>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
