<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
}