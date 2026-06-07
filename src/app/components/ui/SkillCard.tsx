import { type ReactNode } from "react";

interface Skill {
  name: string;
  icon: ReactNode;
  color: string;
  iconColor: string;
}

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <li>
      <span
        className="inline-flex max-w-full items-center gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/50 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900/80 sm:px-3 sm:text-sm"
        title={skill.name}
      >
        <span className={`shrink-0 text-base leading-none ${skill.iconColor}`} aria-hidden>
          {skill.icon}
        </span>
        <span className="truncate">{skill.name}</span>
      </span>
    </li>
  );
}
