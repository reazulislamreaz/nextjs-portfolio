import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";

const pillars: { title: string; items: string[] }[] = [
  {
    title: "Services",
    items: [
      "Monolith → microservice strategy",
      "API gateway pattern",
      "REST and event-driven communication",
      "Database-per-service design",
    ],
  },
  {
    title: "Data & async",
    items: ["Redis caching", "Background job queues"],
  },
  {
    title: "API safety & payments",
    items: ["Rate limiting and API protection", "Idempotent payment APIs"],
  },
  {
    title: "AI & integrations",
    items: ["RAG-based AI integration", "Stripe, SSLCommerz, M-Pesa"],
  },
];

export default function SystemArchitecture() {
  return (
    <Section id="system-architecture" className="bg-zinc-950/50">
      <SectionHeader
        title="Architecture & scale"
        subtitle="Growth paths, boundaries, and safe integrations before production."
      />

      <p className="mx-auto mb-8 max-w-3xl px-1 text-center text-base leading-relaxed text-zinc-300 sm:mb-10 sm:text-lg lg:mb-12 lg:text-xl">
        Backends built for scale, performance, and maintainability.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-5 shadow-lg backdrop-blur-md sm:rounded-3xl sm:p-7 md:p-8"
          >
            <h3 className="mb-4 border-b border-zinc-800 pb-2 text-base font-semibold tracking-tight text-zinc-50 sm:mb-5 sm:pb-3 sm:text-lg">
              {pillar.title}
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-[0.95rem]">
              {pillar.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/90"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
