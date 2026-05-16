import type { Metadata } from "next";
import ProjectsSection from "./ProjectsSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = {
  ...sectionMetadata(
    "projects",
    "Projects",
    "Selected full-stack and backend systems — Confaero, Replii, HavenKeys, and more.",
  ),
  openGraph: {
    title: "Projects | Reazul Islam Reaz",
    description:
      "Backend-focused portfolio projects with documented architecture, live environments, and source code.",
  },
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
