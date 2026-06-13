<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    // Fungsi untuk mendaftar akun baru
    public function register(Request $request)
    {
        try {
            //  Validasi data yang dikirim Frontend
            $validator = Validator::make($request->all(), [
                'username' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
            ], [
                // Kustomisasi pesan bahasa Indonesia agar front-end tinggal menampilkan langsung
                'email.unique' => 'Email sudah terdaftar di platform kami.',
                'password.min' => 'Password minimal harus berjumlah 6 karakter.',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()->first(), // Mengambil satu pesan kesalahan pertama
                    'errors' => $validator->errors(),          // Mengembalikan detail semua field yang error
                ], 422);
            }

            // Simpan data mahasiswa ke database
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Password wajib dienkripsi
                'role' => 'student', // Otomatis mengisi role sebagai student
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Registrasi berhasil',
                'data' => $user,
            ], 201);
        } catch (\Exception $e) {
            // 1. Catat error asli SQLSTATE ke dalam file log internal server (storage/logs/laravel.log)
            Log::error('Gagal Registrasi User: ' . $e->getMessage());

            // Kembalikan pesan yang aman dan sopan ke Client (React)
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan internal pada server database. Silakan hubungi admin.',
            ], 500); // Gunakan status 500 Internal Server Error
        }
    }

    // Fungsi untuk masuk dan mendapatkan Token
    public function login(Request $request)
    {
        // 1. Validasi input awal dari Frontend
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {

            $user = User::query()->where('email', $request->email)->first();
            // Cek apakah user ditemukan dan password-nya cocok
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email atau password yang Anda masukkan salah.',
                ], 401);
            }

            // Buatkan Token keamanan via Laravel Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Selamat datang' . $user->username . "ke Clieck Academic",
                'token' => $token,
                'data' => [
                    'id' => $user->id,
                    'username' => $user->username, // Disesuaikan dengan nama kolom database Anda yang baru ('username')
                    'email' => $user->email,
                    'role' => $user->role, // Wajib dikirim agar widget Kursus/Statistik di React tidak kosong
                ],
            ], 200);
        } catch (\Exception $e) {
            // Catat error sistem/database asli ke log internal server (storage/logs/laravel.log)
            Log::error('Login Fatal Error: ' . $e->getMessage());

            // Kembalikan response aman ke client jika terjadi kegagalan server
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan internal pada server. Silakan coba beberapa saat lagi.',
            ], 500);
        }
    }

    // Fungsi untuk mendapatkan data profil user yang sedang login
    public function getUser(Request $request)
    {
        // Mengambil data user yang sedang login melalui token auth
        $currentUser = $request->user();

        // Jika user tidak ditemukan (opsional, sebagai antisipasi jika middleware lolos)
        if (! $currentUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak terautentikasi',
            ], 401);
        }


        // Tarik data user beserta relasi tabel mentorings melalu pivot bookings
        $userWithMentorings = User::query()
            ->with(['mentorings' => function ($query) {
                $query->orderBy('bookings.created_at', 'desc');
            }])
            ->find($currentUser->id);

        //RE-MAPPING: Paksa formatnya murni mengikuti skema tabel mentorings asli (Mentoring[])
        if (! $userWithMentorings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profil pengguna gagal dimuat ',
            ], 404);
        }




        return response()->json([
            'status' => 'success',
            'message' => 'Data user berhasil didapatkan',
            'data' => [
                'id' => $currentUser->id,
                'username' => $currentUser->username, // Disesuaikan dengan field name di DB Anda
                'email' => $currentUser->email,
                'role' => $currentUser->role,
            ],
        ], 200);
    }

    public function logout(Request $request)
    {
        try {
            // engambil user yang sedang aktif berdasarkan token
            $user = $request->user();

            if (! $user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User tidak ditemukan atau sudah logout',
                ], 401);
            }

            // Hapus token yang saat ini sedang digunakan untuk request
            /** @var PersonalAccessToken $token */
            $token = $user->currentAccessToken();
            if ($token) {
                $token->delete();
            }
            // Catatan: Jika ingin menghapus SEMUA token user di semua perangkat, gunakan:
            // $user->tokens()->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Logout berhasil, token telah dihapus',
            ], 200);
        } catch (\Exception $e) {
            // Catat error jika terjadi kendala server
            Log::error('Logout Error: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan pada server saat proses logout',
            ], 500);
        }
    }
}
