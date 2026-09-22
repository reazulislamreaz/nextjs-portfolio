"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import {
  getNavBarOffset,
  hashFromHref,
  isNavLinkActive,
  scrollToInPageTarget,
  shouldHandleInPageNav,
} from "@/lib/nav-utils";
import { navLinks, resumePath, sectionIds } from "@/config/site";
import ThemeToggle from "./ThemeToggle";

/** Desktop: full links. Tablet + mobile: hamburger (avoids crowded mid-width nav). */
const DESKTOP_MQ = "(min-width: 1024px)";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<{
    href: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    if (!pendingScroll || mobileOpen) return;
    scrollToInPageTarget(pendingScroll.href, pendingScroll.label);
    setPendingScroll(null);
  }, [mobileOpen, pendingScroll]);

  // Track breakpoint — hide hamburger on desktop, close drawer on resize
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Prevent background scroll + focus trap while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const drawer = drawerRef.current;
    const focusable = drawer
      ? [...drawer.querySelectorAll<HTMLElement>(FOCUSABLE)]
      : [];
    focusable[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || !drawer || !focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
      menuToggleRef.current?.focus();
    };
  }, [mobileOpen]);

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
    let lastScrolled = false;
    let lastActive = "";
    let activationLine = getNavBarOffset();
    let lenisOff: (() => void) | undefined;
    let lenisPoll: ReturnType<typeof setInterval> | undefined;

    const computeActive = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      const nextScrolled = scrollY > 12;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (scrollY < 100) {
        if (lastActive !== "") {
          lastActive = "";
          setActiveSectionId("");
        }
        return;
      }

      // Resolve live — mid-page sections are dynamic imports and may mount late.
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      const docH = document.documentElement.scrollHeight;
      if (scrollY + viewportH >= docH - 2) {
        const id = [...sections].reverse()[0]?.id ?? "";
        if (id && id !== lastActive) {
          lastActive = id;
          setActiveSectionId(id);
        }
        return;
      }

      // Active = last nav section whose top has crossed under the fixed navbar.
      let current = "";
      let bestTop = -Infinity;
      for (const el of sections) {
        const top = el.getBoundingClientRect().top;
        if (top <= activationLine && top > bestTop) {
          bestTop = top;
          current = el.id;
        }
      }
      if (current !== lastActive) {
        lastActive = current;
        setActiveSectionId(current);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeActive);
      }
    };

    const onResize = () => {
      activationLine = getNavBarOffset();
      onScroll();
    };

    const attachLenis = () => {
      const lenis = window.__lenis;
      if (!lenis || lenisOff) return Boolean(lenis);
      const onLenisScroll = () => onScroll();
      lenis.on("scroll", onLenisScroll);
      lenisOff = () => {
        lenis.off("scroll", onLenisScroll);
        lenisOff = undefined;
      };
      return true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Lenis mounts in a sibling provider effect; attach when available.
    if (!attachLenis()) {
      let polls = 0;
      lenisPoll = setInterval(() => {
        polls += 1;
        if (attachLenis() || polls > 40) {
          if (lenisPoll) clearInterval(lenisPoll);
          lenisPoll = undefined;
        }
      }, 50);
    }

    // When deferred sections mount, recompute without waiting for a scroll.
    const mo = new MutationObserver(() => {
      onScroll();
      if (sectionIds.every((id) => document.getElementById(id))) {
        mo.disconnect();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    computeActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mo.disconnect();
      lenisOff?.();
      if (lenisPoll) clearInterval(lenisPoll);
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-zinc-700/80 bg-zinc-950/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <nav
        data-nav-bar
        className="mx-auto grid h-[var(--nav-height)] w-full min-w-0 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pl-4 sm:gap-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8 xl:px-12"
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
          className="group flex min-w-0 shrink-0 flex-col justify-center justify-self-start"
          aria-label="Reazul Islam Reaz — home"
        >
          <span className="font-display text-[1.3rem] leading-none tracking-tight text-zinc-50 transition-colors group-hover:text-emerald-400">
            Reaz
          </span>
          <span className="type-label mt-0.5 hidden sm:block">Full-Stack</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center justify-center gap-0.5 lg:flex">
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
                className={`nav-link-indicator whitespace-nowrap px-2 py-2 text-sm transition-colors lg:px-3 xl:px-3.5 ${
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

        <div className="flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href={resumePath}
            download
            className="btn-primary nav-resume-desktop !min-h-9 whitespace-nowrap px-3.5 py-1.5"
            aria-label="Download Resume"
          >
            <span>Resume</span>
            <ArrowUpRight size={14} aria-hidden />
          </a>

          <button
            ref={menuToggleRef}
            type="button"
            className="nav-menu-toggle icon-btn !h-11 !w-11 touch-manipulation lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            hidden={isDesktop}
            tabIndex={isDesktop ? -1 : undefined}
          >
            {mobileOpen ? (
              <X size={20} aria-hidden />
            ) : (
              <Menu size={20} aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {!isDesktop && mobileOpen ? (
        <div
          ref={drawerRef}
          id={menuId}
          className="nav-slide-down max-h-[min(100dvh-var(--nav-height),32rem)] overflow-y-auto overscroll-contain border-t border-zinc-700/80 bg-zinc-950 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-6"
        >
          <div className="flex flex-col">
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
                  className={`flex min-h-11 items-center rounded-md px-3 py-3 text-base leading-none transition ${
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
            Resume
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
      ) : null}
    </header>
  );
}
