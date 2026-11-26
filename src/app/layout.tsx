import React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import ClientLayout from "@/components/ClientLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "800",
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-site-ver2.vercel.app"),
  title: {
    default: "ぼくは五目飯 | 馬場雄大ポートフォリオ",
    template: "%s | ぼくは五目飯",
  },
  description: "馬場雄大のポートフォリオ。不動産開発 × 建築研究 × デジタル制作。東京時間マップ「東京の距離 / TOKYO TIME WARP」、今市U35実践アイデアコンペの運営、鉄道LEDマップ基板などを掲載。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://portfolio-site-ver2.vercel.app",
    siteName: "ぼくは五目飯",
    title: "ぼくは五目飯 | 馬場雄大ポートフォリオ",
    description: "不動産開発 × 建築研究 × デジタル制作。場所と人の新しい可能性をつくっています。",
    images: [{ url: "/images/mv_gomoku_1.jpg", alt: "器に盛り付けた五目飯" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ぼくは五目飯 | 馬場雄大ポートフォリオ",
    description: "不動産開発 × 建築研究 × デジタル制作。東京時間マップ、今市U35、鉄道LEDマップ基板などを掲載。",
    images: ["/images/mv_gomoku_1.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="ja" className={montserrat.variable}>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
