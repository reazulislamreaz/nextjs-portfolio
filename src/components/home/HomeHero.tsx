"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { resumePath, siteContact, siteSocial } from "@/config/site";

const texts: string[] = [
  "I build scalable backend systems, APIs, and SaaS-style architectures.",
  "PostgreSQL · MongoDB · Redis — with Node.js, NestJS, and Go where it fits.",
  "Full-stack delivery with Next.js when the product needs a polished client.",
];

interface TechItem {
  name: string;
  color: string;
}

const backendTechStack: TechItem[] = [
  { name: "PostgreSQL", color: "text-blue-400" },
  { name: "MongoDB", color: "text-emerald-500" },
  { name: "Redis", color: "text-red-500" },
  { name: "Node.js", color: "text-green-500" },
  { name: "Express", color: "text-gray-300" },
  { name: "Go", color: "text-sky-400" },
  { name: "REST APIs", color: "text-cyan-400" },
];

export default function HomeHero() {
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % texts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-screen min-w-0 flex-col justify-center overflow-x-hidden"
    >
      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-1 items-center px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:px-8 lg:px-8 lg:pb-20 lg:pt-32 xl:px-12">
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="order-2 min-w-0 space-y-6 md:order-1 md:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium tracking-wide text-emerald-400 sm:px-3 sm:text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="leading-snug">Available for New Opportunities</span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Reazul Islam Reaz
              </h1>

              <div className="min-h-[4.5rem] w-full max-w-xl sm:min-h-[4rem] md:min-h-[3.75rem]">
                <p
                  key={sliderIndex}
                  className="hero-line-in text-pretty text-base font-medium leading-snug text-zinc-400 sm:text-lg md:text-xl lg:text-2xl"
                >
                  {texts[sliderIndex]}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 sm:gap-3 sm:pt-2">
              {backendTechStack.map((tech) => (
                <div
                  key={tech.name}
                  className={`rounded-md border border-zinc-800 bg-zinc-900/50 px-2.5 py-1.5 text-xs font-medium sm:px-3 sm:text-sm ${tech.color}`}
                >
                  {tech.name}
                </div>
              ))}
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 pt-4 sm:flex-row sm:gap-4 sm:pt-6">
              <a
                href="/#projects"
                className="inline-flex min-h-11 w-full transform cursor-pointer items-center justify-center rounded-lg bg-zinc-100 px-6 py-3 text-center text-sm font-semibold text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition active:scale-[0.98] sm:min-h-12 sm:w-auto sm:px-8 sm:text-base md:hover:scale-[1.02] md:hover:bg-zinc-50 md:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                View Projects
              </a>
              <a
                href={resumePath}
                download
                className="inline-flex min-h-11 w-full transform cursor-pointer items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-zinc-300 transition active:scale-[0.98] sm:min-h-12 sm:w-auto sm:px-8 sm:text-base md:hover:scale-[1.02] md:hover:bg-zinc-800 md:hover:text-zinc-50"
              >
                Download Resume
              </a>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 sm:gap-6 sm:pt-6">
              <a
                href={siteSocial.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-zinc-50/10 bg-zinc-50/[0.03] p-3 text-gray-400 shadow-lg backdrop-blur-md transition active:scale-95 sm:p-3.5 md:hover:scale-105 md:hover:border-zinc-50/20 md:hover:bg-zinc-50/[0.08] md:hover:text-zinc-50 md:hover:shadow-emerald-500/10"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={siteSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-zinc-50/10 bg-zinc-50/[0.03] p-3 text-gray-400 shadow-lg backdrop-blur-md transition active:scale-95 sm:p-3.5 md:hover:scale-105 md:hover:border-zinc-50/20 md:hover:bg-blue-600/20 md:hover:text-zinc-50 md:hover:shadow-blue-500/10"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`mailto:${siteContact.email}`}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-zinc-50/10 bg-zinc-50/[0.03] p-3 text-gray-400 shadow-lg backdrop-blur-md transition active:scale-95 sm:p-3.5 md:hover:scale-105 md:hover:border-zinc-50/20 md:hover:bg-emerald-600/20 md:hover:text-zinc-50 md:hover:shadow-emerald-500/10"
                aria-label="Email"
              >
                <svg
                  className="h-6 w-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] md:max-w-none">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-zinc-600 via-emerald-500/10 to-zinc-700 opacity-20 blur-2xl" />

              <div className="relative mx-auto aspect-square w-full max-w-[16.5rem] overflow-hidden rounded-full border-4 border-transparent bg-gradient-to-r from-zinc-600 via-emerald-500/40 to-zinc-700 p-1 sm:max-w-[18rem] md:max-w-[20rem]">
                <div className="h-full w-full overflow-hidden rounded-full bg-zinc-900">
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                    <Image
                      src="/reaz.png"
                      alt="Reazul Islam Reaz"
                      width={400}
                      height={400}
                      priority
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 320px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-1 -top-1 hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-600 bg-gradient-to-r from-zinc-700 to-zinc-900 text-base font-bold text-zinc-50 shadow-lg sm:-right-2 sm:-top-2 sm:flex sm:h-11 sm:w-11 md:-right-4 md:-top-4 md:h-12 md:w-12 md:text-lg"
                aria-hidden
              >
                ⚡
              </div>
              <div
                className="absolute -bottom-1 -left-1 hidden h-9 w-9 items-center justify-center rounded-full border border-zinc-600 bg-gradient-to-r from-zinc-800 to-zinc-950 text-base text-zinc-50 shadow-lg sm:-bottom-2 sm:-left-4 sm:flex sm:h-10 sm:w-10 md:-bottom-2 md:-left-6"
                aria-hidden
              >
                💻
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
