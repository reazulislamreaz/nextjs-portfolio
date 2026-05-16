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
    <div className="group relative min-h-[9.5rem] w-full cursor-default sm:min-h-40">
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40
                      shadow-xl backdrop-blur-md transition-all duration-300
                      group-hover:border-zinc-700 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.03)]"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color}
                        opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-6">
        <div
          className={`mb-3 text-4xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1 sm:mb-4 sm:text-5xl md:text-6xl ${skill.iconColor}`}
        >
          {skill.icon}
        </div>

        <h3
          className="text-center text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200 sm:text-sm md:text-base"
        >
          {skill.name}
        </h3>

        <div
          className={`mt-3 h-0.5 w-0 rounded-full bg-gradient-to-r ${skill.color.replace(
            "/20",
            "/80"
          )} opacity-0 transition-all duration-500 ease-out group-hover:w-12 group-hover:opacity-100`}
        />
      </div>
    </div>
  );
}
