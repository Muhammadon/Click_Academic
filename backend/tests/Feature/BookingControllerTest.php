<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Mentoring;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Midtrans\Snap;
use Mockery;
use Tests\TestCase;

class BookingControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test create booking berhasil
     */
    public function test_create_booking_success()
    {
        $user = User::factory()->create();

        $mentoring = Mentoring::factory()->create([
            'price' => 100000,
        ]);

        Sanctum::actingAs($user);

        Mockery::mock('alias:Midtrans\Snap')
            ->shouldReceive('getSnapToken')
            ->once()
            ->andReturn('dummy_snap_token');

        $response = $this->postJson('/api/booking/create', [
            'mentoring_id' => $mentoring->id,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'snap_token' => 'dummy_snap_token',
            ]);

        $this->assertDatabaseHas('bookings', [
            'student_id' => $user->id,
            'mentoring_id' => $mentoring->id,
            'status' => 'pending',
        ]);
    }

    /**
     * Test create booking tanpa login
     */
    public function test_create_booking_unauthenticated()
    {
        $mentoring = Mentoring::factory()->create();

        $response = $this->postJson('/api/booking/create', [
            'mentoring_id' => $mentoring->id,
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test create booking mentoring tidak ditemukan
     */
    public function test_create_booking_invalid_mentoring()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/booking/create', [
            'mentoring_id' => 9999,
        ]);

        $response->assertStatus(422);
    }

    /**
     * Test history booking
     */
    public function test_booking_history_success()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        Booking::factory()->count(3)->create([
            'student_id' => $user->id,
        ]);

        $response = $this->getJson('/api/booking/history');

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
     * Test history tanpa login
     */
    public function test_booking_history_unauthenticated()
    {
        $response = $this->getJson('/api/booking/history');

        $response->assertStatus(401);
    }

    /**
     * Test webhook settlement
     */
    public function test_notification_settlement_success()
    {
        config([
            'services.midtrans.serverKey' => 'testing_server_key',
        ]);

        $booking = Booking::factory()->create([
            'order_id' => 'BOOK123',
            'status' => 'pending',
        ]);

        $payload = [
            'order_id' => 'BOOK123',
            'status_code' => '200',
            'gross_amount' => '100000.00',
            'transaction_status' => 'settlement',
        ];

        $payload['signature_key'] = hash(
            'sha512',
            $payload['order_id'] .
            $payload['status_code'] .
            $payload['gross_amount'] .
            env('MIDTRANS_SERVER_KEY')
        );

        $response = $this->postJson(
            '/api/booking/callback',
            $payload
        );

        $response->assertStatus(200);

        $this->assertDatabaseHas('bookings', [
            'order_id' => 'BOOK123',
            'status' => 'paid',
        ]);
    }

    /**
     * Test webhook signature salah
     */
    public function test_notification_invalid_signature()
    {
        $booking = Booking::factory()->create([
            'order_id' => 'BOOK123',
        ]);

        $response = $this->postJson('/api/booking/callback', [
            'order_id' => 'BOOK123',
            'status_code' => '200',
            'gross_amount' => '100000.00',
            'transaction_status' => 'settlement',
            'signature_key' => 'SALAH',
        ]);

        $response->assertStatus(403);
    }
}