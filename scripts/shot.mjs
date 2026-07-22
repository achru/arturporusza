// Pełnostronicowy zrzut do QA wizualnego: node scripts/shot.mjs <url> <out.png> <szer> <wys>
// Emuluje prefers-reduced-motion i przewija stronę, żeby dociągnąć lazy obrazy.
import { chromium } from 'playwright';

const [url, out, w, h] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: Number(w), height: Number(h) },
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += innerHeight) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  scrollTo(0, 0);
});
await page.waitForLoadState('networkidle');
await page.waitForTimeout(600);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('saved', out);
