import type { TechItem } from "./tech";

interface TechMarqueeProps {
  items: TechItem[];
  reverse?: boolean;
  duration?: string;
  label: string;
}

function Row({ items }: { items: TechItem[] }) {
  return (
    <>
      {items.map((tech) => {
        const Icon = tech.icon;
        return (
          <span
            key={tech.name}
            className="badge-tech mx-1.5 px-3 py-2"
          >
            <Icon className="text-sm text-emerald-400" aria-hidden />
            <span className="tracking-tight">{tech.name}</span>
          </span>
        );
      })}
    </>
  );
}

export default function TechMarquee({
  items,
  reverse = false,
  duration = "46s",
  label,
}: TechMarqueeProps) {
  return (
    <div
      className="marquee-mask relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="region"
      aria-label={label}
    >
      <div
        className="marquee-track py-1"
        data-reverse={reverse ? "true" : undefined}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        <Row items={items} />
        <Row items={items} />
      </div>
    </div>
  );
}
