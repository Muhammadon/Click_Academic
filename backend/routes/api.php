<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\Api\MentoringController;

// Endpoint untuk mengambil daftar kelas/konsultasi
Route::get('/mentorings', [MentoringController::class, 'index']);
