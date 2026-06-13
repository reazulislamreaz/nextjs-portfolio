"use client";

import { useEffect, useId, useRef } from "react";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import type { Project } from "./projectsData";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-emerald-500/90">
      {children}
    </h4>
  );
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90vh,780px)] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl border border-zinc-800/90 bg-zinc-950 shadow-2xl shadow-black/50 sm:max-w-2xl lg:max-w-3xl sm:rounded-3xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-800/80 px-5 py-4 sm:px-6 sm:py-5">
          <h3
            id={titleId}
            className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl"
          >
            {project.title}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer min-h-10 min-w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={`Close ${project.title} case study`}
          >
            <FiX size={20} aria-hidden />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
          <ProjectCarousel
            images={project.images}
            title={project.title}
            className="aspect-[16/10]"
          />
          <ModalBody project={project} />
        </div>

        <footer className="shrink-0 border-t border-zinc-800/80 px-5 py-4 sm:px-6">
          <ModalFooter project={project} />
        </footer>
      </div>
    </div>
  );
}

function ModalFooter({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <FiExternalLink size={17} aria-hidden />
        See live demo
      </a>
      <a
        href={project.code}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:flex-initial"
      >
        <FiGithub size={17} aria-hidden />
        View on GitHub
      </a>
    </div>
  );
}

function ModalBody({ project }: { project: Project }) {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <SectionLabel>Overview</SectionLabel>
        <p className="text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
          {project.description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
          <span className="font-medium text-zinc-300">Problem: </span>
          {project.problem}
        </p>
      </section>

      <section>
        <SectionLabel>Architecture</SectionLabel>
        <p className="text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-7">
          {project.architecture}
        </p>
      </section>

      <section>
        <SectionLabel>Challenges</SectionLabel>
        <ul className="space-y-4">
          {project.challengeSolutions.map((item) => (
            <li
              key={item.challenge}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4"
            >
              <p className="text-sm font-medium text-zinc-200">
                {item.challenge}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                <span className="text-emerald-500/90">→ </span>
                {item.solution}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel>Impact</SectionLabel>
        <ul className="space-y-2.5">
          {project.metrics.map((metric) => (
            <li key={metric} className="flex gap-2.5 text-sm text-zinc-400">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/90"
                aria-hidden
              />
              <span>{metric}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel>Tech stack</SectionLabel>
        <ul className="flex flex-wrap gap-2">
          {project.features.map((feature) => (
            <li key={feature}>
              <span className="rounded-lg border border-zinc-700/80 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 sm:text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel>Deploy</SectionLabel>
        <ul className="flex flex-wrap gap-2">
          {project.devOps.map((item) => (
            <li key={item}>
              <span className="rounded-md border border-zinc-700/60 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel>Roadmap</SectionLabel>
        <p className="text-sm leading-relaxed text-zinc-500 sm:text-[0.9375rem] sm:leading-7">
          {project.futureEnhancements}
        </p>
      </section>

      {project.sourceNote && (
        <p className="text-xs leading-relaxed text-zinc-500">
          {project.sourceNote}
        </p>
      )}
    </div>
  );
}
