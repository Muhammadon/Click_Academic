import { RiArrowLeftLine } from "@remixicon/react"
import type { TypeApi } from "~/core/type"



export const CardKelas = (item: TypeApi) => {
  return (
    <>
      <div
        className="group overflow-hidden rounded-[32px] border border-charcoal bg-putih-bersih shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div
          className={`relative h-52 overflow-hidden bg-gradient-to-br ${item.color} p-6 text-putih-bersih`}
        >
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-putih-bersih/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                {item.category}
              </span>

              <span className="rounded-full bg-kuning-emas px-3 py-1 text-xs font-bold text-charcoal">
                {item.level}
              </span>
            </div>

            <div>
              <h3 className="text-3xl font-black leading-tight">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-putih-bersih/80">
                Mentor: {item.mentor}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {/*<div className="rounded-2xl bg-mint-lembut p-4">
            //   <p className="text-xs font-semibold uppercase tracking-wide text-dark-slate/60">
            //     Peserta
            //   </p>
            //   <p className="mt-2 text-2xl font-black text-hijau-botol">
            //     {item.students}
            //   </p>
            // </div>
        */}
            <div className="rounded-2xl bg-cream p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-dark-slate/60">
                Durasi
              </p>
              <p className="mt-2 text-2xl font-black text-terracotta">
                {item.duration}
              </p>
            </div>
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-hijau-uin px-5 py-4 text-base font-bold text-putih-bersih transition-all duration-300 hover:bg-hijau-botol">
            Lihat Detail Kelas
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
