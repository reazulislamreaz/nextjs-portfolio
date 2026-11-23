export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface Project {
  title: string;
  /** One-line hook for the collapsed card — problem + audience + impact */
  tagline: string;
  description: string;
  /** Core technology names shown as stack chips */
  features: string[];
  metrics: string[];
  devOps: string[];
  images: string[];
  live: string;
  code: string;
  sourceNote?: string;
  problem: string;
  architecture: string;
  /** Optional layered flow for case-study diagrams */
  architectureFlow?: string[];
  challengeSolutions: ChallengeSolution[];
  futureEnhancements: string;
}

export const projectsData: Project[] = [
  {
    title: "Elevate Apparel — E-Commerce Platform",
    tagline:
      "Live apparel commerce — faceted search, variant stock reservations, and a role-gated NestJS admin API that keeps checkout and inventory consistent.",
    description:
      "Production e-commerce system for a live merchant: Next.js storefront with server-side faceted search and optimistic cart UX, NestJS REST API with JWT/RBAC, PostgreSQL via Prisma, and Redis + BullMQ workers for cart recovery, outbox relay, CRM backfills, and export jobs.",
    features: [
      "NestJS 11",
      "PostgreSQL 17",
      "Prisma 7",
      "Redis 7",
      "BullMQ",
      "JWT",
      "RBAC",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS 4",
      "Class Validator",
      "Pino Logger",
      "Swagger",
    ],
    metrics: [
      "Live on elevateapparel.com.bd",
      "BullMQ workers for outbox relay, CRM backfills, and cart recovery",
      "Server-side inventory reservations with expiry jobs to prevent double-booking",
      "Role-gated /admin console (ADMIN/SUPER_ADMIN) with analytics and CSV/XLSX exports",
      "Monorepo workspace for Next.js storefront and NestJS API",
    ],
    devOps: [
      "Production deploy (elevateapparel.com.bd)",
      "Next.js 16 (App Router)",
      "NestJS 11 REST API (/api/v1)",
      "PostgreSQL 17 (Prisma 7)",
      "Redis 7 & BullMQ workers",
      "Docker multi-stage builds",
      "GitHub Actions CI / CD",
    ],
    images: [
      "/ecommerce-platform-home.webp",
      "/ecommerce-platform-catalog.webp",
      "/ecommerce-platform-product-detail.webp",
      "/ecommerce-platform-admin-dashboard.png",
      "/ecommerce-platform-admin-orders.png",
    ],
    live: "https://elevateapparel.com.bd/",
    code: "https://github.com/reazulislamreaz/private-projects",
    sourceNote:
      "Workspace: ecommerce-platform · Frontend (Next.js 16): https://elevateapparel.com.bd · Backend: NestJS 11 versioned REST API (/api/v1) with Swagger docs, not publicly exposed",
    problem:
      "A live apparel merchant needed a fast faceted storefront and a secure admin console for orders, variant stock, CRM, and analytics — without checkout and inventory drifting apart under concurrent carts.",
    architecture:
      "Monorepo: Next.js 16 App Router (Redux Toolkit + TanStack Query) over a NestJS 11 versioned REST API. PostgreSQL 17 with Prisma 7 models the catalog, carts, orders, and RBAC. Rotating HTTP-only refresh JWTs guard customer and admin surfaces. Redis 7 + BullMQ run inventory reservation expiry, outbox relay, CRM backfills, cart recovery, and heavy CSV/XLSX exports off the request path.",
    architectureFlow: [
      "Next.js storefront & admin",
      "NestJS REST API (/api/v1)",
      "Auth · RBAC · domain services",
      "PostgreSQL (Prisma)",
      "Redis + BullMQ workers",
      "Outbox · CRM · cart recovery · exports",
    ],
    challengeSolutions: [
      {
        challenge:
          "Concurrent cart updates risked double-booking variant stock during peak traffic.",
        solution:
          "Server-side inventory reservations with BullMQ expiry/cancellation jobs, plus an optimistic Redux cart projection that reconciles against reservation state.",
      },
      {
        challenge:
          "Customer operations and admin reporting needed strict separation without leaking sensitive metrics.",
        solution:
          "JWT access tokens with rotating HTTP-only refresh cookies and NestJS RBAC guards limited to ADMIN and SUPER_ADMIN for privileged routes.",
      },
      {
        challenge:
          "Complex order filters and analytics exports slowed the API when run inline.",
        solution:
          "Prisma compound indexes and selective projection on hot queries; CSV/XLSX generation moved to BullMQ workers so the request path stays light.",
      },
    ],
    futureEnhancements:
      "Payment gateway integrations (SSLCommerz/Stripe), multi-tenant store support, push notifications, and inventory sync webhooks.",
  },
  {
    title: "Your Academy",
    tagline:
      "Bangladesh's largest online MCQ question bank for government job prep — NestJS RBAC, Redis/BullMQ workers, and backend-enforced answer privacy behind subscriptions.",
    description:
      "MCQ-based EdTech platform for BCS, Bank, Primary, and NTRCA exam prep: Preli and Written question banks, three-level topic practice, timed Model Tests, bookmarks, news, and an Admin/Moderator dashboard — built as a Turborepo monorepo (Next.js frontend, NestJS API, BullMQ worker, shared types).",
    features: [
      "Next.js 15",
      "NestJS 11",
      "TypeScript",
      "PostgreSQL",
      "Prisma 6",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "TanStack Query",
      "Tailwind CSS 4",
      "Cloudinary",
      "JWT",
      "Argon2id",
      "RBAC",
      "Turborepo",
    ],
    metrics: [
      "38,804+ published MCQs across 445 collections, live on youracademy.com.bd",
      "Preli, Written, and three-level topic-based question banks plus timed Model Tests",
      "Answers, correctness, and explanations omitted from the API itself unless Admin or active subscriber — never filtered client-side",
      "Guest and authenticated timed exams with timer/review tracking, separate from the learner practice bank",
      "Admin/Moderator RBAC dashboard with homepage CMS, news publishing, and permission-gated routes",
    ],
    devOps: [
      "Live on youracademy.com.bd",
      "Next.js 15 (App Router) + NestJS 11 REST API (/api/v1)",
      "PostgreSQL + Prisma 6 (25+ tracked migrations)",
      "Redis + dedicated BullMQ worker process",
      "Docker Compose + Nginx, GitHub Actions CI/CD",
      "pnpm workspaces + Turborepo monorepo",
    ],
    images: [
      "/your-academy-home.webp",
      "/your-academy-features.webp",
      "/your-academy-dashboard.webp",
      "/your-academy-preli-bank.webp",
    ],
    live: "https://youracademy.com.bd",
    code: "https://github.com/reazulislamreaz/your-academy",
    sourceNote:
      "Monorepo: frontend/ (Next.js), backend/ (NestJS + Prisma), worker/ (BullMQ), shared/ (types) in one repo.",
    problem:
      "Job seekers preparing for BCS, Bank, Primary, and NTRCA exams needed one platform combining a huge categorized MCQ/written bank and timed model tests — without leaking correct answers and explanations to non-subscribers.",
    architecture:
      "Turborepo monorepo: Next.js 15 App Router frontend, NestJS 11 REST API (/api/v1) with Prisma 6 on PostgreSQL, and a separate BullMQ worker process, sharing types via a `shared` package. JWT access/refresh tokens ride HTTP-only cookies with CSRF double-submit protection and Argon2id hashing; RBAC gates Admin/Moderator dashboard routes. Redis backs BullMQ jobs and Socket.IO scaling, and Cloudinary handles media behind a StorageService abstraction.",
    architectureFlow: [
      "Next.js 15 frontend",
      "NestJS 11 REST API (/api/v1)",
      "JWT · CSRF · Argon2id · RBAC",
      "PostgreSQL (Prisma 6)",
      "Redis + BullMQ worker",
      "Cloudinary storage",
    ],
    challengeSolutions: [
      {
        challenge:
          "Free users browsing the question bank could see correct answers and explanations meant for subscribers only.",
        solution:
          "Access control enforced entirely in the API — answers, correctness indicators, and explanations are omitted from the response itself unless the requester is Admin or holds an active subscription, never filtered on the client.",
      },
      {
        challenge:
          "Guest and authenticated users both needed timed exams without duplicating the core question bank.",
        solution:
          "Separate Exam/ExamQuestion/ExamAttempt models for guest timed exams and Model Tests, kept apart from the learner Question + PracticeSet bank, with dedicated timer/review tracking migrations.",
      },
      {
        challenge:
          "A 38k+ question bank needed fast category, topic, and date-based lookups without slow admin queries.",
        solution:
          "A three-level topic hierarchy with targeted list-query and created_at indexes, plus partial unique constraints to keep bulk question-upload batches consistent.",
      },
      {
        challenge:
          "A compromised session shouldn't keep a learner logged in everywhere, but staff needed more flexibility.",
        solution:
          "Single-session enforcement for learners — a new login revokes other sessions with a 401 SESSION_REPLACED — with an opt-in staff flag for multi-session access.",
      },
    ],
    futureEnhancements:
      "Self-serve subscription payments (subscriptions are currently admin-granted manually), horizontal Socket.IO scaling via the Redis adapter, and expanded analytics on the admin KPI dashboard.",
  },
  {
    title: "J&K Cabinetry CT",
    tagline:
      "Wholesale cabinetry for dealers and showrooms — verified accounts, catalog checkout, and realtime admin messaging across three production apps.",
    description:
      "Full-stack wholesale cabinetry platform for dealers, contractors, and showrooms. Next.js customer site with catalog and checkout, React admin dashboard for users and inventory, and a TypeScript Express API with MongoDB, S3 uploads, Stripe, and Socket.IO messaging — all live on jkcabinetryct.com.",
    features: [
      "Next.js 16",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
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
      "Three live hosts — storefront, dashboard, and API",
      "Wholesale registration with document upload and admin verification",
      "Real-time inbox messaging between customers and admins via Socket.IO",
      "Role-based access — customer, admin, and super_admin with guarded routes",
      "Catalog, collections, cabinetry, stock parts, orders, and checkout",
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
      "/jk-cabinetry-home.webp",
      "/jk-cabinetry-collections.png",
      "/jk-cabinetry-customer-dashboard.png",
      "/jk-cabinetry-customer-messages.png",
      "/jk-cabinetry-admin-users.png",
      "/jk-cabinetry-admin-orders.png",
    ],
    live: "https://jkcabinetryct.com/",
    code: "https://github.com/reazulislamreaz/jk-cabinetryct-frontend",
    sourceNote:
      "Frontend: https://github.com/reazulislamreaz/jk-cabinetryct-frontend · Dashboard: https://github.com/reazulislamreaz/jk-cabinetryct-dashboard · Backend: https://github.com/reazulislamreaz/jk-cabinetryct-backend · Admin: https://dashboard.jkcabinetryct.com · API: https://api.jkcabinetryct.com/api/v1/docs",
    problem:
      "A wholesale cabinetry supplier needed a public marketing and ordering site, an admin console to verify dealers and manage inventory, and a secure API tying catalog, orders, uploads, and messaging together.",
    architecture:
      "Next.js 16 customer frontend with RTK Query and Redux Persist cart. React + Vite admin dashboard with Ant Design and role guards. Express + TypeScript API on MongoDB with JWT auth, S3 media, Stripe payments, and Socket.IO for inbox sync.",
    architectureFlow: [
      "Storefront & admin dashboard",
      "Express + TypeScript API",
      "JWT · roles · validation",
      "MongoDB",
      "AWS S3 · Stripe",
      "Socket.IO inbox",
    ],
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
    title: "Confaero",
    tagline:
      "Conference ops platform — QR check-ins, exhibitor lead capture, JWT RBAC, and Socket.IO sync with duplicate-safe writes.",
    description:
      "Event operations system spanning organizer tooling, attendee/exhibitor workflows, and a Google Play app: Express + TypeScript API on MongoDB, JWT RBAC across personas, Socket.IO for live roster and session sync, WebRTC for low-latency P2P, and QR check-in/lead flows designed for concurrent scans.",
    features: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "JWT",
      "RBAC",
      "Socket.IO",
      "WebRTC",
      "React",
    ],
    metrics: [
      "Published to Google Play as an organizer/attendee app",
      "Unique constraints and server validation block duplicate check-ins on concurrent QR scans",
      "Compound MongoDB indexes on check-in and lead read paths",
      "Role-scoped Socket.IO broadcasts keep rosters and dashboards in sync",
      "Separated WebRTC signaling from domain writes to protect data integrity",
    ],
    devOps: [
      "Google Play release",
      "MongoDB Atlas",
      "Docker",
      "CI/CD · GitHub Actions",
      "Nginx reverse proxy",
    ],
    images: [
      "/confaero-dashboard.jpg",
      "/confaero-invitations.jpg",
      "/confaero-reviewer.jpg",
    ],
    live: "https://play.google.com/store/apps/details?id=confaero.com.app",
    code: "https://github.com/reazulislamreaz/confaero-backend",
    sourceNote:
      "Dashboard (React / Vite): https://github.com/reazulislamreaz/confaero-dashboard",
    problem:
      "Large events need reliable registration, QR check-ins, exhibitor lead capture, and live dashboards — without duplicate records when many devices scan at once.",
    architecture:
      "Express + TypeScript API with JWT-authenticated RBAC for Admin, Organizer, Volunteer, Attendee, and Exhibitor. MongoDB schemas use compound indexes on check-in and lead hot paths. Socket.IO rooms are event-scoped for roster and session sync. WebRTC handles P2P media separately from domain mutation APIs so realtime media never races critical writes.",
    architectureFlow: [
      "Organizer dashboard & Play app",
      "Express + TypeScript API",
      "JWT · RBAC · validation",
      "MongoDB (indexed check-ins & leads)",
      "Socket.IO event rooms",
      "WebRTC P2P (signaling only)",
    ],
    challengeSolutions: [
      {
        challenge:
          "Concurrent QR scans at doors and booths threatened duplicate check-ins and lead rows.",
        solution:
          "Unique constraints, server-side validation, and compound indexes on the write/read paths so duplicate scans fail safely instead of creating extra records.",
      },
      {
        challenge:
          "Exhibitor leads and organizer dashboards had to stay consistent under bursty event traffic.",
        solution:
          "Role-aware service boundaries and scoped Socket.IO broadcasts so each persona only receives the events it is allowed to see.",
      },
      {
        challenge:
          "WebRTC sessions could interfere with domain integrity if mixed into the same write path.",
        solution:
          "Kept signaling and P2P channels separate from check-in/lead mutations, with guarded API contracts for each surface.",
      },
    ],
    futureEnhancements:
      "Redis caching on hot roster reads, API rate limits, and horizontal Socket.IO scaling for larger venues.",
  },
  {
    title: "HavenKeys",
    tagline:
      "Real-estate marketplace with RBAC and Stripe premium listings.",
    description:
      "Real-estate marketplace with RBAC, relational inventory, and Stripe-backed premium listings.",
    features: ["React", "Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    metrics: [
      "Indexed role-aware listing queries for search and filtering",
      "Idempotent Stripe webhooks so payment retries cannot double-charge a premium placement",
      "RBAC enforced on every protected route, with query paths scoped per persona",
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
    images: ["/havenkeys-1.webp", "/havenkeys-2.webp", "/havenkeys-3.webp"],
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
    title: "Marathon Zone",
    tagline:
      "Marathon registration — organizer console and public signup with validated, indexed writes.",
    description:
      "Event ops console for organizers and participant signup — registration flow, Firebase Auth, and validated event data.",
    features: ["Node.js", "Express", "MongoDB", "Firebase Auth", "React"],
    metrics: [
      "Separate organizer and public registration endpoints with indexed hot paths",
      "MongoDB aggregation pipelines for roster and event listing reads",
      "Server-side validation rejects conflicting registrations",
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
    images: ["/marathon-1.webp", "/marathon-2.webp", "/marathon-3.webp"],
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
        solution:
          "MongoDB aggregation pipelines with projection, replacing per-row lookups on the roster read path.",
      },
    ],
    futureEnhancements:
      "Live leaderboards, analytics exports, and rate limits on registration.",
  },
];
