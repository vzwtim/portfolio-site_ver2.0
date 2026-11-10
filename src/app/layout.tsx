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
  title: "ぼくは五目飯",
  description: "The portfolio of YUDAI, exploring the intersection of architecture and technology.",
  icons: { icon: "/favicon.svg" },
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
