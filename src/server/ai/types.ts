export type AiProviderName = "claude" | "groq" | "together";

export interface AiChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AiChatCompletionInput {
  messages: AiChatMessage[];
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface AiProviderResponse {
  provider: AiProviderName;
  content: string;
}

export interface AiProvider {
  readonly name: AiProviderName;
  chat(input: AiChatCompletionInput): Promise<AiProviderResponse>;
}

export interface AiProviderFailure {
  provider: AiProviderName;
  message: string;
  statusCode?: number;
  retryable: boolean;
}

