---
name: Artur Porusza
description: A quiet informational home drawn with one ink line — paper, ink, and a sanguine accent for anything alive.
colors:
  paper: "#fbfaf7"
  ink: "#1d1b17"
  ink-soft: "#575349"
  sanguine: "#9c4231"
  hairline: "rgba(29, 27, 23, 0.16)"
typography:
  display:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.9rem, 4.6vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.35rem, 2.6vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  subtitle:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.35
  title:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.18
  body:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.68
  small:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "0.95rem"
    fontWeight: 400
  label:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "0.9rem"
    fontWeight: 400
  micro:
    fontFamily: "Literata Variable, Georgia, Times New Roman, serif"
    fontSize: "0.8rem"
    fontWeight: 400
  logo:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  base: "2px"
spacing:
  pad: "clamp(1.25rem, 5vw, 2rem)"
  section: "clamp(3rem, 7vw, 4.5rem)"
components:
  logo-lockup:
    textColor: "{colors.ink}"
    typography: "brand exception: Helvetica Neue/Arial caps 0.95rem, letter-spacing 0.08em"
    note: "ARTUR ⟨brain mark⟩ PORUSZA; mark is Znak.astro (traced from the original logo), currentColor, height 2.1em; also the favicon"
  link:
    textColor: "{colors.ink}"
  link-hover:
    textColor: "{colors.sanguine}"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.sanguine}"
  newsletter-input:
    textColor: "{colors.ink}"
    padding: "0.5em 0.1em"
  newsletter-button:
    textColor: "{colors.ink}"
    padding: "0.5em 0.1em"
  newsletter-button-hover:
    textColor: "{colors.sanguine}"
---

# Design System: Artur Porusza

## Overview

**Creative North Star: "One Ink Line"**

The whole site behaves like a figure study on paper: warm paper white, warm near-black ink, and one continuous drawn line (`--kreska`) that rises out of the page rule to become a reclining figure — the classic ATM lesson position — and returns to being a rule. Everything else is reading matter set in a single serif family at a single narrow measure. The world deliberately refuses the practitioner-site default: no pastel hero, no CTA buttons, no card grids, no urgency chips. Reading and finding replace persuading.

Color is almost entirely achromatic. The one accent, a sanguine red-chalk (`--akcent`), is reserved for links and live markers — the things a hand would touch or a teacher would circle. Photography is grayscale, so images live in the same ink-on-paper material as the type and the drawn line. Depth, elevation, and motion are all near-zero: the page is flat, still, and structured by hairline rules.

**Key Characteristics:**
- Paper-and-ink palette with a single sanguine accent, used only where something is interactive or alive
- One type family (Literata, optical axis) carrying the entire hierarchy via size, weight, and italic
- One narrow reading column (44rem) — no grids, no cards, no sidebars
- Two line weights only: the 2.25px drawn stroke (expressive) and 1px hairlines (structural)
- Grayscale photography; flat surfaces; a single load-time drawing animation as the only motion

## Colors

An achromatic ink-on-paper world with one warm chalk accent; sanguine's rarity is the point.

