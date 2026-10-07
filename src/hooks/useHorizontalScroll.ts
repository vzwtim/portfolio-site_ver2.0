// src/hooks/useHorizontalScroll.ts
'use client';

import { useRef, useEffect } from 'react';

export default function useHorizontalScroll<T extends HTMLElement>(enabled = true) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const el = containerRef.current;
    if (!el) return;

    const SCROLL_MULTIPLIER = 1; // amplify scroll distance per wheel event

    let target = el.scrollLeft;
    let current = el.scrollLeft;
    let rafId: number | null = null;

    const smoothScroll = () => {
      current += (target - current) * 0.1;
      el.scrollLeft = current;
      if (Math.abs(target - current) > 0.5) {
        rafId = requestAnimationFrame(smoothScroll);
      } else {
        rafId = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if ((e.target instanceof Element && e.target.closest('[role="dialog"]')) || e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.ctrlKey) return;
      e.preventDefault();
      target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, target + e.deltaY * SCROLL_MULTIPLIER));
      if (rafId === null) rafId = requestAnimationFrame(smoothScroll);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  return containerRef;
}
