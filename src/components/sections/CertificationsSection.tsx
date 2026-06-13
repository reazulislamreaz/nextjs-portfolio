import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";

interface Certification {
  title: string;
  summary: string;
  topics: string[];
  platform: string;
  status: string;
  focus: string;
  credentialUrl?: string;
  credentialLabel?: string;
  secondaryCredentialUrl?: string;
  secondaryCredentialLabel?: string;
}

const items: Certification[] = [
  {
    title: "Full Stack Web Development",
    summary: "Modern web stack and full-stack application development.",
    topics: [
      "React & Next.js",
      "Node.js & Express APIs",
      "MongoDB",
      "JWT auth",
      "REST APIs",
      "Full-stack architecture",
    ],
    platform: "Udemy — Full Stack Development (React, Next.js, Node.js)",
    status: "Completed",
    focus: "End-to-end apps with backend integration.",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-6e1f340a-b9ee-4cda-8cd8-74de0b57ba5a/",
    credentialLabel: "View verified certificate",
    secondaryCredentialUrl:
      "https://www.udemy.com/course/full-stack-development-for-beginner-react-nextjs-nodejs/",
    secondaryCredentialLabel: "View course on Udemy",
  },
  {
    title: "AWS Cloud Computing",
    summary: "Hands-on AWS infrastructure and backend deployment.",
    topics: [
      "IAM & security",
      "EC2, S3, VPC",
      "Load balancing & auto scaling",
      "Lambda & serverless",
      "CloudWatch",
      "CI/CD",
      "Docker & cloud basics",
    ],
    platform: "Udemy — Hands-On Introduction to Cloud Computing with AWS",
    status: "Completed",
    focus: "Scalable backends, cloud deploys, and infrastructure.",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-737af03a-d89d-4d2f-98e3-5c48dc7d0e8f/",
    credentialLabel: "View verified certificate",
    secondaryCredentialUrl:
      "https://www.udemy.com/course/hands-on-introduction-to-cloud-computing-with-aws/",
    secondaryCredentialLabel: "View course on Udemy",
  },
  {
    title: "Next Level Web Development",
    summary:
      "AI-driven bootcamp — TypeScript full-stack, production patterns, cloud, and AI features.",
    topics: [
      "TypeScript, OOP & modular architecture",
      "Node.js & Express REST APIs",
      "Next.js App Router & auth",
      "PostgreSQL, SQL & Prisma",
      "RAG, vector DBs & embeddings",
      "LangChain & AI agents",
      "Docker, Nginx & orchestration",
      "AWS, Linux & GitHub Actions CI/CD",
      "SDLC, Agile, TDD & API testing",
      "AI-integrated full-stack capstone",
    ],
    platform: "Programming Hero — Next Level AI-Driven Software Engineering Bootcamp",
    status: "Completed",
    focus: "AI-driven engineering — scalable backends, TypeScript, and deployable infrastructure.",
    credentialUrl: "https://next.programming-hero.com/",
    credentialLabel: "View bootcamp overview",
  },
  {
    title: "AI & Intelligent Systems",
    summary: "AI-assisted backend patterns and intelligent workflows.",
    topics: [
      "RAG",
      "Prompt engineering",
      "AI API integrations",
      "Context-aware backends",
      "Vector retrieval",
    ],
    platform: "OpenAI, Claude, Cursor, ChatGPT, Gemini",
    status: "Completed",
    focus: "Intelligent backends with AI integration.",
  },
];

export default function Certifications() {
  return (
    <Section id="certifications" className="bg-zinc-950/45">
      <SectionHeader
        title="Certifications"
        subtitle="Programs aligned with production backend work."
      />

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex min-w-0 flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-xl backdrop-blur-md transition-colors sm:rounded-3xl sm:p-8 hover:border-zinc-700"
          >
            <div className="mb-4 flex flex-col gap-3 border-b border-zinc-800 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h3 className="text-lg font-bold tracking-tight text-zinc-50 sm:text-xl md:text-2xl">
                {item.title}
              </h3>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                {item.status}
              </span>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-zinc-400 sm:mb-6 sm:text-base">{item.summary}</p>

            <div className="mb-5 sm:mb-6">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:mb-3">
                Topics
              </h4>
              <ul className="space-y-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                {item.topics.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500/80" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-auto space-y-3 border-t border-zinc-800/80 pt-5 text-xs sm:pt-6 sm:text-sm">
              <div>
                <dt className="font-semibold text-zinc-500">Platform</dt>
                <dd className="mt-1 break-words text-zinc-300">{item.platform}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-500">Focus</dt>
                <dd className="mt-1 text-zinc-400">{item.focus}</dd>
              </div>
              {item.credentialUrl ? (
                <div>
                  <dt className="font-semibold text-zinc-500">Credential</dt>
                  <dd className="mt-1 flex flex-col gap-1.5">
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
                    >
                      {item.credentialLabel ?? "Open credential"}
                    </a>
                    {item.secondaryCredentialUrl ? (
                      <a
                        href={item.secondaryCredentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-300 hover:underline"
                      >
                        {item.secondaryCredentialLabel ?? "Related link"}
                      </a>
                    ) : null}
                  </dd>
                </div>
              ) : null}
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
