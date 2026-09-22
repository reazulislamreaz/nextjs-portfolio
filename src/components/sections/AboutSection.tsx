"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionLink from "@/app/components/SectionLink";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

/**
 * Condensed phases covering the full loop:
 * Understand → Plan → Architect → Data flow → Build → Test → Optimize/Scale/Improve
 */
const workflow = [
  {
    title: "Understand the problem",
    body: "I start with the real constraints — who it is for, what must not break, and what “done” means before any code exists.",
  },
  {
    title: "Break the work down",
    body: "Features, dependencies, priorities, and edge cases get mapped early so implementation does not invent the plan on the fly.",
  },
  {
    title: "Design the architecture",
    body: "I choose structure for change: boundaries, database shape, APIs, auth, caching, and queues — only when the problem earns them.",
  },
  {
    title: "Trace the data flow",
    body: "Request → logic → storage → response. I care about consistency and predictable behavior more than clever shortcuts.",
  },
  {
    title: "Build the core",
    body: "Modular code with clear ownership: validation, error contracts, auth, and security treated as part of the product — not afterthoughts.",
  },
  {
    title: "Prove it under pressure",
    body: "Happy paths are not enough. I check failures, integrity, API contracts, and the cases users hit when things go wrong.",
  },
  {
    title: "Optimize, offload, and evolve",
    body: "Fix what actually hurts, move slow work off the request path, leave room to scale, then watch production and keep refining.",
  },
];

const principles = [
  "Clarity of ownership over clever abstractions",
  "Predictable APIs and consistent data",
  "Keep the hot path fast — queues for the rest",
  "Ship something observable, then improve it",
];

export default function About() {
  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-about-block]",
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.55,
        ease: "power2.out",
      },
    );

    gsap.fromTo(
      "[data-about-point]",
      { y: 8, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
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

  return (
    <Section id="about">
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="About"
          title="How I think through a system"
          subtitle="A backend-focused way of working: understand the problem, design the structure and data movement, then build something that holds up in production."
        />

        <div className="grid w-full min-w-0 grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div data-about-block className="min-w-0 lg:col-span-7">
            <p className="type-lede max-w-2xl text-pretty">
              I&apos;m{" "}
              <span className="font-medium text-zinc-50">
                Reazul Islam Reaz
              </span>
              . I build full-stack products with a backend bias — the kind of
              systems where the data has to stay consistent, the API has to stay
              boringly predictable, and slow work does not live on the request
              path.
            </p>

            <p className="type-label mt-9 mb-4">From idea to production</p>

            <ol className="space-y-0">
              {workflow.map((step, index) => (
                <li
                  key={step.title}
                  data-about-point
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-t border-zinc-700/50 py-4 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-4 sm:py-5"
                >
                  <span className="type-meta pt-0.5 text-emerald-400/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[0.9375rem] font-medium leading-snug tracking-tight text-zinc-50">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400 text-pretty">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside
            data-about-block
            className="min-w-0 border-t border-zinc-700/60 pt-8 lg:sticky lg:top-[calc(var(--nav-scroll-offset)+0.5rem)] lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1"
          >
            <h3 className="font-display text-xl tracking-tight text-zinc-50">
              What I optimize for
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
              The checklist behind every architecture decision — not a stack
              list.
            </p>
            <ul className="mt-6 space-y-3.5">
              {principles.map((item) => (
                <li
                  key={item}
                  data-about-point
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-[0.625rem] leading-relaxed tracking-[0.12em] text-zinc-500 uppercase">
              Understand → Plan → Architect → Build → Prove → Evolve
            </p>

            <SectionLink href="/#contact" className="btn-primary group mt-8">
              Get in touch
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </SectionLink>
          </aside>
        </div>
      </div>
    </Section>
  );
}
