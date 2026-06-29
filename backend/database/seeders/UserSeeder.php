<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        // 1. Akun Spesifik Pertama
        User::create([
            'username' => 'muhammadon',
            'email' => 'muhammadon@example.com', // Sesuaikan emailnya
            'email_verified_at' => now(),
            'password' => Hash::make('muhammadon'),
            'role' => 'student',
        ]);

        //  Akun Spesifik Kedua
        User::create([
            'username' => 'muhammad nadhar',
            'email' => 'nadhar@example.com', // Sesuaikan emailnya
            'email_verified_at' => now(),
            'password' => Hash::make('nadhar'),
            'role' => 'student',
        ]);

        //  Membuat 10 data fake tambahan menggunakan Factory
        User::factory(3)->create();
    }
}
