"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import styles from "@/app/refresh.module.css";

/** Load on demand; hover/focus plays, touch has its own control. */
export default function ProjectMotionPreview({ image, href, title, ratio, children }: {
  image: string; href: string; title: string; ratio: string; children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const wantsPlayback = useRef(false);
  const [playing, setPlaying] = useState(false);
  const stop = () => {
    wantsPlayback.current = false;
    video.current?.pause();
    setPlaying(false);
  };
  const start = async (explicit = false) => {
    if (!explicit && window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const media = video.current;
    if (!media) return;
    wantsPlayback.current = true;
    try {
      if (media.readyState > 0) media.currentTime = 0;
      await media.play();
      if (wantsPlayback.current) setPlaying(true);
      else media.pause();
    } catch { setPlaying(false); }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) stop();
        else if (root.current?.querySelector("[data-project-image]")?.matches(":hover, :focus")) void start();
      });
    }, { rootMargin: "160px" });
    observer.observe(root.current!);
    const visibility = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return <div ref={root}>
    <div className={styles.topicImage} style={{ "--source-ratio": ratio } as CSSProperties}>
      <Link href={href} className={styles.projectMotionLink} aria-label={`${title}の詳細を見る`} data-project-image
        onPointerEnter={event => { if (event.pointerType === "mouse") void start(); }}
        onPointerLeave={stop} onFocus={() => void start()} onBlur={stop}>
        <Image src={image} alt="" fill sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 44px), 520px" />
        <video ref={video} className={styles.projectMotionVideo} data-playing={playing} src="/videos/odo-drawing-loop.mp4"
          muted loop playsInline preload="none" aria-hidden="true" onError={stop} />
      </Link>
      <button type="button" className={styles.motionToggle} onClick={() => playing ? stop() : void start(true)}
        aria-label={playing ? "小屋のアニメーションを停止" : "小屋のアニメーションを再生"} aria-pressed={playing}>{playing ? "Ⅱ" : "▷"}</button>
    </div>
    <Link href={href} className={styles.projectLink}>{children}</Link>
  </div>;
}
