# Landing `/sesja`: sesje indywidualne (Integracja Funkcjonalna)

Strona pod ruch z reklam Meta (FB/IG, Trójmiasto). Zastępuje w reklamach starą
`/indywidualnie/` (ta zostaje nietknięta). Jeden szablon, pięć adresów: każdy
wariant zaczyna się zdaniem z reklamy, która na niego kieruje.

Pomiar, od którego to się zaczęło (15–20.10.2026): 659 kliknięć w reklamę → 457
wczytań strony → ~3 wejścia do kalendarza → 1 wybrany termin → 0 maili. Diagnoza:
strona mówiła co innego niż reklama, była długa (13,5 ekranu), twarz, cena
i miejsce pojawiały się późno, a jedynym ruchem była rezerwacja za 250 zł.

## Adresy

| Adres | Reklama | Nagłówek (h1) / dopowiedzenie | Zdjęcie w pierwszym ekranie |
| --- | --- | --- | --- |
| `/sesja/` | ruch ogólny, linki | „Lekcja ruchu poprzez dotyk.” / „Ja poruszam. *Ty zauważasz.*” | `stojac`: praca na stojąco, dłonie na plecach |
| `/sesja/cos-wraca/` | v8 „Coś wraca” | „Coś wraca od miesięcy.” / „Nie diagnozuję. Uczę zauważać, *co robisz ze sobą w ruchu.*” | `oczy`: stoi z zamkniętymi oczami (pierwsze ujęcie v8) |
| `/sesja/schody/` | v9 „Schody” | „Chodzenie po schodach. Spacer. Sięganie po kubek.” / „Sprawność, *która zostaje na dłużej.*” | `spacer`: chodzenie po lekcji (ujęcie „Spacer.” z v9) |
| `/sesja/sport/` | v10 „To samo” | „Biegasz, pływasz, tańczysz, śpiewasz, wspinasz się?” / „Jak możesz to robić *z mniejszym wysiłkiem?*” | `reka`: uniesiona ręka, śmiech (drugie ujęcie v10) |
| `/sesja/skreslone/` | v1 „Skreślone” | „To ~~masaż.~~ *lekcja ruchu.*” / „Ja poruszam. *Ty zauważasz.*” | `lopatka`: dłonie na łopatce (pierwsze ujęcie v1, ten sam kadr co w reklamie) |

- Warianty mają `<link rel="canonical" href="https://arturporusza.pl/sesja/">` i nie trafiają do `sitemap-0.xml` (filtr w `astro.config.mjs`).
- Każdy ma własny `<title>`, opis i obrazek OG (`public/sesja/og/*.jpg`, 1200×630).
- `?hero=b` na dowolnym adresie pokazuje drugi wariant pierwszego ekranu („konspekt”: duży nagłówek, mały kadr 4:5 obok faktów). Do porównania, nie do reklam.
- Na schodach i sporcie pierwszym ujęciem reklamy była praca z nogą (IMG_5024). W pasku 390 px nie da się w nim zmieścić twarzy i dłoni naraz, dlatego są tam ujęcia, nad którymi w tych samych reklamach stoją kolejne napisy („Spacer.”, „Jak możesz to robić…”).
- „Skreślone” celowo zostaje przy kadrze z łopatką, który wygląda jak masaż: na nim stoi w reklamie v1 napis z przekreśleniem i to jest ten żart. Pozycje siedząc i stojąc pokazuje sekcja przebiegu.

## Układ strony

