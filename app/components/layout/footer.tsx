/* Hallmark · component: footer · archetype: Ft1 Mast-headed · genre: modern-minimal · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import { useState } from 'react';

import { Link } from 'react-router';
import { NAV_LINKS } from '~/constants/navigation';

import { ArrowUp, Check, Copy, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200/80 bg-white/70 text-neutral-600 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top band: Brand & Navigation */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Brand & Honest Tagline */}
          <div className="max-w-md space-y-2.5">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5"
              aria-label="Beranda Si Akoor DPRD Tapin"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 shadow-xs transition-transform duration-200 group-hover:rotate-3">
                <svg
                  className="h-4 w-4 text-white"
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
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-neutral-900">Si Akoor</span>
                <span className="text-xs text-neutral-400">&bull;</span>
                <span className="text-xs font-medium text-neutral-500">
                  Sekretariat DPRD Kab. Tapin
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-neutral-500">
              Sistem Informasi Apel &amp; Koordinasi internal Sekretariat DPRD Kabupaten Tapin untuk
              ketertiban apel pagi terverifikasi dan integrasi tindak lanjut arahan pimpinan.
            </p>
          </div>

          {/* Quiet Link Row */}
          <nav
            aria-label="Tautan footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-600"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-150 hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Hairline Divider */}
        <div className="my-8 border-t border-neutral-200/70" />

        {/* Bottom band: Address, Contact & Copyright */}
        <div className="flex flex-col gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          {/* Address & Email with minimal 1-click copy */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() =>
                handleCopy('Jl. Brigjend H. Hasan Basry No. 01, Rantau, Kab. Tapin', 'address')
              }
              className="inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-150 hover:text-neutral-800"
              title="Klik untuk salin alamat"
            >
              <MapPin className="h-3.5 w-3.5 text-neutral-400" />
              <span>Jl. Brigjend H. Hasan Basry No. 01, Rantau</span>
              {copiedField === 'address' ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3 text-neutral-300 opacity-60" />
              )}
            </button>

            <span className="hidden text-neutral-300 sm:inline">&bull;</span>

            <button
              type="button"
              onClick={() => handleCopy('setwan@tapinkab.go.id', 'email')}
              className="inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-150 hover:text-neutral-800"
              title="Klik untuk salin email"
            >
              <Mail className="h-3.5 w-3.5 text-neutral-400" />
              <span>setwan@tapinkab.go.id</span>
              {copiedField === 'email' ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3 text-neutral-300 opacity-60" />
              )}
            </button>
          </div>

          {/* Right: Copyright & Smooth Back-to-Top */}
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span>&copy; {new Date().getFullYear()} Sekretariat DPRD Kab. Tapin</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex cursor-pointer items-center gap-1 font-medium text-neutral-600 transition-colors duration-150 hover:text-neutral-900"
              aria-label="Kembali ke atas halaman"
            >
              <span>Ke Atas</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
