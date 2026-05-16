import type { ReactNode } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "./projectsData";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  priorityImage?: boolean;
}

function CaseBlock({
  label,
  children,
  muted = false,
}: {
  label: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="border-t border-zinc-800/80 pt-5">
      <h4
        className={`mb-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
          muted ? "text-zinc-500" : "text-emerald-500/90"
        }`}
      >
        {label}
      </h4>
      <p className="text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
        {children}
      </p>
    </div>
  );
}

export default function ProjectCard({
  project,
  priorityImage = false,
}: ProjectCardProps) {
  const slug = project.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      id={`project-${slug}`}
      className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 shadow-xl backdrop-blur-md transition-all duration-300 sm:rounded-3xl md:hover:border-zinc-700 md:hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
      aria-labelledby={`${slug}-title`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      <div className="relative z-10 p-4 pb-0 sm:p-5 sm:pb-0">
        <ProjectCarousel
          images={project.images}
          title={project.title}
          priority={priorityImage}
          className="h-60 sm:h-64 md:h-72 lg:h-[300px]"
          compact
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <header className="space-y-3">
          <h3
            id={`${slug}-title`}
            className="text-2xl font-bold tracking-tight text-zinc-200 transition-colors duration-300 group-hover/card:text-white sm:text-[1.65rem]"
          >
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
            {project.description}
          </p>
        </header>

        <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Tech stack">
          {project.features.map((feature) => (
            <li key={feature}>
              <span className="rounded-lg border border-zinc-700/80 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-sm transition-colors hover:border-emerald-500/40 hover:bg-zinc-800 sm:text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex-1 space-y-0">
          <CaseBlock label="Problem">{project.problem}</CaseBlock>
          <CaseBlock label="Architecture">{project.architecture}</CaseBlock>
          <CaseBlock label="Key challenges">{project.keyChallenges}</CaseBlock>
          <CaseBlock label="Solutions">{project.solutions}</CaseBlock>
          <CaseBlock label="Iteration roadmap" muted>
            {project.futureEnhancements}
          </CaseBlock>
        </div>

        <footer className="mt-6 border-t border-zinc-800/80 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <FiExternalLink size={17} aria-hidden />
              Live environment
            </a>
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:shrink-0"
            >
              <FiGithub size={17} aria-hidden />
              Source code
            </a>
          </div>
        </footer>
      </div>
    </article>
  );
}
