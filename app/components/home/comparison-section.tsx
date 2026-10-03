import { AKNOR_POINTS, MANUAL_POINTS } from '~/constants/home';

import { Card } from '@/components/ui/card';

import { Reveal } from './reveal';

export function ComparisonSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
          Modernisasi Presensi Apel DPRD Tapin
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Peningkatan disiplin aparatur dengan beralih dari absensi paraf kertas manual ke ekosistem
          digital Si Akoor.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <Card className="overflow-hidden rounded-3xl border-neutral-200/90 bg-white p-0 shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-neutral-200 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="bg-neutral-50/50 p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-rose-600">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs">
                  ✕
                </span>
                <span>Metode Absensi Paraf Lembaran Kertas</span>
              </div>
              <ul className="space-y-3.5 text-xs text-neutral-600 sm:text-sm">
                {MANUAL_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="font-bold text-rose-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/30 p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-emerald-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs">
                  ✓
                </span>
                <span>Dengan Ekosistem Si Akoor DPRD Tapin</span>
              </div>
              <ul className="space-y-3.5 text-xs text-neutral-800 sm:text-sm">
                {AKNOR_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="font-bold text-emerald-600">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
