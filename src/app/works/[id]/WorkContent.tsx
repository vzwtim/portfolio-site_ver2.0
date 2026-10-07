// src/app/works/[id]/WorkContent.tsx
'use client';

import styles from './workDetail.module.css';
import FadeInImage from '@/components/FadeInImage';
import BackButton from '@/components/BackButton';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export type Work = {
  id: string;
  title: string;
  description: string;
  images?: string[];
  bgColor?: string;
  link?: string;
};

interface WorkContentProps {
  work: Work;
  images: string[];
  dimensions: Array<{ width:number; height:number } | null>;
}

export default function WorkContent({ work, images, dimensions }: WorkContentProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; panX: number; panY: number }>({
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  });
  const [pinch, setPinch] = useState<{ dist: number; zoom: number } | null>(null);

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setDragging(false);
    setPinch(null);
  };

  const lightboxOpen = lightboxIndex !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    document.querySelector<HTMLButtonElement>('[aria-label="画像を閉じる"]')?.focus();
    return () => { document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [lightboxOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button'));
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        setLightboxIndex((idx) => (idx === null ? idx : (idx + 1) % images.length));
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((idx) => (idx === null ? idx : (idx - 1 + images.length) % images.length));
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, lightboxIndex]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollRef = useHorizontalScroll<HTMLDivElement>(!isMobile);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      ref={scrollRef}
      className={`${styles.detail} text-gray-900`}
      style={{ backgroundColor: work.bgColor }}
    >
      <div
        className={`flex w-full transition-opacity duration-700 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        } flex-col gap-8 lg:flex-row lg:gap-0 lg:h-full`}
      >
        <div className="flex-shrink-0 w-full lg:w-[min(46vw,680px)] lg:h-full flex items-center px-5 py-6 sm:px-8 ">
          <div className="text-left md:pl-12">
            <h1
              className="text-3xl sm:text-4xl font-bold mb-6 leading-snug break-words"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {work.title}
            </h1>
            <p
              className="text-sm leading-relaxed md:pr-12"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {work.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BackButton />
              {work.link && (
                <Link
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-11 rounded-full bg-white/70 px-4 py-2 text-sm hover:bg-white transition-colors"
                >
                  Visit Site →
                </Link>
              )}
            </div>
          </div>
        </div>
        {images.map((src, idx) => (
          <ResponsiveImage
            key={idx}
            src={src}
            dimensions={dimensions[idx]}
            alt={`${work.title} — ${idx + 1}`}
            onOpen={() => {
              setLightboxIndex(idx);
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog" aria-modal="true" aria-label={`${work.title}の画像`}
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          <button type="button" onClick={closeLightbox} className="absolute top-4 right-4 z-[1002] min-w-11 min-h-11 rounded-full bg-white text-black text-2xl" aria-label="画像を閉じる">×</button>
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
          >
            <div
              className="relative w-auto max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => {
                e.stopPropagation();
                // Ignore pointer capture when clicking navigation buttons
                const targetTag = (e.target as HTMLElement).tagName.toLowerCase();
                if (targetTag === 'button' || targetTag === 'svg' || targetTag === 'path') return;
                e.preventDefault();
                setDragging(true);
                setDragStart({ x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y });
                (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!dragging) return;
                setPan({
                  x: dragStart.panX + (e.clientX - dragStart.x),
                  y: dragStart.panY + (e.clientY - dragStart.y),
                });
              }}
              onPointerUp={(e) => {
                setDragging(false);
                (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
              }}
              onPointerCancel={() => setDragging(false)}
              onWheel={(e) => {
                e.preventDefault();
                const factor = e.deltaY < 0 ? 1.2 : 1 / 1.2;
                setZoom((z) => Math.min(4, Math.max(1, parseFloat((z * factor).toFixed(2)))));
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setZoom((z) => (z > 1 ? 1 : 2));
                setPan({ x: 0, y: 0 });
              }}
              onTouchStart={(e) => {
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  setPinch({ dist: Math.hypot(dx, dy), zoom });
                }
              }}
              onTouchMove={(e) => {
                if (pinch && e.touches.length === 2) {
                  e.preventDefault();
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  const dist = Math.hypot(dx, dy);
                  const newZoom = Math.min(4, Math.max(1, (pinch.zoom * dist) / pinch.dist));
                  setZoom(parseFloat(newZoom.toFixed(2)));
                }
              }}
              onTouchEnd={(e) => {
                if (e.touches.length < 2) setPinch(null);
              }}
              style={{ touchAction: 'none' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[lightboxIndex]}
                alt="work detail"
                className={`object-contain max-w-[90vw] max-h-[80dvh] ${zoom > 1 ? 'cursor-grab' : ''}`}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transition: dragging || pinch ? 'none' : 'transform 0.15s ease-out',
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-[1001] bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((idx) => (idx === null ? idx : (idx - 1 + images.length) % images.length));
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                    }}
                    aria-label="Prev image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-[1001] bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((idx) => (idx === null ? idx : (idx + 1) % images.length));
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                    }}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ResponsiveImage({ src, alt, dimensions, onOpen }: { src:string; alt:string; dimensions:{width:number; height:number} | null; onOpen:()=>void }) {
  return <div className={styles.imageSlot}>
    <button type="button" className={styles.imageButton} style={dimensions ? { aspectRatio: `${dimensions.width} / ${dimensions.height}` } : undefined} onClick={onOpen} aria-label={`${alt}を拡大する`}>
      {dimensions ? <FadeInImage src={src} alt={alt} width={dimensions.width} height={dimensions.height} sizes="(max-width:1023px) calc(100vw - 40px), 80vw" unoptimized={src.toLowerCase().endsWith('.gif')} className={styles.image} /> :
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className={styles.image} />}
      <span className={styles.zoomHint} aria-hidden="true">＋</span>
    </button>
  </div>;
}
