<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Midtrans\Config;
use App\Models\Booking;
use App\Models\Mentoring;
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


    // api untuk generate id midtrans
    public function create(Request $request)
    {
        $request->validate([
            'mentoring_id' => 'required|exists:mentorings,id',
        ]);

        error_log("is mentorings " . $request->mentoring_id);


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

            //  Set Konfigurasi Midtrans dari config/services.php sebelum panggil Snap Token
            Config::$serverKey    = config('services.midtrans.serverKey');
            Config::$isProduction = config('services.midtrans.isProduction');
            Config::$isSanitized  = config('services.midtrans.isSanitized');
            Config::$is3ds        = config('services.midtrans.is3ds'); {
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
            // Ambil base URL front-end dari config Laravel
            $frontendUrl = config('services.midtrans.frontend_url');

            // Konfigurasi Parameter Transaksi untuk SDK Midtrans Snap
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
                ],
                ['callbacks' => [
                    'finish'   => $frontendUrl . '/user/payment/history?status#success',
                    'unfinish' => $frontendUrl . '/user/payment/history?status#pending',
                    'error'    => $frontendUrl . '/user/payment/history?status#error'
                ]]

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

            // Gunakan query() untuk mencegah warning Intelephense
            $booking = Booking::query()->where('order_id', $notification->order_id)->first();

            if (!$booking) {
                return response()->json(['status' => 'error', 'message' => 'Data Booking tidak ditemukan'], 404);
            }

            $transactionStatus = $notification->transaction_status;

            if ($transactionStatus == 'settlement' || $transactionStatus == 'capture') {

                // upat status bahwasanya sudah di bayar
                $booking->update(['status' => 'paid']);

                // Catat log sukses untuk kebutuhan debugging internal
                Log::info("Pembayaran Sukses untuk Order ID: " . $booking->order_id);

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
     * Mengambil semua daftar history pendaftaran milik user yang login
     * Return JSON disesuaikan dengan interface TypeScript terbaru
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
            // EAGER LOADING: Tarik data bookings beserta relasi mentoring-nya
            $bookings = Booking::query()
                ->with(['mentoring'])
                ->where('student_id', $currentUser->id)
                ->orderBy('created_at', 'desc')
                ->get();

            // Pemetaan struktur data (Data Mapping)
            $formattedBookingList = $bookings->map(function ($booking) {
                return [
                    'id'           => (int) $booking->id,
                    'student_id'   => (int) $booking->student_id,
                    'mentoring_id' => (int) $booking->mentoring_id,
                    'order_id'     => $booking->order_id,
                    'status'       => $booking->status, // Mengembalikan 'pending', 'paid', atau 'failed'
                    'snap_token'   => $booking->snap_token,
                    'created_at'   => $booking->created_at ? $booking->created_at->toISOString() : null,
                    'updated_at'   => $booking->updated_at ? $booking->updated_at->toISOString() : null,

                    // Nested object mentoring nempel di dalam objek booking
                    'mentoring'    => $booking->mentoring ? [
                        'id'          => (int) $booking->mentoring->id,
                        'title'       => $booking->mentoring->title ?? '',
                        'description' => $booking->mentoring->description,
                        'price'       => (int) ($booking->mentoring->price ?? 0),
                        'start_time'  => $booking->mentoring->start_time,
                        'end_time'    => $booking->mentoring->end_time,
                        'status'      => $booking->mentoring->status ?? 'available',
                    ] : null,
                ];
            })->all();

            return response()->json([
                'status'   => 'success',
                'message'  => 'Riwayat transaksi berhasil dimuat.',
                'data'  => $formattedBookingList
            ], 200);
        } catch (\Exception $e) {
            Log::error('BookingController history Error: ' . $e->getMessage());

            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal memuat riwayat pendaftaran kelas bimbingan.',
            ], 500);
        }
    }
}
