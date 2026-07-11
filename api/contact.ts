import { contactSchema } from '../lib/validation.js';
import { isRateLimited } from '../lib/rateLimiter.js';
import { appendLeadToSheet } from '../lib/googleSheets.js';
import { sendEmail } from '../lib/resend.js';
import { generateAdminEmailHtml, generateStudentEmailHtml } from '../utils/emailTemplates.js';

export default async function handler(req: any, res: any) {
  // 1. Enable CORS support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Use POST.',
    });
  }

  // 2. Defensive Request Size Check (Anti-DoS)
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 20000) { // 20KB is a very generous ceiling for any text-based contact form
    console.warn(`[Security Alert] Rejected oversized payload of ${contentLength} bytes.`);
    return res.status(413).json({
      success: false,
      message: 'Payload too large. Contact submission must not exceed 20KB.',
    });
  }

  try {
    // 3. Identify client IP for Rate Limiting
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
               (req.headers['x-real-ip'] as string) || 
               req.socket.remoteAddress || 
               '127.0.0.1';

    // Apply Rate Limiter (Max 5 requests per IP per hour)
    const isLimited = await isRateLimited(ip);
    if (isLimited) {
      return res.status(429).json({
        success: false,
        message: 'Too many inquiry submissions. Please try again after an hour to protect against spam.',
      });
    }

    // Parse payload (Caters for stringified or pre-parsed bodies)
    let body = req.body;
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch (jsonErr) {
        return res.status(400).json({
          success: false,
          message: 'Malformed JSON payload.',
        });
      }
    }

    // 4. Spam Protection (Honeypot)
    const { website, botField } = body || {};
    if (website || botField) {
      console.warn(`[Security Honeypot] Bot activity blocked silently from IP: ${ip}`);
      return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully.',
      });
    }

    // 5. Input Validation with Zod
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });

      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the fields.',
        errors: fieldErrors,
      });
    }

    const { fullName, email, phone, country, courseInterest, message } = validation.data;
    console.log(`[Lead Process] Processing submission for: ${fullName.slice(0, 3)}... (IP: ${ip})`);

    // 6. Google Sheets logging
    let sheetsSuccess = true;
    try {
      await appendLeadToSheet({
        fullName,
        email,
        phone,
        country,
        courseInterest,
        message,
      });
    } catch (sheetErr: any) {
      console.error('[Database Error] Non-blocking Google Sheets logging failed:', sheetErr.message || sheetErr);
      // We continue processing emails even if sheets fail, but track the state
      sheetsSuccess = false;
    }

    // 7. Resend Email Dispatch
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@quranacademee.com';
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

    // Generate Admin notification HTML
    const adminHtml = generateAdminEmailHtml({
      fullName,
      email,
      phone,
      country,
      courseInterest,
      message,
      timestamp,
    });

    // Generate Student welcome HTML
    const studentHtml = generateStudentEmailHtml({
      fullName,
      courseInterest,
    });

    // Execute Email dispatches concurrently for high performance
    await Promise.all([
      // Admin notification
      sendEmail({
        to: adminEmail,
        subject: `New Lead: ${fullName}`,
        html: adminHtml,
      }),
      // Student confirmation
      sendEmail({
        to: email,
        subject: "We've received your request — Quran Academee",
        html: studentHtml,
      }),
    ]);

    // 8. Complete Success Response
    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully. Check your email for confirmation!',
      sheetsSynchronized: sheetsSuccess,
    });

  } catch (error: any) {
    console.error('[Internal Error] Contact API failure:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your inquiry.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
