import { CardKelas } from "~/component/cardKelas";
import Sidebar from "~/component/sidebar";
import { exampleApiData } from "~/example/exampleApiData";

export default function ClassListPage() {
  return (
    <>
      <section className="relative  bg-hijau-botol py-16 text-putih-bersih ">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-kuning-emas/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-soft-ochre/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl p-3.5">
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
            <CardKelas item={item} key={index} />
          ))}
        </div>
      </section>
    </>
  );
}
