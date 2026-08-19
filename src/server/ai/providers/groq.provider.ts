import { createOpenAICompatibleChatCompletion } from "./openai-compatible.provider";
import type { AiChatCompletionInput, AiProvider, AiProviderResponse } from "../types";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
];

export class GroqProvider implements AiProvider {
  readonly name = "groq" as const;

  async chat(input: AiChatCompletionInput): Promise<AiProviderResponse> {
    const configuredModel = process.env.GROQ_MODEL?.trim();
    const candidateModels = configuredModel
      ? [configuredModel, ...GROQ_MODELS.filter((m) => m !== configuredModel)]
      : GROQ_MODELS;

    let lastError: unknown;

    for (const model of candidateModels) {
      try {
        return await createOpenAICompatibleChatCompletion({
          provider: this.name,
          apiKey: process.env.GROQ_API_KEY,
          baseURL: process.env.GROQ_BASE_URL ?? GROQ_BASE_URL,
          model,
          input,
        });
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError;
  }
}

