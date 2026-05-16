import type { ReactNode } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "./projectsData";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  priorityImage?: boolean;
  titleAccent?: "emerald" | "white";
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
    <div className="border-t border-zinc-800/70 pt-5">
      <h4
        className={`mb-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
          muted ? "text-zinc-500" : "text-emerald-400"
        }`}
      >
        {label}
      </h4>
      <p className="text-sm leading-relaxed text-zinc-400">{children}</p>
    </div>
  );
}

export default function ProjectCard({
  project,
  priorityImage = false,
  titleAccent = "emerald",
}: ProjectCardProps) {
  const slug = project.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      id={`project-${slug}`}
      className="group/card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#111827] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:shadow-2xl hover:shadow-emerald-950/10 sm:rounded-3xl"
      aria-labelledby={`${slug}-title`}
    >
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <ProjectCarousel
          images={project.images}
          title={project.title}
          priority={priorityImage}
          className="h-60 sm:h-64 md:h-72 lg:h-[300px]"
          compact
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <header className="space-y-3">
          <h3
            id={`${slug}-title`}
            className={`text-2xl font-bold tracking-tight sm:text-[1.65rem] ${
              titleAccent === "emerald" ? "text-emerald-400" : "text-white"
            }`}
          >
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
            {project.description}
          </p>
        </header>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.features.map((feature) => (
            <li key={feature}>
              <span className="inline-block rounded-md border border-zinc-700/90 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-300">
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

        <footer className="mt-6 border-t border-zinc-800/70 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
            >
              <FiExternalLink size={17} aria-hidden />
              Live environment
            </a>
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-600 bg-transparent px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-400 hover:bg-zinc-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827] sm:shrink-0"
            >
              <FiGithub size={17} aria-hidden />
              Source code
            </a>
          </div>
          {/* {project.sourceNote ? (
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              {project.sourceNote}
            </p>
          ) : null} */}
        </footer>
      </div>
    </article>
  );
}
