<h1 align="center"> BackEnd </h1>

### App Info

- User akan mendapatkan token bare untuk login di api `register`

### Tech info

- `php` : bahasan utama
- `laravel` (versi 13) : framework utama untuk building web app

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
