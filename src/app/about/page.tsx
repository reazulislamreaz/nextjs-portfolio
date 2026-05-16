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

      <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 space-y-6 sm:space-y-8 lg:col-span-7">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
              Hi, I&apos;m{" "}
              <span className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 font-semibold text-white shadow-sm">
                Reazul Islam Reaz
              </span>
              , a{" "}
              <span className="font-semibold text-emerald-400">
                backend-focused full-stack engineer
              </span>
              .
            </p>

            <p className="text-sm leading-relaxed text-zinc-400 sm:text-[1.05rem]">
              I ship SaaS-style products end to end: disciplined APIs, thoughtful persistence, and
              frontends that stay thin on business rules. My default is to design for scale paths,
              safe payments, and operability — not to chase novelty for its own sake.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiCode className="text-2xl text-emerald-500" />
              <h3 className="text-xl font-bold tracking-tight text-zinc-200">Core Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {coreStack.map((tech) => (
                <span
                  key={tech}
                  className="cursor-default rounded-lg border border-zinc-700/80 bg-zinc-900 px-4 py-1.5 text-sm font-medium text-zinc-200 shadow-sm transition-colors hover:border-emerald-500/50 hover:bg-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <FiCpu className="text-2xl text-emerald-500" />
              <h3 className="text-xl font-bold tracking-tight text-zinc-200">Platform focus</h3>
            </div>
            <ul className="grid grid-cols-1 gap-3 text-zinc-400 sm:grid-cols-2">
              {advancedTech.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative min-w-0 lg:col-span-5">
          <div className="h-full w-full space-y-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.03)] sm:space-y-6 sm:rounded-3xl sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-zinc-800 pb-4">
              <FiServer className="text-3xl text-emerald-500" />
              <h3 className="text-2xl font-bold tracking-tight text-white">How I work</h3>
            </div>

            <ul className="space-y-4 text-sm sm:space-y-5 sm:text-[1.05rem]">
              {experience.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">▹</span>
                  <span className="font-medium leading-tight text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <a
                href="/#contact"
                className="flex min-h-11 w-full transform justify-center rounded-xl bg-zinc-100 px-8 py-3.5 text-center text-sm font-semibold text-zinc-950 shadow-md transition hover:scale-[1.02] hover:bg-white active:scale-[0.98] sm:text-base"
              >
                Let&apos;s Build Systems
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
