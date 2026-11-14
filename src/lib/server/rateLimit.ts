/**
 * Per-IP rate limiting for the public API routes.
 *
 * BEST-EFFORT ONLY. The counters live in the memory of one serverless
 * instance. Vercel runs several instances side by side and throws them away
 * when idle, so a determined caller gets a fresh allowance on every new or
 * parallel instance. This slows down casual abuse and accidental loops; it is
 * not a spending guarantee.
 *
 * The durable limit belongs in Vercel Firewall (Project -> Firewall -> add a
 * rate-limit rule on /api/* and /python/*), which counts at the edge across
 * all instances, together with monthly budget caps at the model providers.
 * Both are dashboard settings the site owner has to configure; nothing in
 * this file can replace them.
 *
 * Limits are deliberately loose: Indian mobile carriers put many subscribers
 * behind one public IP, so a tight per-IP limit would block real customers.
 */

import { NextResponse } from 'next/server';

export interface RateLimitRule {
    /** Requests allowed per window, per IP. */
    limit: number;
    /** Window length in milliseconds. */
    windowMs: number;
}

interface Bucket {
    count: number;
    resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Upper bound on tracked keys so the map itself cannot be used to exhaust memory. */
const MAX_BUCKETS = 5000;

function prune(now: number): void {
    buckets.forEach((bucket, key) => {
        if (bucket.resetAt <= now) buckets.delete(key);
    });
    if (buckets.size >= MAX_BUCKETS) {
        // Still full of live entries: drop the oldest ones (Map keeps insertion order).
        const excess = buckets.size - MAX_BUCKETS + 1;
        let dropped = 0;
        const keys = Array.from(buckets.keys());
        for (const key of keys) {
            if (dropped >= excess) break;
            buckets.delete(key);
            dropped++;
        }
    }
}

/**
 * The caller's IP as reported by the platform. Vercel sets these headers
 * itself and overwrites anything the client sends, so they cannot be spoofed
 * there. Off Vercel (local `next start`) they are absent and every caller
 * shares one bucket.
 */
export function clientIp(req: Request): string {
    const headers = req.headers;
    const forwarded =
        headers.get('x-vercel-forwarded-for') ||
        headers.get('x-real-ip') ||
        headers.get('x-forwarded-for') ||
        '';
    const first = forwarded.split(',')[0].trim();
    return first ? first.slice(0, 64) : 'unknown';
}

/**
 * Count one hit against `scope:key`. Fixed window: the first hit opens a
 * window, the counter resets when it closes.
 */
export function takeToken(
    scope: string,
    key: string,
    rule: RateLimitRule
): { allowed: boolean; retryAfterSeconds: number } {
    const now = Date.now();
    const id = `${scope}:${key}`;
    let bucket = buckets.get(id);

    if (!bucket || bucket.resetAt <= now) {
        if (buckets.size >= MAX_BUCKETS) prune(now);
        bucket = { count: 0, resetAt: now + rule.windowMs };
        buckets.set(id, bucket);
    }

    bucket.count++;
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    return { allowed: bucket.count <= rule.limit, retryAfterSeconds };
}

/**
 * Use at the top of a route handler:
 *
 *   const limited = rateLimit(request, 'chat', { limit: 30, windowMs: 5 * 60_000 });
 *   if (limited) return limited;
 *
 * Returns a ready 429 response when the caller is over the limit, otherwise null.
 * The body carries both `success: false` and `error` so every existing
 * frontend caller can show the message.
 */
export function rateLimit(req: Request, scope: string, rule: RateLimitRule): NextResponse | null {
    const { allowed, retryAfterSeconds } = takeToken(scope, clientIp(req), rule);
    if (allowed) return null;

    return NextResponse.json(
        {
            success: false,
            error: 'Too many requests. Please wait a few minutes and try again.',
        },
        {
            status: 429,
            headers: { 'Retry-After': String(retryAfterSeconds) },
        }
    );
}
