"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, isReducedMotion } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const { ScrollTrigger } = registerGsap();
    const bar = progressBarRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        gsap.to(bar, {
          scaleX: self.progress,
          ease: "none",
          duration: 0.1,
          overwrite: "auto",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent motion-reduce:hidden"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-emerald-400"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
