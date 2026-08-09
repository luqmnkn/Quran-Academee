import { NextRequest, NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rateLimiter';
import { sendEmail } from '@/lib/resend';
import { appendLeadToSheet } from '@/lib/googleSheets';
import { contactSchema } from '@/lib/validations/contact';

export const maxDuration = 15;

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

// POST Route to receive contact forms/leads
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

  // Parse and validate with Zod contactSchema
  const parseResult = contactSchema.safeParse(body);
  if (!parseResult.success) {
    const errorDetails = parseResult.error.issues.map((e) => e.message).join(', ');
    return NextResponse.json(
      { success: false, message: `Validation failed: ${errorDetails}` },
      { status: 400, headers: getCorsHeaders() }
    );
  }

  const data = parseResult.data;

  // Rate Limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const isLimited = await isRateLimited(ip);
  if (isLimited) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers: getCorsHeaders() }
    );
  }

  // Drop request silently if honeypot fields are filled (extra bot defense)
  if (data.website || data.botField) {
    return NextResponse.json(
      { success: true, message: 'Inquiry processed successfully.' },
      { status: 200, headers: getCorsHeaders() }
    );
  }

  try {
    // 1. Log lead to Google Sheets
    await appendLeadToSheet({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      courseInterest: data.courseInterest,
      message: data.message,
    });

    // 2. Dispatch administrative notification email
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@quranacademee.com';
    const timestamp = `${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC`;
    
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Trial Class Lead Inquiry - Quran Academee</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 20px;
          }
          .card {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          }
          .header {
            background: #0B3951;
            color: #ffffff;
            padding: 28px 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          .content {
            padding: 32px 24px;
            line-height: 1.6;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
          }
          .details-table th, .details-table td {
            padding: 14px;
            border-bottom: 1px solid #e2e8f0;
            text-align: left;
            font-size: 13px;
          }
          .details-table th {
            font-weight: 700;
            color: #475569;
            width: 30%;
            background-color: #f8fafc;
          }
          .details-table td {
            color: #0b3951;
            font-weight: 600;
          }
          .notes-box {
            background: #ECFDF5;
            border-left: 4px solid #059669;
            padding: 16px;
            border-radius: 0 8px 8px 0;
            margin: 24px 0;
            font-size: 13px;
            color: #065f46;
          }
          .footer {
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>New Free Trial Inquiry</h1>
            <div style="font-size: 12px; color: #E0F2FE; margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Quran Academee Lead Board</div>
          </div>
          <div class="content">
            <p style="font-size: 14px; margin-top: 0;">Assalamu Alaikum,</p>
            <p style="font-size: 14px; color: #475569;">A new user has submitted the inquiry form requesting a 3-Day Free Trial lesson. The details are below:</p>
            
            <table class="details-table">
              <tr>
                <th>Student Name</th>
                <td>${data.fullName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td><a href="mailto:${data.email}" style="color: #1C8DC8; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <th>Phone (WhatsApp)</th>
                <td><a href="tel:${data.phone}" style="color: #1C8DC8; text-decoration: none;">${data.phone}</a></td>
              </tr>
              <tr>
                <th>Country</th>
                <td>${data.country}</td>
              </tr>
              <tr>
                <th>Selected Course</th>
                <td style="color: #1C8DC8; text-transform: capitalize;">${data.courseInterest.replace(/-/g, ' ')}</td>
              </tr>
              <tr>
                <th>Submitted At</th>
                <td>${timestamp}</td>
              </tr>
            </table>
            
            ${data.message ? `
              <div class="notes-box">
                <strong style="display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Student Message / Schedule Bounds:</strong>
                "${data.message}"
              </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Quran Academee • Lead Management Desk</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `New Lead Request: ${data.fullName} (${data.courseInterest})`,
      html: adminEmailHtml,
    });

    return NextResponse.json(
      { success: true, message: 'Your lead request was securely processed.' },
      { status: 200, headers: getCorsHeaders() }
    );
  } catch (err: any) {
    console.error('[API Contact Form Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to process inquiry submission.', error: err.message },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}
