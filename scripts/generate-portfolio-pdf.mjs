import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'portfolio', 'index.html');
const outPath = path.join(root, 'portfolio', 'Raghav-Raj-Sobti-BluePolaroid.pdf');

if (!fs.existsSync(htmlPath)) {
  console.error('Missing portfolio/index.html');
  process.exit(1);
}

const fileUrl = pathToFileURL(htmlPath).href;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
});

try {
  const page = await browser.newPage();
  // 16:9 — 1920×1080
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 120_000 });

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    const imgs = [...document.images];
    await Promise.all(
      imgs.map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
              })
      )
    );
  });

  await page.pdf({
    path: outPath,
    width: '338.67mm',
    height: '190.5mm',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`Wrote ${outPath}`);
} finally {
  await browser.close();
}
