import { Reveal } from './reveal';

const INTERNAL_DIVISIONS = [
  {
    id: 'bag-umum',
    tag: 'BU',
    name: 'Bagian Umum & Keuangan',
    shortName: 'Bagian Umum & Keuangan',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200/80',
  },
  {
    id: 'bag-sidang',
    tag: 'BP',
    name: 'Bagian Persidangan & Perundang-undangan',
    shortName: 'Bagian Persidangan & Hukum',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200/80',
  },
  {
    id: 'bag-anggaran',
    tag: 'BA',
    name: 'Bagian Fasilitasi Penganggaran & Pengawasan',
    shortName: 'Bagian Penganggaran & Pengawasan',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200/80',
  },
  {
    id: 'dprd-akd',
    tag: 'AKD',
    name: 'Alat Kelengkapan DPRD Tapin',
    shortName: 'Alat Kelengkapan DPRD',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200/80',
  },
  {
    id: 'pemkab-tapin',
    tag: 'TPN',
    name: 'Pemkab Tapin / BKPSDM',
    shortName: 'Pemkab Tapin / BKPSDM',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200/80',
  },
];

export function DivisionsSection() {
  return (
    <section className="border-y border-neutral-200/70 bg-white/50 py-10 backdrop-blur-xs">
      <Reveal className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <p className="mb-6 text-[11px] font-bold tracking-widest text-neutral-500 uppercase sm:text-xs">
          Digunakan terpadu oleh seluruh bagian dan unit kerja Sekretariat DPRD Kabupaten Tapin
        </p>

        {/* Flexible balanced strip: wraps naturally without crushed vertical text */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 lg:gap-4">
          {INTERNAL_DIVISIONS.map((item, i) => (
            <div
              key={item.id}
              style={{ transitionDelay: `${i * 50}ms` }}
              className="group flex items-center gap-2.5 rounded-full border border-neutral-200/80 bg-white/90 px-3.5 py-1.5 shadow-2xs transition-colors duration-150 hover:border-neutral-300 hover:bg-white"
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-black ${item.badgeClass}`}
              >
                {item.tag}
              </span>
              <span className="text-xs font-semibold text-neutral-800 sm:text-sm">
                <span className="hidden sm:inline sm:whitespace-nowrap">{item.name}</span>
                <span className="sm:hidden">{item.shortName}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
