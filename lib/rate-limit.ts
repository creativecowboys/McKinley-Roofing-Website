/**
 * Smallest useful rate limit for the lead form: a fixed window per IP, held in
 * the instance's memory.
 *
 * Honest about what this is worth. Vercel runs several instances and recycles
 * them, so a determined flood spread across IPs will not be stopped by this and
 * the counter resets on a cold start. What it does catch cheaply is the common
 * case — one script hammering one endpoint from one address inside a few
 * minutes — without adding a paid service or a database.
 *
 * Going over the limit does NOT reject the request. The caller routes the
 * submission to the review mailbox instead, so a family behind one office IP
 * sending a third inquiry is never turned away or thrown out.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_IN_WINDOW = 5;
/** Hard cap on tracked addresses, so a spoofed-IP flood can't grow the map. */
const MAX_KEYS = 5000;

type Bucket = { count: number; resetAt: number };

const hits = new Map<string, Bucket>();

/**
 * Count this submission. Returns true when the address is over its burst.
 * An unknown IP is never limited — we would be limiting everyone at once.
 */
export function overRateLimit(ip: string | null | undefined, now = Date.now()): boolean {
  if (!ip) return false;

  if (hits.size > MAX_KEYS) {
    for (const [key, bucket] of hits) if (bucket.resetAt <= now) hits.delete(key);
    if (hits.size > MAX_KEYS) hits.clear();
  }

  const bucket = hits.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_IN_WINDOW;
}

/** Caller's IP from the proxy headers Vercel sets. */
export function clientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') || null;
}

/** Test seam: forget every counter. */
export function resetRateLimit(): void {
  hits.clear();
}

export const RATE_LIMIT = { WINDOW_MS, MAX_IN_WINDOW };
