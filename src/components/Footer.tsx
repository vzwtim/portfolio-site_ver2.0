import Link from 'next/link';

const InstagramIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
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

const GitHubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="shrink-0">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 1.28 1.06.78 1.54 0 1.07-.01 2.42-.01 2.73 0 .27.18.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const ArchiveIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
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

type AccountLink = {
  name: string;
  href: string;
  icon: 'instagram' | 'github';
  ariaLabel?: string;
};

const accountLinks: AccountLink[] = [
  { name: '@mapl.ab', href: 'https://www.instagram.com/mapl.ab/', icon: 'instagram' },
  { name: '@nikko_makicompe', href: 'https://www.instagram.com/nikko_makicompe/', icon: 'instagram' },
  { name: '@babachan_1222', href: 'https://www.instagram.com/babachan_1222/', icon: 'instagram' },
  { name: '@vzwtim', href: 'https://github.com/vzwtim', icon: 'github', ariaLabel: 'GitHub' },
];

// Shared badge style for every footer link (accounts + archive): one height,
// one padding rhythm, one icon size, so the group reads as a single array.
// Translucent glass finish: semi-transparent white, soft blur, faint border.
// Flat otherwise — no shadow, no lift; hover only shifts colour/opacity.
const badgeBaseClassName =
  'inline-flex h-9 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#111311]/10 bg-white/60 px-3.5 text-[13px] leading-none backdrop-blur-md transition-colors duration-300 hover:border-[#bb5555]/50 hover:bg-white/80 hover:text-[#bb5555] sm:w-auto';

const badgeClassName = `${badgeBaseClassName} text-[#111311]`;
const badgeMutedClassName = `${badgeBaseClassName} text-[#111311]/60`;

const Footer = () => {
  return (
    <footer className="text-[#111311] py-6 px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <nav className="footerSocials" aria-label="アカウントと外部リンク">
          <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-nowrap sm:items-center sm:justify-center">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className={badgeClassName}
                >
                  {link.icon === 'instagram' ? <InstagramIcon /> : <GitHubIcon />}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li className="col-span-2 sm:col-span-1">
              <Link
                href="https://portfolio-site-ver1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={badgeMutedClassName}
              >
                <ArchiveIcon />
                <span>旧版を見る</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="footerCopyright text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} YUDAI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
