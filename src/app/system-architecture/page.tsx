import type { Metadata } from "next";
import SystemArchitectureSection from "@/components/sections/SystemArchitectureSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "system-architecture",
  "Architecture",
  "Scalable backends, APIs, and SaaS architecture.",
);

export default function SystemArchitecturePage() {
  return <SystemArchitectureSection />;
}
