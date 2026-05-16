"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import { projectsData } from "./projectsData";

const INITIAL_VISIBLE = 4;

export default function ProjectsSection() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = useMemo(
    () =>
      showAllProjects ? projectsData : projectsData.slice(0, INITIAL_VISIBLE),
    [showAllProjects],
  );

  const hasMore = projectsData.length > INITIAL_VISIBLE;

  return (
    <div
      id="projects"
      className="relative z-10 scroll-mt-24 bg-[#0B0F14] sm:scroll-mt-28"
    >
      <header className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <SectionHeader
          title="Selected systems"
          subtitle="Premium case studies — two builds per row on desktop, full problem-to-solution narrative on each card."
        />
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div
          className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12"
          role="list"
          aria-label="Portfolio projects"
        >
          {visibleProjects.map((project, index) => (
            <div key={project.title} role="listitem" className="min-w-0">
              <ProjectCard
                project={project}
                priorityImage={index < 2}
                titleAccent={index % 2 === 0 ? "emerald" : "white"}
              />
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center sm:mt-14">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-zinc-700 bg-[#111827] px-8 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/50 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
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
      </div>
    </div>
  );
}
