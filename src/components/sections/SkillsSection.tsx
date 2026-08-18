"use client";

import type { ReactNode } from "react";
import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SkillCard, { type Skill } from "@/app/components/ui/SkillCard";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import {
  SiAmazoncloudwatch,
  SiAmazonwebservices,
  SiAwslambda,
  SiDigitalocean,
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiGo,
  SiGraphql,
  SiHostinger,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import {
  TbActivity,
  TbApi,
  TbBolt,
  TbBrain,
  TbCloud,
  TbCpu,
  TbCreditCard,
  TbDatabase,
  TbGauge,
  TbInfinity,
  TbKey,
  TbLayersLinked,
  TbLayout,
  TbRoute,
  TbServer,
  TbShieldCheck,
  TbSparkles,
  TbTopologyStar3,
} from "react-icons/tb";
import { LuBoxes } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";

interface SkillCategory {
  title: string;
  icon: ReactNode;
  iconBg: string;
  hint?: string;
  skills: Skill[];
}

const architecturePipeline = [
  { step: "01", name: "REST / GraphQL", desc: "API Gateway & Validation", tech: "NestJS · Express · Go", icon: <TbApi /> },
  { step: "02", name: "Auth & Security", desc: "RBAC · JWT · Rate Limiting", tech: "Guards · Helmet · CORS", icon: <TbKey /> },
  { step: "03", name: "Relational & NoSQL", desc: "ACID Schemas & Aggregations", tech: "PostgreSQL · MongoDB", icon: <TbDatabase /> },
  { step: "04", name: "Sub-ms Cache", desc: "Memory Stores & Sessions", tech: "Redis · In-Memory", icon: <TbGauge /> },
  { step: "05", name: "Job Queues", desc: "Async Workers & Outbox", tech: "BullMQ · Event Loops", icon: <HiOutlineQueueList /> },
  { step: "06", name: "Cloud & Ops", desc: "Containers & CI/CD", tech: "Docker · AWS · Nginx", icon: <TbCloud /> },
];

const backendSkills: Skill[] = [
  {
    name: "Node.js",
    icon: <SiNodedotjs />,
    iconColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border border-emerald-500/20",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border border-blue-500/20",
  },
  {
    name: "Go",
    icon: <SiGo />,
    iconColor: "text-cyan-500",
    badgeBg: "bg-cyan-500/10 border border-cyan-500/20",
  },
  {
    name: "Express.js",
    icon: <SiExpress />,
    iconColor: "text-zinc-400",
    badgeBg: "bg-zinc-500/10 border border-zinc-500/20",
  },
  {
    name: "NestJS",
    icon: <SiNestjs />,
    iconColor: "text-rose-500",
    badgeBg: "bg-rose-500/10 border border-rose-500/20",
  },
  {
    name: "REST APIs",
    icon: <TbApi />,
    iconColor: "text-teal-500",
    badgeBg: "bg-teal-500/10 border border-teal-500/20",
  },
  {
    name: "GraphQL",
    icon: <SiGraphql />,
    iconColor: "text-pink-500",
    badgeBg: "bg-pink-500/10 border border-pink-500/20",
  },
  {
    name: "Microservices",
    icon: <LuBoxes />,
    iconColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border border-emerald-500/20",
  },
];

const databaseSkills: Skill[] = [
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    iconColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border border-emerald-500/20",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border border-blue-500/20",
  },
  {
    name: "MySQL",
    icon: <SiMysql />,
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border border-amber-500/20",
  },
  {
    name: "SQL",
    icon: <TbDatabase />,
    iconColor: "text-cyan-500",
    badgeBg: "bg-cyan-500/10 border border-cyan-500/20",
  },
  {
    name: "Database design",
    icon: <TbLayersLinked />,
    iconColor: "text-violet-500",
    badgeBg: "bg-violet-500/10 border border-violet-500/20",
  },
];

const architectureSkills: Skill[] = [
  {
    name: "System design",
    icon: <TbTopologyStar3 />,
    iconColor: "text-purple-500",
    badgeBg: "bg-purple-500/10 border border-purple-500/20",
  },
  {
    name: "API architecture",
    icon: <TbRoute />,
    iconColor: "text-teal-500",
    badgeBg: "bg-teal-500/10 border border-teal-500/20",
  },
  {
    name: "Auth & RBAC",
    icon: <TbKey />,
    iconColor: "text-indigo-500",
    badgeBg: "bg-indigo-500/10 border border-indigo-500/20",
  },
  {
    name: "Event-driven patterns",
    icon: <TbBolt />,
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border border-amber-500/20",
  },
];

