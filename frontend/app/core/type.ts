
export interface TypeApi {
  id: string;

  // Informasi utama kelas
  title: string;
  description: string;
  category:  // nantik sesuaikan lagi 
    // untuk type kelas 
    | "Programming"
    | "Design"
    | "Security"
    | "AI & Data"
    | "Soft Skill"
    | "Mobile"
    // untuk type Konsultasi 
    | "Pelatihan"
    | "Konsultasi"
    | "paid"

  // Mentor
  mentor: string;
  mentorImage?: string;

  // Jadwal & durasi
  schedule: string;
  duration: string;
  startDate?: string;
  endDate?: string;

  // Kapasitas kelas
  quota: number;
  totalStudents: number;

  // Level kelas
  level: "Beginner" | "Intermediate" | "Advanced" | "All Level";

  // Harga
  price: number | "Gratis";

  // Thumbnail / banner
  // thumbnail?: string;

  // Warna UI card
  color?: string;

  // Status kelas
  status?: "Open" | "Full" | "Closed"
  // type untuk konsultasi
  | "paid" | "pending" | "failed";

  // Progress user
  progress?: number;

  // Rating
  rating?: number;
  totalReviews?: number;

  // Sertifikat
  // hasCertificate?: boolean;

  // Metadata
  createdAt?: string;
  updatedAt?: string;
}
