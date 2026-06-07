import nodemailer from "nodemailer";
import { siteContact } from "@/config/site";

export interface ContactPayload {
  user_name: string;
  user_email: string;
  message: string;
  time: string;
}

function getGmailSmtpConfig() {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim().replace(/\s/g, "");
  if (!user || !pass) return null;
  return { user, pass };
}

function getEmailJsConfig() {
  const serviceId =
    process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId =
    process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim() || undefined;

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey, privateKey };
}

function buildTemplateParams(payload: ContactPayload) {
  return {
    user_name: payload.user_name,
    user_email: payload.user_email,
    message: payload.message,
    time: payload.time,
    reply_to: payload.user_email,
    email: payload.user_email,
    from_name: payload.user_name,
  };
}

async function sendViaGmailSmtp(payload: ContactPayload): Promise<void> {
  const config = getGmailSmtpConfig();
  if (!config) return;

  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteContact.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.user}>`,
    to,
    replyTo: payload.user_email,
    subject: `Portfolio inquiry from ${payload.user_name}`,
    text: payload.message,
  });
}

async function sendViaResend(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return;

  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteContact.email;
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Portfolio Contact <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.user_email,
      subject: `Portfolio inquiry from ${payload.user_name}`,
      text: payload.message,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Resend responded with ${response.status}`);
  }
}

async function sendViaEmailJs(payload: ContactPayload): Promise<void> {
  const config = getEmailJsConfig();
  if (!config) {
    throw new Error("Email service is not configured.");
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      ...(config.privateKey ? { accessToken: config.privateKey } : {}),
      template_params: buildTemplateParams(payload),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Email provider responded with ${response.status}`);
  }
}

export function isContactEmailConfigured(): boolean {
  return Boolean(
    getGmailSmtpConfig() ||
      process.env.RESEND_API_KEY?.trim() ||
      getEmailJsConfig(),
  );
}

export function sanitizeContactError(error: unknown): string {
  const raw =
    error instanceof Error ? error.message : "Unable to send your message right now.";

  if (/gmail_app_password is missing|google app password/i.test(raw)) {
    return "Email delivery is not configured yet. Please use the contact links on this page.";
  }

  if (
    /invalid grant|gmail_api|oauth|token expired|reconnect your gmail|non-browser environments|dashboard\.emailjs\.com\/admin\/account\/security|no private key was provided|emailjs_private_key is missing|strict mode/i.test(
      raw,
    )
  ) {
    return "Email delivery is temporarily unavailable. Please email Reaz directly or use WhatsApp from the contact section.";
  }

  if (/email service is not configured|not configured/i.test(raw)) {
    return "Email delivery is not configured yet. Please use the contact links on this page.";
  }

  return "Unable to send your message right now. Please try again later or contact Reaz directly.";
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  if (process.env.GMAIL_USER?.trim() && !process.env.GMAIL_APP_PASSWORD?.trim()) {
    throw new Error(
      "GMAIL_APP_PASSWORD is missing. Create a Google App Password and add it to .env.local / Vercel.",
    );
  }

  if (getGmailSmtpConfig()) {
    await sendViaGmailSmtp(payload);
    return;
  }

  if (process.env.RESEND_API_KEY?.trim()) {
    await sendViaResend(payload);
    return;
  }

  await sendViaEmailJs(payload);
}
