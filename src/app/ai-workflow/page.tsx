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

      <p className="mx-auto mb-8 max-w-3xl px-1 text-center text-sm leading-relaxed text-zinc-400 sm:mb-10 sm:text-base lg:text-lg">
        I use modern AI assistants the same way I use linters or debuggers: to shorten feedback loops,
        surface options, and catch blind spots — not to outsource judgment, security, or architecture.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-5 shadow-lg backdrop-blur-md sm:rounded-3xl sm:p-7 md:p-8">
          <h3 className="mb-4 border-b border-zinc-800 pb-2 text-base font-semibold tracking-tight text-white sm:mb-5 sm:pb-3 sm:text-lg">
            AI-assisted tooling
          </h3>
          <ul className="space-y-3 sm:space-y-4">
            {aiTooling.map((item) => (
              <li key={item.name} className="text-xs leading-relaxed text-zinc-400 sm:text-sm md:text-[0.95rem]">
                <span className="font-medium text-zinc-200">{item.name}</span>
                <span className="text-zinc-500"> — </span>
                {item.detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-5 shadow-lg backdrop-blur-md sm:rounded-3xl sm:p-7 md:p-8">
          <h3 className="mb-4 border-b border-zinc-800 pb-2 text-base font-semibold tracking-tight text-white sm:mb-5 sm:pb-3 sm:text-lg">
            API & delivery tooling
          </h3>
          <ul className="space-y-3 sm:space-y-4">
            {devTooling.map((item) => (
              <li key={item.name} className="text-xs leading-relaxed text-zinc-400 sm:text-sm md:text-[0.95rem]">
                <span className="font-medium text-zinc-200">{item.name}</span>
                <span className="text-zinc-500"> — </span>
                {item.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-2xl px-2 text-center text-xs leading-relaxed text-zinc-600 sm:mt-8 sm:text-sm">
        Ship-ready code still means tests, security checks, and team standards — assistants reduce
        friction; they do not replace accountability.
      </p>
    </Section>
  );
}
