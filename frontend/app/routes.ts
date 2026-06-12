import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // beberpaa halaman yang di tutup adalah halaman yang belum di aktifkan

  // login
  route("user", "./routes/user/layout.tsx", [
    // layout tidak bisa di akses , jadi gunakan index() untuk mengarahkan)
    index("./routes/user/profile.tsx"), // halaman index ke user[:]
    route("signIn", "./routes/user/signIn.tsx"),
    route("signUp", "./routes/user/signUp.tsx"),
  ]),

  // kelas
  route("kelas", "./routes/kelas/layout.tsx", [
    index("./routes/kelas/kelas.tsx"),
    route("daftar", "./routes/kelas/daftarKelas.tsx"),
    // route("history", "./routes/kelas/historyKelas.tsx"),
    route("booking", "./routes/kelas/bookingKelas.tsx"),
  ]),

  // konsultasi
  route("konsultasi", "./routes/konsultasi/layout.tsx", [
    index("./routes/konsultasi/konsultasi.tsx"),
    // route("daftar", "./routes/kelas/daftarKelas.tsx"),
    route("histori", "./routes/kelas/historyKelas.tsx"), // history 1 aja
    // route("booking", "./routes/kelas/bookingKelas.tsx"),
  ]),

  // halamn hotfound paling bawah
  route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
