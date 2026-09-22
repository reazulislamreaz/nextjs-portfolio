import { isReducedMotion } from "./motion";

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

/**
 * Space reserved under the fixed navbar when aligning a section into view.
 * Reads `--nav-scroll-offset` (nav height + a small intentional gap).
 */
export function getNavBarOffset(): number {
  if (typeof window === "undefined") return 72;

  const offsetValue = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-scroll-offset")
    .trim();

  if (offsetValue) {
    // Supports rem, px, and calc() via the browser
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:absolute;visibility:hidden;height:var(--nav-scroll-offset)";
    document.documentElement.appendChild(probe);
    const px = probe.getBoundingClientRect().height;
    probe.remove();
    if (px > 0) return px;
  }

  const bar = document.querySelector("[data-nav-bar]");
  if (bar instanceof HTMLElement) {
    return bar.getBoundingClientRect().height + 8;
  }

  return window.innerWidth >= 1024 ? 80 : window.innerWidth >= 640 ? 76 : 72;
}

export const getNavBarHeight = getNavBarOffset;

/**
 * Absolute document Y that places the section's content start (after its
 * top padding) just below the fixed navbar — without changing section padding.
 */
function getSectionScrollTop(target: HTMLElement): number {
  const paddingTop = parseFloat(getComputedStyle(target).paddingTop) || 0;
  const clearance = getNavBarOffset();
  return (
    target.getBoundingClientRect().top +
    window.scrollY +
    paddingTop -
    clearance
  );
}

export function scrollToInPageTarget(href: string, label?: string): void {
  if (typeof window === "undefined") return;

  const isHome =
    label === "Home" || href === "/" || href === "/#" || href === "#home";
  const id = isHome ? "" : hashFromHref(href).slice(1);
  const target = id ? document.getElementById(id) : null;
  const behavior: ScrollBehavior = isReducedMotion() ? "auto" : "smooth";

  if (isHome) {
    window.scrollTo({ top: 0, behavior });
  } else if (target) {
    const top = Math.max(0, getSectionScrollTop(target));
    window.scrollTo({ top, behavior });
  }

  try {
    history.pushState(null, "", isHome ? "/" : href);
  } catch {
    /* ignore */
  }
}

/**
 * Decides whether a nav/CTA click should be handled as in-page scroll.
 */
export function shouldHandleInPageNav(
  event: NavClickModifiers,
  href: string,
  label: string,
  pathname: string,
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
  activeSectionId: string,
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
