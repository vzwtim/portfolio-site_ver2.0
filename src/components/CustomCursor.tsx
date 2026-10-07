'use client';

import { useEffect, useRef } from 'react';

/** One DOM update per frame; pointer movement never renders the React tree. */
export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = cursor.current!;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0, x = -100, y = -100, visible = false;
    const update = () => {
      frame = 0;
      element.style.transform = `translate3d(${x}px,${y}px,0)`;
      element.dataset.visible = String(visible && fine.matches);
      const target = document.elementFromPoint(x, y);
      element.dataset.project = String(!!target?.closest('[data-project-image]'));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const move = (event: PointerEvent) => { x = event.clientX; y = event.clientY; visible = event.pointerType === 'mouse'; schedule(); };
    const hide = () => { visible = false; schedule(); };
    window.addEventListener('pointermove', move, { passive:true });
    window.addEventListener('scroll', schedule, { passive:true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    fine.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move); window.removeEventListener('scroll', schedule);
      window.removeEventListener('blur', hide); document.documentElement.removeEventListener('pointerleave', hide);
      fine.removeEventListener('change', schedule);
    };
  }, []);
  return <div ref={cursor} className="portfolioCursor" aria-hidden="true"><i /><span>↗</span></div>;
}
