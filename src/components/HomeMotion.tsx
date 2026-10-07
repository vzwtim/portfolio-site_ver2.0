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
      let frame = 0;
      const update = () => {
        frame = 0;
        const height = window.innerHeight;
        const total = page.offsetHeight - height;
        page.style.setProperty("--reading-progress", String(Math.max(0, Math.min(1, -page.getBoundingClientRect().top / Math.max(1, total)))));
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
      let pointerFrame = 0;
      const followers = new Map<HTMLElement, { x: number; y: number; targetX: number; targetY: number }>();
      let previousPointerTime = 0;
      const follow = (time: number) => {
        pointerFrame = 0;
        const delta = previousPointerTime ? Math.min(time - previousPointerTime, 50) : 1000 / 60;
        const smoothing = 1 - Math.exp(-delta / 90);
        let moving = false;
        followers.forEach((position, card) => {
          position.x += (position.targetX - position.x) * smoothing;
          position.y += (position.targetY - position.y) * smoothing;
          card.style.setProperty("--hover-x", `${position.x}%`);
          card.style.setProperty("--hover-y", `${position.y}%`);
          if (Math.abs(position.targetX - position.x) + Math.abs(position.targetY - position.y) > .05) moving = true;
        });
        previousPointerTime = moving ? time : 0;
        if (moving) pointerFrame = requestAnimationFrame(follow);
      };
      const pointer = (event: PointerEvent) => {
        if (!fine.matches || event.pointerType !== "mouse") return;
        const target = (event.target as Element).closest<HTMLElement>("[data-magnetic]");
        const card = (event.target as Element).closest<HTMLElement>("[data-project-image]");
        if (card) {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width;
          const y = (event.clientY - bounds.top) / bounds.height;
          const position = followers.get(card) ?? { x: 50, y: 50, targetX: 50, targetY: 50 };
          position.targetX = x * 100; position.targetY = y * 100;
          followers.set(card, position);
          if (!pointerFrame) pointerFrame = requestAnimationFrame(follow);
        }
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--magnet-x", `${(event.clientX - rect.left - rect.width / 2) * .14}px`);
        target.style.setProperty("--magnet-y", `${(event.clientY - rect.top - rect.height / 2) * .2}px`);
      };
      const resetPointer = (event: PointerEvent) => {
        const card = (event.target as Element).closest<HTMLElement>("[data-project-image]");
        if (card && !(event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) {
          card.style.removeProperty("--tilt-x"); card.style.removeProperty("--tilt-y");
          followers.delete(card);
        }
        const target = (event.target as Element).closest<HTMLElement>("[data-magnetic]");
        if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return;
        target.style.removeProperty("--magnet-x"); target.style.removeProperty("--magnet-y");
      };
      const focus = (event: FocusEvent) => (event.target as Element).closest<HTMLElement>("[data-reveal]")?.setAttribute("data-visible", "true");
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      page.addEventListener("pointermove", pointer);
      page.addEventListener("pointerout", resetPointer);
      page.addEventListener("focusin", focus);
      schedule();
      dispose = () => {
        smoothScroll?.destroy();
        cancelAnimationFrame(frame); cancelAnimationFrame(pointerFrame); followers.clear(); reveal.disconnect(); activity.disconnect();
        window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
        page.removeEventListener("pointermove", pointer); page.removeEventListener("pointerout", resetPointer); page.removeEventListener("focusin", focus);
        page.querySelectorAll<HTMLElement>("[data-project-image]").forEach(card => {
          ["--hover-x", "--hover-y", "--tilt-x", "--tilt-y", "--project-pan", "--project-zoom"].forEach(property => card.style.removeProperty(property));
        });
        delete page.dataset.motionReady;
        page.style.removeProperty("--reading-progress");
        sections.forEach(section => { delete section.dataset.motionActive; section.style.removeProperty("--section-shift"); section.style.removeProperty("--image-shift"); ["--chapter-progress", "--hero-zoom", "--hero-inset", "--hero-copy-shift", "--surface-inset", "--surface-radius", "--scene-copy-shift", "--bridge-shift", "--scene-title-scale", "--index-shift"].forEach(property => section.style.removeProperty(property)); });
        page.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(target => { target.style.removeProperty("--magnet-x"); target.style.removeProperty("--magnet-y"); });
      };
    };
    setup(); reduced.addEventListener("change", setup); fine.addEventListener("change", setup);
    return () => { dispose(); reduced.removeEventListener("change", setup); fine.removeEventListener("change", setup); };
  }, []);
  return null;
}
