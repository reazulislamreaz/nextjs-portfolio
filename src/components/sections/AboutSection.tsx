import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionLink from "@/app/components/SectionLink";
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
  "GraphQL for clear API contracts",
  "Socket and event-driven interfaces",
  "RBAC and multi-tenant guardrails",
  "Payments and hardened webhooks",
];

const experience: string[] = [
  "Modular services with clear API boundaries",
  "Relational and document schema design",
  "Auth, authorization, and rate limiting",
  "Idempotent Stripe payment flows",
  "Cloud deploys with CI/CD",
  "Structured logging and error contracts",
  "AI tooling with human review and tests",
  "End-to-end delivery across the stack",
];

export default function About() {
  return (
    <Section id="about" className="bg-zinc-950/40">
      <SectionHeader title="About Me" />

      <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 space-y-6 sm:space-y-8 lg:col-span-7">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
              Hi, I&apos;m{" "}
              <span className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 font-semibold text-zinc-50 shadow-sm">
                Reazul Islam Reaz
              </span>
              , a{" "}
              <span className="font-semibold text-emerald-400">
                backend-focused full-stack engineer
              </span>
              .
            </p>

            <p className="text-sm leading-relaxed text-zinc-400 sm:text-[1.05rem]">
              I ship SaaS products end to end — clean APIs, solid data layers,
              and thin frontends. I design for scale, safe payments, and
              operability.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiCode className="text-2xl text-emerald-500" />
              <h3 className="text-xl font-bold tracking-tight text-zinc-200">
                Core Stack
              </h3>
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
              <h3 className="text-xl font-bold tracking-tight text-zinc-200">
                Platform focus
              </h3>
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
              <h3 className="text-2xl font-bold tracking-tight text-zinc-50">
                How I work
              </h3>
            </div>

            <ul className="space-y-4 text-sm sm:space-y-5 sm:text-[1.05rem]">
              {experience.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">▹</span>
                  <span className="font-medium leading-tight text-zinc-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <SectionLink
                href="/#contact"
                className="flex min-h-11 w-full transform justify-center rounded-xl bg-zinc-100 px-8 py-3.5 text-center text-sm font-semibold text-zinc-950 shadow-md transition hover:scale-[1.02] hover:bg-zinc-50 active:scale-[0.98] sm:text-base"
              >
                Let&apos;s Build Systems
              </SectionLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
