// Landing sesji indywidualnych (Integracja Funkcjonalna) pod ruch z reklam Meta.
// Jeden szablon, kilka wariantów: różnią się tylko nagłówkiem (zdaniem z reklamy)
// i zdjęciem w pierwszym ekranie. Wszystko inne jest wspólne.
// Kontrakt danych z Pracownią i lista TODO: docs/sesja-landing.md.

import { CONTACT } from '../config';

export const USLUGA = 'feldenkrais-indywidualnie-gdansk';

/** Publiczny endpoint Pracowni z najbliższymi wolnymi terminami (patrz docs/sesja-landing.md). */
export const TERMINY_API = `https://pracownia.arturporusza.pl/api/terminy/${USLUGA}`;
/** Lokalna atrapa endpointu, tylko w `astro dev` (scripts/sesja-atrapa-terminow.mjs). */
export const TERMINY_API_DEV = `/api/terminy/${USLUGA}`;
/** Ile terminów prosimy z API: pierwszy ekran pokazuje 3, blok zapisów do 5. */
export const TERMINY_ILE = 6;
export const TERMINY_ILE_ZAPISY = 5;
/** Po tylu ms bez odpowiedzi pokazujemy zwykły link do kalendarza. */
export const TERMINY_TIMEOUT_MS = 2500;

export const KALENDARZ = CONTACT.sesjeLink;
export const MAIL = CONTACT.email;
export const MAIL_HREF = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Pytanie o sesję indywidualną')}`;
/** Bezpośrednia wiadomość na Instagramie (otwiera rozmowę w aplikacji). */
export const INSTAGRAM_DM = 'https://ig.me/m/artur_porusza';

export const FAKTY = {
  czas: '50 minut',
  cena: '250 zł',
  miejsce: 'Gdańsk Wrzeszcz',
  // Gabinet (podał Artur 2026-10-20). Adres JDG z config.ts (ul. Dulina) to NIE jest gabinet.
  adres: 'ul. Politechniczna 9/5, Gdańsk Wrzeszcz',
  cenaOnline: '300 zł',
};

export type ZdjecieKey = 'stojac' | 'oczy' | 'spacer' | 'reka' | 'lopatka';

export interface Wariant {
  slug: string; // '' = /sesja/
  /** Nagłówek h1, HTML (em = kursywa z reklamy, s = skreślenie). */
  naglowek: string;
  /** Wersja tekstowa nagłówka dla czytników ekranu, <title> i og:title. */
  naglowekTekst: string;
  /** Drugi napis z reklamy, HTML. */
  dopowiedzenie: string;
  zdjecie: ZdjecieKey;
  /** Która reklama kieruje na ten wariant (do dokumentacji i atrybutu data-wariant). */
  reklama: string;
  tytul: string;
  opis: string;
  og: string;
}

const OPIS =
  'Indywidualna lekcja metody Feldenkraisa. Gdańsk Wrzeszcz, 50 minut, 250 zł. Leżysz, siedzisz albo stoisz, a ja prowadzę ruch delikatnym dotykiem.';