### Primary
- **Sanguine** (#9c4231): the red-chalk of figure studies. Appears only as link underlines, hover text color, live status text ("ostatnie miejsca"), focus outlines, and the selection tint (`rgba(156, 66, 49, 0.18)`). Never used as a background, fill, or decoration.

### Neutral
- **Paper** (#fbfaf7): the only background color on the site. There are no alternate surface tints or section bands.
- **Ink** (#1d1b17): warm near-black. Body text, headings, the drawn figure stroke, and the newsletter input's writing line.
- **Ink Soft** (#575349): secondary voice — leads, descriptions, metadata, nav links, footer text. Carries most supporting prose.
- **Hairline** (rgba(29, 27, 23, 0.16)): structural paper rules — section separators (`.sekcja-krecha`), list-row dividers, note rules. Always 1px.

### Named Rules
**The Sanguine Rule.** The accent appears only on links and live markers (status text, focus, selection). It is never a surface, never a heading color, never decoration. If a new element wants sanguine, ask whether it is interactive or carrying live information; if not, it stays ink.

**The Two Inks Rule.** Prose speaks in two voices only: Ink for what the visitor came to read, Ink Soft for everything supporting it. No grays are invented between them.

## Typography

**Display Font:** Literata Variable, optical axis (fallback Georgia, Times New Roman, serif)
**Body Font:** the same Literata Variable — one family at every size

**Character:** A bookish, warm serif whose optical axis does the work a second family usually would: large sizes read as drawn letterforms, small sizes as quiet print. Italic (the true opsz-italic face) is the emphasis voice — used inside headings (`h1 em` at weight 450), for the logo, placeholders, subtitles, and the footer motto. Old-style numerals throughout (`font-variant-numeric: oldstyle-nums`), which matters on a site whose core content is dates.

### Hierarchy
- **Display / h1** (500, clamp(1.9rem, 4.6vw, 2.6rem), 1.18, -0.01em, `text-wrap: balance`): the one prose statement in the hero. Modest for a display size — a sentence, not a slogan.
- **Headline / h2** (500, clamp(1.35rem, 2.6vw, 1.6rem), 1.18): section titles, single words ("Terminy", "O mnie").
- **Title / h3** (600, 1.0625–1.2rem, 1.35): event titles and inline headings; in Terminy rows the title is itself the link.
- **Body** (400, 1.0625rem, 1.68): base reading text; supporting prose in Ink Soft at 58–65ch max measure.
- **Label** (400, 0.8–0.98rem): nav links (0.9rem), metadata (0.85rem), legal small print (0.8rem). Never uppercase, never letterspaced.

### Named Rules
**The One Family Rule (exception: the logo lockup keeps its original brand grotesk — Helvetica Neue stack — as an imported brand asset).** Every glyph on the site is Literata. Hierarchy comes from optical size, weight (400/450/500/600), and italic — never from a second family, uppercase, or tracking.

**The No Kicker Rule.** No kickers, eyebrows, or small-caps section labels anywhere. A section is introduced by its h2 and nothing above it.

## Layout

One narrow reading column: `.wrap` at max-width 44rem (`--maxw`), centered, with inline padding `clamp(1.25rem, 5vw, 2rem)` (`--pad`). Every section uses the same wrap; nothing breaks out full-bleed except the drawn line, whose SVG spans the column edge-to-edge.

Vertical rhythm is section-based: `padding-block: clamp(3rem, 7vw, 4.5rem)` per section, with each section after the hero opening on a 1px hairline (`.sekcja-krecha`). Within sections, lists (Terminy) use hairline-divided rows; at ≥561px a row becomes a two-column grid (`11rem minmax(0, 1fr)`) with the date column as the scanning anchor. The single responsive breakpoint in use is 560px: below it, row grids and the photo/text flex layouts stack, and the figure SVG switches to a fixed 108px height so the figure doesn't shrink with the viewport.

The header is a slim static bar (name + text links), not fixed, not sticky. Smooth scroll for anchor navigation, disabled under reduced motion; sections carry `scroll-margin-top: 2rem`.

## Elevation & Depth

No shadows, no layering, no z-axis at all. The site is one flat sheet of paper; structure is conveyed entirely by 1px hairline rules and whitespace. Nothing floats, nothing overlaps, and no element is fixed over content.

### Named Rules
**The Flat Paper Rule.** No box-shadows, no overlays, no fixed or sticky elements, and never `backdrop-filter` (it froze Chrome's compositor on fixed nav in a prior build — see PRODUCT.md). If an element seems to need elevation, it belongs in the flow instead.

## Shapes

The form language is the line, not the box. Two stroke weights exist and only two: the expressive drawn stroke `--kreska` (2.25px, round caps and joins, `vector-effect: non-scaling-stroke`) for the hero figure and the footer signature loop, and 1px hairlines for every structural rule. Corners are essentially square — `--radius: 2px` softens only photos and focus outlines. No borders around content blocks, no pills, no chips; the newsletter input is a bare writing line (border-bottom only, radius 0).

**The One Stroke Rule.** `--kreska` (2.25px) is the only weight for expressive drawn SVG lines. Any new drawn mark uses it exactly; anything structural is a 1px hairline. A third line weight does not exist.

## Components

### Links
- **Default:** ink text with a 1px sanguine underline (`text-underline-offset: 0.18em`); hover turns the text sanguine. Transition 0.18s ease on color and underline color.
- **Quiet variant (`.cichy-link`):** navigational/structural links carry no underline at rest and underline only on hover — used for the logo and header nav.
- **Focus:** 2px solid sanguine outline, 3px offset, 2px radius — shared by links, buttons, and inputs.
- Links are the only call to action in the world. There are no button-shaped CTAs.

### Navigation
- Slim static header: italic logotype (500, 1.0625rem) left, quiet text links (0.9rem, Ink Soft, hover sanguine) right, baseline-aligned, wrapping on narrow screens. No background, no border, no fixed positioning, no mobile menu.
- Legacy anchor ids `#zajecia` and `#kalendarz` are preserved as invisible anchors inside the Terminy section — old inbound links must keep landing.

### Terminy rows (signature list)
- Hairline-divided `<ol>` rows; date column (500, oldstyle nums) as scanning anchor, event title as an h3-weight link, description in Ink Soft at 60ch.
- **Status line:** sanguine italic (0.88rem), rendered only when the status carries live information (deadline, last places, sold out). No status text otherwise — absence is the default state.

### Inputs / Newsletter form
- Email input is "writing on a line": transparent background, no border except a 1px ink border-bottom, radius 0, italic Ink Soft placeholder.
- Submit is a text button styled exactly like a link (serif 500, sanguine underline, hover sanguine); disabled state drops to 0.5 opacity.
- Messages: success in ink italic, error in sanguine (0.9rem).

### Photography
- All photos: `filter: grayscale(1) contrast(1.04)`, 2px radius, fixed aspect (portrait 4/5), object-fit cover. Photographs are ink-wash material, never color.

### The Drawn Figure (signature component)
- One continuous SVG path: the page rule rises into a reclining figure (on the back, knees bent) and returns to a rule. Stroke: ink, `--kreska`, round caps/joins, non-scaling.
- Draws itself once on load via stroke-dashoffset (2200ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 250ms delay). Under `prefers-reduced-motion` or without JS it is simply already drawn.
- The footer closes with the same line ending in a small signature loop, same stroke, undrawn (static).

## Do's and Don'ts

### Do:
- **Do** set everything in Literata Variable; make hierarchy with optical size, weight (400–600), and italic only.
- **Do** keep all content inside the single 44rem `.wrap` column and open new sections with a 1px hairline (`.sekcja-krecha`).
- **Do** style every call to action as a text link (sanguine underline, hover sanguine); the quiet `.cichy-link` variant is for structural navigation only.
- **Do** render photos with `filter: grayscale(1) contrast(1.04)` and 2px radius, always.
- **Do** use `--kreska` (2.25px, round caps) for any drawn SVG mark and 1px `--linia` for any structural rule — nothing in between.
- **Do** show status text only when it carries live information, and set it in sanguine italic.
- **Do** honor `prefers-reduced-motion`: the drawn figure appears pre-drawn; smooth scroll turns off.

### Don't:
- **Don't** add buttons, cards, chips, badges, pastel surfaces, or urgency UI — the world refuses the practitioner-site default.
- **Don't** use sanguine as a background, heading color, or decoration; it belongs to links and live markers only.
- **Don't** add kickers, eyebrows, uppercase labels, or letterspaced small caps.
- **Don't** use shadows, fixed/sticky positioning, or `backdrop-filter` anywhere (documented Chrome compositor freeze on fixed elements).
- **Don't** add scroll-triggered reveal animations; the figure drawing itself once on load is the only motion in the world.
- **Don't** introduce a second font family, a second accent color, or a third line weight.

## Surface exception: /sesja (ad landing)

`/sesja/` and its variants (`/sesja/cos-wraca/`, `/schody/`, `/sport/`, `/skreslone/`) take paid Meta traffic and have one job: a booked first session. They keep this world (paper, ink, ink-soft, hairlines, Literata, the 2.25px drawn line, sanguine only for live things) and break five rules on purpose. Do not "fix" them back without reading `docs/sesja-landing.md`.

- **Colour photography** in the ads' warm-film grade (look B from `fi-reklama/build/grade.py`), not grayscale: the visitor arrives from a colour video of the same session.
- **Buttons:** free slots are 1px-bordered time buttons (`--linia-mocna`, ≥ 3:1) and there is one solid ink CTA. Sanguine stays off surfaces: hover/focus borders, the slot status line and the red-pen strike only.
- **One fixed element:** a mobile booking bar, opaque paper with a top hairline, never `backdrop-filter`; it hides at the booking block.
- **A larger display ramp** (`--t-display*` in `src/styles/sesja.css`), because the h1 is the ad's own sentence and must land in five seconds.
- **Literata subset** served as `'Literata Sesja'` (Polish glyphs, wght 400–600, opsz 12–72, ≈ 97 KB) for in-app browsers on 4G. Same face, different file.

Signature for this surface: the step list is a lesson plan (minute column, margin notes, a ruled `50 min razem` total) and the paper line stands up and walks at the end, in one smooth silhouette.
