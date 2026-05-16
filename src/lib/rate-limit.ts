interface RateLimitEntry {
  count: number;
  reset: number;
}

const hits = new Map<string, RateLimitEntry>();

/** In-memory limiter — suitable for a portfolio; use Redis for multi-instance production. */
export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60 * 60 * 1000,
): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((entry.reset - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true };
}
