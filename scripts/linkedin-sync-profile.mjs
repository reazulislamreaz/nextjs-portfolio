#!/usr/bin/env node
/**
 * Sync LinkedIn profile with portfolio data (headline, about, contact, skills, projects).
 *
 *   node scripts/linkedin-sync-profile.mjs
 *   node scripts/linkedin-sync-profile.mjs --intro-only
 *   node scripts/linkedin-sync-profile.mjs --projects-only
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
const projectsOnly = process.argv.includes("--projects-only");
const headed = process.argv.includes("--headed");

const MONTHS = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

async function saveForm(page) {
  const save = page.getByRole("button", { name: /^Save$/ });
  if (await save.isVisible({ timeout: 5000 }).catch(() => false)) {
    await save.click();
    await page.waitForTimeout(4000);
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
  await saveForm(page);
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
  await saveForm(page);
}

async function updateContact(page) {
  await page.goto(`${PROFILE}/edit/contact-info/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3500);

  const email = page
    .locator('input[type="email"], input[aria-label*="Email" i]')
    .first();
  if (await email.isVisible({ timeout: 5000 }).catch(() => false)) {
    await email.fill(CONTACT.email);
    console.log("✓ Email updated");
  }

  await saveForm(page);
}

async function addSkill(page, skillName) {
  await page.goto(`${PROFILE}/details/skills/edit/forms/new/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);

  const input = page
    .locator('input[placeholder*="Skill" i], input[aria-label*="Skill" i]')
    .first();
  if (!(await input.isVisible({ timeout: 5000 }).catch(() => false))) {
    console.log(`→ Skill form unavailable for: ${skillName}`);
    return false;
  }
  await input.fill(skillName);
  await page.waitForTimeout(1200);
  const suggestion = page
    .locator('[role="option"], li')
    .filter({ hasText: new RegExp(skillName.split(" ")[0], "i") })
    .first();
  if (await suggestion.isVisible({ timeout: 3000 }).catch(() => false)) {
    await suggestion.click();
  } else {
    await page.keyboard.press("Enter");
  }
  await page.waitForTimeout(800);
  await saveForm(page);
  console.log(`✓ Skill: ${skillName}`);
  return true;
}

async function selectDateGroup(page, start, end, ongoing) {
  const selects = page.locator("select");
  const count = await selects.count();
  if (count < 2) return;

  const monthSelects = [];
  for (let i = 0; i < count; i++) {
    const sample = await selects
      .nth(i)
      .evaluate((el) => el.options[1]?.text || el.options[0]?.text || "");
    if (/month|january|february|march/i.test(sample)) {
      monthSelects.push(i);
    }
  }

  if (monthSelects.length >= 1 && start) {
    await selects
      .nth(monthSelects[0])
      .selectOption({ label: MONTHS[start.month] || start.month });
    if (monthSelects[0] + 1 < count) {
      await selects
        .nth(monthSelects[0] + 1)
        .selectOption({ label: String(start.year) });
    }
  }

  if (!ongoing && end && monthSelects.length >= 2) {
    await selects
      .nth(monthSelects[1])
      .selectOption({ label: MONTHS[end.month] || end.month });
    if (monthSelects[1] + 1 < count) {
      await selects
        .nth(monthSelects[1] + 1)
        .selectOption({ label: String(end.year) });
    }
  }

  if (ongoing) {
    await page
      .getByText(/I am currently working on this project/i)
      .click()
      .catch(() => {});
  }
}

async function addProjectLink(page, url, label) {
  await page.getByRole("button", { name: /Add media/i }).click();
  await page.waitForTimeout(800);
  await page.getByText(/^Add a link$/i).click();
  await page.waitForTimeout(1200);

  const linkInput = page.locator(
    'input[aria-label*="Paste or type a link" i]',
  );
  await linkInput.fill(url);
  await page.waitForTimeout(1500);

  const addBtn = page.getByRole("button", { name: /^Add$/ }).first();
  if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await addBtn.click();
    await page.waitForTimeout(1500);
  }

  console.log(`  · Link added: ${label}`);
}

async function fillProjectForm(page, project) {
  const nameInput = page.locator('input[type="text"]').first();
  if (!(await nameInput.isVisible({ timeout: 8000 }).catch(() => false))) {
    return false;
  }

  await nameInput.fill(project.name);

  const desc = page.locator('textarea[aria-label*="Description" i]');
  if (await desc.isVisible().catch(() => false)) {
    await desc.fill(project.description);
  }

  await selectDateGroup(page, project.start, project.end, project.ongoing);

  if (project.url) {
    await addProjectLink(page, project.url, "Live demo");
  }
  if (project.github) {
    await addProjectLink(page, project.github, "GitHub");
  }

  return true;
}

async function openNewProjectForm(page) {
  await page.goto(`${PROFILE}/edit/forms/project/new/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3500);
}

async function openEditProjectForm(page, projectName) {
  await page.goto(`${PROFILE}/details/projects/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);

  const editLink = page.locator(
    `a[aria-label="Edit project ${projectName}"]`,
  );
  if (!(await editLink.isVisible({ timeout: 5000 }).catch(() => false))) {
    return false;
  }
  await editLink.click();
  await page.waitForTimeout(3500);
  return true;
}

async function addProject(page, project) {
  await openNewProjectForm(page);
  if (!(await fillProjectForm(page, project))) {
    console.log(`→ Project form unavailable: ${project.name}`);
    return false;
  }
  await saveForm(page);
  console.log(`✓ Added project: ${project.name}`);
  return true;
}

async function updateProject(page, project) {
  if (!(await openEditProjectForm(page, project.name))) {
    console.log(`→ Edit link not found: ${project.name}`);
    return false;
  }
  if (!(await fillProjectForm(page, project))) {
    console.log(`→ Edit form unavailable: ${project.name}`);
    return false;
  }
  await saveForm(page);
  console.log(`✓ Updated project: ${project.name}`);
  return true;
}

async function projectExists(page, name) {
  await page.goto(`${PROFILE}/details/projects/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);
  const text = await page.locator("main").innerText();
  return new RegExp(`\\b${name}\\b`).test(text);
}

async function syncProjects(page) {
  for (const project of PROJECTS) {
    try {
      const exists = await projectExists(page, project.name);
      if (exists) {
        await updateProject(page, project);
      } else {
        await addProject(page, project);
      }
      await page.waitForTimeout(2000);
    } catch (e) {
      console.warn(`Project ${project.name}:`, e.message);
    }
  }
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
    if (projectsOnly) {
      await syncProjects(page);
    } else {
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

        await syncProjects(page);
      }
    }

    console.log("\nDone. Review:", `${PROFILE}/details/projects/`);
  } finally {
    await context.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
