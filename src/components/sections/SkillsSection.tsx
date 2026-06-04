import type { ReactNode } from "react";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SkillCard from "@/app/components/ui/SkillCard";
import { FaNodeJs, FaReact, FaRobot } from "react-icons/fa";
import {
  SiAmazonwebservices,
  SiDigitalocean,
  SiDocker,
  SiHostinger,
  SiExpress,
  SiGithubactions,
  SiGo,
  SiGraphql,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiRedis,
  SiSocketdotio,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  TbApi,
  TbCloud,
  TbLock,
  TbSchema,
  TbShieldLock,
  TbSparkles,
  TbTopologyStar3,
  TbCurrencyDollar,
} from "react-icons/tb";
import { LuBoxes } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";

interface SkillData {
  name: string;
  icon: ReactNode;
  color: string;
  iconColor: string;
}

const backendSkills: SkillData[] = [
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "from-green-500/20 to-green-700/20",
    iconColor: "text-green-500",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "from-blue-500/20 to-blue-700/20",
    iconColor: "text-blue-400",
  },
  {
    name: "Go",
    icon: <SiGo />,
    color: "from-sky-500/20 to-blue-700/20",
    iconColor: "text-sky-400",
  },
  {
    name: "Express.js",
    icon: <SiExpress />,
    color: "from-zinc-500/20 to-zinc-800/20",
    iconColor: "text-zinc-300",
  },
  {
    name: "NestJS",
    icon: <SiNestjs />,
    color: "from-red-500/20 to-red-700/20",
    iconColor: "text-red-500",
  },
  {
    name: "REST APIs",
    icon: <TbApi />,
    color: "from-cyan-500/20 to-blue-600/20",
    iconColor: "text-cyan-400",
  },
  {
    name: "GraphQL",
    icon: <SiGraphql />,
    color: "from-pink-500/20 to-rose-600/20",
    iconColor: "text-pink-400",
  },
  {
    name: "Microservices",
    icon: <LuBoxes />,
    color: "from-emerald-500/20 to-teal-700/20",
    iconColor: "text-emerald-400",
  },
];

const databaseSkills: SkillData[] = [
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    color: "from-green-600/20 to-green-800/20",
    iconColor: "text-green-500",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    color: "from-blue-500/20 to-indigo-600/20",
    iconColor: "text-blue-500",
  },
  {
    name: "MySQL",
    icon: <SiMysql />,
    color: "from-orange-500/20 to-amber-600/20",
    iconColor: "text-orange-400",
  },
  {
    name: "SQL",
    icon: <TbSchema />,
    color: "from-amber-500/20 to-yellow-600/20",
    iconColor: "text-amber-400",
  },
  {
    name: "Database design",
    icon: <TbTopologyStar3 />,
    color: "from-zinc-400/20 to-zinc-600/20",
    iconColor: "text-zinc-300",
  },
];

const architectureSkills: SkillData[] = [
  {
    name: "System design",
    icon: <TbTopologyStar3 />,
    color: "from-zinc-400/20 to-zinc-600/20",
    iconColor: "text-zinc-200",
  },
  {
    name: "API architecture",
    icon: <TbApi />,
    color: "from-emerald-400/20 to-teal-600/20",
    iconColor: "text-emerald-400",
  },
  {
    name: "Auth & RBAC",
    icon: <TbLock />,
    color: "from-purple-500/20 to-pink-600/20",
    iconColor: "text-purple-400",
  },
  {
    name: "Event-driven patterns",
    icon: <SiSocketdotio />,
    color: "from-zinc-200/20 to-zinc-400/20",
    iconColor: "text-zinc-200",
  },
];

const performanceSkills: SkillData[] = [
  {
    name: "Redis",
    icon: <SiRedis />,
    color: "from-red-500/20 to-red-800/20",
    iconColor: "text-red-400",
  },
  {
    name: "Caching",
    icon: <TbCloud />,
    color: "from-orange-500/20 to-amber-600/20",
    iconColor: "text-orange-300",
  },
  {
    name: "Rate limiting",
    icon: <TbShieldLock />,
    color: "from-slate-500/20 to-slate-700/20",
    iconColor: "text-slate-300",
  },
  {
    name: "Queues & workers",
    icon: <HiOutlineQueueList />,
    color: "from-cyan-600/20 to-blue-800/20",
    iconColor: "text-cyan-300",
  },
];

