import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not defined');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Executes a function with a specified number of retries and exponential backoff.
 */
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`[Resend SDK] Transient failure detected. Retrying in ${delay}ms... (${retries} retries remaining)`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const client = getResendClient();
  const fromEmail = process.env.RESEND_FROM || 'contact@quranacademee.com';

  return retryWithBackoff(async () => {
    const { data, error } = await client.emails.send({
      from: `Quran Academee <${fromEmail}>`,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('[Resend Error Details]:', error);
      throw new Error(`Resend email dispatch error: ${error.message}`);
    }

    return data;
  });
}
