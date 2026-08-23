import type { Metadata } from "next";
import { SITE_URL } from "./site";

/**
 * Metadata for the section deep-link routes (/about, /skills, ...). Each one
 * renders the same component as its homepage section, so the content is a
 * duplicate of `/`.
 *
 * These pages are therefore `noindex, follow` and canonicalised to the homepage
 * itself — a fragment canonical (`/#about`) is normalised back to `/` by
 * crawlers anyway, so the bare origin is the honest signal. They are also
 * excluded from the sitemap in `next-sitemap.config.js`; a URL should not be
 * advertised for indexing and refuse indexing at the same time.
 */
export function sectionMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | Reazul Islam Reaz`,
    description,
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
