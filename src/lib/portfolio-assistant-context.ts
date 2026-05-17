import { siteContact, siteSocial, resumePath } from "@/config/site";
import { projectsData } from "@/app/projects/projectsData";

const skills = [
  "TypeScript",
  "Node.js",
  "Express.js",
  "NestJS",
  "Go",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "React",
  "Next.js",
  "Tailwind CSS",
  "REST APIs",
  "GraphQL",
  "Microservices",
  "Auth & RBAC",
  "Socket.IO",
  "WebRTC",
  "Stripe",
  "RAG",
  "AI API integrations",
  "Docker",
  "AWS basics",
  "CI/CD",
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
  "Next Level Web Development, Programming Hero: TypeScript full-stack, Next.js, PostgreSQL, Prisma, RAG, vector DBs, LangChain, Docker, AWS, CI/CD, testing, and AI-integrated capstone work.",
  "AWS Cloud Computing, Udemy: IAM, EC2, S3, VPC, load balancing, auto scaling, Lambda, CloudWatch, CI/CD, Docker, and cloud infrastructure basics.",
  "Full Stack Web Development, Udemy: React, Next.js, Node.js, Express.js, MongoDB, JWT auth, REST APIs, and full-stack architecture.",
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

Skills:
${skills.map((skill) => `- ${skill}`).join("\n")}

Projects:
${projectsData
  .map(
    (project) => `- ${project.title}: ${project.description}
  Tech/features: ${project.features.join(", ")}.
  Problem: ${project.problem}
  Architecture: ${project.architecture}
  Challenges: ${project.keyChallenges}
  Solutions: ${project.solutions}
  Future enhancements: ${project.futureEnhancements}
  Live: ${project.live}
  Code: ${project.code}${project.sourceNote ? `\n  Note: ${project.sourceNote}` : ""}`,
  )
  .join("\n\n")}

Education:
${education.map((item) => `- ${item}`).join("\n")}

Certifications and learning:
${certifications.map((item) => `- ${item}`).join("\n")}
`;
