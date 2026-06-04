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
 * Scrolls to an in-page section, offsetting for the fixed navbar. Long jumps
 * are instant (smooth scrolling the full page height janks on mobile because
 * the blurred navbar + fixed overlays repaint every frame); short hops stay
 * smooth. Must run client-side.
 */
export function scrollToInPageTarget(href: string, label?: string): void {
  const isHome = label === "Home" || href === "/";
  const id = isHome ? "" : hashFromHref(href).slice(1);
  const target = id ? document.getElementById(id) : null;

  const nav = document.querySelector("nav");
  const navHeight = nav ? nav.getBoundingClientRect().height : 72;
  const targetY = target
    ? target.getBoundingClientRect().top + window.scrollY - navHeight - 8
    : 0;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isFarJump = Math.abs(targetY - window.scrollY) > window.innerHeight * 2;
  const behavior: ScrollBehavior = reduceMotion || isFarJump ? "auto" : "smooth";

  window.scrollTo({ top: Math.max(0, targetY), behavior });
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