const performanceSkills: Skill[] = [
  {
    name: "Redis",
    icon: <SiRedis />,
    iconColor: "text-red-500",
    badgeBg: "bg-red-500/10 border border-red-500/20",
  },
  {
    name: "Caching",
    icon: <TbGauge />,
    iconColor: "text-orange-500",
    badgeBg: "bg-orange-500/10 border border-orange-500/20",
  },
  {
    name: "Rate limiting",
    icon: <TbShieldCheck />,
    iconColor: "text-sky-500",
    badgeBg: "bg-sky-500/10 border border-sky-500/20",
  },
  {
    name: "Queues & workers",
    icon: <HiOutlineQueueList />,
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border border-blue-500/20",
  },
];

const devOpsSkills: Skill[] = [
  {
    name: "Docker",
    icon: <SiDocker />,
    iconColor: "text-sky-500",
    badgeBg: "bg-sky-500/10 border border-sky-500/20",
  },
  {
    name: "Docker Compose",
    icon: <SiDocker />,
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border border-blue-500/20",
  },
  {
    name: "Nginx",
    icon: <SiNginx />,
    iconColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border border-emerald-500/20",
  },
  {
    name: "AWS · EC2 · S3",
    icon: <SiAmazonwebservices />,
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border border-amber-500/20",
  },
  {
    name: "AWS IAM & VPC",
    icon: <SiAmazonwebservices />,
    iconColor: "text-yellow-500",
    badgeBg: "bg-yellow-500/10 border border-yellow-500/20",
  },
  {
    name: "DigitalOcean",
    icon: <SiDigitalocean />,
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border border-blue-500/20",
  },
  {
    name: "Hostinger",
    icon: <SiHostinger />,
    iconColor: "text-purple-500",
    badgeBg: "bg-purple-500/10 border border-purple-500/20",
  },
  {
    name: "CI/CD",
    icon: <TbInfinity />,
    iconColor: "text-teal-500",
    badgeBg: "bg-teal-500/10 border border-teal-500/20",
  },
  {
    name: "GitHub Actions",
    icon: <SiGithubactions />,
    iconColor: "text-indigo-500",
    badgeBg: "bg-indigo-500/10 border border-indigo-500/20",
  },
  {
    name: "Linux",
    icon: <SiLinux />,
    iconColor: "text-yellow-500",
    badgeBg: "bg-yellow-500/10 border border-yellow-500/20",
  },
  {
    name: "CloudWatch",
    icon: <SiAmazoncloudwatch />,
    iconColor: "text-rose-500",
    badgeBg: "bg-rose-500/10 border border-rose-500/20",
  },
  {
    name: "Serverless · Lambda",
    icon: <SiAwslambda />,
    iconColor: "text-orange-500",
    badgeBg: "bg-orange-500/10 border border-orange-500/20",
  },
];

const aiSkills: Skill[] = [
  {
    name: "RAG",
    icon: <TbBrain />,
    iconColor: "text-violet-500",
    badgeBg: "bg-violet-500/10 border border-violet-500/20",
  },
  {
    name: "AI tooling",
    icon: <SiOpenai />,
    iconColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border border-emerald-500/20",
  },
  {
    name: "Stripe",
    icon: <SiStripe />,
    iconColor: "text-indigo-500",
    badgeBg: "bg-indigo-500/10 border border-indigo-500/20",
  },
  {
    name: "SSLCommerz · M-Pesa",
    icon: <TbCreditCard />,
    iconColor: "text-teal-500",
    badgeBg: "bg-teal-500/10 border border-teal-500/20",
  },
];

const frontendSkills: Skill[] = [
  {
    name: "React",
    icon: <SiReact />,
    iconColor: "text-cyan-500",
    badgeBg: "bg-cyan-500/10 border border-cyan-500/20",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    iconColor: "text-zinc-400",
    badgeBg: "bg-zinc-500/10 border border-zinc-500/20",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border border-blue-500/20",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    iconColor: "text-teal-500",
    badgeBg: "bg-teal-500/10 border border-teal-500/20",
  },
  {
    name: "TanStack Query",
    icon: <SiReactquery />,
    iconColor: "text-rose-500",
    badgeBg: "bg-rose-500/10 border border-rose-500/20",
  },
  {
    name: "Redux Toolkit",
    icon: <SiRedux />,
    iconColor: "text-purple-500",
    badgeBg: "bg-purple-500/10 border border-purple-500/20",
  },
  {
    name: "Zustand",
    icon: <LuBoxes />,
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border border-amber-500/20",
  },
  {
    name: "Vite",
    icon: <SiVite />,
    iconColor: "text-violet-500",
    badgeBg: "bg-violet-500/10 border border-violet-500/20",
  },
];

