<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test registrasi berhasil
     */
    public function test_register_success()
    {
        $response = $this->postJson('/api/register', [
            'username' => 'alvin',
            'email' => 'alvin@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'message' => 'Registrasi berhasil',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'alvin@example.com',
        ]);
    }

    /**
     * Test registrasi email sudah digunakan
     */
    public function test_register_duplicate_email()
    {
        User::factory()->create([
            'email' => 'alvin@example.com',
        ]);

        $response = $this->postJson('/api/register', [
            'username' => 'alvin',
            'email' => 'alvin@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'status' => 'error',
            ]);
    }

    /**
     * Test login berhasil
     */
    public function test_login_success()
    {
        $password = 'password123';

        User::factory()->create([
            'username' => 'alvin',
            'email' => 'alvin@example.com',
            'password' => bcrypt($password),
            'role' => 'student',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'alvin@example.com',
            'password' => $password,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'token',
                'data' => [
                    'id',
                    'username',
                    'email',
                    'role',
                ]
            ]);
    }

    /**
     * Test login email tidak ditemukan
     */
    public function test_login_email_not_found()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'salah@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'status' => 'error',
            ]);
    }

    /**
     * Test login password salah
     */
    public function test_login_wrong_password()
    {
        User::factory()->create([
            'email' => 'alvin@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'alvin@example.com',
            'password' => 'password321',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'status' => 'error',
            ]);
    }

    /**
     * Test get user berhasil
     */
    public function test_get_user_success()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        Booking::factory()->count(3)->create([
            'student_id' => $user->id,
            'status' => 'paid',
        ]);

        $response = $this->getJson('/api/user');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'total_kelas' => 3,
            ]);
    }

    /**
     * Test get user tanpa login
     */
    public function test_get_user_unauthenticated()
    {
        $response = $this->getJson('/api/user');

        $response->assertStatus(401);
    }

    /**
     * Test logout berhasil
     */
    public function test_logout_success()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);
    }

    /**
     * Test logout tanpa login
     */
    public function test_logout_without_login()
    {
        $response = $this->postJson('/api/logout');

        $response->assertStatus(401);
    }
}