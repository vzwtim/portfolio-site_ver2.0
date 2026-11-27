'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.25" />
    <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

// Official GitHub mark (Simple Icons path).
const GitHubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="shrink-0">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const ArchiveIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <rect x="2.5" y="3.5" width="19" height="5" rx="1" />
    <path d="M5 8.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V8.5" />
    <path d="M9.5 12.75h5" />
  </svg>
);

const instagramAccounts = [
  { name: '@mapl.ab', href: 'https://www.instagram.com/mapl.ab/' },
  { name: '@nikko_makicompe', href: 'https://www.instagram.com/nikko_makicompe/' },
  { name: '@babachan_1222', href: 'https://www.instagram.com/babachan_1222/' },
];

// Shared style for the three icon buttons: one size, one translucent glass
// treatment, flat otherwise — no shadow, no lift; hover only shifts colour.
const iconButtonClassName =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#111311]/10 bg-white/60 text-[#111311] backdrop-blur-md transition-colors duration-300 hover:border-[#bb5555]/50 hover:bg-white/80 hover:text-[#bb5555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bb5555]/60';

const Footer = () => {
  const [instagramOpen, setInstagramOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const instagramButtonRef = useRef<HTMLButtonElement>(null);
  const firstAccountRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!instagramOpen) return;

    firstAccountRef.current?.focus();

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        instagramButtonRef.current &&
        !instagramButtonRef.current.contains(target)
      ) {
        setInstagramOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInstagramOpen(false);
        instagramButtonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [instagramOpen]);

  return (
    <footer className="text-[#111311] py-6 px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <nav className="footerSocials" aria-label="アカウントと外部リンク">
          <div className="relative">
            <ul className="flex items-center justify-center gap-3">
              <li>
                <button
                  ref={instagramButtonRef}
                  type="button"
                  aria-label="Instagram"
                  aria-haspopup="true"
                  aria-expanded={instagramOpen}
                  aria-controls="footer-instagram-accounts"
                  onClick={() => setInstagramOpen((open) => !open)}
                  className={iconButtonClassName}
                >
                  <InstagramIcon />
                </button>
              </li>
              <li>
                <Link
                  href="https://github.com/vzwtim"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={iconButtonClassName}
                >
                  <GitHubIcon />
                </Link>
              </li>
              <li>
                <Link
                  href="https://portfolio-site-ver1.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="旧版を見る"
                  title="旧版を見る"
                  className={`${iconButtonClassName} text-[#111311]/60`}
                >
                  <ArchiveIcon />
                </Link>
              </li>
            </ul>
            {instagramOpen && (
              <div
                ref={popoverRef}
                id="footer-instagram-accounts"
                role="menu"
                aria-label="Instagramアカウント"
                className="absolute bottom-full left-1/2 z-20 mb-3 w-60 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-2xl border border-[#111311]/10 bg-white/70 p-1.5 backdrop-blur-md"
              >
                <ul className="flex flex-col">
                  {instagramAccounts.map((account, index) => (
                    <li key={account.href}>
                      <Link
                        ref={index === 0 ? firstAccountRef : undefined}
                        href={account.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        onClick={() => setInstagramOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] leading-none text-[#111311] transition-colors duration-200 hover:bg-white/80 hover:text-[#bb5555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bb5555]/60"
                      >
                        <InstagramIcon size={14} />
                        <span>{account.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
        <div className="footerCopyright text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} YUDAI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
