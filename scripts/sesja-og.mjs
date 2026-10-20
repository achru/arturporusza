// Obrazki Open Graph (1200×630) dla /sesja i wariantów: zdjęcie z lekcji + nagłówek z reklamy.
//   node scripts/sesja-og.mjs        → public/sesja/og/<wariant>.jpg
// Renderuje Playwright z lokalnych plików (fonty z src/fonts, zdjęcia z src/assets/sesja).
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public/sesja/og');
mkdirSync(out, { recursive: true });

const b64 = (p) => readFileSync(join(root, p)).toString('base64');
const font = (plik) => `url(data:font/woff2;base64,${b64(`src/fonts/${plik}`)}) format('woff2')`;
const znak = readFileSync(join(root, 'src/components/Znak.astro'), 'utf8').match(/<svg[\s\S]*?<\/svg>/)[0];

const WARIANTY = [
  { plik: 'sesja', zdj: 'stojac', h1: 'Lekcja ruchu poprzez dotyk.' },
  { plik: 'cos-wraca', zdj: 'oczy', h1: 'Coś wraca od&nbsp;miesięcy.' },
  { plik: 'schody', zdj: 'spacer', h1: 'Chodzenie po schodach. Spacer. Sięganie po&nbsp;kubek.', maly: true },
  { plik: 'sport', zdj: 'reka', h1: 'Biegasz, pływasz, tańczysz, śpiewasz, wspinasz się?', maly: true },
  { plik: 'skreslone', zdj: 'lopatka', h1: 'To <span class="sk">masaż.</span> <em>lekcja ruchu.</em>' },
];

const css = `
@font-face { font-family: L; font-style: normal; font-weight: 400 600; src: ${font('literata-sesja-lat-normal.woff2')}; }
@font-face { font-family: L; font-style: normal; font-weight: 400 600; src: ${font('literata-sesja-pl-normal.woff2')}; unicode-range: U+0104-0107, U+0118-0119, U+0141-0144, U+015A-015B, U+0179-017C; }
@font-face { font-family: L; font-style: italic; font-weight: 400 600; src: ${font('literata-sesja-lat-italic.woff2')}; }
@font-face { font-family: L; font-style: italic; font-weight: 400 600; src: ${font('literata-sesja-pl-italic.woff2')}; unicode-range: U+0104-0107, U+0118-0119, U+0141-0144, U+015A-015B, U+0179-017C; }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; background: #fbfaf7; color: #1d1b17; font-family: L, Georgia, serif; }
.k { display: grid; grid-template-columns: 1fr 470px; height: 630px; }
.t { padding: 58px 56px 52px 64px; display: flex; flex-direction: column; }
.logo { display: flex; align-items: center; gap: 12px; font: 500 21px/1 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: .08em; }
.logo svg { height: 40px; width: auto; }
h1 { margin-top: auto; font-weight: 500; font-size: 76px; line-height: 1.04; letter-spacing: -0.018em; text-wrap: balance; }
h1.m { font-size: 60px; line-height: 1.06; }
h1 em { font-style: italic; font-weight: 450; }
.sk { position: relative; display: inline-block; }
.sk::after { content: ''; position: absolute; left: -4px; right: -6px; top: 52%; height: 5px; border-radius: 3px; background: #9c4231; transform: rotate(-1.5deg); }
.f { margin-top: 30px; padding-top: 18px; border-top: 1px solid rgba(29,27,23,.16); font-size: 25px; font-weight: 500; color: #1d1b17; }
.f span { color: #575349; font-weight: 400; padding: 0 10px; }
.z { background-size: cover; background-position: 50% 42%; }
`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const w of WARIANTY) {
  const img = `data:image/jpeg;base64,${b64(`src/assets/sesja/sesja-${w.zdj}-4x5.jpg`)}`;
  await page.setContent(`<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>${css}</style></head><body>
    <div class="k"><div class="t">
      <div class="logo"><span>ARTUR</span>${znak}<span>PORUSZA</span></div>
      <h1 class="${w.maly ? 'm' : ''}">${w.h1}</h1>
      <p class="f">50 minut<span>·</span>250 zł<span>·</span>Gdańsk Wrzeszcz</p>
    </div><div class="z" style="background-image:url(${img})"></div></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: join(out, `${w.plik}.jpg`), type: 'jpeg', quality: 84 });
  console.log('og', w.plik);
}
await browser.close();
