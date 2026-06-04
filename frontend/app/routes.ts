import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // login
  route("user", "./routes/user/layout.tsx", [
    // layout tidak bisa di akses , jadi gunakan index() untuk mengarahkan)
    index("./routes/user/profile.tsx"),
    route("signIn", "./routes/user/signIn.tsx"),
    route("signUp", "./routes/user/signUp.tsx"),
  ]),

  // kelas
  route("kelas", "./routes/kelas/layout.tsx", [
    index("./routes/kelas/kelas.tsx"),
    route("daftar", "./routes/kelas/daftarKelas.tsx"),
    route("history", "./routes/kelas/historyKelas.tsx"),
    route("booking", "./routes/kelas/bookingKelas.tsx"),
  ]),

  // halamn hotfound paling bawah
  route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
