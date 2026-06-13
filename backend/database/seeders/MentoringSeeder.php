<?php

namespace Database\Seeders;

use App\Models\Booking;
use Illuminate\Database\Seeder;
use App\Models\Mentoring; // Panggil model Mentoring
use App\Models\User;
use Carbon\Carbon; // Untuk mengatur format waktu

class MentoringSeeder extends Seeder
{
    public function run(): void
    {
        /* Mentoring::create([ */
        /*     'title' => 'Pelatihan Dasar React & Vite', */
        /*     'description' => 'Membangun UI modern menggunakan React untuk pemula.', */
        /*     'price' => 15000, */
        /*     'start_time' => Carbon::now()->addDays(2), // Jadwal 2 hari dari sekarang */
        /*     'end_time' => Carbon::now()->addDays(2)->addHours(2), */
        /*     'status' => 'available' */
        /* ]); */
        /**/
        /* Mentoring::create([ */
        /*     'title' => 'Konsultasi Judul Skripsi AI & Machine Learning', */
        /*     'description' => 'Sesi mentoring 1-on-1 untuk membedah dataset dan algoritma skripsi.', */
        /*     'price' => 25000, */
        /*     'start_time' => Carbon::now()->addDays(5), */
        /*     'end_time' => Carbon::now()->addDays(5)->addHours(1), */
        /*     'status' => 'available' */
        /* ]); */

// Buat data fake users & mentorings terlebih dahulu jika database masih kosong
        if (User::count() === 0) {
            User::factory(10)->create();
        }

        if (Mentoring::count() === 0) {
            Mentoring::factory(5)->create();
        }

        //alankan pembuatan 10 data booking tiruan!
        Booking::factory(10)->create();
    }
}
