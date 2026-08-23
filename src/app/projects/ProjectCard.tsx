"use client";

import { useState } from "react";
import type { Project } from "./projectsData";
import ProjectCarousel from "./ProjectCarousel";
import ProjectDetailModal from "./ProjectDetailModal";
import { ExternalLink, Layers } from "lucide-react";
import { FiGithub } from "react-icons/fi";

const MAX_VISIBLE_STACK = 7;

interface ProjectCardProps {
  project: Project;
  priorityImage?: boolean;
  layout?: "grid" | "list";
  index?: number;
}

export default function ProjectCard({
  project,
  priorityImage = false,
  layout = "grid",
}: ProjectCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const slug = project.title.toLowerCase().replace(/\s+/g, "-");

  const visibleStack = project.features.slice(0, MAX_VISIBLE_STACK);
  const hiddenStackCount = project.features.length - visibleStack.length;

  /* ─── List (expanded horizontal case-study) layout ─────────── */
  if (layout === "list") {
    return (
      <>
        <article
          id={`project-${slug}`}
          data-project-card
          className="group/card relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 md:flex-row"
          aria-labelledby={`${slug}-title`}
        >

          {/* Media / Carousel Column */}
          <div className="relative z-10 w-full shrink-0 p-4 pb-0 md:w-[48%] md:p-5">
            <ProjectCarousel
              images={project.images}
              title={project.title}
              priority={priorityImage}
              compact
            />
          </div>

          {/* Storytelling Details Column */}
          <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 md:py-6 md:pr-7 md:pl-2">
            <header className="space-y-2">
              <div className="flex items-center gap-2">
                <h3
                  id={`${slug}-title`}
                  className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl lg:text-[1.65rem]"
                >
                  {project.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300 font-medium sm:text-[0.9375rem]">
                {project.tagline}
              </p>
            </header>

            {/* Architecture Highlights / Key metric */}
            {project.metrics && project.metrics.length > 0 && (
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                {project.metrics[0]}
              </p>
            )}

            {/* Tech Stack Chips */}
            <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {visibleStack.map((feature) => (
                <li key={feature}>
                  <span className="rounded-lg border border-zinc-700/80 bg-zinc-800/90 px-2.5 py-1 text-xs font-medium text-zinc-200">
                    {feature}
                  </span>
                </li>
              ))}
              {hiddenStackCount > 0 && (
                <li>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-400">
                    +{hiddenStackCount}
                  </span>
                </li>
              )}
            </ul>

            <footer className="mt-auto pt-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <ExternalLink size={15} aria-hidden />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <FiGithub size={15} aria-hidden />
                  <span>Source</span>
                </a>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Layers size={15} aria-hidden />
                  <span>Case study</span>
                </button>
              </div>
            </footer>
          </div>
        </article>

        {detailsOpen && (
          <ProjectDetailModal
            project={project}
            onClose={() => setDetailsOpen(false)}
          />
        )}
      </>
    );
  }

  /* ─── Grid (vertical) layout ───────────────────────────────── */
  return (
    <>
      <article
        id={`project-${slug}`}
        data-project-card
        className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60"
        aria-labelledby={`${slug}-title`}
      >

        <div className="relative z-10 p-4 pb-0 sm:p-5 sm:pb-0">
          <ProjectCarousel
            images={project.images}
            title={project.title}
            priority={priorityImage}
            compact
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
          <header className="space-y-1.5">
            <h3
              id={`${slug}-title`}
              className="text-xl font-bold tracking-tight text-zinc-100 transition-colors duration-300 group-hover/card:text-zinc-50 sm:text-2xl"
            >
              {project.title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
              {project.tagline}
            </p>
          </header>

          {project.metrics && project.metrics.length > 0 && (
            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-400">
              {project.metrics[0]}
            </p>
          )}

          <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {visibleStack.map((feature) => (
              <li key={feature}>
                <span className="rounded-lg border border-zinc-700/80 bg-zinc-800/90 px-2.5 py-1 text-xs font-medium text-zinc-200">
                  {feature}
                </span>
              </li>
            ))}
            {hiddenStackCount > 0 && (
              <li>
                <span className="rounded-lg border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-400">
                  +{hiddenStackCount}
                </span>
              </li>
            )}
          </ul>

          <footer className="mt-auto pt-5">
            <div className="flex flex-col gap-2">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <ExternalLink size={15} aria-hidden />
                <span>Live Demo</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-zinc-700/80 bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-zinc-50 focus:outline-none sm:text-sm"
                >
                  <FiGithub size={15} aria-hidden />
                  <span>GitHub</span>
                </a>

                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-zinc-50 focus:outline-none sm:text-sm"
                >
                  <Layers size={15} aria-hidden />
                  <span>Case Study</span>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>

      {detailsOpen && (
        <ProjectDetailModal
          project={project}
          onClose={() => setDetailsOpen(false)}
        />
      )}
    </>
  );
}
