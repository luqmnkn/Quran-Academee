// Support both Upstash Redis (Serverless-reliable) and in-memory Map (local fallback)

const rateLimitMap = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour (3600000 ms)
const WINDOW_SECONDS = 3600;
const MAX_REQUESTS = 5;

/**
 * Checks whether an IP address has exceeded the request threshold.
 * Uses Upstash Redis REST pipeline in production, falls back to an in-memory sliding window for local dev.
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  if (!ip) return false;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. Production: Upstash Redis REST Pipeline (1 Network Round-Trip)
  if (url && token) {
    try {
      const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      const key = `ratelimit:contact:${ip}`;

      // Pipeline execution: INCR + EXPIRE in a single HTTP request
      const response = await fetch(`${cleanUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['INCR', key],
          ['EXPIRE', key, WINDOW_SECONDS, 'NX'], // 'NX' sets expire only if key has no expiration
        ]),
        // Prevent Next.js Data Cache from caching rate limiter responses
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Upstash HTTP error status: ${response.status}`);
      }

      const results = await response.json();
      // Upstash returns array of responses: [{ result: count }, { result: status }]
      const count = results[0]?.result ?? 0;

      if (count > MAX_REQUESTS) {
        console.warn(`[Rate Limit] Exceeded for IP ${ip} (Count: ${count}) via Upstash Redis.`);
        return true;
      }

      return false;
    } catch (error) {
      console.error('[Rate Limit] Upstash Redis failed, falling back to local memory:', error);
    }
  }

  // 2. Fallback: In-memory sliding window (ideal for local development)
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out expired timestamps older than 1 hour
  const validTimestamps = timestamps.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    console.warn(`[Rate Limit] Memory-limit exceeded for IP ${ip} (Count: ${validTimestamps.length})`);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup: prevent memory leaks in long-running local environments
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}