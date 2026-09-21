"use client";

import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  const ref = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-sh-line]",
      { y: 10, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.4,
        ease: "power2.out",
      },
    );
  });

  return (
    <div ref={ref} className="mb-8 max-w-2xl sm:mb-10 lg:mb-12">
      {eyebrow ? (
        <p data-sh-line className="type-eyebrow mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2 data-sh-line className="type-section">
        {title}
      </h2>
      {subtitle ? (
        <p data-sh-line className="type-body mt-3 max-w-xl text-pretty">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
