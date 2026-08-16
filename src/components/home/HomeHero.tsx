"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { resumePath, siteContact, siteSocial } from "@/config/site";
import SectionLink from "@/app/components/SectionLink";
import {
  SiDocker,
  SiGo,
  SiGraphql,
  SiMongodb,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiTypescript,
} from "react-icons/si";
import {
  TbApi,
  TbArrowRight,
  TbBolt,
  TbDatabase,
  TbDownload,
  TbMail,
  TbServer,
} from "react-icons/tb";
import { FiGithub, FiLinkedin } from "react-icons/fi";

interface NarrativeStatement {
  tag: string;
  lead: string;
  detail: string;
}

const narrativeStatements: NarrativeStatement[] = [
  {
    tag: "Production Architecture",
    lead: "I architect resilient backends and APIs meant to thrive in production.",
    detail: "Designing modular services, clear error contracts, and low-latency data pipelines.",
  },
  {
    tag: "Core Daily Stack",
    lead: "Deep daily focus in Node.js, NestJS, Go, PostgreSQL, MongoDB & Redis.",
    detail: "ACID-compliant schemas, scalable background queues, and sub-millisecond caching.",
  },
  {
    tag: "End-to-End Delivery",
    lead: "Full-stack capable — delivering rock-solid APIs with fast, reactive frontends.",
    detail: "TypeScript, Next.js, hardened webhooks, and idempotent Stripe payment flows.",
  },
];

interface TechChip {
  name: string;
  icon: ReactNode;
  iconColor: string;
}

const coreTechnologies: TechChip[] = [
  { name: "Node.js", icon: <SiNodedotjs />, iconColor: "text-emerald-400" },
  { name: "NestJS", icon: <SiNestjs />, iconColor: "text-rose-400" },
  { name: "Go", icon: <SiGo />, iconColor: "text-cyan-400" },
  { name: "PostgreSQL", icon: <SiPostgresql />, iconColor: "text-blue-400" },
  { name: "MongoDB", icon: <SiMongodb />, iconColor: "text-emerald-500" },
  { name: "Redis", icon: <SiRedis />, iconColor: "text-red-400" },
  { name: "TypeScript", icon: <SiTypescript />, iconColor: "text-sky-400" },
  { name: "REST APIs", icon: <TbApi />, iconColor: "text-teal-400" },
  { name: "Docker", icon: <SiDocker />, iconColor: "text-sky-400" },
  { name: "GraphQL", icon: <SiGraphql />, iconColor: "text-pink-400" },
];

const highlights = [
  { value: "10+", label: "Production Systems", sub: "Shipped & maintained" },
  { value: "<50ms", label: "Latency Target", sub: "Cached & indexed" },
  { value: "Clean", label: "Architecture", sub: "Modular & tested" },
  { value: "Open", label: "Onsite & Remote", sub: "Dhaka & Worldwide" },
];

