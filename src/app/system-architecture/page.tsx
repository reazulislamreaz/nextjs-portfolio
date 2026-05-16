import type { Metadata } from "next";
import SystemArchitectureSection from "@/components/sections/SystemArchitectureSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "system-architecture",
  "Architecture",
  "How I design scalable backend systems, APIs, and SaaS-style architectures.",
);

export default function SystemArchitecturePage() {
  return <SystemArchitectureSection />;
}