1. **Pierwszy ekran** (390×844 bez przewijania): logo i „Masz pytanie?”, zdanie z reklamy, dopowiedzenie kursywą, zdjęcie na całą szerokość (wolny najazd 16 s jak w reklamie, wyłączony przy ograniczonym ruchu), jedno zdanie o tym, czym jest sesja, linijka faktów „50 minut · 250 zł · Gdańsk Wrzeszcz”, trzy najbliższe godziny jako przyciski, atramentowy przycisk „Umów sesję”, link „Masz pytanie? Napisz na Instagramie albo mailem.”
2. **Jak wygląda pierwsza sesja**: konspekt lekcji. Kolumna minut (10 + 5 + 30 + 5, za starą stroną `/indywidualnie/`), uwagi na marginesie (na telefonie pod krokiem), trzy kadry „leżąc · siedząc · stojąc”, wiersz „50 min razem”, w którym linia papieru wstaje i idzie (rysuje się raz, gdy wejdzie w widok).
3. **Artur Chruszcz**: twarz, podpis, dwa zdania z biogramu, link do `/o-mnie/`, trzy fragmenty opinii z Booksy (cięcia oznaczone „(…)”), link do `/opinie/`.
4. **Pytania**: pięć natywnych `<details>`.
5. **Umów pierwszą sesję**: fakty, do 5 terminów pogrupowanych w dni, „Zobacz wszystkie terminy”, zasady Pracowni wprost, kontakt (Instagram, e-mail) i wzmianka o sesjach online.
6. Stopka strony (bez pierwszego rzędu linków, bo kontakt jest tuż nad nią).
7. **Pasek na telefonie**: „Najbliższy wolny termin · pon. 2.11 · 12:00” + „Umów sesję”. Wysuwa się, gdy przycisk z pierwszego ekranu zniknie u góry, chowa przy bloku zapisów. Kryjące tło, bez `backdrop-filter`.

Telefon 390×844: 4018 px = 4,8 ekranu, w tym 220 px stopki (bez niej 4,5). Cel „~4 ekrany” nie jest w pełni osiągnięty; zostały wszystkie wymagane treści. Przy niskim oknie (do 760 px, typowe dla przeglądarki w aplikacji FB/IG) pierwszy ekran się zagęszcza: na 390×700 terminy i przycisk zostają w widoku.

## Kontrakt z Pracownią: wolne terminy

Landing czyta terminy w przeglądarce. Endpoint jeszcze nie istnieje; dopóki go nie ma,
strona pokazuje stan „błąd” (zdanie o kalendarzu i przycisk „Zobacz wolne terminy”), więc
można ją wdrożyć wcześniej.

### Zapytanie

```
GET https://pracownia.arturporusza.pl/api/terminy/feldenkrais-indywidualnie-gdansk?ile=6
Accept: application/json
```

- `ile`: ile najbliższych wolnych startów zwrócić (1–12, domyślnie 3). Landing prosi o 6: pierwszy ekran pokazuje 3, blok zapisów 5.
- Bez ciasteczek i nagłówków autoryzacji (`credentials: 'omit'`), więc to proste żądanie CORS bez preflightu.
- Landing czeka 2,5 s. Później albo przy statusie ≠ 200 przechodzi w stan „błąd”.

### Odpowiedź 200

```json
{
  "usluga": "feldenkrais-indywidualnie-gdansk",
  "terminy": [
    {
      "start": "2026-11-02T12:00:00+01:00",
      "koniec": "2026-11-02T12:50:00+01:00",
      "url": "https://pracownia.arturporusza.pl/rezerwacja/feldenkrais-indywidualnie-gdansk?from=2026-11-02&termin=2026-11-02T12%3A00%3A00%2B01%3A00",
      "etykieta": "pon. 2.11 · 12:00"
    }
  ],
  "wszystkie": "https://pracownia.arturporusza.pl/rezerwacja/feldenkrais-indywidualnie-gdansk?from=2026-11-02"
}
```

| Pole | Wymagane | Znaczenie |
| --- | --- | --- |
| `terminy[]` | tak | Tylko starty, które da się teraz zarezerwować (z uwzględnieniem minimalnego wyprzedzenia), rosnąco. Pusta lista jest poprawna. |
| `terminy[].start` | tak | ISO 8601 z przesunięciem, **czas warszawski** (`+01:00` zimą, `+02:00` latem). Landing bierze dzień i godzinę prosto z tego napisu, więc musi to być czas lokalny gabinetu, nie UTC. |
| `terminy[].url` | tak | Głęboki link do rezerwacji z wybraną godziną. Musi zaczynać się od `https://pracownia.arturporusza.pl/` (inaczej landing go odrzuci). |
| `terminy[].koniec`, `etykieta` | nie | Landing ich nie potrzebuje (etykiety liczy sam), ale mogą się przydać innym klientom. |
| `wszystkie` | nie | Kalendarz otwarty na miesiącu pierwszego wolnego terminu (dziś kalendarz otwiera się na pustym październiku). Landing podmienia nim wszystkie przyciski „Umów sesję” / „Zobacz wszystkie terminy”. Bez niego zostaje `CONTACT.sesjeLink`. |

