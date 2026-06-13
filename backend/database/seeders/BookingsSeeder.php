<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Mentoring;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //// 1. Buat data fake users & mentorings terlebih dahulu jika database masih kosong
        if (User::count() === 0) {
            User::factory(10)->create();
        }

        if (Mentoring::count() === 0) {
            Mentoring::factory(5)->create();
        }

        // Jalankan pembuatan 10 data booking tiruan!
        Booking::factory(10)->create();
    }
}
