import React, { useEffect, useState } from 'react';



//
// function TombolBeliKelas({ idKelas }) {
//   const [loading, setLoading] = useState(false);
//
//   useEffect(() => {
//     // 1. Buat elemen script secara dinamis
//     const script = document.createElement('script');
//     script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
//
//     // 2. Masukkan Client Key Sandbox kamu di sini
//     script.setAttribute('data-client-key', 'SB-Mid-client-vXyZ123456789');
//     script.async = true;
//
//     // 3. Tempelkan script ke dalam tag <head> HTML
//     document.head.appendChild(script);
//
//     // 4. Cleanup function: Hapus script jika user pindah halaman (React Router)
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);
//
//   const handlePembayaran = async () => {
//     setLoading(true);
//     try {
//       // Panggil API Laravel untuk dapat token
//       const response = await axios.post('http://localhost:8000/api/checkout', {
//         course_id: idKelas
//       });
//
//       const snapToken = response.data.snap_token;
//
//       // Pastikan objek snap sudah siap di window sebelum dipanggil
//       if (window.snap) {
//         window.snap.pay(snapToken, {
//           onSuccess: function(result) {
//             alert("Pembayaran sukses!");
//             console.log(result);
//           },
//           onPending: function(result) {
//             alert("Menunggu pembayaran...");
//           },
//           onError: function(result) {
//             alert("Pembayaran gagal!");
//           },
//           onClose: function() {
//             alert('Kamu menutup halaman pembayaran.');
//           }
//         });
//       } else {
//         alert("Script Midtrans belum selesai dimuat, silakan coba lagi.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Gagal memproses pembayaran");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <button onClick={handlePembayaran} disabled={loading}>
//       {loading ? 'Memproses...' : 'Beli Kelas Sekarang'}
//     </button>
//   );
// }
//
// export default TombolBeliKelas;
