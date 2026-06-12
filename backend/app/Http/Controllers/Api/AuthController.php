<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Fungsi untuk mendaftar akun baru
    public function register(Request $request)
    {
        //  Validasi data yang dikirim Frontend
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        // Simpan data mahasiswa ke database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Password wajib dienkripsi
            'role' => 'student' // Otomatis mengisi role sebagai student
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Registrasi berhasil',
            'data' => $user
        ], 201);
    }

    // Fungsi untuk masuk dan mendapatkan Token
    public function login(Request $request)
    {
        //  Validasi input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Cek apakah user ada dan passwordnya benar
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau password salah'
            ], 401);
        }

        // Buatkan Token keamanan (Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user
        ], 200);
    }




// Fungsi untuk mendapatkan data profil user yang sedang login
public function getUser(Request $request)
{
    // Mengambil data user yang sedang login melalui token auth
    $user = $request->user();

    // Jika user tidak ditemukan (opsional, sebagai antisipasi jika middleware lolos)
    if (!$user) {
        return response()->json([
            'status' => 'error',
            'message' => 'User tidak terautentikasi'
        ], 401);
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Data user berhasil didapatkan',
        'data' => [
            'id' => $user->id,
            'username' => $user->name, // Disesuaikan dengan field name di DB Anda
            'email' => $user->email,
            'role' => $user->role
        ]
    ], 200);
}
}
