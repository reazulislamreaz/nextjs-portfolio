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

export function getNavBarOffset(): number {
  if (typeof window === "undefined") return 96;

  const bar = document.querySelector("[data-nav-bar]");
  if (bar instanceof HTMLElement) {
    const rect = bar.getBoundingClientRect();
    // On sticky/fixed navbar, calculate total bottom edge + comfortable breathing room
    const topOffset = rect.top > 0 ? rect.top : window.innerWidth >= 640 ? 20 : 12;
    const breathingRoom = window.innerWidth >= 1024 ? 24 : window.innerWidth >= 640 ? 18 : 14;
    return rect.height + topOffset + breathingRoom;
  }

  const offsetValue = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-scroll-offset")
    .trim();
  if (offsetValue.endsWith("rem")) {
    const rootSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return parseFloat(offsetValue) * rootSize;
  }
  if (offsetValue.endsWith("px")) {
    return parseFloat(offsetValue);
  }

  return window.innerWidth >= 1024 ? 100 : window.innerWidth >= 640 ? 92 : 76;
}

export const getNavBarHeight = getNavBarOffset;

export function scrollToInPageTarget(href: string, label?: string): void {
  if (typeof window === "undefined") return;

  const isHome =
    label === "Home" || href === "/" || href === "/#" || href === "#home";
  const id = isHome ? "" : hashFromHref(href).slice(1);
  const target = id ? document.getElementById(id) : null;

  if (isHome) {
    if (isReducedMotion()) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } else if (target) {
    if (isReducedMotion()) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    } else if (window.__lenis) {
      // Lenis natively accounts for target's CSS scroll-margin-top automatically
      window.__lenis.scrollTo(target, {
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
