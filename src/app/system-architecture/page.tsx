"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";

const pillars: { title: string; items: string[] }[] = [
  {
    title: "Service architecture",
    items: [
      "Monolith → microservice transition strategy",
      "API gateway pattern",
      "Service-to-service communication (REST / event-driven)",
      "Database-per-service design",
    ],
  },
  {
    title: "Data, cache & async work",
    items: [
      "Caching layer using Redis",
      "Background job processing (queues)",
    ],
  },
  {
    title: "API safety & payments",
    items: [
      "Rate limiting and API protection strategies",
      "Idempotent APIs for payment flows",
    ],
  },
  {
    title: "AI & provider integrations",
    items: [
      "Scalable AI integration using RAG (retrieval-augmented generation)",
      "Payment methods (Stripe, SSLCommerz, M-Pesa)",
    ],
  },
];

export default function SystemArchitecture() {
  return (
    <Section id="system-architecture" className="bg-black/50">
      <SectionHeader
        title="System Architecture & Scalability"
        subtitle="How I think about growth paths, boundaries, and safe integrations before the first production deploy."
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-zinc-300 md:text-xl"
      >
        I design backend systems with scalability, performance, and maintainability in mind.
      </motion.p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="rounded-3xl border border-zinc-800/80 bg-zinc-900/35 p-7 shadow-lg backdrop-blur-md md:p-8"
          >
            <h3 className="mb-5 border-b border-zinc-800 pb-3 text-lg font-semibold tracking-tight text-white">
              {pillar.title}
            </h3>
            <ul className="space-y-3.5 text-[0.95rem] leading-relaxed text-zinc-400">
              {pillar.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/90"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
