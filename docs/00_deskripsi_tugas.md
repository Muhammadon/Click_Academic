# Deskripsi Proyek: Click Academic

---

Proyek ini bertujuan untuk merancang, mengembangkan, dan mendeploy **Click Academic**, sebuah platform pemesanan jadwal kelas dan mentoring akademik. Aplikasi ini dibangun menggunakan arsitektur berbasis layanan (*service-based architecture*) yang memisahkan aplikasi menjadi dua sistem independen (Frontend dan Backend) yang saling berkomunikasi melalui RESTful API. 

Pembagian peran dalam tim dirancang dengan pendekatan egaliter, di mana setiap anggota adalah rekan kerja (*partner*) yang memegang otoritas penuh atas domain teknisnya, namun tetap berkolaborasi erat untuk memastikan ekosistem layanan berjalan dengan mulus.

Proyek ini mengintegrasikan layanan pihak ketiga (*third-party API*) yaitu **Midtrans Payment Gateway** untuk memproses fungsionalitas inti transaksi. Penggunaan API eksternal ini memastikan aplikasi memiliki standar industri dalam menangani pembuatan transaksi (Snap Token) dan memverifikasi status pembayaran secara otomatis melalui *Webhook*.

---

## Ketentuan Umum & Spesifikasi Teknologi

- Komposisi tim terdiri dari **3 orang** dengan pembagian peran: Frontend Developer, Backend Developer, dan DevOps Engineer.
- **Backend:** Sepenuhnya dibangun menggunakan framework **Laravel 12** yang beroperasi murni sebagai penyedia API (tanpa antarmuka *view*).
- **Frontend:** Dibangun menggunakan ekosistem **React** yang beroperasi pada *origin* terpisah dan merender data JSON dari Backend.
- **Database:** Menggunakan relasional database **MySQL**.
- **Kontrak API:** Komunikasi data diamankan menggunakan *Form Request* untuk validasi input dan *API Resource* untuk standarisasi output JSON.
- Dokumentasi dan *source code* dikelola secara terpusat melalui repositori Git.

---

## Role Pengembang

### 1. Frontend Developer
Bertanggung jawab atas antarmuka pengguna (*user interface*) dan manajemen *state* di sisi klien. Peran ini mencakup desain halaman, penyimpanan *Bearer Token* secara aman untuk autentikasi (Sanctum), serta integrasi *Snap Token* dari Midtrans untuk memicu *pop-up* pembayaran (QRIS/Transfer/dll) di layar pengguna. Frontend memastikan data JSON dari Backend dirender dengan optimal dan responsif.

### 2. Backend Developer
Bertanggung jawab atas logika bisnis, arsitektur basis data (*Migrations & Models*), dan penyediaan *endpoint* API. Seluruh layanan ini dibangun menggunakan Laravel. Peran ini mencakup implementasi autentikasi API, validasi data, pengolahan transaksi Midtrans (Core API), dan pengelolaan *Webhook* untuk memverifikasi *signature key* pembayaran secara *real-time*.

### 3. DevOps Engineer
Bertanggung jawab atas manajemen konfigurasi dan kelancaran lingkungan operasional. Peran ini mengelola siklus sinkronisasi Git (termasuk *merge conflict*), konfigurasi variabel *environment* (`.env`), pengaturan CORS (*Cross-Origin Resource Sharing*) lintas domain, serta menyediakan infrastruktur *tunneling* publik (misal: Ngrok) untuk menjembatani server *localhost* dengan layanan eksternal Midtrans.

---

## Daftar Fitur Utama & Struktur API

### Fitur 1: Autentikasi Pengguna & Manajemen Sesi
* **Deskripsi:** Sistem registrasi akun, masuk (login) untuk mendapatkan *Bearer Token*, pengambilan data profil *user* yang sedang aktif, dan keluar (logout) untuk menghancurkan token.
* **Sumber Data:** Internal System (Laravel Sanctum).
* **Endpoint API:** * `POST /register`
  * `POST /login`
  * `GET /user` (Protected)
  * `POST /logout` (Protected)

### Fitur 2: Katalog & Detail Jadwal Mentoring
* **Deskripsi:** Menampilkan daftar seluruh jadwal kelas atau mentoring akademik yang tersedia untuk dipesan, serta pengambilan detail spesifik dari satu kelas tertentu.
* **Sumber Data:** Internal System (Database MySQL).
* **Endpoint API:** * `GET /mentorings`
  * `GET /mentorings/{id}` (Protected)

### Fitur 3: Checkout Transaksi (Booking Create)
* **Deskripsi:** Fitur tertutup di mana pengguna yang sudah *login* dapat membuat pesanan tiket baru. Sistem backend akan berkomunikasi dengan server Midtrans untuk menerbitkan *Snap Token* yang akan dikembalikan ke Frontend.
* **Sumber Data:** Internal System & Third-Party API (Midtrans Snap).
* **Endpoint API:** * `POST /booking/create` (Protected)

### Fitur 4: Payment Callback (Webhook Midtrans)
* **Deskripsi:** Sebuah "pintu belakang" terbuka yang bertugas menerima laporan HTTP POST secara otomatis dari server Midtrans setiap kali pengguna menyelesaikan pembayaran, memverifikasi keamanannya, dan mengupdate status tiket di database.
* **Sumber Data:** Third-Party API (Midtrans HTTP Notification).
* **Endpoint API:** * `POST /booking/callback` (Public / Non-Protected)

### Fitur 5: Riwayat Pemesanan (History)
* **Deskripsi:** Dasbor personal yang memungkinkan pengguna untuk melihat seluruh daftar kelas yang pernah mereka *booking* beserta status pembayarannya secara *real-time*.
* **Sumber Data:** Internal System.
* **Endpoint API:** * `GET /booking/history` (Protected)
  * `GET /mentorings/history` (Protected)