# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Polish-speaking adults curious about the Feldenkrais Method — in Gdańsk (in-person) or anywhere (online). Two recurring profiles: people who sit a lot and want easier movement, and movement teachers / trainers interested in how Artur designs lessons. Returning participants come mainly to check current terminy (dates) and event details.

## Product Purpose

The quiet informational home of Artur Chruszcz's Feldenkrais practice (arturporusza.pl). A first-time visitor should quickly understand who Artur is, what the practice is and isn't, and find current events and individual-session information. A returning visitor should find dates in seconds. Success is comprehension and easy wayfinding — not conversion.

**Persona shift (confirmed 2026-07-30):** Feldenkrais is not "for sale" at this moment — it is something Artur does from love. The page presents information calmly; signup links remain but read as information, never as sales pressure.

## Positioning

Artur teaches learning, not exercises: lessons create conditions where you notice more options and choose better, instead of copying one correct form. Second leg in software engineering (systems that learn, notice errors, find other solutions). Thinking about learning is also informed by ACT (acceptance and commitment therapy) — explicitly *not* psychotherapy.

## Operating Context

- Events live in `src/data/wydarzenia.json` (single edit point; entries auto-hide after their date). Current: „Można inaczej" (roczny cykl, od 15.09.2026), „Przepływy" (wyjazd, Mazury, 26–29.11.2026), „Kreatywny Nauczyciel" (kurs dla nauczycieli, 2027).
- Individual sessions (Gdańsk + online, ~50 min) book via Booksy (`CONTACT.sesjeLink`); price fields intentionally empty.
- Cycles and online lessons live on FeldenkraisOnline.pl; teacher program at `/kreatywnynauczyciel/`.
- Newsletter via MailerLite (account/form IDs still TODO — form shows an email fallback message until filled).
- Astro 5 static site, deployed on Netlify. Subpages: `/o-mnie/`, `/polityka-prywatnosci/`.

## Capabilities and Constraints

- Static site, no backend; all interactivity is small inline scripts.
- **Never use `backdrop-filter` on the fixed nav** — SVG-noise + backdrop-blur combos have frozen the Chrome compositor on this site before (documented gotcha). Opaque backgrounds instead.
- Empty config fields (prices, NIP, regulamin, YouTube, MailerLite IDs) simply don't render — never invent values for them.
- No real testimonials exist yet. Decision (2026-07-30): do not show testimonials at all; also cut the stat grid, gold CTA buttons, status chips, and the sticky mobile CTA. Experience facts (13 lat, 500+ osób indywidualnie, 100+ warsztatów) are true and may appear as calm prose, not as a stat display.
- Screenshot QA via `scripts/shot.mjs` (Playwright).

## Brand Commitments

- Name: **Artur Porusza** (person: Artur Chruszcz). Line: „Od niejasności do klarowności."
- Language: Polish, in Artur's voice — concrete, observational, no motivational filler, no AI-phrases (full style guide: `~/coding/lekcje/artur_styl_pisania.md`).
- Confirmed direction constraint (user, 2026-07-30): minimal, typography-first, information-design-led, less flashy, trust-building. References volunteered: dhh.dk-style prose personal page, minimal designer portfolios, calm editorial blogs.
- Real photography exists and is good (`src/assets/photos/` — workshop and portrait shots).

## Evidence on Hand

- Real events with real dates, places, and external signup pages.
- Real photos of Artur teaching (5 files in `src/assets/photos/`).
- True experience facts: 13 years teaching, 500+ individual clients, 100+ workshops, kilkanaście wyjazdów.
- Absent (do not fabricate): testimonials, prices, YouTube channel, newsletter bonus, legal/company details.

## Product Principles

1. **Information over persuasion.** Links are information; nothing pushes. No urgency, no chips, no sticky CTA.
2. **Nothing invented.** Empty fields don't render; claims that can't be backed don't appear.
3. **Trust through specificity and calm.** Concrete sentences about what happens in a lesson beat adjectives and stat grids.
4. **Wayfinding first.** Terminy and sesje findable within seconds from the top of the page.
5. **The practice is personal.** The page reads like a person, not a business.

## Accessibility & Inclusion

Polish-language audience incl. older adults: comfortable text sizes, honest link affordances, semantic HTML, `prefers-reduced-motion` respected throughout.
