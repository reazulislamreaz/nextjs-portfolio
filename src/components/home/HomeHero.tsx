"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
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
  TbCheck,
  TbDownload,
  TbMail,
  TbServer,
} from "react-icons/tb";
import { FiGithub, FiLinkedin } from "react-icons/fi";

interface TechChip {
  name: string;
  icon: ReactNode;
  specialty: string;
}

const coreTechnologies: TechChip[] = [
  { name: "Node.js", icon: <SiNodedotjs />, specialty: "High-throughput runtime" },
  { name: "NestJS", icon: <SiNestjs />, specialty: "Modular enterprise architecture" },
  { name: "Go", icon: <SiGo />, specialty: "High concurrency services" },
  { name: "PostgreSQL", icon: <SiPostgresql />, specialty: "ACID-compliant relational design" },
  { name: "MongoDB", icon: <SiMongodb />, specialty: "Document & aggregation pipelines" },
  { name: "Redis", icon: <SiRedis />, specialty: "Sub-millisecond distributed cache" },
  { name: "TypeScript", icon: <SiTypescript />, specialty: "Type-safe robust contracts" },
  { name: "REST APIs", icon: <TbApi />, specialty: "Standardized secure endpoints" },
  { name: "Docker", icon: <SiDocker />, specialty: "Isolated containerization" },
  { name: "GraphQL", icon: <SiGraphql />, specialty: "Flexible typed query schemas" },
];

const highlights = [
  { value: "10+", label: "Systems Shipped", sub: "Production & Client" },
  { value: "<50ms", label: "P99 API Latency", sub: "Redis & Indexed SQL" },
  { value: "Clean", label: "Architecture", sub: "Modular & Test-Driven" },
  { value: "Available", label: "Onsite & Remote", sub: "Dhaka & Worldwide" },
];

