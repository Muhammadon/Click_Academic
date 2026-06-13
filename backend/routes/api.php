<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\MentoringController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;

// Endpoint yang membutuhkan token
Route::middleware('auth:sanctum')->group(function () {

    // Data user yang sedang login
    Route::get('/user', [AuthController::class, 'getUser']);

    // History booking user
    Route::get('/bookings/history', [MentoringController::class, 'history']);

    // Membuat booking
    Route::post('/bookings', [BookingController::class, 'store']);
});

// Endpoint publik
Route::get('/mentorings', [MentoringController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);