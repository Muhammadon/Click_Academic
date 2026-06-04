import Sidebar from "~/component/sidebar";
import { exampleApiData } from "~/example/exampleApiData";

export default function ClassListPage() {
  return (
    <div className="min-h-screen bg-mint-lembut       flex
        flex-col
        md:flex-row">
      <Sidebar />

      <div className="overflow-y-scroll max-h-screen w-full">
        <section className="relative overflow-hidden  bg-hijau-botol py-16 text-putih-bersih ">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-kuning-emas/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-soft-ochre/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-putih-bersih/20 bg-putih-bersih/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                🎓 Program Pelatihan Mahasiswa
              </div>

              <h2 className="mt-6 text-5xl font-black leading-tight">
                Tingkatkan Skill
                <br />
                dan Kompetensi
                <br />
                Akademikmu.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-putih-bersih/80">
                Pilih berbagai kelas pelatihan mulai dari teknologi, desain,
                kepemimpinan, hingga pengembangan soft skill bersama mentor
                profesional.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="mt-10 grid gap-4 rounded-3xl border border-putih-bersih/10 bg-putih-bersih/10 p-5 backdrop-blur-xl lg:grid-cols-4">
              <input
                type="text"
                placeholder="Cari kelas pelatihan..."
                className="rounded-2xl border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-4 text-putih-bersih placeholder:text-putih-bersih/60 outline-none focus:border-kuning-emas"
              />

              <select className="rounded-2xl border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-4 text-putih-bersih outline-none focus:border-kuning-emas">
                <option className="text-charcoal">Semua Kategori</option>
                <option className="text-charcoal">Programming</option>
                <option className="text-charcoal">Design</option>
                <option className="text-charcoal">Security</option>
              </select>

              <select className="rounded-2xl border border-putih-bersih/10 bg-putih-bersih/10 px-5 py-4 text-putih-bersih outline-none focus:border-kuning-emas">
                <option className="text-charcoal">Semua Level</option>
                <option className="text-charcoal">Beginner</option>
                <option className="text-charcoal">Intermediate</option>
                <option className="text-charcoal">Advanced</option>
              </select>

              <button className="rounded-2xl bg-kuning-emas px-5 py-4 font-bold text-charcoal transition-all duration-300 hover:bg-soft-ochre">
                Cari Kelas
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto grid max-w-7xl gap-5 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
            <p className="text-sm font-semibold text-dark-slate/70">
              Total Kelas
            </p>
            <h3 className="mt-3 text-4xl font-black text-hijau-botol">120+</h3>
          </div>

          <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
            <p className="text-sm font-semibold text-dark-slate/70">
              Mentor Aktif
            </p>
            <h3 className="mt-3 text-4xl font-black text-deep-teal">35+</h3>
          </div>

          <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
            <p className="text-sm font-semibold text-dark-slate/70">
              Peserta Aktif
            </p>
            <h3 className="mt-3 text-4xl font-black text-terracotta">1.2K</h3>
          </div>

          <div className="rounded-3xl border border-sage/20 bg-putih-bersih p-6 shadow-lg">
            <p className="text-sm font-semibold text-dark-slate/70">
              Tingkat Kelulusan
            </p>
            <h3 className="mt-3 text-4xl font-black text-olive">95%</h3>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {exampleApiData.map((item, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-[32px] border border-sage/20 bg-putih-bersih shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
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
                    <div className="rounded-2xl bg-mint-lembut p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-dark-slate/60">
                        Peserta
                      </p>
                      <p className="mt-2 text-2xl font-black text-hijau-botol">
                        {item.students}
                      </p>
                    </div>

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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
