<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Mentoring;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MentoringControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test mengambil semua kelas mentoring
     */
    public function test_index_returns_all_mentorings()
    {
        Mentoring::factory()->count(3)->create();

        $response = $this->getJson('/api/mentorings');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);

        $this->assertCount(
            3,
            $response->json('data')
        );
    }

    /**
     * Test detail mentoring berhasil
     */
    public function test_show_existing_mentoring()
{
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $mentoring = Mentoring::factory()->create();

    $response = $this->getJson("/api/mentorings/{$mentoring->id}");

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'success',
            'data' => [
                'id' => $mentoring->id,
            ],
        ]);
}

    /**
     * Test detail mentoring tidak ditemukan
     */
   public function test_show_non_existing_mentoring()
{
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $response = $this->getJson('/api/mentorings/9999');

    $response->assertStatus(404)
        ->assertJson([
            'status' => 'error',
        ]);
}

    /**
     * Test history mentoring user berhasil
     */
    public function test_history_returns_user_mentorings()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $mentoring = Mentoring::factory()->create([
            'title' => 'Laravel',
            'price' => 150000,
        ]);

        Booking::factory()->create([
            'student_id' => $user->id,
            'mentoring_id' => $mentoring->id,
            'status' => 'paid',
        ]);

        $response = $this->getJson('/api/mentorings/history');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);

        $this->assertCount(
            1,
            $response->json('data')
        );
    }

    /**
     * Test history tanpa login
     */
    public function test_history_without_login()
    {
        $response = $this->getJson('/api/mentorings/history');

        $response->assertStatus(401);
    }

    /**
     * Test history user yang belum memiliki mentoring
     */
    public function test_history_empty()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/mentorings/history');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);

        $this->assertCount(
            0,
            $response->json('data')
        );
    }
}