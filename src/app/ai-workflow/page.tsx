"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";

const aiTooling: { name: string; detail: string }[] = [
  {
    name: "Cursor",
    detail: "AI-assisted IDE workflow — navigation, refactors, and test scaffolding with human review.",
  },
  {
    name: "Claude",
    detail: "Architecture reasoning and large-context analysis before locking in designs.",
  },
  {
    name: "OpenAI Codex",
    detail: "Assisted implementation and exploration; every change still passes my review and tests.",
  },
  {
    name: "GitHub Copilot",
    detail: "Inline suggestions and boilerplate reduction for repetitive, well-bounded tasks.",
  },
  {
    name: "ChatGPT & Gemini",
    detail: "Research, debugging hypotheses, and trade-off comparisons — not a substitute for production validation.",
  },
];

const devTooling: { name: string; detail: string }[] = [
  {
    name: "Postman",
    detail: "Collections, environments, and manual verification of API behavior before merge.",
  },
  {
    name: "Swagger / OpenAPI",
    detail: "Contract documentation and shared understanding between services and clients.",
  },
  {
    name: "Docker",
    detail: "Basic containerization for reproducible local setups and closer deploy parity.",
  },
  {
    name: "Git & GitHub",
    detail: "Branching, pull requests, and collaborative review as the source of truth for delivery.",
  },
];

export default function AiWorkflow() {
  return (
    <Section id="ai-workflow" className="bg-black/35">
      <SectionHeader
        title="AI-assisted development workflow"
        subtitle="Practical tooling that speeds iteration — with reviews, tests, and ownership staying on the engineering side."
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45 }}
        className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-zinc-400 md:text-lg"
      >
        I use modern AI assistants the same way I use linters or debuggers: to shorten feedback loops,
        surface options, and catch blind spots — not to outsource judgment, security, or architecture.
      </motion.p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-zinc-800/80 bg-zinc-900/35 p-7 shadow-lg backdrop-blur-md md:p-8"
        >
          <h3 className="mb-5 border-b border-zinc-800 pb-3 text-lg font-semibold tracking-tight text-white">
            AI-assisted tooling
          </h3>
          <ul className="space-y-4">
            {aiTooling.map((item) => (
              <li key={item.name} className="text-sm leading-relaxed text-zinc-400 md:text-[0.95rem]">
                <span className="font-medium text-zinc-200">{item.name}</span>
                <span className="text-zinc-500"> — </span>
                {item.detail}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-3xl border border-zinc-800/80 bg-zinc-900/35 p-7 shadow-lg backdrop-blur-md md:p-8"
        >
          <h3 className="mb-5 border-b border-zinc-800 pb-3 text-lg font-semibold tracking-tight text-white">
            API & delivery tooling
          </h3>
          <ul className="space-y-4">
            {devTooling.map((item) => (
              <li key={item.name} className="text-sm leading-relaxed text-zinc-400 md:text-[0.95rem]">
                <span className="font-medium text-zinc-200">{item.name}</span>
                <span className="text-zinc-500"> — </span>
                {item.detail}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-zinc-600 md:text-sm"
      >
        Ship-ready code still means tests, security checks, and team standards — assistants reduce
        friction; they do not replace accountability.
      </motion.p>
    </Section>
  );
}
