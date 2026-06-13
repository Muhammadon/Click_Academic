<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Midtrans\Config;
use App\Models\Booking;
use App\Models\Mentoring;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Midtrans\Snap;

class BookingController extends Controller
{

    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized = config('services.midtrans.isSanitized');
        Config::$is3ds = config('services.midtrans.is3ds');
    }
    public function create(Request $request)
   {
    // 1. Validasi input awal
    $request->validate([
        'mentoring_id' => 'required|exists:mentorings,id',
    ]);


    // Ambil data user yang sedang login melalui token Sanctum
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'status' => 'error',
            'message' => 'User tidak terautentikasi'
        ], 401);
    }

    try {
        // Ambil data mentoring/kelas yang dipilih
        $mentoring = Mentoring::query()->find($request->mentoring_id);

        if (!$mentoring) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kelas mentoring tidak ditemukan'
            ], 404);
        }

        // KUNCI PERBAIKAN: Set Konfigurasi Midtrans dari config/services.php sebelum panggil Snap Token
        Config::$serverKey    = config('services.midtrans.serverKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized  = config('services.midtrans.isSanitized');
        Config::$is3ds        = config('services.midtrans.is3ds');


{
    // Tambahkan baris ini untuk tes sementara:
    /* dd([ */
    /*     'key_dari_env' => env('MIDTRANS_SERVER_KEY'), */
    /*     'key_dari_config' => config('services.midtrans.serverKey'), */
    /*     'is_production' => config('services.midtrans.isProduction') */
    /* ]); */
    /**/
    // ... kode yang lain di bawahnya ...
}
        // Buat Kode Unik Transaksi
        $orderId = 'BOOK-' . strtoupper(uniqid());

        // 3. Konfigurasi Parameter Transaksi untuk SDK Midtrans Snap
        $params = [
            'transaction_details' => [
                'order_id'     => $orderId,
                'gross_amount' => (int) $mentoring->price, // Wajib bertipe Integer
            ],
            'customer_details' => [
                'first_name' => $user->username,
                'email'      => $user->email,
            ],
            'item_details' => [
                [
                    'id'       => $mentoring->id,
                    'price'    => (int) $mentoring->price,
                    'quantity' => 1,
                    'name'     => substr($mentoring->title, 0, 50), // Maksimal 50 karakter
                ]
            ]
        ];

        // Minta Snap Token langsung dari Server Midtrans
        $snapToken = Snap::getSnapToken($params);

        // SINKRONISASI TABEL: Simpan data ke tabel 'bookings'
        $booking = Booking::create([
            'student_id'   => $user->id,
            'mentoring_id' => $mentoring->id,
            'order_id'     => $orderId,
            'status'       => 'pending',
            'snap_token'   => $snapToken,
        ]);

        return response()->json([
            'status'     => 'success',
            'message'    => 'Token checkout Midtrans berhasil dibuat',
            'snap_token' => $snapToken,
            'data'       => $booking
        ], 201);

    } catch (\Exception $e) {
        // Rekam error jika kredensial Midtrans di .env Anda bermasalah
        Log::error('Midtrans Create Token Error: ' . $e->getMessage());

        return response()->json([
            'status'  => 'error',
            'message' => 'Gagal membuat sesi pembayaran Midtrans. Coba beberapa saat lagi. Detail: ' . $e->getMessage(),
        ], 500);
    }
}
    // Webhook untuk menerima laporan dari Midtrans jika pembayaran selesai
    public function notificationHandler(Request $request)
    {
        // Ambil payload notifikasi dari Midtrans secara aman
        $notification = json_decode($request->getContent());

        if (!$notification) {
            return response()->json(['status' => 'error', 'message' => 'Invalid payload JSON'], 400);
        }

        try {
            // Ambil Server Key langsung dari environment (.env) untuk validasi Signature Key
            $serverKey = env('MIDTRANS_SERVER_KEY') ?? config('services.midtrans.server_key');

            $validSignatureKey = hash(
                "sha512",
                $notification->order_id .
                    $notification->status_code .
                    $notification->gross_amount .
                    $serverKey
            );

            // Keamanan: Cek apakah notifikasi benar-benar dari Midtrans atau manipulasi hacker
            if ($notification->signature_key !== $validSignatureKey) {
                return response()->json(['status' => 'error', 'message' => 'Invalid signature key'], 403);
            }

            // 3. PERBAIKAN UTAMA: Cari berdasarkan 'order_id', bukan 'student_id'!
            // Gunakan query() untuk mencegah warning Intelephense
            $booking = Booking::query()->where('order_id', $notification->order_id)->first();

            if (!$booking) {
                return response()->json(['status' => 'error', 'message' => 'Data Booking tidak ditemukan'], 404);
            }

            $transactionStatus = $notification->transaction_status;

            // 4. PERBAIKAN ENUM: Update status disesuaikan dengan isi tabel ['pending', 'paid', 'failed']
            if ($transactionStatus == 'settlement' || $transactionStatus == 'capture') {

                // Mengubah menjadi 'paid' sesuai blueprint enum tabel Anda
                $booking->update(['status' => 'paid']);

                // Catat log sukses untuk kebutuhan debugging internal
                Log::info("Pembayaran Sukses untuk Order ID: " . $booking->order_id);

                // [LOGIKA TAMBAHAN ANDA DI SINI]:
                // Hubungkan relasi jika mahasiswa otomatis dimasukkan ke grup kelas atau absensi mentoring

            } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {

                // Mengubah menjadi 'failed' jika pembayaran kedaluwarsa atau dibatalkan
                $booking->update(['status' => 'failed']);
                Log::warning("Pembayaran Gagal/Expired untuk Order ID: " . $booking->order_id);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Notifikasi Midtrans berhasil diproses'
            ], 200);
        } catch (\Exception $e) {
            // Jika ada kendala sistem, rekam error agar server tidak langsung jebol/crash 500 murni
            Log::error('Midtrans Notification Error: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi gangguan internal pada server webhook'
            ], 500);
        }
    }

    /**
     * Mengambil daftar kelas mentoring yang sudah di-booking oleh user yang login
     */
    public function history(Request $request)
    {
        // 1. Ambil data user dari token auth Sanctum/Passport
        $currentUser = $request->user();

        if (!$currentUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak terautentikasi.',
            ], 401);
        }

        try {
            // 2. Tarik data user dengan eager loading relasi mentorings melalui pivot bookings
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

            // 3. RE-MAPPING: Paksa formatnya murni mengikuti skema tabel mentorings asli (Mentoring[])
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

            //Return response JSON (Struktur bersih, mentorings langsung berada di baris pertama 'data')
            return response()->json([
                'status' => 'success',
                'message' => 'success',
                'mentorings' => $pureMentoringList // Menghasilkan array murni Mentoring[]
            ], 200);
        } catch (\Exception $e) {
            // Catat log jika terjadi kendala pada query database
            Log::error('BookingController getMyBookings Error: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memuat daftar bimbingan aktif.',
            ], 500);
        }
    }

    //


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
