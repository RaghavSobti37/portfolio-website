/**
 * Self-check: sheet failure must not block resume email.
 *   node scripts/test-resume-lead-softfail.mjs
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { processResumeLead } from '../api/lib/resumeLeadCore.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const pdf = path.join(here, '..', 'public', 'resumes', 'raghav-videographer-resume.pdf');
assert.ok(fs.existsSync(pdf), 'videographer PDF must exist for test');

let emailed = false;
const result = await processResumeLead(
  {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Acme',
    portfolio: 'Videographer',
    resume: 'Videographer Resume',
  },
  {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: 'tsc-newsletter@example.iam.gserviceaccount.com',
    GOOGLE_PRIVATE_KEY: 'unused-for-mocked-sheet',
    EMAIL_ADDRESS: 'raghavsobti37@gmail.com',
    // SMTP unused — sendViaGmailSmtp is mocked
  },
  {
    appendToSheet: async () => {
      const err = new Error('The caller does not have permission');
      err.code = 403;
      throw err;
    },
    sendViaGmailSmtp: async () => {
      emailed = true;
    },
  }
);

assert.equal(result.ok, true, `expected ok, got ${JSON.stringify(result)}`);
assert.equal(emailed, true, 'email must still send when sheet fails');
console.log('ok: sheet soft-fail still emails resume');
