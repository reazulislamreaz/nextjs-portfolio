"use client";

import { useState } from "react";
import type { Project } from "./projectsData";
import { presentProject } from "./projectPresentation";
import ProjectCarousel from "./ProjectCarousel";
import ProjectDetailModal from "./ProjectDetailModal";
import { ArrowUpRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { iconForTech } from "@/components/ui/tech";

const STACK_LIMIT = 5;

interface ProjectCardProps {
  project: Project;
  priorityImage?: boolean;
  index?: number;
}

export default function ProjectCard({
  project,
  priorityImage = false,
  index = 0,
}: ProjectCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const slug = project.title.toLowerCase().replace(/\s+/g, "-");
  const presentation = presentProject(project);
  const imageOnRight = index % 2 === 1;
  const visibleStack = project.features.slice(0, STACK_LIMIT);
  const hiddenStackCount = project.features.length - visibleStack.length;
  const highlights = project.metrics.slice(0, 2);

  return (
    <>
      <article
        id={`project-${slug}`}
        data-project-card
        className="grid items-center gap-8 border-b border-zinc-700/50 py-12 last:border-b-0 sm:gap-10 sm:py-14 lg:grid-cols-12 lg:gap-x-12 lg:py-16 xl:gap-x-14"
        aria-labelledby={`${slug}-title`}
      >
        <div
          className={`group/visual min-w-0 lg:col-span-7 ${
            imageOnRight ? "lg:order-2" : ""
          }`}
        >
          <div className="overflow-hidden rounded-lg border border-zinc-700/40 bg-zinc-800 transition duration-500 ease-out group-hover/visual:-translate-y-0.5">
            <ProjectCarousel
              images={project.images}
              title={project.title}
              priority={priorityImage}
              showThumbs={project.images.length > 1}
            />
          </div>
        </div>

        <div
          className={`min-w-0 lg:col-span-5 ${imageOnRight ? "lg:order-1" : ""}`}
        >
          <p className="type-eyebrow">
            {String(index + 1).padStart(2, "0")} · {presentation.kind}
          </p>
          <h3 id={`${slug}-title`} className="type-card-title mt-2.5">
            {project.title}
          </h3>
          <p className="type-body mt-3 line-clamp-3 max-w-md text-pretty">
            {project.tagline}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {visibleStack.map((feature) => {
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
            {hiddenStackCount > 0 ? (
              <li>
                <span className="badge-tech text-zinc-500">
                  +{hiddenStackCount}
                </span>
              </li>
            ) : null}
          </ul>

          {highlights.length > 0 ? (
            <ul className="mt-5 max-w-md space-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-zinc-500"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/80"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group/cta"
            >
              View project
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                aria-hidden
              />
            </a>
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <FiGithub size={14} aria-hidden />
              Source
            </a>
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="btn-accent"
            >
              Case study
            </button>
          </div>
        </div>
      </article>

      {detailsOpen ? (
        <ProjectDetailModal
          project={project}
          onClose={() => setDetailsOpen(false)}
        />
      ) : null}
    </>
  );
}
