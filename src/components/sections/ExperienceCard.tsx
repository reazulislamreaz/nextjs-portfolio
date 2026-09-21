"use client";

import type { Experience } from "./experienceData";
import { ChevronDown } from "lucide-react";

const MAX_VISIBLE_STACK = 8;

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
    <article className="surface-card rounded-lg transition-[border-color,box-shadow] duration-200 motion-safe:hover:border-zinc-600/80">
      <div className="p-5 sm:p-6 lg:p-7">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {entry.isCurrent ? (
              <span className="type-eyebrow">Current</span>
            ) : null}
            <span className="type-meta uppercase tracking-[0.14em]">
              {entry.employmentType} · {entry.workMode}
            </span>
          </div>

          <div>
            <h3 className="type-card-title">{entry.role}</h3>
            <p className="mt-1.5 text-base font-medium text-zinc-200">
              {entry.company}
            </p>
          </div>

          <p className="type-meta">
            {entry.period} · {entry.duration} · {entry.location}
          </p>

          <p className="type-body text-pretty">{entry.tagline}</p>
        </header>

        <p className="type-meta mt-4 leading-relaxed">
          {visibleStack.join(" · ")}
          {hiddenStackCount > 0 ? ` · +${hiddenStackCount}` : ""}
        </p>

        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
          aria-hidden={!expanded}
        >
          <div className="overflow-hidden">
            <div className="mt-5 space-y-5 border-t border-zinc-700/60 pt-5 sm:mt-6 sm:pt-6">
              <p className="type-body text-pretty">{entry.summary}</p>

              {entry.architecture ? (
                <div>
                  <h4 className="type-label">Architecture</h4>
                  <p className="type-body mt-1.5 text-pretty">
                    {entry.architecture}
                  </p>
                </div>
              ) : null}

              <div>
                <h4 className="type-label">What I worked on</h4>
                <ul className="mt-3 space-y-2.5">
                  {entry.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-5">
          <button
            type="button"
            onClick={onToggle}
            className="btn-ghost !min-h-10 px-0 hover:bg-transparent"
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            {expanded ? "Hide details" : "Show details"}
            <ChevronDown
              size={15}
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
