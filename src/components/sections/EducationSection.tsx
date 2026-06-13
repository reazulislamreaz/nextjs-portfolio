import Image from "next/image";
import SectionLink from "@/app/components/SectionLink";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";

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
      "Honors program in governance, policy, and research — builds analytical thinking and clear writing for software delivery.",
    highlights: [
      "Research design and academic writing",
      "Governance and political analysis",
      "Policy framing and stakeholder context",
      "Data interpretation and systems evaluation",
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
    title: "Analytical rigor",
    description: "Break ambiguous problems into testable claims — same discipline as API design.",
  },
  {
    title: "Clear communication",
    description: "Strong synthesis for specs, docs, and cross-functional alignment.",
  },
  {
    title: "Systems thinking",
    description: "Policy and institutions map to multi-service architecture and ownership.",
  },
];

export default function Education() {
  return (
    <Section id="education" className="bg-zinc-950/40">
      <SectionHeader
        title="Education"
        subtitle="Academic background. Technical training lives under Certifications."
      />

      <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 space-y-8 lg:col-span-7">
          <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
            Social science, not CS — by design. It sharpens how I research requirements, document
            decisions, and communicate trade-offs.
          </p>

          <ol className="relative space-y-8 border-l border-zinc-800/80 pl-6 sm:pl-8">
            {educationEntries.map((entry) => (
              <li key={entry.degree} className="relative">
                <span
                  className="absolute -left-[1.625rem] top-1.5 flex h-3 w-3 rounded-full border-2 border-emerald-500/80 bg-zinc-950 sm:-left-[2.125rem]"
                  aria-hidden
                />

                <article className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl sm:p-8 md:hover:border-zinc-700 md:hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                        <FiAward size={14} aria-hidden />
                        {entry.status}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                        <FiCalendar size={14} aria-hidden />
                        {entry.period}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
                      {entry.degree}
                    </h3>
                    <p className="mt-1 text-base font-medium text-emerald-400/90 sm:text-lg">
                      {entry.field}
                    </p>

                    <dl className="mt-4 space-y-2 text-sm text-zinc-400">
                      <div className="flex items-start gap-2">
                        <FiBookOpen
                          className="mt-0.5 shrink-0 text-zinc-500"
                          size={16}
                          aria-hidden
                        />
                        <dd>{entry.institution}</dd>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiMapPin
                          className="mt-0.5 shrink-0 text-zinc-500"
                          size={16}
                          aria-hidden
                        />
                        <dd>{entry.location}</dd>
                      </div>
                    </dl>

                    <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
                      {entry.summary}
                    </p>

                    <div className="mt-6">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Highlights
                      </h4>
                      <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-400">
                        {entry.highlights.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500/80" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-zinc-800/80 pt-5">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Focus areas
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {entry.focusAreas.map((area) => (
                          <li key={area}>
                            <span className="rounded-lg border border-zinc-700/80 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200">
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

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-5 sm:rounded-3xl sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Technical training
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">
              Full-stack, cloud, and AI programs are listed under certifications.
            </p>
            <SectionLink
              href="/#certifications"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              View certifications & learning
              <FiArrowRight size={16} aria-hidden />
            </SectionLink>
          </div>
        </div>

        <aside className="min-w-0 space-y-6 lg:col-span-5 lg:pt-12">
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl">
              Academics → engineering
            </h3>
            <ul className="space-y-4">
              {academicStrengths.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md transition-colors hover:border-zinc-700"
                >
                  <h4 className="text-sm font-semibold text-zinc-200">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 scale-105 rounded-3xl bg-gradient-to-t from-emerald-500/10 to-transparent opacity-60 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 shadow-xl backdrop-blur-md sm:rounded-3xl sm:p-8">
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
    </Section>
  );
}
