"use client";

import Image from "next/image";
import { useState } from "react";
import { resumePath, siteContact, siteSocial } from "@/config/site";
import SectionLink from "@/app/components/SectionLink";
import { showcaseTech } from "@/components/ui/tech";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Check, Download, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const heroTech = showcaseTech.slice(0, 6);

const facts = [
  { label: "Focus", value: "APIs, data, realtime" },
  { label: "Live products", value: "Elevate · J&K Cabinetry" },
  { label: "Stack", value: "NestJS · Postgres · Redis" },
  { label: "Open to", value: "Backend & full-stack roles" },
];

export default function HomeHero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const heroRef = useGsapScroll<HTMLElement>((_, isReduced) => {
    if (isReduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      "[data-hero-eyebrow]",
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45 },
    )
      .fromTo(
        "[data-hero-title]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.25",
      )
      .fromTo(
        "[data-hero-role]",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        "-=0.3",
      )
      .fromTo(
        "[data-hero-copy]",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        "-=0.25",
      )
      .fromTo(
        "[data-hero-actions]",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        "-=0.2",
      )
      .fromTo(
        "[data-hero-visual]",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        "-=0.5",
      );
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
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 xl:gap-16 xl:px-12">
        <div className="order-1 flex min-w-0 flex-col justify-center lg:col-span-7">
          <p data-hero-eyebrow className="type-eyebrow mb-4">
            Dhaka · Onsite & Remote
          </p>

          <h1
            data-hero-title
            className="font-display text-[2.25rem] leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]"
          >
            Reazul Islam Reaz
          </h1>

          <p
            data-hero-role
            className="mt-3.5 text-lg font-medium leading-snug text-zinc-200 sm:mt-4 sm:text-xl"
          >
            Backend-Focused Full-Stack Engineer
          </p>

          <p
            data-hero-copy
            className="type-lede mt-3 max-w-lg text-pretty text-zinc-400"
          >
            I design and ship the APIs, data models, auth, and background jobs
            behind production web apps — NestJS, Express, PostgreSQL, MongoDB,
            Redis, and Next.js when the product needs a UI.
          </p>

          <div data-hero-actions className="mt-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <SectionLink href="/#projects" className="btn-primary group">
                See the work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </SectionLink>
              <a href={resumePath} download className="btn-secondary">
                <Download size={15} aria-hidden />
                Resume
              </a>
              <div className="flex items-center gap-0.5">
                <a
                  href={siteSocial.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label="GitHub Profile"
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href={siteSocial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin size={18} />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="icon-btn"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check size={18} className="text-emerald-400" />
                  ) : (
                    <Mail size={18} />
                  )}
                </button>
              </div>
            </div>

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
          </div>
        </div>

        <div
          data-hero-visual
          className="order-2 relative min-w-0 lg:col-span-5"
        >
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-zinc-700/50 bg-zinc-800 sm:max-w-md lg:ml-auto lg:mr-0 lg:max-w-[22rem] xl:max-w-[24rem]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/reaz.jpg"
                alt="Reazul Islam Reaz"
                fill
                priority
                quality={92}
                sizes="(max-width: 639px) 384px, (max-width: 1023px) 448px, (max-width: 1279px) 352px, 384px"
                className="object-cover object-[center_18%]"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950/85 via-zinc-950/40 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="type-eyebrow">Currently</p>
              <p className="mt-1 text-sm font-medium text-zinc-50">
                Sparktech Agency
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 w-full max-w-7xl px-4 sm:mt-14 sm:px-6 lg:px-8 xl:px-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-700/30 sm:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="bg-zinc-900/90 px-4 py-4 sm:px-5 sm:py-5"
            >
              <dt className="type-label">{fact.label}</dt>
              <dd className="mt-1.5 text-sm font-medium leading-snug text-zinc-100">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
