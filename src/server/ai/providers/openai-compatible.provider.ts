import OpenAI from "openai";
import type { APIError } from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { AiProviderError } from "../errors";
import type {
  AiChatCompletionInput,
  AiProviderName,
  AiProviderResponse,
} from "../types";

const DEFAULT_TIMEOUT_MS = 8000;

interface OpenAICompatibleProviderConfig {
  provider: AiProviderName;
  apiKey?: string;
  baseURL: string;
  model: string;
}

function getStatusCode(error: unknown): number | undefined {
  const maybeStatus = error as { status?: unknown; statusCode?: unknown };
  const status = maybeStatus.status ?? maybeStatus.statusCode;
  return typeof status === "number" ? status : undefined;
}

function isRetryableStatus(statusCode?: number): boolean {
  if (!statusCode) return true;
  return statusCode === 408 || statusCode === 409 || statusCode === 425 || statusCode === 429 || statusCode >= 500;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown provider error";
}

function toProviderError(provider: AiProviderName, error: unknown): AiProviderError {
  const statusCode = getStatusCode(error);
  const name = error instanceof Error ? error.name : "";
  const retryable =
    isRetryableStatus(statusCode) ||
    name === "APIConnectionTimeoutError" ||
    name === "APIConnectionError" ||
    name === "AbortError";

  return new AiProviderError({
    provider,
    message: getErrorMessage(error),
    statusCode,
    retryable,
    cause: error as APIError,
  });
}

export async function createOpenAICompatibleChatCompletion({
  provider,
  apiKey,
  baseURL,
  model,
  input,
}: OpenAICompatibleProviderConfig & {
  input: AiChatCompletionInput;
}): Promise<AiProviderResponse> {
  if (!apiKey) {
    throw new AiProviderError({
      provider,
      message: `${provider} API key is not configured.`,
      retryable: true,
    });
  }

  try {
    const client = new OpenAI({
      apiKey,
      baseURL,
      maxRetries: 0,
      timeout: input.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    });

    const completion = await client.chat.completions.create({
      model,
      messages: input.messages as ChatCompletionMessageParam[],
      temperature: input.temperature ?? 0.35,
      max_tokens: input.maxTokens ?? 550,
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new AiProviderError({
        provider,
        message: `${provider} returned an empty response.`,
        retryable: true,
      });
    }

    return { provider, content };
  } catch (error) {
    if (error instanceof AiProviderError) throw error;
    throw toProviderError(provider, error);
  }
}

