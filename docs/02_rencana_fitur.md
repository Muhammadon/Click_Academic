# Spesifikasi Sistem Click Academic
**Stack Teknologi:** Backend (Laravel), Frontend (React), DevOps (Docker, Ngrok)

---

## 1. Deskripsi Proyek
**Click Academic** adalah platform *on-demand* yang dirancang untuk memfasilitasi mahasiswa dalam memesan jadwal konsultasi akademik atau mendaftar kelas pelatihan perangkat lunak. Sistem ini dibangun dengan arsitektur berbasis layanan yang modular:

* **Frontend (React):** Antarmuka sisi klien yang interaktif untuk melihat katalog jadwal, melakukan *checkout*, dan memicu *pop-up* pembayaran.
* **Backend (Laravel 12):** Penyedia layanan murni (REST API) yang menangani autentikasi, validasi *API Contract*, dan manajemen relasi basis data.
* **Third-Party API (Midtrans):** Gerbang pembayaran (*Payment Gateway*) untuk memproses transaksi tiket secara instan dan aman.
* **Infrastruktur (Docker & Ngrok):** Membungkus ekosistem aplikasi ke dalam kontainer untuk konsistensi lingkungan operasional, didukung *tunneling* publik untuk integrasi *Webhook*.

---

## 2. Rancangan Basis Data (MySQL)
*Catatan: Penamaan tabel jadwal menggunakan `mentorings` untuk menghindari bentrokan (collision) dengan tabel sistem bawaan Laravel.*

* **Tabel `users`** (Data Pengguna)
    * Kolom: `id` (PK), `name`, `email`, `password`, `role`, `created_at`, `updated_at`.
* **Tabel `mentorings`** (Katalog Kelas/Konsultasi)
    * Kolom: `id` (PK), `title` (misal: "Pelatihan Dasar React & Vite"), `description`, `price` (biaya komitmen, misal: 15000), `start_time`, `end_time`, `status` (enum: 'available', 'full'), `created_at`, `updated_at`.
* **Tabel `bookings`** (Transaksi Pemesanan)
    * Kolom: `id` (PK), `student_id` (FK ke `users`), `mentoring_id` (FK ke `mentorings`), `order_id` (Unik, misal: TRX-12345), `status` (enum: 'pending', 'paid', 'failed'), `snap_token`, `created_at`, `updated_at`.

---

## 3. Spesifikasi API (5 Fitur Utama)

### Fitur 1: Autentikasi Pengguna (Login)
* **Method:** `POST`
* **URL:** `/api/login`
* **Sumber:** Internal System (Laravel Sanctum)
* **Deskripsi:** Memvalidasi kredensial mahasiswa dan menerbitkan *Bearer Token* untuk akses sistem.

**Request Body:**
```json
{
  "email": "mahasiswa@kampus.ac.id",
  "password": "password123"
}