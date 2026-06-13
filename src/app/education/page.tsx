import type { Metadata } from "next";
import EducationSection from "@/components/sections/EducationSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "education",
  "Education",
  "Political science background and how it supports engineering.",
);

export default function EducationPage() {
  return <EducationSection />;
}
