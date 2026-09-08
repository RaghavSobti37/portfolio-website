/**
 * LEGACY — prefer api/lib/resumeLeadCore.mjs (service account + Gmail SMTP).
 * Kept only if you still need an Apps Script fallback webhook.
 *
 * Resume / portfolio lead capture → this spreadsheet.
 *
 * SETUP (one time):
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this file, Save
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL
 *
 * Sheet columns (row 1 headers auto-created if empty):
 * Timestamp | Name | Email | Company | Portfolio | Resume
 */

var SHEET_ID = '1jU528ElmmGJLYxm3H9u4-DrUuxfThnqHtFa_XKeQugs';

function doPost(e) {
  try {
    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    var name = String(body.name || '').trim();
    var email = String(body.email || '').trim();
    var company = String(body.company || '').trim();
    var portfolio = String(body.portfolio || '').trim();
    var resume = String(body.resume || '').trim();

    if (!name || !email || !company) {
      return json_({ ok: false, error: 'Missing required fields' });
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Portfolio', 'Resume']);
    } else {
      var first = sheet.getRange(1, 1, 1, 6).getValues()[0];
      if (!first[0]) {
        sheet.getRange(1, 1, 1, 6).setValues([
          ['Timestamp', 'Name', 'Email', 'Company', 'Portfolio', 'Resume'],
        ]);
      }
    }

    sheet.appendRow([
      new Date(),
      name,
      email,
      company,
      portfolio || '—',
      resume || '—',
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, message: 'Resume leads webhook. Use POST.' });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
