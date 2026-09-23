"use client";

import Section from "@/app/components/ui/Section";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { gsap } from "@/lib/gsap";
import { ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  summary: string;
  platform: string;
  credentialUrl?: string;
  credentialLabel?: string;
}

const items: Certification[] = [
  {
    title: "Full Stack Web Development",
    summary:
      "React, Next.js, and Node.js — APIs and full-stack application delivery.",
    platform: "Udemy — React, Next.js, Node.js",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-6e1f340a-b9ee-4cda-8cd8-74de0b57ba5a/",
    credentialLabel: "View certificate",
  },
  {
    title: "AWS Cloud Computing",
    summary:
      "AWS fundamentals, VPC networking, and backend deployment patterns.",
    platform: "Udemy — Cloud Computing with AWS",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-737af03a-d89d-4d2f-98e3-5c48dc7d0e8f/",
    credentialLabel: "View certificate",
  },
  {
    title: "Next Level Web Development",
    summary:
      "TypeScript full-stack bootcamp with production-oriented delivery patterns.",
    platform: "Programming Hero — Next Level Bootcamp",
    credentialUrl: "https://next.programming-hero.com/",
    credentialLabel: "Bootcamp overview",
  },
];

export default function Certifications() {
  const containerRef = useGsapScroll<HTMLDivElement>((_, isReduced) => {
    if (isReduced) return;

    gsap.fromTo(
      "[data-cert]",
      { y: 18, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "[data-certs]",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  });

  return (
    <Section id="certifications" tight>
      <div ref={containerRef}>
        <SectionHeader
          eyebrow="Credentials"
          title="Certifications & coursework"
          subtitle="Focused study in full-stack delivery and AWS."
        />

        <div
          data-certs
          className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {items.map((item) => (
            <article
              key={item.title}
              data-cert
              className="surface-card flex min-w-0 flex-col rounded-lg p-5"
            >
              <h3 className="text-[0.9375rem] font-medium tracking-tight text-zinc-50 sm:text-base">
                {item.title}
              </h3>
              <p className="type-body mt-2 flex-1 text-pretty text-[0.875rem] leading-relaxed">
                {item.summary}
              </p>
              <p className="type-meta mt-4">{item.platform}</p>
              {item.credentialUrl ? (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent mt-2.5 !min-h-9 px-0 hover:bg-transparent"
                >
                  {item.credentialLabel ?? "Open credential"}
                  <ExternalLink size={13} aria-hidden />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
