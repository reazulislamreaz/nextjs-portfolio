"use client";
import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";
import { FiCode, FiServer, FiCpu } from "react-icons/fi";

const coreStack: string[] = [
  "TypeScript",
  "Node.js",
  "Express.js",
  "NestJS",
  "Go",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "React",
  "Next.js",
  "Tailwind CSS",
];

const advancedTech: string[] = [
  "GraphQL where contract clarity beats ad-hoc REST",
  "Socket-driven and event-style interfaces",
  "RBAC and multi-tenant guardrails",
  "Payments and webhook-hardening patterns",
];

const experience: string[] = [
  "Designing modular services and clear API boundaries",
  "Modeling relational and document schemas for real workloads",
  "Hardening authentication, authorization, and rate-sensitive flows",
  "Shipping Stripe-aware and idempotent payment paths",
  "Deploying to cloud targets with pragmatic CI/CD hygiene",
  "Pairing structured logging with actionable error contracts",
  "Using AI development tooling responsibly — never as a substitute for tests or API review",
  "Owning delivery across API, data, and client layers",
];

export default function About() {
  return (
    <Section id="about" className="bg-black/40">
      <SectionHeader title="About Me" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Intro & Main Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-zinc-300">
              Hi, I&apos;m{" "}
              <span className="font-semibold text-white bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-md shadow-sm">
                Reazul Islam Reaz
              </span>
              , a{" "}
              <span className="font-semibold text-emerald-400">
                backend-focused full-stack engineer
              </span>
              .
            </p>

            <p className="text-[1.05rem] leading-relaxed text-zinc-400">
              I ship SaaS-style products end to end: disciplined APIs, thoughtful persistence, and
              frontends that stay thin on business rules. My default is to design for scale paths,
              safe payments, and operability — not to chase novelty for its own sake.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiCode className="text-emerald-500 text-2xl" />
              <h3 className="text-xl font-bold text-zinc-200 tracking-tight">Core Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {coreStack.map((tech) => (
                  <span key={tech} className="px-4 py-1.5 bg-zinc-900 border border-zinc-700/80 text-zinc-200 rounded-lg text-sm font-medium shadow-sm hover:border-emerald-500/50 hover:bg-zinc-800 transition-colors cursor-default">
                    {tech}
                  </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <FiCpu className="text-emerald-500 text-2xl" />
              <h3 className="text-xl font-bold text-zinc-200 tracking-tight">Platform focus</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-400">
              {advancedTech.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Development Experience */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-5 relative"
        >
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-md shadow-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.03)] transition-all duration-300 w-full h-full space-y-6">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <FiServer className="text-emerald-500 text-3xl" />
              <h3 className="text-2xl font-bold text-white tracking-tight">How I work</h3>
            </div>
            
            <ul className="space-y-5 text-[1.05rem]">
              {experience.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">▹</span>
                  <span className="text-zinc-300 font-medium leading-tight">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/#contact"
                className="w-full flex justify-center px-8 py-3.5 rounded-xl bg-zinc-100 text-zinc-950 font-semibold hover:bg-white transition-all duration-300 shadow-md"
              >
                Let&apos;s Build Systems
              </motion.a>
            </div>
          </div>
        </motion.div>
        
      </div>

    </Section>
  );
}
