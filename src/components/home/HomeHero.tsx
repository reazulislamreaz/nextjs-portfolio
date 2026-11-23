"use client";

import Image from "next/image";
import { useState } from "react";
import { resumePath, siteContact, siteRole, siteSocial } from "@/config/site";
import SectionLink from "@/app/components/SectionLink";
import { showcaseTech } from "@/components/ui/tech";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import Magnetic from "@/components/home/Magnetic";
import HeroPointerGlow from "@/components/home/HeroPointerGlow";
import { ArrowRight, Check, Download, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const heroTech = showcaseTech.slice(0, 6);

const facts = [
  { label: "Focus", value: "APIs · data · jobs · realtime" },
  { label: "In production", value: "Elevate · J&K · ConfAero" },
  { label: "Core stack", value: "NestJS · Postgres · Redis" },
  { label: "Open to", value: "Backend & full-stack roles" },
];

export default function HomeHero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const heroRef = useGsapScroll<HTMLElement>((_, isReduced) => {
    if (isReduced) return;

    // Entrance choreography — fast (350–550ms), eased, content-first order.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      "[data-hero-eyebrow]",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
    )
      .fromTo(
        "[data-hero-title]",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2",
      )
      .fromTo(
        "[data-hero-headline]",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        "-=0.25",
      )
      .fromTo(
        "[data-hero-copy]",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        "-=0.2",
      )
      .fromTo(
        "[data-hero-actions]",
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        "-=0.15",
      )
      .fromTo(
        "[data-hero-visual]",
        { y: 12, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55 },
        "-=0.4",
      )
      .fromTo(
        "[data-hero-facts] > div",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.35 },
        "-=0.3",
      );

    // Subtle portrait parallax — desktop only, and only for users who allow
    // motion. Scrubbed to scroll so it feels like depth, not animation.
    if (window.innerWidth >= 1024) {
      gsap.to("[data-hero-portrait]", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-visual]",
          start: "top 18%",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteContact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      ref={heroRef}
      aria-label="Introduction"
      className="relative flex min-w-0 flex-col justify-center overflow-hidden pt-[calc(var(--nav-height)+1.75rem)] pb-12 sm:pb-16"
    >
      {/* Decorative depth layers (behind content). Fine grid wash + copper
          blooms give the hero warmth and dimension without new color. */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="hero-grid" />
        <div className="hero-bloom left-[58%] top-[6%] h-[26rem] w-[26rem] opacity-70 sm:left-[62%] lg:left-[54%]" />
        <div className="hero-bloom -left-24 bottom-[-6rem] h-[20rem] w-[20rem] opacity-40" />
      </div>

      {/* Desktop-only copper spotlight that follows the cursor. */}
      <HeroPointerGlow />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 xl:gap-16 xl:px-12">
        <div className="order-1 flex min-w-0 flex-col justify-center lg:col-span-7">
          {/* Eyebrow with a small index tick — editorial, mono, uppercase. */}
          <p
            data-hero-eyebrow
            className="type-eyebrow mb-4 flex items-center gap-2.5"
          >
            <span
              className="h-px w-6 bg-emerald-400/60"
              aria-hidden
            />
            {siteRole}
          </p>

          <h1
            data-hero-title
            className="font-display text-[2.25rem] leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]"
          >
            Reazul Islam Reaz
          </h1>

          <p
            data-hero-headline
            className="mt-4 max-w-xl font-display text-[1.375rem] leading-[1.2] tracking-tight text-zinc-200 sm:mt-5 sm:text-2xl lg:text-[1.75rem]"
          >
            Build <span className="text-emerald-400">reliable</span> systems.
            <br className="hidden sm:block" />{" "}
            Ship <span className="text-emerald-400">scalable</span> products.
          </p>

          <p data-hero-copy className="type-lede mt-4 max-w-lg text-pretty">
            I design and build APIs, data models, authentication, background
            jobs, real-time systems, and production-ready web apps — NestJS,
            Express, PostgreSQL, MongoDB, and Redis, with Next.js when the
            product needs a UI.
          </p>

          <div
            data-hero-actions
            className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {/* Primary CTA gets the magnetic treatment on desktop pointers. */}
            <Magnetic strength={0.35}>
              <SectionLink href="/#projects" className="btn-primary group">
                View My Work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </SectionLink>
            </Magnetic>
            <a href={resumePath} download className="btn-secondary">
              <Download size={15} aria-hidden />
              Download Resume
            </a>
            <SectionLink href="/#contact" className="btn-ghost">
              Let&apos;s Work Together
            </SectionLink>
            <div className="flex items-center gap-0.5">
              <a
                href={siteSocial.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub Profile"
              >
                <FiGithub size={18} aria-hidden />
              </a>
              <a
                href={siteSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin size={18} aria-hidden />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="icon-btn"
                aria-label={
                  copiedEmail ? "Email copied" : "Copy email address"
                }
              >
                {copiedEmail ? (
                  <Check size={18} className="text-emerald-400" aria-hidden />
                ) : (
                  <Mail size={18} aria-hidden />
                )}
              </button>
              <span className="sr-only" aria-live="polite">
                {copiedEmail ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </div>
        </div>

        <div data-hero-visual className="order-2 relative min-w-0 lg:col-span-5">
          {/* Portrait as a framed editorial object: glass frame + copper
              hairline + corner ticks + status pill + parallax inner image. */}
          <figure className="group relative mx-auto w-full max-w-sm sm:max-w-md lg:ml-auto lg:mr-0 lg:max-w-[22rem] xl:max-w-[24rem]">
            <div className="relative overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-800 elevate-float">
              {/* Inner motion layer — scaled slightly so the scrubbed parallax
                  never reveals an edge gap. */}
              <div
                data-hero-portrait
                className="relative aspect-[4/5] w-full scale-[1.06] overflow-hidden"
              >
                <Image
                  src="/reaz.jpg"
                  alt="Reazul Islam Reaz, Backend-Focused Full-Stack Engineer"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 639px) min(28rem, 100vw - 2rem), (max-width: 1023px) 28rem, (max-width: 1279px) 22rem, 24rem"
                  className="object-cover object-[center_18%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
              </div>

              {/* Copper hairline ring drawn on top of the image edge. */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl border-accent-hairline opacity-70"
                aria-hidden
              />
              {/* Four corner ticks — small, deliberate, copper. */}
              <span className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l border-t border-emerald-400/70" aria-hidden />
              <span className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r border-t border-emerald-400/70" aria-hidden />
              <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b border-l border-emerald-400/70" aria-hidden />
              <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b border-r border-emerald-400/70" aria-hidden />
            </div>

            {/* Status pill — mirrors the existing "Open to: Backend & full-stack
                roles" fact, surfaced as a glanceable signal. */}
            <figcaption className="surface-glass absolute -bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5">
              <span className="status-dot h-2 w-2 rounded-full" aria-hidden />
              <span className="type-meta text-zinc-200">Open to work</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 w-full max-w-7xl px-4 sm:mt-14 sm:px-6 lg:px-8 xl:px-12">
        {/* Facts panel: hairline grid with mono index numbers (editorial). */}
        <dl
          data-hero-facts
          className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-700/30 elevate-raised sm:grid-cols-4"
        >
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className="group relative bg-zinc-900/90 px-4 py-4 transition-colors duration-200 hover:bg-zinc-900 sm:px-5 sm:py-5"
            >
              <span
                className="type-meta absolute right-3 top-3 text-zinc-600 transition-colors duration-200 group-hover:text-emerald-400"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="type-label">{fact.label}</dt>
              <dd className="mt-1.5 text-sm font-medium leading-snug text-zinc-100">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <ul
            className="flex flex-wrap gap-x-1 gap-y-2"
            aria-label="Primary technologies"
          >
            {heroTech.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <li key={tech.name} className="inline-flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-1.5 text-xs font-medium text-zinc-400 sm:text-[0.8125rem]">
                    <Icon className="text-sm text-emerald-400" aria-hidden />
                    {tech.name}
                  </span>
                  {i < heroTech.length - 1 ? (
                    <span className="text-zinc-600" aria-hidden>
                      ·
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* Quiet scroll cue — points toward the work below. */}
          <div
            className="hidden items-center gap-2 sm:flex"
            aria-hidden
          >
            <span className="type-label text-zinc-500">Scroll</span>
            <span className="scroll-cue-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
