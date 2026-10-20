// Klient landingu /sesja (Integracja Funkcjonalna):
// 1) najbliższe wolne terminy z Pracowni (zapytanie startuje już w <head>, patrz SesjaStrona.astro),
// 2) pasek rezerwacji na telefonie,
// 3) linia, która rysuje się, gdy wejdzie w widok.
// Kontrakt API i zachowanie przy błędach: docs/sesja-landing.md.

interface TerminSurowy {
  start?: unknown;
  url?: unknown;
}

interface Termin {
  start: string;
  url: string;
  ts: number;
  rok: number;
  mies: number;
  dzien: number;
  dzienTyg: number;
  godz: string;
  data: string;
  za: number;
}

declare global {
  interface Window {
    __sesjaTerminy?: Promise<unknown>;
  }
}

const PRACOWNIA = 'https://pracownia.arturporusza.pl/';
const DNI_KROTKO = ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'];
const DNI = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
const MIESIACE = [
  'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
  'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia',
];
const DOBA = 86_400_000;
const zredukowanyRuch = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const strona = document.querySelector<HTMLElement>('[data-wariant]');
const zrodlo = strona?.dataset.zrodlo || 'sesja';

function zParametrem(url: string) {
  try {
    const u = new URL(url, location.href);
    u.searchParams.set('zrodlo', zrodlo);
    return u.toString();
  } catch {
    return url;
  }
}

/** Dzisiejsza data w Warszawie jako północ UTC (do liczenia „za ile dni”). */
function dzisWarszawa() {
  try {
    const czesci = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Warsaw',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(new Date());
    const v = (typ: string) => Number(czesci.find((c) => c.type === typ)?.value);
    const y = v('year');
    const m = v('month');
    const d = v('day');
    if (y && m && d) return Date.UTC(y, m - 1, d);
  } catch {
    /* starsza przeglądarka: czas urządzenia */
  }
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
}

/** Pracownia podaje czas warszawski z przesunięciem; składniki bierzemy prosto z napisu. */
function rozbierz(s: TerminSurowy, dzis: number): Termin | null {
  if (typeof s.start !== 'string' || typeof s.url !== 'string') return null;
  if (!s.url.startsWith(PRACOWNIA)) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(s.start);
  const ts = Date.parse(s.start);
  if (!m || Number.isNaN(ts)) return null;
  const rok = Number(m[1]);
  const mies = Number(m[2]);
  const dzien = Number(m[3]);
  const naUTC = Date.UTC(rok, mies - 1, dzien);
  return {
    start: s.start,
    url: s.url,
    ts,
    rok,
    mies,
    dzien,
    dzienTyg: new Date(naUTC).getUTCDay(),
    godz: `${m[4]}:${m[5]}`,
    data: `${m[1]}-${m[2]}-${m[3]}`,
    za: Math.round((naUTC - dzis) / DOBA),
  };
}

const dzienKrotko = (t: Termin) =>
  t.za === 0 ? 'dziś' : t.za === 1 ? 'jutro' : `${DNI_KROTKO[t.dzienTyg]} ${t.dzien}.${t.mies}`;
const dzienPelny = (t: Termin) => `${DNI[t.dzienTyg]}, ${t.dzien} ${MIESIACE[t.mies - 1]}`;
const zaIle = (t: Termin) => (t.za <= 0 ? 'dziś' : t.za === 1 ? 'jutro' : `za ${t.za} dni`);

function el<K extends keyof HTMLElementTagNameMap>(tag: K, klasa?: string, tekst?: string) {
  const e = document.createElement(tag);
  if (klasa) e.className = klasa;
  if (tekst) e.textContent = tekst;
  return e;
}

function przycisk(t: Termin, miejsce: string, zDniem: boolean) {
  const a = el('a', zDniem ? 's-termin' : 's-termin s-termin--godzina');
  a.href = zParametrem(t.url);
  a.dataset.cta = `${miejsce}-termin`;
  a.dataset.termin = t.start;
  a.setAttribute('aria-label', `Umów sesję: ${dzienPelny(t)}, godzina ${t.godz}`);
  if (zDniem) a.append(el('span', 's-termin-dzien', dzienKrotko(t)));
  a.append(el('span', 's-termin-godzina', t.godz));
  return a;
}

