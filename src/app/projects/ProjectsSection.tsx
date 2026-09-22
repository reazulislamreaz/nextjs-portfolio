"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import { presentProject } from "./projectPresentation";
import { projectsData } from "./projectsData";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  const featured = useMemo(
    () => projectsData.filter((project) => presentProject(project).featured),
    [],
  );
  const more = useMemo(
    () => projectsData.filter((project) => !presentProject(project).featured),
    [],
  );

  const containerRef = useGsapScroll<HTMLDivElement>(
    (_, isReduced) => {
      if (isReduced) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0 },
        {
          scrollTrigger: {
            trigger: "[data-projects-list]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    },
    [showAll],
  );

  return (
    <Section id="projects">
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="Work"
          title="Products, then the engineering underneath"
          subtitle="Featured systems in production — open a case study for architecture and decisions."
        />

        <div data-projects-list id="projects-list">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
          {showAll
            ? more.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={featured.length + index}
                />
              ))
            : null}
        </div>

        {more.length > 0 ? (
          <div className="mt-10 flex justify-center sm:mt-12">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="btn-secondary"
              aria-expanded={showAll}
              aria-controls="projects-list"
            >
              {showAll ? "Show featured only" : `More work · ${more.length}`}
              <FiChevronDown
                size={16}
                className={`transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
