"use client";

import Image from "next/image";
import SectionLink from "@/app/components/SectionLink";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import {
  Award,
  BookOpen,
  Calendar,
  MapPin,
  ArrowRight,
  GraduationCap,
  Brain,
} from "lucide-react";

interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  status: "In progress" | "Completed";
  summary: string;
  highlights: string[];
  focusAreas: string[];
}

const educationEntries: EducationEntry[] = [
  {
    degree: "Bachelor of Social Science (Honors)",
    field: "Political Science",
    institution: "National University, Bangladesh",
    location: "Bangladesh",
    period: "In progress · Expected graduation 2026",
    status: "In progress",
    summary:
      "Honors program in governance, policy, and institutional systems — builds analytical rigor and precise technical writing for software delivery.",
    highlights: [
      "Research design and academic synthesis",
      "Governance and multi-stakeholder policy analysis",
      "Qualitative systems evaluation & structuring",
      "Data interpretation and complex reasoning",
    ],
    focusAreas: [
      "Political theory",
      "Public policy",
      "Research methodology",
      "Governance & institutions",
    ],
  },
];

const academicStrengths = [
  {
    title: "Analytical Rigor",
    description:
      "Break ambiguous problems into testable claims — the same discipline required for API contracts and distributed invariants.",
  },
  {
    title: "Precise Communication",
    description:
      "Strong synthesis for architectural decision records (ADRs), API specifications, and cross-functional alignment.",
  },
  {
    title: "Systems Thinking",
    description:
      "Institutional policy mapping directly translates to multi-service domain boundaries and permission models.",
  },
];

export default function Education() {
  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-edu-left]",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-edu-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      "[data-edu-right]",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-edu-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.15,
        ease: "power3.out",
      }
    );
  });

  return (
    <Section id="education" className="bg-zinc-950/40">
      <div ref={containerRef}>
        <SectionHeader
          title="Academic Foundation"
          subtitle="University education in analytical reasoning and systems evaluation."
        />

        <div data-edu-container className="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-edu-left className="min-w-0 space-y-8 lg:col-span-7">
            <ol className="relative space-y-8 border-l border-zinc-800/80 pl-6 sm:pl-8">
              {educationEntries.map((entry) => (
                <li key={entry.degree} className="relative">
                  <span
                    className="absolute -left-[1.625rem] top-1.5 flex h-3 w-3 rounded-full border-2 border-zinc-50 bg-zinc-950 sm:-left-[2.125rem] shadow-sm"
                    aria-hidden
                  />

                  <article className="group relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900 p-5 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl sm:p-8 hover:border-zinc-500">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-50">
                          <Award size={14} aria-hidden />
                          <span>{entry.status}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                          <Calendar size={14} aria-hidden />
                          <span>{entry.period}</span>
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
                        {entry.degree}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-zinc-200 sm:text-lg">
                        {entry.field}
                      </p>

                      <dl className="mt-4 space-y-2 text-sm text-zinc-400">
                        <div className="flex items-start gap-2">
                          <BookOpen
                            className="mt-0.5 shrink-0 text-zinc-500"
                            size={16}
                            aria-hidden
                          />
                          <dd>{entry.institution}</dd>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin
                            className="mt-0.5 shrink-0 text-zinc-500"
                            size={16}
                            aria-hidden
                          />
                          <dd>{entry.location}</dd>
                        </div>
                      </dl>

                      <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
                        {entry.summary}
                      </p>

                      <div className="mt-6">
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          Highlights
                        </h4>
                        <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-300">
                          {entry.highlights.map((item) => (
                            <li key={item} className="flex gap-2.5">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-50" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 border-t border-zinc-700/80 pt-5">
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          Focus areas
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {entry.focusAreas.map((area) => (
                            <li key={area}>
                              <span className="rounded-lg border border-zinc-700/80 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-100">
                                {area}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border border-zinc-700/80 bg-zinc-900 p-5 sm:rounded-3xl sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Technical Certifications
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem]">
                Full-stack, cloud computing, and AI specializations are listed under
                certifications.
              </p>
              <SectionLink
                href="/#certifications"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-50 transition-colors hover:underline"
              >
                <span>View certifications & credentials</span>
                <ArrowRight size={15} aria-hidden />
              </SectionLink>
            </div>
          </div>

          <aside data-edu-right className="min-w-0 space-y-6 lg:col-span-5 lg:pt-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold tracking-tight text-zinc-50 sm:text-xl">
                Academics → Engineering Translation
              </h3>
              <ul className="space-y-4">
                {academicStrengths.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-zinc-700/80 bg-zinc-900 p-5 backdrop-blur-md transition-colors hover:border-zinc-500"
                  >
                    <h4 className="text-sm font-semibold text-zinc-100">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 scale-105 rounded-3xl bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent opacity-60 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/30 p-6 shadow-xl backdrop-blur-md sm:rounded-3xl sm:p-8">
                <Image
                  src="/image.png"
                  alt=""
                  width={500}
                  height={500}
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="mx-auto h-auto w-full max-w-[280px] object-contain opacity-90 sm:max-w-xs"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
