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
export enum BookingStatus {
  PAID = "paid",
  PENDING = "pending",
  FAILED = "failed",
}

export interface ErrorResponse {
  message: string;
  status: string;
  error: string;
}

export interface TypeUserApi {
  id?: number;
  username: string;
  email: string;
  role: string;
}

export interface GetUserData {
  message: string;
  status: string;
  data: TypeUserApi;
}

// gunkna di login
export interface TypeResponseUserLogin {
  status: string;
  message: string;
  token?: string;
  data?: TypeUserApi; // nantik ubah sesuikn dengan backend ajaj bgdar
}

// gunkan di register dan profile
export interface TypeResponseUserApi {
  id: number;
  status: string;
  message: string;
  data: TypeUserApi;
  role: string;
}

// Interface untuk objek item kelas mentoring tunggal
export interface Mentoring {
  id: number;
  title: string;
  description: string | null;
  price: number;
  start_time: string;
  end_time: string;
  status: "available" | "full";
}

// Interface utama untuk response sukses HTTP 200
export interface MentoringListResponse {
  status: "success" | "error"; // Menggunakan literal type agar lebih ketat
  message: string;
  data: Mentoring[]; // Berupa array dari objek Mentoring di atas
}
// 1 detail menoring
export interface DetailMentoringResponse {
  status: "success" | "error"; // Menggunakan literal type agar lebih ketat
  message: string;
  data: Mentoring;
}

export interface Booking {
  id: number;
  student_id: number;
  mentoring_id: number;
  order_id: string;
status: BookingStatus; // Menggunakan literal type agar lebih ketat dan aman
  snap_token: string;
  created_at?: string; // Optional, format ISO string dari Laravel timestamp
  updated_at?: string; // Optional
}

//Interface untuk Request Body (Data yang dikirim oleh React)
export interface CreateBookingRequest {
  mentoring_id: number;
}

// Interface Utama untuk Success Response (HTTP 201)
export interface CreateBookingResponse {
  status: "success";
  message: string;
  snap_token: string;
  data: Booking;
}

export interface BookingHistoryItem {
   status: "success";
  message: string; 
 data : Booking[];
}


