export function hashFromHref(href: string): string {
  const index = href.indexOf("#");
  return index === -1 ? "" : href.slice(index);
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
