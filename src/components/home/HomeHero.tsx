"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { resumePath, siteContact, siteSocial } from "@/config/site";
import SectionLink from "@/app/components/SectionLink";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import HeroCanvasBackground from "@/components/ui/HeroCanvasBackground";
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
  ArrowRight,
  Download,
  Server,
  Zap,
  Check,
  Mail,
  ShieldCheck,
  Cpu,
  Terminal,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { TbApi } from "react-icons/tb";

interface TechChip {
  name: string;
  icon: ReactNode;
  specialty: string;
  badge: string;
}

const coreTechnologies: TechChip[] = [
  { name: "Node.js", icon: <SiNodedotjs />, specialty: "High-throughput async runtime", badge: "Runtime" },
  { name: "NestJS", icon: <SiNestjs />, specialty: "Modular enterprise architecture", badge: "Framework" },
  { name: "Go", icon: <SiGo />, specialty: "High concurrency microservices", badge: "Language" },
  { name: "PostgreSQL", icon: <SiPostgresql />, specialty: "ACID-compliant relational design", badge: "RDBMS" },
  { name: "MongoDB", icon: <SiMongodb />, specialty: "Document & aggregation pipelines", badge: "NoSQL" },
  { name: "Redis", icon: <SiRedis />, specialty: "Sub-millisecond distributed cache", badge: "In-Memory" },
  { name: "TypeScript", icon: <SiTypescript />, specialty: "Type-safe robust contracts", badge: "Contracts" },
  { name: "REST APIs", icon: <TbApi />, specialty: "Standardized secure endpoints", badge: "API" },
  { name: "Docker", icon: <SiDocker />, specialty: "Isolated containerization", badge: "DevOps" },
  { name: "GraphQL", icon: <SiGraphql />, specialty: "Flexible typed query schemas", badge: "Schemas" },
];

