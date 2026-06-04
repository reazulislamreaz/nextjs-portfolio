"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToInPageTarget, shouldHandleInPageNav } from "@/lib/nav-utils";

interface SectionLinkProps {
  href: string;
  /** Pass "Home" for the top-of-page link; omit for section links. */
  label?: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
}

/**
 * A same-page anchor link that reuses the navbar's in-page scroll behaviour:
 * long jumps are instant (no janky full-page smooth crawl on mobile), short
 * hops stay smooth. Falls back to normal <Link> routing when off the homepage.
 */
export default function SectionLink({
  href,
  label,
  className,
  children,
  ...rest
}: SectionLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (!shouldHandleInPageNav(e, href, label ?? "", pathname)) return;
        e.preventDefault();
        scrollToInPageTarget(href, label);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
