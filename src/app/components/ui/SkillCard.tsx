import { type ReactNode } from "react";

export interface Skill {
  name: string;
  icon: ReactNode;
  color?: string;
  iconColor: string;
  badgeBg?: string;
}

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <li>
      <span
        className="group relative inline-flex items-center gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/80 py-1.5 pl-1.5 pr-2.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-md sm:gap-2.5 sm:rounded-xl sm:pl-2 sm:pr-3.5 sm:text-sm"
        title={skill.name}
      >
        <span
          className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md sm:rounded-lg text-sm sm:text-base transition-transform duration-200 group-hover:scale-110 ${
            skill.badgeBg || "bg-zinc-800/60 border border-zinc-700/60"
          } ${skill.iconColor}`}
          aria-hidden="true"
        >
          {skill.icon}
        </span>
        <span className="font-medium tracking-tight text-zinc-200 transition-colors group-hover:text-zinc-50">
          {skill.name}
        </span>
      </span>
    </li>
  );
}

