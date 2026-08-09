import { NextRequest, NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rateLimiter';
import { sendEmail } from '@/lib/resend';
import { getSheetsClient } from '@/lib/googleSheets';
import { generateAdminRecitationEmailHtml } from '@/utils/emailTemplates';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'QA-Admin-Secure-9988';

interface RecitationData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  notes?: string;
  timestamp: string;
}

// Upstash Redis helper functions using fetch
async function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  return {
    run: async (command: any[]) => {
      try {
        const response = await fetch(cleanUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(command),
        });
        if (!response.ok) {
          throw new Error(`Redis error status: ${response.status}`);
        }
        const data = await response.json();
        return data.result;
      } catch (err) {
        console.error('[Redis Client Error]:', err);
        return null;
      }
    },
  };
}

// Memory fallback database for local dev without Redis
const memoryRecitations = new Map<string, any>();
const memoryRecitationIds: string[] = [];

// Helper to append recitation logs to Google Sheets
async function appendRecitationToSheet(data: RecitationData) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) return;

  try {
    const sheets = getSheetsClient();
    const sheetTitle = 'Quran Academee Recitations';

    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (s: any) => s.properties?.title === sheetTitle
    );

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: sheetTitle },
              },
            },
          ],
        },
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetTitle}!A1:G1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            ['Timestamp', 'Recitation ID', 'Full Name', 'Email', 'Phone', 'Country', 'Student Notes'],
          ],
        },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:G`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            data.timestamp,
            data.id,
            data.fullName,
            data.email,
            data.phone,
            data.country,
            data.notes || '',
          ],
        ],
      },
    });
  } catch (error) {
    console.error('[Sheets Recitation Log Error] Non-blocking sheets logging failed:', error);
  }
}

// CORS Support Header Generator
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
  };
}

// OPTIONS ROUTE (Handle CORS Preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

// --- GET ROUTE (List all recitations for Admin) ---
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const urlToken = req.nextUrl.searchParams.get('token');
  const providedToken = authHeader ? authHeader.replace('Bearer ', '').trim() : urlToken;

  if (providedToken !== ADMIN_TOKEN) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Invalid Admin Token.' },
      { status: 401, headers: getCorsHeaders() }
    );
  }

  try {
    const redis = await getRedisClient();
    let recitations: any[] = [];

    if (redis) {
      const ids = await redis.run(['LRANGE', 'recitation_ids', '0', '-1']);
      if (ids && Array.isArray(ids)) {
        const fetchPromises = ids.map(async (id: string) => {
          const raw = await redis.run(['GET', `recitation:${id}`]);
          if (raw) {
            try {
              return JSON.parse(raw);
            } catch {
              return null;
            }
          }
          return null;
        });
        recitations = (await Promise.all(fetchPromises)).filter(Boolean);
      }
    } else {
      recitations = memoryRecitationIds
        .map((id) => memoryRecitations.get(id))
        .filter(Boolean);
    }

    recitations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(
      { success: true, recitations },
      { status: 200, headers: getCorsHeaders() }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch recitations', error: err.message },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}

// --- POST ROUTE (Submit or Provide Feedback) ---
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON payload.' },
      { status: 400, headers: getCorsHeaders() }
    );
  }

  const { action } = body || {};

  // Action A: Submit new recitation
  if (action === 'submit') {
    const { fullName, email, phone, country, audio, notes } = body;

    if (!fullName || !email || !phone || !audio) {
      return NextResponse.json(
        { success: false, message: 'Missing required submission fields (Name, Email, Phone, Audio).' },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const isLimited = await isRateLimited(ip);
    if (isLimited) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers: getCorsHeaders() }
      );
    }

    const id = 'rec_' + Math.random().toString(36).substring(2, 11);
    const timestamp = new Date().toISOString();

    const recitationItem = {
      id,
      fullName,
      email,
      phone,
      country: country || 'Unspecified',
      audio,
      notes: notes || '',
      status: 'pending',
      recommendation: '',
      feedbackText: '',
      timestamp,
    };

    try {
      const redis = await getRedisClient();
      if (redis) {
        await redis.run(['SET', `recitation:${id}`, JSON.stringify(recitationItem)]);
        await redis.run(['LPUSH', 'recitation_ids', id]);
      } else {
        memoryRecitations.set(id, recitationItem);
        memoryRecitationIds.unshift(id);
      }

      // Non-blocking operations (Google Sheets & Admin Notification Email)
      const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

      appendRecitationToSheet({
        id,
        fullName,
        email,
        phone,
        country: country || 'Unspecified',
        notes,
        timestamp: formattedTimestamp,
      }).catch((err) => console.error('Background sheets log failed:', err));

      (async () => {
        try {
          const adminEmail = process.env.ADMIN_EMAIL || 'contact@quranacademee.com';
          const adminHtml = generateAdminRecitationEmailHtml({
            id,
            fullName,
            email,
            phone,
            country: country || 'Unspecified',
            notes,
            timestamp: formattedTimestamp,
          });

          await sendEmail({
            to: adminEmail,
            subject: `New Recitation Evaluation Submission: ${fullName}`,
            html: adminHtml,
          });
        } catch (emailErr) {
          console.error('[Email Dispatch Error] Non-blocking admin notification email failed:', emailErr);
        }
      })();

      return NextResponse.json(
        {
          success: true,
          message: 'Your recitation was securely uploaded. Our scholars will evaluate and respond within 24 hours!',
          recitationId: id,
        },
        { status: 200, headers: getCorsHeaders() }
      );
    } catch (err: any) {
      return NextResponse.json(
        { success: false, message: 'Failed to submit recitation.', error: err.message },
        { status: 500, headers: getCorsHeaders() }
      );
    }
  }

  // Action B: Submit Expert Feedback
  if (action === 'feedback') {
    const { recitationId, recommendedCourse, feedbackText, token } = body;

    if (token !== ADMIN_TOKEN) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized token.' },
        { status: 401, headers: getCorsHeaders() }
      );
    }

    if (!recitationId || !recommendedCourse || !feedbackText) {
      return NextResponse.json(
        { success: false, message: 'Missing feedback parameters.' },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    try {
      const redis = await getRedisClient();
      let recitation: any = null;

      if (redis) {
        const raw = await redis.run(['GET', `recitation:${recitationId}`]);
        if (raw) recitation = JSON.parse(raw);
      } else {
        recitation = memoryRecitations.get(recitationId);
      }

      if (!recitation) {
        return NextResponse.json(
          { success: false, message: 'Recitation record not found.' },
          { status: 404, headers: getCorsHeaders() }
        );
      }

      recitation.status = 'reviewed';
      recitation.recommendation = recommendedCourse;
      recitation.feedbackText = feedbackText;
      recitation.feedbackTimestamp = new Date().toISOString();

      if (redis) {
        await redis.run(['SET', `recitation:${recitationId}`, JSON.stringify(recitation)]);
      } else {
        memoryRecitations.set(recitationId, recitation);
      }

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Your Recitation Evaluation - Quran Academee</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
            .card { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .header { background: #0B3951; color: #ffffff; padding: 32px 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
            .content { padding: 32px 24px; line-height: 1.6; }
            .highlight-box { background: #F0F9FF; border-left: 4px solid #1C8DC8; padding: 20px; border-radius: 0 12px 12px 0; margin: 24px 0; }
            .highlight-title { font-weight: 800; color: #0B3951; margin-bottom: 6px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
            .feedback-text { font-style: italic; color: #475569; background: #f8fafc; border: 1px dashed #cbd5e1; padding: 16px; border-radius: 8px; margin-top: 10px; }
            .btn { display: inline-block; background-color: #1C8DC8; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 8px; text-align: center; margin-top: 20px; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>Quran Academee</h1>
              <div style="font-size: 13px; color: #E0F2FE; margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em;">Expert Recitation Evaluation</div>
            </div>
            <div class="content">
              <p>Assalamu Alaikum <strong>${recitation.fullName}</strong>,</p>
              <p>Our expert Quranic scholars have listened to the recitation audio you submitted. We are truly pleased with your initiative to evaluate your level and pursue beautiful recitation.</p>
              
              <div class="highlight-box">
                <div class="highlight-title">Recommended Program</div>
                <div style="font-size: 18px; font-weight: 800; color: #1C8DC8;">${recommendedCourse}</div>
              </div>

              <div class="highlight-box" style="background: #FFFBEB; border-left-color: #D97706;">
                <div class="highlight-title" style="color: #92400E;">Scholar's Assessment & Tips</div>
                <div class="feedback-text">${feedbackText.replace(/\n/g, '<br />')}</div>
              </div>

              <p>To begin studying under the guidance of our certified live 1-on-1 teachers, click the button below to secure your 3-day risk-free trial in the recommended course:</p>

              <div style="text-align: center;">
                <a href="https://wa.me/923702680670?text=I%20received%20my%20recitation%20evaluation%20recommending%20${encodeURIComponent(recommendedCourse)}" class="btn" target="_blank">Book Trial Class on WhatsApp</a>
              </div>

              <p style="margin-top: 30px;">May Allah bless you on this beautiful spiritual path.</p>
              
              <p style="margin-top: 20px; font-size: 13px; color: #64748b;">
                Warm regards,<br />
                <strong>The Scholars Panel</strong><br />
                Quran Academee Team
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Quran Academee • Recite with Beauty • contact@quranacademee.com</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        to: recitation.email,
        subject: 'Your Quran Recitation Evaluation Report — Quran Academee',
        html: emailHtml,
      });

      return NextResponse.json(
        { success: true, message: 'Feedback logged successfully and sent to student.' },
        { status: 200, headers: getCorsHeaders() }
      );
    } catch (err: any) {
      return NextResponse.json(
        { success: false, message: 'Failed to record feedback.', error: err.message },
        { status: 500, headers: getCorsHeaders() }
      );
    }
  }

  return NextResponse.json(
    { success: false, message: 'Unknown action.' },
    { status: 400, headers: getCorsHeaders() }
  );
}