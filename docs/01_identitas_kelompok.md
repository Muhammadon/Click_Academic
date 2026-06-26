# Identitas Kelompok

---

**Nama Kelompok:** `Kelompok 3`

**Nama Proyek / Aplikasi:** `click_akademic`

**Jumlah Anggota:** `3 (tiga) orang`

**Repositori:** `https://github.com/Muhammadon/Click_Academic`

---

## Anggota & Role

**Anggota 1**
- Nama Lengkap: `muhammadon`
- NIM: `230705077`
- Role: `backend Developer`
- Teknologi: `Laravel, mysql, Git`

**Anggota 2**
- Nama Lengkap: `M. Nadhar`
- NIM: `230705083`
- Role: `Front Developer`
- Teknologi: `vite, react`

**Anggota 3**
- Nama Lengkap: `Alvin sahri`
- NIM: `220705038`
- Role: `DevOps Engineer`
- Teknologi: `Docker, GitHub`

---
## Stack Teknologi

**Frontend:** `React, Vite, Tailwind CSS`

*(Digunakan untuk membangun antarmuka pengguna yang responsif, merender data JSON secara dinamis, dan memicu pop-up pembayaran Midtrans di sisi klien.)*

**Backend:** `Laravel (REST API)`

*(Framework backend utama yang beroperasi tanpa view, khusus untuk mengelola logika bisnis, autentikasi Sanctum, integrasi API pihak ketiga, dan manajemen webhook.)*

**Database:** `MySQL`

*(Digunakan untuk menyimpan data mahasiswa, jadwal kelas/mentoring, dan riwayat pemesanan tiket.)*

**DevOps / Infrastruktur:** `Git, GitHub`

*(Digunakan untuk version control, kolaborasi tim secara terpusat, dan penyediaan public tunneling (Ngrok) agar localhost backend dapat menerima webhook dari layanan eksternal.)*

---

## Arsitektur Aplikasi

Click Academic menggunakan arsitektur *client-server* berbasis *service-oriented architecture* (SOA). Frontend dibangun menggunakan React dan berkomunikasi dengan backend Laravel melalui RESTful API berformat JSON. Backend bertugas mengelola autentikasi pengguna, penyajian data katalog kelas, pembuatan transaksi pesanan, serta integrasi kunci keamanan dengan layanan pihak ketiga (Midtrans). Seluruh data relasional disimpan pada database MySQL. Ekosistem pengembangan dikelola secara terpusat melalui GitHub, dengan dukungan *tunneling* publik untuk memfasilitasi pengujian komunikasi API dua arah.

### Aplikasi 1 — Frontend

- **Nama Aplikasi:** `Click Academic Frontend`
- **Deskripsi Singkat:** Antarmuka pengguna yang digunakan mahasiswa untuk melihat katalog sesi mentoring, mengelola proses *checkout* pemesanan kelas, melakukan pembayaran via *Snap Token*, serta memantau riwayat tiket kelas yang dimiliki.
- **Berkomunikasi dengan:** `Click Academic API Service` (Data Internal) dan `Midtrans Snap API` (Payment Gateway Pop-up).

### Aplikasi 2 — Backend (Laravel)

- **Nama Aplikasi / Service:** `Click Academic API Service`
- **Deskripsi Singkat:** Layanan backend murni (API-only) berbasis Laravel yang menyediakan layanan autentikasi (Sanctum), manajemen ketersediaan jadwal mentoring, pembuatan *Order ID* transaksi, pengamanan lalu lintas data, serta pemrosesan *Payment Callback/Webhook* secara otomatis.
- **Menyediakan layanan untuk:** `Click Academic Frontend` (Konsumsi Data) dan `Midtrans Server` (Penerimaan Notifikasi Status Pembayaran).