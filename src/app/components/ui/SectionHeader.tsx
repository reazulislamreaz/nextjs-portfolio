"use client";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10 lg:mb-12">
      {eyebrow ? <p className="type-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="type-section">{title}</h2>
      {subtitle ? (
        <p className="type-body mt-3 max-w-xl text-pretty">{subtitle}</p>
      ) : null}
    </div>
  );
}
