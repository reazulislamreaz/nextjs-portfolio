"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { isReducedMotion } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: import("lenis").default | null;
  }
}

/**
 * Desktop smooth scrolling driven by the GSAP ticker and synced to ScrollTrigger.
 * (Lenis handles the scroll interpolation; GSAP owns the frame loop — the standard
 * free-stack equivalent of ScrollSmoother.)
 *
 * Mobile / touch / coarse pointers keep native scrolling for INP and battery.
 */
const DESKTOP_SMOOTH_MQ =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    if (isReducedMotion()) {
      window.__lenis = null;
      return;
    }

    const mq = window.matchMedia(DESKTOP_SMOOTH_MQ);
    let cancelled = false;
    let removeScroll: (() => void) | undefined;
    let updateTicker: ((time: number) => void) | undefined;

    const teardown = () => {
      removeScroll?.();
      removeScroll = undefined;
      if (updateTicker) {
        gsap.ticker.remove(updateTicker);
        updateTicker = undefined;
        // Restore GSAP defaults when smooth scroll is off
        gsap.ticker.lagSmoothing(500, 33);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };

    const setup = async () => {
      teardown();
      if (cancelled || !mq.matches) return;

      const { default: Lenis } = await import("lenis");
      if (cancelled || !mq.matches) return;

      const { ScrollTrigger } = registerGsap();

      const lenis = new Lenis({
        // Slightly snappier than 1.1 — still smooth, less “float”
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        autoRaf: false, // GSAP ticker owns the loop
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      const onLenisScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", onLenisScroll);
      removeScroll = () => {
        lenis.off("scroll", onLenisScroll);
      };

      updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateTicker);
      // Keep ScrollTrigger + Lenis in lockstep (no ticker lag compensation)
      gsap.ticker.lagSmoothing(0);

      // Recalculate triggers after the scroller is live
      requestAnimationFrame(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    };

    void setup();
    const onChange = () => {
      void setup();
    };
    mq.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      mq.removeEventListener("change", onChange);
      teardown();
    };
  }, []);

  return <>{children}</>;
}
