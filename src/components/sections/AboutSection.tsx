"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionLink from "@/app/components/SectionLink";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

const howIWork = [
  "Modular service boundaries with clean domain separation",
  "ACID-compliant relational and document schema design",
  "Auth, authorization (RBAC), and rate limiting",
  "Idempotent Stripe and multi-gateway payment flows",
  "Dockerized cloud deploys with GitHub Actions CI/CD",
  "Structured logging and unified error contracts",
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
  });

  return (
    <Section id="about">
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="About"
          title="How I approach production systems"
          subtitle="Client platforms at Sparktech Agency — consistent data, predictable APIs, and slow work kept off the request path."
        />

        <div className="grid w-full min-w-0 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-about-block className="min-w-0 space-y-4 lg:col-span-7">
            <p className="type-lede text-pretty">
              I&apos;m{" "}
              <span className="font-medium text-zinc-50">
                Reazul Islam Reaz
              </span>
              . Most of my recent work is client SaaS and event platforms at
              Sparktech Agency. I like problems where the data has to stay
              consistent, the API has to stay predictable, and slow work has to
              happen off the request path.
            </p>
            <p className="type-body text-pretty">
              Day to day that means Node.js, NestJS, Express, PostgreSQL,
              MongoDB, and Redis — including production platforms for paying
              merchants and wholesale operators.
            </p>
          </div>

          <aside
            data-about-block
            className="min-w-0 border-t border-zinc-700/60 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <h3 className="font-display text-xl tracking-tight text-zinc-50">
              How I usually work
            </h3>
            <ul className="mt-5 space-y-3">
              {howIWork.map((item) => (
                <li
                  key={item}
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
