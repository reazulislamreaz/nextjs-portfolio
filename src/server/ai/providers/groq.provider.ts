import { createOpenAICompatibleChatCompletion } from "./openai-compatible.provider";
import type { AiChatCompletionInput, AiProvider, AiProviderResponse } from "../types";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export class GroqProvider implements AiProvider {
  readonly name = "groq" as const;

  async chat(input: AiChatCompletionInput): Promise<AiProviderResponse> {
    return createOpenAICompatibleChatCompletion({
      provider: this.name,
      apiKey: process.env.GROQ_API_KEY,
      baseURL: process.env.GROQ_BASE_URL ?? GROQ_BASE_URL,
      model: process.env.GROQ_MODEL ?? GROQ_MODEL,
      input,
    });
  }
}

