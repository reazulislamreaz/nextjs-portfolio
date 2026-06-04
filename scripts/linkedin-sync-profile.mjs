#!/usr/bin/env node
/**
 * Sync LinkedIn profile with portfolio data (headline, about, contact, skills, projects).
 *
 *   npm install --no-save playwright-core
 *   uvx linkedin-scraper-mcp@latest --login
 *   node scripts/linkedin-sync-profile.mjs
 *   node scripts/linkedin-sync-profile.mjs --intro-only
 *   node scripts/linkedin-sync-profile.mjs --headed
 */

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";
import {
  ABOUT,
  CONTACT,
  HEADLINE,
  PROJECTS,
  SKILLS_TO_ADD,
} from "./linkedin-profile-content.mjs";

const PROFILE_DIR = join(homedir(), ".linkedin-mcp/profile");
const CHROME = join(
  homedir(),
  ".linkedin-mcp/patchright-browsers/chromium-1223/chrome-linux64/chrome",
);
const PROFILE = "https://www.linkedin.com/in/reazulislamreaz";

const introOnly = process.argv.includes("--intro-only");
const headed = process.argv.includes("--headed");

async function saveIntro(page) {
  const save = page.getByRole("button", { name: /^Save$/ });
  if (await save.isVisible({ timeout: 3000 }).catch(() => false)) {
    await save.click();
    await page.waitForTimeout(3000);
  }
}

async function updateHeadline(page) {
  await page.goto(`${PROFILE}/edit/intro/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(4000);
  const headline = page.locator("[contenteditable=true]").first();
  await headline.click();
  await headline.fill(HEADLINE);
  console.log("✓ Headline updated");
  await saveIntro(page);
}

async function updateAbout(page) {
  await page.goto(
    `${PROFILE}/edit/forms/summary/new/?profileFormEntryPoint=PROFILE_SECTION`,
    { waitUntil: "domcontentloaded", timeout: 60000 },
  );
  await page.waitForTimeout(4000);
  const field = page.locator("textarea, [contenteditable=true]").first();
  await field.click();
  await field.fill(ABOUT);
  console.log("✓ About updated");
  await saveIntro(page);
}

async function updateContact(page) {
  await page.goto(`${PROFILE}/edit/contact-info/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3500);

  const email = page.locator('input[type="email"], input[aria-label*="Email" i]').first();
  if (await email.isVisible({ timeout: 5000 }).catch(() => false)) {
    await email.fill(CONTACT.email);
    console.log("✓ Email updated");
  }

  await saveIntro(page);
}

async function addSkill(page, skillName) {
  await page.goto(`${PROFILE}/details/skills/edit/forms/new/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);

  const input = page.locator('input[placeholder*="Skill" i], input[aria-label*="Skill" i]').first();
  if (!(await input.isVisible({ timeout: 5000 }).catch(() => false))) {
    console.log(`→ Skill form unavailable for: ${skillName}`);
    return false;
  }
  await input.fill(skillName);
  await page.waitForTimeout(1200);
  const suggestion = page.locator('[role="option"], li').filter({ hasText: new RegExp(skillName.split(" ")[0], "i") }).first();
  if (await suggestion.isVisible({ timeout: 3000 }).catch(() => false)) {
    await suggestion.click();
  } else {
    await page.keyboard.press("Enter");
  }
  await page.waitForTimeout(800);
  await saveIntro(page);
  console.log(`✓ Skill: ${skillName}`);
  return true;
}

async function addProject(page, project) {
  await page.goto(`${PROFILE}/details/projects/edit/forms/new/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);

  const nameInput = page.locator('input[aria-label*="Project name" i], input[id*="title" i]').first();
  if (!(await nameInput.isVisible({ timeout: 5000 }).catch(() => false))) {
    console.log(`→ Project form unavailable: ${project.name}`);
    return false;
  }

  await nameInput.fill(project.name);

  const desc = page.locator("textarea").first();
  if (await desc.isVisible().catch(() => false)) {
    await desc.fill(project.description);
  }

  const url = page.locator('input[type="url"], input[aria-label*="URL" i]').first();
  if (await url.isVisible().catch(() => false)) {
    await url.fill(project.url);
  }

  // Dates — best-effort; LinkedIn uses comboboxes
  try {
    const startMonth = page.getByLabel(/Start date/i).locator("select, [role=combobox]").first();
    // skip if complex
  } catch {
    /* optional */
  }

  await saveIntro(page);
  console.log(`✓ Project: ${project.name}`);
  return true;
}

async function projectExists(page, name) {
  await page.goto(`${PROFILE}/details/projects/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);
  return page.locator("body").innerText().then((t) => t.includes(name));
}

async function main() {
  if (!existsSync(PROFILE_DIR)) {
    console.error("Run: uvx linkedin-scraper-mcp@latest --login");
    process.exit(1);
  }

  const opts = { headless: !headed, viewport: { width: 1400, height: 900 } };
  if (existsSync(CHROME)) opts.executablePath = CHROME;

  const context = await chromium.launchPersistentContext(PROFILE_DIR, opts);
  const page = context.pages()[0] ?? (await context.newPage());

  try {
    await updateHeadline(page);
    await updateAbout(page);
    try {
      await updateContact(page);
    } catch (e) {
      console.warn("Contact:", e.message);
    }

    if (!introOnly) {
      for (const skill of SKILLS_TO_ADD) {
        try {
          await addSkill(page, skill);
        } catch (e) {
          console.warn(`Skill ${skill}:`, e.message);
        }
      }

      for (const project of PROJECTS) {
        try {
          const exists = await projectExists(page, project.name);
          if (exists) {
            console.log(`· Project already listed: ${project.name}`);
            continue;
          }
          await addProject(page, project);
        } catch (e) {
          console.warn(`Project ${project.name}:`, e.message);
        }
      }
    }

    console.log("\nDone. Review:", `${PROFILE}/`);
  } finally {
    await context.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