export const WARIANTY: Record<string, Wariant> = {
  domyslny: {
    slug: '',
    naglowek: 'Lekcja ruchu poprzez dotyk.',
    naglowekTekst: 'Lekcja ruchu poprzez dotyk.',
    dopowiedzenie: 'Ja poruszam. <em>Ty zauważasz.</em>',
    zdjecie: 'stojac',
    reklama: 'ruch ogólny, linki ze strony',
    tytul: 'Integracja Funkcjonalna w Gdańsku: lekcja ruchu poprzez dotyk | Artur Porusza',
    opis: OPIS,
    og: '/sesja/og/sesja.jpg',
  },
  'cos-wraca': {
    slug: 'cos-wraca',
    naglowek: 'Coś wraca od&nbsp;miesięcy.',
    naglowekTekst: 'Coś wraca od miesięcy.',
    dopowiedzenie: 'Nie diagnozuję. Uczę zauważać, <em>co robisz ze sobą w&nbsp;ruchu.</em>',
    zdjecie: 'oczy',
    reklama: 'v8 „Coś wraca”',
    tytul: 'Coś wraca od miesięcy. Integracja Funkcjonalna w Gdańsku | Artur Porusza',
    opis: OPIS,
    og: '/sesja/og/cos-wraca.jpg',
  },
  schody: {
    slug: 'schody',
    naglowek: 'Chodzenie po schodach. Spacer. Sięganie po&nbsp;kubek.',
    naglowekTekst: 'Chodzenie po schodach. Spacer. Sięganie po kubek.',
    dopowiedzenie: 'Sprawność, <em>która zostaje na dłużej.</em>',
    zdjecie: 'spacer',
    reklama: 'v9 „Schody”',
    tytul: 'Chodzenie po schodach, spacer, sięganie po kubek. Integracja Funkcjonalna w Gdańsku | Artur Porusza',
    opis: OPIS,
    og: '/sesja/og/schody.jpg',
  },
  sport: {
    slug: 'sport',
    naglowek: 'Biegasz, pływasz, tańczysz, śpiewasz, wspinasz się?',
    naglowekTekst: 'Biegasz, pływasz, tańczysz, śpiewasz, wspinasz się?',
    dopowiedzenie: 'Jak możesz to robić <em>z&nbsp;mniejszym wysiłkiem?</em>',
    zdjecie: 'reka',
    reklama: 'v10 „To samo”',
    tytul: 'Biegasz, pływasz, tańczysz? Integracja Funkcjonalna w Gdańsku | Artur Porusza',
    opis: OPIS,
    og: '/sesja/og/sport.jpg',
  },
  skreslone: {
    slug: 'skreslone',
    naglowek: 'To <s class="skreslenie">masaż.</s> <em>lekcja ruchu.</em>',
    naglowekTekst: 'To nie masaż. To lekcja ruchu.',
    dopowiedzenie: 'Ja poruszam. <em>Ty zauważasz.</em>',
    zdjecie: 'lopatka',
    reklama: 'v1 „Skreślone”',
    tytul: 'To nie masaż, to lekcja ruchu. Integracja Funkcjonalna w Gdańsku | Artur Porusza',
    opis: OPIS,
    og: '/sesja/og/skreslone.jpg',
  },
};

/** Jedno zdanie o tym, czym jest sesja (zatwierdzony tekst reklamy v8). */
export const CZYM_JEST =
  'Integracja Funkcjonalna to indywidualna lekcja metody Feldenkraisa. Leżysz, siedzisz albo stoisz, a&nbsp;ja prowadzę ruch delikatnym dotykiem.';

export const ALT: Record<ZdjecieKey, string> = {
  stojac: 'Lekcja na stojąco: Artur kładzie dłonie na plecach osoby w zwykłym ubraniu, oboje w jasnym gabinecie.',
  oczy: 'Osoba w różowej bluzie stoi z zamkniętymi oczami w jasnym gabinecie i spokojnie się uśmiecha.',
  spacer: 'Po lekcji: osoba idzie przez gabinet, Artur stoi obok, oboje się uśmiechają.',
  reka: 'Osoba w różowej bluzie unosi rękę wysoko nad głowę i śmieje się.',
  lopatka: 'Dłonie Artura na łopatce osoby leżącej na boku, w ubraniu, na stole do pracy.',
};

/** Przebieg pierwszej sesji. Czasy za starą stroną /indywidualnie (10 + 5 + 30 + 5). */
export const PRZEBIEG = [
  {
    min: '10',
    tytul: 'Rozmowa',
    tekst: 'Pytam, z czym przychodzisz i czego szukasz. Nie diagnozuję.',
    uwaga: 'Nie musisz mieć konkretnego problemu ani dobrej kondycji.',
  },
  {
    min: '5',
    tytul: 'Obserwacja w ruchu',
    tekst: 'Robisz kilka prostych rzeczy: stoisz, siadasz, chodzisz. Patrzymy razem, jak organizujesz ruch.',
  },
  {
    min: '30',
    tytul: 'Lekcja przez dotyk',
    tekst:
      'Pracujemy w ubraniu. Leżysz, siedzisz albo stoisz, a&nbsp;ja prowadzę Cię delikatnym dotykiem i&nbsp;drobnym ruchem, powoli i&nbsp;tylko tyle, ile jest łatwe. Nie dostajesz ćwiczeń do zapamiętania ani uwag o&nbsp;postawie.',
    uwaga: 'Dotyk jest delikatny, bez nacisku i&nbsp;bez naciągania. To nie boli.',
    pozycje: true,
  },
  {
    min: '5',
    tytul: 'Kilka kroków',
    tekst: 'Na koniec idziesz kilka kroków i&nbsp;sprawdzasz, czy coś się zmieniło.',
  },
];

