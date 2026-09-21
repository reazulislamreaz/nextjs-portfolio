"use client";

import { navLinks, siteSocial } from "@/config/site";
import SectionLink from "./SectionLink";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = navLinks.filter((link) => link.sectionId);

  return (
    <footer className="w-full border-t border-zinc-700/70 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xl tracking-tight text-zinc-50">
              Reazul Islam Reaz
            </p>
            <p className="mt-1.5 text-sm text-zinc-500">
              Backend-focused full-stack engineer
            </p>
            <p className="type-meta mt-5">
              © {currentYear} All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 sm:items-end">
            <nav
              className="flex flex-wrap gap-x-5 gap-y-2"
              aria-label="Footer"
            >
              {footerLinks.map(({ href, label }) => (
                <SectionLink
                  key={href}
                  href={href}
                  className="text-sm text-zinc-400 transition hover:text-zinc-50"
                >
                  {label}
                </SectionLink>
              ))}
            </nav>
            <div className="flex items-center gap-1">
              <a
                href={siteSocial.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn !h-9 !w-9 text-zinc-500"
                aria-label="GitHub"
              >
                <FiGithub size={16} />
              </a>
              <a
                href={siteSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn !h-9 !w-9 text-zinc-500"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
