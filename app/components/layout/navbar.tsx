import { Link, useLocation } from 'react-router';

import { ArrowLeft } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="glass-pill flex items-center gap-5 rounded-full p-2 pr-2 pl-2.5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 sm:gap-8">
        {/* Logo brand (gambar saja) */}
        <Link
          to="/"
          className="group flex shrink-0 items-center"
          aria-label="Beranda Si Akoor DPRD Tapin"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 shadow-md transition-transform group-hover:rotate-6">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>
        </Link>

        {/* Navigation links (singkat) */}
        <div className="hidden shrink-0 items-center gap-5 text-sm font-medium text-neutral-600 sm:gap-6 md:flex lg:gap-7">
          <a
            href={isLoginPage ? '/#fitur' : '#fitur'}
            className="whitespace-nowrap transition-colors hover:text-neutral-900"
          >
            Fitur
          </a>
          <a
            href={isLoginPage ? '/#keunggulan' : '#keunggulan'}
            className="whitespace-nowrap transition-colors hover:text-neutral-900"
          >
            Modul
          </a>
          <a
            href={isLoginPage ? '/#mockup-dashboard' : '#mockup-dashboard'}
            className="whitespace-nowrap transition-colors hover:text-neutral-900"
          >
            Pratinjau
          </a>
          <a
            href={isLoginPage ? '/#simulator' : '#simulator'}
            className="whitespace-nowrap transition-colors hover:text-neutral-900"
          >
            Simulasi
          </a>
          <a
            href={isLoginPage ? '/#faq' : '#faq'}
            className="whitespace-nowrap transition-colors hover:text-neutral-900"
          >
            FAQ
          </a>
        </div>

        {/* Action button */}
        <div className="flex shrink-0 items-center">
          {isLoginPage ? (
            <Link
              to="/"
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg active:translate-y-0 sm:px-5 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Beranda</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer rounded-full bg-neutral-900 px-5 py-2 text-xs font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg active:translate-y-0 sm:text-sm"
            >
              Masuk
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
