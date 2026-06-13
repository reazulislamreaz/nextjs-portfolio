import type { Metadata } from "next";
import CertificationsSection from "@/components/sections/CertificationsSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "certifications",
  "Certifications",
  "Full-stack, cloud, and AI learning for production engineering.",
);

export default function CertificationsPage() {
  return <CertificationsSection />;
}
