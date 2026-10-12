"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (!preference.matches) return;
      const lenis = new Lenis({
        autoRaf: true, lerp: .075, wheelMultiplier: .95,
        smoothWheel: true, syncTouch: false, anchors: { offset: -32 },
        prevent: node => node.tagName === "TEXTAREA" || node.tagName === "SELECT" ||
          node.hasAttribute("data-horizontal-scroll") || node.getAttribute("role") === "dialog",
      });
      const lock = () => {
        if (document.body.style.overflow === "hidden") lenis.stop();
        else lenis.start();
      };
      const observer = new MutationObserver(lock);
      observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
      lock();
      dispose = () => { observer.disconnect(); lenis.destroy(); };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, [pathname]);
  return null;
}
