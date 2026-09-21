import nodemailer from "nodemailer";
import { siteContact } from "@/config/site";

export interface ContactPayload {
  user_name: string;
  user_email: string;
  message: string;
  time: string;
  subject?: string;
}

export type ContactEmailProvider = "gmail" | "resend" | "emailjs";

export interface ContactEmailResult {
  provider: ContactEmailProvider;
  messageId?: string;
  to: string;
}

function getGmailSmtpConfig() {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim().replace(/\s+/g, "");
  if (!user || !pass) return null;
  return { user, pass };
}

function getEmailJsConfig() {
  const serviceId =
    process.env.EMAILJS_SERVICE_ID?.trim() ||
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const templateId =
    process.env.EMAILJS_TEMPLATE_ID?.trim() ||
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY?.trim() ||
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim() || undefined;

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey, privateKey };
}

function getRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || siteContact.email;
}

function buildTemplateParams(payload: ContactPayload) {
  return {
    user_name: payload.user_name,
    user_email: payload.user_email,
    message: payload.message,
    time: payload.time,
    subject: payload.subject?.trim() || `Portfolio inquiry from ${payload.user_name}`,
    reply_to: payload.user_email,
    email: payload.user_email,
    from_name: payload.user_name,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaGmailSmtp(
  payload: ContactPayload,
): Promise<ContactEmailResult> {
  const config = getGmailSmtpConfig();
  if (!config) {
    throw new Error("Gmail SMTP is not configured.");
  }

  const to = getRecipient();

  // Fresh transporter per request — pooling is unreliable on Vercel serverless.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  try {
    const subject =
      payload.subject?.trim() ||
      `[Portfolio Contact] ${payload.user_name} (${payload.time})`;

    const escapedName = escapeHtml(payload.user_name);
    const escapedEmail = escapeHtml(payload.user_email);
    const escapedMessage = escapeHtml(payload.message);
    const replyMailto = `mailto:${payload.user_email}?subject=${encodeURIComponent(
      `Re: Portfolio Inquiry from ${payload.user_name}`,
    )}`;

    const info = await transporter.sendMail({
      from: `"Reazul Islam Portfolio" <${config.user}>`,
      to,
      replyTo: payload.user_email,
      subject,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      text: [
        `NEW PORTFOLIO CONTACT MESSAGE`,
        `----------------------------------------`,
        `Sender:   ${payload.user_name}`,
        `Email:    ${payload.user_email}`,
        `Received: ${payload.time}`,
        `----------------------------------------`,
        ``,
        `Message:`,
        payload.message,
        ``,
        `----------------------------------------`,
        `Reply directly to: ${payload.user_email}`,
      ].join("\n"),
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table role="presentation" width="100%" style="background:#09090b;padding:32px 16px;">
          <tr><td align="center">
            <table role="presentation" width="100%" style="max-width:600px;background:#121215;border:1px solid #27272a;border-radius:16px;overflow:hidden;">
              <tr><td height="4" style="background:linear-gradient(90deg,#10b981,#34d399,#10b981);">&nbsp;</td></tr>
              <tr><td style="padding:28px 32px 20px;border-bottom:1px solid #27272a;">
                <span style="display:inline-block;padding:4px 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#34d399;background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.25);border-radius:20px;">Portfolio Inquiry</span>
                <h1 style="margin:12px 0 4px;font-size:22px;font-weight:700;color:#fff;">New Message Received</h1>
                <p style="margin:0;font-size:13px;color:#a1a1aa;">${escapeHtml(payload.time)}</p>
              </td></tr>
              <tr><td style="padding:24px 32px;">
                <table role="presentation" width="100%" style="background:#18181b;border:1px solid #27272a;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
                  <tr>
                    <td style="padding:4px 0;font-size:13px;color:#71717a;width:80px;font-weight:600;">SENDER</td>
                    <td style="padding:4px 0;font-size:14px;color:#f4f4f5;font-weight:700;">${escapedName}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;font-size:13px;color:#71717a;font-weight:600;">EMAIL</td>
                    <td style="padding:4px 0;font-size:14px;color:#34d399;"><a href="mailto:${escapedEmail}" style="color:#34d399;text-decoration:none;">${escapedEmail}</a></td>
                  </tr>
                </table>
                <div style="margin-bottom:8px;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#71717a;display:block;margin-bottom:8px;">Message</span>
                  <div style="background:#18181b;border-left:3px solid #10b981;border:1px solid #27272a;border-left:3px solid #10b981;border-radius:0 12px 12px 0;padding:20px 22px;color:#e4e4e7;font-size:14px;line-height:1.65;white-space:pre-wrap;word-break:break-word;">${escapedMessage}</div>
                </div>
                <table role="presentation" width="100%" style="margin-top:24px;"><tr><td align="center">
                  <a href="${replyMailto}" style="display:inline-block;background:#f4f4f5;color:#09090b;font-size:13px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:10px;">Reply to ${escapedName}</a>
                </td></tr></table>
              </td></tr>
              <tr><td style="padding:20px 32px 24px;border-top:1px solid #27272a;background:#0d0d11;text-align:center;">
                <p style="margin:0;font-size:12px;color:#71717a;">Reply goes to <a href="mailto:${escapedEmail}" style="color:#a1a1aa;">${escapedEmail}</a></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>`,
    });

    const accepted = Array.isArray(info.accepted) ? info.accepted : [];
    const rejected = Array.isArray(info.rejected) ? info.rejected : [];

    if (rejected.length > 0 || accepted.length === 0) {
      throw new Error(
        `Gmail rejected the message (accepted=${accepted.length}, rejected=${rejected.length}).`,
      );
    }

    console.log(
      `[contact-email] gmail delivered to ${to}. messageId=${info.messageId ?? "n/a"}`,
    );

    return {
      provider: "gmail",
      messageId: info.messageId,
      to,
    };
  } finally {
    transporter.close();
  }
}

async function sendViaResend(
  payload: ContactPayload,
): Promise<ContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Resend is not configured.");
  }

  const to = getRecipient();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Portfolio Contact <onboarding@resend.dev>";

  const subject =
    payload.subject?.trim() ||
    `Portfolio inquiry from ${payload.user_name}`;

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
      subject,
      text: [
        `Sender: ${payload.user_name} <${payload.user_email}>`,
        `Time: ${payload.time}`,
        ``,
        payload.message,
      ].join("\n"),
    }),
  });

  const raw = await response.text().catch(() => "");
  let parsed: { id?: string; message?: string } = {};
  try {
    parsed = raw ? (JSON.parse(raw) as { id?: string; message?: string }) : {};
  } catch {
    parsed = {};
  }

  if (!response.ok) {
    throw new Error(
      parsed.message ||
        raw ||
        `Resend responded with ${response.status}`,
    );
  }

  if (!parsed.id) {
    throw new Error("Resend did not return a message id.");
  }

  console.log(`[contact-email] resend delivered to ${to}. id=${parsed.id}`);

  return { provider: "resend", messageId: parsed.id, to };
}

async function sendViaEmailJs(
  payload: ContactPayload,
): Promise<ContactEmailResult> {
  const config = getEmailJsConfig();
  if (!config) {
    throw new Error("Email service is not configured.");
  }

  if (process.env.NODE_ENV === "production" && !config.privateKey) {
    throw new Error(
      "EMAILJS_PRIVATE_KEY is missing. EmailJS requires a private key for server-side sends in production.",
    );
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

  const text = await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error(text || `EmailJS responded with ${response.status}`);
  }

  const to = getRecipient();
  console.log(`[contact-email] emailjs accepted send for ${to}`);

  return { provider: "emailjs", to };
}

export function getContactEmailStatus() {
  const gmail = Boolean(getGmailSmtpConfig());
  const resend = Boolean(process.env.RESEND_API_KEY?.trim());
  const emailjs = Boolean(getEmailJsConfig());
  const emailjsHasPrivateKey = Boolean(
    process.env.EMAILJS_PRIVATE_KEY?.trim(),
  );

  let active: ContactEmailProvider | null = null;
  if (gmail) active = "gmail";
  else if (resend) active = "resend";
  else if (emailjs) active = "emailjs";

  return {
    configured: Boolean(active),
    activeProvider: active,
    providers: {
      gmail,
      resend,
      emailjs,
      emailjsHasPrivateKey,
    },
    recipientConfigured: Boolean(
      process.env.CONTACT_TO_EMAIL?.trim() || siteContact.email,
    ),
  };
}

export function isContactEmailConfigured(): boolean {
  return getContactEmailStatus().configured;
}

export function sanitizeContactError(error: unknown): string {
  const raw =
    error instanceof Error
      ? error.message
      : "Unable to send your message right now.";

  if (/gmail_app_password is missing|google app password/i.test(raw)) {
    return "Email delivery is not configured yet. Please use the contact links on this page.";
  }

  if (
    /invalid grant|gmail_api|oauth|token expired|reconnect your gmail|non-browser environments|dashboard\.emailjs\.com\/admin\/account\/security|no private key was provided|emailjs_private_key is missing|strict mode|invalid login|username and password not accepted|authentication failed|eauth/i.test(
      raw,
    )
  ) {
    return "Email delivery is temporarily unavailable. Please email Reaz directly or use WhatsApp from the contact section.";
  }

  if (/email service is not configured|not configured|resend is not configured|gmail smtp is not configured/i.test(
    raw,
  )) {
    return "Email delivery is not configured yet. Please use the contact links on this page.";
  }

  return "Unable to send your message right now. Please try again later or contact Reaz directly.";
}

export async function sendContactEmail(
  payload: ContactPayload,
): Promise<ContactEmailResult> {
  if (process.env.GMAIL_USER?.trim() && !process.env.GMAIL_APP_PASSWORD?.trim()) {
    throw new Error(
      "GMAIL_APP_PASSWORD is missing. Create a Google App Password and add it to .env.local / Vercel.",
    );
  }

  if (getGmailSmtpConfig()) {
    return sendViaGmailSmtp(payload);
  }

  if (process.env.RESEND_API_KEY?.trim()) {
    return sendViaResend(payload);
  }

  if (getEmailJsConfig()) {
    return sendViaEmailJs(payload);
  }

  throw new Error(
    "Email service is not configured. Set GMAIL_USER + GMAIL_APP_PASSWORD (recommended), or RESEND_API_KEY, or EmailJS keys on the server.",
  );
}
