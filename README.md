# arturporusza.pl

Strona główna praktyki ruchowej Artura - „ruch jako sposób uczenia się".
Astro, w pełni statyczna, zero backendu. Design: papier, atrament i cztery
semantyczne akcenty (morski = cykle, złoty = CTA, siena = warsztaty,
szałwia = wyjazdy), jak w materiałach „Można inaczej".

## Komendy

```sh
npm run dev       # dev server na :4321
npm run build     # produkcja do dist/
npm run preview   # podgląd builda
node scripts/shot.mjs http://localhost:4321 out.png 1280 800   # QA: pełnostronicowy zrzut
```

## Jak zarządzać stroną (3 rzeczy)

1. **Wydarzenia** - edytuj [src/data/wydarzenia.json](src/data/wydarzenia.json).
   `wyrozniony: true` → duża karta w „Zapisy trwają"; data w przeszłości →
   wpis znika (filtr przy buildzie + skrypt po stronie przeglądarki);
   `status` steruje kolorem plakietki („otwarte/wczesne" = złota,
   „ostatnie/brak" = ciemna); pusty `link` = przycisk otwiera e-mail.
   Aktualizacja = commit → deploy.
2. **Newsletter (MailerLite)** - wpisz `accountId` i `formId` w
   [src/config.ts](src/config.ts). Skąd wziąć: MailerLite → Forms → Embedded
   forms → w wygenerowanym kodzie adres
   `https://assets.mailerlite.com/jsonp/<accountId>/forms/<formId>/subscribe`.
   Dopóki puste, formularz pokazuje komunikat z adresem mailowym.
3. **Kontakt i linki** - e-mail, Instagram, YouTube, platforma, link do
   umawiania sesji oraz dane JDG: wszystko w [src/config.ts](src/config.ts).

## Struktura

- `src/layouts/Base.astro` - head, SEO, Open Graph, JSON-LD Person/Organization,
  skrypt reveal (progressive enhancement: bez JS wszystko widoczne)
- `src/components/` - Nav, Hero (linia rozgałęziająca się), Zapisy, Praktyka,
  Kalendarz (filtry), NewsletterPanel, OMnie, Sesje, Footer, NewsletterForm,
  Winietka (linie SVG typów wydarzeń)
- `src/lib/wydarzenia.ts` - sortowanie/filtrowanie wydarzeń przy buildzie +
  JSON-LD typu Event
- `src/styles/tokens.css` - tokeny współdzielone z podstronami kursów

## Do uzupełnienia przed startem (szukaj TODO w src/config.ts)

MailerLite accountId/formId · link YouTube · link do umawiania sesji ·
dane JDG (stopka + polityka prywatności) · przegląd przykładowych wydarzeń
w `wydarzenia.json` (daty/statusy/linki do potwierdzenia).

## Gotchas

- **Kompozytor Chrome w osadzonych webview** potrafi się zawiesić od:
  kafelka SVG `feTurbulence` jako background oraz `backdrop-filter: blur`
  na fixed nawigacji. Oba usunięte - nav ma kryjące tło rgba .95.
- Astro nie dokleja scope'u komponentu do klas przekazywanych w głąb dziecka -
  style dla elementów dzieci wymagają `.rodzic :global(.klasa)`.
- `<Image>` zawsze z `width` + `widths` - bez `width` fallback `src`
  generuje się w pełnym rozmiarze pliku (megabajty).
- Sekcje ukrywane do animacji tylko pod `html.js` - bez JS strona musi być
  w pełni widoczna.

## Deploy / SEO (plan migracji z arturchruszcz.pl)

Jeden site na Netlify, domena główna `arturporusza.pl`; stare subdomeny
`*.arturchruszcz.pl` jako aliasy z host-based 301 w `netlify.toml`;
Search Console: sitemap + Zmiana adresu; przekierowania zostają na stałe.
# arturporusza
