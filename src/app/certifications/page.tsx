import Section from "../components/ui/Section";
import SectionHeader from "../components/ui/SectionHeader";

interface Certification {
  title: string;
  summary: string;
  topics: string[];
  platform: string;
  status: string;
  focus: string;
  credentialUrl?: string;
  credentialLabel?: string;
}

const items: Certification[] = [
  {
    title: "Next Level Web Development",
    summary:
      "Advanced full-stack program focused on scalable, production-ready web applications.",
    topics: [
      "Advanced React & Next.js",
      "Backend development with Node.js & Express",
      "MongoDB & database design",
      "Authentication & authorization (JWT, Firebase)",
      "REST API design & integration",
      "Real-world project development",
    ],
    platform: "Programming Hero",
    status: "Completed",
    focus:
      "Building real-world full-stack applications with strong backend architecture.",
  },
  {
    title: "AWS Cloud Computing",
    summary:
      "Hands-on cloud training focused on real-world infrastructure and backend deployment on AWS.",
    topics: [
      "AWS IAM & security",
      "EC2, S3, VPC",
      "Load balancing & auto scaling",
      "AWS Lambda & serverless basics",
      "CloudWatch monitoring",
      "CI/CD & deployment concepts",
      "Docker & cloud infrastructure fundamentals",
    ],
    platform: "Udemy — Hands-On Introduction to Cloud Computing with AWS",
    status: "Completed",
    focus: "Scalable backend systems, cloud deployment, and infrastructure design.",
    credentialUrl:
      "https://www.udemy.com/course/hands-on-introduction-to-cloud-computing-with-aws/",
    credentialLabel: "View course on Udemy",
  },
  {
    title: "Full Stack Web Development",
    summary:
      "Full-stack training covering modern web technologies and real-world application development.",
    topics: [
      "React & Next.js (frontend)",
      "Node.js & Express.js (backend APIs)",
      "MongoDB (database design)",
      "Authentication & authorization (JWT)",
      "REST API development",
      "Full-stack application architecture",
    ],
    platform: "Udemy — Full Stack Development (React, Next.js, Node.js)",
    status: "Completed",
    focus: "End-to-end application development with backend integration.",
    credentialUrl:
      "https://www.udemy.com/course/full-stack-development-for-beginner-react-nextjs-nodejs/",
    credentialLabel: "View course on Udemy",
  },
  {
    title: "AI & Intelligent Systems",
    summary:
      "Modern AI-assisted backend patterns and intelligent application workflows.",
    topics: [
      "RAG (retrieval-augmented generation)",
      "Prompt engineering fundamentals",
      "AI API integrations",
      "Context-aware backend systems",
      "Vector-based retrieval concepts",
    ],
    platform: "OpenAI, Claude, Cursor, ChatGPT, Gemini",
    status: "Completed",
    focus: "Building intelligent backend systems with AI integration.",
  },
];

export default function Certifications() {
  return (
    <Section id="certifications" className="bg-black/45">
      <SectionHeader
        title="Certifications & Learning"
        subtitle="Formal programs and structured learning that align with production backend and full-stack work."
      />

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex min-w-0 flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-xl backdrop-blur-md transition-colors sm:rounded-3xl sm:p-8 hover:border-zinc-700"
          >
            <div className="mb-4 flex flex-col gap-3 border-b border-zinc-800 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl">
                {item.title}
              </h3>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                {item.status}
              </span>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-zinc-400 sm:mb-6 sm:text-base">{item.summary}</p>

            <div className="mb-5 sm:mb-6">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:mb-3">
                Topics covered
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
                  <dd className="mt-1">
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
                    >
                      {item.credentialLabel ?? "Open credential"}
                    </a>
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
