"use client";

import { useEffect, useRef } from "react";
import { isReducedMotion } from "@/lib/motion";

/**
 * Lightweight page-scroll progress (transform only — no GSAP on the critical path).
 */
export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const bar = progressBarRef.current;
    if (!bar) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent motion-reduce:hidden"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-emerald-400 will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
