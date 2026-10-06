
import Link from 'next/link';
import { FaInstagram, FaGithub, FaPencilAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="text-[#111311] py-4 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="footerCopyright mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">&copy; {new Date().getFullYear()} YUDAI. All Rights Reserved.</p>
          </div>
          <div className="footerSocials flex space-x-4">
            <Link
              href="https://www.instagram.com/babachan_1222/" aria-label="Instagram"
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
              href="https://x.com/yudaizit" aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#008877]"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaXTwitter />
              </span>
            </Link>
            <Link
              href="https://note.com/yubayuba" aria-label="note"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#008877]"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaPencilAlt />
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
