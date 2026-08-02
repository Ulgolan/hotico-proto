# HOTICO — STATE MAP v1.0
**Sealed 2026-08-01 · Authored by the Tower from ACP's annotated walkthrough · ACP's word overrides all**

This document is the interaction spec. The Figma file shows *what screens look like*; this file records *how they behave*. Every "designed state" listed here must be reachable through its intended interaction (Polaris success criterion #1).

---

## GLOBAL LAWS

- **Logo law:** the new **HOTICO RESTAURATION INSTITUTE** lockup supersedes every frame and the style guide (which still say DERMOPIGMENTATION). Deviation ratified by ACP 2026-08-01. Black lockup on light grounds, white lockup on Cocoa. H kintsugi symbol = favicon.
- **Type law:** Raleway (headlines SemiBold/Bold, subheads Medium) + DM Sans (body). Per brand guide v1.1, always. Poppins in old Figma tokens = drift, ignore.
- **Color law:** tokens.css only. Ivory/Cocoa/Gold 40/40/15, Hotico Pink 5% — accents, CTAs, signal only. Cocoa never on black.
- **Two expansion philosophies, deliberate:**
  - **Abundance mode** — several items may sit open at once; no friction, show as much as possible. Applies to: homepage Servicii dropdowns, Preț collapsible rows.
  - **Focus mode** — one item claims the stage, others recede. Applies to: Pașii cards, Services-page FAQ accordions. ("One is to show off, the other is to concentrate" — ACP.)
- **Honest facades:** every non-functional action routes somewhere real (tel:, mailto:, WhatsApp, Instagram). Nothing dead-ends silently.
- **Typo law:** the proto fixes obvious typos from the frames ("Confoirmare", "contactea-za ma", duplicated pregnancy question); each fix gets a LEDGER line.
- **Dead-end pattern:** the five undesigned services (Alopecie, Sprâncene, Eyeliner, Cicatrici, Buze) reuse the Areola template shell with an elegant "în curând" state. Same for any unbuilt destination.
- **RO language switcher:** visual only, inert (no EN content exists).
- **noindex, nofollow:** every page, every lap, permanent.

---

## HOMEPAGE (film: frame A = at rest · frame B = engaged states)

1. **Header** — logo, burger (→ menu overlay), RO switcher (inert).
2. **Hero** — marble kintsugi torso, tagline "Pielea: singurul tău veșmânt.", social icons → Alexa's real profiles (live links).
3. **Video block** — Vimeo embed (live), "3mn" badge. **Carousel of 3 videos**: swipe or arrows; the whole block (title + video + description) travels as one unit.
4. **Servicii list** — six pills, each a **dual-action component**:
   - Pill body (image + label) = button → navigates to that service's page.
   - Gold arrow = dropdown trigger → expands inline Before/After work sample beneath the pill.
   - Open-state costume: corners go rounded → square-ish, gold arrow flips up. **Abundance mode** — several may be open.
   - The Before/After sample is a **draggable comparison slider** (drag the ||| handle to reveal before/after).
5. **Pașii transformării** — three cards (Consultanță / Procedură / Întreținere), each with drop arrow. **Focus mode**: opening one hides the other two and expands the full numbered walkthrough (1. Alege serviciul → 2. Fă o programare → 3. Vei primi o confirmare) with descriptions; the gold bar with up-arrow collapses back to the three cards.
6. **Programare form** — always-on, multi-step, "Pasul Următor". Full behavior in CONTACT section below. Lives on homepage and service pages.
7. **Reviews** — static cards for now; **intended behavior: horizontal swipe carousel** (same gesture vocabulary as videos) once >2 reviews exist. Duplicate "Marina" = content debt (DOSSIER).
8. **Footer** — white lockup on Cocoa. Content pass pending (see DOSSIER: footer spec incl. ANPC/SOL legal links).

## MENU / CONNECT / PAROLA (overlays)

- Burger → menu overlay (drawn on frame A's body — overlays sit on whatever is beneath).
- Connect → login entry facade; Parola → password step facade. No real accounts in proto; buttons route honestly (mail/WhatsApp).

---

## CONTACT (3 steps, multi-step form)

**Step 1 — Date personale:** Nume, Prenume, Telefon (RO prefix), E-mail, GDPR checkbox + anulare commitment. (Only optional fields get labels; "obligatoriu" everywhere = noise — see DOSSIER for v2.)

**Step 2 — Programare:** appointment widget (days/hours) — **static plausible facade** in proto; "unavailable" behavior undecided (greyed vs. "Alexa te contactează") — parked. "Vrei și altă procedură?" radio block ships as designed; convicted as redundant on service pages (DOSSIER exhibit A).

**Step 3 — Particularități** (progressive disclosure engine):
- Chirurgie în zona vizată? → Când? → **sub 12 luni** triggers pink warning + "Câte luni exact?"
- Chimio/radio? → same pattern, **6 luni** threshold.
- Afecțiuni: dermatită / eczeme / psoriazis / alte → "spune-mi mai specific" free text.
- Herpes activ; sarcină/alăptare (**once** — frame duplication was a ghost, killed).
- Free-text "evaluare online" fallback + photo upload (visual placeholder in proto).
- Back chevron + Confirmare (spelling fixed).

**Disqualifier law (Alexa's medical rule):** the 12-luni threshold applies **only to paramedical breast dermopigmentation (Areola/Mamelon)** — procedure-conditional. **Firm rule, gentle voice:** the rule never bends, the delivery never bruises. Warn + keep a path open ("lasă-ne datele, te contactăm când pielea e pregătită"). Never a cold dead-end.

**Confirmation state:** pink check, success copy, urgency contacts **Mail / WhatsApp** (real links — honest-facade law born in the mockup itself), account pitch "Crează un cont pe hotico.ink" (facade, routes honestly).

---

## SERVICES TEMPLATE (one suit, six services; Areola built fully)

- **Services menu** — horizontal nav of all six, active underlined, jumps between service pages.
- **Top video** — the stage. General procedure video (Vimeo, live) plays by default.
- **Tab menu** — Detalii / Preț / Galerie. Gold pill slides to active tab; content below swaps.

**Detalii** — 6 numbered FAQ accordions (Descriere / Oare doare? / Ce pigmenți? / Rezistența / Înainte de procedură / După procedură). **Focus mode.** Each opens to description + play button. **Jukebox law:** play swaps the top video to that section's episode + **smooth-scrolls to the player**; closing an accordion **never** changes the video — the stage keeps the last-played record. "Află mai multe cu AI" in frames = copy ghost, deleted.

**Preț** — Preț întreg (2000 ron + includes) with **Programare** CTA; **Preț cu cont client** collapsible (1700 ron + includes) with **Crează cont client** CTA; **Retușuri** collapsible (includes + tiers: 1 lună 400 / 12–24 luni 600 / >24 luni 800) with **Programare retuș** CTA. **Abundance mode** (comparison territory). **All Programare CTAs smooth-scroll to the always-on form below** — no payments anywhere (consultation-first model). The frame missing the Retușuri row = error; build it everywhere. Cont-client discount ships as designed pending Alexa's ruling (DOSSIER).

**Galerie** — intro copy (the "curajoase femei, ca tine" line is **protected**, no copy pass may touch it), 3×3 curated grid, **lightbox**: tap → full-screen on dark, swipe between, pinch/double-tap zoom, X/swipe-down closes. Instagram outlink block → **SkinartHub** profile (site curates, Insta accumulates). Gallery imagery held pending consent confirmation (LEDGER).

---

## PARKED

- **Product Mamelon** — new service, future home undecided (link from Areola, possibly own landing page). Not in proto scope. Own reel when Alexa decides.
- **EN language** — no designed content.
- **Education/Institute audience** (PMU artists, per brand guide) — future site section, undesigned.
