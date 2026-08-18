"use client";

import {
  FiBriefcase,
  FiCalendar,
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";
import type { Experience } from "./experienceData";

const MAX_VISIBLE_STACK = 6;

interface ExperienceCardProps {
  entry: Experience;
  expanded: boolean;
  onToggle: () => void;
}

export default function ExperienceCard({
  entry,
  expanded,
  onToggle,
}: ExperienceCardProps) {
  const visibleStack = entry.techStack.slice(0, MAX_VISIBLE_STACK);
  const hiddenStackCount = entry.techStack.length - visibleStack.length;
  const panelId = `${entry.id}-details`;

  return (
    <article className="group/card relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl hover:border-zinc-500">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      <div className="relative z-10 p-5 sm:p-6 lg:p-7">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {entry.isCurrent && (
              <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-50">
                Current role
              </span>
            )}
            <span className="rounded-full border border-zinc-700/80 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-200">
              {entry.employmentType}
            </span>
            <span className="rounded-full border border-zinc-700/80 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-400">
              {entry.workMode}
            </span>
          </div>

          <ExperienceRoleHeader entry={entry} />

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
            <p className="flex items-center gap-1.5">
              <FiCalendar size={15} className="shrink-0" aria-hidden />
              <span>
                {entry.period}
                <span className="text-zinc-500"> · </span>
                {entry.duration}
              </span>
            </p>
            <p className="flex items-center gap-1.5">
              <FiMapPin size={15} className="shrink-0" aria-hidden />
              <span>{entry.location}</span>
            </p>
          </div>

          <p className="text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
            {entry.tagline}
          </p>
        </header>

        <ul
          className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1.5 sm:gap-2"
          aria-label="Technologies used"
        >
          {visibleStack.map((tech) => (
            <li key={tech}>
              <span className="inline-block rounded-lg border border-zinc-700/80 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-100">
                {tech}
              </span>
            </li>
          ))}
          {hiddenStackCount > 0 && (
            <li>
              <span className="inline-block rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-2.5 py-1 text-xs font-medium text-zinc-400">
                +{hiddenStackCount}
              </span>
            </li>
          )}
        </ul>

        <ExperienceDetails
          entry={entry}
          expanded={expanded}
          panelId={panelId}
        />

        <footer className="mt-6">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:text-zinc-50 focus:outline-none sm:w-auto"
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            {expanded ? "Hide details" : "View role details"}
            <FiChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
        </footer>
      </div>
    </article>
  );
}

function ExperienceRoleHeader({ entry }: { entry: Experience }) {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
        {entry.role}
      </h3>
      <p className="mt-1 flex items-center gap-2 text-base font-medium text-zinc-200 sm:text-lg">
        <FiBriefcase size={18} className="shrink-0 opacity-80" aria-hidden />
        {entry.company}
      </p>
    </div>
  );
}

function ExperienceDetails({
  entry,
  expanded,
  panelId,
}: {
  entry: Experience;
  expanded: boolean;
  panelId: string;
}) {
  return (
    <div
      id={panelId}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
      aria-hidden={!expanded}
    >
      <div className="overflow-hidden">
        <div className="mt-6 space-y-6 border-t border-zinc-700/80 pt-6">
          <p className="text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
            {entry.summary}
          </p>

          {entry.architecture && (
            <section>
              <h4 className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-zinc-50">
                Architecture
              </h4>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
                {entry.architecture}
              </p>
            </section>
          )}

          <section>
            <h4 className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-zinc-50">
              Contributions
            </h4>
            <ul className="space-y-2.5">
              {entry.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-zinc-300"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-50"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Tech stack
            </h4>
            <ul className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-2.5">
              {entry.techStack.map((tech) => (
                <li key={tech} className="max-w-full">
                  <span className="inline-block rounded-lg border border-zinc-700/80 bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-200 sm:text-sm">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