export const POZYCJE = [
  { key: 'lezac', podpis: 'leżąc', alt: 'Osoba leży na plecach z zamkniętymi oczami, Artur prowadzi jej uniesioną rękę.' },
  { key: 'siedzac', podpis: 'siedząc', alt: 'Osoba siedzi na brzegu stołu, Artur stoi obok i dotyka jej barku.' },
  { key: 'stojac-plecy', podpis: 'stojąc', alt: 'Osoba stoi, Artur stoi za nią z dłońmi na jej plecach.' },
] as const;

export const BIO = [
  'Pracuję metodą Feldenkraisa od trzynastu lat, w&nbsp;Gdańsku i&nbsp;online. Pracowałem ze sportowcami, artystami, ludźmi w&nbsp;bólu i&nbsp;osobami, które zarządzają dużymi organizacjami.',
];

/** Fragmenty opinii z Booksy (pełne teksty: /opinie/). „(…)” = skrót. */
export const OPINIE = [
  {
    tekst: 'Po godzinie pracy, przy moim minimalnym wysiłku, poczułem głębokie odprężenie (…). Artur jest bardzo uważny, w&nbsp;prosty, intuicyjny sposób komunikował, co robić.',
    autor: 'Tomasz',
    data: 'czerwiec 2022',
  },
  {
    tekst: 'Pan Artur jest osobą ciepłą, cierpliwą, uważnie słuchającą i&nbsp;nienarzucającą swojego zdania.',
    autor: 'Andrzej',
    data: 'grudzień 2025',
  },
  {
    tekst: 'Do Artura zaprowadziła mnie chęć szybszego, efektywniejszego i&nbsp;zdrowszego biegania. Już po trzech zajęciach czułem, że (…) moje myślenie i&nbsp;zachowania związane z&nbsp;ruchem się poprawiają.',
    autor: 'Dariusz',
    data: 'marzec 2023',
  },
];

export const PYTANIA = [
  {
    q: 'Czy to masaż albo fizjoterapia?',
    a: 'To lekcja ruchu. Masaż pracuje z&nbsp;mięśniami, a&nbsp;fizjoterapia zwykle daje ćwiczenia do wykonania. Tu prowadzę ruch dotykiem, a&nbsp;Ty uczysz się zauważać, jak go robisz. Nie diagnozuję i&nbsp;nie leczę.',
  },
  {
    q: 'W co się ubrać?',
    a: 'W wygodne ubranie, w&nbsp;którym możesz leżeć, siedzieć i&nbsp;chodzić. Pracujemy bez butów.',
  },
  {
    q: 'Czy muszę być sprawny albo sprawna?',
    a: 'Nie. Ruch jest mały i&nbsp;powolny, tylko tyle, ile jest łatwe. Zaczynamy od tego, jak ruszasz się teraz.',
  },
  {
    q: 'Ile sesji potrzebuję?',
    a: 'Jedna sesja dużo pokazuje. A&nbsp;głębsza zmiana trwa dłużej, bo dotyczy tego, jak organizujesz siebie w&nbsp;działaniu. Umawiasz się na jedną sesję, bez karnetu.',
  },
  {
    q: 'Jak odwołać albo przełożyć sesję?',
    a: 'Termin zmieniasz albo odwołujesz online, najpóźniej 24 godziny przed sesją. Potwierdzenie z&nbsp;plikiem do kalendarza dostajesz mailem, a&nbsp;przypomnienia dzień i&nbsp;dwie godziny wcześniej.',
  },
];

/** Dopisuje do linków Pracowni, z którego wariantu przyszła rezerwacja (Pracownia może to zignorować). */
export function zrodlo(slug: string) {
  return slug ? `sesja-${slug}` : 'sesja';
}

export function zParametrem(url: string, slug: string) {
  try {
    const u = new URL(url);
    u.searchParams.set('zrodlo', zrodlo(slug));
    return u.toString();
  } catch {
    return url;
  }
}