### Nagłówki

```
Access-Control-Allow-Origin: https://arturporusza.pl
Vary: Origin
Cache-Control: public, max-age=60, stale-while-revalidate=300
Content-Type: application/json; charset=utf-8
```

Na podglądy Netlify (`https://deploy-preview-*--<site>.netlify.app`) warto wpuścić też ich origin. Lokalnie landing używa atrapy, więc CORS dla localhost nie jest potrzebny.

### Głęboki link do rezerwacji (strona Pracowni)

- `from=YYYY-MM-DD`: kalendarz otwiera się na tym dniu/miesiącu.
- `termin=<start w ISO, zakodowany>`: ta godzina jest od razu wybrana; klient przechodzi do konta i potwierdzenia.
- Jeśli godzina zdążyła się zająć: kalendarz na `from` z krótkim komunikatem, bez błędu.
- `zrodlo=sesja | sesja-cos-wraca | sesja-schody | sesja-sport | sesja-skreslone`: landing dopisuje to do każdego linku do Pracowni (godziny, „Umów sesję”, pasek), żeby przy rezerwacji było widać, z którego wariantu przyszła. Pracownia może to zignorować albo zapisać przy rezerwacji.

### Zachowanie landingu (src/scripts/sesja.ts)

| Stan | Kiedy | Co widać |
| --- | --- | --- |
| ładowanie | od pierwszego malowania | spokojny szkielet trzech przycisków (bez migania), wysokość zarezerwowana, więc nic nie skacze |
| gotowe | lista niepusta | do 3 przycisków; gdy wszystkie są tego samego dnia, dzień stoi raz w linii statusu („pon. 2.11, za 13 dni”), na przyciskach same godziny |
| błąd | brak endpointu, CORS, status ≠ 200, zły format, > 2,5 s | „Kalendarz otworzy się w Pracowni, moim systemie zapisów.” i przycisk „Zobacz wolne terminy” do kalendarza |
| pusto | `terminy: []` | „W tej chwili kalendarz nie pokazuje wolnych terminów.”, a przyciski zmieniają się w „Napisz do mnie” (do kontaktu), bo kalendarz bez godzin to ślepa uliczka |
| bez JS | | link „Zobacz wolne terminy” i przycisk „Umów sesję” |

- Daleki termin mówi wprost: linia statusu w sangwinie „pon. 2.11, za 13 dni”. „dziś” i „jutro” zamiast daty, gdy pasuje.
- Zapytanie startuje w `<head>` (skrypt inline w `SesjaStrona.astro`), zanim wczyta się reszta strony.

## Analityka

Żadnych skryptów śledzących. Każdy link do rezerwacji i kontaktu ma `data-cta`:

`hero-termin` (z `data-termin=<start>`), `hero-umow`, `hero-wszystkie` (bez JS), `hero-instagram`, `hero-mail`, `naglowek-pytanie`,
`koniec-termin`, `koniec-umow`, `koniec-wszystkie`, `koniec-instagram`, `koniec-mail`, `pasek-umow`, `bio-o-mnie`, `opinie-wszystkie`;
przy pustej liście: `hero-napisz`, `koniec-napisz`, `pasek-napisz`.
`<main>` ma `data-wariant` (`domyslny`, `cos-wraca`, …) i `data-zrodlo`.

## Zdjęcia i pliki

