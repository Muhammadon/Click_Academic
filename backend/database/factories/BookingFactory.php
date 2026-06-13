<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Mentoring;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    // model variabel
    protected $model =  Booking::class;


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //Mengambil ID Student (User) secara acak dari database yang sudah ada
            'student_id' => User::query()->inRandomOrder()->first()?->id ?? User::factory(),

            // Mengambil ID Mentoring secara acak dari database yang sudah ada
            'mentoring_id' => Mentoring::query()->inRandomOrder()->first()?->id ?? Mentoring::factory(),

            // Membuat Order ID unik dengan format BOOK-XXXXX
            'order_id' => 'BOOK-' . strtoupper($this->faker->unique()->bothify('??#?#?##')),

            // Memilih status acak sesuai opsi ENUM pada blueprint tabel Anda
            'status' => $this->faker->randomElement(['pending', 'paid', 'failed']),

            // Membuat Snap Token tiruan (hanya diisi jika status bukan pending, atau diacak)
            'snap_token' => $this->faker->optional(0.7)->uuid(), // 70% peluang token terisi string acak mirip UUID Midtrans
        ];
    }
}
