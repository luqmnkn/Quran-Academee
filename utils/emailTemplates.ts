/**
 * Helper function to escape HTML special characters to prevent HTML/XSS injection
 */
function escapeHtml(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates the HTML content for the notification email sent to the admin.
 */
export function generateAdminEmailHtml(data: {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  message?: string;
  timestamp: string;
}): string {
  const safeFullName = escapeHtml(data.fullName);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safeCountry = escapeHtml(data.country);
  const safeCourseInterest = escapeHtml(data.courseInterest);
  const safeTimestamp = escapeHtml(data.timestamp);
  
  const messageText = data.message 
    ? escapeHtml(data.message).replace(/\n/g, '<br />') 
    : '<em>None provided</em>';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Lead Notification</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          color: #1e293b;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #e2e8f0;
        }
        .header {
          background-color: #2563eb;
          padding: 32px 24px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.025em;
        }
        .content {
          padding: 32px 24px;
        }
        .lead-info-title {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          font-weight: 700;
          margin-bottom: 16px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 8px;
        }
        .info-grid {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        .info-grid td {
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
        }
        .info-grid td.label {
          width: 35%;
          font-weight: 600;
          color: #475569;
          font-size: 14px;
        }
        .info-grid td.value {
          color: #0f172a;
          font-size: 14px;
        }
        .message-box {
          background-color: #f8fafc;
          border-left: 4px solid #2563eb;
          padding: 16px;
          border-radius: 0 8px 8px 0;
          font-size: 14px;
          line-height: 1.6;
          color: #334155;
          margin-top: 8px;
        }
        .footer {
          background-color: #f8fafc;
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }
        .footer a {
          color: #2563eb;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Student Inquiry</h1>
        </div>
        <div class="content">
          <div class="lead-info-title">Lead Details</div>
          <table class="info-grid">
            <tr>
              <td class="label">Full Name</td>
              <td class="value"><strong>${safeFullName}</strong></td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td class="value"><a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td class="label">Phone Number</td>
              <td class="value">${safePhone}</td>
            </tr>
            <tr>
              <td class="label">Country</td>
              <td class="value">${safeCountry}</td>
            </tr>
            <tr>
              <td class="label">Course Interest</td>
              <td class="value">${safeCourseInterest}</td>
            </tr>
            <tr>
              <td class="label">Submitted At</td>
              <td class="value">${safeTimestamp}</td>
            </tr>
          </table>

          <div class="lead-info-title">Message / Note</div>
          <div class="message-box">
            ${messageText}
          </div>
        </div>
        <div class="footer">
          <p>Sent securely via Quran Academee Leads Service • <a href="https://quranacademee.com">quranacademee.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates the HTML content for the confirmation email sent to the student.
 */
export function generateStudentEmailHtml(data: {
  fullName: string;
  courseInterest: string;
}): string {
  const safeFullName = escapeHtml(data.fullName);
  const safeCourseInterest = escapeHtml(data.courseInterest);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Quran Academee</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          color: #1e293b;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #e2e8f0;
        }
        .header {
          background-color: #2563eb;
          padding: 40px 24px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.025em;
        }
        .header p {
          color: #bfdbfe;
          margin: 8px 0 0 0;
          font-size: 14px;
          font-weight: 500;
        }
        .content {
          padding: 36px 32px;
          line-height: 1.625;
          font-size: 15px;
          color: #334155;
        }
        .content h2 {
          color: #0f172a;
          font-size: 18px;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 16px;
        }
        .bullet-list {
          background-color: #f8fafc;
          border-radius: 12px;
          padding: 20px 20px 20px 40px;
          margin: 24px 0;
          border: 1px solid #e2e8f0;
        }
        .bullet-list li {
          margin-bottom: 10px;
        }
        .bullet-list li:last-child {
          margin-bottom: 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #2563eb;
          color: #ffffff !important;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 8px;
          text-align: center;
          margin: 24px 0 8px 0;
          transition: background-color 0.2s;
        }
        .signature {
          margin-top: 32px;
          border-top: 1px solid #f1f5f9;
          padding-top: 24px;
          color: #475569;
        }
        .signature-title {
          font-weight: 700;
          color: #0f172a;
        }
        .footer {
          background-color: #f8fafc;
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }
        .footer a {
          color: #2563eb;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Quran Academee</h1>
          <p>Assalamu Alaikum & Welcome</p>
        </div>
        <div class="content">
          <h2>Dear ${safeFullName},</h2>
          <p>Thank you for reaching out to Quran Academee! We have successfully received your inquiry about our <strong>${safeCourseInterest}</strong> course.</p>
          
          <p>Learning the Quran is a highly rewarding journey, and we are absolutely honored to support you and your family every step of the way with our premium 1-on-1 certified Quran teachers.</p>

          <p><strong>What happens next?</strong></p>
          <ul class="bullet-list">
            <li>An academic coordinator is already reviewing your details.</li>
            <li>We will contact you via Email or WhatsApp (at the number you provided) <strong>within 24 hours</strong> to coordinate your <strong>Free 1-on-1 Trial Class</strong>.</li>
            <li>We will customize the schedule to fit your lifestyle, time zone, and learning goals perfectly.</li>
          </ul>

          <p>If you'd like to speed up the booking process, feel free to message us directly on WhatsApp by clicking the button below:</p>

          <div style="text-align: center;">
            <a href="https://wa.me/923702680670" class="cta-button" target="_blank">Chat with us on WhatsApp</a>
          </div>

          <div class="signature">
            <p>Warmest regards,<br />
            <span class="signature-title">The Quran Academee Team</span><br />
            <a href="https://quranacademee.com" style="color: #2563eb; text-decoration: none;">quranacademee.com</a></p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Quran Academee • Recite with Beauty.<br />
          If you have any questions, reply to this email or reach us at <a href="mailto:contact@quranacademee.com">contact@quranacademee.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
