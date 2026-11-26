
import Link from 'next/link';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-[#111311] py-4 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="footerCopyright mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">&copy; {new Date().getFullYear()} YUDAI. All Rights Reserved.</p>
          </div>
          <div className="footerSocials flex flex-wrap items-center justify-end gap-x-4 gap-y-1 space-x-0"><Link href="https://www.instagram.com/mapl.ab/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-xs font-bold text-[#008877] hover:underline">お地図ラボ @mapl.ab ↗</Link>
            <Link href="https://www.instagram.com/nikko_makicompe/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-xs font-bold text-[#008877] hover:underline">今市U35 @nikko_makicompe ↗</Link>
            <Link href="https://note.com/mapl_ab" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-xs text-[#008877] hover:underline">note お地図ラボ ↗</Link>
            <Link href="https://portfolio-site-ver1.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-xs text-[#008877] hover:underline">旧版を見る ↗</Link>
            <Link
              href="https://www.instagram.com/babachan_1222/" aria-label="Instagram（個人 @babachan_1222）"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#008877]"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaInstagram />
              </span>
            </Link>
            <Link
              href="https://github.com/vzwtim" aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#008877]"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaGithub />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
