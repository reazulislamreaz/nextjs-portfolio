"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionLink from "@/app/components/SectionLink";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import {
  Code2,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
  Server,
  Workflow,
} from "lucide-react";

const engineeringTenets = [
  {
    icon: <Code2 className="text-zinc-100" size={20} />,
    title: "API-First Contracts & Schema Integrity",
    description:
      "Type-safe boundary validation with strict DTOs and Zod/Prisma models, ensuring clients consume predictable, resilient, and versioned interfaces.",
    tag: "Type Safety",
  },
  {
    icon: <Database className="text-zinc-100" size={20} />,
    title: "ACID Transactions & Robust Modeling",
    description:
      "Disciplined relational schema modeling in PostgreSQL with index optimization and transactions, paired with MongoDB pipelines for document workloads.",
    tag: "Data Integrity",
  },
  {
    icon: <Zap className="text-zinc-100" size={20} />,
    title: "Sub-Millisecond Cache & Async Relays",
    description:
      "Layered Redis caching, distributed session stores, and BullMQ worker queues for background job processing without blocking the HTTP event loop.",
    tag: "High Throughput",
  },
  {
    icon: <ShieldCheck className="text-zinc-100" size={20} />,
    title: "Defense in Depth & Idempotent Flows",
    description:
      "Role-based access control (RBAC), JWT authentication guards, rate limiting, structured logging, and idempotent webhook payment processing.",
    tag: "Security",
  },
];

const howIShip = [
  "Modular service boundaries with clean domain separation",
  "ACID-compliant relational & document schema design",
  "Auth, authorization (RBAC), and strict rate-limiting",
  "Idempotent Stripe & multi-gateway payment flows",
  "Dockerized cloud deploys with GitHub Actions CI/CD",
  "Structured Pino logging and unified error contracts",
  "AI tooling & RAG integration with human verification",
  "End-to-end delivery across backend and modern React UIs",
];

const coreStack: string[] = [
  "TypeScript",
  "Node.js",
  "Express.js",
  "NestJS",
  "Go",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "React",
  "Next.js",
];

export default function About() {
  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      "[data-about-narrative]",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        "[data-tenet-card]",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .fromTo(
        "[data-about-work-card]",
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        "[data-about-work-item]",
        { x: 15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to("[data-about-work-card]", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -30,
        ease: "none",
      });
    });
  });

  return (
    <Section id="about" className="bg-zinc-950/40">
      <div ref={containerRef}>
        <SectionHeader
          title="Engineering Philosophy & Craft"
          subtitle="How I think about systems architecture, data reliability, and production software delivery."
        />

        <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Philosophy & Architectural Tenets */}
          <div className="min-w-0 space-y-6 sm:space-y-8 lg:col-span-7">
            <div data-about-narrative className="space-y-4 sm:space-y-5">
              <p className="text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
                Hi, I&apos;m{" "}
                <span className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 font-semibold text-zinc-50 shadow-sm">
                  Reazul Islam Reaz
                </span>
                , a{" "}
                <span className="font-semibold text-zinc-50">
                  backend-focused full-stack engineer
                </span>
                .
              </p>

              <p className="text-sm leading-relaxed text-zinc-300 sm:text-[1.05rem]">
                I build production SaaS systems end-to-end — high-throughput APIs,
                ACID-safe database layers, background queue workers, and clean frontends.
                My focus is on architectures that stay fast, maintainable, and resilient under real-world scale.
              </p>
            </div>

            {/* Core Tenets Grid */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                <Workflow size={15} className="text-zinc-500" />
                <span>ARCHITECTURAL PRINCIPLES</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {engineeringTenets.map((tenet) => (
                  <div
                    key={tenet.title}
                    data-tenet-card
                    className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-850 hover:shadow-lg"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-100 shadow-xs group-hover:scale-105 transition-transform">
                          {tenet.icon}
                        </div>
                        <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-400">
                          {tenet.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white">
                        {tenet.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                        {tenet.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Stack Fast Scan Strip */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                <Terminal size={14} className="text-zinc-500" />
                <span>ACTIVE PRODUCTION TECHNOLOGIES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="cursor-default rounded-lg border border-zinc-700/80 bg-zinc-900 px-3.5 py-1 text-xs font-medium text-zinc-200 shadow-xs transition-colors hover:border-zinc-500 hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: "How I Ship Systems" Telemetry Blueprint Panel */}
          <div className="relative min-w-0 lg:col-span-5">
            <div
              data-about-work-card
              className="h-full w-full space-y-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-zinc-500 sm:space-y-6 sm:rounded-3xl sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-700/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-50 shadow-xs">
                    <Server size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
                      How I Ship Systems
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      PRODUCTION STANDARDS
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                <div>
                  <p className="text-lg font-black text-zinc-50">&lt;50ms</p>
                  <p className="text-[11px] font-mono text-zinc-400">P99 API Latency</p>
                </div>
                <div>
                  <p className="text-lg font-black text-zinc-50">99.9%</p>
                  <p className="text-[11px] font-mono text-zinc-400">Target Uptime</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-300">
                {howIShip.map((item, idx) => (
                  <li
                    key={idx}
                    data-about-work-item
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-1 text-emerald-400 text-xs">▹</span>
                    <span className="font-medium leading-relaxed text-zinc-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-zinc-800">
                <SectionLink
                  href="/#contact"
                  className="group flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 px-8 py-3 text-center text-sm font-semibold text-zinc-950 shadow-md transition hover:scale-[1.02] hover:bg-zinc-50 active:scale-[0.98]"
                >
                  <span>Let&apos;s Build Resilient Systems</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </SectionLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
