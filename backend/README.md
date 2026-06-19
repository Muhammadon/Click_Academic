<h1 align="center"> BackEnd </h1>

### App Info

- User akan mendapatkan token bare untuk login di api `register`

### Tech info

- `php` : bahasan utama
- `laravel` (versi 13) : framework utama untuk building web app

### App info

- user yang login menggunakan token yang di kirim kembali ke server uanutk mengakses boking dan sejenisnya

### Declare Command

##### execusi Feke data

sudah ada di seeder , jadi cukup jalankan seeder nya

```bash
# jalkan seeder
php artisan db:seed

# buat bener bener baru , alias refersh
php artisan migrate:fresh --seed
```

##### running for external

```bash
# jalkan spesifik untuk open Ip sendiri misalnya ip4 adlah = 192.168.1.10
php artisan serve --host=192.168.1.10 --port=8000

```

##### test midrrant

```bashcurl -X POST http://127.0.0.1:8000/api/booking/create \
        -H "Accept: application/json" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer 10|YRgIUfWQBaXPP7CJ5fGOew3KHEagxGHm3vNHSipO9fb685c7" \
        -d '{"mentoring_id": 1}'

```

### midrrant

##### Callback

akan bisa nantik saat sudah di online kan , maka masukan url ke calback nya ( `\web-server-api\booking\callback` )

Setelah mendapatkan URL publik dari Ngrok, Anda harus mendaftarkannya di Dashboard Midtrans agar mereka tahu ke mana harus mengirim laporan pembayaran:

1. Masuk ke Dashboard Midtrans Sandbox.
2. Buka menu Settings > Configuration.
3. Di kolom Payment Notification URL, masukkan URL tadi
4. Klik Save di bagian bawah halaman.
