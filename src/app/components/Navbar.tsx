"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiMenu, HiX } from "react-icons/hi";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#system-architecture", label: "Architecture" },
  { href: "/#skills", label: "Skills" },
  { href: "/#ai-workflow", label: "Workflow" },
  { href: "/#education", label: "Education" },
  { href: "/#certifications", label: "Learning" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full min-w-0 border-b border-zinc-800/50 bg-zinc-950/70 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 min-w-0 items-center justify-between gap-3 sm:h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="group text-xl font-bold">
              <div className="relative h-11 w-11 transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                {/* Placeholder logo with gradient border */}
                <div className="w-full h-full rounded-full bg-gradient-to-r from-zinc-600 to-zinc-800 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden min-w-0 flex-1 justify-end md:flex md:px-2 lg:px-4">
            <div className="flex max-w-full flex-wrap items-center justify-end gap-x-0.5 gap-y-1 lg:gap-x-1">
              {links.map(({ href, label }) => {
                const isActive =
                  label === "Home" ? pathname === "/" : pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium transition-all duration-300 lg:px-3 lg:text-sm ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white hover:shadow-sm"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="/Reazul_Islam_Reaz_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block"
            >
              <span className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Resume
              </span>
            </a>

            <button
              type="button"
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-controls="mobile-nav-menu"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav-menu"
          className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto overscroll-contain border-t border-zinc-900 bg-zinc-950 shadow-2xl md:hidden"
        >
          <div className="space-y-1 px-4 pb-6 pt-3">
            {links.map(({ href, label }) => {
              const isActive =
                label === "Home"
                  ? pathname === "/"
                  : pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block min-h-11 rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "text-zinc-400 hover:border hover:border-zinc-800 hover:bg-zinc-900 hover:text-white"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}

            <a
              href="/Reazul_Islam_Reaz_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block"
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex min-h-11 w-full items-center justify-center rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:bg-white">
                Download Resume
              </span>
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
