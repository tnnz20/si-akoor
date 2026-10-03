import { Link } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Reveal } from './reveal';

export function CtaSection() {
  const handleCopyContact = () => {
    const textToCopy =
      'Sekretariat DPRD Kab. Tapin: setwan@tapinkab.go.id | Bagian Umum & Kepegawaian';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    }
    toast.success('Kontak disalin ke clipboard!', {
      description: 'Sekretariat DPRD Kab. Tapin: setwan@tapinkab.go.id',
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-3xl bg-neutral-900 p-8 text-center text-white shadow-2xl sm:p-14">
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full border-[12px] border-neutral-800"></div>
        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full border-[12px] border-neutral-800"></div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Disiplin Apel & Sinergi Sekretariat DPRD Tapin
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-neutral-300 sm:text-base">
            Akses portal presensi apel pagi dan tindak lanjut instruksi pimpinan terpadu untuk
            seluruh jajaran aparatur Sekretariat DPRD Kabupaten Tapin.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="h-auto cursor-pointer rounded-full bg-amber-400 px-8 py-4 text-sm font-bold text-neutral-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-xl sm:text-base"
            >
              <Link to="/login">Masuk ke Sistem Si Akoor</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCopyContact}
              className="h-auto cursor-pointer rounded-full border-neutral-700 bg-neutral-800 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 hover:text-white sm:text-base"
            >
              Kontak Bagian Umum & Kepegawaian
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
