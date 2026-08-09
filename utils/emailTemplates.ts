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
