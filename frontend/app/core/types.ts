import { RiLockPasswordFill } from "@remixicon/react";
import { Recoverable } from "repl";

export enum CourseCategory {
  Programing = "Programming",
  Desain = "Design",
  Security = "Security",
  AiData = "AI & Data",
  Soft = "Soft Skill",
  Modile = "Mobile",
  // untuk type Konsultasi
  Pelatihan = "Pelatihan",
  Konsultasi = "Konsultasi",
  paid = "paid",
}
export enum CourseLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
  AllLevel = "All Level",
}

export enum CourseStatus {
  OPEN = "Open",
  CLOSED = "Closed",
  UPCOMING = "Upcoming"
}
export enum ConsultationStatus {
  PAID = "paid",
  PENDING = "pending",
  FAILED = "failed"
}
export interface TypeClickApi {
  id: string;

  // Informasi utama kelas
  title: string;
  description: string;
  category: CourseCategory;
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
  level: CourseLevel;

  // Harga
  price: number | "Gratis";

  // Thumbnail / banner
  // thumbnail?: string;

  // Warna UI card
  color?: string;

  // Status kelas
  status?: CourseStatus | ConsultationStatus;

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




export interface TypeUserApi    {
  username : string;
  email : string ; 
  password : string ;
}
