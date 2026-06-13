/** Portfolio-aligned copy for LinkedIn — source: site config + projectsData + experienceData */

export const HEADLINE =
  "Backend-Focused Full-Stack Engineer | Node.js · NestJS · Go · TypeScript | PostgreSQL · MongoDB · Redis | Socket.IO · REST · Next.js | RAG & SaaS | Open to Opportunities";

export const ABOUT = `I'm Reazul Islam Reaz, a backend-focused full-stack engineer who ships SaaS-style products end to end — disciplined APIs, thoughtful persistence, and frontends that stay thin on business rules.

Currently: Back End Developer at Sparktech Agency (Jan 2026–Present), building production backends for event and conference platforms — REST APIs, RBAC, Socket.IO realtime, QR workflows, and layered Express + TypeScript services.

Previously: Full Stack Developer (Backend-Focused) at Softvence (Sep–Dec 2025) — Node.js APIs, PostgreSQL, and React integration in a team delivery workflow.

CORE STACK
TypeScript · Node.js · Express.js · NestJS · Go · PostgreSQL · MySQL · MongoDB · Redis · React · Next.js · Tailwind CSS · REST APIs · GraphQL · Microservices · Socket.IO · WebRTC · JWT/RBAC · Stripe · Docker · AWS · RAG & AI API integrations

SELECTED PROJECTS (portfolio: reazul-islam-reaz.vercel.app)
• Connectify — Real-time messaging & social platform (Next.js 15, Express, MongoDB, Socket.IO, Redis, AWS S3, ZEGOCLOUD). Live: https://easy-connectify.vercel.app/
• Confaero — Conference ops with QR check-ins & exhibitor leads (Node, TypeScript, MongoDB, Socket.IO). Live: https://confaero.com/
• Replii — AI email SaaS with multi-mailbox IMAP/SMTP sync (NestJS, PostgreSQL, Prisma). Live: https://replii.ca/
• TaskForge — Team project/task collaboration with RBAC & analytics (React 19, Express 5, MongoDB). Live: https://elite-alumni-pool-frontend.vercel.app
• Also: HavenKeys, Marathon Zone, and portfolio RAG chatbot (Next.js + OpenAI).

HOW I WORK
Design modular services and clear API boundaries · Model relational & document schemas · Harden auth, payments, and rate-sensitive flows · Deploy with pragmatic CI/CD · Use AI tools responsibly — architecture and review stay human-owned.

EDUCATION
Bachelor of Social Science (Honors), Political Science — National University of Bangladesh (in progress, expected 2026).

CONTACT
Email: reazul.dev@gmail.com · Portfolio: https://reazul-islam-reaz.vercel.app · GitHub: https://github.com/reazulislamreaz · Open to backend/full-stack roles (remote, hybrid, on-site).`;

export const CONTACT = {
  email: "reazul.dev@gmail.com",
  website: "https://reazul-islam-reaz.vercel.app",
  websiteLabel: "Portfolio — Full-stack & backend projects",
};

export const SKILLS_TO_ADD = [
  "TypeScript",
  "Go (Programming Language)",
  "GraphQL",
  "Socket.IO",
  "Stripe",
  "Docker",
  "Amazon Web Services (AWS)",
  "Retrieval-Augmented Generation (RAG)",
  "Microservices",
  "Express.js",
  "Tailwind CSS",
  "Zod",
];

/**
 * LinkedIn Projects — aligned with src/app/projects/projectsData.ts
 * Media links (live, frontend, backend, dashboard, API host) are derived via
 * getProjectMediaLinks() in projectMediaLinks.ts — sync with:
 *   npx tsx scripts/linkedin-sync-project-media.ts
 */
