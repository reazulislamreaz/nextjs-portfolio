import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "contact",
  "Contact",
  "Backend roles, contracts, and project inquiries.",
);

export default function ContactPage() {
  return <ContactSection />;
}
