import "server-only";

/**
 * Best-effort in-memory rate limit (per server instance). Adequate as a light
 * spam brake; use a shared store (e.g. Upstash/Redis) if you need strict limits
 * across serverless instances.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}
