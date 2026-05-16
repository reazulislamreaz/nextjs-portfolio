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
      className={`scroll-mt-24 sm:scroll-mt-28 relative z-10 px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-8 lg:py-20 xl:px-12 xl:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl min-w-0">{children}</div>
    </section>
  );
}
