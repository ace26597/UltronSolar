import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export function createRateLimiter(requests: number, window: string) {
  return new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(requests, window),
  });
}

export async function checkRateLimit(limiter: Ratelimit, request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const { success } = await limiter.limit(ip);
  return success;
}
