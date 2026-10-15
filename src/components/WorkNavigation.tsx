'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import works from '@/data/works.json';

/** Keep the colour wipe outside the route tree so it survives navigation. */
export default function WorkNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<{ overlay: HTMLDivElement; destination: string; timer: number } | null>(null);

  useEffect(() => {
    const clear = () => {
      if (!pending.current) return;
      window.clearTimeout(pending.current.timer);
      pending.current.overlay.remove();
      pending.current = null;
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.download || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || !/^\/works\/[^/]+\/?$/.test(url.pathname) || url.pathname === location.pathname) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof Element.prototype.animate !== 'function') return;
      event.preventDefault();
      // Stop Next Link's own handler; modified clicks above retain native behaviour.
      event.stopPropagation();
      if (pending.current) return;
      const work = works.find(item => `/works/${item.id}` === url.pathname.replace(/\/$/, ''));
      const overlay = document.createElement('div');
      overlay.className = 'workNavigationWipe';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.backgroundColor = work?.bgColor || '#fff';
      const rect = link.getBoundingClientRect();
      const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
      const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);
      const destination = url.pathname + url.search + url.hash;
      pending.current = { overlay, destination: url.pathname, timer: window.setTimeout(clear, 5000) };
      router.prefetch(destination);
      const animation = overlay.animate([
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
      ], { duration: 560, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
      void animation.finished.then(() => {
        if (pending.current?.overlay === overlay) router.push(destination);
      }).catch(clear);
    };
    document.addEventListener('click', click, true);
    window.addEventListener('popstate', clear);
    return () => { document.removeEventListener('click', click, true); window.removeEventListener('popstate', clear); clear(); };
  }, [router]);

  useEffect(() => {
    const current = pending.current;
    if (!current) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const animation = current.overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' });
        void animation.finished.finally(() => {
          window.clearTimeout(current.timer);
          current.overlay.remove();
          if (pending.current === current) pending.current = null;
        });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