const skillCategories: SkillCategory[] = [
  {
    title: "Backend & APIs",
    icon: <TbServer className="text-emerald-400" />,
    iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    skills: backendSkills,
  },
  {
    title: "Databases & modeling",
    icon: <TbDatabase className="text-blue-400" />,
    iconBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    skills: databaseSkills,
  },
  {
    title: "Architecture",
    icon: <TbCpu className="text-purple-400" />,
    iconBg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    skills: architectureSkills,
  },
  {
    title: "Performance & reliability",
    icon: <TbActivity className="text-amber-400" />,
    iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    skills: performanceSkills,
  },
  {
    title: "DevOps & cloud",
    icon: <TbCloud className="text-sky-400" />,
    iconBg: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    hint: "Containers, proxies, cloud deploys, and CI/CD.",
    skills: devOpsSkills,
  },
  {
    title: "AI & payments",
    icon: <TbSparkles className="text-fuchsia-400" />,
    iconBg: "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20",
    hint: "RAG, AI integrations, and idempotent payment webhooks.",
    skills: aiSkills,
  },
  {
    title: "Frontend (when needed)",
    icon: <TbLayout className="text-teal-400" />,
    iconBg: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    skills: frontendSkills,
  },
];

function SkillCategoryPanel({ title, icon, iconBg, hint, skills }: SkillCategory) {
  return (
    <article
      data-skill-category
      className="group/card relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-zinc-700 sm:p-5"
    >
      <div className="mb-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm sm:text-base ${iconBg}`}
          >
            {icon}
          </span>
          <h3 className="text-sm font-semibold tracking-tight text-zinc-100 sm:text-base">
            {title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-zinc-400">
          {skills.length}
        </span>
      </div>
      {hint ? (
        <p className="mb-3.5 text-xs leading-relaxed text-zinc-400">{hint}</p>
      ) : null}
      <ul
        className="flex flex-wrap gap-2 sm:gap-2.5"
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
  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    // Timeline for Backend Architecture Flow
    gsap.fromTo(
      "[data-pipeline-node]",
      { y: 20, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: "[data-pipeline-container]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    // Staggered reveal for Skill Category cards
    gsap.fromTo(
      "[data-skill-category]",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-skills-grid]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  });

  const totalSkills = skillCategories.reduce(
    (count, category) => count + category.skills.length,
    0
  );

  return (
    <Section id="skills" className="bg-zinc-950/80">
      <div ref={containerRef}>
        <SectionHeader
          title="Skills & Backend Architecture"
          subtitle="Production-tested systems engineering — from API contracts to high-availability infrastructure."
        />

        {/* Backend Architecture Storytelling Pipeline */}
        <div
          data-pipeline-container
          className="mb-10 sm:mb-12 overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 p-4 sm:p-6 backdrop-blur-xl shadow-xl"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3 text-xs font-mono">
            <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 live-beacon" />
              BACKEND SYSTEM LIFECYCLE
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              END-TO-END FLOW ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3.5">
            {architecturePipeline.map((node) => (
              <div
                key={node.step}
                data-pipeline-node
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-850 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-500">
                      {node.step}
                    </span>
                    <span className="text-base text-zinc-300 group-hover:text-zinc-50 transition-colors">
                      {node.icon}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-100 group-hover:text-zinc-50">
                    {node.name}
                  </h4>
                  <p className="mt-1 text-[11px] text-zinc-400 leading-tight">
                    {node.desc}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-zinc-800/60">
                  <span className="text-[10px] font-mono text-zinc-400 font-medium">
                    {node.tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mb-6 text-xs text-zinc-400 sm:text-sm">
          {totalSkills} technologies across {skillCategories.length} functional areas
        </p>

        <div
          data-skills-grid
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
        >
          {skillCategories.map((category) => (
            <SkillCategoryPanel key={category.title} {...category} />
          ))}
        </div>
      </div>
    </Section>
  );
}
