import type { Project } from "./projectsData";

export interface ProjectMediaLink {
  label: string;
  url: string;
}

function repoName(url: string): string {
  return url.replace(/\/$/, "").split("/").pop() ?? "repository";
}

function labelFromGitHubUrl(url: string): string {
  const repo = repoName(url);
  if (/frontend|client-side|client/i.test(repo)) return "Frontend";
  if (/backend|server|api|pool-backend/i.test(repo)) return "Backend";
  if (/dashboard/i.test(repo)) return "Dashboard";
  return repo;
}

function normalizeUrl(raw: string): string {
  return raw.trim().replace(/[.,;)]+$/, "").replace(/\/$/, "");
}

/** All live + repo links for a portfolio project (LinkedIn media, case studies, etc.) */
export function getProjectMediaLinks(project: Project): ProjectMediaLink[] {
  const seen = new Set<string>();
  const links: ProjectMediaLink[] = [];

  const add = (rawUrl: string, label: string) => {
    const url = normalizeUrl(rawUrl);
    const key = url.toLowerCase();
    if (!url || seen.has(key)) return;
    seen.add(key);
    links.push({ label, url });
  };

  if (project.live) add(project.live, "Live Demo");

  if (project.code) {
    const label = project.code.includes("github.com")
      ? labelFromGitHubUrl(project.code)
      : "Repository";
    add(project.code, label);
  }

  if (project.sourceNote) {
    const urls = project.sourceNote.match(/https?:\/\/[^\s·,;)]+/g) ?? [];
    for (const raw of urls) {
      const url = normalizeUrl(raw);
      if (url.includes("github.com")) {
        add(url, labelFromGitHubUrl(url));
      } else if (url.includes("duckdns")) {
        add(url, "API Host");
      } else {
        add(url, "Link");
      }
    }
  }

  return links;
}
