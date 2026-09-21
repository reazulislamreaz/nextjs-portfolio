import type { Metadata } from "next";
import SkillsSection from "@/components/sections/SkillsSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "Expertise",
  "API design, data modeling, auth, caching, realtime, and production backend systems.",
);

export default function SkillsPage() {
  return <SkillsSection />;
}
