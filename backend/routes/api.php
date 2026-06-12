<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MentoringController;
use App\Http\Controllers\Api\AuthController;

/**/
/* Route::get('/user', function (Request $request) { */
/*     return $request->user(); */
/* })->middleware('auth:sanctum'); */
/**/
Route::middleware('auth:sanctum')->group(function () {

    // Endpoint: GET /api/user
    Route::get('/user', [AuthController::class, 'getUser']);
    // enpoint history saat user berhasil memesan atao booking 

Route::get('/bookings/history', [MentoringController::class, 'history']);
});



// Endpoint untuk mengambil daftar kelas/konsultasi
Route::get('/mentorings', [MentoringController::class, 'index']);

// Endpoint Terbuka (Tidak butuh token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


