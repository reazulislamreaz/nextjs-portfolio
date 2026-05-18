import type { Metadata } from "next";
import ExperienceSection from "@/components/sections/ExperienceSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "experience",
  "Experience",
  "Professional experience as a backend-focused developer — Sparktech Agency and Softvence.",
);

export default function ExperiencePage() {
  return <ExperienceSection />;
}
