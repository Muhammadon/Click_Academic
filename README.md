
<h1 align="center">
Clik Academic
</h1>


### Structure App 
![structure app]( ./app.png) 


### Fitur 

fitur utanma : 
1. Authentikasi
2. Konsultasi untuk mahasiswa 
3. managent kelas untuk mahasiswa 




### Docker 

```bash
# bulding image app 
docker build -t username/click:lates .

# push ( simpan ke docker hub )
docker push bgdar/click:lates

```
Menjalakan 

```bash 
# jalakna di local yang sudah terpusat di port 8000 
# Hapus container lama yang terkena 403
docker rm -f click-academic

# Build ulang image agar hak akses file diperbarui
docker build -t bgdar/click:latest .

# atau buildi dengan mengambil cacace
docker build --pull=false -t bgdar/click:latest .

# 3. Jalankan kembali container Anda
docker run -d -p 8000:80 \
        -e APP_KEY="base64:JJ9xjaI3SJgHTK6FgEIIcrVYau20+jV7bY2QBJOYVaA=" \
        -e APP_ENV="local" \
        -e DB_CONNECTION="mysql" \
        -e DB_HOST="localhost" \
        -e DB_SOCKET="/run/mysqld/mysqld.sock" \
        -e DB_DATABASE="click" \
        -e DB_USERNAME="root" \
        -e DB_PASSWORD="my-db" \
        -e SESSION_DRIVER="file" \
        -e QUEUE_CONNECTION="sync" \
        -e CACHE_STORE="file" \
        --name click-academic bgdar/click:latest```
-p 8000:80: Membuka jalur akses. Port 80 di dalam container (tempat Nginx berjalan) akan dihubungkan ke port 8000 di  Laptop.

 - public image : 
 docker.io/bgdar/click:lates
