# API Specification

> Dokumentasikan setiap endpoint yang dikembangkan maupun yang dikonsumsi dari layanan eksternal.
> Salin dan ulangi blok di bawah untuk setiap endpoint tambahan.

---

### API Contract 

#### - Authentication Module


 1. **Register Akun Baru**

Membuat akun pengguna baru dengan role default sebagai `student`.

* **Endpoint:** `/register`
* **Method:** `POST`
* **Headers:**
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}

```
* **Request Body (JSON):**
```json
{
  "username": "budi_akademik",
  "email": "budi@univ.ac.id",
  "password": "secretpassword123"
}

```


* **Response Sukses (`201 Created`):**
```json
{
  "status": "success",
  "message": "Registrasi berhasil",
  "data": {
    "id": 1,
    "username": "budi_akademik",
    "email": "budi@univ.ac.id",
    "role": "student",
    "created_at": "2026-06-19T14:24:33.000000Z",
    "updated_at": "2026-06-19T14:24:33.000000Z"
  }
}

```


* **Response Error Validasi (`422 Unprocessable Entity`):**
```json
{
  "status": "error",
  "message": "Email sudah terdaftar di platform kami.",
  "errors": {
    "email": ["Email sudah terdaftar di platform kami."]
  }
}

```
2. **Login (Autentikasi User)**

Memvalidasi kredensial pengguna dan mengembalikan token akses Laravel Sanctum.

* **Endpoint:** `/login`
* **Method:** `POST`
* **Request Body (JSON):**
```json
{
  "email": "budi@univ.ac.id",
  "password": "secretpassword123"
}

```

* **Response Sukses (`200 OK`):**
```json
{
  "status": "success",
  "message": "Selamat datang budi_akademik ke Click Academic",
  "token": "1|abcdefghijklmnopqrstuvwxyz1234567890",
  "data": {
    "id": 1,
    "username": "budi_akademik",
    "email": "budi@univ.ac.id",
    "role": "student"
  }
}

```


* **Response Error Gagal Autentikasi (`401 Unauthorized`):**
```json
{
  "status": "error",
  "message": "password yang Anda masukkan salah."
}

```
3. **Get User Profile**

Mengambil data profil lengkap milik user yang sedang aktif login menggunakan token bearer.

* **Endpoint:** `/user` (atau sesuaikan dengan konfigurasi route profile Anda)
* **Method:** `GET`
* **Headers:**
```json
{
  "Authorization": "Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890",
  "Accept": "application/json"
}

```

* **Response Sukses (`200 OK`):**
```json
{
  "status": "success",
  "message": "Data user berhasil login",
  "total_kelas"  : 2, 
  "data": {
    "id": 1,
    "username": "budi_akademik",
    "email": "budi@univ.ac.id",
    "role": "student"
  }
}

```


* **Response Error Tanpa Token (`401 Unauthorized`):**
```json
{
  "status": "error",
  "message": "User tidak terautentikasi",
  "data": []
}

```
 4. **Logout (Revoke Token)**

Menghapus token akses aktif yang sedang digunakan saat ini dari database server.

* **Endpoint:** `/logout`
* **Method:** `POST`
* **Headers:**
```json
{
  "Authorization": "Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890",
  "Accept": "application/json"
}

```

* **Response Sukses (`200 OK`):**
```json
{
  "status": "success",
  "message": "Logout berhasil, token telah dihapus"
}

```

#### API Contract - Booking & Payment Module (Midtrans)

1. **Create Checkout Session (Generate Snap Token)**

Membuat data reservasi baru di database dan meminta token transaksi (`snap_token`) langsung dari server Midtrans.

* **Endpoint:** `/booking/create`
* **Method:** `POST`
* **Headers:**
```json
{
  "Authorization": "Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890",
  "Content-Type": "application/json",
  "Accept": "application/json"
}

```


* **Request Body (JSON):**
```json
{
  "mentoring_id": 5
}

```


* **Response Sukses (`201 Created`):**
```json
{
  "status": "success",
  "message": "Token checkout Midtrans berhasil dibuat",
  "snap_token": "4683a48e-d9da-4b82-9602-xxxxxxxxxxxx",
  "data": {
    "id": 14,
    "student_id": 1,
    "mentoring_id": 5,
    "order_id": "BOOK-65D1F8E3B9A1C",
    "status": "pending",
    "snap_token": "4683a48e-d9da-4b82-9602-xxxxxxxxxxxx",
    "updated_at": "2026-06-19T14:40:00.000000Z",
    "created_at": "2026-06-19T14:40:00.000000Z"
  }
}

```


* **Response Error Validasi / Tidak Ditemukan (`404 Not Found` / `422`):**
```json
{
  "status": "error",
  "message": "Kelas mentoring tidak ditemukan"
}

