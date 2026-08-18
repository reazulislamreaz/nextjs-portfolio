"use client";

import { navLinks } from "@/config/site";
import SectionLink from "./SectionLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = navLinks.filter((link) => link.sectionId);

  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-sm font-medium text-zinc-400">
            © {currentYear} <span className="font-semibold text-zinc-100">Reazul Islam Reaz</span>. All
            rights reserved.
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
            aria-label="Footer"
          >
            {footerLinks.map(({ href, label }) => (
              <SectionLink
                key={href}
                href={href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-50"
              >
                {label}
              </SectionLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
