import { NextResponse, type NextRequest } from "next/server";
import { buildPortfolioAssistantSystemPrompt } from "@/lib/portfolio-assistant-prompt";
import { checkRateLimit } from "@/lib/rate-limit";
import { AiProvidersUnavailableError } from "@/server/ai/errors";
import { aiChatService } from "@/server/ai/services/ai-chat.service";
import type { AiChatMessage } from "@/server/ai/types";

const MAX_MESSAGES = 8;
const MAX_CONTENT_LENGTH = 1000;
const DEFAULT_TIMEOUT_MS = 15000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
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

function hasAnyAiProviderKey(): boolean {
  return Boolean(
    process.env.CLAUDE_API_KEY ||
      process.env.ANTHROPIC_API_KEY ||
      process.env.GROQ_API_KEY ||
      process.env.TOGETHER_API_KEY,
  );
}

export async function POST(request: NextRequest) {
  try {
    if (!hasAnyAiProviderKey()) {
      return NextResponse.json(
        { error: "AI assistant is not configured. Add CLAUDE_API_KEY, GROQ_API_KEY, or TOGETHER_API_KEY." },
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

    const latestUserMessage = messages[messages.length - 1].content;
    const completionMessages: AiChatMessage[] = [
      {
        role: "system",
        content: buildPortfolioAssistantSystemPrompt(latestUserMessage),
      },
      ...messages,
    ];

    const timeoutMs = Number(process.env.AI_ASSISTANT_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS);

    const response = await aiChatService.chat({
      messages: completionMessages,
      temperature: 0.35,
      maxTokens: 550,
      timeoutMs,
    });

    return NextResponse.json({ answer: response.content });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("AI assistant API error:", error);
    }

    if (error instanceof AiProvidersUnavailableError) {
      return NextResponse.json(
        { error: "All AI providers are unavailable right now. Please try again later." },
        { status: 502 },
      );
    }

    const message =
      error instanceof Error && error.name === "AbortError"
        ? "The assistant took too long to respond. Please try again."
        : "Unable to reach the AI assistant right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
