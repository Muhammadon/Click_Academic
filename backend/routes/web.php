<?php

use Illuminate\Support\Facades\Route;

<<<<<<< HEAD
 Route::get('/', function () {
     return response()->json([
         'status' => 'success',
         'message' => 'EduConnect API is running smoothly',
         'version' => '1.0'
     ]);
 });
=======
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
>>>>>>> 4acedf950c861d9fc615814582c6daef22e72511
