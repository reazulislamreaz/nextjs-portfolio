import { SITE_URL, siteContact, siteSocial } from "@/config/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Reazul Islam Reaz",
    url: SITE_URL,
    email: siteContact.email,
    jobTitle: "Backend-Focused Full-Stack Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [siteSocial.github, siteSocial.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
