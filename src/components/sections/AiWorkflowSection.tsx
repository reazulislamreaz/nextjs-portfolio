import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";

const aiTooling: { name: string; detail: string }[] = [
  {
    name: "Cursor",
    detail: "IDE workflow — navigation, refactors, and tests with human review.",
  },
  {
    name: "Claude",
    detail: "Architecture reasoning before design lock-in.",
  },
  {
    name: "OpenAI Codex",
    detail: "Implementation assist — every change reviewed and tested.",
  },
  {
    name: "GitHub Copilot",
    detail: "Inline suggestions for repetitive, bounded tasks.",
  },
  {
    name: "ChatGPT & Gemini",
    detail: "Research and debugging — not a substitute for production validation.",
  },
];

const devTooling: { name: string; detail: string }[] = [
  {
    name: "Postman",
    detail: "Collections and API verification before merge.",
  },
  {
    name: "Swagger / OpenAPI",
    detail: "Contract docs for services and clients.",
  },
  {
    name: "Docker",
    detail: "Reproducible local setups and deploy parity.",
  },
  {
    name: "Git & GitHub",
    detail: "Branches, PRs, and review as the source of truth.",
  },
];

export default function AiWorkflow() {
  return (
    <Section id="ai-workflow" className="bg-zinc-950/35">
      <SectionHeader
        title="AI workflow"
        subtitle="Faster iteration — reviews, tests, and ownership stay with engineering."
      />

      <p className="mx-auto mb-8 max-w-3xl px-1 text-center text-sm leading-relaxed text-zinc-400 sm:mb-10 sm:text-base lg:text-lg">
        Speed up feedback — not a substitute for judgment or architecture.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-5 shadow-lg backdrop-blur-md sm:rounded-3xl sm:p-7 md:p-8">
          <h3 className="mb-4 border-b border-zinc-800 pb-2 text-base font-semibold tracking-tight text-zinc-50 sm:mb-5 sm:pb-3 sm:text-lg">
            AI tooling
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
          <h3 className="mb-4 border-b border-zinc-800 pb-2 text-base font-semibold tracking-tight text-zinc-50 sm:mb-5 sm:pb-3 sm:text-lg">
            API & delivery
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
        Ship-ready code still needs tests and security checks — assistants reduce friction, not
        accountability.
      </p>
    </Section>
  );
}
