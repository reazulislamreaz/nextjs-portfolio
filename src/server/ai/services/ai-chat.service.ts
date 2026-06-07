import { AiProviderError, AiProvidersUnavailableError } from "../errors";
import { aiLogger } from "../logger";
import { ClaudeProvider } from "../providers/claude.provider";
import { GroqProvider } from "../providers/groq.provider";
import { TogetherProvider } from "../providers/together.provider";
import type {
  AiChatCompletionInput,
  AiProvider,
  AiProviderFailure,
  AiProviderResponse,
} from "../types";

const DEFAULT_TIMEOUT_MS = 15000;

export class AiChatService {
  constructor(
    private readonly providers: AiProvider[] = [
      new ClaudeProvider(),
      new GroqProvider(),
      new TogetherProvider(),
    ],
  ) {}

  async chat(input: AiChatCompletionInput): Promise<AiProviderResponse> {
    const failures: AiProviderFailure[] = [];
    const safeInput = {
      ...input,
      timeoutMs: input.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    };

    for (const provider of this.providers) {
      try {
        const response = await provider.chat(safeInput);
        aiLogger.info("AI provider used", { provider: response.provider });
        return response;
      } catch (error) {
        const failure = this.normalizeFailure(provider.name, error);
        failures.push(failure);

        aiLogger.warn("AI provider failed", {
          provider: failure.provider,
          statusCode: failure.statusCode,
          retryable: failure.retryable,
          message: failure.message,
        });

        const nextProvider = this.providers[this.providers.indexOf(provider) + 1];
        if (nextProvider) {
          aiLogger.warn("Falling back to next AI provider", {
            from: provider.name,
            to: nextProvider.name,
            reason: failure.message,
          });
        }
      }
    }

    aiLogger.error("All AI providers failed", { failures });
    throw new AiProvidersUnavailableError(failures);
  }

  private normalizeFailure(
    provider: AiProvider["name"],
    error: unknown,
  ): AiProviderFailure {
    if (error instanceof AiProviderError) {
      return {
        provider: error.provider,
        message: error.message,
        statusCode: error.statusCode,
        retryable: error.retryable,
      };
    }

    return {
      provider,
      message: error instanceof Error ? error.message : "Unknown provider error",
      retryable: true,
    };
  }
}

export const aiChatService = new AiChatService();

