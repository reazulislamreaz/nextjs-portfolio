import type { Metadata } from "next";
import CertificationsSection from "@/components/sections/CertificationsSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "certifications",
  "Certifications & Learning",
  "Structured full-stack, cloud, and AI learning aligned with production engineering.",
);

export default function CertificationsPage() {
  return <CertificationsSection />;
}
