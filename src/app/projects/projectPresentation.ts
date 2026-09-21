import type { Project } from "./projectsData";

export interface ProjectPresentation {
  kind: string;
  role: string;
  featured: boolean;
}

/** Labels taken from the existing project descriptions — not new claims. */
export function presentProject(project: Project): ProjectPresentation {
  const title = project.title;

  if (title.startsWith("Elevate")) {
    return {
      kind: "Commerce",
      role: "Storefront, admin console, and API",
      featured: true,
    };
  }

  if (title.startsWith("J&K")) {
    return {
      kind: "Wholesale",
      role: "Customer site, admin dashboard, and API",
      featured: true,
    };
  }

  if (title.startsWith("Confaero")) {
    return {
      kind: "Events",
      role: "API, organizer tools, and mobile app",
      featured: true,
    };
  }

  if (title.startsWith("Connectify")) {
    return {
      kind: "Realtime",
      role: "Client and realtime API",
      featured: false,
    };
  }

  if (title.startsWith("Haven")) {
    return {
      kind: "Marketplace",
      role: "Listings client and payments API",
      featured: false,
    };
  }

  return {
    kind: "Registration",
    role: "Organizer console and public signup",
    featured: false,
  };
}
