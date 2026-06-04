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
• Also: HavenKeys, Event Hub, Marathon Zone, Green Circle, and portfolio RAG chatbot (Next.js + OpenAI).

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

/** LinkedIn Projects section entries (newest first) */
export const PROJECTS = [
  {
    name: "Connectify",
    start: { month: "Jan", year: "2026" },
    end: null,
    ongoing: true,
    url: "https://easy-connectify.vercel.app/",
    description:
      "Full-featured real-time messaging and social platform — 1:1 chat (text, images, voice), news feed, friends graph, presence, and ZEGOCLOUD voice/video calls. Next.js 15 + Express + TypeScript + MongoDB + Socket.IO + Redis + AWS S3. Production deploy: Vercel (frontend) and VPS/nginx/PM2 (API + WebSockets).",
    skills: ["Next.js", "Node.js", "MongoDB", "Socket.IO", "TypeScript"],
  },
  {
    name: "Confaero",
    start: { month: "Oct", year: "2025" },
    end: null,
    ongoing: true,
    url: "https://confaero.com/",
    description:
      "Scalable conference platform — QR check-ins, exhibitor lead capture, organizer tooling, and Socket.IO realtime dashboards. Node.js + Express + TypeScript + MongoDB with JWT RBAC across organizer, volunteer, and exhibitor roles.",
    skills: ["Node.js", "TypeScript", "MongoDB", "Socket.IO"],
  },
  {
    name: "Replii",
    start: { month: "Aug", year: "2025" },
    end: null,
    ongoing: true,
    url: "https://replii.ca/",
    description:
      "AI-powered email SaaS — multi-mailbox IMAP/SMTP sync, thread management, and guarded AI reply APIs. NestJS + PostgreSQL + Prisma; transport isolated from AI generation for reliable sync uptime.",
    skills: ["NestJS", "PostgreSQL", "Prisma ORM", "TypeScript"],
  },
  {
    name: "TaskForge",
    start: { month: "Nov", year: "2025" },
    end: { month: "Dec", year: "2025" },
    ongoing: false,
    url: "https://elite-alumni-pool-frontend.vercel.app",
    description:
      "Team project & task collaboration app — JWT RBAC (Admin, Project Manager, Member), Zod validation, business-rule guardrails, Recharts analytics. React 19 + Vite + Express 5 + MongoDB on Vercel serverless.",
    skills: ["React.js", "Node.js", "MongoDB", "TypeScript"],
  },
];
