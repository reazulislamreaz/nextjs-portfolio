"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Download, Sparkles, Terminal } from "lucide-react";
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

      setScrolled(scrollY > 20);

      if (scrollY < 120) {
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

      const line = viewportH * 0.32;
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
    const sectionId = label === "Home" ? "" : hashFromHref(href).slice(1);
    setActiveSectionId(sectionId);

    if (mobileOpen) {
      setMobileOpen(false);
      setPendingScroll({ href, label });
      return;
    }

    scrollToInPageTarget(href, label);
  };

  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveredDock, setIsHoveredDock] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <header
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none"
      aria-label="Main navigation"
    >
      {/* Ambient Backlight Glow */}
      <div className="relative pointer-events-auto">
        <div className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-zinc-400/10 via-white/15 to-zinc-400/10 blur-md opacity-40 dark:opacity-60 transition-opacity" />

        {/* Spatial Glass Dock with Interactive Spotlight */}
        <nav
          data-nav-bar
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveredDock(true)}
          onMouseLeave={() => {
            setIsHoveredDock(false);
            setHoveredHref(null);
          }}
          className={`relative overflow-hidden flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2 p-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-2xl transition-all duration-300 ${
            scrolled
              ? "bg-white/90 dark:bg-zinc-950/90 border border-zinc-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              : "bg-white/75 dark:bg-zinc-950/80 border border-zinc-200/60 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Mouse Spotlight Follower */}
          {isHoveredDock && (
            <div
              className="pointer-events-none absolute -inset-px rounded-full opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
              }}
            />
          )}

          {/* Spatial Nav Links */}
          <div className="hidden md:flex items-center gap-1 relative z-10">
            {navLinks.map(({ href, label }) => {
              const isActive = isNavLinkActive(
                href,
                label,
                pathname,
                activeSectionId,
              );
              const isHovered = hoveredHref === href;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href, label)}
                  onMouseEnter={() => setHoveredHref(href)}
                  data-active={isActive ? "true" : undefined}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                    isActive
                      ? "text-zinc-50 bg-zinc-800 border border-zinc-600 shadow-sm font-semibold scale-[1.02]"
                      : isHovered
                        ? "text-zinc-50 bg-zinc-800/60 border border-zinc-700/60 -translate-y-[1px]"
                        : "text-zinc-400 hover:text-zinc-50 border border-transparent"
                  }`}
                >
                  <span className="relative z-10">{label}</span>

                  {/* Active Laser Line Glow */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-zinc-50 shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-pulse-glow" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Hairline Divider */}
          <div className="hidden md:block h-4 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent mx-1 relative z-10" />

          {/* Action Cluster */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 relative z-10">
            <ThemeToggle />

            {/* Shimmering Resume Button */}
            <a
              href={resumePath}
              download
              className="group relative hidden sm:inline-flex items-center overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 focus:outline-none"
              aria-label="Download Resume"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse-glow" />
              <span className="relative flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-50 backdrop-blur-xl transition-colors group-hover:bg-zinc-800">
                <span>Resume</span>
                <ArrowUpRight size={13} className="text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="md:hidden flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Floating Spatial Mobile Glass Card */}
      {mobileOpen ? (
        <div
          id="mobile-nav-menu"
          className="pointer-events-auto nav-slide-down mt-3 w-full max-w-sm rounded-2xl bg-zinc-900/95 backdrop-blur-2xl border border-zinc-700 shadow-2xl p-4 md:hidden"
        >
          {/* Status Header */}
          <div className="flex items-center justify-between px-3 py-2 mb-3 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">
            <span className="flex items-center gap-2 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-beacon" />
              Available for work
            </span>
            <span className="text-zinc-400 font-mono text-[11px]">Dhaka · Remote</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
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
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-zinc-800 text-zinc-50 font-semibold border border-zinc-600"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-50"
                  }`}
                >
                  <span>{label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                </Link>
              );
            })}
          </div>

          <a
            href={resumePath}
            download
            className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-50 px-4 py-2.5 text-xs font-semibold text-zinc-950 shadow-md transition hover:bg-zinc-200"
            onClick={() => setMobileOpen(false)}
          >
            <Download size={14} />
            <span>Download Resume</span>
          </a>
        </div>
      ) : null}
    </header>
  );
}
