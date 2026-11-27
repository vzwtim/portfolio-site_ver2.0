import Link from 'next/link';

const accountLinks: { label: string; name: string; href: string; ariaLabel?: string }[] = [
  { label: 'Instagram', name: '@mapl.ab', href: 'https://www.instagram.com/mapl.ab/' },
  { label: 'Instagram', name: '@nikko_makicompe', href: 'https://www.instagram.com/nikko_makicompe/' },
  { label: 'Instagram', name: '@babachan_1222', href: 'https://www.instagram.com/babachan_1222/' },
  { label: 'GitHub', name: 'vzwtim', href: 'https://github.com/vzwtim', ariaLabel: 'GitHub' },
  { label: 'Archive', name: '旧版を見る', href: 'https://portfolio-site-ver1.vercel.app/' },
];

const Footer = () => {
  return (
    <footer className="text-[#111311] py-4 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div className="footerCopyright mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">&copy; {new Date().getFullYear()} YUDAI. All Rights Reserved.</p>
          </div>
          <nav className="footerSocials" aria-label="アカウントと外部リンク">
            <ul className="flex flex-wrap items-start justify-center md:justify-end gap-x-5 gap-y-3 md:gap-x-7">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="group inline-flex min-h-11 flex-col justify-center gap-1"
                  >
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500">
                      {link.label}
                    </span>
                    <span className="whitespace-nowrap text-sm leading-none text-[#111311] transition-colors duration-300 group-hover:text-[#bb5555]">
                      {link.name}
                      <span aria-hidden="true" className="text-gray-400 transition-colors duration-300 group-hover:text-[#bb5555]"> ↗</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
