"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionLink from "@/app/components/SectionLink";
import { FiCode, FiServer, FiCpu } from "react-icons/fi";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";

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
  "React",
  "Next.js",
  "Tailwind CSS",
];

const advancedTech: string[] = [
  "GraphQL for clear API contracts",
  "Socket and event-driven interfaces",
  "RBAC and multi-tenant guardrails",
  "Payments and hardened webhooks",
];

const experience: string[] = [
  "Modular services with clear API boundaries",
  "Relational and document schema design",
  "Auth, authorization, and rate limiting",
  "Idempotent Stripe payment flows",
  "Cloud deploys with CI/CD",
  "Structured logging and error contracts",
  "AI tooling with human review and tests",
  "End-to-end delivery across the stack",
];

export default function About() {
  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    // ScrollTrigger timeline for About section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      "[data-about-text]",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        "[data-about-chip]",
        { scale: 0.85, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.025,
          duration: 0.35,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      )
      .fromTo(
        "[data-about-focus-item]",
        { x: -15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .fromTo(
        "[data-about-work-card]",
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        "[data-about-work-item]",
        { x: 15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Desktop subtle parallax float on scroll
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
        <SectionHeader title="About Me" />

        <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 space-y-6 sm:space-y-8 lg:col-span-7">
            <div className="space-y-4 sm:space-y-6">
              <p
                data-about-text
                className="text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl"
              >
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

              <p
                data-about-text
                className="text-sm leading-relaxed text-zinc-300 sm:text-[1.05rem]"
              >
                I ship SaaS products end to end — clean APIs, solid data layers,
                and thin frontends. I design for scale, safe payments, and
                operability.
              </p>
            </div>

            <div className="space-y-4">
              <div data-about-text className="flex items-center gap-3">
                <FiCode className="text-2xl text-zinc-50" />
                <h3 className="text-xl font-bold tracking-tight text-zinc-50">
                  Core Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    data-about-chip
                    className="cursor-default rounded-lg border border-zinc-700/80 bg-zinc-900 px-4 py-1.5 text-sm font-medium text-zinc-100 shadow-xs transition-colors hover:border-zinc-500 hover:text-zinc-50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div data-about-text className="flex items-center gap-3">
                <FiCpu className="text-2xl text-zinc-50" />
                <h3 className="text-xl font-bold tracking-tight text-zinc-50">
                  Platform focus
                </h3>
              </div>
              <ul className="grid grid-cols-1 gap-3 text-zinc-300 sm:grid-cols-2">
                {advancedTech.map((item, idx) => (
                  <li
                    key={idx}
                    data-about-focus-item
                    className="flex items-center gap-2"
                  >
                    <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative min-w-0 lg:col-span-5">
            <div
              data-about-work-card
              className="h-full w-full space-y-6 rounded-2xl border border-zinc-700/80 bg-zinc-900 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-zinc-500 sm:space-y-6 sm:rounded-3xl sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3 border-b border-zinc-700/80 pb-4">
                <FiServer className="text-3xl text-zinc-50" />
                <h3 className="text-2xl font-bold tracking-tight text-zinc-50">
                  How I work
                </h3>
              </div>

              <ul className="space-y-4 text-sm sm:space-y-5 sm:text-[1.05rem]">
                {experience.map((item, idx) => (
                  <li
                    key={idx}
                    data-about-work-item
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-zinc-50">▹</span>
                    <span className="font-medium leading-tight text-zinc-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <SectionLink
                  href="/#contact"
                  className="flex min-h-11 w-full transform justify-center rounded-xl bg-zinc-100 px-8 py-3.5 text-center text-sm font-semibold text-zinc-950 shadow-md transition hover:scale-[1.02] hover:bg-zinc-50 active:scale-[0.98] sm:text-base"
                >
                  Let&apos;s Build Systems
                </SectionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
