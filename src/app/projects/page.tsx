import type { Metadata } from "next";
import ProjectsSection from "./ProjectsSection";

export const metadata: Metadata = {
  title: "Projects | Reazul Islam Reaz",
  description:
    "Selected full-stack and backend systems — Confaero, Replii, HavenKeys, and more. Case studies with architecture, challenges, and live demos.",
  openGraph: {
    title: "Projects | Reazul Islam Reaz",
    description:
      "Backend-focused portfolio projects with documented architecture, live environments, and source code.",
  },
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
