// Centralna konfiguracja strony. Pola oznaczone TODO uzupełnij przed startem —
// puste pola po prostu nie renderują się na stronie (nic nie zmyślamy).

export const SITE = {
  url: 'https://arturporusza.pl',
  name: 'Artur Porusza',
  title: 'Feldenkrais Gdańsk i online — zajęcia, warsztaty i sesje | Artur Porusza',
  description:
    'Warsztaty, cykle i indywidualne lekcje Feldenkraisa w Gdańsku i online. Ucz się poruszać z mniejszym wysiłkiem, zauważać więcej możliwości i łatwiej znajdować nowe rozwiązania.',
  locale: 'pl_PL',
};

export const CONTACT = {
  email: 'kontakt@arturchruszcz.pl',
  instagram: 'https://instagram.com/artur_porusza',
  youtube: '', // TODO: link do kanału YouTube (puste = link się nie wyświetla)
  platforma: 'https://feldenkraisonline.pl',
  sesjeLink: 'https://arturchruszcz.booksy.com', // link do umawiania sesji (np. kalendarz rezerwacji); puste = przycisk otwiera e-mail
  city: 'Gdańsk',
};

// Oferta dla nauczycieli ruchu (nav + sekcja „Znajdź swoją drogę").
export const NAUCZYCIELE_URL = '/kreatywnynauczyciel/';

// Sesje indywidualne — szczegóły. Puste pola się nie renderują.
export const SESJE = {
  czas: 'ok. 50 minut',
  cenaGdansk: '', // TODO: np. "250 zł" — bez danych wiersz ceny się nie pokazuje
  cenaOnline: '', // TODO
  cennikUrl: '', // TODO: alternatywnie link do cennika
};

// Bonus za zapis do newslettera. Puste = nie obiecujemy niczego, czego nie ma.
// TODO: potwierdź z Arturem, np. "Na start dostaniesz krótką lekcję audio do wypróbowania."
export const NEWSLETTER_BONUS = '';

// MailerLite. Skąd wziąć identyfikatory: MailerLite → Forms → Embedded forms →
// w wygenerowanym kodzie adres:
// https://assets.mailerlite.com/jsonp/<accountId>/forms/<formId>/subscribe
// Dopóki pola są puste, formularz pokazuje komunikat z prośbą o maila.
export const MAILERLITE = {
  accountId: '', // TODO
  formId: '', // TODO
};

// Dane JDG do stopki i polityki prywatności. Puste pola się nie renderują.
export const LEGAL = {
  owner: 'Artur Chruszcz',
  company: '', // TODO: pełna nazwa działalności z CEIDG
  nip: '', // TODO
  address: '', // TODO: adres siedziby
  regulaminUrl: '', // TODO: zasady zapisów i rezygnacji z wydarzeń (jeśli są)
};
