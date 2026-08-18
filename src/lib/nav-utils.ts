import { isReducedMotion } from "./gsap";

export function hashFromHref(href: string): string {
  const index = href.indexOf("#");
  return index === -1 ? "" : href.slice(index);
}

interface NavClickModifiers {
  preventDefault: () => void;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  button: number;
}

export function getNavBarHeight(): number {
  if (typeof window === "undefined") return 76;

  const bar = document.querySelector("[data-nav-bar]");
  if (bar instanceof HTMLElement) {
    const rect = bar.getBoundingClientRect();
    return rect.height + (rect.top > 0 ? rect.top : 16) + 12;
  }

  const navHeight = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-height")
    .trim();
  if (navHeight.endsWith("rem")) {
    const rootSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return parseFloat(navHeight) * rootSize + 16;
  }

  return 76;
}

/**
 * Scrolls to an in-page section using Lenis smooth scrolling or native smooth scroll.
 */
export function scrollToInPageTarget(href: string, label?: string): void {
  if (typeof window === "undefined") return;

  const isHome = label === "Home" || href === "/" || href === "/#";
  const id = isHome ? "" : hashFromHref(href).slice(1);
  const target = id ? document.getElementById(id) : null;
  const navHeight = getNavBarHeight();

  const targetY = isHome
    ? 0
    : target
      ? Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight)
      : 0;

  if (isReducedMotion()) {
    window.scrollTo({ top: targetY, behavior: "auto" });
  } else if (window.__lenis) {
    if (isHome) {
      window.__lenis.scrollTo(0, { duration: 1.0, offset: 0 });
    } else if (target) {
      window.__lenis.scrollTo(target, { offset: -navHeight, duration: 1.0 });
    } else {
      window.__lenis.scrollTo(targetY, { duration: 1.0 });
    }
  } else {
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  try {
    history.pushState(null, "", isHome ? "/" : href);
  } catch {}
}

/**
 * Decides whether a nav/CTA click should be handled as an in-page scroll.
 */
export function shouldHandleInPageNav(
  event: NavClickModifiers,
  href: string,
  label: string,
  pathname: string
): boolean {
  if (pathname !== "/") return false;
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return false;
  }
  const isHome = label === "Home" || href === "/" || href === "/#";
  const id = isHome ? "" : hashFromHref(href).slice(1);
  if (!isHome && !id) return false;
  return true;
}

export function isNavLinkActive(
  href: string,
  label: string,
  pathname: string,
  activeSectionId: string
): boolean {
  if (label === "Home") {
    return pathname === "/" && !activeSectionId;
  }

  const linkHash = hashFromHref(href);
  if (linkHash) {
    const sectionId = linkHash.slice(1);
    return pathname === "/" && activeSectionId === sectionId;
  }

  return pathname === href;
}