```
 2. **Get Transaction History**

Mengambil seluruh daftar riwayat transaksi murni dari tabel `bookings` milik pengguna yang sedang login.

* **Endpoint:** `/booking/history`
* **Method:** `GET`
* **Headers:**
```json
{
  "Authorization": "Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890",
  "Accept": "application/json"
}

```


* **Response Sukses (`200 OK`):**
```json
{
  "status": "success",
  "message": "Riwayat transaksi berhasil dimuat.",
  "data": [
    {
      "id": 14,
      "student_id": 1,
      "mentoring_id": 5,
      "order_id": "BOOK-65D1F8E3B9A1C",
      "status": "pending",
      "snap_token": "4683a48e-d9da-4b82-9602-xxxxxxxxxxxx",
      "created_at": "2026-06-19T14:40:00.000000Z",
      "updated_at": "2026-06-19T14:40:00.000000Z"
    }
  ]
}

```
3. ***Midtrans Webhook Notification Callback**

Endpoint khusus tanpa token bearer yang didaftarkan pada Dashboard Midtrans untuk memperbarui status transaksi secara otomatis (*Settlement*, *Expire*, *Cancel*).

* **Endpoint:** `/booking/callback`
* **Method:** `POST`
* **Headers:**
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}

```

* **Payload Request (Dikirim otomatis oleh Server Midtrans):**
```json
{
  "transaction_time": "2026-06-19 21:42:10",
  "transaction_status": "settlement",
  "status_code": "200",
  "signature_key": "7b5a8e...3f2c1d (SHA512 Generated Key)",
  "order_id": "BOOK-65D1F8E3B9A1C",
  "gross_amount": "150000.00",
  "payment_type": "bank_transfer"
}

```

* **Response Webhook Berhasil (`200 OK`):**
```json
{
  "status": "success",
  "message": "Notifikasi Midtrans berhasil diproses"
}

```

* **Response Error Signature Palsu (`403 Forbidden`):**
```json
{
  "status": "error",
  "message": "Invalid signature key"
}

```
#### API Contract - Mentoring Module

1. **Get All Mentoring Classes (Publik)**

Mengambil semua daftar kelas bimbingan yang tersedia di platform tanpa memerlukan token login.

* **Endpoint:** `/mentorings`
* **Method:** `GET`
* **Headers:**
```json
{
  "Accept": "application/json"
}

```
* **Response Sukses (`200 OK`):**
```json
{
  "status": "success",
  "message": "Berhasil mengambil daftar kelas",
  "data": [
    {
      "id": 1,
      "title": "Bimbingan Skripsi Teknik Informatika",
      "description": "Pelatihan intensif penyusunan bab 1-5 dan persiapan sidang.",
      "price": 150000,
      "start_time": "2026-07-01 09:00:00",
      "end_time": "2026-07-01 12:00:00",
      "status": "available",
      "created_at": "2026-06-19T10:00:00.000000Z",
      "updated_at": "2026-06-19T10:00:00.000000Z"
    }
  ]
}

```
2. **Get Detail Mentoring Class**

Mengambil data lengkap dan spesifik dari satu kelas berdasarkan ID uniknya.

* **Endpoint:** `/mentorings/{id}` (Contoh: `/mentorings/1`)
* **Method:** `GET`
* **Response Sukses (`200 OK`):**
```json
{
  "status": "success",
  "message": "Detail kelas berhasil dimuat",
  "data": {
    "id": 1,
    "title": "Bimbingan Skripsi Teknik Informatika",
    "description": "Pelatihan intensif penyusunan bab 1-5 dan persiapan sidang.",
    "price": 150000,
    "start_time": "2026-07-01 09:00:00",
    "end_time": "2026-07-01 12:00:00",
    "status": "available",
    "created_at": "2026-06-19T10:00:00.000000Z",
    "updated_at": "2026-06-19T10:00:00.000000Z"
  }
}

```


* **Response Error Id Tidak Ditemukan (`404 Not Found`):**
```json
{
  "status": "error",
  "message": "Kelas mentoring yang Anda cari tidak ditemukan atau telah dihapus."
}

```

3. **Get User Mentoring History (Eager Loaded)**

Mengambil daftar kelas mentoring yang **pernah dipesan/di-booking** oleh user yang sedang login saat ini. Format data dikembalikan dalam bentuk array murni skema objek kelas (`Mentoring[]`).

* **Endpoint:** `/mentorings/history`
* **Method:** `GET`
* **Headers:**
```json
{
  "Authorization": "Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890",
  "Accept": "application/json"
}

```


* **Response Sukses (`200 OK`):**
```json
{
  "status": "success",
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "Bimbingan Skripsi Teknik Informatika",
      "description": "Pelatihan intensif penyusunan bab 1-5 dan persiapan sidang.",
      "price": 150000,
      "start_time": "2026-07-01 09:00:00",
      "end_time": "2026-07-01 12:00:00",
      "status": "available"
    }
  ]
}

```
