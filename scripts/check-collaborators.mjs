/**
 * Self-check for collaborator marquee data.
 * Run: node --experimental-strip-types scripts/check-collaborators.mjs
 * (or via npm run check:collaborators)
 */
import assert from 'node:assert/strict';

function formatListeners(n) {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (n >= 1_000) {
    const v = n / 1_000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(n);
}

function splitRows(list) {
  const top = [];
  const bottom = [];
  list.forEach((c, i) => (i % 2 === 0 ? top : bottom).push(c));
  return { top, bottom };
}

assert.equal(formatListeners(40), '40');
assert.equal(formatListeners(11500), '11.5K');
assert.equal(formatListeners(2300000), '2.3M');
assert.equal(formatListeners(4000000), '4M');

const sample = Array.from({ length: 6 }, (_, i) => ({ id: String(i) }));
const { top, bottom } = splitRows(sample);
assert.deepEqual(
  top.map((c) => c.id),
  ['0', '2', '4']
);
assert.deepEqual(
  bottom.map((c) => c.id),
  ['1', '3', '5']
);

console.log('check-collaborators: ok');
