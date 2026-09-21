"use client";

import { useState } from "react";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import TechMarquee from "@/components/ui/TechMarquee";
import { showcaseTech, type TechItem } from "@/components/ui/tech";

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

  return (
    <Section id="skills" className="overflow-hidden border-y border-zinc-700/60 bg-zinc-900/40">
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

      <div
        role="tablist"
        aria-label="Engineering areas"
        className="flex gap-1.5 overflow-x-auto pb-1"
      >
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
              onClick={() => setActiveId(group.id)}
              className={`shrink-0 rounded-md px-3.5 py-2 text-sm font-medium transition ${
                selected
                  ? "bg-zinc-50 text-zinc-950"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="tech-panel"
        aria-labelledby={`tech-tab-${active.id}`}
        className="surface-card mt-4 rounded-lg p-5 sm:mt-5 sm:p-6"
      >
        <p className="type-body max-w-2xl text-pretty">{active.summary}</p>
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4">
          {tools.map((tech) => {
            const Icon = tech.icon;
            return (
              <li key={tech.name}>
                <div className="flex h-full items-center gap-2.5 rounded-md bg-zinc-800/60 px-3 py-2.5 transition hover:bg-zinc-800">
                  <Icon className="shrink-0 text-base text-emerald-400" aria-hidden />
                  <span className="text-sm font-medium text-zinc-100">
                    {tech.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
