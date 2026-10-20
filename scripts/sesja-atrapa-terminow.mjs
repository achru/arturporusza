// Atrapa endpointu Pracowni z wolnymi terminami, tylko w `astro dev`
// (hook astro:server:setup nie działa przy buildzie, więc nic nie trafia do dist/).
// Ten sam adres i format co prawdziwe API, patrz docs/sesja-landing.md:
//   GET /api/terminy/feldenkrais-indywidualnie-gdansk?ile=6
// Stany do QA (strona przekazuje ?terminy=… jako &stan=…):
//   stan=pusto | blad | wolno (4 s, czyli po limicie) | jutro
const USLUGA = 'feldenkrais-indywidualnie-gdansk';
const BAZA = `https://pracownia.arturporusza.pl/rezerwacja/${USLUGA}`;

// Stan kalendarza z 20.10.2026: najbliżej pon. 2.11 i pt. 6.11, dalej poniedziałki i piątki.
const WZOR = [
  ['2026-11-02', '12:00'], ['2026-11-02', '18:00'], ['2026-11-02', '19:00'],
  ['2026-11-06', '16:00'], ['2026-11-06', '17:00'],
  ['2026-11-09', '12:00'], ['2026-11-09', '18:00'],
  ['2026-11-13', '16:00'],
];

const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const przesun = (data, dni) => {
  const d = new Date(`${data}T12:00:00`);
  d.setDate(d.getDate() + dni);
  return ymd(d);
};
// czas warszawski: od ostatniej niedzieli marca do ostatniej niedzieli października +02:00
const strefa = (data, godz) => {
  const off = -new Date(`${data}T${godz}:00`).getTimezoneOffset();
  const h = Math.trunc(off / 60);
  return `${off >= 0 ? '+' : '-'}${pad(Math.abs(h))}:${pad(Math.abs(off % 60))}`;
};

function termin(data, godz) {
  const start = `${data}T${godz}:00${strefa(data, godz)}`;
  return { start, url: `${BAZA}?${new URLSearchParams({ from: data, termin: start })}` };
}

export function atrapaTerminow() {
  return {
    name: 'sesja-atrapa-terminow',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(`/api/terminy/${USLUGA}`, async (req, res) => {
          const q = new URL(req.url ?? '/', 'http://localhost').searchParams;
          const stan = q.get('stan') ?? '';
          const ile = Math.min(Math.max(Number(q.get('ile')) || 3, 1), 12);
          const wyslij = (status, body) => {
            res.statusCode = status;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Cache-Control', 'no-store');
            res.end(JSON.stringify(body));
          };
          if (stan === 'blad') return wyslij(500, { blad: 'atrapa' });
          if (stan === 'wolno') await new Promise((r) => setTimeout(r, 4000));

          const dzis = ymd(new Date());
          let pary = WZOR;
          if (stan === 'jutro') {
            const j = przesun(dzis, 1);
            const pj = przesun(dzis, 2);
            pary = [[j, '12:00'], [j, '18:00'], [pj, '16:00'], [pj, '17:00'], [przesun(dzis, 5), '12:00']];
          } else if (pary[pary.length - 1][0] <= dzis) {
            // po listopadzie 2026 wzór przesuwa się o pełne tygodnie, żeby atrapa nie pustoszała
            const tyg = Math.ceil((Date.parse(dzis) - Date.parse(pary[0][0])) / (7 * 86_400_000)) + 2;
            pary = pary.map(([d, g]) => [przesun(d, tyg * 7), g]);
          }
          const terminy = stan === 'pusto' ? [] : pary.slice(0, ile).map(([d, g]) => termin(d, g));
          wyslij(200, {
            usluga: USLUGA,
            terminy,
            wszystkie: terminy.length ? `${BAZA}?from=${terminy[0].start.slice(0, 10)}` : BAZA,
          });
        });
      },
    },
  };
}
