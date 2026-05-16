import type { Metadata } from "next";
import EducationSection from "@/components/sections/EducationSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "education",
  "Education",
  "Formal academic background in political science and how it supports engineering work.",
);

export default function EducationPage() {
  return <EducationSection />;
}
