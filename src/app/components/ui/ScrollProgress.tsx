"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-emerald-400"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
