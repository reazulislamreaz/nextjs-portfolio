export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface Project {
  title: string;
  /** One-line hook for the collapsed card — problem + audience + impact */
  tagline: string;
  description: string;
  features: string[];
  metrics: string[];
  devOps: string[];
  images: string[];
  live: string;
  code: string;
  sourceNote?: string;
  problem: string;
  architecture: string;
  challengeSolutions: ChallengeSolution[];
  futureEnhancements: string;
}

export const projectsData: Project[] = [
  {
    title: "J&K Cabinetry CT",
    tagline:
      "Wholesale cabinetry platform — customer portal, admin dashboard, and REST API in production.",
    description:
      "Full-stack wholesale cabinetry platform for dealers, contractors, and showrooms. Next.js customer site with catalog and checkout, React admin dashboard for users and inventory, and a TypeScript Express API with MongoDB, S3 uploads, Stripe, and Socket.IO messaging — all live on jkcabinetryct.com.",
    features: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "React 18",
      "Vite",
      "Ant Design",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Socket.IO",
      "AWS S3",
      "Stripe",
      "Zod",
    ],
    metrics: [
      "Three production apps — customer site, admin dashboard, and REST API",
      "Wholesale registration with document upload and admin verification workflow",
      "Real-time inbox messaging between customers and admins via Socket.IO",
      "Role-based access — customer, admin, and super_admin with guarded routes",
      "Catalog, collections, cabinetry, stock parts, orders, and checkout flow",
    ],
    devOps: [
      "Production deploy (jkcabinetryct.com)",
      "Admin dashboard (dashboard.jkcabinetryct.com)",
      "API host (api.jkcabinetryct.com)",
      "MongoDB",
      "AWS S3",
      "Nginx reverse proxy",
      "PM2 / VPS",
    ],
    images: [
      "/jk-cabinetry-home.png",
      "/jk-cabinetry-registration.png",
      "/jk-cabinetry-dashboard-users.png",
      "/jk-cabinetry-dashboard-collections.png",
      "/jk-cabinetry-dashboard-cabinets.png",
    ],
    live: "https://jkcabinetryct.com/",
    code: "https://github.com/reazulislamreaz/jk-cabinetryct-frontend",
    sourceNote:
      "Frontend: https://github.com/reazulislamreaz/jk-cabinetryct-frontend · Dashboard: https://github.com/reazulislamreaz/jk-cabinetryct-dashboard · Backend: https://github.com/reazulislamreaz/jk-cabinetryct-backend · Admin: https://dashboard.jkcabinetryct.com · API: https://api.jkcabinetryct.com/api/v1/docs",
    problem:
      "A wholesale cabinetry supplier needed a public marketing and ordering site, an admin console to verify dealers and manage inventory, and a secure API tying catalog, orders, uploads, and messaging together.",
    architecture:
      "Next.js 16 customer frontend with RTK Query and Redux Persist cart. React + Vite admin dashboard with Ant Design and role guards. Express + TypeScript API on MongoDB with JWT auth, S3 media, Stripe payments, and Socket.IO for inbox sync.",
    challengeSolutions: [
      {
        challenge:
          "Three separate apps had to share auth, catalog data, and real-time messaging without drift.",
        solution:
          "Single Express API with versioned REST routes, JWT refresh, and Socket.IO rooms scoped per user and role.",
      },
      {
        challenge:
          "New wholesale accounts needed document review before catalog and pricing access.",
        solution:
          "Registration flow with file uploads to S3 and an admin verification queue in the dashboard.",
      },
      {
        challenge:
          "Admins and customers needed live inbox chat alongside order and profile management.",
        solution:
          "Socket.IO client on both frontends with token-authenticated connections and persisted message history.",
      },
      {
        challenge:
          "Large product catalogs with collections, cabinetry lines, and stock parts required structured CRUD.",
        solution:
          "Modular admin modules for collections, categories, cabinetry, and parts with image upload pipelines.",
      },
    ],
    futureEnhancements:
      "Order analytics, inventory alerts, bulk import/export, push notifications, and API observability dashboards.",
  },
  {
    title: "Connectify",
    tagline:
      "WhatsApp-style social app — chat, feed, friends, and voice/video calls.",
    description:
      "Messaging and social app with Next.js 15 frontend and TypeScript Express API. Real-time chat, feed, friends, presence, and ZEGOCLOUD calls — deployed on Vercel and a VPS.",
    features: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Redis",
      "AWS S3",
      "ZEGOCLOUD",
      "JWT",
      "Zod",
    ],
    metrics: [
      "Real-time messaging with typing, read receipts, and presence",
      "Feed with posts, comments, likes, and S3 media",
      "Friend graph with discovery and paginated search",
      "Voice/video via ZEGOCLOUD tokens and WebSocket signaling",
      "Redis cache and optional Socket.IO adapter for scale",
    ],
    devOps: [
      "Vercel (frontend)",
      "VPS + nginx + PM2",
      "MongoDB",
      "Redis",
      "AWS S3",
      "DuckDNS API host",
      "WebSocket (wss)",
    ],
    images: [
      "/connectify-feed.png",
      "/connectify-profile.png",
      "/connectify-discover.png",
      "/connectify-friends.png",
      "/connectify-chat.png",
    ],
    live: "https://easy-connectify.vercel.app/",
    code: "https://github.com/reazulislamreaz/connectify-frontend",
    sourceNote:
      "Backend: https://github.com/reazulislamreaz/connectify-backend · API: https://easyconnectify.duckdns.org",
    problem:
      "Users want one app for messaging, social feed, friends, and calls — with reliable realtime sync and secure sessions.",
    architecture:
      "Next.js client with React Query and Socket.IO; Express + TypeScript API with Zod and JWT. MongoDB for users, messages, posts, friends; S3 for media; Redis for cache and multi-instance sockets.",
    challengeSolutions: [
      {
        challenge: "Vercel frontend needed secure WebSocket backend without mixed content.",
        solution:
          "wss:// on DuckDNS with `/socket.io`, JWT socket auth, and CORS allowlists.",
      },
      {
        challenge: "1:1 chat needed live delivery, typing, and read receipts across reconnects.",
        solution:
          "Per-user Socket.IO rooms, persisted CRUD, and S3 voice uploads up to 60s.",
      },
      {
        challenge: "Presence and call signaling had to scale beyond one Node process.",
        solution:
          "Friend-scoped presence, Redis cache invalidation, and Socket.IO Redis adapter.",
      },
      {
        challenge: "Feed and chat needed validated APIs with consistent errors.",
        solution:
          "Modular Express modules with Zod middleware and standard `{ success, data | message }` responses.",
      },
    ],
    futureEnhancements:
      "Group chats, push notifications, message search, moderation, and API/socket observability.",
  },
  {
    title: "Confaero",
    tagline:
      "Conference ops — QR check-ins and exhibitor leads without duplicates under load.",
    description:
      "Conference platform with QR check-ins, exhibitor lead capture, organizer tooling, and real-time attendee interactions.",
    features: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "JWT",
      "React",
      "Socket.IO",
      "WebRTC",
    ],
    metrics: [
      "~40% lower p95 latency on check-in APIs after compound indexes",
      "Zero duplicate check-ins under concurrent QR bursts",
      "Real-time roster sync via scoped Socket.IO broadcasts",
      "Lazy-loaded dashboards and optimized images for faster paint",
    ],
    devOps: [
      "Production deploy",
      "MongoDB Atlas",
      "Docker",
      "CI/CD · GitHub Actions",
      "Redis (caching layer)",
      "Nginx reverse proxy",
    ],
    images: [
      "/confaero-dashboard.jpg",
      "/confaero-invitations.jpg",
      "/confaero-reviewer.jpg",
      "/confaero-mobile.jpg",
    ],
    live: "http://confaero.com/",
    code: "https://github.com/reazulislamreaz/confaero-backend",
    sourceNote:
      "Dashboard (React / Vite): https://github.com/reazulislamreaz/confaero-dashboard",
    problem:
      "Large events need reliable check-ins, lead capture, and live dashboards without duplicate records under concurrent writes.",
    architecture:
      "Node.js + Express + TypeScript API. MongoDB with compound indexes. JWT RBAC. Socket.IO for event sync; WebRTC for low-latency P2P.",
    challengeSolutions: [
      {
        challenge: "Concurrent QR scans threatened duplicate check-ins.",
        solution: "Unique constraints, server validation, and compound indexes on hot paths.",
      },
      {
        challenge: "Exhibitor leads and dashboards had to stay consistent under load.",
        solution: "Role-aware services and scoped Socket.IO broadcasts.",
      },
      {
        challenge: "WebRTC signaling had to avoid double-booked connections.",
        solution: "Separated P2P channels from domain writes with guarded API contracts.",
      },
    ],
    futureEnhancements:
      "Microservices split, Redis caching, rate limits, RAG attendee insights, and WebRTC scaling.",
  },
  {
    title: "Replii",
    tagline:
      "AI email SaaS — multi-mailbox sync and smart replies on NestJS + PostgreSQL.",
    description:
      "AI email SaaS for inbox management, automated replies, and multi-mailbox handling. NestJS backend for protocol integration and clean APIs.",
    features: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "IMAP",
      "SMTP",
      "AI integration",
    ],
    metrics: [
      "~50% faster thread queries after PostgreSQL indexing and Prisma tuning",
      "AI failures isolated from mail transport — sync stays up",
      "Multi-mailbox sync with bounded retry on provider edge cases",
      "Structured logging for faster production debugging",
    ],
    devOps: [
      "Production SaaS deploy",
      "PostgreSQL",
      "Docker",
      "CI/CD pipeline",
      "AWS S3 (asset storage)",
      "BullMQ · Redis (queued mail jobs)",
    ],
    images: [
      "/replii-inbox.jpg",
      "/replii-thread-ai.jpg",
      "/replii-signin.jpg",
      "/replii-dashboard.jpg",
    ],
    live: "https://replii.ca/",
    code: "https://github.com/reazulislamreaz/twvinfast-server-full",
    sourceNote:
      "Backend repo: twvinfast-server-full — powers Replii mail, sync, and AI reply APIs.",
    problem:
      "Teams juggle multiple inboxes and expect AI replies — without sync drift, silent send failures, or unsafe automation.",
    architecture:
      "NestJS + PostgreSQL + Prisma. Per-user mailboxes, IMAP sync, SMTP outbound, and AI behind guarded APIs — transport isolated from generation.",
    challengeSolutions: [
      {
        challenge: "IMAP state had to stay consistent across multiple mailboxes.",
        solution: "Mailbox services with bounded retry for provider edge cases.",
      },
      {
        challenge: "SMTP quirks could corrupt threads or double-send.",
        solution: "Defensive outbound handling and APIs that isolate mail from AI.",
      },
      {
        challenge: "AI timeouts could not break core mail sync.",
        solution: "Bounded failure domains — model errors stay isolated from IMAP/SMTP.",
      },
    ],
    futureEnhancements:
      "BullMQ queues, rate limits, RAG reply workflows, delivery analytics, and transport/AI service split.",
  },
  {
    title: "HavenKeys",
    tagline:
      "Real-estate marketplace with RBAC and Stripe premium listings.",
    description:
      "Real-estate marketplace with RBAC, relational inventory, and Stripe-backed premium listings.",
    features: ["React", "Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    metrics: [
      "~35% faster listing searches after indexed role-aware queries",
      "Idempotent Stripe webhooks — no double-charged placements",
      "RBAC API layer with zero cross-tenant leaks in testing",
      "Code-split routes for smaller mobile bundles",
    ],
    devOps: [
      "Firebase Hosting",
      "Express API deploy",
      "MongoDB",
      "Stripe webhooks",
      "CI/CD",
      "Docker (local dev)",
    ],
    images: ["/havenkeys-1.png", "/havenkeys-2.png", "/havenkeys-3.png"],
    live: "https://haven-keys.web.app/",
    code: "https://github.com/reazulislamreaz/haven-keys-client-side",
    sourceNote: "Client repo — server API in a separate backend repo.",
    problem:
      "Listings need role-based permissions; premium placements must not double-charge on payment retries.",
    architecture:
      "MERN stack with modular Express API. MongoDB for users, roles, listings. JWT RBAC; Stripe webhooks verified before state changes.",
    challengeSolutions: [
      {
        challenge: "Role-aware filters risked cross-tenant data leaks.",
        solution: "RBAC on protected routes and scoped query paths per persona.",
      },
      {
        challenge: "Stripe retries could double-charge or leave listings in limbo.",
        solution: "Idempotent webhooks — premium transitions only after verified payment.",
      },
    ],
    futureEnhancements:
      "Redis search caching, outbound email queue, and admin audit trails.",
  },
  {
    title: "TaskForge",
    tagline:
      "Team project management — role-based CRUD, analytics, and business-rule guardrails.",
    description:
      "Collaborative project management for teams. React 19 + Vite frontend with TypeScript Express API — JWT auth, three roles, task lifecycle, and analytics dashboard on Vercel.",
    features: [
      "React 19",
      "Vite",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Recharts",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "Zod",
      "JWT",
      "bcrypt",
    ],
    metrics: [
      "Three roles with server-enforced permissions",
      "Business rules block duplicate titles and invalid reassignment",
      "Analytics dashboard with KPI cards and Recharts views",
      "Comments, attachments, activity logs, and workload summaries",
      "Search, filter, sort, and pagination with dark/light mode",
    ],
    devOps: [
      "Vercel (frontend)",
      "Vercel serverless (Express handler)",
      "MongoDB Atlas",
      "JWT auth middleware",
      "Env-based config + CORS",
      "Auto-seeded demo accounts",
    ],
    images: [
      "/taskforge-dashboard.png",
      "/taskforge-projects.png",
      "/taskforge-tasks.png",
      "/taskforge-team.png",
      "/taskforge-dashboard-dark.png",
    ],
    live: "https://elite-alumni-pool-frontend.vercel.app",
    code: "https://github.com/reazulislamreaz/elite-alumni-pool-frontend",
    sourceNote:
      "Backend: https://github.com/reazulislamreaz/elite-alumni-pool-backend · Demo: Admin / PM / Member (Demo@123456).",
    problem:
      "Teams need clear ownership and guardrails — without anyone editing anything or reassigning completed work.",
    architecture:
      "React 19 + Vite with TanStack Query and Recharts. Express 5 API with Mongoose, Zod, JWT + bcrypt, and three-role RBAC. MongoDB Atlas; serverless on Vercel.",
    challengeSolutions: [
      {
        challenge: "Three roles needed distinct capabilities — not client-side auth.",
        solution: "Server RBAC on every mutating route; signup creates Team Members only.",
      },
      {
        challenge: "Bad operations had to be blocked before the database.",
        solution: "Zod validation plus domain rules with consistent error contracts.",
      },
      {
        challenge: "Express on Vercel without a long-lived server.",
        solution: "Serverless handler, auto-seeded demos, and CLIENT_URL CORS allowlist.",
      },
    ],
    futureEnhancements:
      "WebSocket notifications, S3/Cloudinary attachments, audit trails, and saved views.",
  },
  {
    title: "Marathon Zone",
    tagline:
      "Marathon registration that survives deadline spikes — organizer console and public signup.",
    description:
      "Event ops console for organizers and participant signup — registration throughput, auth, and reliable event data.",
    features: ["Node.js", "Express", "MongoDB", "Firebase Auth", "React"],
    metrics: [
      "Stable registration throughput during deadline spikes",
      "~30% faster roster loads after aggregation tuning",
      "Server validation blocked conflicting registrations",
      "Lazy-loaded public flow for mobile performance",
    ],
    devOps: [
      "Netlify (frontend)",
      "Express API hosting",
      "MongoDB Atlas",
      "Firebase Auth",
      "CI/CD",
      "Environment-based config",
    ],
    images: ["/marathon-1.png", "/marathon-2.png", "/marathon-3.png"],
    live: "https://marathonzonebyreaz.netlify.app/",
    code: "https://github.com/reazulislamreaz/marathon-zone",
    problem:
      "Sign-ups spike near deadlines; organizers need stable tools without conflicting registrations.",
    architecture:
      "Express API with MongoDB event documents. Firebase Auth. React client with separate organizer vs. public endpoints.",
    challengeSolutions: [
      {
        challenge: "Bursty writes threatened roster accuracy.",
        solution: "Server validation, indexing on hot paths, and separate organizer/participant endpoints.",
      },
      {
        challenge: "Rosters needed to load quickly mid-event.",
        solution: "MongoDB aggregation tuning — ~30% faster loads.",
      },
    ],
    futureEnhancements:
      "Live leaderboards, analytics exports, and rate limits on registration.",
  },
];
