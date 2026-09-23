export interface Experience {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  period: string;
  duration: string;
  location: string;
  workMode: string;
  isCurrent?: boolean;
  tagline: string;
  summary: string;
  highlights: string[];
  architecture?: string;
  techStack: string[];
}

export const experienceData: Experience[] = [
  {
    id: "sparktech-agency",
    company: "Sparktech Agency",
    role: "Full Stack Developer (Backend-Focused)",
    employmentType: "Full-time",
    period: "Jan 2026 – Present",
    duration: "9 mos",
    location: "Mohakhali, Dhaka, Bangladesh",
    workMode: "On-site",
    isCurrent: true,
    tagline:
      "Event platforms — Node.js APIs, MongoDB models, JWT RBAC, and Socket.IO realtime alongside React/Next.js clients.",
    summary:
      "Own backend delivery on client event systems: API design, data modeling, access control, and realtime features, integrated with frontend and mobile teams.",
    highlights: [
      "Designed and shipped Express + TypeScript APIs for registration, check-in, volunteer tasks, and exhibitor workflows.",
      "Modeled MongoDB/Mongoose schemas for event-driven workloads with indexes on hot read paths.",
      "Implemented JWT auth and RBAC across Admin, Organizer, Volunteer, Attendee, and Exhibitor personas.",
      "Built Socket.IO features for chat, polling, and session sync scoped to each event.",
      "Delivered QR check-in and exhibitor lead flows with server-side validation against duplicate writes.",
      "Enforced Zod validation, centralized errors, and stable API contracts for React/Next.js and mobile clients.",
      "Verified API behavior with Postman and manual QA for integrity, performance, and UX alignment.",
    ],
    architecture:
      "React/Next.js clients over Express + TypeScript with MongoDB, JWT-guarded routes per persona, and Socket.IO for event-scoped realtime — presentation, transport, validation, and domain logic separated.",
    techStack: [
      "Node.js",
      "Express.js",
      "NestJS",
      "TypeScript",
      "React",
      "Next.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Socket.IO",
      "JWT",
      "Zod",
    ],
  },
  {
    id: "softvence",
    company: "Softvence",
    role: "Full Stack Developer (Backend-Focused)",
    employmentType: "Internship",
    period: "Sep 2025 – Dec 2025",
    duration: "4 mos",
    location: "Dhaka, Bangladesh",
    workMode: "On-site",
    tagline:
      "Internship focused on Node.js APIs, PostgreSQL with Prisma, and React integration against REST contracts.",
    summary:
      "Contributed server-side features and database work on team projects, wiring React UIs to typed REST APIs.",
    highlights: [
      "Shipped Node.js/Express endpoints in TypeScript within a reviewed team workflow.",
      "Modeled PostgreSQL schemas with Prisma and wrote queries with attention to data integrity.",
      "Integrated React clients against documented REST contracts and JWT-protected routes.",
      "Used Git-based review cycles to keep API and UI changes shippable together.",
    ],
    techStack: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "JWT",
    ],
  },
];
