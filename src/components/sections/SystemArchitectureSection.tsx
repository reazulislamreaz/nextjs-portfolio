import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";

const pillars: { title: string; items: string[] }[] = [
  {
    title: "Service architecture",
    items: [
      "Monolith → microservice transition strategy",
      "API gateway pattern",
      "Service-to-service communication (REST / event-driven)",
      "Database-per-service design",
    ],
  },
  {
    title: "Data, cache & async work",
    items: [
      "Caching layer using Redis",
      "Background job processing (queues)",
    ],
  },
  {
    title: "API safety & payments",
    items: [
      "Rate limiting and API protection strategies",
      "Idempotent APIs for payment flows",
    ],
  },
  {
    title: "AI & provider integrations",
    items: [
      "Scalable AI integration using RAG (retrieval-augmented generation)",
      "Payment methods (Stripe, SSLCommerz, M-Pesa)",
    ],
  },
];

export default function SystemArchitecture() {
  return (
    <Section id="system-architecture" className="bg-zinc-950/50">
      <SectionHeader
        title="System Architecture & Scalability"
        subtitle="How I think about growth paths, boundaries, and safe integrations before the first production deploy."
      />

      <p className="mx-auto mb-8 max-w-3xl px-1 text-center text-base leading-relaxed text-zinc-300 sm:mb-10 sm:text-lg lg:mb-12 lg:text-xl">
        I design backend systems with scalability, performance, and maintainability in mind.
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