Wszystkie kadry są z sesji z lutego–marca 2024 (ta sama klientka i ten sam gabinet co w reklamach), w kolorze „look B” z reklam
(`~/coding/fi-reklama/build/grade.py`: knee 0.4, shadows 0, black 0.045, white 0.95, sat 0.8, skin_sat 0.9, warm 0.045; ev 0.7 dla wideo, 0.95 dla IMG_5002, 0.25 dla zdjęć fotografa). Klatki z wideo obrócone `transpose=1`.

| Plik w `src/assets/sesja/` | Źródło (iCloud `sesje/…`) | Kadr |
| --- | --- | --- |
| `sesja-stojac-4x3.jpg`, `-4x5.jpg` | `sesja fi vid 2/IMG_5158.MP4` @ 13,5 s | praca na stojąco, dłonie na plecach |
| `sesja-oczy-4x3.jpg`, `-4x5.jpg` | `sesja fi vid 2/IMG_5156.MP4` @ 2,0 s | stoi z zamkniętymi oczami |
| `sesja-spacer-4x3.jpg`, `-4x5.jpg` | `sesja fi vid 2/IMG_5160.MP4` @ 24,3 s | chodzenie po lekcji, oboje się uśmiechają |
| `sesja-reka-4x3.jpg`, `-4x5.jpg` | `sesja fi vid 2/IMG_5156.MP4` @ 11,2 s | uniesiona ręka, śmiech |
| `sesja-lopatka-4x3.jpg`, `-4x5.jpg` | `sesja fi vid 1/IMG_5002.MP4` @ 1,2 s | dłonie na łopatce, leżenie na boku |
| `sesja-stojac-plecy-4x5.jpg` | `sesja fi vid 2/IMG_5158.MP4` @ 10,5 s | „stojąc” w pasku pozycji |
| `sesja-lezac-4x5.jpg` | `sesja wizerunkowa/Artur_gabinet-14.jpg` | „leżąc” |
| `sesja-siedzac-4x5.jpg` | `sesja wizerunkowa/Artur_gabinet-13.jpg` | „siedząc” |
| `sesja-artur-4x5.jpg` | `sesja wizerunkowa/Artur_gabinet-7.jpg` | portret w sekcji „Artur Chruszcz” |

- Astro robi z nich AVIF/WebP w kilku szerokościach (pierwszy ekran: 12–40 KB w AVIF).
- `public/sesja/og/{sesja,cos-wraca,schody,sport,skreslone}.jpg`: `node scripts/sesja-og.mjs` (Playwright, te same fonty i kadry 4:5).
- `src/fonts/literata-sesja-*.woff2`: Literata (OFL, `src/fonts/LICENSE-Literata.txt`) przycięta `pyftsubset` do polskich znaków i `fonttools varLib.instancer` do wght 400–600, opsz 12–72: 42 + 43 + 6 + 6 KB zamiast ~400 KB.
- Kadry robi `python3 scripts/sesja-kadry.py src/assets/sesja` (klatka z ffmpeg → LUT z `grade.py` → kadr w PIL; czasy i kadry w słowniku `ASSETS`). Można też po prostu wrzucić nowy JPG pod tą samą nazwą (4:3 min. 1800×1350, 4:5 min. 1440×1800). Po zmianie zdjęć: `node scripts/sesja-og.mjs`.

## Wydajność

Produkcyjny build, Chromium, profil iPhone 13 (390×844), zimna pamięć podręczna, dławienie przez CDP: 1,6 Mb/s w dół, 750 kb/s w górę, 150 ms opóźnienia, CPU 4×. Serwer lokalny z gzip, więc bez DNS i TLS (na prawdziwej sieci doliczyć ~0,5–0,7 s na nawiązanie połączenia).

| Adres | LCP (API działa) | LCP (API 404) | CLS | Przesłane | Żądania |
| --- | --- | --- | --- | --- | --- |
| `/sesja/` | 0,83 s | 0,80 s | 0 | 156 KB | 14 |
| `/sesja/cos-wraca/` | 0,76 s | 0,74 s | 0 | 152 KB | 14 |
| `/sesja/schody/` | 0,88 s | 0,87 s | 0 | 160 KB | 14 |
| `/sesja/sport/` | 0,74 s | 0,73 s | 0 | 151 KB | 14 |
| `/sesja/skreslone/` | 1,00 s | 1,00 s | 0 | 164 KB | 14 |

