"use client";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      <h2 className="max-w-full text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:mt-3.5 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
