"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiGithub,
} from "react-icons/fi";

interface Project {
  title: string;
  description: string;
  features: string[];
  images: string[];
  live: string;
  code: string;
  sourceNote?: string;
  problem: string;
  architecture: string;
  keyChallenges: string;
  solutions: string;
  futureEnhancements: string;
}

const projectsData: Project[] = [
  {
    title: "HavenKeys",
    description:
      "Real-estate marketplace with RBAC, relational inventory, and Stripe-backed premium listings — built like a small SaaS rather than a static brochure.",
    features: ["Node.js", "Express", "PostgreSQL", "JWT", "Stripe"],
    images: ["/havenkeys-1.png", "/havenkeys-2.png", "/havenkeys-3.png"],
    live: "https://haven-keys.web.app/",
    code: "https://github.com/reazulislam1487",
    sourceNote:
      "Profile link — request the HavenKeys codebase if you need a deeper review.",
    problem:
      "Listings, agents, and buyers each need different permissions; premium placements must not double-charge or leave listings in an inconsistent state when payments retry.",
    architecture:
      "Modular Express service with PostgreSQL as the source of truth for users, roles, and listings. JWT-based access checks on mutating routes, with Stripe used for monetized listing states and server-side validation before writes.",
    keyChallenges:
      "Modeling role-aware filters without leaking cross-tenant data, and keeping listing state aligned with asynchronous payment outcomes.",
    solutions:
      "Explicit RBAC checks on protected REST handlers, relational constraints for core entities, and guarded update paths so premium transitions only occur after verified Stripe signals.",
    futureEnhancements:
      "Redis-backed search caching, a queue for outbound email, and clearer audit trails for administrative actions.",
  },
  {
    title: "Marathon Zone",
    description:
      "Event operations console for organizers plus a participant-facing experience — focused on registration throughput, auth, and trustworthy event data.",
    features: ["Node.js", "Express", "MongoDB", "Firebase Auth", "React"],
    images: ["/marathon-1.png", "/marathon-2.png", "/marathon-3.png"],
    live: "https://marathonzonebyreaz.netlify.app/",
    code: "https://github.com/reazulislam1487/marathon-zone",
    problem:
      "Marathon sign-ups spike around deadlines; organizers still need stable tools to publish events, track participants, and avoid conflicting registrations.",
    architecture:
      "Express API with MongoDB for flexible event documents, Firebase Authentication for identity, and a React client that keeps organizer workflows separate from public registration flows.",
    keyChallenges:
      "Handling bursty writes during open registration while keeping participant rosters accurate for each event instance.",
    solutions:
      "Server-side validation on registration endpoints, careful indexing on high-read paths, and clear separation between organizer mutations and participant-facing reads.",
    futureEnhancements:
      "WebSocket or SSE-based leaderboards, structured analytics exports, and hardened rate limits on registration endpoints.",
  },
  {
    title: "Green Circle",
    description:
      "Subscription-style gardening service with slot booking, admin tooling, and integrity constraints around recurring deliveries.",
    features: ["Express", "MongoDB", "Mongoose", "React", "JWT"],
    images: [
      "/green-circle-1.png",
      "/green-circle-2.png",
      "/green-circle-3.png",
    ],
    live: "https://green-circle-by-reaz.netlify.app",
    code: "https://github.com/reazulislam1487/green-circle",
    problem:
      "Customers compete for limited delivery slots; operators need a trustworthy dashboard without corrupting schedules or double-booking capacity.",
    architecture:
      "Express + Mongoose services with JWT-protected admin routes, MongoDB aggregations for operational metrics, and a React dashboard for day-to-day service management.",
    keyChallenges:
      "Keeping slot inventory consistent when multiple clients attempt to book the same window, and surfacing metrics without expensive ad-hoc scans.",
    solutions:
      "Transactional updates around slot acquisition, indexed queries for dashboard summaries, and layered authorization between customer, staff, and admin personas.",
    futureEnhancements:
      "Worker-based fulfillment notifications, containerized deployment, and clearer service boundaries if the workload splits.",
  },
  {
    title: "Event Hub",
    description:
      "MERN-stack event lifecycle tool with custom authentication and guarded mutations for hosts managing attendees and schedules.",
    features: ["React", "Express", "MongoDB", "Custom auth", "JWT"],
    images: ["/event-hub.png", "/event-hub1.png", "/event-hub2.png"],
    live: "https://event-hub-by-reaz.netlify.app",
    code: "https://github.com/reazulislam1487/event-hub-client",
    problem:
      "Hosts need to create, update, and cancel events without exposing attendee data to the wrong account or leaving half-applied edits live.",
    architecture:
      "Express REST API with MongoDB persistence, custom JWT session handling, and a React SPA that routes sensitive actions through authenticated API calls instead of trusting the client alone.",
    keyChallenges:
      "Implementing auth flows that remain predictable across refreshes, and ensuring destructive actions (cancellations, edits) are authorized and validated server-side.",
    solutions:
      "Centralized auth middleware, explicit ownership checks on event records, and consistent error contracts so the UI cannot mask unauthorized failures.",
    futureEnhancements:
      "Dedicated admin reporting, notification hooks, and background reminders for upcoming events.",
  },
];

