import type { Metadata } from "next";
import SkillsSection from "@/components/sections/SkillsSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "skills",
  "Skills",
  "Backend, frontend, databases, DevOps, and AI-assisted development skills.",
);

export default function SkillsPage() {
  return <SkillsSection />;
}
