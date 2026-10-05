"use client";

import { useEffect } from "react";

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
      const visible = new Set<HTMLElement>();
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
        visible.forEach(section => {
          const rect = section.getBoundingClientRect();
          const progress = Math.max(-1, Math.min(1, (height / 2 - rect.top - rect.height / 2) / height));
          section.style.setProperty("--section-shift", `${progress * 64}px`);
          section.style.setProperty("--image-shift", `${progress * 26}px`);
        });
        const total = page.offsetHeight - height;
        page.style.setProperty("--reading-progress", String(Math.max(0, Math.min(1, -page.getBoundingClientRect().top / Math.max(1, total)))));
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      const activity = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const section = entry.target as HTMLElement;
          section.dataset.motionActive = String(entry.isIntersecting);
          if (entry.isIntersecting) visible.add(section); else visible.delete(section);
        });
        schedule();
      });
      sections.forEach(section => activity.observe(section));
      const pointer = (event: PointerEvent) => {
        if (!fine.matches || event.pointerType !== "mouse") return;
        const target = (event.target as Element).closest<HTMLElement>("[data-magnetic]");
        const card = (event.target as Element).closest<HTMLElement>("[data-project-image]");
        if (card) {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width;
          const y = (event.clientY - bounds.top) / bounds.height;
          card.style.setProperty("--hover-x", `${x * 100}%`);
          card.style.setProperty("--hover-y", `${y * 100}%`);
          card.style.setProperty("--tilt-x", `${(0.5 - y) * 3}deg`);
          card.style.setProperty("--tilt-y", `${(x - 0.5) * 3}deg`);
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
        cancelAnimationFrame(frame); reveal.disconnect(); activity.disconnect();
        window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
        page.removeEventListener("pointermove", pointer); page.removeEventListener("pointerout", resetPointer); page.removeEventListener("focusin", focus);
        page.querySelectorAll<HTMLElement>("[data-project-image]").forEach(card => {
          ["--hover-x", "--hover-y", "--tilt-x", "--tilt-y"].forEach(property => card.style.removeProperty(property));
        });
        delete page.dataset.motionReady;
        page.style.removeProperty("--reading-progress");
        sections.forEach(section => { delete section.dataset.motionActive; section.style.removeProperty("--section-shift"); section.style.removeProperty("--image-shift"); });
        page.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(target => { target.style.removeProperty("--magnet-x"); target.style.removeProperty("--magnet-y"); });
      };
    };
    setup(); reduced.addEventListener("change", setup);
    return () => { dispose(); reduced.removeEventListener("change", setup); };
  }, []);
  return null;
}