interface ImageCarouselProps {
  images: string[];
  title: string;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  title,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={`group/carousel relative overflow-hidden rounded-t-3xl ${className}`}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative h-full w-full flex-shrink-0 bg-zinc-950"
          >
            <Image
              src={img}
              alt={`${title} screenshot ${idx + 1}`}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/80 group-hover/carousel:opacity-100"
            aria-label="Previous image"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/80 group-hover/carousel:opacity-100"
            aria-label="Next image"
          >
            <FiChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
            {images.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={(e) => goToSlide(idx, e)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  idx === currentIndex
                    ? "scale-125 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

function CaseBlock({
  label,
  children,
  tone = "default",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "default" | "muted";
}) {
  return (
    <div>
      <h4
        className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
          tone === "muted" ? "text-zinc-500" : "text-emerald-500/90"
        }`}
      >
        {label}
      </h4>
      <p
        className={`text-sm leading-relaxed ${
          tone === "muted" ? "text-zinc-500" : "text-zinc-400"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" className="bg-black/20">
      <SectionHeader
        title="Selected systems"
        subtitle="Each build below pairs a documented backend contract with a client users can actually run — not a disposable tutorial snapshot."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {projectsData.map((project) => (
          <article
            key={project.title}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          >
            <div className="relative aspect-video w-full">
              <ImageCarousel
                images={project.images}
                title={project.title}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="relative z-10 flex h-full flex-col p-8">
              <h3 className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400">
                {project.title}
              </h3>

              <p className="mb-6 text-[1.05rem] leading-relaxed text-zinc-400">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2.5">
                {project.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-1.5 text-xs font-medium tracking-wide text-zinc-300 shadow-sm transition-colors duration-300 group-hover:border-emerald-500/30"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mb-2 space-y-5 border-t border-zinc-800/50 pt-6">
                <CaseBlock label="Problem">{project.problem}</CaseBlock>
                <CaseBlock label="Architecture">{project.architecture}</CaseBlock>
                <CaseBlock label="Key challenges">{project.keyChallenges}</CaseBlock>
                <CaseBlock label="Solutions">{project.solutions}</CaseBlock>
                <CaseBlock label="Iteration roadmap" tone="muted">
                  {project.futureEnhancements}
                </CaseBlock>
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-zinc-800/50 pt-6 sm:flex-row">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-bold text-zinc-950 shadow-md transition hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={18} />
                  Live environment
                </a>
                <div className="flex flex-col gap-2 sm:ml-auto sm:items-end">
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition hover:scale-[1.02] hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:w-auto active:scale-[0.98]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={18} />
                    Source code
                  </a>
                  {project.sourceNote ? (
                    <p className="max-w-md text-xs leading-snug text-zinc-500 sm:text-right">
                      {project.sourceNote}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
