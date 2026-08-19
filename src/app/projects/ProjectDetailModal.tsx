"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiActivity,
  FiBox,
  FiCheck,
  FiCpu,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiMap,
  FiServer,
  FiTarget,
  FiX,
  FiZap,
} from "react-icons/fi";
import type { Project } from "./projectsData";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3.5 flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
        <Icon size={14} className="text-emerald-500" />
      </div>
      <h4 className="text-[0.725rem] font-bold uppercase tracking-[0.14em] text-emerald-500">
        {children}
      </h4>
    </div>
  );
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Pause Lenis smooth scrolling for the background
    window.__lenis?.stop();

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Reset internal scroll position to top
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const rafId = requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    });

    closeButtonRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      // Resume Lenis smooth scrolling for the background
      window.__lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, onClose, project.title]);

  if (!mounted) return null;

  const modalContent = (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-end justify-center p-0 sm:items-center sm:p-4 overscroll-none"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md dark:bg-black/80"
        aria-hidden
      />

      {/* Modal Dialog */}
      <div
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-enter relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl border border-zinc-800/80 bg-zinc-950 text-zinc-100 shadow-2xl sm:max-w-2xl sm:rounded-3xl lg:max-w-4xl"
      >
        {/* Header */}
        <header className="relative shrink-0 border-b border-zinc-800/80 bg-zinc-900 px-5 py-4 sm:px-7 sm:py-5">
          {/* Top accent bar */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-500">
                  <FiLayers size={11} className="shrink-0" />
                  Case Study
                </span>
              </div>
              <h3
                id={titleId}
                className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl"
              >
                {project.title}
              </h3>
              <p className="line-clamp-1 text-xs font-medium text-zinc-400 sm:text-sm">
                {project.tagline}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex min-h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/80 text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={`Close ${project.title} case study`}
            >
              <FiX size={18} aria-hidden />
            </button>
          </div>
        </header>

        {/* Scrollable Body */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6 touch-pan-y"
        >
          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-md">
            <ProjectCarousel
              images={project.images}
              title={project.title}
              className="aspect-[16/10]"
            />
          </div>

          <ModalBody project={project} />
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-zinc-800/80 bg-zinc-900/90 px-5 py-4 backdrop-blur-sm sm:px-7">
          <ModalFooter project={project} />
        </footer>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ModalFooter({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-50 px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-md transition hover:bg-zinc-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <FiExternalLink size={17} aria-hidden />
        <span>See live demo</span>
      </a>
      <a
        href={project.code}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-850 hover:text-zinc-50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:flex-initial"
      >
        <FiGithub size={17} aria-hidden />
        <span>View on GitHub</span>
      </a>
    </div>
  );
}

function ModalBody({ project }: { project: Project }) {
  return (
    <div className="mt-6 space-y-6">
      {/* Overview & Problem */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md shadow-sm">
        <SectionLabel icon={FiTarget}>Overview</SectionLabel>
        <p className="text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
          {project.description}
        </p>
        <div className="mt-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 px-4 py-3">
          <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm sm:leading-6">
            <span className="font-bold text-emerald-500">Problem Statement: </span>
            {project.problem}
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md shadow-sm">
        <SectionLabel icon={FiCpu}>Architecture & Design</SectionLabel>
        <p className="text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
          {project.architecture}
        </p>
      </section>

      {/* Impact & Key Metrics */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md shadow-sm">
        <SectionLabel icon={FiActivity}>Impact & Metrics</SectionLabel>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <li
              key={metric}
              className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-3.5 text-xs font-medium text-zinc-300 sm:text-sm"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                <FiCheck size={11} />
              </span>
              <span className="leading-snug">{metric}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges & Solutions */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md shadow-sm">
        <SectionLabel icon={FiZap}>Key Challenges & Solutions</SectionLabel>
        <ul className="space-y-3">
          {project.challengeSolutions.map((item, idx) => (
            <li
              key={item.challenge}
              className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-xs font-bold text-emerald-500">
                  {idx + 1}
                </span>
                <div className="min-w-0 space-y-1.5">
                  <p className="text-sm font-semibold text-zinc-100">
                    {item.challenge}
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm sm:leading-6">
                    <span className="font-semibold text-emerald-500">Solution: </span>
                    {item.solution}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Tech Stack & DevOps Pipeline */}
      <div className="grid gap-5 sm:grid-cols-2">
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md shadow-sm">
          <SectionLabel icon={FiBox}>Tech Stack</SectionLabel>
          <ul className="flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <li key={feature}>
                <span className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 px-3 py-1.5 text-xs font-medium text-zinc-200">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md shadow-sm">
          <SectionLabel icon={FiServer}>DevOps & Deploy</SectionLabel>
          <ul className="flex flex-wrap gap-2">
            {project.devOps.map((item) => (
              <li key={item}>
                <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Future Roadmap */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md shadow-sm">
        <SectionLabel icon={FiMap}>Future Roadmap</SectionLabel>
        <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm sm:leading-6">
          {project.futureEnhancements}
        </p>
      </section>

      {/* Source Note */}
      {project.sourceNote && (
        <p className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 px-4 py-3 text-xs leading-relaxed text-zinc-400">
          {project.sourceNote}
        </p>
      )}
    </div>
  );
}
