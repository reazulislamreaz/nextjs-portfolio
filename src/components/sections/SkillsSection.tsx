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
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiReactquery,
  SiRedux,
  SiRedis,
  SiSocketdotio,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVite,
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

interface SkillCategory {
  title: string;
  hint?: string;
  skills: SkillData[];
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
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "from-blue-500/20 to-blue-700/20",
    iconColor: "text-blue-400",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "from-teal-400/20 to-cyan-500/20",
    iconColor: "text-teal-400",
  },
  {
    name: "TanStack Query",
    icon: <SiReactquery />,
    color: "from-red-500/20 to-orange-600/20",
    iconColor: "text-red-400",
  },
  {
    name: "Redux Toolkit",
    icon: <SiRedux />,
    color: "from-purple-500/20 to-violet-600/20",
    iconColor: "text-purple-400",
  },
  {
    name: "Zustand",
    icon: <LuBoxes />,
    color: "from-amber-500/20 to-orange-600/20",
    iconColor: "text-amber-400",
  },
  {
    name: "Vite",
    icon: <SiVite />,
    color: "from-violet-500/20 to-fuchsia-600/20",
    iconColor: "text-violet-400",
  },
];

const skillCategories: SkillCategory[] = [
  { title: "Backend & APIs", skills: backendSkills },
  { title: "Databases & modeling", skills: databaseSkills },
  { title: "Architecture", skills: architectureSkills },
  { title: "Performance & reliability", skills: performanceSkills },
  {
    title: "DevOps & cloud",
    hint: "Containers, reverse proxies, cloud deploys, and CI/CD for production releases.",
    skills: devOpsSkills,
  },
  {
    title: "AI & payments",
    hint: "RAG, AI integrations, and payment webhooks with idempotency and provider edge cases.",
    skills: aiSkills,
  },
  { title: "Frontend (when needed)", skills: frontendSkills },
];

const highlights: { title: string; description: string }[] = [
  {
    title: "6+",
    description: "Live systems with APIs & data layers",
  },
  {
    title: "API-first",
    description: "Validation, auth, and clear contracts",
  },
  {
    title: "Production-minded",
    description: "Limits, caching, and safe releases",
  },
];

function SkillCategoryPanel({ title, hint, skills }: SkillCategory) {
  return (
    <article className="rounded-xl border border-zinc-800/70 bg-zinc-900/35 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-200 sm:text-base">
          {title}
        </h3>
        <span className="shrink-0 rounded-md bg-zinc-800/80 px-2 py-0.5 text-[0.6875rem] font-medium text-zinc-500">
          {skills.length}
        </span>
      </div>
      {hint ? (
        <p className="mb-3 text-xs leading-relaxed text-zinc-500">{hint}</p>
      ) : null}
      <ul
        className="flex flex-wrap gap-2"
        role="list"
        aria-label={`${title} skills`}
      >
        {skills.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </ul>
    </article>
  );
}

export default function Skills() {
  const totalSkills = skillCategories.reduce(
    (count, category) => count + category.skills.length,
    0,
  );

  return (
    <Section id="skills" className="bg-zinc-950/80">
      <SectionHeader
        title="Engineering toolkit"
        subtitle="Backend-first stack — scan by category. Every technology below is in active project use."
      />

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/35 px-4 py-3 sm:px-5"
          >
            <span className="text-lg font-bold text-emerald-400 sm:text-xl">
              {item.title}
            </span>
            <span className="text-xs leading-snug text-zinc-400 sm:text-sm">
              {item.description}
            </span>
          </div>
        ))}
      </div>

      <p className="mb-6 text-xs text-zinc-600 sm:text-sm">
        {totalSkills} technologies across {skillCategories.length} areas
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {skillCategories.map((category) => (
          <SkillCategoryPanel key={category.title} {...category} />
        ))}
      </div>
    </Section>
  );
}
