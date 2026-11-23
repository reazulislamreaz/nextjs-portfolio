"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, isReducedMotion } from "@/lib/gsap";

/**
 * Magnetic — wraps an interactive element so it gently eases toward the cursor
 * on hover, then springs back on leave. A restrained "desktop flourish".
 *
 * Gated to pointer-fine devices and disabled for reduced-motion users, so it
 * adds zero behavior (and zero listeners) on touch/mobile. Uses the GSAP that
 * is already in the bundle — no new dependency.
 */
export default function Magnetic({
  children,
  /** How far the element travels relative to cursor distance (0–1). */
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Desktop pointer only + respect reduced motion.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || isReducedMotion()) return;

    // quickTo gives us a cheap, interruptible tween per axis.
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
