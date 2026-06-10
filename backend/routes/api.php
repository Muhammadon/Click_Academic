<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\Api\MentoringController;
use App\Http\Controllers\Api\AuthController;

// Endpoint untuk mengambil daftar kelas/konsultasi
Route::get('/mentorings', [MentoringController::class, 'index']);

// Endpoint Terbuka (Tidak butuh token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);