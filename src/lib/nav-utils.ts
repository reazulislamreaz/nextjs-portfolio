import { gsap, registerGsap, isReducedMotion } from "./gsap";

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

function getNavBarHeight(): number {
  const bar = document.querySelector("[data-nav-bar]");
  if (bar instanceof HTMLElement) {
    const rect = bar.getBoundingClientRect();
    return rect.height + (rect.top > 0 ? rect.top : 16) + 12;
  }

  const navHeight = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-height")
    .trim();
  if (navHeight.endsWith("rem")) {
    const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return parseFloat(navHeight) * rootSize + 16;
  }

  return 76;
}

/**
 * Scrolls to an in-page section with GSAP ScrollToPlugin for silky smooth transitions.
 */
export function scrollToInPageTarget(href: string, label?: string): void {
  if (typeof window === "undefined") return;

  const isHome = label === "Home" || href === "/";
  const id = isHome ? "" : hashFromHref(href).slice(1);
  const target = id ? document.getElementById(id) : null;

  const navHeight = getNavBarHeight();
  const targetY = target
    ? target.getBoundingClientRect().top + window.scrollY - navHeight
    : 0;

  if (isReducedMotion()) {
    window.scrollTo({ top: Math.max(0, targetY), behavior: "auto" });
  } else {
    registerGsap();
    gsap.to(window, {
      duration: 0.85,
      scrollTo: { y: Math.max(0, targetY), autoKill: true },
      ease: "power3.inOut",
    });
  }
  history.pushState(null, "", isHome ? "/" : href);
}

/**
 * Decides whether a nav/CTA click should be handled as an in-page scroll.
 * Returns false (let <Link> route normally) for modified clicks, off-home
 * navigation, or sections not yet mounted.
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
  const isHome = label === "Home" || href === "/";
  const id = isHome ? "" : hashFromHref(href).slice(1);
  if (!isHome && !id) return false;
  if (id && !document.getElementById(id)) return false;
  return true;
}

export function isNavLinkActive(
  href: string,
  label: string,
  pathname: string,
  activeSectionId: string,
): boolean {
  if (label === "Home") {
    // Home is active at the top of the landing page (no section in view).
    return pathname === "/" && !activeSectionId;
  }

  const linkHash = hashFromHref(href);
  if (linkHash) {
    const sectionId = linkHash.slice(1);
    return pathname === "/" && activeSectionId === sectionId;
  }

  return pathname === href;
}
