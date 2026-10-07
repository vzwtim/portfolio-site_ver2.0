"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function HomeMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-home-motion]");
    if (!page) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (reduced.matches) return;
      const sections = Array.from(page.querySelectorAll<HTMLElement>("[data-motion-section]"));
      const targets = page.querySelectorAll<HTMLElement>("[data-reveal]");
      page.dataset.motionReady = "true";
      const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = "true";
        reveal.unobserve(entry.target);
      }), { threshold: 0.08, rootMargin: "0px 0px -4%" });
      targets.forEach(target => reveal.observe(target));
      const progress = page.querySelector<HTMLElement>("[data-reading-progress]");
      let frame = 0;
      const update = () => {
        frame = 0;
        const height = window.innerHeight;
        const total = page.offsetHeight - height;
        if (progress) progress.style.transform = `scaleX(${Math.max(0, Math.min(1, -page.getBoundingClientRect().top / Math.max(1, total)))})`;
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      const smoothScroll = fine.matches ? new Lenis({
        autoRaf: true,
        lerp: .14,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -32 },
        prevent: node => node.tagName === "TEXTAREA" || node.tagName === "SELECT",
      }) : null;
      const activity = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const section = entry.target as HTMLElement;
          section.dataset.motionActive = String(entry.isIntersecting);
        });
        schedule();
      });
      sections.forEach(section => activity.observe(section));
      const focus = (event: FocusEvent) => (event.target as Element).closest<HTMLElement>("[data-reveal]")?.setAttribute("data-visible", "true");
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      page.addEventListener("focusin", focus);
      schedule();
      dispose = () => {
        smoothScroll?.destroy();
        cancelAnimationFrame(frame); reveal.disconnect(); activity.disconnect();
        window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
        page.removeEventListener("focusin", focus);
        page.querySelectorAll<HTMLElement>("[data-project-image]").forEach(card => {
          ["--hover-x", "--hover-y", "--tilt-x", "--tilt-y", "--project-pan", "--project-zoom"].forEach(property => card.style.removeProperty(property));
        });
        delete page.dataset.motionReady;
        progress?.style.removeProperty("transform");
        sections.forEach(section => { delete section.dataset.motionActive; section.style.removeProperty("--section-shift"); section.style.removeProperty("--image-shift"); ["--chapter-progress", "--hero-zoom", "--hero-inset", "--hero-copy-shift", "--surface-inset", "--surface-radius", "--scene-copy-shift", "--bridge-shift", "--scene-title-scale", "--index-shift"].forEach(property => section.style.removeProperty(property)); });
        page.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(target => { target.style.removeProperty("--magnet-x"); target.style.removeProperty("--magnet-y"); });
      };
    };
    setup(); reduced.addEventListener("change", setup); fine.addEventListener("change", setup);
    return () => { dispose(); reduced.removeEventListener("change", setup); fine.removeEventListener("change", setup); };
  }, []);
  return null;
}
