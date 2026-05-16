export interface Project {
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

export const projectsData: Project[] = [
  {
    title: "Confaero",
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
      "Backend is Node.js, Express, and TypeScript in a modular service-oriented layout. MongoDB holds events, participants, and roles with indexes tuned for busy read/write paths. JWT enforces RBAC across organizer, volunteer, and exhibitor surfaces. Socket.IO propagates event updates, check-in sync, and notifications; WebRTC carries peer-to-peer channels where latency matters.",
    keyChallenges:
      "Bursts of concurrent QR scans, keeping rosters and exhibitor leads consistent under load, and pairing real-time UI state with WebRTC signaling without double-booking connections or duplicate domain records.",
    solutions:
      "Unique constraints and server-side validation for duplicate prevention, a role-aware service layer so mutations stay scoped by persona, WebRTC for low-latency P2P paths, Socket.IO for event-scoped broadcast and sync, and MongoDB indexing aligned to the hottest query patterns.",
    futureEnhancements:
      "Splitting into focused microservices (auth, events, communications), Redis-backed caching for hot reads, rate limits on scan and signaling APIs, AI-assisted attendee insights via RAG, and hardened scaling for the WebRTC signaling tier.",
  },
  {
    title: "Replii",
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
      "NestJS and TypeScript in a modular layout: PostgreSQL as the relational store with Prisma for type-safe access, per-user multi-mailbox records, IMAP-driven synchronization, SMTP for outbound delivery, and an AI response layer behind a guarded API surface for threads and mailbox operations.",
    keyChallenges:
      "Keeping IMAP state consistent across several mailboxes per user, and making SMTP dependable across provider-specific edge cases without corrupting thread history or double-sending.",
    solutions:
      "Mailbox-oriented NestJS services with controlled sync strategies, defensive handling around external mail providers, Prisma-backed relational modeling for accounts and messages, and APIs that isolate mailbox mutations from AI generation so failures stay bounded and observable.",
    futureEnhancements:
      "Queue-based processing with BullMQ and Redis, rate limits on mail operations, RAG-style contextual reply workflows, analytics and delivery tracking, and clearer separation between email transport and AI microservices.",
  },
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
