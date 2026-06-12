import React, { useState, useEffect } from "react";
import { GetApiData } from "~/core/Conections";
import type { BookingHistoryItem, BookingHistoryResponse } from "~/core/types";
import { RiCheckboxCircleLine, RiErrorWarningLine } from "@remixicon/react";

export default function HistoryKonsultasi() {
  const [bookingHistory, setBookingHistory] = useState<BookingHistoryItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "paid" | "pending">("all");

  // State tambahan untuk menampilkan feedback notifikasi pembayaran Midtrans ala Sign In/Sign Up
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function fetchHistoryData() {
      setIsLoading(true);
      setErrorMessage(null);

      // Ambil token dari penyimpanan lokal
      const token = localStorage.getItem("user_token");

      try {
        const response = await GetApiData<BookingHistoryResponse>(
          "/api/bookings/history",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === "success") {
          setBookingHistory(response.data);
        } else {
          setErrorMessage("Gagal memuat riwayat transaksi.");
        }
      } catch (error: any) {
        setErrorMessage(
          "Server tidak aktif atau terjadi masalah jaringan. Silakan coba lagi nanti.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistoryData();
  }, []);

  // Filter berdasarkan status tab aktif
  const filteredHistory = bookingHistory.filter((item) => {
    if (activeTab === "paid") return item.status === "paid";
    if (activeTab === "pending") return item.status === "pending";
    return true; // 'all'
  });

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // 4. Integrasi Tombol Bayar menggunakan Snap Midtrans di Client-side (Tanpa Alert)
  const handleMidtransPayment = (snapToken: string | null) => {
    setMessage(""); // Reset status message sebelum memproses

    if (!snapToken) {
      setIsSuccess(false);
      setMessage(
        "Token pembayaran tidak ditemukan. Silakan hubungi admin kampus.",
      );
      return;
    }

    if ((window as any).snap) {
      (window as any).snap.pay(snapToken, {
        onSuccess: () => {
          setIsSuccess(true);
          setMessage(
            "🎉 Pembayaran sukses terverifikasi! Tiket Anda telah aktif.",
          );

          // Opsional: Refresh data history agar status otomatis berubah dari pending ke paid
          // Anda bisa mengekstrak fetchHistoryData ke fungsi luar jika ingin auto-reload data
        },
        onPending: () => {
          setIsSuccess(true); // Dianggap info positif/menunggu proses bayar di ATM/Alfamart
          setMessage(
            "⏳ Transaksi disimpan. Menunggu penyelesaian pembayaran Anda.",
          );
        },
        onError: () => {
          setIsSuccess(false);
          setMessage(
            "❌ Transaksi pembayaran gagal. Silakan coba beberapa saat lagi.",
          );
        },
        onClose: () => {
          setIsSuccess(false);
          setMessage(
            "⚠️ Anda menutup halaman checkout tanpa menyelesaikan pembayaran.",
          );
        },
      });
    } else {
      setIsSuccess(false);
      setMessage(`Gagal memuat Snap. Token Transaksi Anda: ${snapToken}`);
    }
  };

  // Helper styling status badge berdasarkan enum BRD database laravel
  const getStatusBadge = (status: "pending" | "paid" | "failed") => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[var(--color-hijau-botol)]">
            <i className="ri-checkbox-circle-fill"></i>
            <span>Selesai / Lunas</span>
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-[var(--color-terracotta)]">
            <i className="ri-time-fill animate-pulse"></i>
            <span>Menunggu Pembayaran</span>
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
            <i className="ri-close-circle-fill"></i>
            <span>Gagal / Expired</span>
          </span>
        );
    }
  };

  return (
    <div className="h-full w-full bg-[var(--color-mint-lembut)] text-[var(--color-charcoal)] font-sans pb-12">
      {/* Top Navbar */}
      <nav className="bg-hijau-botol text-[var(--color-putih-bersih)] shadow-md h-16 flex items-center mb-8">
        <div className="max-w-5xl mx-auto px-4 w-full flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-[var(--color-soft-ochre)] transition">
            <i className="ri-home-4-line text-lg"></i>
            <span className="font-medium text-sm">Dashboard Utama</span>
          </div>
          <span className="font-bold text-sm tracking-wide">
            Riwayat Tiket & Konsultasi
          </span>
          <div className="w-8 h-8 rounded-full bg-[var(--color-hijau-zamrud)] flex items-center justify-center text-xs font-bold">
            M
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[var(--color-hijau-botol)] flex items-center space-x-2">
            <i className="ri-ticket-2-line text-[var(--color-kuning-emas)]"></i>
            <span>Tiket Saya</span>
          </h1>
          <p className="text-xs text-[var(--color-forest-khaki)] mt-1">
            Pantau status transaksi token Midtrans dan jadwal pertemuan aktif
            Anda di sini.
          </p>
        </div>

        {/* PENEMPATAN BANNER MESSAGE NOTIFIKASI MIDTRANS DI SINI */}
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
                <RiCheckboxCircleLine size={20} className="text-hijau-zamrud" />
              ) : (
                <RiErrorWarningLine size={20} className="text-terracotta" />
              )}
            </div>
            <div>{message}</div>
          </div>
        )}

        {/* Tab Status Bar */}
        <div className="flex space-x-2 border-b border-[var(--color-abu-perak)] mb-6">
          {(["all", "paid", "pending"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-xs font-bold tracking-wide capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "border-[var(--color-hijau-uin)] text-[var(--color-hijau-uin)]"
                  : "border-transparent text-[var(--color-forest-khaki)] hover:text-[var(--color-hijau-botol)]"
              }`}
            >
              {tab === "all"
                ? "Semua Tiket"
                : tab === "paid"
                  ? "Sudah Dibayar"
                  : "Menunggu Kontribusi"}
            </button>
          ))}
        </div>

        {/* List Content Container */}
        <div className="space-y-4">
          {/* KONDISI 1: Sedang Memuat Data Dari Server */}
          {isLoading && (
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-putih-bersih rounded-xl h-28 border border-[var(--color-abu-perak)]"
                />
              ))}
            </div>
          )}

          {/* KONDISI 2: Komponen Tampilan Jika Server Tidak Aktif / Offline */}
          {!isLoading && errorMessage && (
            <div className="text-center py-10 px-4 bg-[var(--color-putih-bersih)] rounded-xl border border-rose-200 shadow-sm">
              <i className="ri-signal-wifi-off-line text-4xl text-rose-500 block mb-3"></i>
              <h3 className="font-bold text-base text-[var(--color-charcoal)]">
                Gagal Menghubungkan Layanan
              </h3>
              <p className="text-xs text-[var(--color-forest-khaki)] mt-1 max-w-md mx-auto">
                {errorMessage}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-xs bg-[var(--color-hijau-botol)] text-[var(--color-putih-bersih)] py-2 px-4 rounded-lg font-bold hover:bg-[var(--color-hijau-uin)] transition"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* KONDISI 3: Server Aktif Namun Transaksi Memang Kosong */}
          {!isLoading && !errorMessage && filteredHistory.length === 0 && (
            <div className="text-center py-12 bg-[var(--color-putih-bersih)] rounded-xl border border-[var(--color-abu-perak)]">
              <i className="ri-coupon-3-line text-4xl text-gray-300 block mb-2"></i>
              <p className="text-sm text-[var(--color-forest-khaki)] font-medium">
                Tidak ada riwayat tiket dalam kategori ini.
              </p>
            </div>
          )}

          {/* KONDISI 4: Data Ditemukan & Berhasil Merender Loop Item */}
          {!isLoading &&
            !errorMessage &&
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--color-putih-bersih)] rounded-xl border border-abu-perak shadow-sm overflow-hidden flex flex-col md:flex-row justify-between md:items-center p-5 gap-4 hover:border-[var(--color-sage)] transition"
              >
                {/* Bagian Kiri: Info Utama Tiket */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-100 text-[var(--color-hijau-botol)]">
                      Pelatihan
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-semibold">
                      ORDER ID: {item.order_id}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--color-charcoal)] hover:text-[var(--color-hijau-uin)] transition">
                    {item.mentoring
                      ? item.mentoring.title
                      : "Nama Kelas Mentoring Tidak Tersedia"}
                  </h3>

                  {/* Detil Waktu Pertemuan */}
                  {item.mentoring && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-forest-khaki)] pt-1">
                      <div className="flex items-center space-x-1">
                        <i className="ri-calendar-event-line text-[var(--color-hijau-lumut)]"></i>
                        <span>
                          {new Date(
                            item.mentoring.start_time,
                          ).toLocaleDateString("id-ID", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="hidden md:inline text-gray-300">|</div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line text-[var(--color-hijau-lumut)]"></i>
                        <span>
                          {new Date(
                            item.mentoring.start_time,
                          ).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          WIB
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bagian Kanan: Status & Biaya */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-gray-100 pt-3 md:pt-0 gap-2 min-w-[160px]">
                  <div className="md:mb-1">{getStatusBadge(item.status)}</div>

                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-tight">
                      Total Komitmen
                    </p>
                    <p className="text-sm font-extrabold text-[var(--color-hijau-botol)]">
                      {formatRupiah(item.mentoring ? item.mentoring.price : 0)}
                    </p>
                  </div>

                  {/* Aksi Kondisional Berdasarkan Status Pembayaran */}
                  {item.status === "paid" && (
                    <button className="hidden md:flex items-center space-x-1 text-xs font-bold text-[var(--color-hijau-uin)] hover:text-[var(--color-hijau-botol)] transition mt-1">
                      <i className="ri-links-line"></i>
                      <span>Masuk Ruang Belajar</span>
                    </button>
                  )}
                  {item.status === "pending" && (
                    <button
                      onClick={() => handleMidtransPayment(item.snap_token)}
                      className="bg-[var(--color-kuning-emas)] text-[var(--color-charcoal)] text-[11px] font-bold py-1.5 px-3 rounded-lg hover:bg-[var(--color-soft-ochre)] transition shadow-sm mt-1 cursor-pointer"
                    >
                      Bayar Sekarang
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Info Endpoint Footer Log */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-[var(--color-forest-khaki)] font-mono flex items-center justify-center space-x-1">
            <i className="ri-shield-check-line text-[var(--color-hijau-zamrud)]"></i>
            <span>
              Endpoint Terkoneksi: <code>GET /api/bookings/history</code>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
