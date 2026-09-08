/**
 * POST /api/resume-lead
 * Sheets (CoreKnot SA) + Gmail SMTP with resume PDF.
 */
import { processResumeLead } from './lib/resumeLeadCore.mjs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST only' });

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }
  body = body && typeof body === 'object' ? body : {};

  const result = await processResumeLead(body, process.env);
  if (!result.ok) {
    return res.status(result.status || 500).json({ ok: false, error: result.error });
  }
  return res.status(200).json({ ok: true });
}
