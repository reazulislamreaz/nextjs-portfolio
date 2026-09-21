"use client";

import { type ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
}

export default function Section({
  id,
  children,
  className = "",
  tight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative z-10 scroll-mt-[var(--nav-scroll-offset)] ${
        tight ? "py-14 sm:py-16 lg:py-20" : "py-16 sm:py-20 lg:py-24"
      } ${className}`}
    >
      <div
        className={`mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 xl:px-12 ${
          tight ? "max-w-5xl" : "max-w-7xl"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
