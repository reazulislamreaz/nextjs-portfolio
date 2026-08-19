"use client";

import { type ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative z-10 scroll-mt-[var(--nav-scroll-offset)] pt-4 pb-10 sm:pt-5 sm:pb-12 lg:pt-6 lg:pb-16 xl:pb-20 ${className}`}
      style={{ scrollMarginTop: "var(--nav-scroll-offset)" }}
    >
      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8 xl:px-12">
        {children}
      </div>
    </section>
  );
}
