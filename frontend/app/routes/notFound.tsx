
// 1. Tambahkan fungsi loader kosong ini di bagian atas/bawah file
export function loader() {
  return null; 
}

// 2. Komponen bawaan Anda tetap seperti biasa
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">404 - Halaman Tidak Ditemukan</h1>
    </div>
  );
}
