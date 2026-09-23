import { SITE_URL, siteContact, siteRole, siteSocial } from "@/config/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Reazul Islam Reaz",
    url: SITE_URL,
    email: siteContact.email,
    jobTitle: siteRole,
    description:
      "Backend-Focused Full-Stack Engineer who designs APIs, data models, authentication, background jobs, and realtime systems for production web products.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [siteSocial.github, siteSocial.linkedin],
    knowsAbout: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Redis",
      "BullMQ",
      "REST APIs",
      "JWT",
      "RBAC",
      "Socket.IO",
      "Docker",
      "AWS",
      "Next.js",
      "React",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
