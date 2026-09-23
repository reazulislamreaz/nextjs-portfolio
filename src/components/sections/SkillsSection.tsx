"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { iconForTech } from "@/components/ui/tech";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";

interface SkillGroup {
  id: string;
  label: string;
  summary: string;
  tools: string[];
}

/**
 * Categories prioritize backend production work.
 * Frontend and tooling support full-stack delivery without stealing focus.
 */
const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    label: "Backend Engineering",
    summary:
      "APIs, auth, validation, and service boundaries — the core of how I ship production systems.",
    tools: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "Express.js",
      "REST APIs",
      "JWT",
      "RBAC",
      "Zod",
      "GraphQL",
      "Go",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    summary:
      "Relational and document modeling, ORMs, indexing, and integrity under concurrent writes.",
    tools: [
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Mongoose",
      "MySQL",
      "Redis",
    ],
  },
  {
    id: "async",
    label: "Distributed / Async Systems",
    summary:
      "Background work off the request path — queues, workers, and cache for recovery and heavy jobs.",
    tools: ["BullMQ", "Redis"],
  },
  {
    id: "realtime",
    label: "Real-Time Systems",
    summary:
      "Event-scoped sync, presence, and low-latency channels without racing domain writes.",
    tools: ["Socket.IO", "WebRTC"],
  },
  {
    id: "frontend",
    label: "Frontend",
    summary:
      "Storefronts, dashboards, and operator UIs kept thin on business rules.",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Redux Toolkit",
      "Zustand",
      "Vite",
    ],
  },
  {
    id: "devops",
    label: "DevOps / Infrastructure",
    summary:
      "Containers, cloud delivery, reverse proxies, and the APIs products depend on.",
    tools: [
      "Docker",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "Nginx",
      "Linux",
      "Swagger/OpenAPI",
      "Postman",
      "Git",
      "Stripe",
    ],
  },
];

export default function Skills() {
  const containerRef = useGsapScroll<HTMLDivElement>((_, reduced) => {
    if (reduced) return;

    gsap.fromTo(
      "[data-skill-group]",
      { y: 18, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  });

  return (
    <Section
      id="skills"
      className="overflow-hidden border-y border-zinc-700/60 bg-zinc-900/40"
    >
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="Expertise"
          title="What the systems are made of"
          subtitle="Backend first — then data, async work, realtime, interface, and delivery."
        />

        <div className="space-y-0">
          {skillGroups.map((group, index) => (
            <section
              key={group.id}
              data-skill-group
              aria-labelledby={`skill-group-${group.id}`}
              className="grid grid-cols-1 gap-3.5 border-t border-zinc-700/50 py-6 sm:grid-cols-12 sm:gap-6 sm:py-7 lg:gap-10"
            >
              <div className="sm:col-span-5 lg:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="type-meta text-emerald-400/90" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    id={`skill-group-${group.id}`}
                    className="text-[0.9375rem] font-medium tracking-tight text-zinc-50 sm:text-base"
                  >
                    {group.label}
                  </h3>
                </div>
                <p className="type-body mt-2 max-w-sm text-pretty text-[0.875rem]">
                  {group.summary}
                </p>
              </div>

              <ul
                className="flex flex-wrap gap-2 sm:col-span-7 lg:col-span-8 lg:content-start"
                aria-label={`${group.label} technologies`}
              >
                {group.tools.map((name) => {
                  const Icon = iconForTech(name);
                  return (
                    <li key={name}>
                      <span className="badge-tech px-2.5 py-1.5 transition-[background-color,transform] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-zinc-800">
                        {Icon ? (
                          <Icon
                            className="text-sm text-emerald-400"
                            aria-hidden
                          />
                        ) : null}
                        <span>{name}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
