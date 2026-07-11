import { google } from 'googleapis';

let sheetsClient: any = null;

export function getSheetsClient() {
  if (!sheetsClient) {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      throw new Error(
        'Missing Google Service Account authentication configuration. Please provide GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in your environment variables.'
      );
    }

    console.log('[Google Auth] Initializing Google JWT Service Account authentication.');
    // Replace literal escape sequences '\n' with actual newlines
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    sheetsClient = google.sheets({ version: 'v4', auth });
  }
  return sheetsClient;
}

export async function appendLeadToSheet(data: {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  message?: string;
}) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not defined');
  }

  const sheetTitle = 'Quran Academee Leads';
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

  try {
    // 1. Check if the "Quran Academee Leads" tab exists
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      (s: any) => s.properties?.title === sheetTitle
    );

    // 2. If the sheet doesn't exist, create it and write the headers
    if (!sheetExists) {
      console.log(`Sheet "${sheetTitle}" not found. Creating a new tab.`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle,
                },
              },
            },
          ],
        },
      });

      // Write headers: A1 to G1
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetTitle}!A1:G1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            ['Timestamp', 'Full Name', 'Email', 'Phone', 'Country', 'Course Interest', 'Message'],
          ],
        },
      });
    }

    // 3. Append the lead row to the sheet (Fixed the nested .sheets call)
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:G`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            timestamp,
            data.fullName,
            data.email,
            data.phone,
            data.country,
            data.courseInterest,
            data.message || '',
          ],
        ],
      },
    });

    return appendResponse.data;
  } catch (error: any) {
    console.error('Google Sheets append failed:', error);
    throw new Error(`Google Sheets logging failed: ${error.message}`);
  }
}
