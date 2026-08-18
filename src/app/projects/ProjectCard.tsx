"use client";

import { useState } from "react";
import type { Project } from "./projectsData";
import ProjectCarousel from "./ProjectCarousel";
import ProjectDetailModal from "./ProjectDetailModal";
import {
  ExternalLink,
  Layers,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
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
  index = 0,
}: ProjectCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const slug = project.title.toLowerCase().replace(/\s+/g, "-");

  const visibleStack = project.features.slice(0, MAX_VISIBLE_STACK);
  const hiddenStackCount = project.features.length - visibleStack.length;
  const projectNumber = String(index + 1).padStart(2, "0");

  /* ─── List (expanded horizontal case-study) layout ─────────── */
  if (layout === "list") {
    return (
      <>
        <article
          id={`project-${slug}`}
          data-project-card
          className="group/card relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl md:flex-row md:hover:-translate-y-0.5 md:hover:border-zinc-600 md:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          aria-labelledby={`${slug}-title`}
        >
          {/* Top Index HUD Marker */}
          <div className="absolute top-3.5 right-4 z-20 hidden md:flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/85 px-3 py-1 text-[10px] font-mono font-bold text-zinc-400">
            <span className="text-zinc-500">SYSTEM</span>
            <span className="text-zinc-100">{projectNumber}</span>
          </div>

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
                <span className="md:hidden inline-block rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[10px] font-mono font-bold text-zinc-400">
                  SYSTEM // {projectNumber}
                </span>
                <h3
                  id={`${slug}-title`}
                  className="text-xl font-bold tracking-tight text-zinc-100 transition-colors duration-300 group-hover/card:text-white sm:text-2xl lg:text-[1.65rem]"
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
              <div className="mt-3 rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-2.5 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 uppercase font-bold mb-1">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span>KEY SYSTEM ACHIEVEMENT</span>
                </div>
                <p className="line-clamp-2 text-[11px] leading-relaxed text-zinc-300">
                  {project.metrics[0]}
                </p>
              </div>
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
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <ExternalLink size={15} aria-hidden />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                  <span>Architecture & Case Study</span>
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
        className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl md:hover:-translate-y-0.5 md:hover:border-zinc-600 md:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        aria-labelledby={`${slug}-title`}
      >
        {/* Top HUD Index Marker */}
        <div className="absolute top-3.5 right-4 z-20 flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/85 px-3 py-1 text-[10px] font-mono font-bold text-zinc-400">
          <span className="text-zinc-500">SYSTEM</span>
          <span className="text-zinc-100">{projectNumber}</span>
        </div>

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
              className="text-xl font-bold tracking-tight text-zinc-100 transition-colors duration-300 group-hover/card:text-white sm:text-2xl"
            >
              {project.title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
              {project.tagline}
            </p>
          </header>

          {/* Quick Production Highlight */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-3 rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-2 text-xs text-zinc-300">
              <p className="line-clamp-1 text-[11px] font-mono text-zinc-300">
                ⚡ {project.metrics[0]}
              </p>
            </div>
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
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <ExternalLink size={15} aria-hidden />
                <span>Live Demo</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-zinc-700/80 bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white focus:outline-none sm:text-sm"
                >
                  <FiGithub size={15} aria-hidden />
                  <span>GitHub</span>
                </a>

                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white focus:outline-none sm:text-sm"
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
