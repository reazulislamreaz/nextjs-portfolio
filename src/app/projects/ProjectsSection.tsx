"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Section from "../components/ui/Section";
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
    <Section id="projects" className="bg-zinc-950/20">
      <SectionHeader
        title="Selected systems"
        subtitle="Scan the highlights first — open a case study for architecture, challenges, and metrics."
      />

      <div
        className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12"
        role="list"
        aria-label="Portfolio projects"
      >
        {visibleProjects.map((project, index) => (
          <div key={project.title} role="listitem" className="min-w-0">
            <ProjectCard project={project} priorityImage={index < 2} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center sm:mt-14">
          <button
            type="button"
            onClick={() => setShowAllProjects((prev) => !prev)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-8 py-2.5 text-sm font-semibold text-zinc-300 shadow-lg backdrop-blur-md transition hover:border-emerald-500/40 hover:bg-zinc-900/80 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
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
