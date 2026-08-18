"use client";

import { useState } from "react";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ExperienceCard from "./ExperienceCard";
import { experienceData } from "./experienceData";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(
    experienceData[0]?.id ?? null
  );

  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    // Animate the vertical timeline line drawn on scroll
    gsap.fromTo(
      "[data-timeline-line]",
      { scaleY: 0, transformOrigin: "top center" },
      {
        scrollTrigger: {
          trigger: "[data-timeline-container]",
          start: "top 75%",
          end: "bottom 80%",
          scrub: 1,
        },
        scaleY: 1,
        ease: "none",
      }
    );

    // Staggered reveal for experience items
    const items = gsap.utils.toArray<HTMLElement>("[data-experience-item]");
    items.forEach((item) => {
      const beacon = item.querySelector("[data-timeline-beacon]");
      const card = item.querySelector("[data-experience-card]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (beacon) {
        tl.fromTo(
          beacon,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
        );
      }

      if (card) {
        tl.fromTo(
          card,
          { x: 25, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
      }
    });
  });

  return (
    <Section id="experience" className="bg-zinc-950/30">
      <div ref={containerRef}>
        <SectionHeader
          title="Experience & Impact"
          subtitle="Production backend roles — architecture, real-time engines, and mission-critical systems."
        />

        <div data-timeline-container className="relative mx-auto max-w-4xl">
          {/* GSAP Scroll-Drawn Dynamic Timeline Line */}
          <div
            data-timeline-line
            aria-hidden="true"
            className="absolute left-[1.1rem] sm:left-[1.35rem] top-4 bottom-4 w-[2px] bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-800 dark:from-white dark:via-zinc-500 dark:to-zinc-800"
          />

          <ol className="relative space-y-8 sm:space-y-10 pl-9 sm:pl-12">
            {experienceData.map((entry) => (
              <li
                key={entry.id}
                data-experience-item
                className="relative"
              >
                {/* Glowing Node Beacon */}
                <span
                  data-timeline-beacon
                  className="absolute -left-[1.95rem] sm:-left-[2.25rem] top-8 flex h-4 w-4 rounded-full border-2 border-zinc-900 dark:border-white bg-white dark:bg-black shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                  aria-hidden
                />

                <div data-experience-card>
                  <ExperienceCard
                    entry={entry}
                    expanded={expandedId === entry.id}
                    onToggle={() =>
                      setExpandedId((current) =>
                        current === entry.id ? null : entry.id
                      )
                    }
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
