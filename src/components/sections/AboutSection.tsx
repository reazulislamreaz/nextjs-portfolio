"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionLink from "@/app/components/SectionLink";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

const focusAreas = [
  {
    title: "APIs and contracts",
    description:
      "Type-safe DTOs and Zod/Prisma models so clients get predictable, versioned REST APIs.",
  },
  {
    title: "Data modeling",
    description:
      "PostgreSQL with indexes and transactions, and MongoDB when the data is document-shaped.",
  },
  {
    title: "Caching and background work",
    description:
      "Redis and BullMQ so slow jobs stay off the request path instead of blocking HTTP handlers.",
  },
  {
    title: "Auth and payments",
    description:
      "RBAC, JWT guards, rate limiting, structured logging, and idempotent payment webhooks.",
  },
];

const howIWork = [
  "Modular service boundaries with clean domain separation",
  "ACID-compliant relational and document schema design",
  "Auth, authorization (RBAC), and rate limiting",
  "Idempotent Stripe and multi-gateway payment flows",
  "Dockerized cloud deploys with GitHub Actions CI/CD",
  "Structured Pino logging and unified error contracts",
  "AI tooling and RAG integration with human verification",
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
          title="About"
          subtitle="Backend-focused full-stack engineer. I design APIs, data models, and the jobs that keep products running."
        />

        <div className="grid w-full min-w-0 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 space-y-8 lg:col-span-7">
            <div data-about-narrative className="space-y-4 sm:space-y-5">
              <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                I&apos;m{" "}
                <span className="font-semibold text-zinc-50">
                  Reazul Islam Reaz
                </span>
                . I build the backend of production web apps — REST APIs, relational
                and document data models, role-based access, and queue-backed
                background jobs. When a product needs it, I also ship the React /
                Next.js UI.
              </p>

              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                Most of my recent work is client SaaS and event platforms at
                Sparktech Agency. I like problems where the data has to stay
                consistent, the API has to stay predictable, and slow work has to
                happen off the request path. Day to day that means Node.js, NestJS,
                Express, PostgreSQL, MongoDB, and Redis.
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-zinc-200">
                What I focus on
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
                {focusAreas.map((area) => (
                  <div key={area.title} data-tenet-card>
                    <h4 className="text-sm font-semibold text-zinc-100">
                      {area.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-zinc-800/80 pt-6">
              <h3 className="text-sm font-semibold text-zinc-200">
                Technologies I use
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-w-0 lg:col-span-5">
            <div data-about-work-card className="space-y-5 lg:border-l lg:border-zinc-800 lg:pl-8">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                How I usually work
              </h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                {howIWork.map((item) => (
                  <li
                    key={item}
                    data-about-work-item
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                    <span className="leading-relaxed text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <SectionLink
                  href="/#contact"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.98]"
                >
                  <span>Get in touch</span>
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
