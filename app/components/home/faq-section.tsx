import { useState } from 'react';

import { Reveal } from './reveal';

const FAQ_ITEMS = [
  {
    id: 'faq1',
    question:
      'Apakah Si Akoor digunakan oleh seluruh pegawai di lingkungan Sekretariat DPRD Tapin?',
    answer:
      'Ya. Si Akoor dirancang khusus untuk internal Sekretariat DPRD Kabupaten Tapin, mencakup Aparatur Sipil Negara (PNS dan PPPK) serta Tenaga Alih Daya/Honorer dan staf pendukung di seluruh bagian sekretariat.',
  },
  {
    id: 'faq2',
    question:
      'Bagaimana jika pegawai sedang melaksanakan tugas dinas luar atau pendampingan reses/komisi?',
    answer:
      'Pegawai yang bertugas mendampingi agenda reses, kunjungan kerja, atau dinas luar dapat mengajukan status Dinas Luar (DL) dengan mengunggah Surat Perintah Tugas (SPT) yang telah disetujui pimpinan bagian melalui portal Si Akoor.',
  },
  {
    id: 'faq3',
    question:
      'Bagaimana jika ada kendala koneksi internet di halaman kantor DPRD saat apel berlangsung?',
    answer:
      'Si Akoor menerapkan Offline-First Cache Architecture. Data presensi dan koordinasi tetap terenkripsi dan tersimpan di memori perangkat, kemudian otomatis disinkronisasi ke server begitu terhubung ke jaringan internet kantor DPRD Tapin.',
  },
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq1');

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="mb-12 text-center">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold tracking-wider text-amber-600 uppercase">
          FAQ
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
          Pertanyaan yang Sering Diajukan
        </h2>
      </Reveal>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openFaq === item.id;
          return (
            <Reveal key={item.id} delay={i * 80}>
              <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : item.id)}
                  className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-sm font-bold text-neutral-800 transition-colors hover:bg-neutral-50 sm:text-base"
                >
                  <span>{item.question}</span>
                  <span className="text-lg text-neutral-400">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen ? (
                  <div className="border-t border-neutral-100 px-6 pt-3 pb-4 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
