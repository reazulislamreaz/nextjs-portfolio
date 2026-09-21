"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import {
  hashFromHref,
  isNavLinkActive,
  scrollToInPageTarget,
  shouldHandleInPageNav,
} from "@/lib/nav-utils";
import { navLinks, resumePath, sectionIds } from "@/config/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [activeSectionId, setActiveSectionId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<{
    href: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    if (!pendingScroll || mobileOpen) return;
    scrollToInPageTarget(pendingScroll.href, pendingScroll.label);
    setPendingScroll(null);
  }, [mobileOpen, pendingScroll]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSectionId("");
      return;
    }

    const hash = window.location.hash;
    if (hash) {
      let attempts = 0;
      const tryScroll = () => {
        const id = hash.slice(1);
        if (document.getElementById(id)) {
          scrollToInPageTarget(`/${hash}`);
          setActiveSectionId(id);
          return;
        }
        if (attempts++ < 90) requestAnimationFrame(tryScroll);
      };
      tryScroll();
    }

    let ticking = false;

    const computeActive = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      setScrolled(scrollY > 12);

      if (scrollY < 100) {
        setActiveSectionId("");
        return;
      }

      const docH = document.documentElement.scrollHeight;
      if (scrollY + viewportH >= docH - 2) {
        const last = [...sectionIds]
          .reverse()
          .find((id) => document.getElementById(id));
        if (last) setActiveSectionId(last);
        return;
      }

      const line = viewportH * 0.3;
      let current = "";
      let bestTop = -Infinity;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > bestTop) {
          bestTop = top;
          current = id;
        }
      }
      if (current) setActiveSectionId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeActive);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    computeActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string,
  ) => {
    if (!shouldHandleInPageNav(event, href, label, pathname)) return;
    event.preventDefault();
    const sectionId = hashFromHref(href).slice(1);
    setActiveSectionId(sectionId);

    if (mobileOpen) {
      setMobileOpen(false);
      setPendingScroll({ href, label });
      return;
    }

    scrollToInPageTarget(href, label);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-700/80 bg-zinc-950/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <nav
        data-nav-bar
        className="mx-auto flex h-[var(--nav-height)] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-12"
      >
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSectionId("");
              setMobileOpen(false);
            }
          }}
          className="group flex min-w-0 shrink-0 flex-col justify-center"
          aria-label="Reazul Islam Reaz — home"
        >
          <span className="font-display text-[1.3rem] leading-none tracking-tight text-zinc-50 transition-colors group-hover:text-emerald-400">
            Reaz
          </span>
          <span className="type-label mt-0.5 hidden sm:block">Full-Stack</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = isNavLinkActive(
              href,
              label,
              pathname,
              activeSectionId,
            );
            return (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href, label)}
                data-active={isActive ? "true" : undefined}
                className={`nav-link-indicator px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "font-medium text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={resumePath}
            download
            className="btn-primary hidden !min-h-9 px-3.5 py-1.5 sm:inline-flex"
            aria-label="Download Resume"
          >
            <span>Resume</span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <button
            type="button"
            className="icon-btn md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-nav-menu"
          className="nav-slide-down border-t border-zinc-700 bg-zinc-950 px-4 pb-5 pt-3 md:hidden"
        >
          <p className="type-label mb-3">Dhaka · Onsite & Remote</p>
          <div className="flex flex-col gap-0.5">
            {navLinks.map(({ href, label }) => {
              const isActive = isNavLinkActive(
                href,
                label,
                pathname,
                activeSectionId,
              );
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href, label)}
                  className={`rounded-md px-3 py-3 text-base transition ${
                    isActive
                      ? "bg-zinc-800 font-medium text-zinc-50"
                      : "text-zinc-300 hover:bg-zinc-800/70 hover:text-zinc-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <a
            href={resumePath}
            download
            className="btn-primary mt-4 w-full"
            onClick={() => setMobileOpen(false)}
          >
            Download Resume
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
      ) : null}
    </header>
  );
}