const devOpsSkills: SkillData[] = [
  {
    name: "Docker",
    icon: <SiDocker />,
    color: "from-blue-500/20 to-sky-700/20",
    iconColor: "text-blue-400",
  },
  {
    name: "Docker Compose",
    icon: <SiDocker />,
    color: "from-sky-500/20 to-blue-800/20",
    iconColor: "text-sky-400",
  },
  {
    name: "Nginx",
    icon: <SiNginx />,
    color: "from-green-600/20 to-emerald-800/20",
    iconColor: "text-green-500",
  },
  {
    name: "AWS · EC2 · S3",
    icon: <SiAmazonwebservices />,
    color: "from-amber-500/20 to-orange-700/20",
    iconColor: "text-amber-400",
  },
  {
    name: "AWS IAM & VPC",
    icon: <SiAmazonwebservices />,
    color: "from-yellow-500/20 to-amber-700/20",
    iconColor: "text-yellow-400",
  },
  {
    name: "DigitalOcean",
    icon: <SiDigitalocean />,
    color: "from-blue-600/20 to-indigo-800/20",
    iconColor: "text-blue-400",
  },
  {
    name: "Hostinger",
    icon: <SiHostinger />,
    color: "from-violet-600/20 to-purple-800/20",
    iconColor: "text-violet-400",
  },
  {
    name: "CI/CD",
    icon: <SiGithubactions />,
    color: "from-zinc-400/20 to-zinc-700/20",
    iconColor: "text-zinc-200",
  },
  {
    name: "GitHub Actions",
    icon: <SiGithubactions />,
    color: "from-indigo-500/20 to-violet-700/20",
    iconColor: "text-indigo-300",
  },
  {
    name: "Linux",
    icon: <SiLinux />,
    color: "from-zinc-300/20 to-zinc-600/20",
    iconColor: "text-zinc-300",
  },
  {
    name: "CloudWatch",
    icon: <TbCloud />,
    color: "from-rose-500/20 to-pink-700/20",
    iconColor: "text-rose-300",
  },
  {
    name: "Serverless · Lambda",
    icon: <SiAmazonwebservices />,
    color: "from-violet-500/20 to-purple-800/20",
    iconColor: "text-violet-300",
  },
];

const aiSkills: SkillData[] = [
  {
    name: "RAG",
    icon: <TbSparkles />,
    color: "from-violet-500/20 to-fuchsia-600/20",
    iconColor: "text-violet-300",
  },
  {
    name: "AI tooling",
    icon: <FaRobot />,
    color: "from-purple-400/20 to-fuchsia-500/20",
    iconColor: "text-purple-300",
  },
  {
    name: "Stripe",
    icon: <SiStripe />,
    color: "from-indigo-500/20 to-violet-600/20",
    iconColor: "text-indigo-300",
  },
  {
    name: "SSLCommerz · M-Pesa",
    icon: <TbCurrencyDollar />,
    color: "from-teal-500/20 to-emerald-700/20",
    iconColor: "text-teal-300",
  },
];

const frontendSkills: SkillData[] = [
  {
    name: "React",
    icon: <FaReact />,
    color: "from-cyan-400/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color: "from-zinc-300/20 to-zinc-600/20",
    iconColor: "text-zinc-300",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "from-teal-400/20 to-cyan-500/20",
    iconColor: "text-teal-400",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    color: "from-yellow-400/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
];

const highlights: { title: string; description: string }[] = [
  {
    title: "6",
    description: "Portfolio systems with live APIs and data layers",
  },
  {
    title: "API-first",
    description: "Contracts, validation, and auth boundaries by default",
  },
  {
    title: "Safe releases",
    description: "Idempotency, limits, and observability-minded structure",
  },
];

function SkillGrid({ skills }: { skills: SkillData[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {skills.map((skill, index) => (
        <SkillCard key={`${skill.name}-${index}`} skill={skill} />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" className="bg-zinc-950/80">
      <SectionHeader
        title="Engineering toolkit"
        subtitle="Backend and platform work first — frontend stack when the product needs a polished surface."
      />

      <div className="mb-10 sm:mb-12 lg:mb-14">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl md:text-2xl">
            Backend & APIs
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>
        <SkillGrid skills={backendSkills} />
      </div>

      <div className="mb-10 sm:mb-12 lg:mb-14">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl md:text-2xl">
            Databases & modeling
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>
        <SkillGrid skills={databaseSkills} />
      </div>

      <div className="mb-10 sm:mb-12 lg:mb-14">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl md:text-2xl">
            Architecture
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>
        <SkillGrid skills={architectureSkills} />
      </div>

      <div className="mb-10 sm:mb-12 lg:mb-14">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl md:text-2xl">
            Performance & reliability
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>
        <SkillGrid skills={performanceSkills} />
      </div>

      <div className="mb-10 sm:mb-12 lg:mb-14">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl md:text-2xl">
            DevOps & cloud
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>
        <p className="mb-6 max-w-3xl text-sm text-zinc-500">
          From Programming Hero Next Level and Udemy AWS training — containerized apps, reverse
          proxies, cloud deploys, and automated pipelines for production-ready releases.
        </p>
        <SkillGrid skills={devOpsSkills} />
      </div>

      <div className="mb-10 sm:mb-12 lg:mb-14">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl md:text-2xl">
            AI & payments
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>
        <p className="mb-6 max-w-3xl text-sm text-zinc-500">
          Payment and AI items reflect integrations I design for carefully: idempotent webhooks,
          scoped retrieval for RAG, and provider-specific edge cases.
        </p>
        <SkillGrid skills={aiSkills} />
      </div>

      <div className="mb-10 sm:mb-12 lg:mb-16">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-200 sm:text-xl md:text-2xl">
            Frontend (when needed)
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>
        <SkillGrid skills={frontendSkills} />
      </div>

      <div className="mx-auto mt-12 max-w-4xl md:mt-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 md:rounded-3xl md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div
                  className={`mb-2 font-black text-zinc-50 md:mb-3 ${
                    item.title.length <= 2
                      ? "text-3xl md:text-4xl"
                      : "text-xl md:text-2xl"
                  }`}
                >
                  {item.title}
                </div>
                <div className="text-sm font-medium tracking-wide text-zinc-400 md:text-base">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
