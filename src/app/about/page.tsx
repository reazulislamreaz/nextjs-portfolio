import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "about",
  "About",
  "Backend-focused full-stack engineer — stack and how I ship production systems.",
);

export default function AboutPage() {
  return <AboutSection />;
}