export const PROJECTS = [
  {
    name: "Connectify",
    start: { month: "Jan", year: "2026" },
    end: null,
    ongoing: true,
    url: "https://easy-connectify.vercel.app/",
    github: "https://github.com/reazulislamreaz/connectify-frontend",
    description:
      "Full-featured real-time messaging and social platform — 1:1 chat (text, images, voice), news feed with likes/comments, friend discovery, online presence, typing indicators, and ZEGOCLOUD voice/video calls.\n\nTech: Next.js 15, React 19, TypeScript, Tailwind CSS, TanStack Query, Node.js, Express, MongoDB, Socket.IO, Redis, AWS S3, JWT, Zod.\n\nDeployed on Vercel (frontend) and VPS with nginx + PM2 (API + WebSockets).",
    skills: ["Next.js", "Node.js", "MongoDB", "Socket.IO", "TypeScript"],
  },
  {
    name: "Confaero",
    start: { month: "Oct", year: "2025" },
    end: null,
    ongoing: true,
    url: "https://confaero.com/",
    github: "https://github.com/reazulislamreaz/confaero-backend",
    description:
      "Scalable conference platform for real-world events — QR check-ins, exhibitor lead capture, organizer tooling, and low-latency attendee interactions.\n\nTech: Node.js, Express, TypeScript, MongoDB, JWT, React, Socket.IO, WebRTC.\n\n~40% lower p95 latency on check-in APIs after compound MongoDB indexes. Zero duplicate check-ins under concurrent QR scan bursts.",
    skills: ["Node.js", "TypeScript", "MongoDB", "Socket.IO"],
  },
  {
    name: "Replii",
    start: { month: "Aug", year: "2025" },
    end: null,
    ongoing: true,
    url: "https://replii.ca/",
    github: "https://github.com/reazulislamreaz/twvinfast-server-full",
    description:
      "AI-powered email SaaS for teams — multi-mailbox IMAP/SMTP sync, thread management, and guarded AI reply APIs with transport isolated from AI generation.\n\nTech: NestJS, TypeScript, PostgreSQL, Prisma ORM, IMAP, SMTP, AI integration.\n\n~50% faster thread list queries after PostgreSQL indexing. Sync uptime unaffected by AI model timeouts.",
    skills: ["NestJS", "PostgreSQL", "Prisma ORM", "TypeScript"],
  },
  {
    name: "TaskForge",
    start: { month: "Nov", year: "2025" },
    end: { month: "Dec", year: "2025" },
    ongoing: false,
    url: "https://elite-alumni-pool-frontend.vercel.app",
    github: "https://github.com/reazulislamreaz/elite-alumni-pool-frontend",
    description:
      "Team project & task collaboration app — JWT RBAC (Admin, Project Manager, Team Member), Zod validation, business-rule guardrails, and Recharts analytics dashboard.\n\nTech: React 19, Vite, TypeScript, TanStack Query, Zustand, Node.js, Express 5, MongoDB, Mongoose, JWT.\n\nDeployed serverless on Vercel with MongoDB Atlas.",
    skills: ["React.js", "Node.js", "MongoDB", "TypeScript"],
  },
  {
    name: "HavenKeys",
    start: { month: "May", year: "2025" },
    end: { month: "Jul", year: "2025" },
    ongoing: false,
    url: "https://haven-keys.web.app/",
    github: "https://github.com/reazulislamreaz/haven-keys-client-side",
    description:
      "Real-estate marketplace with RBAC and Stripe-backed premium listings — built like a small SaaS, not a brochure site.\n\nTech: React, Node.js, Express, MongoDB, JWT, Stripe.\n\nIdempotent Stripe webhooks prevent double-charged premium placements. RBAC-enforced API layer with scoped listing queries per persona.",
    skills: ["React.js", "MongoDB", "Stripe", "Node.js"],
  },
  {
    name: "Marathon Zone",
    start: { month: "Jun", year: "2025" },
    end: { month: "Jul", year: "2025" },
    ongoing: false,
    url: "https://marathonzonebyreaz.netlify.app/",
    github: "https://github.com/reazulislamreaz/marathon-zone",
    description:
      "Marathon registration platform that survives deadline spikes — organizer console plus a fast public signup flow.\n\nTech: Node.js, Express, MongoDB, Firebase Auth, React.\n\nStable registration throughput during deadline spikes with indexed write paths. Server-side validation blocks conflicting registrations.",
    skills: ["React.js", "Node.js", "MongoDB", "Firebase"],
  },
];
