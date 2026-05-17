import type { AiProviderFailure, AiProviderName } from "./types";

export class AiProviderError extends Error {
  readonly provider: AiProviderName;
  readonly statusCode?: number;
  readonly retryable: boolean;

  constructor({
    provider,
    message,
    statusCode,
    retryable,
    cause,
  }: {
    provider: AiProviderName;
    message: string;
    statusCode?: number;
    retryable: boolean;
    cause?: unknown;
  }) {
    super(message, { cause });
    this.name = "AiProviderError";
    this.provider = provider;
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
}

export class AiProvidersUnavailableError extends Error {
  readonly failures: AiProviderFailure[];
  readonly statusCode = 502;

  constructor(failures: AiProviderFailure[]) {
    super("All AI providers failed. Please try again later.");
    this.name = "AiProvidersUnavailableError";
    this.failures = failures;
  }
}

export class AiValidationError extends Error {
  readonly statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = "AiValidationError";
  }
}

