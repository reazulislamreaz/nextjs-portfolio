import { AiProviderError } from "../errors";
import type { AiChatCompletionInput, AiProvider, AiProviderResponse } from "../types";

const ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-4-20250514";
const DEFAULT_TIMEOUT_MS = 15000;

interface AnthropicTextBlock {
  type?: string;
  text?: string;
}

interface AnthropicMessageResponse {
  content?: AnthropicTextBlock[];
  error?: {
    message?: string;
  };
}

function isRetryableStatus(statusCode: number): boolean {
  return statusCode === 408 || statusCode === 409 || statusCode === 425 || statusCode === 429 || statusCode >= 500;
}

export class ClaudeProvider implements AiProvider {
  readonly name = "claude" as const;

  async chat(input: AiChatCompletionInput): Promise<AiProviderResponse> {
    const apiKey = process.env.CLAUDE_API_KEY ?? process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new AiProviderError({
        provider: this.name,
        message: "Claude API key is not configured.",
        retryable: true,
      });
    }

    const system = input.messages
      .filter((message) => message.role === "system")
      .map((message) => message.content)
      .join("\n\n");

    const messages = input.messages
      .filter((message) => message.role !== "system")
      .map((message) => ({
        role: message.role as "user" | "assistant",
        content: message.content,
      }));

    if (!messages.length) {
      throw new AiProviderError({
        provider: this.name,
        message: "At least one user or assistant message is required.",
        retryable: false,
      });
    }

    const controller = new AbortController();
    const timeoutMs = input.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(ANTHROPIC_MESSAGES_URL, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.CLAUDE_MODEL ?? DEFAULT_MODEL,
          max_tokens: input.maxTokens ?? 550,
          temperature: input.temperature ?? 0.35,
          system: system || undefined,
          messages,
        }),
        signal: controller.signal,
      });

      const data = (await response.json()) as AnthropicMessageResponse;

      if (!response.ok) {
        throw new AiProviderError({
          provider: this.name,
          message: data.error?.message ?? "Claude request failed.",
          statusCode: response.status,
          retryable: isRetryableStatus(response.status),
        });
      }

      const content = data.content?.find((block) => block.type === "text")?.text?.trim();

      if (!content) {
        throw new AiProviderError({
          provider: this.name,
          message: "Claude returned an empty response.",
          retryable: true,
        });
      }

      return { provider: this.name, content };
    } catch (error) {
      if (error instanceof AiProviderError) throw error;

      const message =
        error instanceof Error && error.name === "AbortError"
          ? "Claude request timed out."
          : error instanceof Error
            ? error.message
            : "Claude request failed.";

      throw new AiProviderError({
        provider: this.name,
        message,
        retryable: true,
        cause: error,
      });
    } finally {
      clearTimeout(timeout);
    }
  }
}
