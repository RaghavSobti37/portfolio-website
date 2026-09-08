/**
 * Resume lead: Google Sheets (service account) + Gmail SMTP with PDF.
 * Env: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY,
 *      EMAIL_ADDRESS / EMAIL_PASSWORD (or GMAIL_APP_PASSWORD / SMTP_PASS),
 *      RESUME_LEADS_SHEET_ID (optional)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const DEFAULT_SHEET_ID = '1jU528ElmmGJLYxm3H9u4-DrUuxfThnqHtFa_XKeQugs';
const DEFAULT_FROM = 'raghavsobti37@gmail.com';

const RESUME_VARIANTS = {
  creative: {
    kind: 'creative',
    file: 'raghav-creative-technologist-resume.pdf',
    attachmentName: 'Raghav-Raj-Sobti-Creative-Technologist-Resume.pdf',
    sheetPortfolio: 'Creative Technologist',
    sheetResume: 'Creative Technologist Resume',
    subject: 'Your Creative Technologist resume — Raghav Raj Sobti',
    portfolioUrl: 'https://bluepolaroid.com/coding',
  },
  film: {
    kind: 'film',
    file: 'raghav-videographer-resume.pdf',
    attachmentName: 'Raghav-Raj-Sobti-Videographer-Resume.pdf',
    sheetPortfolio: 'Videographer',
    sheetResume: 'Videographer Resume',
    subject: 'Your Videographer resume — Raghav Raj Sobti',
    portfolioUrl: 'https://bluepolaroid.com',
  },
};

function envGet(env, ...keys) {
  for (const key of keys) {
    const v = env[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

export function resolveResumeKind({ portfolio = '', resume = '' } = {}) {
  const blob = `${portfolio} ${resume}`.toLowerCase();
  if (
    blob.includes('video') ||
    blob.includes('film') ||
    blob.includes('cinemat') ||
    blob.includes('editor') ||
    blob.includes('photographer')
  ) {
    return 'film';
  }
  return 'creative';
}

/** First token of the form name only (e.g. "Raghav Raj Sobti" → "Raghav"). */
function firstName(name) {
  const raw = String(name || '').trim().split(/\s+/)[0] || '';
  if (!raw) return 'there';
  // Title-case letters; keep mixed tokens like "McDonald" mostly intact if already capped
  if (/[a-z]/.test(raw) && /[A-Z]/.test(raw)) return raw;
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

/** ~100–120 words, two distinct voices — not spammy, clear CTA. */
export function buildResumeEmail({ kind, name, company }) {
  const variant = RESUME_VARIANTS[kind] || RESUME_VARIANTS.creative;
  const who = firstName(name);
  const org = String(company || '').trim();
  const orgBit = org ? ` at ${org}` : '';

  if (kind === 'film') {
    const text = [
      `Hi ${who},`,
      ``,
      `Thanks for requesting my videographer resume${orgBit}. The PDF is attached — camera through edit and finish, with brand films, music videos, and live coverage.`,
      ``,
      `You can browse the creative portfolio here: ${variant.portfolioUrl}`,
      ``,
      `If a shoot, edit, or content drop is on your radar, reply to this email and we can talk timing and scope.`,
      ``,
      `Best,`,
      `Raghav Raj Sobti`,
      `BluePolaroid · ${DEFAULT_FROM}`,
    ].join('\n');

    const html = `
      <p>Hi ${escapeHtml(who)},</p>
      <p>Thanks for requesting my videographer resume${escapeHtml(orgBit)}. The PDF is attached — camera through edit and finish, with brand films, music videos, and live coverage.</p>
      <p>Creative portfolio: <a href="${variant.portfolioUrl}">${variant.portfolioUrl}</a></p>
      <p>If a shoot, edit, or content drop is on your radar, reply to this email and we can talk timing and scope.</p>
      <p>Best,<br/>Raghav Raj Sobti<br/>BluePolaroid</p>
    `.trim();

    return { subject: variant.subject, text, html, variant };
  }

  const text = [
    `Hi ${who},`,
    ``,
    `Thanks for requesting my Creative Technologist resume${orgBit}. The PDF is attached — product and systems work across React/Next, APIs, and studio automation.`,
    ``,
    `Dev portfolio: ${variant.portfolioUrl}`,
    ``,
    `If you want a short call or a brief on a build, reply here and I’ll get back quickly.`,
    ``,
    `Best,`,
    `Raghav Raj Sobti`,
    `BluePolaroid · ${DEFAULT_FROM}`,
  ].join('\n');

  const html = `
    <p>Hi ${escapeHtml(who)},</p>
    <p>Thanks for requesting my Creative Technologist resume${escapeHtml(orgBit)}. The PDF is attached — product and systems work across React/Next, APIs, and studio automation.</p>
    <p>Dev portfolio: <a href="${variant.portfolioUrl}">${variant.portfolioUrl}</a></p>
    <p>If you want a short call or a brief on a build, reply here and I’ll get back quickly.</p>
    <p>Best,<br/>Raghav Raj Sobti<br/>BluePolaroid</p>
  `.trim();

  return { subject: variant.subject, text, html, variant };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolvePdfPath(filename) {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.join(process.cwd(), 'public', 'resumes', filename),
    path.join(process.cwd(), 'resumes', filename),
    path.join(here, '..', '..', 'public', 'resumes', filename),
    path.join(here, '..', 'resumes', filename),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function getServiceAccount(env) {
  const clientEmail = envGet(env, 'GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const privateKey = envGet(env, 'GOOGLE_PRIVATE_KEY')
    .replace(/\\n/g, '\n')
    .replace(/^"|"$/g, '');
  if (!clientEmail || !privateKey) return null;
  return { client_email: clientEmail, private_key: privateKey };
}

async function appendToSheet(env, { name, email, company, portfolio, resume }) {
  const creds = getServiceAccount(env);
  if (!creds) {
    throw new Error('Sheets not configured (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY)');
  }

  const spreadsheetId = envGet(env, 'RESUME_LEADS_SHEET_ID', 'GOOGLE_SHEET_ID') || DEFAULT_SHEET_ID;
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const header = ['Timestamp', 'Name', 'Email', 'Company', 'Portfolio', 'Resume'];
  const meta = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A1:F1',
  });
  const first = meta.data.values?.[0] || [];
  if (!first[0]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'A1:F1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [header] },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'A2',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[new Date().toISOString(), name, email, company, portfolio, resume]],
    },
  });
}