function pokazTerminy(k: HTMLElement, terminy: Termin[]) {
  const lista = k.querySelector<HTMLElement>('[data-lista]');
  if (!lista) return;
  const ile = Number(k.dataset.ile) || 3;
  const miejsce = k.dataset.miejsce || 'hero';
  const wybrane = terminy.slice(0, ile);
  const nowe: HTMLElement[] = [];

  if (k.dataset.uklad === 'dni') {
    const dni = new Map<string, Termin[]>();
    for (const t of wybrane) dni.set(t.data, [...(dni.get(t.data) ?? []), t]);
    for (const grupa of dni.values()) {
      const t0 = grupa[0];
      const wiersz = el('li', 's-dzien');
      const nazwa = el('p', 's-dzien-nazwa', `${DNI_KROTKO[t0.dzienTyg]} ${t0.dzien}.${t0.mies}`);
      nazwa.append(el('span', '', zaIle(t0)));
      const godziny = el('ul', 's-dzien-godziny');
      for (const t of grupa) {
        const li = el('li');
        li.append(przycisk(t, miejsce, false));
        godziny.append(li);
      }
      wiersz.append(nazwa, godziny);
      nowe.push(wiersz);
    }
  } else {
    // jeden wspólny dzień: dzień raz w nagłówku, na przyciskach same godziny
    const jedenDzien = wybrane.every((t) => t.data === wybrane[0].data);
    for (const t of wybrane) {
      const li = el('li');
      li.append(przycisk(t, miejsce, !jedenDzien));
      nowe.push(li);
    }
    k.dataset.jedenDzien = String(jedenDzien);
  }
  lista.replaceChildren(...nowe);

  const t0 = terminy[0];
  const status = k.querySelector<HTMLElement>('[data-status]');
  if (status) {
    if (k.dataset.jedenDzien === 'true') status.textContent = t0.za >= 2 ? `${dzienKrotko(t0)}, za ${t0.za} dni` : dzienKrotko(t0);
    else status.textContent = t0.za >= 7 ? `najbliższy za ${t0.za} dni` : '';
  }
  k.dataset.stan = 'gotowe';
  k.removeAttribute('aria-busy');
}

function pokazZapas(k: HTMLElement, stan: 'blad' | 'brak') {
  k.dataset.stan = stan;
  k.removeAttribute('aria-busy');
}

function napisz(a: HTMLAnchorElement | null, tekst: string) {
  const s = a?.querySelector<HTMLElement>('[data-cta-tekst]');
  if (s) s.textContent = tekst;
}

/** Błąd API: przyciski dalej prowadzą do kalendarza, ale mówią wprost, co tam jest. */
function przyciskiPoBledzie() {
  napisz(document.querySelector('[data-cta="hero-umow"]'), 'Zobacz wolne terminy');
  napisz(document.querySelector('[data-cta="koniec-umow"]'), 'Zobacz wolne terminy');
}

/** Pusta lista: kalendarz bez godzin to ślepa uliczka, więc przyciski prowadzą do kontaktu. */
function przyciskiDoKontaktu() {
  for (const miejsce of ['hero', 'koniec', 'pasek']) {
    const a = document.querySelector<HTMLAnchorElement>(`[data-cta="${miejsce}-umow"]`);
    if (!a) continue;
    a.href = '#kontakt';
    a.dataset.cta = `${miejsce}-napisz`;
    a.removeAttribute('data-kalendarz');
    napisz(a, 'Napisz do mnie');
  }
}

const kontenery = Array.from(document.querySelectorAll<HTMLElement>('[data-terminy]'));
const pasekEtykieta = document.querySelector<HTMLElement>('[data-pasek-etykieta]');
const pasekWartosc = document.querySelector<HTMLElement>('[data-pasek-wartosc]');