Elementem LCP jest zdjęcie z pierwszego ekranu (`fetchpriority="high"`). Fonty są wstępnie ładowane, JS strony to ~5 KB.

## Podgląd

- Serwer deweloperski: wpis `arturporusza-sesja` w `~/coding/.claude/launch.json` (`npm run dev -- --port 4330` w tym worktree), potem `http://localhost:4330/sesja/`.
- W `astro dev` terminy podaje atrapa (`scripts/sesja-atrapa-terminow.mjs`, hook `astro:server:setup`, w buildzie jej nie ma): stan kalendarza z 20.10.2026 (pon. 2.11 12:00/18:00/19:00, pt. 6.11 16:00/17:00, dalej poniedziałki i piątki).
- Stany do sprawdzenia: `?terminy=pusto`, `?terminy=blad`, `?terminy=wolno` (4 s, czyli po limicie), `?terminy=jutro`. Drugi pierwszy ekran: `?hero=b`.
- Build: `npm run build`, potem `npx astro preview`.

## Wyjątki od DESIGN.md

Opisane w DESIGN.md › „Surface exception: /sesja” i w PRODUCT.md: kolorowe zdjęcia w gradacji reklam, przyciski terminów i jeden atramentowy przycisk, przyklejony pasek na telefonie, większa skala nagłówków, podzbiór Literaty pod nazwą `Literata Sesja`. Reszta świata bez zmian.

## Do zrobienia i do decyzji (Artur)

- [x] **Adres gabinetu**: ul. Politechniczna 9/5, Gdańsk Wrzeszcz (`FAKTY.adres`, podany przez Artura 2026-10-20).
- [ ] **Zatwierdzić zdjęcia** (tabela wyżej), zwłaszcza `reka` na `/sesja/sport/` i `spacer` na `/sesja/schody/`, oraz kolor zamiast szarości.
- [ ] **Zatwierdzić skróty opinii** (Tomasz, Andrzej, Dariusz) i to, że są pokazane z imieniem i miesiącem.
- [ ] **Pracownia**: endpoint i parametr `termin` według kontraktu wyżej, CORS dla arturporusza.pl, opcjonalnie zapis `zrodlo`. Do tego czasu strona działa w stanie „błąd”.
- [ ] **Sprawdzić w Pracowni zasady, które cytuje strona**: zmiana/odwołanie online do 24 h przed, potwierdzenie z plikiem kalendarza mailem, przypomnienia dzień i 2 h przed, konto (e-mail, telefon, hasło).
- [ ] **Reklamy**: przestawić linki v1/v8/v9/v10 na `/sesja/skreslone/`, `/cos-wraca/`, `/schody/`, `/sport/` (dziś wszystkie idą na `/indywidualnie/`). Teksty reklam z „Szczegóły i zapisy: arturporusza.pl/indywidualnie” też.
- [ ] Zdecydować, co z `/indywidualnie/` (zostaje, przekierowanie 301 na `/sesja/`, czy link z jednej do drugiej) i czy strona główna (`Sesje.astro`) ma linkować do `/sesja/`.
- [ ] Wybrać pierwszy ekran: A (domyślny) czy B (`?hero=b`).
- [ ] „Sprawność, która zostaje na dłużej.” na `/schody/` to obietnica przeniesiona z reklamy v9: zostawić dla zgodności z reklamą albo złagodzić.
- [ ] Ceny 250 zł / 300 zł są wpisane w `src/data/sesja.ts`; `SESJE.cenaGdansk` w `config.ts` nadal jest puste (strona główna nie pokazuje ceny), do decyzji.
- [ ] Opcjonalnie: krótka pętla wideo w pierwszym ekranie (świadomie pominięta: odwiedzający właśnie obejrzał wideo, a zdjęcie jest LCP i waży 12–40 KB).
