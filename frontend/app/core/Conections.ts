import type { TypeResponseUserApi, TypeUserApi } from "./types";



// export const PATHSERVER: string = "http://192.168.190.44:8000/api";
// export const PATHSERVER: string = "http://127.0.0.1:8000/api";
export const PATHSERVER: string =  import.meta.env.FRONT_API|| "/api";

export const SignIn = PATHSERVER + "/login";
export const SignUp = PATHSERVER + "/register";
export const SignOut = PATHSERVER + "/logout";
export const User = PATHSERVER + "/user";
export const Mentorings = PATHSERVER + "/mentorings";
export const MentoringsHistory = PATHSERVER + "/mentorings/history";
export const BookingHistory = PATHSERVER + "/booking/history";

export const BookingCreate = PATHSERVER + "/booking/create";

// di sini saya menguunakan Generic agar sesui dengan typenya nantik

// export function GETdata() : Promise

/**
 * Fungsi universal untuk mengambil/mengirim data ke Backend
 */
export async function GetApiData<Type>(
  url: string,
  options?: RequestInit,
): Promise<Type> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data yang didapat:", data);

    return data as Type;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Lempar kembali error agar komponen React tahu kalau request gagal
    throw error;
  }
}
// Tentukan return type berupa Promise<TypeResponseUserApi>
export async function sendPostData<Type>(
  url: string,
  data: any,
  token?: string,
): Promise<Type> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Biasanya Laravel Passport/Sanctum membutuhkan prefix 'Bearer '
        Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
      },
      body: JSON.stringify(data),
    });

    // JIKA TERJADI ERROR (422, 401, 500, dll)
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      
      // 1. Cek apakah server benar-benar mengembalikan format JSON
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      } else {
        // 2. Jika server melempar HTML (seperti eror 405 / 500 Nginx)
        const errorText = await response.text(); // Baca sebagai teks biasa, bukan JSON
        console.error("HTML Error dari Server:", errorText);
        throw new Error(`Server Error (${response.status}): Request ditolak atau rute salah.`);
      }
    }

    // Biarkan response.json() mengikuti 'Type' yang diminta saat fungsi dipanggil
    const result = await response.json();

    console.info("Berhasil menerima response dari Laravel:", result);

    return result as Type;
  } catch (err) {
    console.error("Gagal mengirim data:", err);
    throw err;
  }
}