function obsluz(json: unknown) {
  const dane = (json ?? {}) as { terminy?: unknown; wszystkie?: unknown };
  if (!Array.isArray(dane.terminy)) throw new Error('zły format');
  const dzis = dzisWarszawa();
  const teraz = Date.now();
  const terminy = dane.terminy
    .map((s) => rozbierz((s ?? {}) as TerminSurowy, dzis))
    .filter((t): t is Termin => !!t && t.ts > teraz)
    .sort((a, b) => a.ts - b.ts);

  if (typeof dane.wszystkie === 'string' && dane.wszystkie.startsWith(PRACOWNIA)) {
    const href = zParametrem(dane.wszystkie);
    document.querySelectorAll<HTMLAnchorElement>('[data-kalendarz]').forEach((a) => (a.href = href));
  }

  if (terminy.length === 0) {
    kontenery.forEach((k) => pokazZapas(k, 'brak'));
    przyciskiDoKontaktu();
    return;
  }
  kontenery.forEach((k) => pokazTerminy(k, terminy));
  const t0 = terminy[0];
  if (pasekEtykieta) pasekEtykieta.textContent = 'Najbliższy wolny termin';
  if (pasekWartosc) pasekWartosc.textContent = `${dzienKrotko(t0)} · ${t0.godz}`;
}

(window.__sesjaTerminy ?? Promise.reject(new Error('brak zapytania')))
  .then(obsluz)
  .catch(() => {
    kontenery.forEach((k) => pokazZapas(k, 'blad'));
    przyciskiPoBledzie();
  });

// — pasek rezerwacji: po minięciu przycisku z pierwszego ekranu, do bloku zapisów —
const pasek = document.querySelector<HTMLElement>('[data-pasek]');
const heroCta = document.querySelector<HTMLElement>('.s-hero .s-cta');
const zapisy = document.getElementById('zapisy');

if (pasek && heroCta && zapisy && 'IntersectionObserver' in window) {
  let heroMiniety = false;
  let zapisyBlisko = false;
  const odswiez = () => {
    const pokaz = heroMiniety && !zapisyBlisko;
    pasek.classList.toggle('widoczny', pokaz);
    pasek.toggleAttribute('inert', !pokaz);
    pasek.setAttribute('aria-hidden', String(!pokaz));
  };
  new IntersectionObserver(([w]) => {
    heroMiniety = !w.isIntersecting && w.boundingClientRect.top < 0;
    odswiez();
  }).observe(heroCta);
  new IntersectionObserver(([w]) => {
    zapisyBlisko = w.isIntersecting || w.boundingClientRect.top < 0;
    odswiez();
  }).observe(zapisy);
}

// — linia, która wstaje i idzie: grubość co do piksela, rysuje się raz, gdy wejdzie w widok —
const sciezki = Array.from(document.querySelectorAll<SVGPathElement>('[data-rysuj]'));
const KRESKA_PX = 2.25;
function grubosc() {
  for (const s of sciezki) {
    const skala = s.getScreenCTM()?.a;
    if (skala) s.style.strokeWidth = String(KRESKA_PX / skala);
  }
}
grubosc();
window.addEventListener('resize', grubosc, { passive: true });

if (!zredukowanyRuch && 'IntersectionObserver' in window) {
  sciezki.forEach((sciezka) => {
    let L = 0;
    try {
      L = sciezka.getTotalLength();
    } catch {
      return;
    }
    sciezka.style.strokeDasharray = `${L} ${L + 10}`;
    sciezka.style.strokeDashoffset = `${L + 5}`;
    const obs = new IntersectionObserver(
      ([w]) => {
        if (!w.isIntersecting) return;
        obs.disconnect();
        sciezka.style.transition = 'stroke-dashoffset 2600ms cubic-bezier(0.33, 0.1, 0.25, 1)';
        sciezka.style.strokeDashoffset = '0';
      },
      { threshold: 0.6 },
    );
    obs.observe(sciezka);
  });
}

export {};
