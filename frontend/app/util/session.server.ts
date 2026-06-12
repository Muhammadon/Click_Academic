import { createCookie } from "react-router"; // atau "@remix-run/node" tergantung versi/setup

// Membuat definisi cookie untuk menyimpan token Laravel
export const userSessionCookie = createCookie("user_token", {
  httpOnly: true, // Amankan dari XSS (tidak bisa dibaca lewat JavaScript client)
  secure: process.env.NODE_ENV === "production", // Wajib HTTPS di production
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // Aktif selama 7 hari
});

// Helper untuk mengambil token dari request header
export async function getTokenFromRequest(
  request: Request,
): Promise<string | null> {
  const cookieHeader = request.headers.get("Cookie");
  console.info("cookies : ", cookieHeader);
  return await userSessionCookie.parse(cookieHeader);
}
