import type { ReactNode } from "react";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionLink from "@/app/components/SectionLink";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { SiNginx, SiRedis, SiSocketdotio } from "react-icons/si";
import { TbLock } from "react-icons/tb";

interface ArchitecturePillar {
  title: string;
  icon: ReactNode;
  iconColor: string;
  projects: string;
  items: string[];
}

const flowSteps = [
  "Client",
  "Nginx / LB",
  "API layer",
  "PostgreSQL / MongoDB",
] as const;

const pillars: ArchitecturePillar[] = [
  {
    title: "Traffic & platform",
    icon: <SiNginx />,
    iconColor: "text-green-500",
    projects: "J&K Cabinetry, Confaero",
    items: [
      "Vertical load balancer with Nginx reverse proxy for API routing",
      "Versioned REST APIs with Express and NestJS",
      "Clear service boundaries as products grow",
    ],
  },
  {
    title: "Data & async",
    icon: <SiRedis />,
    iconColor: "text-red-400",
    projects: "Connectify, Replii, Confaero",
    items: [
      "Redis caching and Socket.IO multi-instance scaling",
      "BullMQ background workers for async jobs",
      "PostgreSQL and MongoDB indexing on hot paths",
    ],
  },
  {
    title: "Safety & payments",
    icon: <TbLock />,
    iconColor: "text-purple-400",
    projects: "HavenKeys, J&K Cabinetry, TaskForge",
    items: [
      "JWT auth with role-based access control",
      "Rate limiting and guarded API surfaces",
      "Idempotent Stripe and webhook handling",
    ],
  },
  {
    title: "Realtime & integrations",
    icon: <SiSocketdotio />,
    iconColor: "text-zinc-200",
    projects: "Connectify, Replii, J&K Cabinetry",
    items: [
      "Socket.IO messaging with scoped room broadcasts",
      "S3 media upload pipelines",
      "RAG replies and third-party API integrations",
    ],
  },
];

function ArchitectureFlow() {
  return (
    <div
      className="mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 shadow-lg backdrop-blur-md sm:mb-10 sm:rounded-3xl sm:p-6"
      aria-label="Typical production backend flow"
    >
      <p className="mb-4 text-center text-[0.65rem] font-bold uppercase tracking-[0.14em] text-emerald-500/90 sm:mb-5">
        Typical production flow
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {flowSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-2 sm:gap-2.5">
            <span className="rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-1.5 text-xs font-medium text-zinc-200 sm:px-3 sm:text-sm">
              {step}
            </span>
            {index < flowSteps.length - 1 && (
              <FiArrowRight
                className="hidden shrink-0 text-zinc-600 sm:block"
                size={14}
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 sm:mt-5">
        <span className="text-zinc-600" aria-hidden>
          ↓
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1.5 text-xs font-medium text-cyan-300 sm:text-sm">
            <SiRedis className="shrink-0" size={14} aria-hidden />
            Redis / Queue
          </span>
          <FiArrowRight className="shrink-0 text-zinc-600" size={14} aria-hidden />
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-1.5 text-xs font-medium text-zinc-300 sm:text-sm">
            <HiOutlineQueueList className="shrink-0" size={14} aria-hidden />
            Workers / Webhooks
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SystemArchitecture() {
  return (
    <Section id="system-architecture" className="bg-zinc-950/50">
      <SectionHeader
        title="Architecture & scale"
        subtitle="Production patterns from APIs I've shipped — traffic routing, data layers, and safe integrations."
      />

      <ArchitectureFlow />

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-5 shadow-lg backdrop-blur-md sm:rounded-3xl sm:p-7 md:p-8"
          >
            <div className="mb-4 flex items-start gap-3 border-b border-zinc-800 pb-3 sm:mb-5 sm:pb-4">
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/80 text-lg ${pillar.iconColor}`}
                aria-hidden
              >
                {pillar.icon}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-base font-semibold tracking-tight text-zinc-50 sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  Shipped on{" "}
                  <span className="text-zinc-400">{pillar.projects}</span>
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-[0.95rem]">
              {pillar.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/90"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <SectionLink
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          See implementations in Projects
          <FiArrowRight size={16} aria-hidden />
        </SectionLink>
      </div>
    </Section>
  );
}
