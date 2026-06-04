"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { hashFromHref, isNavLinkActive } from "@/lib/nav-utils";
import { navLinks, resumePath, sectionIds } from "@/config/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSectionId("");
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target.id;
        if (top) setActiveSectionId(top);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 z-50 w-full min-w-0 border-b border-zinc-800/50 bg-zinc-950/70 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 min-w-0 items-center justify-between gap-3 sm:h-20">
          <div className="shrink-0">
            <Link href="/" className="group text-xl font-bold" aria-label="Home">
              <div className="relative h-11 w-11 transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-zinc-600 to-zinc-800 p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950">
                    <span className="text-lg font-bold text-zinc-100">R</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 justify-end md:flex md:px-2 lg:px-4">
            <div className="flex max-w-full flex-wrap items-center justify-end gap-x-0.5 gap-y-1 lg:gap-x-1">
              {navLinks.map(({ href, label }) => {
                const isActive = isNavLinkActive(
                  href,
                  label,
                  pathname,
                  hash,
                  activeSectionId,
                );
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => {
                      setHash(label === "Home" ? "" : hashFromHref(href));
                      if (label !== "Home") {
                        const id = hashFromHref(href).slice(1);
                        if (id) setActiveSectionId(id);
                      } else {
                        setActiveSectionId("");
                      }
                    }}
                    className={`whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium transition-all duration-300 lg:px-3 lg:text-sm ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a href={resumePath} download className="hidden lg:block">
              <span className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50">
                Resume
              </span>
            </a>

            {mobileOpen ? (
              <button
                type="button"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 text-zinc-400 md:hidden"
                onClick={() => setMobileOpen(false)}
                aria-controls="mobile-nav-menu"
                aria-expanded="true"
                aria-label="Close menu"
              >
                <HiX size={22} aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 text-zinc-400 md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-controls="mobile-nav-menu"
                aria-expanded="false"
                aria-label="Open menu"
              >
                <HiMenu size={22} aria-hidden />
              </button>
            )}
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav-menu"
          className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto overscroll-contain border-t border-zinc-900 bg-zinc-950 shadow-2xl md:hidden"
        >
          <div className="space-y-1 px-4 pb-6 pt-3">
            {navLinks.map(({ href, label }) => {
              const isActive = isNavLinkActive(
                href,
                label,
                pathname,
                hash,
                activeSectionId,
              );
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    setHash(label === "Home" ? "" : hashFromHref(href));
                    setMobileOpen(false);
                  }}
                  className={`block min-h-11 rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <a
              href={resumePath}
              download
              className="mt-3 block"
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex min-h-11 w-full items-center justify-center rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-900">
                Download Resume
              </span>
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
