"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap, registerGsap, isReducedMotion } from "@/lib/gsap";

/**
 * Hook to run GSAP animations scoped to a container element with automatic cleanup.
 * Automatically respects `prefers-reduced-motion`.
 */
export function useGsapScroll<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (context: gsap.Context, isReduced: boolean) => void,
  deps: DependencyList = [],
): RefObject<T | null> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    registerGsap();
    const el = containerRef.current;
    if (!el) return;

    const reduced = isReducedMotion();

    const ctx = gsap.context((self) => {
      animationCallback(self, reduced);
    }, el);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
