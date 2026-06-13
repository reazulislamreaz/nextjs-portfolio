#!/usr/bin/env node
/**
 * Publish a LinkedIn post about the AWS Udemy certificate.
 *
 *   node scripts/linkedin-aws-cert-post.mjs
 *   node scripts/linkedin-aws-cert-post.mjs --headed
 *   node scripts/linkedin-aws-cert-post.mjs --dry-run
 */

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const PROFILE_DIR = join(homedir(), ".linkedin-mcp/profile");
const CHROME = join(
  homedir(),
  ".linkedin-mcp/patchright-browsers/chromium-1223/chrome-linux64/chrome",
);

const CERT_URL =
  "https://www.udemy.com/certificate/UC-737af03a-d89d-4d2f-98e3-5c48dc7d0e8f/";
const PORTFOLIO_URL = "https://reazul-islam-reaz.vercel.app";

export const POST_TEXT = `Just wrapped up "Hands-On Introduction to Cloud Computing with AWS" on Udemy — and this one actually changed how I think about deploying backend systems.

I didn't need another high-level slideshow about what AWS stands for. I wanted the practical side: how IAM, EC2, S3, VPC, load balancing, auto scaling, Lambda, and CloudWatch fit together when you're trying to ship something real and keep it running.

A few takeaways I'm already applying to my own work:

• Security first with IAM — permissions as a design decision, not an afterthought
• EC2 + VPC networking that matches how you'd actually expose an API
• S3 for durable storage without treating the bucket like a junk drawer
• Load balancing and auto scaling before traffic spikes, not after an incident
• Lambda and serverless patterns for work that shouldn't need a box running 24/7
• CloudWatch so production isn't a black box

This course lined up well with what I already care about as a backend-focused engineer: disciplined APIs, production-minded releases, Docker, CI/CD, and deploying to cloud targets without guessing what breaks first.

Verified certificate: ${CERT_URL}

Portfolio: ${PORTFOLIO_URL}

#AWS #CloudComputing #BackendDevelopment #DevOps #LearningInPublic #Udemy #NodeJS`;

const headed = process.argv.includes("--headed");
const dryRun = process.argv.includes("--dry-run");

async function main() {
  if (dryRun) {
    console.log(POST_TEXT);
    return;
  }

  if (!existsSync(PROFILE_DIR)) {
    throw new Error(
      "LinkedIn session not found. Run: uvx linkedin-scraper-mcp@latest --login",
    );
  }

  const opts = { headless: !headed, viewport: { width: 1400, height: 900 } };
  if (existsSync(CHROME)) opts.executablePath = CHROME;

  const context = await chromium.launchPersistentContext(PROFILE_DIR, opts);
  const page = context.pages()[0] ?? (await context.newPage());

  try {
    await page.goto("https://www.linkedin.com/feed/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForTimeout(4000);

    const trigger = page.getByRole("button", { name: /Start a post/i }).first();
    await trigger.click({ timeout: 15000 });

    await page.waitForTimeout(2000);

    const editor = page.locator('div[role="textbox"][contenteditable="true"]').first();
    await editor.waitFor({ state: "visible", timeout: 15000 });
    await editor.click();
    await page.keyboard.insertText(POST_TEXT);
    console.log("✓ Draft entered");

    await page.waitForTimeout(1500);

    const postButton = page.getByRole("button", { name: /^Post$/i }).last();
    await postButton.click({ timeout: 10000 });
    await page.waitForTimeout(5000);

    console.log("✓ LinkedIn post published");
  } finally {
    await context.close();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
