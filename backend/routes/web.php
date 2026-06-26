<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return response()->json([
//         'status' => 'success',
//         'message' => 'EduConnect API is running smoothly',
//         'version' => '1.0'
//     ]);
// });
//
//
// ROUTE FALLBACK: Jika rute tidak terdaftar di API Laravel, serahkan ke React Router
Route::fallback(function () {
    return view('react');
});
