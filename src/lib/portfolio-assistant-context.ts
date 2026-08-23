import { siteContact, siteSocial, resumePath } from "@/config/site";
import { projectsData } from "@/app/projects/projectsData";
import { experienceData } from "@/components/sections/experienceData";

/** Technologies backed by a shipped project or a listed role. */
const productionSkills = [
  "TypeScript",
  "Node.js",
  "Express.js",
  "NestJS",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Prisma",
  "Mongoose",
  "Redis",
  "BullMQ",
  "React",
  "Next.js",
  "Tailwind CSS",
  "REST APIs",
  "Auth & RBAC",
  "JWT",
  "Zod",
  "Socket.IO",
  "WebRTC",
  "Stripe",
  "AWS S3",
  "AI API integrations",
  "Docker",
  "Nginx",
  "CI/CD",
];

/**
 * Studied through coursework or side reading but not yet shipped in any project
 * listed on this site. The assistant must not present these as production
 * experience.
 */
const learningSkills = [
  "Go",
  "GraphQL",
  "Microservices architecture",
  "RAG and vector search",
  "AWS IAM, EC2, VPC, Lambda (via AWS certification coursework)",
];

const workStyle = [
  "Backend-focused full-stack engineer who ships SaaS-style products end to end.",
  "Strong around API design, data modeling, authentication, authorization, payments, and operability.",
  "Uses AI tools responsibly to shorten feedback loops while keeping review, tests, and architecture decisions human-owned.",
  "Comfortable building polished Next.js/React frontends when the product surface needs it.",
];

const education = [
  "Bachelor of Social Science (Honors) in Political Science, National University, Bangladesh.",
  "In progress, expected graduation 2026.",
  "Formal background strengthens research, structured writing, stakeholder thinking, and systems analysis.",
];

const certifications = [
  "Full Stack Web Development, Udemy: React, Next.js, Node.js, Express.js, MongoDB, JWT auth, REST APIs, and full-stack architecture. Verified certificate: https://www.udemy.com/certificate/UC-6e1f340a-b9ee-4cda-8cd8-74de0b57ba5a/",
  "AWS Cloud Computing, Udemy (Hands-On Introduction to Cloud Computing with AWS): IAM, EC2, S3, VPC, load balancing, auto scaling, Lambda, CloudWatch, CI/CD, Docker, and cloud infrastructure basics. Verified certificate: https://www.udemy.com/certificate/UC-737af03a-d89d-4d2f-98e3-5c48dc7d0e8f/",
  "Next Level Web Development, Programming Hero: TypeScript full-stack, Next.js, PostgreSQL, Prisma, RAG, vector DBs, LangChain, Docker, AWS, CI/CD, testing, and AI-integrated capstone work.",
  "AI & Intelligent Systems: RAG, prompt engineering, AI API integrations, context-aware backends, and vector retrieval concepts.",
];

export const portfolioAssistantContext = `
Identity:
- Name: Reazul Islam Reaz.
- Location: ${siteContact.locationDetail}.
- Role: Backend-focused full-stack engineer.
- Email: ${siteContact.email}.
- Phone / WhatsApp: ${siteContact.phone} (${siteContact.phoneHref}).
- GitHub: ${siteSocial.github}.
- LinkedIn: ${siteSocial.linkedin}.
- Resume path on this website: ${resumePath}.

Positioning:
${workStyle.map((item) => `- ${item}`).join("\n")}

Skills used in shipped projects or paid roles:
${productionSkills.map((skill) => `- ${skill}`).join("\n")}

Skills studied but not yet used in any project listed here (never describe these as production experience):
${learningSkills.map((skill) => `- ${skill}`).join("\n")}

Projects:
${projectsData
  .map(
    (project) => `- ${project.title}: ${project.tagline}
  Overview: ${project.description}
  Tech: ${project.features.join(", ")}.
  Problem: ${project.problem}
  Architecture: ${project.architecture}
  Challenges & solutions: ${project.challengeSolutions.map((item) => `${item.challenge} → ${item.solution}`).join(" | ")}
  Metrics: ${project.metrics.join("; ")}
  Future enhancements: ${project.futureEnhancements}
  Live: ${project.live}
  Code: ${project.code}${project.sourceNote ? `\n  Note: ${project.sourceNote}` : ""}`,
  )
  .join("\n\n")}

Education:
${education.map((item) => `- ${item}`).join("\n")}

Work experience:
${experienceData
  .map(
    (
      role,
    ) => `- ${role.role} at ${role.company} (${role.employmentType}, ${role.period}): ${role.tagline}
  Summary: ${role.summary}
  ${role.architecture ? `Architecture: ${role.architecture}` : ""}
  Highlights: ${role.highlights.join("; ")}
  Tech: ${role.techStack.join(", ")}.`,
  )
  .join("\n\n")}

Certifications and learning:
${certifications.map((item) => `- ${item}`).join("\n")}
`;
