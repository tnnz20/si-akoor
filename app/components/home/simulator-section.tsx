import { useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';
import type { SimState, SimulatorSectionProps } from '~/types/home';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { RefreshCw } from 'lucide-react';

import { Reveal } from './reveal';

export function SimulatorSection({ onVerified }: SimulatorSectionProps) {
  const [simState, setSimState] = useState<SimState>('idle');
  const timerIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timerIdsRef.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleRunSimulator = () => {
    if (simState === 'simulating') return;
    setSimState('simulating');

    const timer1 = setTimeout(() => {
      setSimState('verified');
      onVerified();
      toast.success('Presensi apel berhasil diverifikasi!', {
        description: 'Lokasi: Halaman Kantor DPRD Kab. Tapin (Radius valid)',
      });

      const timer2 = setTimeout(() => {
        setSimState('idle');
      }, 5000);
      timerIdsRef.current.push(timer2);
    }, 1600);
    timerIdsRef.current.push(timer1);
  };

  return (
    <section id="simulator" className="relative overflow-hidden bg-neutral-900 py-20 text-white">
      <div className="pointer-events-none absolute top-10 left-16 h-24 w-24 rounded-full border-8 border-neutral-800"></div>
      <div className="pointer-events-none absolute right-16 bottom-10 h-32 w-32 rounded-full border-[10px] border-neutral-800"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-3 rounded-full border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider text-amber-300 uppercase"
          >
            Simulasi Presensi
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Alur Presensi Apel DPRD Tapin
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Uji alur validasi koordinat GPS apel pagi aparatur di Halaman Kantor DPRD Kabupaten
            Tapin.
          </p>
        </Reveal>

        <Reveal
          className="rounded-3xl border border-neutral-700 bg-neutral-800/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10"
          delay={150}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Left simulation phone interface */}
            <div className="rounded-3xl border-2 border-neutral-700 bg-neutral-900 p-5 shadow-inner lg:col-span-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs text-neutral-400">
                <span>📍 Halaman Kantor DPRD Kab. Tapin</span>
                <span className="font-mono text-emerald-400">07:28:14 WITA</span>
              </div>

              <div className="group relative my-4 flex h-48 flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-neutral-600 bg-neutral-800">
                <div className="flex h-full w-full flex-col items-center justify-center transition-all duration-300">
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400">
                    <svg
                      className="h-8 w-8 text-amber-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-neutral-300">
                    Arahkan wajah ke kamera
                  </span>
                </div>

                {simState === 'verified' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/90 transition-opacity duration-300">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white">
                      ✓
                    </div>
                    <span className="text-xs font-bold text-emerald-200">
                      Presensi Apel Terverifikasi
                    </span>
                    <span className="text-[10px] text-neutral-400">Halaman Kantor DPRD</span>
                  </div>
                ) : null}
              </div>

              <Button
                type="button"
                onClick={handleRunSimulator}
                disabled={simState === 'simulating'}
                className={`flex h-auto w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-lg transition-all active:scale-98 ${
                  simState === 'verified'
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : simState === 'simulating'
                      ? 'cursor-not-allowed bg-amber-500/80 text-neutral-900'
                      : 'bg-amber-400 text-neutral-900 hover:bg-amber-500'
                }`}
              >
                {simState === 'simulating' ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-neutral-900" />
                    <span>Memverifikasi Wajah & Geotag...</span>
                  </>
                ) : simState === 'verified' ? (
                  <span>Presensi Sukses Terdata!</span>
                ) : (
                  <>
                    <span>Tekan untuk Simulasi Absen</span>
                    <span className="text-xs">⚡</span>
                  </>
                )}
              </Button>
            </div>

            {/* Right: Real-time telemetry log */}
            <div className="space-y-4 text-xs lg:col-span-7">
              <h3 className="flex items-center gap-2 text-base font-bold text-neutral-100">
                <span>Status Verifikasi Sistem DPRD Tapin</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] ${
                    simState === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : simState === 'simulating'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-neutral-700 text-neutral-300'
                  }`}
                >
                  {simState === 'verified'
                    ? 'Terverifikasi Hadir'
                    : simState === 'simulating'
                      ? 'Memeriksa Validasi...'
                      : 'Menunggu Aksi'}
                </span>
              </h3>

              <div className="space-y-2.5 font-mono">
                <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900/80 p-3">
                  <span className="text-neutral-400">Titik Koordinat:</span>
                  <span className="text-amber-400">
                    -2.9351° S, 115.1482° E (Kantor DPRD Tapin)
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900/80 p-3">
                  <span className="text-neutral-400">Jarak ke Titik Apel:</span>
                  <span className="text-emerald-400">
                    6.2 meter (Dalam Radius Aman Halaman &lt; 25m)
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900/80 p-3">
                  <span className="text-neutral-400">Integritas Perangkat:</span>
                  <span className="text-neutral-200">
                    Bebas Fake GPS / Mock Location Terverifikasi
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900/80 p-3">
                  <span className="text-neutral-400">Sinkronisasi Server:</span>
                  <span
                    className={
                      simState === 'verified' ? 'font-bold text-emerald-400' : 'text-neutral-400'
                    }
                  >
                    {simState === 'verified'
                      ? 'Tersinkronisasi ke Server Sekretariat DPRD (ID: AK-TPN-092)'
                      : 'Siap Kirim Payload'}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/50 p-3.5 text-xs text-indigo-200">
                💡 <strong>Catatan Teknis:</strong> Data presensi dan koordinat diproses secara aman
                pada server internal Sekretariat DPRD Kabupaten Tapin untuk memastikan keaslian
                kehadiran di lapangan upacara.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