const highlights = [
  { value: "10+", label: "Systems Shipped", sub: "Production & Client SaaS" },
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

  const heroContainerRef = useGsapScroll<HTMLElement>((_, isReduced) => {
    if (isReduced) return;

    // Cinematic entrance timeline
    const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    entranceTl
      .fromTo(
        "[data-hero-badge]",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 }
      )
      .fromTo(
        "[data-hero-title]",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        "-=0.35"
      )
      .fromTo(
        "[data-hero-laser]",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "expo.out" },
        "-=0.45"
      )
      .fromTo(
        "[data-hero-subtitle]",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        "[data-hero-bio]",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.35"
      )
      .fromTo(
        "[data-hero-chip]",
        { scale: 0.85, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.025, duration: 0.35 },
        "-=0.25"
      )
      .fromTo(
        "[data-hero-ctas]",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        "-=0.2"
      )
      .fromTo(
        "[data-hero-metric]",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4 },
        "-=0.2"
      )
      .fromTo(
        "[data-hero-portrait]",
        { scale: 0.86, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.85, ease: "back.out(1.3)" },
        "-=0.75"
      )
      .fromTo(
        ["[data-hero-card-1]", "[data-hero-card-2]", "[data-hero-topology]"],
        { y: 20, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55 },
        "-=0.45"
      );

    // Scroll-linked scrubbed parallax for depth
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        })
        .to("[data-hero-left]", { y: 65, opacity: 0.2, ease: "none" }, 0)
        .to("[data-hero-portrait-col]", { y: 90, scale: 0.94, ease: "none" }, 0)
        .to("[data-hero-card-1]", { x: 30, y: -25, ease: "none" }, 0)
        .to("[data-hero-card-2]", { x: -30, y: 35, ease: "none" }, 0)
        .to("[data-hero-hud-ring1]", { rotation: 80, scale: 1.15, ease: "none" }, 0)
        .to("[data-hero-hud-ring2]", { rotation: -80, scale: 1.2, ease: "none" }, 0);
    });
  });

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

    // Subtle 3D tilt calculation (-4deg to +4deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;
    setTilt({ rotateX, rotateY });
  };

  return (
    <section
      ref={heroContainerRef}
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ rotateX: 0, rotateY: 0 });
      }}
      className="relative flex min-h-[calc(100vh-4rem)] min-w-0 flex-col justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Interactive WebGL / Particle Canvas Constellation Layer */}
      <HeroCanvasBackground />

      {/* Ambient background spatial glows - Minimalist Futuristic Obsidian/Titanium */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-black/5 via-zinc-400/5 to-transparent dark:from-white/10 dark:via-zinc-400/5 dark:to-transparent blur-[120px] sm:h-[45rem] sm:w-[45rem] md:left-1/3 animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/4 -z-10 h-80 w-80 rounded-full bg-zinc-400/5 dark:bg-white/5 blur-[100px] animate-pulse-glow"
      />

      {/* Cyber radar scan layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-scan -z-10"
      />

      {/* Interactive mouse spotlight follower */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px -z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-1 items-center px-4 pb-14 sm:px-6 sm:pb-16 md:px-8 lg:px-8 lg:pb-20 xl:px-12">
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">

          {/* Left Column: Narrative & Action CTAs (7 cols on desktop) */}
          <div data-hero-left className="order-2 min-w-0 space-y-6 sm:space-y-7 lg:order-1 lg:col-span-7">

            {/* Top Status & Location Pill */}
            <div data-hero-badge className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/90 px-3.5 py-1 text-xs font-medium tracking-wide text-zinc-100 backdrop-blur-xl shadow-xs sm:text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 live-beacon shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </span>
                <span>Available for new opportunities</span>
              </div>

              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Terminal size={13} className="text-zinc-500" />
                <span>Dhaka · Onsite & Remote</span>
              </span>
            </div>

            {/* Main Name & Future-Stack Title */}
            <div className="space-y-3">
              <div className="space-y-2">
                <h1
                  data-hero-title
                  className="text-balance text-4xl font-black tracking-tight text-zinc-50 sm:text-5xl md:text-6xl xl:text-7xl"
                >
                  Reazul Islam{" "}
                  <span className="bg-gradient-to-r from-zinc-50 via-zinc-300 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,255,255,0.2)]">
                    Reaz
                  </span>
                </h1>

                {/* Cyber Laser Line */}
                <div
                  data-hero-laser
                  aria-hidden="true"
                  className="cyber-laser-line h-[2px] w-48 rounded-full bg-gradient-to-r from-zinc-50 via-zinc-400 to-transparent"
                />
              </div>

              <p
                data-hero-subtitle
                className="text-base font-semibold text-zinc-200 sm:text-lg lg:text-xl leading-snug"
              >
                Backend-focused software engineer building fast, reliable systems and clean web applications.
              </p>
            </div>

            {/* Human-Written Bio Statement */}
            <p
              data-hero-bio
              className="text-sm leading-relaxed text-zinc-300 sm:text-base max-w-2xl font-normal"
            >
              I design and build distributed backend services, high-throughput APIs, and ACID-compliant relational schemas. Production-tested across Node.js, NestJS, Go, PostgreSQL, MongoDB, and Redis with an eye for end-to-end craft.
            </p>

            {/* Curated Tech Stack Chips with Interactive Inspector */}
            <div data-hero-stack className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Cpu size={14} className="text-zinc-500" />
                  <span>Core Tech Stack</span>
                </span>
                <span className="min-h-[1.25rem] text-[0.6875rem] font-mono text-zinc-200 transition-opacity duration-200 font-bold">
                  {activeTech ? `${activeTech.name} // ${activeTech.specialty}` : "Hover to inspect production role"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {coreTechnologies.map((tech) => (
                  <button
                    key={tech.name}
                    data-hero-chip
                    type="button"
                    onMouseEnter={() => setActiveTech(tech)}
                    onMouseLeave={() => setActiveTech(null)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-zinc-700/80 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-100 backdrop-blur-md shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-500 hover:text-zinc-50 hover:bg-zinc-800 active:scale-95 sm:text-sm"
                  >
                    <span className="text-sm text-zinc-300 transition-colors">
                      {tech.icon}
                    </span>
                    <span>{tech.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons & Socials */}
            <div
              data-hero-ctas
              className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4 sm:pt-3"
            >
              <SectionLink
                href="/#projects"
                className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-zinc-50 px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-md transition-all duration-200 hover:bg-zinc-200 hover:scale-[1.002] active:scale-[0.98] sm:w-auto"
              >
                <span>View Projects</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </SectionLink>

              {/* Monochrome Shimmering Resume Button */}
              <a
                href={resumePath}
                download
                className="group relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:scale-101 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 focus:outline-none sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-zinc-50 backdrop-blur-xl transition-colors group-hover:bg-zinc-850 sm:w-auto">
                  <Download size={16} className="text-zinc-50" />
                  <span>Resume</span>
                </span>
              </a>

              {/* Social icons alongside CTAs */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <a
                  href={siteSocial.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-300 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-zinc-500 hover:text-zinc-50 active:scale-95"
                  aria-label="GitHub Profile"
                >
                  <FiGithub size={18} />
                </a>

                <a
                  href={siteSocial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-300 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-zinc-500 hover:text-zinc-50 active:scale-95"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin size={18} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Click to copy email"
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-300 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-zinc-500 hover:text-zinc-50 active:scale-95 cursor-pointer"
                  aria-label="Copy Email"
                >
                  {copiedEmail ? (
                    <Check size={18} className="text-emerald-400" />
                  ) : (
                    <Mail size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Metrics Strip */}
            <div
              data-hero-metrics
              className="grid grid-cols-2 gap-3 border-t border-zinc-700/60 pt-5 sm:grid-cols-4 sm:gap-4 sm:pt-6"
            >
              {highlights.map((item) => (
                <div
                  key={item.label}
                  data-hero-metric
                  className="group flex min-w-0 flex-col justify-start space-y-0.5 rounded-xl p-1.5 transition-colors duration-200 hover:bg-zinc-800/40"
                >
                  <p className="text-xl font-black leading-tight tracking-tight text-zinc-50 transition-colors sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="text-xs font-bold leading-snug text-zinc-200">
                    {item.label}
                  </p>
                  <p className="text-[0.6875rem] font-mono leading-snug text-zinc-400">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Spatial Holographic Portrait & Futuristic HUD Telemetry */}
          <div
            data-hero-portrait-col
            className="order-1 flex flex-col items-center justify-center lg:order-2 lg:col-span-5"
          >
            <div
              data-hero-portrait
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: isHovered ? "transform 0.15s ease-out" : "transform 0.5s ease-out",
              }}
              className="relative mx-auto flex w-full max-w-[20rem] items-center justify-center sm:max-w-[24rem] lg:max-w-none"
            >

              {/* Futuristic HUD Orbit Ring 1 (Dashed) */}
              <div
                data-hero-hud-ring1
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-zinc-400/30 animate-[spin_50s_linear_infinite]"
              />

              {/* Futuristic HUD Orbit Ring 2 (Dotted with coordinates) */}
              <div
                data-hero-hud-ring2
                aria-hidden="true"
                className="pointer-events-none absolute -inset-12 hidden rounded-full border border-dotted border-zinc-400/20 sm:block animate-[spin_80s_linear_infinite_reverse]"
              />

              {/* Corner HUD Ticks */}
              <div aria-hidden="true" className="pointer-events-none absolute -top-8 -left-8 text-[10px] font-mono text-zinc-400 select-none hidden sm:block">
                + [SYS.NODE // 01]
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-8 text-[10px] font-mono text-zinc-400 select-none hidden sm:block">
                [ LATENCY // 0.4MS ] +
              </div>

              {/* Spatial ambient aura glow */}
              <div
                aria-hidden="true"
                className="animate-pulse-glow absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-zinc-400/15 via-zinc-300/10 to-transparent blur-3xl"
              />

              {/* Spatial Glass Portrait Frame */}
              <div className="group relative z-10 aspect-square w-[15.5rem] rounded-full border-2 border-zinc-700/80 bg-zinc-900 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:border-zinc-500 sm:w-[18rem] md:w-[19.5rem]">
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
                <div className="absolute -bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-900 px-3.5 py-1 text-xs font-semibold text-zinc-50 shadow-lg backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-beacon shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span>Backend Specialist</span>
                </div>
              </div>

              {/* Floating Card 1: Production APIs (Top Right) */}
              <div
                data-hero-card-1
                className="animate-float-slow absolute -right-2 top-2 z-20 hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/90 p-3 shadow-lg backdrop-blur-2xl transition-transform duration-300 hover:scale-105 sm:flex sm:items-center sm:gap-3 md:-right-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-50 shadow-xs">
                  <Server size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-50">
                    Production APIs
                  </p>
                  <p className="text-[0.6875rem] font-semibold text-zinc-300">
                    99.9% Target Uptime
                  </p>
                </div>
              </div>

              {/* Floating Card 2: Low Latency / Redis (Bottom Left) */}
              <div
                data-hero-card-2
                className="animate-float-reverse absolute -left-2 bottom-6 z-20 hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/90 p-3 shadow-lg backdrop-blur-2xl transition-transform duration-300 hover:scale-105 sm:flex sm:items-center sm:gap-3 md:-left-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-50 shadow-xs">
                  <Zap size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-50">
                    Low Latency
                  </p>
                  <p className="text-[0.6875rem] font-semibold text-zinc-300">
                    Sub-ms Redis Caching
                  </p>
                </div>
              </div>

            </div>

            {/* Live System Topology Visualizer Strip */}
            <div
              data-hero-topology
              className="mt-8 hidden w-full max-w-sm rounded-2xl border border-zinc-700/80 bg-zinc-900/90 p-3.5 backdrop-blur-xl shadow-lg lg:block"
            >
              <div className="flex items-center justify-between border-b border-zinc-700/60 pb-2 text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-beacon" />
                  SYSTEM TOPOLOGY
                </span>
                <span className="text-zinc-400 font-semibold">LIVE ARCHITECTURE</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-1.5 text-center">
                <div className="flex flex-col items-center">
                  <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-100 shadow-xs">
                    Client
                  </span>
                  <span className="mt-1 text-[9px] font-mono text-zinc-400">HTTPS</span>
                </div>
                
                <div className="relative flex items-center justify-center">
                  <span className="text-xs text-zinc-500">──▶</span>
                  <span className="absolute h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="flex flex-col items-center">
                  <span className="rounded-lg border border-zinc-500 bg-zinc-50 px-2.5 py-1 text-[11px] font-bold text-zinc-950 shadow-md">
                    Nest / Go
                  </span>
                  <span className="mt-1 text-[9px] font-mono text-zinc-400">Core API</span>
                </div>

                <div className="relative flex items-center justify-center">
                  <span className="text-xs text-zinc-500">──▶</span>
                  <span className="absolute h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="flex flex-col items-center">
                  <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-100 shadow-xs">
                    Redis
                  </span>
                  <span className="mt-1 text-[9px] font-mono text-zinc-400">0.4ms</span>
                </div>

                <div className="relative flex items-center justify-center">
                  <span className="text-xs text-zinc-500">──▶</span>
                  <span className="absolute h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="flex flex-col items-center">
                  <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-100 shadow-xs">
                    PostgreSQL
                  </span>
                  <span className="mt-1 text-[9px] font-mono text-zinc-400">ACID</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
