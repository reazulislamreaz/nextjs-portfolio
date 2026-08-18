"use client";

import { useMemo, useState } from "react";
import { FiChevronDown, FiGrid, FiList } from "react-icons/fi";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import { projectsData } from "./projectsData";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";

const INITIAL_VISIBLE = 4;

export default function ProjectsSection() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const visibleProjects = useMemo(
    () =>
      showAllProjects ? projectsData : projectsData.slice(0, INITIAL_VISIBLE),
    [showAllProjects]
  );

  const hasMore = projectsData.length > INITIAL_VISIBLE;

  const containerRef = useGsapScroll<HTMLDivElement>(
    (_, isReduced) => {
      if (isReduced) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      if (!cards.length) return;

      // Animate project cards into view with smooth stagger
      gsap.fromTo(
        cards,
        { y: 35, opacity: 0, scale: 0.97 },
        {
          scrollTrigger: {
            trigger: "[data-projects-grid]",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    },
    [layout, showAllProjects]
  );

  return (
    <Section id="projects" className="bg-zinc-950/20">
      <div ref={containerRef}>
        <SectionHeader
          title="Featured Projects"
          subtitle="Production architectures, distributed services, and high-performance applications."
        />

        {/* Layout toggle & Recruiter Metrics Pill */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 live-beacon" />
            <span>SHOWING {visibleProjects.length} OF {projectsData.length} SYSTEMS</span>
          </div>

          <div className="inline-flex items-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                layout === "grid"
                  ? "bg-zinc-800 text-zinc-50 font-semibold"
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
                  ? "bg-zinc-800 text-zinc-50 font-semibold"
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
          data-projects-grid
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
                index={index}
              />
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center sm:mt-14">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-8 py-2.5 text-sm font-semibold text-zinc-200 shadow-lg backdrop-blur-md transition hover:border-zinc-500 hover:bg-zinc-850 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              aria-expanded={showAllProjects}
            >
              {showAllProjects ? "Show Less Projects" : "Explore More Projects"}
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
    </Section>
  );
}
