import type { Metadata } from "next";
import SkillsSection from "@/components/sections/SkillsSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "skills",
  "Skills",
  "Backend, databases, DevOps, and AI-assisted development.",
);

export default function SkillsPage() {
  return <SkillsSection />;
}
