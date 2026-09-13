import Link from 'next/link';
import Image from 'next/image'; // Image コンポーネントをインポート
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useCursor } from '@/context/CursorContext';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/photos', label: 'gallery' },
  { href: '/works', label: 'works?' },
  { href: '/contact', label: 'contact' },
];

// textColor prop を受け取る
interface HeaderProps {
  textColor: string;
}

export default function Header({ textColor }: HeaderProps) {
  const { textEnter, textLeave } = useCursor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const hoverTextColorClass = 'hover:text-highlight';
  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full py-4 md:py-8 transition-colors duration-300 bg-transparent ${textColor}`}
    >
      <div className="w-full grid grid-cols-2 items-center relative z-50">
        {/* Left side - Logo */}
        <Link href="/" className="pl-8 md:pl-20 justify-self-start">
          <div
            className="cursor-pointer"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            <Image
              src="/images/babayudai_logo.svg"
              alt="babayudai logo"
              width={280} // ロゴのサイズを調整
              height={80}
              className="w-auto h-16 md:h-20"
            />
          </div>
        </Link>

        {/* Right side - Navigation */}
        <nav className="hidden md:block pr-12 md:pr-20 justify-self-end">
          <ul className="flex flex-row items-center space-x-6 md:space-x-8">
            {navigationItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                <span
                  className={`text-sm md:text-base font-bold ${hoverTextColorClass} transition-colors duration-300 cursor-pointer tracking-wide ${pathname === item.href ? 'underline underline-offset-8' : ''}`}
                  style={{ fontFamily: '"Montserrat ExtraBold", sans-serif' }}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  {item.label}
                </span>
              </Link>
            </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        type="button"
        className="md:hidden text-2xl p-2 absolute top-6 right-6 md:top-8 md:right-20 z-50"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile navigation overlay */}
      <div
        id="mobile-navigation"
        hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-white ${textColor} md:hidden transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex-1 flex flex-col justify-center items-center px-6">
          <ul className="flex flex-col items-center space-y-8">
            {navigationItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                <span
                  className={`text-base font-bold ${hoverTextColorClass} transition-colors duration-300 cursor-pointer tracking-wide ${pathname === item.href ? 'underline underline-offset-8' : ''}`}
                  style={{ fontFamily: '"Montserrat ExtraBold", sans-serif' }}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  onClick={toggleMenu}
                >
                  {item.label}
                </span>
              </Link>
            </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
