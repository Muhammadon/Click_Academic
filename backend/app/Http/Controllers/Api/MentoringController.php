<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mentoring;
use App\Models\User;
use Illuminate\Http\Request;
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

    /**
     * Mengambil daftar kelas mentoring yang sudah di-booking oleh user yang login
     */
    public function history(Request $request)
    {
        $currentUser = $request->user();

        if (!$currentUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak terautentikasi.',
            ], 401);
        }

        try {
            // Tarik data user dengan eager loading relasi mentorings melalui pivot bookings
            $userWithMentorings = User::query()
                ->with(['mentorings' => function ($query) {
                    // Mengurutkan berdasarkan waktu pendaftaran terbaru
                    $query->orderBy('bookings.created_at', 'desc');
                }])
                ->find($currentUser->id);

            // Antispasi jika user tidak ditemukan di database
            if (!$userWithMentorings) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data pengguna tidak ditemukan.',
                ], 404);
            }

            $pureMentoringList = [];
            if ($userWithMentorings && $userWithMentorings->mentorings) {
                $pureMentoringList = $userWithMentorings->mentorings->map(function ($mentoring) {
                    return [
                        'id'          => (int) $mentoring->id,
                        'title'       => $mentoring->title ?? '',
                        'description' => $mentoring->description,
                        'price'       => (int) ($mentoring->price ?? 0),
                        'start_time'  => $mentoring->start_time,
                        'end_time'    => $mentoring->end_time,
                        'status'      => $mentoring->status ?? 'available',
                    ];
                })->all();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'success',
                'data' => $pureMentoringList // Menghasilkan array murni Mentoring[]
            ], 200);
        } catch (\Exception $e) {
            Log::error('BookingController getMyBookings Error: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memuat daftar bimbingan aktif.',
            ], 500);
        }
    }
}
