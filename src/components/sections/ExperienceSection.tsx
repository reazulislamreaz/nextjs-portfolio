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
    experienceData[0]?.id ?? null,
  );

  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-experience-item]",
      { y: 24, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.55,
        ease: "power2.out",
      },
    );
  });

  return (
    <Section id="experience" tight>
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="Experience"
          title="Roles where I build and ship backends"
          subtitle="Client platforms, event systems, and team delivery — with APIs, data models, and realtime features."
        />

        <ol className="relative space-y-5 sm:space-y-6">
          {experienceData.map((entry) => (
            <li key={entry.id} data-experience-item className="relative">
              <ExperienceCard
                entry={entry}
                expanded={expandedId === entry.id}
                onToggle={() =>
                  setExpandedId((current) =>
                    current === entry.id ? null : entry.id,
                  )
                }
              />
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
