#!/usr/bin/env npx tsx
/**
 * Add portfolio project media links to LinkedIn Projects (live, frontend, backend, etc.)
 *
 *   npx tsx scripts/linkedin-sync-project-media.ts
 *   npx tsx scripts/linkedin-sync-project-media.ts --headed
 *   npx tsx scripts/linkedin-sync-project-media.ts --project Connectify
 */

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium, type Page } from "playwright-core";
import { projectsData } from "../src/app/projects/projectsData";
import { getProjectMediaLinks } from "../src/app/projects/projectMediaLinks";

const PROFILE_DIR = join(homedir(), ".linkedin-mcp/profile");
const CHROME = join(
  homedir(),
  ".linkedin-mcp/patchright-browsers/chromium-1223/chrome-linux64/chrome",
);
const PROFILE = "https://www.linkedin.com/in/reazulislamreaz";

const headed = process.argv.includes("--headed");
const projectArg = process.argv.find((a) => a.startsWith("--project="));
const singleProject = projectArg?.split("=")[1];

async function waitForSaveEnabled(page: Page, timeoutMs = 60000) {
  const save = page.getByRole("button", { name: /^Save$/ });
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await save.isEnabled().catch(() => false)) return true;
    await page.waitForTimeout(500);
  }
  return false;
}

async function removeStaleMedia(page: Page) {
  const mainText = await page.locator("main").innerText();
  if (!mainText.includes("reazulislam1487")) return;

  const removeButtons = page.locator(
    'button[aria-label*="Remove"], button[aria-label*="Delete"], button[aria-label*="remove media" i]',
  );
  let count = await removeButtons.count();
  let guard = 0;
  while (count > 0 && guard < 12) {
    await removeButtons.first().click().catch(() => {});
    await page.waitForTimeout(1000);
    count = await removeButtons.count();
    guard++;
  }
}

async function ensureOnProjectForm(page: Page) {
  for (let i = 0; i < 4; i++) {
    const onForm = await page
      .locator('textarea[aria-label*="Description" i]')
      .isVisible()
      .catch(() => false);
    if (onForm) return;

    const back = page.getByRole("button", { name: /^Back$/ });
    if (await back.isVisible({ timeout: 1000 }).catch(() => false)) {
      if (await back.isEnabled().catch(() => false)) {
        await back.click();
        await page.waitForTimeout(1200);
        continue;
      }
    }
    break;
  }
  await page
    .locator('textarea[aria-label*="Description" i]')
    .waitFor({ state: "visible", timeout: 15000 })
    .catch(() => {});
}

function normalizeForCompare(url: string): string {
  return url.replace(/\/$/, "").replace(/^http:/, "https:").toLowerCase();
}

function urlFingerprint(url: string): string[] {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    const parts = parsed.pathname.split("/").filter(Boolean);
    const tail = parts.slice(-2).join("/").toLowerCase();
    return [host, tail, parts.at(-1)?.toLowerCase() ?? ""].filter(Boolean);
  } catch {
    return [url.toLowerCase()];
  }
}

async function getMediaSectionText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const hint = Array.from(document.querySelectorAll("p, span, div")).find((el) =>
      (el.textContent ?? "").includes("Add media like images"),
    );
    let section: Element | null = hint ?? null;
    for (let i = 0; i < 4 && section; i++) section = section.parentElement;
    return (section?.textContent ?? "").toLowerCase();
  });
}

/** Media cards live in the Media block — not in the description textarea or page background */
async function getMediaAttachmentUrls(page: Page): Promise<string[]> {
  await ensureOnProjectForm(page);

  return page.evaluate(() => {
    const hint = Array.from(document.querySelectorAll("p, span, div")).find((el) =>
      (el.textContent ?? "").includes("Add media like images"),
    );
    if (!hint) return [];

    let section: Element | null = hint;
    for (let i = 0; i < 4 && section; i++) section = section.parentElement;
    if (!section) return [];

    const urls: string[] = [];
    for (const a of section.querySelectorAll('a[href^="http"]')) {
      const href = (a as HTMLAnchorElement).href;
      if (href && !href.includes("linkedin.com")) urls.push(href);
    }
    return urls;
  });
}

async function mediaAlreadyAttached(page: Page, url: string): Promise<boolean> {
  const target = normalizeForCompare(url);
  const attached = await getMediaAttachmentUrls(page);
  if (attached.some((href) => normalizeForCompare(href) === target)) return true;

  const sectionText = await getMediaSectionText(page);
  return urlFingerprint(url).some((part) => part.length > 2 && sectionText.includes(part));
}

async function countMediaAttachments(page: Page): Promise<number> {
  const attached = await getMediaAttachmentUrls(page);
  const fromLinks = new Set(attached.map((h) => normalizeForCompare(h))).size;
  const fromCards = await page.evaluate(() => {
    const hint = Array.from(document.querySelectorAll("p, span, div")).find((el) =>
      (el.textContent ?? "").includes("Add media like images"),
    );
    let section: Element | null = hint ?? null;
    for (let i = 0; i < 4 && section; i++) section = section.parentElement;
    if (!section) return 0;
    return section.querySelectorAll('button[aria-label*="Remove" i], img[src*="licdn"]').length;
  });
  return Math.max(fromLinks, fromCards);
}

