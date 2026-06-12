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
  UPCOMING = "Upcoming",
}
export enum ConsultationStatus {
  PAID = "paid",
  PENDING = "pending",
  FAILED = "failed",
}

export interface TypeUserApi {
  id?: number;
  username: string;
  email: string;
  password: string;
}

// gunkna di login
export interface TypeResponseUserLogin {
  status: string;
  message: string;
  token: string;
  user: TypeUserApi; // nantik ubah sesuikn dengan backend ajaj bgdar
}

// gunkan di register dan profile
export interface TypeResponseUserApi {
  id: number;
  status: string;
  message: string;
  data: TypeUserApi;
  role: string;
}

export interface Booking {
  id: number;
  student_id: number;
  mentoring_id: number;
  order_id: string;
  status: "pending" | "success" | "failed"; // Menggunakan literal type agar lebih ketat dan aman
  snap_token: string;
  created_at?: string; // Optional, format ISO string dari Laravel timestamp
  updated_at?: string; // Optional
}

// Interface untuk objek item kelas mentoring tunggal
export interface Mentoring {
  id: number;
  title: string;
  price: number; // Menggunakan tipe data number karena di JSON berupa angka tanpa tanda kutip
}

// Interface utama untuk response sukses HTTP 200
export interface MentoringListResponse {
  status: "success" | "error"; // Menggunakan literal type agar lebih ketat
  message: string;
  data: Mentoring[]; // Berupa array dari objek Mentoring di atas
}

//Interface untuk Request Body (Data yang dikirim oleh React)
export interface CreateBookingRequest {
  mentoring_id: number;
}

// 2. Interface untuk Detail Data Booking di dalam Response
export interface BookingDetail {
  id: number;
  student_id: number;
  mentoring_id: number;
  order_id: string;
  status: "pending" | "success" | "failed"; // Literal type agar aman dan ketat
  snap_token: string;
}

// Interface Utama untuk Success Response (HTTP 201)
export interface CreateBookingResponse {
  status: "success";
  message: string;
  data: BookingDetail;
}

export interface MentoringDetail {
  id: number;
  title: string;
  description: string | null;
  price: number;
  start_time: string;
  end_time: string;
  status: "available" | "full";
}

export interface BookingHistoryItem {
  id: number;
  student_id: number;
  mentoring_id: number;
  order_id: string;
  status: "pending" | "paid" | "failed"; // Menyesuaikan enum database ['pending', 'paid', 'failed']
  snap_token: string | null;
  created_at: string;
  updated_at: string;
  mentoring: MentoringDetail; // Nested object hasil dari Eager Loading dengan with('mentoring')
}

// Interface Utama bungkus Response sukses dari HTTP 200 Laravel
export interface BookingHistoryResponse {
  status: "success";
  message: string;
  data: BookingHistoryItem[];
}
