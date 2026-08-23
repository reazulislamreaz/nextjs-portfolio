"use client";

import type { Experience } from "./experienceData";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  MapPin,
  Layers,
  Terminal,
} from "lucide-react";

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
    <article className="relative rounded-xl border border-zinc-800 bg-zinc-900/70">
      <div className="p-5 sm:p-6 lg:p-7">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {entry.isCurrent && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-beacon" />
                Current Role
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

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-400">
            <p className="flex items-center gap-1.5">
              <Calendar size={14} className="shrink-0 text-zinc-500" aria-hidden />
              <span>
                {entry.period}
                <span className="text-zinc-500"> · </span>
                {entry.duration}
              </span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0 text-zinc-500" aria-hidden />
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
            className="inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800/90 px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:text-zinc-50 focus:outline-none sm:w-auto"
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            <span>{expanded ? "Hide details" : "Show details"}</span>
            <ChevronDown
              size={16}
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
      <p className="mt-1 flex items-center gap-2 text-base font-semibold text-zinc-200 sm:text-lg">
        <Briefcase size={16} className="shrink-0 text-zinc-400" aria-hidden />
        <span>{entry.company}</span>
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
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
                <Layers size={13} className="text-zinc-400" />
                <span>Architecture</span>
              </h4>
              <p className="text-xs leading-relaxed text-zinc-300">
                {entry.architecture}
              </p>
            </section>
          )}

          <section>
            <h4 className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
              <Terminal size={13} className="text-zinc-500" />
              <span>What I worked on</span>
            </h4>
            <ul className="space-y-2.5">
              {entry.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-zinc-300"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-semibold text-zinc-400">
              Tech stack
            </h4>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
              {entry.techStack.map((tech) => (
                <li key={tech} className="max-w-full">
                  <span className="inline-block rounded-lg border border-zinc-700/80 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-200">
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