async function sendViaGmailSmtp(env, { to, subject, text, html, pdfPath, attachmentName }) {
  const user = envGet(env, 'EMAIL_ADDRESS', 'SMTP_USER') || DEFAULT_FROM;
  const pass = envGet(env, 'EMAIL_PASSWORD', 'GMAIL_APP_PASSWORD', 'SMTP_PASS');
  if (!pass) {
    throw new Error('Gmail SMTP not configured (EMAIL_PASSWORD / GMAIL_APP_PASSWORD)');
  }
  if (user.toLowerCase() !== DEFAULT_FROM.toLowerCase()) {
    // Still allow override, but warn via message if misconfigured in logs
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const pdf = fs.readFileSync(pdfPath);
  await transporter.sendMail({
    from: `Raghav Raj Sobti <${user}>`,
    to,
    replyTo: user,
    subject,
    text,
    html,
    attachments: [
      {
        filename: attachmentName,
        content: pdf,
        contentType: 'application/pdf',
      },
    ],
  });
}

/**
 * @returns {Promise<{ ok: true } | { ok: false, error: string, status: number }>}
 */
export async function processResumeLead(body, env = process.env) {
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const company = String(body?.company || '').trim();
  const portfolioIn = String(body?.portfolio || '').trim();
  const resumeIn = String(body?.resume || '').trim();

  if (!name || !email || !company) {
    return { ok: false, status: 400, error: 'Name, email, and company are required' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'Invalid email' };
  }

  const kind = resolveResumeKind({ portfolio: portfolioIn, resume: resumeIn });
  const { subject, text, html, variant } = buildResumeEmail({ kind, name, company });
  const pdfPath = resolvePdfPath(variant.file);
  if (!pdfPath) {
    return { ok: false, status: 500, error: `Resume PDF missing (${variant.file})` };
  }

  try {
    await appendToSheet(env, {
      name,
      email,
      company,
      portfolio: variant.sheetPortfolio,
      resume: variant.sheetResume,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      status: 502,
      error: msg.includes('permission') || msg.includes('PERMISSION')
        ? `Sheet access denied — share the spreadsheet with ${envGet(env, 'GOOGLE_SERVICE_ACCOUNT_EMAIL') || 'the service account'}`
        : `Sheet write failed: ${msg}`,
    };
  }

  try {
    await sendViaGmailSmtp(env, {
      to: email,
      subject,
      text,
      html,
      pdfPath,
      attachmentName: variant.attachmentName,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 502, error: `Email send failed: ${msg}` };
  }

  return { ok: true, kind: variant.kind };
}
