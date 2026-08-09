import { google, sheets_v4 } from 'googleapis';

export interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  message?: string;
}

let sheetsClient: sheets_v4.Sheets | null = null;

/**
 * Initializes and caches the Google Sheets v4 client using JWT Service Account credentials.
 */
export function getSheetsClient(): sheets_v4.Sheets {
  if (!sheetsClient) {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !rawPrivateKey) {
      throw new Error(
        '[Google Sheets Auth Error]: Missing required environment variables. Please ensure GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY are defined.'
      );
    }

    // Handles both multiline RSA keys and escaped '\n' sequences from environment strings
    const formattedPrivateKey = rawPrivateKey.startsWith('"') && rawPrivateKey.endsWith('"')
      ? rawPrivateKey.slice(1, -1).replace(/\\n/g, '\n')
      : rawPrivateKey.replace(/\\n/g, '\n');

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheetsClient = google.sheets({ version: 'v4', auth });
  }

  return sheetsClient;
}

/**
 * Appends a lead submission row to the specified Google Sheet.
 * Auto-creates the target tab with header styling if it doesn't already exist.
 */
export async function appendLeadToSheet(data: LeadData): Promise<sheets_v4.Schema$AppendValuesResponse> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('[Google Sheets Error]: GOOGLE_SHEET_ID environment variable is not defined.');
  }

  const sheetTitle = 'Quran Academee Leads';
  const timestamp = `${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC`;

  try {
    // 1. Fetch spreadsheet metadata to verify tab existence
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (s) => s.properties?.title === sheetTitle
    );

    // 2. Auto-create tab and inject header row if non-existent
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

      // Write column headers (A1:G1)
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `'${sheetTitle}'!A1:G1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            ['Timestamp', 'Full Name', 'Email', 'Phone', 'Country', 'Course Interest', 'Message'],
          ],
        },
      });
    }

    // 3. Append the lead row to the bottom of the dataset
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetTitle}'!A:G`,
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
    console.error('[Google Sheets Append Error]:', error);
    throw new Error(`Google Sheets logging failed: ${error.message}`);
  }
}