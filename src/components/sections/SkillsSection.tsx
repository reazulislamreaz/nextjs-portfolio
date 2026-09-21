"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import TechMarquee from "@/components/ui/TechMarquee";
import { showcaseTech, type TechItem } from "@/components/ui/tech";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap, isReducedMotion } from "@/lib/gsap";

interface TechGroup {
  id: string;
  label: string;
  summary: string;
  names: string[];
}

const groups: TechGroup[] = [
  {
    id: "backend",
    label: "Backend",
    summary:
      "The core of the work: NestJS and Express APIs, typed contracts, Socket.IO, and server-side payment flows.",
    names: ["Node.js", "NestJS", "Express", "TypeScript", "GraphQL", "Go", "Socket.IO", "Stripe"],
  },
  {
    id: "frontend",
    label: "Frontend",
    summary:
      "The interface when the same product needs one — Next.js and React, kept in step with the API.",
    names: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    id: "database",
    label: "Database",
    summary:
      "PostgreSQL and Prisma for relational models. MongoDB when the data is document-shaped. Redis for hot reads.",
    names: ["PostgreSQL", "Prisma", "MongoDB", "MySQL", "Redis"],
  },
  {
    id: "devops",
    label: "DevOps",
    summary:
      "Containers, cloud storage, and the pipelines that ship the API and the storefront.",
    names: ["Docker", "AWS", "GitHub Actions", "Nginx"],
  },
];

const byName = new Map(showcaseTech.map((item) => [item.name, item]));

function toolsFor(names: string[]): TechItem[] {
  return names
    .map((name) => byName.get(name))
    .filter((item): item is TechItem => Boolean(item));
}

const rowA = showcaseTech.slice(0, 10);
const rowB = showcaseTech.slice(10);

export default function Skills() {
  const [activeId, setActiveId] = useState(groups[0].id);
  const active = groups.find((group) => group.id === activeId) ?? groups[0];
  const tools = toolsFor(active.names);

  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const panelRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const skipPanelAnim = useRef(true);

  const indicatorReady = useRef(false);

  const syncIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    const tab = tabRefs.current.get(activeId);
    if (!indicator || !tab) return;

    const reduced = isReducedMotion();
    const instant = reduced || !indicatorReady.current;
    indicatorReady.current = true;

    gsap.to(indicator, {
      x: tab.offsetLeft,
      y: tab.offsetTop,
      width: tab.offsetWidth,
      height: tab.offsetHeight,
      duration: instant ? 0 : 0.28,
      ease: "power2.out",
      overwrite: true,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    syncIndicator();
  }, [syncIndicator, tools.length]);

  useEffect(() => {
    const list = tabListRef.current;
    if (!list) return;

    const onResize = () => syncIndicator();
    window.addEventListener("resize", onResize);

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    ro?.observe(list);

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [syncIndicator]);

  const containerRef = useGsapScroll<HTMLDivElement>((_, reduced) => {
    if (reduced) return;

    gsap.fromTo(
      "[data-skills-chrome]",
      { y: 16, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-skills-board]",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          // First paint is handled by scroll; later tab switches animate the panel.
          skipPanelAnim.current = false;
        },
      },
    );

    gsap.fromTo(
      "[data-skill-item]",
      { y: 10, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-skills-board]",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.045,
        duration: 0.35,
        delay: 0.12,
        ease: "power2.out",
      },
    );
  });

  useEffect(() => {
    if (skipPanelAnim.current) return;

    const panel = panelRef.current;
    if (!panel) return;

    if (isReducedMotion()) {
      gsap.set(panel.querySelectorAll("[data-skill-summary], [data-skill-item]"), {
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-skill-summary]",
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        "[data-skill-item]",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.32,
          ease: "power2.out",
        },
      );
    }, panel);

    return () => ctx.revert();
  }, [activeId]);

  return (
    <Section id="skills" className="overflow-hidden border-y border-zinc-700/60 bg-zinc-900/40">
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="Expertise"
          title="What the systems are made of"
          subtitle="Backend first, then the interface, the database, and the deploy path."
        />

        <div className="mb-8 space-y-2.5 sm:mb-10">
          <TechMarquee items={rowA} label="Primary technologies" duration="40s" />
          <TechMarquee
            items={rowB}
            reverse
            label="Infrastructure and integrations"
            duration="48s"
          />
        </div>

        <div data-skills-board>
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Engineering areas"
            data-skills-chrome
            className="relative flex gap-1.5 overflow-x-auto pb-1"
          >
            <span
              ref={indicatorRef}
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 z-0 rounded-md bg-zinc-50 will-change-transform"
              style={{ width: 0, height: 0 }}
            />
            {groups.map((group) => {
              const selected = group.id === active.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  id={`tech-tab-${group.id}`}
                  aria-selected={selected}
                  aria-controls="tech-panel"
                  ref={(node) => {
                    if (node) tabRefs.current.set(group.id, node);
                    else tabRefs.current.delete(group.id);
                  }}
                  onClick={() => setActiveId(group.id)}
                  className={`relative z-10 shrink-0 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    selected
                      ? "text-zinc-950"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            role="tabpanel"
            id="tech-panel"
            data-skills-chrome
            aria-labelledby={`tech-tab-${active.id}`}
            className="surface-card mt-4 rounded-lg p-5 sm:mt-5 sm:p-6"
          >
            <p
              data-skill-summary
              className="type-body max-w-2xl text-pretty"
            >
              {active.summary}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4">
              {tools.map((tech) => {
                const Icon = tech.icon;
                return (
                  <li key={tech.name} data-skill-item>
                    <div className="group flex h-full items-center gap-2.5 rounded-md bg-zinc-800/60 px-3 py-2.5 transition-[background-color,transform] duration-200 ease-out will-change-transform motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-zinc-800 motion-reduce:transition-colors">
                      <Icon
                        className="shrink-0 text-base text-emerald-400 transition-transform duration-200 ease-out motion-safe:group-hover:scale-110"
                        aria-hidden
                      />
                      <span className="text-sm font-medium text-zinc-100">
                        {tech.name}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
