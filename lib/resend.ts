import { Resend } from 'resend';

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

let resendClient: Resend | null = null;

/**
 * Returns a cached Resend SDK client instance.
 */
export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        '[Resend Auth Error]: RESEND_API_KEY environment variable is not defined.'
      );
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Executes an async function with exponential backoff on transient errors.
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(
      `[Resend SDK] Transient email dispatch failure. Retrying in ${delay}ms... (${retries} attempts left)`
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}

/**
 * Dispatches an HTML email via the Resend API with automatic retry fallback.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const client = getResendClient();
  const fromEmail = process.env.RESEND_FROM || 'contact@quranacademee.com';

  return retryWithBackoff(async () => {
    const { data, error } = await client.emails.send({
      from: `Quran Academee <${fromEmail}>`,
      to: [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error('[Resend Dispatch Error]:', error);
      throw new Error(`Resend email dispatch error: ${error.message}`);
    }

    return data;
  });
}