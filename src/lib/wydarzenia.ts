import dane from '../data/wydarzenia.json';
import { CONTACT } from '../config';

export interface Wydarzenie {
  typ: 'warsztat' | 'cykl' | 'wyjazd';
  tytul: string;
  podtytul?: string;
  data: string;
  dataTekst: string;
  miejsce: string;
  obietnica: string;
  opis: string;
  status: string;
  link: string;
  wyrozniony: boolean;
  nauczyciele: boolean;
}

export const NAZWY_TYPOW: Record<string, string> = {
  warsztat: 'Warsztat',
  cykl: 'Cykl',
  wyjazd: 'Wyjazd',
};

export const KOLORY_TYPOW: Record<string, string> = {
  warsztat: 'var(--akcent)',
  cykl: 'var(--blekit)',
  wyjazd: 'var(--lawenda)',
};

function czyPrzyszle(w: Wydarzenie): boolean {
  if (!w.data) return true;
  const koniec = new Date(`${w.data}T23:59:59`);
  return !Number.isNaN(koniec.getTime()) && koniec >= new Date();
}

/** Przyszłe wydarzenia posortowane po dacie (filtr liczony w momencie builda;
 *  dodatkowo mały skrypt na stronie chowa wpisy przeterminowane od builda). */
export const aktualne: Wydarzenie[] = (dane.wydarzenia as Wydarzenie[])
  .filter(czyPrzyszle)
  .sort((a, b) => (a.data < b.data ? -1 : a.data > b.data ? 1 : 0));

/** Karty „Zapisy trwają": maksymalnie dwie, pierwsza jest główna. */
export const wyroznione = aktualne.filter((w) => w.wyrozniony).slice(0, 2);

/** Filtry kalendarza — tylko te, które coś robią. */
export const aktywneFiltry: { klucz: string; etykieta: string; ile: number }[] = (() => {
  const filtry = [
    { klucz: 'wszystko', etykieta: 'Wszystkie', ile: aktualne.length },
    { klucz: 'warsztat', etykieta: 'Warsztaty', ile: aktualne.filter((w) => w.typ === 'warsztat').length },
    { klucz: 'cykl', etykieta: 'Cykle', ile: aktualne.filter((w) => w.typ === 'cykl').length },
    { klucz: 'wyjazd', etykieta: 'Wyjazdy', ile: aktualne.filter((w) => w.typ === 'wyjazd').length },
    { klucz: 'nauczyciele', etykieta: 'Dla nauczycieli', ile: aktualne.filter((w) => w.nauczyciele).length },
  ];
  return filtry.filter((f) => f.ile > 0);
})();

export function klasaStatusu(s: string): 'pilny' | 'otwarty' | 'neutral' {
  const t = (s || '').toLowerCase();
  if (t.includes('ostatni') || t.includes('brak')) return 'pilny';
  if (t.includes('otwar') || t.includes('przedsprzeda') || t.includes('wczesne')) return 'otwarty';
  return 'neutral';
}

export function linkWydarzenia(w: Wydarzenie): string {
  if (w.link) return w.link;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Zapis: ${w.tytul}`)}`;
}
