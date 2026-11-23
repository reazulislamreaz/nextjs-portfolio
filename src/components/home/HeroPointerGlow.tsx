"use client";

import { useEffect, useRef } from "react";

/**
 * HeroPointerGlow — a soft copper spotlight that tracks the cursor within the
 * hero section. Rendered as a direct child of the hero <section>; it wires its
 * listeners to that parent so the whole hero area is the hit zone.
 *
 * Pointer-fine + reduced-motion gated: on touch devices and for users who ask
 * for reduced motion, no listeners are attached and the layer stays hidden
 * (see `.hero-spotlight` in globals.css). Pointer moves are rAF-throttled.
 */
export default function HeroPointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      });
    };
    const onEnter = () => el.setAttribute("data-active", "true");
    const onLeave = () => el.setAttribute("data-active", "false");

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerenter", onEnter);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerenter", onEnter);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="hero-spotlight" aria-hidden data-active="false" />;
}
