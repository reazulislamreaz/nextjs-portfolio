import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "contact",
  "Contact",
  "Get in touch about backend engineering roles, contracts, and interesting projects.",
);

export default function ContactPage() {
  return <ContactSection />;
}
