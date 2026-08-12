interface AdminEmailParams {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  notes?: string;
  timestamp: string;
}

/**
 * Generates premium HTML notification email for administrative scholars
 * containing the coordinates of the new student and evaluation details.
 */
export function generateAdminRecitationEmailHtml({
  id,
  fullName,
  email,
  phone,
  country,
  notes,
  timestamp,
}: AdminEmailParams): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Recitation Submission - Quran Academee</title>
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
          background: #FFFBEB;
          border-left: 4px solid #D97706;
          padding: 16px;
          border-radius: 0 8px 8px 0;
          margin: 24px 0;
          font-size: 13px;
          color: #92400E;
        }
        .footer {
          background: #f8fafc;
          padding: 20px;
          text-align: center;
          font-size: 11px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }
        .btn {
          display: inline-block;
          background-color: #1C8DC8;
          color: #ffffff !important;
          font-weight: 700;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          text-align: center;
          margin: 10px 0 20px 0;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>New Recitation Submitted</h1>
          <div style="font-size: 12px; color: #E0F2FE; margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Quran Academee Scholar Panel</div>
        </div>
        <div class="content">
          <p style="font-size: 14px; margin-top: 0;">Assalamu Alaikum,</p>
          <p style="font-size: 14px; color: #475569;">A new student has submitted their audio recitation for evaluation. Please review their submission in the admin dashboard.</p>
          
          <table class="details-table">
            <tr>
              <th>Recitation ID</th>
              <td><code style="font-family: monospace; font-size: 12px; color: #e11d48;">${id}</code></td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td>${fullName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td><a href="mailto:${email}" style="color: #1C8DC8; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <th>Phone</th>
              <td><a href="tel:${phone}" style="color: #1C8DC8; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <th>Country</th>
              <td>${country}</td>
            </tr>
            <tr>
              <th>Submitted At</th>
              <td>${timestamp}</td>
            </tr>
          </table>
          
          ${notes ? `
            <div class="notes-box">
              <strong style="display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Student's Notes / Experience:</strong>
              "${notes}"
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 28px;">
            <a href="https://quranacademee.com/admin" class="btn" target="_blank">Open Administrative Evaluation Board</a>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Quran Academee • Scholar Notification System</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export interface UserConfirmationEmailParams {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  message?: string;
}

/**
 * Generates website-theme-friendly HTML confirmation email for the student/parent
 * who requested a 3-Day Free Trial class.
 */
export function generateUserConfirmationEmailHtml({
  fullName,
  email,
  phone,
  country,
  courseInterest,
  message,
}: UserConfirmationEmailParams): string {
  const formattedCourse = courseInterest.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your 3-Day Free Trial Request - Quran Academee</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f1f5f9;
          color: #0f172a;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          width: 100%;
          background-color: #f1f5f9;
          padding: 40px 16px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(11, 57, 81, 0.08);
        }
        .header {
          background: linear-gradient(135deg, #0B3951 0%, #146299 100%);
          color: #ffffff;
          padding: 36px 24px;
          text-align: center;
        }
        .logo {
          max-width: 180px;
          height: auto;
          margin-bottom: 12px;
        }
        .subtitle {
          font-size: 11px;
          color: #3D8DC3;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 800;
          margin-top: 4px;
        }
        .header-title {
          font-size: 22px;
          font-weight: 900;
          margin: 12px 0 0 0;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .content {
          padding: 36px 28px;
          line-height: 1.6;
          color: #334155;
          font-size: 14px;
        }
        .greeting {
          font-size: 17px;
          font-weight: 800;
          color: #0B3951;
          margin-bottom: 12px;
        }
        .intro-text {
          font-size: 14px;
          color: #475569;
          margin-bottom: 24px;
        }
        .summary-card {
          background: #F0F9FF;
          border: 1px solid #BAE6FD;
          border-radius: 16px;
          padding: 20px;
          margin: 24px 0;
        }
        .summary-title {
          font-size: 12px;
          font-weight: 800;
          color: #0369A1;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          border-bottom: 1px solid #BAE6FD;
          padding-bottom: 8px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-size: 13px;
        }
        .detail-label {
          color: #64748B;
          font-weight: 600;
        }
        .detail-value {
          color: #0B3951;
          font-weight: 700;
          text-align: right;
        }
        .steps-box {
          background: #F8FAFC;
          border-radius: 16px;
          padding: 20px;
          margin: 24px 0;
          border: 1px solid #E2E8F0;
        }
        .steps-title {
          font-size: 13px;
          font-weight: 800;
          color: #0B3951;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 13px;
        }
        .step-item:last-child {
          margin-bottom: 0;
        }
        .step-number {
          background: #1C8DC8;
          color: #ffffff;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .step-text {
          color: #475569;
        }
        .btn-container {
          text-align: center;
          margin: 32px 0 24px 0;
        }
        .btn-whatsapp {
          display: inline-block;
          background: linear-gradient(135deg, #1C8DC8 0%, #146299 100%);
          color: #ffffff !important;
          font-weight: 800;
          text-decoration: none;
          padding: 15px 32px;
          border-radius: 9999px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          box-shadow: 0 8px 20px rgba(28, 141, 200, 0.25);
        }
        .contact-info {
          font-size: 12px;
          color: #64748B;
          text-align: center;
          margin-top: 16px;
        }
        .footer {
          background: #0B3951;
          color: #94A3B8;
          padding: 24px;
          text-align: center;
          font-size: 12px;
          border-top: 1px solid #1E293B;
        }
        .footer a {
          color: #3D8DC3;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          
          <!-- Header Banner -->
          <div class="header">
            <!-- Front Logo Image -->
            <img 
              src="https://quranacademee.com/images/navbarlogo.png" 
              alt="Quran Academee Logo" 
              class="logo"
              onerror="this.style.display='none'"
            />
            <div class="subtitle">Certified Live 1-on-1 Quran Lessons</div>
            <h1 class="header-title">Free Trial Request Received!</h1>
          </div>

          <!-- Body Content -->
          <div class="content">
            <div class="greeting">Assalamu Alaikum ${fullName},</div>
            
            <p class="intro-text">
              Alhamdulillah! Thank you for requesting a <strong>3-Day Risk-Free Trial</strong> with Quran Academee. We are excited to support you on your Quran learning journey.
            </p>

            <!-- Summary Box -->
            <div class="summary-card">
              <div class="summary-title">Your Request Summary</div>
              
              <div class="detail-row">
                <span class="detail-label">Student Name:</span>
                <span class="detail-value">${fullName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Requested Course:</span>
                <span class="detail-value" style="color: #1C8DC8;">${formattedCourse}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Country:</span>
                <span class="detail-value">${country}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">WhatsApp Contact:</span>
                <span class="detail-value">${phone}</span>
              </div>
            </div>

            ${message ? `
              <div style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; font-size: 13px; color: #92400E;">
                <strong>Your Notes / Preferred Times:</strong><br />
                "${message}"
              </div>
            ` : ''}

            <!-- Next Steps -->
            <div class="steps-box">
              <div class="steps-title">What Happens Next?</div>
              
              <div class="step-item">
                <span class="step-number">1</span>
                <div class="step-text"><strong>WhatsApp Coordinator Sync:</strong> Our scheduling coordinator will message you on WhatsApp (or email) within 12–24 hours to align on your preferred daily schedule.</div>
              </div>
              
              <div class="step-item">
                <span class="step-number">2</span>
                <div class="step-text"><strong>Scholar Match:</strong> We will pair you with a certified male or female Arab scholar tailored to your skill level.</div>
              </div>
              
              <div class="step-item">
                <span class="step-number">3</span>
                <div class="step-text"><strong>Enjoy Your 3-Day Trial:</strong> Experience live 1-on-1 lessons with zero financial obligation.</div>
              </div>
            </div>

            <!-- WhatsApp Direct CTA -->
            <div class="btn-container">
              <a href="https://wa.me/923702680670?text=Assalamu%20Alaikum!%20I%20just%20submitted%20a%20free%20trial%20request%20for%20${encodeURIComponent(formattedCourse)}.%20My%20name%20is%20${encodeURIComponent(fullName)}" class="btn-whatsapp" target="_blank">
                Connect Directly on WhatsApp 💬
              </a>
            </div>

            <div class="contact-info">
              Have questions? Reply directly to this email or message us on WhatsApp: <strong>+92 370 2680670</strong>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #ffffff;">Quran Academee</p>
            <p style="margin: 0 0 12px 0;">Empowering Muslim families worldwide to recite with beauty and Tajweed.</p>
            <p style="margin: 0;">
              <a href="https://quranacademee.com" target="_blank">quranacademee.com</a> • 
              <a href="mailto:contact@quranacademee.com">contact@quranacademee.com</a>
            </p>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}
