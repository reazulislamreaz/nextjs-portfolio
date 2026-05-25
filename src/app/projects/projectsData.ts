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
    title: "Connectify",
    tagline:
      "WhatsApp-style social platform — real-time chat, news feed, friends, and voice/video calls on a production full-stack build.",
    description:
      "Full-featured messaging and social app pairing a Next.js 15 frontend with a TypeScript Express API. Users get 1:1 chat (text, images, voice), a social feed with likes and comments, friend discovery and requests, online presence, typing indicators, and ZEGOCLOUD-powered audio/video calls — deployed on Vercel (frontend) and a VPS with nginx + PM2 (backend).",
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
      "Real-time messaging with Socket.IO — typing, read receipts, and friend-scoped presence",
      "Social feed with posts, threaded comments, likes, and S3-backed media uploads",
      "Friend graph with send/accept/reject flows and paginated user discovery search",
      "Voice/video calls via server-minted ZEGOCLOUD RTC tokens and WebSocket call signaling",
      "Redis cache layer + optional Socket.IO Redis adapter for horizontal scale",
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
      "Backend API & Socket.IO: https://github.com/reazulislamreaz/connectify-backend · API host: https://easyconnectify.duckdns.org",
    problem:
      "Users expect a modern messenger with instant delivery, social feed, friend management, and calls — without juggling separate apps or dealing with unreliable realtime sync, unsecured sessions, or media uploads that break under load.",
    architecture:
      "Next.js App Router client with React Query and Socket.IO for realtime; Express + TypeScript REST API with Zod validation and JWT auth (Bearer + HTTP-only cookies). MongoDB via Mongoose for users, messages, posts, and friends; AWS S3 for avatars and media; optional Redis for caching and multi-instance Socket.IO fan-out; ZEGOCLOUD for RTC tokens and call state over WebSockets.",
    challengeSolutions: [
      {
        challenge:
          "HTTPS frontend on Vercel had to reach a secure WebSocket backend without mixed-content or path mismatches.",
        solution:
          "Configured wss:// on DuckDNS with `/socket.io` at the root, JWT in socket auth, and CORS `CLIENT_URL` allowlists including the Vercel domain.",
      },
      {
        challenge:
          "1:1 messaging needed live delivery, typing, read receipts, and voice notes without losing messages across reconnects.",
        solution:
          "Socket.IO per-user rooms with JWT handshake, persisted message CRUD, and event handlers for typing, read state, and ≤60s voice uploads to S3.",
      },
      {
        challenge:
          "Friend-only presence and call signaling had to stay consistent when scaling beyond a single Node process.",
        solution:
          "Presence service with friend-scoped visibility, optional Redis cache invalidation, and Socket.IO Redis adapter for multi-instance broadcast.",
      },
      {
        challenge:
          "Feed, profiles, and chat surfaces required validated APIs and consistent error contracts for the React client.",
        solution:
          "Modular Express modules (auth, user, friend, message, chat, post, call) with Zod middleware and standardized `{ success, data | message }` responses.",
      },
    ],
    futureEnhancements:
      "Group chats, push notifications, message search, admin moderation tools, and deeper observability (metrics/tracing) across API and socket tiers.",
  },
  {
    title: "Confaero",
    tagline:
      "Real-time conference ops for organizers — QR check-ins and exhibitor leads without duplicate records under load.",
    description:
      "Scalable conference platform for real-world events — QR check-ins, exhibitor lead capture, organizer tooling, and low-latency attendee interactions backed by a typed API and real-time layers.",
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
      "~40% lower p95 latency on check-in & roster APIs after compound MongoDB indexes",
      "Zero duplicate check-ins under concurrent QR scan bursts via unique constraints",
      "Real-time roster sync across organizer dashboards with Socket.IO scoped broadcasts",
      "Lazy-loaded dashboard modules and optimized image delivery for faster first paint",
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
    live: "https://confaero.com/",
    code: "https://github.com/reazulislamreaz/confaero-backend",
    sourceNote:
      "Organizer dashboard (React / Vite): https://github.com/reazulislamreaz/confaero-dashboard",
    problem:
      "Large conferences need dependable participant management, live check-in throughput, and direct interactions between attendees — without traditional systems breaking down on concurrent writes or leaving duplicate check-ins, leads, and connection records.",
    architecture:
      "Modular Node.js + Express + TypeScript API. MongoDB with compound indexes on hot paths. JWT RBAC across organizer, volunteer, and exhibitor roles. Socket.IO for event-scoped sync; WebRTC for low-latency P2P where it matters.",
    challengeSolutions: [
      {
        challenge:
          "Concurrent QR scan bursts threatened duplicate check-ins and inconsistent rosters.",
        solution:
          "Unique constraints, server-side validation, and compound MongoDB indexes aligned to check-in and roster query patterns.",
      },
      {
        challenge:
          "Exhibitor leads and live dashboards had to stay consistent under write-heavy load.",
        solution:
          "Role-aware service layer scoping mutations by persona, plus Socket.IO scoped broadcasts for real-time roster sync.",
      },
      {
        challenge:
          "WebRTC signaling and realtime UI had to avoid double-booked connections.",
        solution:
          "Separated P2P channels from domain writes with guarded API contracts and event-scoped realtime updates.",
      },
    ],
    futureEnhancements:
      "Splitting into focused microservices (auth, events, communications), Redis-backed caching for hot reads, rate limits on scan and signaling APIs, AI-assisted attendee insights via RAG, and hardened scaling for the WebRTC signaling tier.",
  },
  {
    title: "Replii",
    tagline:
      "AI email SaaS for teams — reliable multi-mailbox sync and smart replies on a NestJS + PostgreSQL backend.",
    description:
      "AI-powered email SaaS for intelligent inbox management, automated replies, and multi-mailbox handling — with a NestJS backend focused on protocol integration, reliability, and clean APIs. Led and implemented the backend architecture: email handling, mailbox management, and API design.",
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
      "~50% faster thread list queries after PostgreSQL indexing & Prisma select tuning",
      "Isolated AI failures from mail transport — sync uptime unaffected by model timeouts",
      "Multi-mailbox sync with bounded retry logic across IMAP/SMTP provider edge cases",
      "Structured logging on API errors for faster production debugging",
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
      "Backend source uses the twvinfast-server-full repository name; it powers the Replii mail, sync, and AI reply APIs.",
    problem:
      "Teams juggle multiple inboxes and providers while expecting AI-assisted replies — without a unified system, sync drifts, sends fail silently across SMTP quirks, and automated responses become unsafe or inconsistent.",
    architecture:
      "NestJS modules with PostgreSQL + Prisma for type-safe relational modeling. Per-user multi-mailbox records, IMAP sync, SMTP outbound, and an AI layer behind guarded APIs — transport isolated from generation.",
    challengeSolutions: [
      {
        challenge:
          "IMAP state had to stay consistent across several mailboxes per user.",
        solution:
          "Mailbox-oriented NestJS services with controlled sync strategies and bounded retry logic for provider edge cases.",
      },
      {
        challenge:
          "SMTP delivery varied by provider and could corrupt thread history or double-send.",
        solution:
          "Defensive outbound handling, Prisma-backed thread modeling, and APIs that isolate mailbox mutations from AI generation.",
      },
      {
        challenge:
          "AI timeouts could not take down core mail sync.",
        solution:
          "Bounded failure domains — model errors stay isolated while IMAP/SMTP transport keeps running.",
      },
    ],
    futureEnhancements:
      "Queue-based processing with BullMQ and Redis, rate limits on mail operations, RAG-style contextual reply workflows, analytics and delivery tracking, and clearer separation between email transport and AI microservices.",
  },
  {
    title: "HavenKeys",
    tagline:
      "Real-estate marketplace with RBAC and Stripe-backed premium listings — built like a small SaaS, not a brochure site.",
    description:
      "Real-estate marketplace with RBAC, relational inventory, and Stripe-backed premium listings — built like a small SaaS rather than a static brochure.",
    features: ["React", "Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    metrics: [
      "~35% faster filtered listing searches after indexed role-aware query paths",
      "Idempotent Stripe webhooks — no double-charged premium placements on retries",
      "RBAC-enforced API layer with zero cross-tenant data leaks in testing",
      "Code-split React routes to reduce initial bundle size for mobile agents",
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
    sourceNote:
      "Client repository — server API is maintained in a separate backend repo.",
    problem:
      "Listings, agents, and buyers each need different permissions; premium placements must not double-charge or leave listings in an inconsistent state when payments retry.",
    architecture:
      "MERN client with modular Express API. MongoDB for users, roles, and listings. JWT RBAC on mutating routes; Stripe webhooks verified server-side before premium state transitions.",
    challengeSolutions: [
      {
        challenge:
          "Role-aware filters risked cross-tenant data leaks on listing queries.",
        solution:
          "Explicit RBAC checks on protected REST handlers and scoped query paths per persona.",
      },
      {
        challenge:
          "Async Stripe retries could double-charge or leave listings in limbo.",
        solution:
          "Idempotent webhook handling and guarded updates — premium transitions only after verified payment signals.",
      },
    ],
    futureEnhancements:
      "Redis-backed search caching, a queue for outbound email, and clearer audit trails for administrative actions.",
  },
  {
    title: "Marathon Zone",
    tagline:
      "Marathon registration that survives deadline spikes — organizer console plus a fast public signup flow.",
    description:
      "Event operations console for organizers plus a participant-facing experience — focused on registration throughput, auth, and trustworthy event data.",
    features: ["Node.js", "Express", "MongoDB", "Firebase Auth", "React"],
    metrics: [
      "Stable registration throughput during deadline spikes with indexed write paths",
      "~30% faster participant roster loads after MongoDB aggregation tuning",
      "Server-side validation blocked conflicting registrations before DB writes",
      "Lazy-loaded public registration flow for improved mobile performance",
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
      "Marathon sign-ups spike around deadlines; organizers still need stable tools to publish events, track participants, and avoid conflicting registrations.",
    architecture:
      "Express API with flexible MongoDB event documents. Firebase Auth for identity. React client with separate organizer mutations vs. public registration reads.",
    challengeSolutions: [
      {
        challenge:
          "Bursty writes during open registration threatened roster accuracy.",
        solution:
          "Server-side validation before DB writes, indexing on high-read paths, and clear separation of organizer vs. participant endpoints.",
      },
      {
        challenge:
          "Participant rosters needed to load quickly for organizers mid-event.",
        solution:
          "MongoDB aggregation tuning on roster queries — ~30% faster loads in practice.",
      },
    ],
    futureEnhancements:
      "WebSocket or SSE-based leaderboards, structured analytics exports, and hardened rate limits on registration endpoints.",
  },
  {
    title: "Green Circle",
    tagline:
      "Gardening subscription SaaS — slot booking with zero double-booked delivery windows under concurrent demand.",
    description:
      "Subscription-style gardening service with slot booking, admin tooling, and integrity constraints around recurring deliveries.",
    features: ["Express", "MongoDB", "Mongoose", "React", "JWT"],
    metrics: [
      "Eliminated double-booked delivery slots with transactional slot acquisition",
      "~45% faster admin dashboard metrics via indexed aggregation pipelines",
      "Consistent slot inventory under concurrent booking attempts",
      "Optimized React admin tables with pagination to cut render load",
    ],
    devOps: [
      "Netlify deploy",
      "Express + MongoDB",
      "JWT-secured admin API",
      "Docker (planned containerization)",
      "CI/CD",
      "Caching on hot dashboard queries",
    ],
    images: [
      "/green-circle-1.png",
      "/green-circle-2.png",
      "/green-circle-3.png",
    ],
    live: "https://green-circle-by-reaz.netlify.app",
    code: "https://github.com/reazulislamreaz/green-circle",
    problem:
      "Customers compete for limited delivery slots; operators need a trustworthy dashboard without corrupting schedules or double-booking capacity.",
    architecture:
      "Express + Mongoose with JWT-protected admin routes. MongoDB aggregations for operational metrics. Layered authorization across customer, staff, and admin personas.",
    challengeSolutions: [
      {
        challenge:
          "Multiple clients booking the same delivery window caused slot corruption.",
        solution:
          "Transactional updates around slot acquisition and consistent inventory under concurrent attempts.",
      },
      {
        challenge:
          "Admin metrics required expensive ad-hoc scans on growing data.",
        solution:
          "Indexed aggregation pipelines — ~45% faster dashboard metrics in practice.",
      },
    ],
    futureEnhancements:
      "Worker-based fulfillment notifications, containerized deployment, and clearer service boundaries if the workload splits.",
  },
  {
    title: "Event Hub",
    tagline:
      "Event lifecycle tool for hosts — custom JWT auth with server-side ownership on every sensitive mutation.",
    description:
      "MERN-stack event lifecycle tool with custom authentication and guarded mutations for hosts managing attendees and schedules.",
    features: ["React", "Express", "MongoDB", "Custom auth", "JWT"],
    metrics: [
      "~35% faster authenticated event listings after compound indexes",
      "100% server-side ownership checks on destructive mutations (cancel/edit)",
      "Predictable JWT session refresh flow across SPA reloads",
      "Route-level code splitting improved first-load time on the public app",
    ],
    devOps: [
      "Netlify (SPA)",
      "Express REST API",
      "MongoDB",
      "JWT auth middleware",
      "CI/CD",
      "Environment secrets management",
    ],
    images: ["/event-hub.png", "/event-hub1.png", "/event-hub2.png"],
    live: "https://event-hub-by-reaz.netlify.app",
    code: "https://github.com/reazulislamreaz/event-hub-client",
    problem:
      "Hosts need to create, update, and cancel events without exposing attendee data to the wrong account or leaving half-applied edits live.",
    architecture:
      "Express REST + MongoDB with custom JWT sessions. React SPA routes sensitive actions through authenticated APIs — the client never owns authorization decisions.",
    challengeSolutions: [
      {
        challenge:
          "Auth sessions had to survive SPA reloads without surprising logouts.",
        solution:
          "Predictable JWT refresh flow with centralized auth middleware on protected routes.",
      },
      {
        challenge:
          "Destructive actions (cancel/edit) could expose or corrupt the wrong attendee data.",
        solution:
          "Explicit ownership checks on event records and consistent error contracts the UI cannot mask.",
      },
    ],
    futureEnhancements:
      "Dedicated admin reporting, notification hooks, and background reminders for upcoming events.",
  },
];
