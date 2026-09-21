import { NextResponse, type NextRequest } from "next/server";
import {
  getContactEmailStatus,
  sanitizeContactError,
  sendContactEmail,
} from "@/lib/contact-email";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const MAX_SUBJECT = 160;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Non-secret health check — confirms whether a delivery provider is configured. */
export async function GET() {
  const status = getContactEmailStatus();
  return NextResponse.json({
    ok: true,
    configured: status.configured,
    activeProvider: status.activeProvider,
    providers: {
      gmail: status.providers.gmail,
      resend: status.providers.resend,
      emailjs: status.providers.emailjs,
      emailjsHasPrivateKey: status.providers.emailjsHasPrivateKey,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const honeypot = String(
      body._honey_trap_field ??
        body.contact_extra_field ??
        body.company_fax ??
        body.website ??
        "",
    ).trim();
    if (honeypot) {
      // Bot trap: pretend success, do not send.
      console.warn("[contact-api] Honeypot triggered — dropping submission");
      return NextResponse.json({
        ok: true,
        delivered: true,
        provider: "filtered",
      });
    }

    const user_name = String(body.user_name ?? "").trim();
    const user_email = String(body.user_email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const time = String(body.time ?? new Date().toLocaleString());

    if (!user_name || !user_email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (user_name.length > MAX_NAME) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }

    if (!isValidEmail(user_email) || user_email.length > MAX_EMAIL) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    if (subject.length > MAX_SUBJECT) {
      return NextResponse.json(
        { error: "Subject is too long." },
        { status: 400 },
      );
    }

    if (message.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }

    const status = getContactEmailStatus();
    if (!status.configured) {
      console.error(
        "[contact-api] No email provider configured (Gmail / Resend / EmailJS).",
      );
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured yet. Please use the contact links on this page.",
          code: "NOT_CONFIGURED",
        },
        { status: 503 },
      );
    }

    const ip = getClientIp(request);
    console.log(
      `[contact-api] Processing via ${status.activeProvider} from: "${user_name}" <${user_email}> (IP: ${ip})`,
    );

    const rate = checkRateLimit(`contact:${ip}`, 15, 60 * 60 * 1000);
    if (!rate.allowed) {
      console.warn(`[contact-api] Rate limit reached for IP: ${ip}`);
      return NextResponse.json(
        {
          error:
            "Too many messages sent. Please wait a few minutes before trying again.",
        },
        {
          status: 429,
          headers: rate.retryAfterSec
            ? { "Retry-After": String(rate.retryAfterSec) }
            : undefined,
        },
      );
    }

    const result = await sendContactEmail({
      user_name,
      user_email,
      message,
      time,
      subject: subject || undefined,
    });

    console.log(
      `[contact-api] Delivered via ${result.provider} to ${result.to}. messageId=${result.messageId ?? "n/a"}`,
    );

    return NextResponse.json({
      ok: true,
      delivered: true,
      provider: result.provider,
    });
  } catch (error) {
    console.error("[contact-api] ERROR dispatching message:", error);
    return NextResponse.json(
      { error: sanitizeContactError(error), code: "DELIVERY_FAILED" },
      { status: 500 },
    );
  }
}
