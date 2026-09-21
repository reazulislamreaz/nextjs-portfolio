"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { BookOpen, Calendar, MapPin } from "lucide-react";

const education = {
  degree: "Bachelor of Social Science (Honors)",
  field: "Political Science",
  institution: "National University, Bangladesh",
  location: "Bangladesh",
  period: "In progress · Expected graduation 2026",
  status: "In progress",
  summary:
    "Honors program covering governance, policy, research methods, and institutional systems — training that transfers to clear API design, permission models, and structured problem-solving.",
  focusAreas: [
    "Political theory",
    "Public policy",
    "Research methodology",
    "Governance & institutions",
  ],
};

export default function Education() {
  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-edu]",
      { y: 18, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  });

  return (
    <Section id="education" tight>
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="Education"
          title="Academic foundation"
          subtitle="Honors program in Political Science at National University, Bangladesh."
        />

        <article data-edu className="surface-card rounded-lg p-5 sm:p-6 lg:p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="type-eyebrow">{education.status}</span>
            <span className="inline-flex items-center gap-1.5 type-meta">
              <Calendar size={12} aria-hidden />
              {education.period}
            </span>
          </div>

          <h3 className="type-card-title mt-4">{education.degree}</h3>
          <p className="mt-1.5 text-base font-medium text-zinc-200">
            {education.field}
          </p>

          <dl className="mt-4 space-y-2 text-sm text-zinc-400">
            <div className="flex items-start gap-2">
              <BookOpen
                className="mt-0.5 shrink-0 text-zinc-500"
                size={15}
                aria-hidden
              />
              <dd>{education.institution}</dd>
            </div>
            <div className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 shrink-0 text-zinc-500"
                size={15}
                aria-hidden
              />
              <dd>{education.location}</dd>
            </div>
          </dl>

          <p className="type-body mt-5 max-w-2xl text-pretty">
            {education.summary}
          </p>

          <p className="type-meta mt-5">
            {education.focusAreas.join(" · ")}
          </p>
        </article>
      </div>
    </Section>
  );
}
