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
      "Honors program covering governance, policy, research methods, and institutional systems.",
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
    title: "Research and analysis",
    description:
      "Breaking a messy question into something I can test, document, and defend — useful when designing APIs and data models.",
  },
  {
    title: "Writing clearly",
    description:
      "Practice writing precise arguments. That carries over to API docs, tickets, and explaining a design to other engineers.",
  },
  {
    title: "How institutions work",
    description:
      "Policy and governance study is mostly about roles, rules, and who can do what — similar to permission models in software.",
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
          title="Education"
          subtitle="Honors program in Political Science at National University, Bangladesh."
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

                  <article className="relative rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-7">
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
                        <h4 className="mb-3 text-xs font-semibold text-zinc-400">
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
                        <h4 className="mb-3 text-xs font-semibold text-zinc-400">
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
                  </article>
                </li>
              ))}
            </ol>

            <div className="border-t border-zinc-800/80 pt-6">
              <h3 className="text-sm font-semibold text-zinc-200">
                Certifications
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Full-stack, cloud, and AI coursework is listed in the certifications
                section.
              </p>
              <SectionLink
                href="/#certifications"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-zinc-100 transition-colors hover:underline"
              >
                <span>View certifications</span>
                <ArrowRight size={15} aria-hidden />
              </SectionLink>
            </div>
          </div>

          <aside data-edu-right className="min-w-0 space-y-6 lg:col-span-5 lg:pt-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                What this trained me to do
              </h3>
              <ul className="space-y-5">
                {academicStrengths.map((item) => (
                  <li key={item.title} className="border-b border-zinc-800/80 pb-5 last:border-b-0 last:pb-0">
                    <h4 className="text-sm font-semibold text-zinc-100">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
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
