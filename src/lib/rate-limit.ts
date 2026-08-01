type Bucket = { count: number; resetAt: number };

const globalForLimit = globalThis as typeof globalThis & { __hbkBuckets?: Map<string, Bucket> };
const buckets = globalForLimit.__hbkBuckets ?? new Map<string, Bucket>();
globalForLimit.__hbkBuckets = buckets;

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}
