/**
 * Local / CI self-check for resume lead (Sheets + Gmail SMTP).
 * Usage:
 *   node --env-file=.env scripts/test-resume-lead.mjs
 *   node --env-file=.env scripts/test-resume-lead.mjs --to you@example.com
 */
import { processResumeLead } from '../api/lib/resumeLeadCore.mjs';

const args = process.argv.slice(2);
const toIdx = args.indexOf('--to');
const to = toIdx >= 0 ? args[toIdx + 1] : process.env.TEST_RESUME_TO || process.env.EMAIL_ADDRESS;

if (!to) {
  console.error('Pass --to email@domain or set TEST_RESUME_TO');
  process.exit(1);
}

const cases = [
  {
    name: 'Raghav Raj Sobti',
    email: to,
    company: 'BluePolaroid QA',
    portfolio: 'Creative Technologist',
    resume: 'Creative Technologist Resume',
  },
  {
    name: 'Priya Sharma',
    email: to,
    company: 'BluePolaroid QA',
    portfolio: 'Videographer',
    resume: 'Videographer Resume',
  },
];

for (const body of cases) {
  process.stdout.write(`→ ${body.portfolio} … `);
  const result = await processResumeLead(body, process.env);
  if (!result.ok) {
    console.error('FAIL', result);
    process.exit(1);
  }
  console.log('ok', result.kind);
}

console.log('Both resume flows passed. Check inbox + Sheet.');