export default function HomeHero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTech, setActiveTech] = useState<TechChip | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteContact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt calculation (-6deg to +6deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;
    setTilt({ rotateX, rotateY });
  };

  return (
    <section
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ rotateX: 0, rotateY: 0 });
      }}
      className="relative flex min-h-[calc(100vh-4rem)] min-w-0 flex-col justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Ambient background spatial glows - Formal Emerald / Teal palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-transparent blur-[120px] sm:h-[45rem] sm:w-[45rem] md:left-1/3"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/4 -z-10 h-80 w-80 rounded-full bg-teal-500/8 blur-[100px]"
      />

      {/* Interactive mouse spotlight follower */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px -z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 137, 123, 0.07), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-1 items-center px-4 pb-14 sm:px-6 sm:pb-16 md:px-8 lg:px-8 lg:pb-20 xl:px-12">
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">

          {/* Left Column: Formal Human Narrative & CTAs (7 cols on desktop) */}
          <div className="order-2 min-w-0 space-y-6 sm:space-y-7 lg:order-1 lg:col-span-7">

            {/* Top Status & Location Pill */}
            <div
              className="hero-line-in flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0ms" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-600 dark:text-emerald-300 backdrop-blur-xl shadow-xs sm:text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 live-beacon shadow-[0_0_8px_#26a69a]" />
                </span>
                <span>Available for new opportunities</span>
              </div>

              <span className="text-xs font-mono text-zinc-400">
                Dhaka, Bangladesh · Onsite & Remote
              </span>
            </div>

            {/* Main Name & Future-Stack Title */}
            <div className="space-y-3">
              <div className="space-y-2">
                <h1
                  className="hero-line-in text-balance text-4xl font-black tracking-tight text-zinc-50 sm:text-5xl md:text-6xl xl:text-7xl"
                  style={{ animationDelay: "80ms" }}
                >
                  Reazul Islam{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(0,137,123,0.35)]">
                    Reaz
                  </span>
                </h1>

                {/* Future-Stack Cyber Laser Line */}
                <div
                  aria-hidden="true"
                  className="cyber-laser-line h-[1.5px] w-48 rounded-full bg-gradient-to-r from-emerald-500 via-teal-300 to-transparent"
                />
              </div>

              <p
                className="hero-line-in text-base font-semibold text-zinc-300 sm:text-lg lg:text-xl leading-snug"
                style={{ animationDelay: "140ms" }}
              >
                Backend-focused software engineer building fast, reliable systems and clean web applications.
              </p>
            </div>

            {/* Human-Written Bio Statement */}
            <p
              className="hero-line-in text-sm leading-relaxed text-zinc-400 sm:text-base max-w-2xl"
              style={{ animationDelay: "200ms" }}
            >
              I design and build distributed backend services, high-throughput APIs, and ACID-compliant relational schemas. Production-tested across Node.js, NestJS, Go, PostgreSQL, MongoDB, and Redis with an eye for end-to-end craft.
            </p>

            {/* Curated Tech Stack Chips with Interactive Inspector */}
            <div
              className="hero-line-in space-y-2.5"
              style={{ animationDelay: "260ms" }}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span>Core Stack</span>
                <span className="min-h-[1.25rem] text-[0.6875rem] font-mono text-emerald-500 dark:text-emerald-400 transition-opacity duration-200">
                  {activeTech ? activeTech.specialty : "Active in production"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {coreTechnologies.map((tech) => (
                  <button
                    key={tech.name}
                    type="button"
                    onMouseEnter={() => setActiveTech(tech)}
                    onMouseLeave={() => setActiveTech(null)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-md shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-zinc-800 hover:text-emerald-400 hover:shadow-[0_0_16px_rgba(0,137,123,0.15)] active:scale-95 sm:text-sm"
                  >
                    <span className="text-sm text-zinc-400 transition-colors group-hover:text-emerald-400">
                      {tech.icon}
                    </span>
                    <span>{tech.name}</span>
                  </button>
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
                className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 py-2.5 text-sm font-semibold text-zinc-900 shadow-md transition-all duration-200 hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <span>View Projects</span>
                <TbArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </SectionLink>

              {/* Future-Stack Radiant Resume Button */}
              <a
                href={resumePath}
                download
                className="group relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,137,123,0.35)] active:scale-95 focus:outline-none sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-zinc-100 backdrop-blur-xl transition-colors group-hover:bg-zinc-850 sm:w-auto">
                  <TbDownload size={16} className="text-emerald-400" />
                  <span>Resume</span>
                </span>
              </a>

              {/* Social icons alongside CTAs */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <a
                  href={siteSocial.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-zinc-700 hover:text-zinc-100 active:scale-95"
                  aria-label="GitHub Profile"
                >
                  <FiGithub size={18} />
                </a>

                <a
                  href={siteSocial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-zinc-700 hover:text-blue-400 active:scale-95"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin size={18} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Click to copy email"
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-emerald-500/40 hover:text-emerald-400 active:scale-95 cursor-pointer"
                  aria-label="Copy Email"
                >
                  {copiedEmail ? (
                    <TbCheck size={18} className="text-emerald-400" />
                  ) : (
                    <TbMail size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Future-Stack Understated Metrics Strip with Interactive Hover */}
            <div
              className="hero-line-in grid grid-cols-2 gap-3 border-t border-zinc-800/80 pt-5 sm:grid-cols-4 sm:gap-4 sm:pt-6"
              style={{ animationDelay: "380ms" }}
            >
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="group flex min-w-0 flex-col justify-start space-y-0.5 rounded-xl p-1.5 transition-colors duration-200 hover:bg-zinc-900/40"
                >
                  <p className="text-xl font-black leading-tight tracking-tight text-zinc-50 transition-colors group-hover:text-emerald-400 sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="text-xs font-bold leading-snug text-emerald-500 dark:text-emerald-400">
                    {item.label}
                  </p>
                  <p className="text-[0.6875rem] font-mono leading-snug text-zinc-500">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Spatial Holographic Portrait with 3D Interactive Parallax */}
          <div
            className="hero-line-in order-1 flex items-center justify-center lg:order-2 lg:col-span-5"
            style={{ animationDelay: "150ms" }}
          >
            <div
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: isHovered ? "transform 0.15s ease-out" : "transform 0.5s ease-out",
              }}
              className="relative mx-auto flex w-full max-w-[20rem] items-center justify-center sm:max-w-[24rem] lg:max-w-none"
            >

              {/* Spatial ambient aura glow */}
              <div
                aria-hidden="true"
                className="animate-pulse-glow absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-sky-500/20 blur-3xl"
              />

              {/* Spatial Glass Portrait Frame */}
              <div className="group relative z-10 aspect-square w-[15.5rem] rounded-full border-2 border-zinc-800 bg-zinc-900 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:border-emerald-500/40 sm:w-[18rem] md:w-[19.5rem]">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-950 shadow-inner">
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

                {/* Spatial status badge anchored to avatar */}
                <div className="absolute -bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-700/80 bg-zinc-900/90 px-3.5 py-1 text-xs font-semibold text-zinc-100 shadow-lg backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-beacon shadow-[0_0_8px_#26a69a]" />
                  <span>Backend Specialist</span>
                </div>
              </div>

              {/* Floating Card 1: Production APIs (Top Right) */}
              <div
                className="animate-float-slow absolute -right-2 top-2 z-20 hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-lg backdrop-blur-2xl transition-transform duration-300 hover:scale-105 sm:flex sm:items-center sm:gap-3 md:-right-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-xs">
                  <TbServer size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">
                    Production APIs
                  </p>
                  <p className="text-[0.6875rem] font-semibold text-emerald-400">
                    99.9% Uptime Architecture
                  </p>
                </div>
              </div>

              {/* Floating Card 2: Low Latency / Redis (Bottom Left) */}
              <div
                className="animate-float-reverse absolute -left-2 bottom-6 z-20 hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-lg backdrop-blur-2xl transition-transform duration-300 hover:scale-105 sm:flex sm:items-center sm:gap-3 md:-left-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-xs">
                  <TbBolt size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">
                    Low Latency
                  </p>
                  <p className="text-[0.6875rem] font-semibold text-amber-400">
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
