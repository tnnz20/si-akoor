import { useState } from 'react';

import { ArrowRight, Eye, EyeOff, HelpCircle, Lock, ShieldCheck, User } from 'lucide-react';

import type { Route } from './+types/login';

export const meta: Route.MetaFunction = () => [
  { title: 'Masuk Portal - Si Akoor DPRD Kabupaten Tapin' },
  {
    name: 'description',
    content:
      'Halaman masuk sistem presensi dan koordinasi apel terpadu internal Sekretariat DPRD Kabupaten Tapin.',
  },
];

export default function Login() {
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    // Simulated login process
    setTimeout(() => {
      setIsLoading(false);
      setFeedback('Mengautentikasi kredensial pegawai ke server DPRD Tapin...');
      setTimeout(() => {
        setFeedback('Akses berhasil. Mengalihkan ke Dashboard Presensi...');
      }, 1000);
    }, 1200);
  };

  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 pt-12 pb-20 sm:px-6">
      {/* Badge */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/90 px-4 py-1.5 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600"></span>
          <span className="text-xs font-bold text-neutral-800">
            Autentikasi Internal Pegawai DPRD Tapin
          </span>
        </div>
      </div>

      {/* Card Form */}
      <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-7 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            Masuk ke Portal Presensi
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 sm:text-sm">
            Gunakan NIP bagi ASN atau Nomor Induk Pegawai bagi Non-ASN untuk mengakses sistem apel
            dan koordinasi.
          </p>
        </div>

        {/* Feedback Message */}
        {feedback ? (
          <div
            role="alert"
            className="mb-6 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800"
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4.5">
          {/* Input NIP / ID */}
          <div>
            <label htmlFor="nip-input" className="mb-1.5 block text-xs font-bold text-neutral-700">
              NIP / Nomor Induk Pegawai
            </label>
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute left-3.5 text-neutral-400">
                <User className="h-4 w-4" />
              </div>
              <input
                id="nip-input"
                type="text"
                required
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="Contoh: 198706152010011002"
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pr-4 pl-10 text-xs text-neutral-900 transition-all focus:border-indigo-600 focus:bg-white focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password-input" className="block text-xs font-bold text-neutral-700">
                Kata Sandi
              </label>
              <a
                href="#bantuan-kontak"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Lupa Sandi?
              </a>
            </div>
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute left-3.5 text-neutral-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi portal"
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pr-11 pl-10 text-xs text-neutral-900 transition-all focus:border-indigo-600 focus:bg-white focus:outline-none sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 cursor-pointer text-neutral-400 hover:text-neutral-700"
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Ingat saya di perangkat ini</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-neutral-900 py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-neutral-800 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Memverifikasi Akses...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Portal Si Akoor</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Security & Access Notice */}
        <div className="mt-8 border-t border-neutral-100 pt-5 text-center text-xs text-neutral-400">
          <div className="flex items-center justify-center gap-1.5 text-neutral-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="font-semibold">Sistem Terenkripsi & Khusus Jaringan Internal</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed">
            Hanya aparatur yang terdaftar di database Sekretariat DPRD Kabupaten Tapin yang dapat
            mengakses sistem ini.
          </p>
        </div>
      </div>

      {/* Help box */}
      <div
        id="bantuan-kontak"
        className="mt-6 flex w-full items-start gap-3 rounded-2xl border border-neutral-200/70 bg-white/70 p-4 text-xs text-neutral-600 shadow-sm"
      >
        <HelpCircle className="h-4 w-4 shrink-0 text-amber-600" />
        <div>
          <span className="font-bold text-neutral-800">
            Kendala Login atau Belum Memiliki Akun?
          </span>
          <p className="mt-0.5 text-neutral-500">
            Silakan hubungi administrator Sistem Informasi di{' '}
            <strong className="text-neutral-700">Bagian Umum & Kepegawaian</strong> Sekretariat DPRD
            Kabupaten Tapin (Ruang Kepegawaian Gedung DPRD Tapin).
          </p>
        </div>
      </div>
    </main>
  );
}
