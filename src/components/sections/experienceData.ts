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
    role: "Back End Developer",
    employmentType: "Full-time",
    period: "Jan 2026 – Present",
    duration: "5 mos",
    location: "Mohakhali, Dhaka, Bangladesh",
    workMode: "On-site",
    isCurrent: true,
    tagline:
      "Production backend systems for event and conference platforms — REST APIs, RBAC, and real-time features at scale.",
    summary:
      "Designing and developing scalable, secure, and production-ready backend systems for real-world web and event-based applications. Work spans API design, data modeling, access control, real-time collaboration, and close coordination with frontend and mobile teams.",
    highlights: [
      "Developed and maintained RESTful APIs with Node.js, Express.js, and TypeScript.",
      "Designed and optimized MongoDB/Mongoose schemas for complex, event-driven workloads.",
      "Implemented RBAC across Admin, Organizer, Volunteer, Attendee, and Exhibitor roles with JWT-based auth flows.",
      "Built event and conference modules: registration, check-in, volunteer task assignment, and exhibitor/sponsor workflows.",
      "Integrated Socket.IO for live chat, polling, and session interactions; QR-based workflows for attendance and lead capture.",
      "Followed layered architecture (Router → Controller → Service → Model) with Zod validation, centralized errors, and standardized API responses.",
      "Tested APIs with Postman; focused on performance, data integrity, and scalable system design.",
    ],
    architecture:
      "Layered Express + TypeScript services with MongoDB as the source of truth, JWT-guarded routes per persona, and Socket.IO for event-scoped realtime — keeping transport, validation, and domain logic clearly separated.",
    techStack: [
      "Node.js",
      "Express.js",
      "NestJS",
      "TypeScript",
      "Go",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQL",
      "Prisma",
      "Mongoose",
      "Redis",
      "GraphQL",
      "REST APIs",
      "Microservices",
      "Socket.IO",
      "WebRTC",
      "ZEGOCLOUD",
      "JWT",
      "SMTP",
      "IMAP",
      "Rate limiting",
      "Caching",
      "Queue-based processing",
      "Load balancing",
      "Postman",
      "Git & GitHub",
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
      "Full-stack internship with a backend focus — React frontends, Node.js APIs, and PostgreSQL under mentorship.",
    summary:
      "Contributed to innovative projects in a collaborative team environment — building reliable server-side logic, integrating React-based UIs with REST APIs, and working with relational data across the full delivery stack.",
    highlights: [
      "Built and maintained backend features with Node.js and Express.js in a team-based delivery workflow.",
      "Worked with PostgreSQL for relational modeling, queries, and data integrity.",
      "Developed and integrated React UI components against REST API contracts.",
      "Used TypeScript and Git-based workflows for code review and iterative shipping in an on-site team setting.",
    ],
    techStack: [
      "Node.js",
      "Express.js",
      "NestJS",
      "TypeScript",
      "React",
      "PostgreSQL",
      "MySQL",
      "SQL",
      "Prisma",
      "Redis",
      "REST APIs",
      "Socket.IO",
      "WebRTC",
      "JWT",
      "SMTP",
      "IMAP",
      "Tailwind CSS",
      "Postman",
      "Git & GitHub",
    ],
  },
];
