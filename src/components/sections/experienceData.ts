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
      "Backend systems for event platforms — REST APIs, RBAC, and real-time features.",
    summary:
      "Build scalable, secure backends for web and event apps — API design, data modeling, access control, and real-time features with frontend and mobile teams.",
    highlights: [
      "REST APIs with Node.js, Express, and TypeScript.",
      "MongoDB/Mongoose schemas for event-driven workloads.",
      "RBAC across Admin, Organizer, Volunteer, Attendee, and Exhibitor roles with JWT auth.",
      "Event modules: registration, check-in, volunteer tasks, exhibitor workflows.",
      "Socket.IO for chat, polling, and sessions; QR workflows for attendance and leads.",
      "Layered architecture with Zod validation, centralized errors, and standard responses.",
      "API testing with Postman; focus on performance and data integrity.",
    ],
    architecture:
      "Express + TypeScript with MongoDB, JWT-guarded routes per persona, and Socket.IO for event-scoped realtime — transport, validation, and domain logic separated.",
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
      "Backend-focused internship — React frontends, Node.js APIs, and PostgreSQL.",
    summary:
      "Built server-side features and integrated React UIs with REST APIs and PostgreSQL in a collaborative team.",
    highlights: [
      "Backend features with Node.js and Express in team delivery.",
      "PostgreSQL modeling, queries, and data integrity.",
      "React UI integration against REST contracts.",
      "TypeScript and Git workflows for review and shipping.",
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
