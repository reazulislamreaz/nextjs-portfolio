import type { ComponentType } from "react";
import {
  SiAmazonwebservices,
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiGo,
  SiGraphql,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbKey, TbStack2 } from "react-icons/tb";

export interface TechItem {
  name: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export const showcaseTech: TechItem[] = [
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "TypeScript", icon: SiTypescript },
  { name: "NestJS", icon: SiNestjs },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Prisma", icon: SiPrisma },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
  { name: "AWS", icon: SiAmazonwebservices },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Socket.IO", icon: SiSocketdotio },
  { name: "Stripe", icon: SiStripe },
  { name: "Go", icon: SiGo },
  { name: "GraphQL", icon: SiGraphql },
  { name: "MySQL", icon: SiMysql },
  { name: "Nginx", icon: SiNginx },
  { name: "Tailwind", icon: SiTailwindcss },
];

const alias: Record<string, ComponentType<{ className?: string }>> = {
  "node.js": SiNodedotjs,
  express: SiExpress,
  "express.js": SiExpress,
  typescript: SiTypescript,
  nestjs: SiNestjs,
  "nestjs 11": SiNestjs,
  react: SiReact,
  "react 19": SiReact,
  "react 18": SiReact,
  "next.js": SiNextdotjs,
  "next.js 16": SiNextdotjs,
  "next.js 15": SiNextdotjs,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  "postgresql 17": SiPostgresql,
  prisma: SiPrisma,
  "prisma 7": SiPrisma,
  redis: SiRedis,
  "redis 7": SiRedis,
  docker: SiDocker,
  aws: SiAmazonwebservices,
  "aws s3": SiAmazonwebservices,
  "github actions": SiGithubactions,
  "socket.io": SiSocketdotio,
  stripe: SiStripe,
  go: SiGo,
  graphql: SiGraphql,
  mysql: SiMysql,
  nginx: SiNginx,
  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  "tailwind css 4": SiTailwindcss,
  jwt: TbKey,
  rbac: TbKey,
  "rest apis": TbApi,
  bullmq: TbStack2,
};

export function iconForTech(name: string) {
  return alias[name.toLowerCase()] ?? null;
}
