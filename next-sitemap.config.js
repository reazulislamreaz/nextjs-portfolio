/**
 * The /about, /skills, /experience, /education, /certifications, /projects and
 * /contact routes are deep-link convenience wrappers that render the exact same
 * components as the corresponding homepage section. They are served with
 * `robots: { index: false }` via `sectionMetadata()` and canonicalised to the
 * homepage, so listing them here too would ask crawlers to index pages that the
 * pages themselves refuse to be indexed. They are excluded to keep the sitemap
 * and the per-page robots directives telling the same story.
 *
 * @type {import('next-sitemap').IConfig}
 */
const NOINDEX_SECTION_ROUTES = [
  "/about",
  "/certifications",
  "/contact",
  "/education",
  "/experience",
  "/projects",
  "/skills",
];

module.exports = {
  siteUrl: "https://reazul-islam-reaz.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  exclude: NOINDEX_SECTION_ROUTES,
  changefreq: "monthly",
  priority: 1.0,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        // Only the API surface is disallowed. The noindex section routes stay
        // crawlable on purpose: a robots.txt Disallow would stop crawlers from
        // ever fetching the page and reading its `noindex`, which is what
        // actually keeps them out of the index.
        disallow: ["/api/"],
      },
    ],
  },
};
