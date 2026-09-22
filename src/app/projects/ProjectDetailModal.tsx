"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import type { Project } from "./projectsData";
import { presentProject } from "./projectPresentation";
import ProjectCarousel from "./ProjectCarousel";
import { iconForTech } from "@/components/ui/tech";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

function StoryBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-zinc-700/60 pt-5">
      <h4 className="type-label text-emerald-400">{label}</h4>
      <div className="type-body mt-2 text-zinc-300">{children}</div>
    </section>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const rafId = requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus({ preventScroll: true });
    };
  }, [mounted, onClose, project.title]);

  if (!mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center overscroll-none p-0 sm:items-center sm:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md dark:bg-black/80"
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-enter relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-xl flex-col overflow-hidden rounded-t-lg border border-zinc-700 bg-zinc-950 text-zinc-100 shadow-xl sm:max-w-2xl sm:rounded-lg lg:max-w-4xl"
      >
        <header className="relative shrink-0 border-b border-zinc-700/80 bg-zinc-900 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1.5">
              <p className="type-eyebrow">Case study</p>
              <h3
                id={titleId}
                className="font-display text-xl tracking-tight text-zinc-50 sm:text-2xl"
              >
                {project.title}
              </h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="icon-btn shrink-0 border border-zinc-700"
              aria-label={`Close ${project.title} case study`}
            >
              <FiX size={18} aria-hidden />
            </button>
          </div>
        </header>

        <div
          ref={scrollContainerRef}
          className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6"
        >
          <div className="overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-900">
            <ProjectCarousel
              images={project.images}
              title={project.title}
              showThumbs={false}
              autoplay={false}
              sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) min(672px, calc(100vw - 3.5rem)), min(896px, 90vw)"
            />
          </div>

          <ModalBody project={project} />
        </div>

        <footer className="shrink-0 border-t border-zinc-700/80 bg-zinc-900/95 px-5 py-4 sm:px-7">
          <ModalFooter project={project} />
        </footer>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ModalFooter({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex-1"
      >
        <FiExternalLink size={15} aria-hidden />
        Live project
      </a>
      <a
        href={project.code}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary sm:flex-initial"
      >
        <FiGithub size={15} aria-hidden />
        View on GitHub
      </a>
    </div>
  );
}

function ModalBody({ project }: { project: Project }) {
  const presentation = presentProject(project);

  return (
    <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        <p className="type-eyebrow">
          {presentation.kind} · {presentation.role}
        </p>
        <p className="type-meta mt-2 text-emerald-400/90">
          {presentation.architectureLine}
        </p>

        <StoryBlock label="Problem">{project.problem}</StoryBlock>
        <StoryBlock label="Architecture">{project.architecture}</StoryBlock>

        <StoryBlock label="Decisions">
          <ul className="space-y-4">
            {project.challengeSolutions.map((item) => (
              <li key={item.challenge}>
                <p className="font-medium text-zinc-100">{item.challenge}</p>
                <p className="mt-1 text-zinc-400">{item.solution}</p>
              </li>
            ))}
          </ul>
        </StoryBlock>
      </div>

      <div className="mt-5 lg:col-span-5 lg:mt-0">
        <StoryBlock label="What shipped">{project.description}</StoryBlock>

        <StoryBlock label="In production">
          <ul className="space-y-2">
            {project.metrics.map((metric) => (
              <li key={metric} className="flex gap-2.5">
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/80"
                  aria-hidden
                />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </StoryBlock>

        <StoryBlock label="Stack">
          <ul className="flex flex-wrap gap-1.5">
            {project.features.map((feature) => {
              const Icon = iconForTech(feature);
              return (
                <li key={feature}>
                  <span className="badge-tech">
                    {Icon ? (
                      <Icon className="text-sm text-emerald-400" aria-hidden />
                    ) : null}
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </StoryBlock>

        <StoryBlock label="Where it runs">
          <p>{project.devOps.join(" · ")}</p>
        </StoryBlock>

        <StoryBlock label="Next">
          <p className="text-zinc-400">{project.futureEnhancements}</p>
        </StoryBlock>

        {project.sourceNote ? (
          <p className="type-meta mt-5 leading-relaxed">{project.sourceNote}</p>
        ) : null}
      </div>
    </div>
  );
}
