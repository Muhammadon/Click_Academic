# === STAGE 1 Build React ===
FROM node:20-alpine AS react-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# === STAGE 2: Setup Laravel, Nginx, & MySQL ( untuk sekarang di pakai aja dulu) ===
FROM php:8.2-fpm-alpine
RUN apk add --no-cache nginx wget libpng-dev libjpeg-turbo-dev freetype-dev zip libzip-dev unzip git mariadb mariadb-client openrc && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql gd zip

WORKDIR /var/www
COPY backend/ .
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --optimize-autoloader --ignore-platform-reqs

# Salin hasil build client ke folder public/client Laravel
COPY --from=react-builder /app/build/client/ ./public/client/

COPY nginx.conf /etc/nginx/http.d/default.conf
RUN chown -R www-data:www-data /var/www

# --- INITIALISASI MARIADB ---
# RUN mkdir -p /run/mysqld /var/lib/mysql && \
#     chown -R mysql:mysql /run/mysqld /var/lib/mysql && \
#     mysql_install_db --user=mysql --datadir=/var/lib/mysql && \
#     printf "[mysqld]\nbind-address = 0.0.0.0\nskip-networking = 0\n" > /etc/my.cnf.d/docker.cnf

# gabdti dengan script INisialsia mariadb
# Berikan izin eksekusi pada file entrypoint.sh yang ada di dalam folder backend
RUN chmod +x /var/www/entrypoint.sh

EXPOSE 80

# langsung jalakna db seed , untuk sekarang karena belum ada adnmin
#  CONTOH YANG BENAR (Semua digabung jadi satu kesatuan perintah utama)
# CMD ["sh", "-c", "mysqld_safe --user=mysql --datadir=/var/lib/mysql & until mysqladmin ping --silent; do sleep 1; done && mariadb -u root -e \"CREATE DATABASE IF NOT EXISTS click; ALTER USER 'root'@'localhost' IDENTIFIED BY 'my-db'; GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'my-db' WITH GRANT OPTION; FLUSH PRIVILEGES;\" && php artisan config:clear && php artisan migrate --force && php artisan db:seed --force && php-fpm -D && nginx -g 'daemon off;'"]



# ini untuk Deployment , jadi migrasinya lebih fresh 
# CMD ["sh", "-c", "mariadbd-safe --user=mysql --datadir=/var/lib/mysql & until mariadb-admin ping --silent; do sleep 1; done && sleep 3 && mariadb -u root -e \"CREATE DATABASE IF NOT EXISTS click; ALTER USER 'root'@'localhost' IDENTIFIED BY 'my-db'; GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'my-db' WITH GRANT OPTION; FLUSH PRIVILEGES;\" && php artisan config:clear && php artisan migrate:fresh --seed --force && php-fpm -D && nginx -g 'daemon off;'"]
#

ENTRYPOINT ["/var/www/entrypoint.sh"]
