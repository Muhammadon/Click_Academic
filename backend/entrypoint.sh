#!/bin/sh

# Pastikan folder data DAN folder runtime socket tersedia di /tmp
mkdir -p /tmp/mysql /tmp/run/mysqld
chown -R mysql:mysql /tmp/mysql /tmp/run/mysqld

#Inisialisasi database jika belum pernah dibuat
if [ ! -d "/tmp/mysql/mysql" ]; then
    echo "=== Initializing MariaDB Data Directory ==="
    mariadb-install-db --user=mysql --datadir=/tmp/mysql
fi

# Jalankan MariaDB dengan Ultra Hemat RAM + Pindahkan file Socket ke /tmp
echo "=== Starting MariaDB ==="
mariadbd-safe --user=mysql \
  --datadir=/tmp/mysql \
  --socket=/tmp/run/mysqld/mysqld.sock \
  --key-buffer-size=16K \
  --max-connections=5 \
  --innodb-buffer-pool-size=8M \
  --innodb-log-buffer-size=256K \
  --query-cache-size=0 \
  --query-cache-type=0 \
  --performance-schema=0 &

# Tunggu sampai port/socket MariaDB benar-benar siap merespons
echo "=== Waiting for MariaDB to be ready ==="
until mariadb-admin ping --socket=/tmp/run/mysqld/mysqld.sock --silent; do
    sleep 1
done

# Beri jeda ekstra aman 3 detik setelah ping berhasil
sleep 3

# Buat database (Wajib sebutkan lokasi socket baru agar bisa masuk tanpa password pertama kali)
echo "=== Setting up Database and Privileges ==="
mariadb -u root --socket=/tmp/run/mysqld/mysqld.sock -e "CREATE DATABASE IF NOT EXISTS click; ALTER USER 'root'@'localhost' IDENTIFIED BY 'my-db'; GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'my-db' WITH GRANT OPTION; FLUSH PRIVILEGES;"

# Jalankan perintah optimasi & migrasi Laravel
echo "=== Running Laravel Migrations ==="
php artisan config:clear
php artisan migrate:fresh --seed --force

#Jalankan PHP-FPM dan Nginx sebagai proses utama kontainer
echo "=== Starting PHP-FPM and Nginx ==="
php-fpm -D
nginx -g 'daemon off;'
