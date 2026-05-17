import { AiProvidersUnavailableError, AiValidationError } from "../errors";
import { aiChatService } from "../services/ai-chat.service";
import type { AiChatMessage } from "../types";

const MAX_MESSAGE_LENGTH = 4000;

export interface AiChatControllerRequest {
  message?: unknown;
  messages?: unknown;
}

export interface AiChatControllerResponse {
  success: true;
  provider: string;
  data: string;
}

export interface AiChatControllerErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

function normalizeMessages(body: AiChatControllerRequest): AiChatMessage[] {
  if (typeof body.message === "string") {
    const message = body.message.trim();
    if (!message) throw new AiValidationError("Message is required.");
    if (message.length > MAX_MESSAGE_LENGTH) {
      throw new AiValidationError("Message is too long.");
    }
    return [{ role: "user", content: message }];
  }

  if (Array.isArray(body.messages)) {
    const messages = body.messages
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const record = item as Record<string, unknown>;
        const role =
          record.role === "system" || record.role === "assistant" || record.role === "user"
            ? record.role
            : "user";
        const content = String(record.content ?? "").trim().slice(0, MAX_MESSAGE_LENGTH);
        if (!content) return null;
        return { role, content };
      })
      .filter((item): item is AiChatMessage => item !== null);

    if (!messages.length) throw new AiValidationError("At least one message is required.");
    return messages;
  }

  throw new AiValidationError("Message is required.");
}

export class AiChatController {
  async chat(body: AiChatControllerRequest): Promise<AiChatControllerResponse> {
    const messages = normalizeMessages(body);
    const response = await aiChatService.chat({ messages });

    return {
      success: true,
      provider: response.provider,
      data: response.content,
    };
  }

  toErrorResponse(error: unknown): {
    status: number;
    body: AiChatControllerErrorResponse;
  } {
    if (error instanceof AiValidationError) {
      return {
        status: error.statusCode,
        body: { success: false, error: error.message },
      };
    }

    if (error instanceof AiProvidersUnavailableError) {
      return {
        status: error.statusCode,
        body: {
          success: false,
          error: error.message,
          details: error.failures,
        },
      };
    }

    return {
      status: 500,
      body: { success: false, error: "Unexpected AI service error." },
    };
  }
}

export const aiChatController = new AiChatController();

