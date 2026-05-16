import type { Metadata } from "next";
import { SITE_URL } from "./site";

export function sectionMetadata(
  sectionId: string,
  title: string,
  description: string,
): Metadata {
  return {
    title: `${title} | Reazul Islam Reaz`,
    description,
    alternates: {
      canonical: `${SITE_URL}/#${sectionId}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
