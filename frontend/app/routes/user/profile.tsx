/**
 * lebih ke halaman profil user
 */

import { Outlet } from "react-router";
import type { Route } from "../+types/home";
import {
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiUserLine,
  RiAwardLine,
  RiBookLine,
} from "@remixicon/react";



export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}



export default function User() {


  return (
    <div className="min-h-screen bg-[var(--color-mint-lembut)]">
      <section className="relative">
        <div className="h-52 md:h-72 bg-[var(--color-hijau-uin)]" />

        <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 md:left-16 md:translate-x-0">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-[var(--color-kuning-emas)] bg-[var(--color-pale-eucalyptus)] overflow-hidden shadow-lg">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <main className="pt-20 md:pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <section className="text-center md:text-left mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-charcoal)]">
            Muhammad Nadhar
          </h1>

          <p className="text-[var(--color-dark-slate)] mt-2">
            Fullstack Developer
          </p>

          <button className="mt-4 px-5 py-2 rounded-lg bg-[var(--color-hijau-zamrud)] text-white font-medium hover:opacity-90 transition">
            Edit Profile
          </button>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-[var(--color-charcoal)]">
              Informasi Profil
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <RiUserLine
                  size={20}
                  className="text-[var(--color-toska-tua)]"
                />
                <span>Mahasiswa UIN Ar-Raniry</span>
              </div>

              <div className="flex items-center gap-3">
                <RiMailLine
                  size={20}
                  className="text-[var(--color-toska-tua)]"
                />
                <span>example@email.com</span>
              </div>

              <div className="flex items-center gap-3">
                <RiPhoneLine
                  size={20}
                  className="text-[var(--color-toska-tua)]"
                />
                <span>+62 812 3456 7890</span>
              </div>

              <div className="flex items-center gap-3">
                <RiMapPinLine
                  size={20}
                  className="text-[var(--color-toska-tua)]"
                />
                <span>Banda Aceh, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Card Statistik */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-[var(--color-charcoal)]">
              Statistik
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[var(--color-champagne)] p-5">
                <RiBookLine
                  size={28}
                  className="mb-3 text-[var(--color-olive)]"
                />

                <p className="text-sm text-gray-500">
                  Kursus
                </p>

                <h3 className="text-2xl font-bold">
                  12
                </h3>
              </div>

              <div className="rounded-xl bg-[var(--color-champagne)] p-5">
                <RiAwardLine
                  size={28}
                  className="mb-3 text-[var(--color-olive)]"
                />

                <p className="text-sm text-gray-500">
                  Sertifikat
                </p>

                <h3 className="text-2xl font-bold">
                  8
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <section className="mt-6 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-charcoal)]">
            Tentang Saya
          </h2>

          <p className="leading-7 text-[var(--color-dark-slate)]">
            Saya seorang Fullstack Developer yang fokus pada
            pengembangan aplikasi web menggunakan React,
            TypeScript, NestJS, PostgreSQL, dan berbagai
            teknologi modern lainnya.
          </p>
        </section>
      </main>
    </div>
  )
}
