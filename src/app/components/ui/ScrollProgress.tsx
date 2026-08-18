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
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none bg-transparent"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-gradient-to-r from-zinc-400 via-white to-zinc-300 dark:from-zinc-500 dark:via-white dark:to-zinc-400 shadow-[0_0_8px_rgba(255,255,255,0.7)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