async function addMediaLink(page: Page, url: string, label: string) {
  await ensureOnProjectForm(page);

  if (await mediaAlreadyAttached(page, url)) {
    console.log(`    · skip (media attached): ${label}`);
    return;
  }

  const before = await countMediaAttachments(page);

  await page.getByRole("button", { name: /Add media/i }).click({ timeout: 15000 });
  await page.waitForTimeout(800);
  await page.getByText(/^Add a link$/i).click();
  await page.waitForTimeout(1200);

  const linkInput = page.locator('input[aria-label*="Paste or type a link" i]');
  await linkInput.fill(url);

  const addBtn = page.getByRole("button", { name: /^Add$/ }).first();
  for (let i = 0; i < 40; i++) {
    if (await addBtn.isEnabled().catch(() => false)) break;
    await page.waitForTimeout(500);
  }
  if (await addBtn.isEnabled().catch(() => false)) {
    await addBtn.click();
  }

  // LinkedIn opens a preview step — must Save before the card appears on the project form
  for (let i = 0; i < 40; i++) {
    const onProjectForm = await page
      .getByRole("button", { name: /^Add media$/i })
      .isVisible()
      .catch(() => false);
    if (onProjectForm) break;

    const saveButtons = page.getByRole("button", { name: /^Save$/ });
    if ((await saveButtons.count()) > 0) {
      const save = saveButtons.last();
      if (await save.isEnabled().catch(() => false)) {
        await save.click();
        await page.waitForTimeout(2000);
        break;
      }
    }
    await page.waitForTimeout(500);
  }

  for (let i = 0; i < 80; i++) {
    await ensureOnProjectForm(page);
    const after = await countMediaAttachments(page);
    if (after > before || (await mediaAlreadyAttached(page, url))) break;
    await page.waitForTimeout(500);
  }

  if (await mediaAlreadyAttached(page, url)) {
    console.log(`    · attached media: ${label} → ${url}`);
  } else {
    console.warn(`    ! media not confirmed: ${label} → ${url}`);
  }
}

function buildDescription(project: (typeof projectsData)[number]): string {
  const media = getProjectMediaLinks(project);
  const linkLines = media.map(({ label, url }) => `${label}: ${url}`).join("\n");
  return `${project.description}\n\n${linkLines}`;
}

async function openProjectEdit(page: Page, title: string): Promise<boolean> {
  await page.goto(`${PROFILE}/details/projects/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);

  const edit = page.locator(`a[aria-label="Edit project ${title}"]`);
  if (!(await edit.isVisible({ timeout: 8000 }).catch(() => false))) {
    console.log(`→ Project not found on LinkedIn: ${title}`);
    return false;
  }
  await edit.click();
  await page.waitForTimeout(3500);
  return true;
}

async function syncProjectMedia(page: Page, title: string) {
  const project = projectsData.find((p) => p.title === title);
  if (!project) {
    console.log(`→ Not in projectsData: ${title}`);
    return;
  }

  const media = getProjectMediaLinks(project);
  if (!(await openProjectEdit(page, title))) return;

  console.log(`\n${title} (${media.length} links)`);

  const desc = page.locator('textarea[aria-label*="Description" i]');
  if (await desc.isVisible().catch(() => false)) {
    await desc.fill(buildDescription(project));
  }

  await removeStaleMedia(page);
  const existingMedia = await countMediaAttachments(page);
  console.log(`    existing media attachments: ${existingMedia}`);

  for (const { label, url } of media) {
    try {
      await addMediaLink(page, url, label);
      await waitForSaveEnabled(page, 15000);
    } catch (e) {
      console.warn(`    ! failed ${label}:`, (e as Error).message);
      await ensureOnProjectForm(page);
    }
  }

  await ensureOnProjectForm(page);
  if (await waitForSaveEnabled(page, 90000)) {
    await page.getByRole("button", { name: /^Save$/ }).click();
    await page.waitForTimeout(4000);
    console.log(`✓ Saved: ${title}`);
  } else {
    console.warn(`→ Save stayed disabled for: ${title}`);
  }
}

async function main() {
  if (!existsSync(PROFILE_DIR)) {
    console.error("Run: uvx linkedin-scraper-mcp@latest --login");
    process.exit(1);
  }

  const opts = { headless: !headed, viewport: { width: 1400, height: 900 } };
  if (existsSync(CHROME)) {
    (opts as { executablePath?: string }).executablePath = CHROME;
  }

  const context = await chromium.launchPersistentContext(PROFILE_DIR, opts);
  const page = context.pages()[0] ?? (await context.newPage());

  const titles = singleProject
    ? [singleProject]
    : projectsData.map((p) => p.title);

  try {
    for (const title of titles) {
      try {
        await syncProjectMedia(page, title);
        await page.waitForTimeout(1500);
      } catch (e) {
        console.warn(`${title}:`, (e as Error).message);
      }
    }
    console.log("\nDone:", `${PROFILE}/details/projects/`);
  } finally {
    await context.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
