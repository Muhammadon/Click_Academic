<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\MentoringController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;

// Endpoint yang membutuhkan token
Route::middleware('auth:sanctum')->group(function () {

    // Data user yang sedang login
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Midtrant
    //

    Route::post("/booking/create", [BookingController::class, "create"]);
    Route::post('booking/callback', [BookingController::class, 'notificationHandler']);

    // Route khusus untuk mengambil daftar mentoring yang sudah di-booking oleh user
    Route::get('/booking/history', [BookingController::class, 'history']);
    // enpoint history saat user berhasil memesan atao booking

    Route::get('/mentorings/{id}', [MentoringController::class, 'show']);
});

// Endpoint publik
Route::get('/mentorings', [MentoringController::class, 'index']);
//Mengambil detail spesifik salah satu kelas berdasarkan {id}


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
