export function hashFromHref(href: string): string {
  const index = href.indexOf("#");
  return index === -1 ? "" : href.slice(index);
}

export function isNavLinkActive(
  href: string,
  label: string,
  pathname: string,
  hash: string,
  activeSectionId: string,
): boolean {
  if (label === "Home") {
    return pathname === "/" && !hash && !activeSectionId;
  }

  const linkHash = hashFromHref(href);
  if (linkHash) {
    if (hash === linkHash) return true;
    const sectionId = linkHash.slice(1);
    return pathname === "/" && activeSectionId === sectionId;
  }

  return pathname === href;
}
