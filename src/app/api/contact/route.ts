import { NextResponse, type NextRequest } from "next/server";
import { sanitizeContactError, sendContactEmail } from "@/lib/contact-email";
import { checkRateLimit } from "@/lib/rate-limit";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const honeypot = String(body.website ?? "").trim();
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    const user_name = String(body.user_name ?? "").trim();
    const user_email = String(body.user_email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const time = String(body.time ?? new Date().toISOString());

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
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        {
          status: 429,
          headers: rate.retryAfterSec
            ? { "Retry-After": String(rate.retryAfterSec) }
            : undefined,
        },
      );
    }

    await sendContactEmail({ user_name, user_email, message, time });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Contact API error:", error);
    }
    return NextResponse.json(
      { error: sanitizeContactError(error) },
      { status: 500 },
    );
  }
}
