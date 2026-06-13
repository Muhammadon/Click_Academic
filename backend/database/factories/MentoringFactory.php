<?php

namespace Database\Factories;

use App\Models\Mentoring;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mentoring>
 */
class MentoringFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
 public function definition(): array


    {
// Membuat waktu mulai acak (antara besok sampai 1 bulan ke depan)
        $startTime = $this->faker->dateTimeBetween('+1 day', '+1 month');

        // Membuat waktu selesai otomatis bertambah 1 hingga 3 jam setelah waktu mulai
        $endTime = clone $startTime;
        $hoursToAdd = $this->faker->numberBetween(1, 3);
        $endTime->modify("+{$hoursToAdd} hours");
        return [
        // Membuat judul sesi mentoring tiruan yang relevan dengan topik IT / Kuliah
            'title' => $this->faker->randomElement([
                'Bimbingan Skripsi: Optimasi Query Database',
                'Mentoring Private: Dasar React.js & TypeScript',
                'Konsultasi Akademik: Persiapan Sidang Komprehensif',
                'Review Kode: Arsitektur Backend dengan Laravel API',
                'Mentoring UI/UX: Implementasi Design System di Figma'
            ]) . ' - Angkatan ' . $this->faker->numberBetween(1, 5),

            // 2. Membuat paragraf deskripsi tiruan
            'description' => $this->faker->paragraph(3),

            // 3. Membuat harga realistis (kisaran Rp 50.000 - Rp 300.000 dengan kelipatan puluhan ribu)
            'price' => $this->faker->numberBetween(5, 30) * 10000,

            // 4. Memasukkan tanggal mulai dan selesai yang sinkron
            'start_time' => $startTime,
            'end_time' => $endTime,

            // 5. Mengacak status ketersediaan sesuai opsi ENUM pada blueprint Anda
            'status' => $this->faker->randomElement(['available', 'full']),
        ];
    }}
