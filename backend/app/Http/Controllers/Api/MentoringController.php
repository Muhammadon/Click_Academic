<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Mentoring;
use Illuminate\Http\Request;

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
public function history(Request $request) 
{
  
    $studentId = $request->user()->id;

    // Ambil data booking milik mahasiswa tersebut beserta detail mentoringnya
    // Diurutkan dari yang paling baru didaftarkan (latest)
    $bookings = Booking::with('mentoring')
        ->where('student_id', $studentId)
        ->latest()
        ->get();

    // Kembalikan response JSON sukses ke Frontend
    return response()->json([
        'status' => 'success',
        'message' => 'Riwayat booking berhasil didapatkan',
        'data' => $bookings
    ], 200);
}


}
