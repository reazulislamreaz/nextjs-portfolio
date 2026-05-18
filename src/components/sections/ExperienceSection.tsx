"use client";

import { useState } from "react";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ExperienceCard from "./ExperienceCard";
import { experienceData } from "./experienceData";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(
    experienceData[0]?.id ?? null,
  );

  return (
    <Section id="experience" className="bg-black/30">
      <SectionHeader
        title="Experience"
        subtitle="Professional roles focused on production backends — scan the highlights, then expand for architecture and contributions."
      />

      <ol className="relative space-y-8 border-l border-zinc-800/80 pl-6 sm:pl-8">
        {experienceData.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              className="absolute -left-[1.625rem] top-8 flex h-3 w-3 rounded-full border-2 border-emerald-500/80 bg-zinc-950 sm:-left-[2.125rem]"
              aria-hidden
            />
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
    </Section>
  );
}
