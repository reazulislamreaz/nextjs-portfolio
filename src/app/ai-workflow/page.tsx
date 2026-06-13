import type { Metadata } from "next";
import AiWorkflowSection from "@/components/sections/AiWorkflowSection";
import { sectionMetadata } from "@/config/seo";

export const metadata: Metadata = sectionMetadata(
  "ai-workflow",
  "AI Workflow",
  "AI tools in backend and full-stack delivery.",
);

export default function AiWorkflowPage() {
  return <AiWorkflowSection />;
}
