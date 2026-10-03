import { FEATURE_CHAT_AVATARS } from '~/constants/home';
import { useCountUp } from '~/hooks/use-count-up';
import { useReveal } from '~/hooks/use-reveal';
import type { FeaturesSectionProps } from '~/types/home';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { Reveal } from './reveal';

export function FeaturesSection({ statHadir }: FeaturesSectionProps) {
  const { ref: gaugeRef, visible: gaugeVisible } = useReveal<HTMLDivElement>();
  const animatedGauge = useCountUp(94.2, gaugeVisible, 1200, 1);

  const { ref: statRef, visible: statVisible } = useReveal<HTMLDivElement>();
  const animatedHadir = useCountUp(statHadir, statVisible, 1200);

  return (
    <section id="keunggulan" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto mb-16 max-w-2xl text-center">
        <div className="relative inline-block">
          <span className="font-hand inline-block -rotate-3 transform rounded-full bg-amber-300 px-3 py-0.5 text-lg font-bold text-neutral-900 shadow-sm">
            Kenapa Si Akoor?
          </span>
        </div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Fitur Terpadu untuk Kedisiplinan & Sinergi DPRD Tapin
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
          Menghubungkan presensi apel pagi dengan tindak lanjut instruksi Sekretaris Dewan dan
          Pimpinan Bagian tanpa hambatan birokrasi manual.
        </p>
      </Reveal>

      <div id="fitur" className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Bento 1: Koordinasi Pasca Apel */}
        <Reveal
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-indigo-600 p-6 text-white shadow-xl sm:p-9 md:col-span-7"
          delay={0}
        >
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full border-[28px] border-indigo-500"></div>

          <div>
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-white/30 bg-white/20 px-3 py-1 text-[11px] font-bold tracking-wider text-indigo-100 uppercase backdrop-blur-md"
            >
              Komunikasi & Disposisi Instan
            </Badge>
            <h3 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Koordinasi Pasca Apel Pagi
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-indigo-100 sm:text-base">
              Amanat apel pagi dari Sekretaris Dewan atau Pimpinan Bagian langsung dikonversikan
              menjadi tugas kerja dan disposisi ke staf yang bertugas.
            </p>
          </div>

          <div className="mt-8 max-w-md rounded-2xl bg-white p-5 text-neutral-900 shadow-lg">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {FEATURE_CHAT_AVATARS.map((src, i) => (
                    <Avatar key={src} className="h-7 w-7 border border-white">
                      <AvatarImage src={src} alt={`Staf ${i + 1}`} />
                      <AvatarFallback className="text-[9px]">S{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-700">
                  Tim Fasilitasi Sidang & Reses
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700"
              >
                Aktif
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="rounded-xl rounded-tl-sm bg-amber-100/80 p-2.5 text-neutral-800">
                <span className="block text-[10px] font-bold text-amber-900">Sekretaris DPRD:</span>
                &ldquo;Tolong data kehadiran apel hari ini diekspor untuk bahan evaluasi
                kedisiplinan sebelum rapat koordinasi pimpinan.&rdquo;
              </div>
              <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-indigo-600 p-2.5 text-white">
                &ldquo;Siap laksanakan, laporan rekapitulasi apel sudah tersinkronisasi di portal Si
                Akoor.&rdquo;
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bento 2: Rekapitulasi Otomatis */}
        <Reveal
          className="flex flex-col justify-between rounded-3xl border border-amber-200/80 bg-[#FAF4EC] p-6 shadow-lg sm:p-9 md:col-span-5"
          delay={100}
        >
          <div>
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-amber-300 bg-amber-200 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-900 uppercase"
            >
              Rekapitulasi Otomatis
            </Badge>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">
              Kalkulasi Disiplin & Evaluasi TPP
            </h3>
            <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Dapatkan laporan kehadiran per bagian (Umum, Persidangan, Penganggaran) secara
              otomatis tanpa repot paraf kertas manual.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-700">
                Tingkat Ketertiban Apel DPRD
              </span>
              <span className="text-xs font-extrabold text-indigo-600">Bulan Ini</span>
            </div>

            <div ref={gaugeRef} className="my-3 flex items-center justify-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg
                  className="h-full w-full -rotate-90 transform"
                  viewBox="0 0 80 80"
                  aria-hidden="true"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#F3E8DC"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#6366F1"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="201"
                    strokeDashoffset={25}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-black text-neutral-900">{animatedGauge}%</span>
                  <span className="block text-[8px] font-semibold text-neutral-400 uppercase">
                    Target Tercapai
                  </span>
                </div>
              </div>
            </div>

            <div
              ref={statRef}
              className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-3 text-center"
            >
              <div className="rounded-xl bg-neutral-50 p-2">
                <span className="block text-xs text-neutral-400">Total Hadir</span>
                <span className="text-sm font-extrabold text-neutral-800">
                  {animatedHadir.toLocaleString('id-ID')} Pegawai
                </span>
              </div>
              <div className="rounded-xl bg-neutral-50 p-2">
                <span className="block text-xs text-neutral-400">Izin / DL</span>
                <span className="text-sm font-extrabold text-amber-600">6 Pegawai</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bento 3: Jadwal & Agenda */}
        <Reveal
          className="relative flex flex-col justify-between rounded-3xl border border-lime-300 bg-[#EBF8CC] p-6 shadow-lg sm:p-9 md:col-span-6"
          delay={0}
        >
          <div className="pointer-events-none absolute top-6 right-6 hidden sm:block">
            <span className="font-hand inline-block -rotate-6 text-lg font-bold text-lime-950">
              Notifikasi H-30 Menit
            </span>
            <svg
              className="-mt-1 ml-3 h-10 w-10 text-lime-900"
              viewBox="0 0 50 50"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 5 C 18 20, 25 30, 38 35 M 30 36 L 38 35 L 37 28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-lime-400 bg-lime-300 px-3 py-1 text-[11px] font-bold tracking-wider text-lime-950 uppercase"
            >
              Jadwal & Agenda
            </Badge>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">
              Sinkronisasi Jadwal Petugas Apel
            </h3>
            <p className="max-w-sm text-xs leading-relaxed text-neutral-700 sm:text-sm">
              Rotasi pembina apel (Sekwan/Kabag), komandan apel, pembaca Panca Prasetya Korpri, dan
              pembaca doa terjadwal otomatis di kalender staf.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-lime-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold text-neutral-800">Oktober 2026</span>
              <div className="flex gap-1">
                <span className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-neutral-100 text-xs text-neutral-500">
                  &lt;
                </span>
                <span className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-neutral-100 text-xs text-neutral-500">
                  &gt;
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px]">
              <span className="font-semibold text-neutral-400">S</span>
              <span className="font-semibold text-neutral-400">S</span>
              <span className="font-semibold text-neutral-400">R</span>
              <span className="font-semibold text-neutral-400">K</span>
              <span className="font-semibold text-neutral-400">J</span>
              <span className="font-semibold text-neutral-400">S</span>
              <span className="font-semibold text-neutral-400">M</span>

              <span className="p-1 text-neutral-400">28</span>
              <span className="p-1 text-neutral-400">29</span>
              <span className="p-1 text-neutral-400">30</span>
              <span className="p-1 text-neutral-800">1</span>
              <span className="p-1 text-neutral-800">2</span>
              <span className="p-1 text-neutral-400">3</span>
              <span className="p-1 text-neutral-400">4</span>

              <span className="rounded-full bg-neutral-900 p-1 font-bold text-white">5</span>
              <span className="p-1 font-semibold text-neutral-800">6</span>
              <span className="p-1 font-semibold text-neutral-800">7</span>
              <span className="rounded-full bg-lime-200 p-1 font-bold text-lime-800">8</span>
              <span className="p-1 font-semibold text-neutral-800">9</span>
              <span className="p-1 text-neutral-400">10</span>
              <span className="p-1 text-neutral-400">11</span>
            </div>
          </div>
        </Reveal>

        {/* Bento 4: Geofencing */}
        <Reveal
          className="flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-lg sm:p-9 md:col-span-6"
          delay={100}
        >
          <div>
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-neutral-200 bg-neutral-100 px-3 py-1 text-[11px] font-bold tracking-wider text-neutral-800 uppercase"
            >
              Keamanan Geofencing
            </Badge>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">
              Radius Halaman Kantor DPRD Tapin
            </h3>
            <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Memastikan presensi hanya dapat dilakukan di Halaman Kantor DPRD Kabupaten Tapin
              dengan batas radius aman 25 meter dan proteksi anti-mock location.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200/80 bg-[#FAF8F5] p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-neutral-800">
                  Halaman Kantor DPRD Kab. Tapin
                </span>
              </div>
              <span className="text-[10px] font-bold text-neutral-500">Radius: 25 Meter</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-800">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Validasi Biometrik & Liveness</p>
                  <p className="text-[10px] text-neutral-400">
                    Titik Koordinat: Jl. Brigjend H. Hasan Basry
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                Terverifikasi
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
