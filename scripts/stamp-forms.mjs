// Stempel deployu na stronach z formularzami: node scripts/stamp-forms.mjs
// Netlify wykrywa formularze, skanując HTML wysłany w danym deployu — pliki
// niezmienione od poprzedniego razu bywają pomijane. Zmiana stempla przy każdym
// buildzie wymusza ponowny upload tych stron, więc detekcja rusza od nowa.
// Uruchamiane automatycznie po `astro build` (patrz package.json).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const STEMPEL = /[ \t]*<!-- netlify-forms-build: [^>]*-->\n?/g;

async function stronyHtml(katalog) {
  const wpisy = await readdir(katalog, { withFileTypes: true });
  const znalezione = [];
  for (const wpis of wpisy) {
    const sciezka = join(katalog, wpis.name);
    if (wpis.isDirectory()) znalezione.push(...(await stronyHtml(sciezka)));
    else if (wpis.name.endsWith('.html')) znalezione.push(sciezka);
  }
  return znalezione;
}

const teraz = new Date().toISOString();
const ostemplowane = [];
const bledy = [];

for (const plik of await stronyHtml(DIST)) {
  const html = await readFile(plik, 'utf8');
  if (!html.includes('data-netlify="true"')) continue;

  // Bez tego pola Netlify nie przypisze zgłoszenia do formularza (kluczowe przy wysyłce AJAX-em).
  const nazwy = [...html.matchAll(/name="form-name"\s+value="([^"]+)"/g)].map((m) => m[1]);
  if (nazwy.length === 0) bledy.push(`${plik}: formularz bez ukrytego pola form-name`);
  if (!html.includes('</head>')) bledy.push(`${plik}: brak </head>, nie ma gdzie wstawić stempla`);
  if (bledy.length > 0) continue;

  const bezStempla = html.replace(STEMPEL, '');
  await writeFile(plik, bezStempla.replace('</head>', `<!-- netlify-forms-build: ${teraz} -->\n</head>`));
  ostemplowane.push({ plik, nazwy });
}

if (bledy.length > 0) {
  console.error('Formularze do poprawy przed deployem:');
  for (const blad of bledy) console.error(`  ✗ ${blad}`);
  process.exit(1);
}

if (ostemplowane.length === 0) {
  console.error(`Nie znaleziono w ${DIST}/ żadnego formularza z data-netlify — Netlify nie miałby czego wykryć.`);
  process.exit(1);
}

for (const { plik, nazwy } of ostemplowane) console.log(`[forms] ${plik} → ${nazwy.join(', ')}`);
console.log(`[forms] ostemplowano ${ostemplowane.length} stron(y), znacznik ${teraz}`);
