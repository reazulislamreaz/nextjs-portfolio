"use client";

import { useMemo, useState } from "react";
import { FiChevronDown, FiGrid, FiList } from "react-icons/fi";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import { projectsData } from "./projectsData";

const INITIAL_VISIBLE = 4;

export default function ProjectsSection() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const visibleProjects = useMemo(
    () =>
      showAllProjects ? projectsData : projectsData.slice(0, INITIAL_VISIBLE),
    [showAllProjects],
  );

  const hasMore = projectsData.length > INITIAL_VISIBLE;

  return (
    <Section id="projects" className="bg-zinc-950/20">
      <SectionHeader
        title="Projects"
        subtitle="Highlights first — open a case study for architecture and metrics."
      />

      {/* Layout toggle */}
      <div className="mb-8 flex justify-end">
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
              layout === "grid"
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
            }`}
            aria-label="Grid view — two columns"
            aria-pressed={layout === "grid"}
          >
            <FiGrid size={15} />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <span className="h-5 w-px bg-zinc-700/60" aria-hidden />

          <button
            type="button"
            onClick={() => setLayout("list")}
            className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
              layout === "list"
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
            }`}
            aria-label="List view — single column"
            aria-pressed={layout === "list"}
          >
            <FiList size={15} />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      <div
        className={`grid items-stretch gap-8 transition-all duration-300 ${
          layout === "grid"
            ? "grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:gap-12"
            : "grid-cols-1 gap-6"
        }`}
        role="list"
        aria-label="Portfolio projects"
      >
        {visibleProjects.map((project, index) => (
          <div key={project.title} role="listitem" className="min-w-0">
            <ProjectCard
              project={project}
              priorityImage={index < 2}
              layout={layout}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center sm:mt-14">
          <button
            type="button"
            onClick={() => setShowAllProjects((prev) => !prev)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-8 py-2.5 text-sm font-semibold text-zinc-300 shadow-lg backdrop-blur-md transition hover:border-emerald-500/40 hover:bg-zinc-900/80 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            aria-expanded={showAllProjects}
          >
            {showAllProjects ? "Show Less" : "See More"}
            <FiChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                showAllProjects ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
        </div>
      )}
    </Section>
  );
}
