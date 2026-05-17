export const aiLogger = {
  info(message: string, meta?: Record<string, unknown>) {
    console.info(`[ai] ${message}`, meta ?? {});
  },
  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(`[ai] ${message}`, meta ?? {});
  },
  error(message: string, meta?: Record<string, unknown>) {
    console.error(`[ai] ${message}`, meta ?? {});
  },
};

