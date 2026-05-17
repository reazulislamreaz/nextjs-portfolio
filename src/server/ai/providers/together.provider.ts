import { createOpenAICompatibleChatCompletion } from "./openai-compatible.provider";
import type { AiChatCompletionInput, AiProvider, AiProviderResponse } from "../types";

const TOGETHER_BASE_URL = "https://api.together.ai/v1";
const TOGETHER_MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo";

export class TogetherProvider implements AiProvider {
  readonly name = "together" as const;

  async chat(input: AiChatCompletionInput): Promise<AiProviderResponse> {
    return createOpenAICompatibleChatCompletion({
      provider: this.name,
      apiKey: process.env.TOGETHER_API_KEY,
      baseURL: process.env.TOGETHER_BASE_URL ?? TOGETHER_BASE_URL,
      model: process.env.TOGETHER_MODEL ?? TOGETHER_MODEL,
      input,
    });
  }
}

