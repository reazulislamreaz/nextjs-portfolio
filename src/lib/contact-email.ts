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

let cachedTransporter: nodemailer.Transporter | null = null;

function getPooledGmailTransporter(user: string, pass: string): nodemailer.Transporter {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      auth: { user, pass },
    });
  }
  return cachedTransporter;
}

async function sendViaGmailSmtp(payload: ContactPayload): Promise<void> {
  const config = getGmailSmtpConfig();
  if (!config) return;

  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteContact.email;
  const transporter = getPooledGmailTransporter(config.user, config.pass);

  const escapedName = payload.user_name
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const escapedEmail = payload.user_email
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const escapedMessage = payload.message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const replyMailto = `mailto:${payload.user_email}?subject=${encodeURIComponent(
    `Re: Portfolio Inquiry from ${payload.user_name}`,
  )}`;

  const info = await transporter.sendMail({
    from: `"Reazul Islam Portfolio" <${config.user}>`,
    to,
    replyTo: payload.user_email,
    subject: `🔔 [Portfolio Contact] ${payload.user_name} (${payload.time})`,
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
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Message</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #09090b; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #121215; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                
                <!-- Top Emerald Accent Stripe -->
                <tr>
                  <td height="4" style="background: linear-gradient(90deg, #10b981, #34d399, #10b981); font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>

                <!-- Header -->
                <tr>
                  <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #27272a;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #34d399; background-color: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 20px;">
                            ⚡ Portfolio Inquiry
                          </span>
                          <h1 style="margin: 12px 0 4px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                            New Message Received
                          </h1>
                          <p style="margin: 0; font-size: 13px; color: #a1a1aa;">
                            Received via your portfolio contact form • ${payload.time}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Sender Info Card -->
                <tr>
                  <td style="padding: 24px 32px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
                      <tr>
                        <td>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="padding: 4px 0; font-size: 13px; color: #71717a; width: 80px; font-weight: 600;">
                                SENDER
                              </td>
                              <td style="padding: 4px 0; font-size: 14px; color: #f4f4f5; font-weight: 700;">
                                ${escapedName}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 4px 0; font-size: 13px; color: #71717a; font-weight: 600;">
                                EMAIL
                              </td>
                              <td style="padding: 4px 0; font-size: 14px; color: #34d399;">
                                <a href="mailto:${escapedEmail}" style="color: #34d399; text-decoration: none; font-weight: 500;">
                                  ${escapedEmail}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Message Section -->
                    <div style="margin-bottom: 8px;">
                      <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #71717a; display: block; margin-bottom: 8px;">
                        Message
                      </span>
                      <div style="background-color: #18181b; border-left: 3px solid #10b981; border-top: 1px solid #27272a; border-right: 1px solid #27272a; border-bottom: 1px solid #27272a; border-radius: 0 12px 12px 0; padding: 20px 22px; color: #e4e4e7; font-size: 14px; line-height: 1.65; white-space: pre-wrap; word-break: break-word;">${escapedMessage}</div>
                    </div>

                    <!-- Quick Reply Button -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px;">
                      <tr>
                        <td align="center">
                          <a href="${replyMailto}" style="display: inline-block; background-color: #f4f4f5; color: #09090b; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(255,255,255,0.15);">
                            ↩ Reply to ${escapedName}
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 32px 24px 32px; border-top: 1px solid #27272a; background-color: #0d0d11; text-align: center;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; color: #71717a;">
                      Direct response will be sent to <a href="mailto:${escapedEmail}" style="color: #a1a1aa; text-decoration: underline;">${escapedEmail}</a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #52525b;">
                      Reazul Islam Portfolio • Full-Stack Developer
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });

  console.log(`[contact-email] Successfully delivered email to ${to}. MessageId: ${info.messageId}`);
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
