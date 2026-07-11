import { isRateLimited } from '../lib/rateLimiter.js';
import { sendEmail } from '../lib/resend.js';
import { appendLeadToSheet, getSheetsClient } from '../lib/googleSheets.js';

// The secure admin access token
const ADMIN_TOKEN = 'QA-Admin-Secure-9988';

// Upstash Redis helper functions using fetch
async function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return null;
  }
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
    }
  };
}

// Memory fallback database for local dev without Redis
const memoryRecitations = new Map<string, any>();
const memoryRecitationIds: string[] = [];

// Helper to append recitation logs to Google Sheets
async function appendRecitationToSheet(data: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  notes?: string;
  timestamp: string;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) return;

  try {
    const sheets = getSheetsClient();
    const sheetTitle = 'Quran Academee Recitations';

    // Check if the recitation tab exists
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

      // Write headers
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

    // Append the row
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

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const redis = await getRedisClient();

  // --- GET ROUTE (List all recitations for Admin) ---
  if (req.method === 'GET') {
    // Check Auth Token
    const authHeader = req.headers.authorization;
    const urlToken = req.query?.token;
    const providedToken = authHeader ? authHeader.replace('Bearer ', '').trim() : urlToken;

    if (providedToken !== ADMIN_TOKEN) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Invalid Admin Token.' });
    }

    try {
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
        // Local memory fallback
        recitations = memoryRecitationIds
          .map((id) => memoryRecitations.get(id))
          .filter(Boolean);
      }

      // Sort by timestamp descending (newest first)
      recitations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      return res.status(200).json({ success: true, recitations });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Failed to fetch recitations', error: err.message });
    }
  }

  // --- POST ROUTE (Submit or Provide Feedback) ---
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch {
        return res.status(400).json({ success: false, message: 'Invalid JSON payload.' });
      }
    }

    const { action } = body || {};

    // Action A: Submit new recitation
    if (action === 'submit') {
      const { fullName, email, phone, country, audio, notes } = body;

      if (!fullName || !email || !phone || !audio) {
        return res.status(400).json({ success: false, message: 'Missing required submission fields (Name, Email, Phone, Audio).' });
      }

      // Rate limit based on IP
      const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
                 req.socket.remoteAddress || '127.0.0.1';
      const isLimited = await isRateLimited(ip);
      if (isLimited) {
        return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
      }

      const id = 'rec_' + Math.random().toString(36).substring(2, 11);
      const timestamp = new Date().toISOString();

      const recitationItem = {
        id,
        fullName,
        email,
        phone,
        country: country || 'Unspecified',
        audio, // base64 encoded audio string
        notes: notes || '',
        status: 'pending',
        recommendation: '',
        feedbackText: '',
        timestamp,
      };

      try {
        if (redis) {
          // Save actual item
          await redis.run(['SET', `recitation:${id}`, JSON.stringify(recitationItem)]);
          // Push to index list
          await redis.run(['LPUSH', 'recitation_ids', id]);
        } else {
          // Memory fallback
          memoryRecitations.set(id, recitationItem);
          memoryRecitationIds.unshift(id);
        }

        // Run Google Sheets append in background (non-blocking)
        appendRecitationToSheet({
          id,
          fullName,
          email,
          phone,
          country: country || 'Unspecified',
          notes,
          timestamp: new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC',
        }).catch(err => console.error('Background sheets log failed:', err));

        return res.status(200).json({
          success: true,
          message: 'Your recitation was securely uploaded. Our scholars will evaluate and respond within 24 hours!',
          recitationId: id
        });
      } catch (err: any) {
        return res.status(500).json({ success: false, message: 'Failed to submit recitation.', error: err.message });
      }
    }

    // Action B: Submit Expert Feedback
    if (action === 'feedback') {
      const { recitationId, recommendedCourse, feedbackText, token } = body;

      if (token !== ADMIN_TOKEN) {
        return res.status(401).json({ success: false, message: 'Unauthorized token.' });
      }

      if (!recitationId || !recommendedCourse || !feedbackText) {
        return res.status(400).json({ success: false, message: 'Missing feedback parameters.' });
      }

      try {
        let recitation: any = null;

        if (redis) {
          const raw = await redis.run(['GET', `recitation:${recitationId}`]);
          if (raw) {
            recitation = JSON.parse(raw);
          }
        } else {
          recitation = memoryRecitations.get(recitationId);
        }

        if (!recitation) {
          return res.status(404).json({ success: false, message: 'Recitation record not found.' });
        }

        // Update item values
        recitation.status = 'reviewed';
        recitation.recommendation = recommendedCourse;
        recitation.feedbackText = feedbackText;
        recitation.feedbackTimestamp = new Date().toISOString();

        if (redis) {
          await redis.run(['SET', `recitation:${recitationId}`, JSON.stringify(recitation)]);
        } else {
          memoryRecitations.set(recitationId, recitation);
        }

        // Send Email to student with recommendation details
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

        return res.status(200).json({ success: true, message: 'Feedback logged successfully and sent to student.' });
      } catch (err: any) {
        return res.status(500).json({ success: false, message: 'Failed to record feedback.', error: err.message });
      }
    }

    return res.status(400).json({ success: false, message: 'Unknown action.' });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
