import { NextResponse, type NextRequest } from "next/server";
import { portfolioAssistantContext } from "@/lib/portfolio-assistant-context";
import { checkRateLimit } from "@/lib/rate-limit";

const MAX_MESSAGES = 8;
const MAX_CONTENT_LENGTH = 1000;
const DEFAULT_MODEL = "llama-3.3-70b-versatile";
const DEFAULT_BASE_URL = "https://api.groq.com/openai/v1";
const DEFAULT_TIMEOUT_MS = 15000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GroqChatChoice {
  message?: {
    content?: string;
  };
}

interface GroqChatResponse {
  choices?: GroqChatChoice[];
  error?: {
    message?: string;
  };
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function normalizeMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_MESSAGES)
    .map((message) => {
      if (!message || typeof message !== "object") return null;

      const record = message as Record<string, unknown>;
      const role = record.role === "assistant" ? "assistant" : "user";
      const content = String(record.content ?? "").trim().slice(0, MAX_CONTENT_LENGTH);

      if (!content) return null;
      return { role, content };
    })
    .filter((message): message is ChatMessage => message !== null);
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is not configured." },
        { status: 500 },
      );
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(`ai-assistant:${ip}`, 20, 60 * 60 * 1000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many AI requests. Please try again later." },
        {
          status: 429,
          headers: rate.retryAfterSec
            ? { "Retry-After": String(rate.retryAfterSec) }
            : undefined,
        },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const messages = normalizeMessages(body.messages);

    if (!messages.length || messages[messages.length - 1]?.role !== "user") {
      return NextResponse.json(
        { error: "Please send a message to the assistant." },
        { status: 400 },
      );
    }

    const controller = new AbortController();
    const timeoutMs = Number(process.env.GROQ_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS);
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const baseUrl = process.env.GROQ_BASE_URL ?? DEFAULT_BASE_URL;
    const model = process.env.GROQ_MODEL ?? DEFAULT_MODEL;

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        max_tokens: 550,
        messages: [
          {
            role: "system",
            content: `You are Reazul Islam Reaz's portfolio assistant. Answer visitors using only the portfolio context below.

Rules:
- Be concise, friendly, and specific.
- Match the visitor's language style. If they write English, answer in English. If they write Bangla script, answer in Bangla. If they write Banglish or Romanized Bengali, answer in natural Banglish.
- For Banglish, keep common technical terms in English and use simple conversational wording. Examples: "Reaz er backend skill strong", "uni Node.js, NestJS, PostgreSQL niye kaj kore", "contact korte chaile email ba WhatsApp use korte paren".
- Understand common Banglish words and phrases such as "ki", "kono", "ase/ache", "parbe", "kaj", "project gula", "experience kemon", "hire korte chai", "contact korbo kivabe", "resume koi".
- Prefer bullets for project or skill comparisons.
- If the answer is not in the portfolio context, say you do not have that detail and suggest contacting Reaz.
- Do not invent years of experience, employers, degrees, pricing, private availability, or technologies not listed.
- For hiring/contact questions, share the email, WhatsApp link, LinkedIn, GitHub, or resume path when useful.

Portfolio context:
${portfolioAssistantContext}`,
          },
          ...messages,
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = (await response.json()) as GroqChatResponse;

    if (!response.ok) {
      const message = data.error?.message ?? "Groq could not answer right now.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const answer = data.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "The assistant returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("AI assistant API error:", error);
    }

    const message =
      error instanceof Error && error.name === "AbortError"
        ? "The assistant took too long to respond. Please try again."
        : "Unable to reach the AI assistant right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
