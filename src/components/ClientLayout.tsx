'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { CursorProvider } from '@/context/CursorContext';
import { ScrollbarWidthProvider } from '@/context/ScrollbarWidthContext';

import { useTheme } from '@/context/ThemeContext';

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ShadowAnimation = dynamic(() => import('./ShadowAnimation'), { ssr: false });

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isWorkDetailPage = pathname.startsWith('/works/') && pathname !== '/works';
  const isAppsPage = pathname === '/apps';

  const { bgColor, textColor } = useTheme();

  return (
    <div className={`transition-colors duration-500 ${bgColor}`}>
      <ScrollbarWidthProvider> {/* Wrap with ScrollbarWidthProvider */}
        <CursorProvider>
          <CustomCursor />
          {!isAppsPage && <Header textColor={textColor} />}
          <div className={textColor}>
            {children}
          </div>
          
          {!isWorkDetailPage && !isAppsPage && (
            <ShadowAnimation>
              <Footer />
            </ShadowAnimation>
          )}
        </CursorProvider>
      </ScrollbarWidthProvider> {/* Close ScrollbarWidthProvider */}
    </div>
  );
}
