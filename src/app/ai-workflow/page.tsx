import type { Metadata } from "next";
import AiWorkflowSection from "@/components/sections/AiWorkflowSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "ai-workflow",
  "AI Workflow",
  "How I use AI tools responsibly in backend and full-stack delivery.",
);

export default function AiWorkflowPage() {
  return <AiWorkflowSection />;
}
