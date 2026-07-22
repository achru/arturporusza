// Centralna konfiguracja strony. Pola oznaczone TODO uzupełnij przed startem.

export const SITE = {
  url: 'https://arturporusza.pl',
  name: 'Artur Porusza',
  title: 'Artur Porusza — ruch jako sposób uczenia się',
  description:
    'Warsztaty, cykle i wyjazdy oparte na metodzie Feldenkraisa. Zasoby na spotkanie z niepewnością: od niejasności do klarowności. Gdańsk i online.',
  locale: 'pl_PL',
};

export const CONTACT = {
  email: 'kontakt@arturchruszcz.pl',
  instagram: 'https://instagram.com/artur_porusza',
  youtube: '', // TODO: link do kanału YouTube (pusty = link nie wyświetla się)
  platforma: 'https://feldenkraisonline.pl',
  sesjeLink: '', // link do umawiania sesji (np. kalendarz rezerwacji); pusty = przycisk otwiera e-mail
  city: 'Gdańsk',
};

// MailerLite. Skąd wziąć identyfikatory: MailerLite → Forms → Embedded forms →
// utwórz formularz → w wygenerowanym kodzie znajdziesz adres:
// https://assets.mailerlite.com/jsonp/123456/forms/987654321/subscribe
// Pierwsza liczba to accountId, druga to formId.
// Dopóki pola są puste, formularz pokazuje komunikat z prośbą o maila.
export const MAILERLITE = {
  accountId: '', // TODO
  formId: '', // TODO
};

// Dane JDG do stopki i polityki prywatności.
export const LEGAL = {
  owner: 'Artur Chruszcz',
  company: '', // TODO: pełna nazwa działalności z CEIDG
  nip: '', // TODO
  address: '', // TODO: adres siedziby
};
