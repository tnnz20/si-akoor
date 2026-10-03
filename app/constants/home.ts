import type { ChatMessage, FaqItem } from '~/types/home';

export const INITIAL_MESSAGES: ChatMessage[] = [
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

export const MOCKUP_TABS = [
  'Ikhtisar',
  'Presensi Apel',
  'Koordinasi Tim',
  'Jadwal Agenda',
  'Aktivitas',
] as const;

export type MockupTab = (typeof MOCKUP_TABS)[number];

export const TAB_HEADINGS: Record<MockupTab, string> = {
  Ikhtisar: 'Selamat datang kembali, Drs. H. Noor Ifansyah, M.AP',
  'Presensi Apel': 'Presensi Apel Pagi — Rekapitulasi Hari Ini',
  'Koordinasi Tim': 'Ruang Koordinasi Antar Bagian',
  'Jadwal Agenda': 'Agenda Kedinasan Pekan Ini',
  Aktivitas: 'Log Aktivitas Sekretariat Terkini',
};

export const CHAT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop',
];

export const TASK_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
];

export const AGENDA_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
];

export const FEATURE_CHAT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
];

export const MANUAL_POINTS = [
  'Antrean paraf presensi manual di lapangan sebelum apel dimulai.',
  'Rentan titip absen dan kurang akurat dalam pencatatan waktu.',
  'Arahan pimpinan apel sering tidak terdisposisi secara sistematis ke staf.',
  'Rekapitulasi bulanan menyita waktu staf kepegawaian untuk perhitungan TPP.',
];

export const AKNOR_POINTS = [
  'Presensi serentak seluruh staf tuntas cepat langsung di halaman kantor.',
  'Geofencing radius 25 meter anti-manipulasi lokasi.',
  'Arahan Sekwan langsung terdisposisi ke bagian kerja terkait secara real-time.',
  'Rekapitulasi otomatis hitungan detik untuk laporan pimpinan.',
];

export const FAQ_ITEMS: FaqItem[] = [
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

export const CONTACT_INFO = {
  email: 'setwan@tapinkab.go.id',
  division: 'Bagian Umum & Kepegawaian',
  address: 'Jl. Brigjend H. Hasan Basry No. 01, Rantau, Kab. Tapin',
  fullText: 'Sekretariat DPRD Kab. Tapin: setwan@tapinkab.go.id | Bagian Umum & Kepegawaian',
} as const;
