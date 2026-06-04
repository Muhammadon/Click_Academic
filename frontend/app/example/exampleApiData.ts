import type { TypeApi } from "~/core/type";



// konsiltasi dan payment
export const exampleApiData: TypeApi[] = [
  {
    id: "CLS-001",
    title: "UI/UX Design Fundamental",
    description:
      "Belajar dasar UI/UX design mulai dari wireframe, design system, hingga prototyping.",
    category: "Design",

    mentor: "Dr. Ahmad Fauzi",
    mentorImage: "/mentor/ahmad-fauzi.png",

    schedule: "Selasa & Jumat • 19:00 WIB",
    duration: "8 Minggu",

    quota: 50,
    totalStudents: 120,

    level: "Beginner",

    price: "Gratis",

    // thumbnail: "/kelas/uiux.jpg",

    color: "from-hijau-zamrud to-deep-teal",

    status: "Open",

    rating: 4.8,
    totalReviews: 320,

    // hasCertificate: true,

    createdAt: "2026-01-10",
    updatedAt: "2026-05-20",
  },

  {
    id: "CLS-002",
    title: "Fullstack Web Development",
    description:
      "Mempelajari frontend dan backend development menggunakan React, Node.js, dan database.",
    category: "Programming",

    mentor: "Siti Rahmah, M.Kom",
    mentorImage: "/mentor/siti-rahmah.png",

    schedule: "Senin & Rabu • 18:30 WIB",
    duration: "12 Minggu",

    quota: 40,
    totalStudents: 210,

    level: "Intermediate",

    price: 75000,

    // thumbnail: "/kelas/fullstack.jpg",

    color: "from-hijau-botol to-hijau-uin",

    status: "Open",

    rating: 4.9,
    totalReviews: 500,

    // hasCertificate: true,

    createdAt: "2026-02-01",
    updatedAt: "2026-05-19",
  },

  {
    id: "CLS-003",
    title: "Cyber Security Essentials",
    description:
      "Dasar keamanan siber, penetration testing, dan keamanan jaringan.",
    category: "Security",

    mentor: "Irfan Maulana",
    mentorImage: "/mentor/irfan.png",

    schedule: "Sabtu • 09:00 WIB",
    duration: "14 Minggu",

    quota: 35,
    totalStudents: 180,

    level: "Advanced",

    price: 100000,

    // thumbnail: "/kelas/cyber-security.jpg",

    color: "from-olive to-forest-khaki",

    status: "Closed",

    progress: 100,

    rating: 4.7,
    totalReviews: 250,

    // hasCertificate: true,

    createdAt: "2025-11-01",
    updatedAt: "2026-03-15",
  },

  {
    id: "CLS-004",
    title: "Machine Learning Basic",
    description:
      "Belajar machine learning dasar menggunakan Python dan Scikit-Learn.",
    category: "AI & Data",

    mentor: "Muhammad Rizki",
    mentorImage: "/mentor/rizki.png",

    schedule: "Kamis • 19:30 WIB",
    duration: "10 Minggu",

    quota: 45,
    totalStudents: 95,

    level: "Intermediate",

    price: 50000,

    // thumbnail: "/kelas/machine-learning.jpg",

    color: "from-toska-tua to-deep-teal",

    status: "Open",

    progress: 75,

    rating: 4.8,
    totalReviews: 180,

    // hasCertificate: true,

    createdAt: "2026-03-10",
    updatedAt: "2026-05-18",
  },

  {
    id: "CLS-005",
    title: "Public Speaking & Leadership",
    description:
      "Meningkatkan kemampuan komunikasi, presentasi, dan kepemimpinan.",
    category: "Soft Skill",

    mentor: "Nurul Hasanah",
    mentorImage: "/mentor/nurul.png",

    schedule: "Jumat • 16:00 WIB",
    duration: "6 Minggu",

    quota: 30,
    totalStudents: 140,

    level: "All Level",

    price: "Gratis",

    // thumbnail: "/kelas/public-speaking.jpg",

    color: "from-terracotta to-burnt-orange",

    status: "Open",

    rating: 4.6,
    totalReviews: 145,

    // hasCertificate: true,

    createdAt: "2026-04-01",
    updatedAt: "2026-05-22",
  },

  {
    id: "CLS-006",
    title: "Mobile App Development Flutter",
    description: "Membangun aplikasi mobile Android & iOS menggunakan Flutter.",
    category: "Mobile",

    mentor: "Aulia Putri",
    mentorImage: "/mentor/aulia.png",

    schedule: "Minggu • 10:00 WIB",
    duration: "10 Minggu",

    quota: 25,
    totalStudents: 165,

    level: "Intermediate",

    price: 85000,

    // thumbnail: "/kelas/flutter.jpg",

    color: "from-hijau-lumut to-hijau-zamrud",

    status: "Full",

    progress: 0,

    rating: 4.9,
    totalReviews: 410,

    // hasCertificate: true,

    createdAt: "2026-04-15",
    updatedAt: "2026-05-23",
  },
];


export  const BookingHistory : TypeApi[] = [
   {
      id: "",
      order_id: "TRX-998877", // Sesuai contoh sukses response Fitur 3 di BRD
      session_title: "Pelatihan Dasar Laravel",
      mentor: "Nama Mentor",
      price: 15000,
      start_time: "2026-06-01 10:00:00",
      status: "paid", // Sudah sukses via Webhook Midtrans
      category: "paid"
    },
    {
      id: 6,
      order_id: "TRX-123456",
      session_title: "Konsultasi Akademik: Tugas Akhir & Skripsi",
      mentor: "Dr. Ahmad Subagja",
      price: 15000,
      start_time: "2026-06-02 13:00:00",
      status: "paid",
      category: "Konsultasi"
    },
    {
      id: 7,
      order_id: "TRX-776655",
      session_title: "Pelatihan Frontend React & Tailwind",
      mentor: "Siti Nurhaliza, M.T.",
      price: 15000,
      start_time: "2026-06-03 09:00:00",
      status: "pending", // Belum dibayar / snap token aktif
      category: "Pelatihan"
    },
    {
      id: 8,
      order_id: "TRX-112233",
      session_title: "Konsultasi Karier & Review CV Tech",
      mentor: "Budi Setiawan (Tech Lead)",
      price: 15000,
      start_time: "2026-05-20 15:30:00",
      status: "failed", // Transaksi kedaluwarsa atau digagalkan
      category: "Konsultasi"
    }
]
