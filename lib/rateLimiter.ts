// sliding window rate limiter for Vercel Serverless Functions
// Support both Upstash Redis (Serverless-reliable) and in-memory Map (local fallback)

const rateLimitMap = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

export async function isRateLimited(ip: string): Promise<boolean> {
  if (!ip) return false;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. If Upstash Redis is configured, use standard fast REST requests
  if (url && token) {
    try {
      const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      const key = `ratelimit:contact:${ip}`;

      // Call Upstash Redis REST API to INCR the key
      const response = await fetch(`${cleanUrl}/incr/${key}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Upstash response code: ${response.status}`);
      }

      const result = await response.json();
      const count = result.result; // Upstash returns `{ result: number }`

      // If it is a brand-new key (count === 1), set expiration (1 hour = 3600 seconds)
      if (count === 1) {
        await fetch(`${cleanUrl}/expire/${key}/3600`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (count > MAX_REQUESTS) {
        console.warn(`[Rate Limit] Limit exceeded for IP ${ip} (Count: ${count}) via Upstash Redis.`);
        return true; // Rate limited
      }

      return false; // Not rate limited
    } catch (error) {
      console.error('[Rate Limit] Upstash Redis failed, falling back to memory:', error);
    }
  }

  // 2. Fallback: Local memory sliding window (ephemeral but safe for dev)
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out expired timestamps (older than 1 hour)
  const validTimestamps = timestamps.filter(timestamp => now - timestamp < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    console.warn(`[Rate Limit] Memory-limit exceeded for IP ${ip} (Count: ${validTimestamps.length})`);
    return true; // Is rate limited
  }

  // Record this request
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  return false; // Not rate limited
}
