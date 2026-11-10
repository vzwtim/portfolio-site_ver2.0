'use client';

import { useEffect, useRef, type ReactNode, type PointerEvent, type FocusEvent } from 'react';
import styles from '@/app/refresh.module.css';

/** A quiet, keyboard-accessible editorial gallery; the links remain ordinary links. */
export default function ProjectGallery({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLElement | null>(null);
  const frame = useRef(0);

  const clear = () => {
    active.current?.removeAttribute('data-gallery-active');
    active.current?.style.removeProperty('--gallery-rx');
    active.current?.style.removeProperty('--gallery-ry');
    active.current = null;
    root.current?.removeAttribute('data-gallery-engaged');
  };
  const select = (target: EventTarget | null) => {
    const card = target instanceof Element ? target.closest<HTMLElement>('article') : null;
    if (!card || !root.current?.contains(card) || card === active.current) return;
    clear();
    active.current = card;
    card.dataset.galleryActive = 'true';
    root.current.dataset.galleryEngaged = 'true';
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    select(event.target);
    const card = active.current;
    if (!card) return;
    const x = event.clientX, y = event.clientY;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = card.querySelector<HTMLElement>('[data-project-image]')?.getBoundingClientRect() ?? card.getBoundingClientRect();
      const nx = Math.max(-.5, Math.min(.5, (x - rect.left) / rect.width - .5));
      const ny = Math.max(-.5, Math.min(.5, (y - rect.top) / rect.height - .5));
      card.style.setProperty('--gallery-rx', `${-ny * 3}deg`);
      card.style.setProperty('--gallery-ry', `${nx * 3}deg`);
    });
  };
  const blur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) clear();
  };

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = element.querySelectorAll<HTMLElement>('article');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).dataset.galleryVisible = 'true';
      observer.unobserve(entry.target);
    }), { threshold: .08, rootMargin: '0px 0px 30px' });
    cards.forEach(card => { card.dataset.galleryVisible = 'false'; observer.observe(card); });
    element.dataset.galleryReady = 'true';
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); };
  }, []);

  return <div ref={root} className={styles.topicProjects} data-project-gallery
    onPointerMove={move} onPointerLeave={clear} onFocusCapture={event => select(event.target)} onBlurCapture={blur}>
    {children}
  </div>;
}
