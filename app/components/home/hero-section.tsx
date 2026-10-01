import { useState } from 'react';
import type { FormEvent } from 'react';

import { Link } from 'react-router';
import { useCountUp } from '~/hooks/use-count-up';
import { useReveal } from '~/hooks/use-reveal';

import { ArrowRight, Bell, Radio, Send, Users } from 'lucide-react';

import { Reveal } from './reveal';
import { useToast } from './toast';

interface ChatMessage {
  id: string;
  sender: string;
  time: string;
  text: string;
  variant: 'yellow' | 'lime' | 'user';
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'Sekretaris DPRD',
    time: '10:25',
    text: 'Mohon rekapitulasi kehadiran apel pagi disiapkan sebelum jam 10.30 untuk evaluasi kedisiplinan staf.',
    variant: 'yellow',
  },
  {
    id: 'msg-2',
    sender: 'Staf Umum & Kepegawaian',
    time: '10:32',
    text: 'Siap laksanakan Pak Sekwan, data kehadiran aparatur sudah terekap otomatis di portal Si Akoor 🙏',
    variant: 'lime',
  },
];

const MOCKUP_TABS = [
  'Ikhtisar',
  'Presensi Apel',
  'Koordinasi Tim',
  'Jadwal Agenda',
  'Aktivitas',
] as const;

const TAB_HEADINGS: Record<(typeof MOCKUP_TABS)[number], string> = {
  Ikhtisar: 'Selamat datang kembali, Drs. H. Noor Ifansyah, M.AP',
  'Presensi Apel': 'Presensi Apel Pagi — Rekapitulasi Hari Ini',
  'Koordinasi Tim': 'Ruang Koordinasi Antar Bagian',
  'Jadwal Agenda': 'Agenda Kedinasan Pekan Ini',
  Aktivitas: 'Log Aktivitas Sekretariat Terkini',
};

const CHAT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop',
];

const TASK_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
];

const AGENDA_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
];

const WEEK_BARS = [
  { day: 'Sen', level: 'h-16', active: false },
  { day: 'Sel', level: 'h-20', active: false },
  { day: 'Rab', level: 'h-26', active: true },
  { day: 'Kam', level: 'h-18', active: false },
  { day: 'Jum', level: 'h-14', active: false },
  { day: 'Sab', level: 'h-8', active: false },
  { day: 'Min', level: 'h-8', active: false },
];

interface HeroSectionProps {
  statHadir: number;
  onCheckin: () => void;
}

