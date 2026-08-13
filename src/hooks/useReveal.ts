"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-reveal hook with replay support.
 *
 * Attaches an IntersectionObserver to the returned ref. When the element
 * enters the viewport it receives `data-revealed="true"`, which CSS uses
 * to transition from hidden → visible. When the element leaves the viewport,
 * `data-revealed` is reset so the animation replays on re-entry.
 *
 * An optional `delay` (in ms) sets `--reveal-delay` on the element so
 * staggered children can pick it up in CSS.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  delay?: number,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — always visible, no observer
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    if (delay !== undefined) {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "true");
        } else {
          el.setAttribute("data-revealed", "");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
