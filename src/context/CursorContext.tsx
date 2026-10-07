'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'; // useEffect をインポート

interface CursorContextType {
  cursorVariant: string;
  textEnter: () => void;
  textLeave: () => void;
  cursorX: number; // カーソルX座標を追加
  cursorY: number; // カーソルY座標を追加
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorX, setCursorX] = useState(0); // カーソルX座標の状態
  const [cursorY, setCursorY] = useState(0); // カーソルY座標の状態

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  // カーソルの動きを追跡
  useEffect(() => {
    if (pathname === "/") return;
    const mouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [pathname]);

  return (
    <CursorContext.Provider value={{ cursorVariant, textEnter, textLeave, cursorX, cursorY }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};