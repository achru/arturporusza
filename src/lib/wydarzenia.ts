import dane from '../data/wydarzenia.json';
import { CONTACT } from '../config';

export interface Wydarzenie {
  typ: 'warsztat' | 'cykl' | 'wyjazd';
  tytul: string;
  podtytul?: string;
  data: string;
  dataTekst: string;
  miejsce: string;
  opis: string;
  status: string;
  link: string;
  wyrozniony: boolean;
}

export const NAZWY_TYPOW: Record<string, string> = {
  warsztat: 'Warsztat',
  cykl: 'Cykl',
  wyjazd: 'Wyjazd',
};

export const KOLORY_TYPOW: Record<string, string> = {
  warsztat: 'var(--m3)',
  cykl: 'var(--m1)',
  wyjazd: 'var(--m4)',
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

export const wyroznione = aktualne.filter((w) => w.wyrozniony);

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
