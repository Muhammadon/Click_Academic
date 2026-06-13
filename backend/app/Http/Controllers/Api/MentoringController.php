<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mentoring;
use Illuminate\Support\Facades\Log;

class MentoringController extends Controller
{
    public function index()
    {
        // Ambil semua data kelas/mentoring dari database
        $mentorings = Mentoring::all();

        // Kembalikan dalam bentuk JSON
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mengambil daftar kelas',
            'data' => $mentorings
        ], 200);
    }

    // ambil dari booking
/**
     * Mengambil detail spesifik salah satu kelas bimbingan
     */
    public function show($id)
    {
        try {
            // Mencari kelas berdasarkan ID menggunakan Query Builder agar aman dari Intelephense
            $mentoring = Mentoring::query()->find($id);

            // Cek jika ID kelas tidak ditemukan di database MySQL
            if (!$mentoring) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Kelas mentoring yang Anda cari tidak ditemukan atau telah dihapus.'
                ], 404);
            }

            // Kembalikan data lengkap satu kelas ke React
            return response()->json([
                'status' => 'success',
                'message' => 'Detail kelas berhasil dimuat',
                'data' => $mentoring
            ], 200);

        } catch (\Exception $e) {
            // Rekam error jika ada kendala koneksi internal database
            Log::error('Get Detail Mentoring Error: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan internal pada server saat memuat detail kelas.'
            ], 500);
        }
    }



}