export default function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      const timeout = setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % narrativeStatements.length);
        setFade(true);
      }, 250);
      return () => clearTimeout(timeout);
    }, 4800);

    return () => clearInterval(timer);
  }, []);

  const current = narrativeStatements[activeSlide];

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[calc(100vh-4rem)] min-w-0 flex-col justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28"
    >
      {/* Soft ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px] sm:h-[40rem] sm:w-[40rem] md:left-1/3"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/4 -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-[90px]"
      />

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-1 items-center px-4 pb-14 sm:px-6 sm:pb-16 md:px-8 lg:px-8 lg:pb-20 xl:px-12">
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">

          {/* Left Column: Headline, Narrative & CTAs (7 cols on desktop) */}
          <div className="order-2 min-w-0 space-y-6 sm:space-y-7 lg:order-1 lg:col-span-7">

            {/* Top Status & Location */}
            <div
              className="hero-line-in flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0ms" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-400 backdrop-blur-sm sm:text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                </span>
                <span>Available for new roles</span>
              </div>

              <span className="text-xs text-zinc-500">
                Dhaka, Bangladesh · Onsite & Remote Available
              </span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2.5 sm:space-y-3">
              <h1
                className="hero-line-in text-balance text-4xl font-extrabold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl xl:text-7xl"
                style={{ animationDelay: "80ms" }}
              >
                Reazul Islam{" "}
                <span className="text-emerald-400">
                  Reaz
                </span>
              </h1>

              <p
                className="hero-line-in text-base font-semibold text-zinc-300 sm:text-lg lg:text-xl"
                style={{ animationDelay: "140ms" }}
              >
                Backend-focused full-stack engineer
              </p>
            </div>

            {/* Seamless Narrative Pitch Switcher */}
            <div
              className="hero-line-in relative rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4 backdrop-blur-sm transition-colors hover:border-zinc-700/80 sm:p-5"
              style={{ animationDelay: "200ms" }}
            >
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
                  {current.tag}
                </span>

                {/* Micro dot controls */}
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Overview statements">
                  {narrativeStatements.map((item, idx) => (
                    <button
                      key={item.tag}
                      type="button"
                      onClick={() => {
                        setFade(false);
                        setTimeout(() => {
                          setActiveSlide(idx);
                          setFade(true);
                        }, 150);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx
                          ? "w-5 bg-emerald-400"
                          : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                        }`}
                      aria-label={`View topic: ${item.tag}`}
                      aria-selected={activeSlide === idx}
                      role="tab"
                    />
                  ))}
                </div>
              </div>

              <div className="min-h-[4rem] sm:min-h-[3.5rem]">
                <div
                  className={`transition-opacity duration-250 ${fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <p className="text-sm font-medium text-zinc-200 sm:text-base">
                    {current.lead}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                    {current.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* Curated Tech Stack Chips */}
            <div
              className="hero-line-in space-y-2"
              style={{ animationDelay: "260ms" }}
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <span>Core Stack</span>
                <span className="text-[0.6875rem] text-zinc-500">
                  Active in production
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {coreTechnologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-2.5 py-1.5 text-xs font-medium text-zinc-300 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 sm:px-3 sm:text-sm"
                  >
                    <span className={`text-sm ${tech.iconColor}`}>
                      {tech.icon}
                    </span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons & Socials */}
            <div
              className="hero-line-in flex flex-wrap items-center gap-3 pt-2 sm:gap-4 sm:pt-3"
              style={{ animationDelay: "320ms" }}
            >
              <SectionLink
                href="/#projects"
                className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-semibold text-zinc-900 shadow-md transition-all duration-200 hover:bg-zinc-200 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                <span>View Projects</span>
                <TbArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </SectionLink>

              <a
                href={resumePath}
                download
                className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-6 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 active:scale-[0.98] sm:w-auto"
              >
                <TbDownload size={16} className="text-zinc-400" />
                <span>Resume</span>
              </a>

              {/* Social icons alongside CTAs */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <a
                  href={siteSocial.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 active:scale-95"
                  aria-label="GitHub Profile"
                >
                  <FiGithub size={18} />
                </a>

                <a
                  href={siteSocial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-blue-400 active:scale-95"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin size={18} />
                </a>

                <a
                  href={`mailto:${siteContact.email}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-emerald-400 active:scale-95"
                  aria-label="Send an Email"
                >
                  <TbMail size={20} />
                </a>
              </div>
            </div>

            {/* Understated Metrics Strip */}
            <div
              className="hero-line-in grid grid-cols-2 gap-3 border-t border-zinc-800/60 pt-5 sm:grid-cols-4 sm:gap-4 sm:pt-6"
              style={{ animationDelay: "380ms" }}
            >
              {highlights.map((item) => (
                <div key={item.label} className="flex min-w-0 flex-col justify-start space-y-0.5">
                  <p className="text-lg font-bold leading-tight tracking-tight text-zinc-100 sm:text-xl">
                    {item.value}
                  </p>
                  <p className="text-xs font-medium leading-snug text-emerald-400/90">
                    {item.label}
                  </p>
                  <p className="text-[0.6875rem] leading-snug text-zinc-500">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Natural, Polished Portrait & Telemetry (5 cols on desktop) */}
          <div
            className="hero-line-in order-1 flex items-center justify-center lg:order-2 lg:col-span-5"
            style={{ animationDelay: "150ms" }}
          >
            <div className="relative mx-auto flex w-full max-w-[20rem] items-center justify-center sm:max-w-[24rem] lg:max-w-none">

              {/* Soft, calm background ambient aura */}
              <div
                aria-hidden="true"
                className="animate-pulse-glow absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-zinc-700/20 blur-2xl"
              />

              {/* Polished Portrait Frame */}
              <div className="group relative z-10 aspect-square w-[15.5rem] rounded-full border-2 border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl transition-all duration-300 hover:border-zinc-700 sm:w-[18rem] md:w-[19.5rem]">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-zinc-800/80 bg-zinc-900">
                  <Image
                    src="/reaz.png"
                    alt="Reazul Islam Reaz"
                    width={400}
                    height={400}
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Micro status badge anchored to avatar */}
                <div className="absolute -bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-700/80 bg-zinc-900/90 px-3 py-1 text-xs font-semibold text-zinc-200 shadow-md backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                  <span>Backend Specialist</span>
                </div>
              </div>

              {/* Floating Card 1: Production APIs (Top Right) */}
              <div
                className="animate-float-slow absolute -right-2 top-2 z-20 hidden rounded-xl border border-zinc-800 bg-zinc-900/90 p-2.5 shadow-lg backdrop-blur-md sm:flex sm:items-center sm:gap-2.5 md:-right-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <TbServer size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">
                    Production APIs
                  </p>
                  <p className="text-[0.6875rem] text-emerald-400">
                    99.9% Uptime Architecture
                  </p>
                </div>
              </div>

              {/* Floating Card 2: Low Latency / Redis (Bottom Left) */}
              <div
                className="animate-float-reverse absolute -left-2 bottom-6 z-20 hidden rounded-xl border border-zinc-800 bg-zinc-900/90 p-2.5 shadow-lg backdrop-blur-md sm:flex sm:items-center sm:gap-2.5 md:-left-6"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                  <TbBolt size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">
                    Low Latency
                  </p>
                  <p className="text-[0.6875rem] text-amber-400">
                    Sub-ms Redis Caching
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