export function HeroSection({ statHadir, onCheckin }: HeroSectionProps) {
  const notify = useToast();

  const [activeTab, setActiveTab] = useState<(typeof MOCKUP_TABS)[number]>('Ikhtisar');
  const [gaugeValue, setGaugeValue] = useState(94.2);
  const [gaugeOffset, setGaugeOffset] = useState(25.8);
  const [chartPeriod, setChartPeriod] = useState<'Bulan' | 'Tahun'>('Bulan');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState('');

  const { ref: gaugeRef, visible: gaugeVisible } = useReveal<HTMLDivElement>();
  const animatedGauge = useCountUp(gaugeValue, gaugeVisible, 1200, 1);

  const handleQuickCheckin = () => {
    setGaugeOffset(10);
    setGaugeValue(97.8);
    onCheckin();
    notify('Data presensi apel internal DPRD Tapin disinkronkan ke dashboard!');
  };

  const handleSendChat = (e: FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Anda (Staf Sekretariat)',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      text,
      variant: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setChatInput('');
    notify(`Pesan terkirim ke Ruang Koordinasi DPRD: "${text}"`);
  };

  const handleCopyContact = () => {
    const textToCopy =
      'Sekretariat DPRD Kab. Tapin: setwan@tapinkab.go.id | Bagian Umum & Kepegawaian';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    }
    notify('Kontak Sekretariat DPRD Kabupaten Tapin disalin ke clipboard!');
  };

  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-10 pb-16 text-center sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200/80 bg-white/90 px-4 py-1.5 shadow-sm transition-shadow hover:shadow">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600"></span>
            <span className="text-xs font-bold text-neutral-800">
              Portal Resmi Internal &bull; Sekretariat DPRD Kabupaten Tapin
            </span>
          </div>
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl leading-[1.15] font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
          Manajemen apel terpadu <br className="hidden sm:inline" />
          <span className="relative inline-block">
            Sekretariat DPRD Tapin
            <svg
              className="absolute -bottom-2 left-0 -z-10 h-3 w-full text-amber-300/80"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 10C50 2 150 2 198 8"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-lg">
          Sederhanakan presensi apel pagi, tindak lanjuti instruksi pimpinan dan Sekretaris DPRD
          tanpa terputus, serta optimalkan disiplin kinerja aparatur di lingkungan Sekretariat DPRD
          Kabupaten Tapin.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/login"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-neutral-900 shadow transition-all hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg active:translate-y-0 sm:text-base"
          >
            <span>Masuk ke Sistem</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={handleCopyContact}
            className="cursor-pointer rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 hover:shadow sm:text-base"
          >
            Bantuan Bagian Umum & Kepegawaian
          </button>
        </div>
      </Reveal>

      {/* Mockup Dashboard */}
      <Reveal id="mockup-dashboard" className="relative mx-auto mt-14 max-w-5xl" delay={150}>
        {/* Hand-drawn Annotation Left */}
        <div className="pointer-events-none absolute -top-12 left-10 z-20 hidden lg:block">
          <div className="font-hand -rotate-6 text-2xl font-bold tracking-wide text-neutral-800">
            Tombol Aksi Cepat
          </div>
          <svg
            className="curved-arrow -mt-2 ml-6 h-16 w-16 text-neutral-800"
            viewBox="0 0 70 70"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15 8 C 26 30, 32 48, 52 52 M 40 54 L 52 52 L 53 40"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Hand-drawn Annotation Right */}
        <div className="pointer-events-none absolute -top-11 right-12 z-20 hidden lg:block">
          <div className="font-hand rotate-3 text-2xl font-bold tracking-wide text-neutral-800">
            Layout Bersih & Minimalis
          </div>
          <svg
            className="curved-arrow -mt-2 ml-10 h-16 w-16 text-neutral-800"
            viewBox="0 0 70 70"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M55 8 C 42 28, 32 44, 16 52 M 25 55 L 16 52 L 18 41"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-5 text-left shadow-2xl sm:p-7">
          {/* Mockup App Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-xs font-extrabold tracking-tight text-white">
                AK
              </div>
              <span className="text-base font-bold tracking-tight text-neutral-900">
                Si Akoor<span className="text-amber-500">.</span>
                <span className="ml-2 text-xs font-semibold text-neutral-400">DPRD Tapin</span>
              </span>
            </div>

            <div className="hidden items-center gap-1.5 rounded-full bg-neutral-100/80 p-1 text-xs font-semibold text-neutral-600 md:flex">
              {MOCKUP_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab);
                      notify(`Beralih ke tab: ${tab}`);
                    }}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 transition-colors ${
                      isActive
                        ? 'bg-white text-neutral-900 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => notify('Tidak ada notifikasi baru.')}
                className="relative cursor-pointer"
                aria-label="Notifikasi"
              >
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full border border-white bg-amber-400"></span>
                <Bell className="h-5 w-5 text-neutral-500 hover:text-neutral-800" />
              </button>
              <div className="h-8 w-8 overflow-hidden rounded-full border border-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces"
                  alt="Pejabat Sekretariat DPRD"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mockup subheader */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 py-5">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
                {TAB_HEADINGS[activeTab]}
              </h2>
              <p className="mt-0.5 text-xs font-medium text-neutral-400">
                Senin, 5 Oktober 2026 &bull; Apel Pagi Sekretariat DPRD Kabupaten Tapin
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleQuickCheckin}
                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-neutral-800"
              >
                <span className="text-sm leading-none">+</span>
                <span>Buat Disposisi Apel</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  notify('Pemberitahuan apel dikirimkan ke 142 pegawai Sekretariat DPRD Tapin.')
                }
                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-100 px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
              >
                <Users className="h-3.5 w-3.5 text-neutral-500" />
                <span>Notifikasi Staf</span>
              </button>
              <button
                type="button"
                onClick={() => notify('Pelacak waktu apel aktif di Halaman Kantor DPRD')}
                className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-neutral-100 px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 sm:flex"
              >
                <Radio className="h-3.5 w-3.5 text-neutral-500" />
                <span>Mulai Presensi</span>
              </button>
            </div>
          </div>

          {/* Bento Grid Inside Mockup */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-12">
            {/* Bento 1: Attendance Performance */}
            <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF8F5] p-5 md:col-span-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">
                    Kehadiran Sekretariat DPRD
                  </span>
                  <button
                    type="button"
                    onClick={() => notify('Membuka rekap kehadiran internal DPRD Tapin...')}
                    className="cursor-pointer text-[11px] font-semibold text-neutral-400 hover:text-neutral-700"
                  >
                    Lihat Semua
                  </button>
                </div>
                <p className="mb-3 text-[10px] text-neutral-400">Rekap Kehadiran Seluruh Bagian</p>
              </div>

              <div
                ref={gaugeRef}
                className="relative flex flex-col items-center justify-center py-2"
              >
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <svg
                    className="h-full w-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#EAE5DC"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#6366F1"
                      strokeWidth="9"
                      fill="transparent"
                      strokeDasharray="238.76"
                      strokeDashoffset={gaugeOffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-black tracking-tight text-neutral-900">
                      {animatedGauge}%
                    </span>
                    <span className="text-[9px] font-semibold tracking-wider text-neutral-500 uppercase">
                      Hadir Tepat
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center justify-between border-t border-neutral-200/60 pt-3 text-[10px]">
                  <div className="flex items-center gap-1 text-neutral-600">
                    <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span>Tepat Waktu</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                    <span>Dinas Luar</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <span className="h-2 w-2 rounded-full bg-neutral-300"></span>
                    <span>Izin Resmi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 2: Follow-up action card */}
            <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF8F5] p-5 md:col-span-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">
                    Tindak Lanjut Arahan Apel
                  </span>
                  <span className="text-[10px] font-medium text-neutral-400">2 Agenda Siap</span>
                </div>
                <p className="mb-4 text-[10px] text-neutral-400">
                  Fasilitasi Bahan Rapat Paripurna & Pengawasan
                </p>

                <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-bold text-neutral-900">
                      Fasilitasi Rapat Paripurna RAPBD
                    </h4>
                    <span className="text-xs font-black text-neutral-900">78%</span>
                  </div>
                  <p className="mb-3 text-[10px] leading-relaxed text-neutral-500">
                    Penyelarasan notulensi apel dan koordinasi berkas sidang bersama Badan Anggaran
                    DPRD.
                  </p>

                  <div className="flex items-center justify-between border-t border-neutral-100 pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-indigo-100 px-2 py-0.5 text-[9px] font-bold text-indigo-900">
                        Bag. Persidangan
                      </span>
                      <span className="rounded bg-neutral-100 px-2 py-0.5 text-[9px] font-bold text-neutral-700">
                        Bag. Umum
                      </span>
                    </div>
                    <div className="flex -space-x-1.5">
                      {TASK_AVATARS.map((src, i) => (
                        <img
                          key={src}
                          className="h-5 w-5 rounded-full border border-white"
                          src={src}
                          alt={`Staf ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Target Sidang: 09.30 WITA</span>
                <span className="font-bold text-indigo-600">On Schedule</span>
              </div>
            </div>

            {/* Bento 3: In-app chat */}
            <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF8F5] p-5 md:col-span-4">
              <div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {CHAT_AVATARS.map((src, i) => (
                        <img
                          key={src}
                          className="h-6 w-6 rounded-full border-2 border-white object-cover"
                          src={src}
                          alt={`Staf ${i + 1}`}
                        />
                      ))}
                    </div>
                    <span className="rounded-full border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-neutral-500">
                      3 Bagian
                    </span>
                  </div>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                </div>

                <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                  {messages.map((msg) => {
                    if (msg.variant === 'yellow') {
                      return (
                        <div
                          key={msg.id}
                          className="rounded-2xl rounded-tl-sm border border-amber-200 bg-[#FDE047]/40 p-2.5 text-[11px] leading-relaxed text-neutral-900 shadow-2xs"
                        >
                          <div className="mb-0.5 flex items-center justify-between text-[9px] font-bold text-amber-900">
                            <span>{msg.sender}</span>
                            <span className="font-normal text-neutral-400">{msg.time}</span>
                          </div>
                          &ldquo;{msg.text}&rdquo;
                        </div>
                      );
                    }

                    if (msg.variant === 'lime') {
                      return (
                        <div
                          key={msg.id}
                          className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[#D7F582] p-2.5 text-[11px] leading-relaxed text-neutral-900 shadow-2xs"
                        >
                          <div className="mb-0.5 flex items-center justify-between text-[9px] font-bold text-emerald-950">
                            <span>{msg.sender}</span>
                            <span className="font-normal text-neutral-500">{msg.time}</span>
                          </div>
                          &ldquo;{msg.text}&rdquo;
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-indigo-600 p-2.5 text-[11px] leading-relaxed text-white shadow-2xs"
                      >
                        <div className="mb-0.5 flex items-center justify-between text-[9px] font-bold text-indigo-100">
                          <span>{msg.sender}</span>
                          <span className="font-normal text-indigo-200">{msg.time}</span>
                        </div>
                        &ldquo;{msg.text}&rdquo;
                      </div>
                    );
                  })}
                </div>
              </div>

              <form
                onSubmit={handleSendChat}
                className="mt-3 flex items-center gap-1.5 border-t border-neutral-200/60 pt-2.5"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ketik disposisi koordinasi..."
                  className="w-full rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-900 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 cursor-pointer rounded-full bg-neutral-900 p-1.5 text-white transition-colors hover:bg-neutral-800"
                  aria-label="Kirim Disposisi"
                >
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>

            {/* Bento 4: Today's Task Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF8F5] p-5 md:col-span-5">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">
                    Agenda Kedinasan DPRD Hari Ini
                  </span>
                  <button
                    type="button"
                    onClick={() => notify('Membuka agenda rapat & sidang dewan...')}
                    className="cursor-pointer text-[11px] font-semibold text-neutral-400 hover:text-neutral-700"
                  >
                    Lihat Semua
                  </button>
                </div>
                <p className="mb-3 text-[10px] text-neutral-400">
                  Tindak lanjut apel & penugasan staf
                </p>

                <div className="rounded-xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
                  <h5 className="mb-1 text-xs font-bold text-neutral-900">
                    Rekapitulasi Kehadiran & Fasilitasi Sidang
                  </h5>
                  <p className="mb-3 text-[10px] text-neutral-500">
                    Verifikasi geotagging apel pagi dan persiapan notulensi rapat Komisi I & II.
                  </p>

                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex -space-x-1.5">
                      {AGENDA_AVATARS.map((src, i) => (
                        <img
                          key={src}
                          className="h-5 w-5 rounded-full border border-white"
                          src={src}
                          alt={`Staf ${i + 1}`}
                        />
                      ))}
                    </div>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-100">
                      <div className="h-full w-[82%] rounded-full bg-indigo-600"></div>
                    </div>
                    <span className="font-bold text-neutral-700">82%</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400">
                <span>Batas Waktu: 5 Oktober 2026</span>
                <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600">
                  Aktif
                </span>
              </div>
            </div>

            {/* Bento 5: Activity Monthly Report with bar chart */}
            <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF8F5] p-5 md:col-span-7">
              <div className="mb-1 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-800">
                    Kedisiplinan Apel Sekretariat DPRD
                  </span>
                  <p className="text-[10px] text-neutral-400">
                    Komparasi Kehadiran Mingguan Aparatur
                  </p>
                </div>

                <div className="flex items-center rounded-full border border-neutral-200 bg-white p-0.5 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setChartPeriod('Bulan')}
                    className={`cursor-pointer rounded-full px-2.5 py-0.5 transition-colors ${
                      chartPeriod === 'Bulan'
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Bulan
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartPeriod('Tahun')}
                    className={`cursor-pointer rounded-full px-2.5 py-0.5 transition-colors ${
                      chartPeriod === 'Tahun'
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Tahun
                  </button>
                </div>
              </div>

              <div className="flex h-28 items-end justify-between px-2 pt-4">
                {WEEK_BARS.map((bar) => (
                  <div key={bar.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className={`w-5 rounded-full transition-colors ${bar.level} ${
                        bar.active
                          ? 'bg-[#B7EB60] shadow-xs hover:bg-[#9ed840]'
                          : bar.day === 'Sab' || bar.day === 'Min'
                            ? 'bg-neutral-200'
                            : 'bg-[#C7F080] hover:bg-[#b4e662]'
                      }`}
                    ></div>
                    <span
                      className={`text-[9px] ${
                        bar.active ? 'font-bold text-neutral-800' : 'font-semibold text-neutral-400'
                      }`}
                    >
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Hidden live stat for parent sync */}
      <span className="sr-only" aria-hidden="true">
        {statHadir}
      </span>
    </section>
  );
}
