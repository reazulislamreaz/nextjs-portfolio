"use client";

import { useState } from "react";
import { FiExternalLink, FiGithub, FiLayers } from "react-icons/fi";
import type { Project } from "./projectsData";
import ProjectCarousel from "./ProjectCarousel";
import ProjectDetailModal from "./ProjectDetailModal";

const MAX_VISIBLE_STACK = 6;

interface ProjectCardProps {
  project: Project;
  priorityImage?: boolean;
  layout?: "grid" | "list";
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

  /* ─── List (horizontal) layout ─────────────────────────────── */
  if (layout === "list") {
    return (
      <>
        <article
          id={`project-${slug}`}
          className="group/card relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl md:flex-row md:hover:border-zinc-700 md:hover:shadow-[0_0_24px_rgba(16,185,129,0.07)]"
          aria-labelledby={`${slug}-title`}
        >
          {/* Image side */}
          <div className="relative z-10 w-full shrink-0 p-4 pb-0 md:w-[48%] md:p-5">
            <ProjectCarousel
              images={project.images}
              title={project.title}
              priority={priorityImage}
              compact
            />
          </div>

          {/* Details side */}
          <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 md:py-6 md:pr-7 md:pl-2">
            <header className="space-y-2.5">
              <h3
                id={`${slug}-title`}
                className="text-xl font-bold tracking-tight text-zinc-200 transition-colors duration-300 group-hover/card:text-zinc-50 sm:text-2xl lg:text-[1.65rem]"
              >
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
                {project.tagline}
              </p>
            </header>

            {/* Description — extra room in list view */}
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-500 sm:text-[0.875rem] sm:leading-7">
              {project.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
              {visibleStack.map((feature) => (
                <li key={feature}>
                  <span className="rounded-lg border border-zinc-700/80 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-200">
                    {feature}
                  </span>
                </li>
              ))}
              {hiddenStackCount > 0 && (
                <li>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-500">
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
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <FiExternalLink size={16} aria-hidden />
                  See live demo
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <FiGithub size={16} aria-hidden />
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <FiLayers size={16} aria-hidden />
                  Case study
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

  /* ─── Grid (vertical) layout — original ────────────────────── */
  return (
    <>
      <article
        id={`project-${slug}`}
        className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl md:hover:border-zinc-700 md:hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
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
          <header className="space-y-2">
            <h3
              id={`${slug}-title`}
              className="text-xl font-bold tracking-tight text-zinc-200 transition-colors duration-300 group-hover/card:text-zinc-50 sm:text-2xl"
            >
              {project.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
              {project.tagline}
            </p>
          </header>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
            {visibleStack.map((feature) => (
              <li key={feature}>
                <span className="rounded-lg border border-zinc-700/80 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-200">
                  {feature}
                </span>
              </li>
            ))}
            {hiddenStackCount > 0 && (
              <li>
                <span className="rounded-lg border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-500">
                  +{hiddenStackCount}
                </span>
              </li>
            )}
          </ul>

          <footer className="mt-auto pt-6">
            <div className="flex flex-col gap-2.5">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <FiExternalLink size={17} aria-hidden />
                See live demo
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <FiGithub size={17} aria-hidden />
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="inline-flex min-h-11 items-center cursor-pointer justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-sm font-semibold text-emerald-400 transition hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <FiLayers size={17} aria-hidden />
                  Case study
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
