import type { Project } from "./projectsData";

export interface ProjectPresentation {
  kind: string;
  role: string;
  featured: boolean;
  /** One-line architecture signal for cards */
  architectureLine: string;
}

/** Labels taken from the existing project descriptions — not new claims. */
export function presentProject(project: Project): ProjectPresentation {
  const title = project.title;

  if (title.startsWith("Elevate")) {
    return {
      kind: "Commerce",
      role: "Storefront, admin console, and API",
      featured: true,
      architectureLine: "NestJS · BullMQ · PostgreSQL · RBAC",
    };
  }

  if (title.startsWith("J&K")) {
    return {
      kind: "Wholesale",
      role: "Customer site, admin dashboard, and API",
      featured: true,
      architectureLine: "Express · MongoDB · Socket.IO · Stripe",
    };
  }

  if (title.startsWith("Confaero")) {
    return {
      kind: "Events",
      role: "API, organizer tools, and mobile app",
      featured: true,
      architectureLine: "Express · MongoDB · Socket.IO · JWT",
    };
  }

  if (title.startsWith("Connectify")) {
    return {
      kind: "Realtime",
      role: "Client and realtime API",
      featured: false,
      architectureLine: "Express · MongoDB · Redis · Socket.IO",
    };
  }

  if (title.startsWith("Haven")) {
    return {
      kind: "Marketplace",
      role: "Listings client and payments API",
      featured: false,
      architectureLine: "Express · MongoDB · JWT · Stripe",
    };
  }

  return {
    kind: "Registration",
    role: "Organizer console and public signup",
    featured: false,
    architectureLine: "Express · MongoDB · Firebase Auth",
  };
}
