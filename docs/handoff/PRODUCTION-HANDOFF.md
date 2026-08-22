# PRODUCTION-HANDOFF — HOTICO

**Audience: Commander ↔ production developer only. Not client-facing.**

## 1. Snapshot / document authority

| | |
|---|---|
| Branch | `handoff-h2-draft` (cut from `handoff-h1-evidence-map`) |
| Commit SHA at authoring | `c90710c0d82ccf9a9d2370d65d26a67421225438` |
| Date of audit | 2026-08-22 |
| Working-tree state | Clean at branch time, except one untracked, uncommitted directory: `_ingest/` (an image-conversion staging area, `convert.py` + 6 PNGs). Outside this mission's scope; not inventoried. |
| Certified foundation | `docs/handoff/EVIDENCE-MAP.md` (Lap H-1, Tower-certified 2026-08-22) — this document's coverage index and conflict-register seed |
| This document's own status | Self-tested against §21 of the master prompt (see §19 of this doc); **not** certified. Certification is Lap H-3, a separate hostile-validation session, followed by Tower certification and the Commander's gate. |

This document is the **production contract**: what a developer must preserve, what they're free to change, and where the debt is. It is not a repository tour and not a rewrite of the prototype. Evidence labels used throughout: **OBSERVED** (current code does this), **INTENDED** (docs say it should), **VERIFIED** (test/QA-backed), **INFERRED** (strong reading, not explicit), **OPEN** (missing/contradictory evidence).

---

## 2. Executive production brief

HOTICO is a paramedical (dermopigmentation) practice's marketing and booking site. This repository is a **phone-playable interactive prototype** — an executable design specification, not a production codebase (`CLAUDE.md`). It exists to transfer Alexa's Figma storyboard and a subsequent desktop art-direction campaign into something a developer can play rather than read about. Its "backend" is a WhatsApp deep link; there is no real booking engine, no payments, no CMS, no accounts.

Production's job: reproduce the **approved experience** (the kintsugi-scroll hero, the responsive campaign, the honest-facade booking flow, the brand system) with real engineering — the developer owns architecture, build tooling, and framework choice entirely (§17). What they do not own: brand color/type/shadow values, the interaction contracts documented in §9–§10, or the copy (§11).

---

## 3. Experience north star

Two sealed briefs govern intent, in this order of authority for what each answers (Conflict **C1**, §20):

- **Mobile-first origin** (`docs/POLARIS.md`, sealed 2026-08-01): ship a live, phone-playable prototype "animating Alexa's Figma storyboard... faithfully enough that the site's intended behavior is understood by playing it, with no explanation needed." Primary audience: the webdev, so conversation goes straight to engineering. Non-negotiable: **honest facades** — every non-functional action routes somewhere real (WhatsApp/tel/mail); the proto can never silently lie to a visitor.
- **Desktop campaign** (root `POLARIS.md`, sealed 2026-08-04): "a fully art-directed desktop experience for homepage + areola — founded on a desktop design system that every current and future page inherits." Primary audience: the research-mode visitor weighing a paramedical decision or evaluating formation; desktop is the *credibility and trust surface*. Success test named directly: "one cold stranger reads the desktop site as credible, premium, trustworthy."

**Trust and honesty are the throughline.** Every facade (booking form, coming-soon pages, gallery placeholder) degrades to something real rather than a dead end or a lie. Production must preserve that posture even as it replaces the facades themselves with real functionality.

---

## 4. Product and interaction principles

- **Honest facades (INTENDED, `docs/POLARIS.md` NN1).** A non-functional action always routes somewhere real. OBSERVED in code: the booking form's only "backend" is a `wa.me` deep link (`js/form.js`); the 5 unbuilt service pages route to a WhatsApp/tel facade, not a 404 (`servicii/in-curand.html`); the gallery tab shows a plain-language "opens soon" placeholder rather than fake or stolen imagery (`servicii/areola.html:312-321`). **Production must keep this posture** even after building a real booking engine: a broken or loading state should never look finished, and should never claim to have submitted something it hasn't.
- **Brand is bedrock, composition is mold (INTENDED, root `POLARIS.md` NN3).** Canon (tokens, honest facades) is frozen except by Alexa-level ruling; layout, hierarchy, and motion are re-pourable. Read: color/type/shadow tokens and the facade-honesty rule are non-negotiable; how sections are laid out is not.
- **Facade law inside the form itself (OBSERVED, `js/form.js:1-3`).** Its own header states the law plainly: *"nothing validates, everything advances."* This is a deliberate prototype posture, not an oversight — see §9.1 for what production must build instead.
- **Native scroll as source of truth (VERIFIED, I7).** The hero engine never calls `preventDefault` and every scroll/touch/wheel listener is registered `{passive:true}` — confirmed by direct grep of `js/hero-scroll.js` (zero live `preventDefault` calls; two mentions only inside comments describing the rule itself). The hero augments scrolling; it never captures it.
- **Mobile changes only by ruling (INTENDED, root `POLARIS.md` NN1).** Mobile canon (≤767px) is frozen and alters only by explicit Commander ratification — a repo-governance rule, surfaced here because it explains why the mobile and desktop regimes in §5 read as two different eras of decision-making layered on the same markup.

---

## 5. Responsive regimes

Three tiers, confirmed directly in `css/main.css` and `css/tokens.css`:

| Tier | Range | Source | What changes |
|---|---|---|---|
| Mobile / base | 0–767px | `css/tokens.css:46-47` | `body{max-width:480px}` — the **mobile grace floor**, law below 768px (`CLAUDE.md`). No media query; this is the default state every other tier overrides. |
| Desktop grace floor | ≥768px | `css/main.css:1578-1598` | `body{max-width:none}`; `.hdr/.wrap/.svcnav` capped at `--column-read` (720px), centered; footer nav centers; Pasii cards go 3-across; closed service-card crop reverts to square + `scale(3)`. |
| Split tier | ≥1024px | `css/main.css:1606-1775` | Hero type/rail enlarge, static-fallback stops become a 3-col grid; video carousel splits 2-col (≤600px/46vw player + text); services pills go 3-across; Pasii cards grow gap/scale; **booking form splits 2-col** (text + ≤600px/46vw form); reviews become single-column, explicitly documented as "the quiet monument... a single testimonial stage, not a media pairing" (`css/main.css:1749-1751`). |

**Grading regime (INTENDED, root `POLARIS.md` NN2):** desktop is graded at 1440px primary, with 1280px and 1920px checked for grace. **Gesture-matrix testing (VERIFIED)** used exactly two synthetic viewports: 390×844 (mobile) and 1280×720 (desktop) — see §14. Production has no evidence of a broader device matrix (no 768–1023px tablet regime tested by either the eye-gate or the harness).

`body{max-width:480px}` is described in `CLAUDE.md` as permanent law below 768px; above it, it is superseded by the ratified desktop campaign per that same file's own amendment clause. This supersession is real and current — see Conflict **C1** (§20) for the separate, unresolved question of *which POLARIS document* governs it.

---

## 6. Design-system contract

`css/tokens.css` is the sole declared source of color, type, and shadow (`CLAUDE.md`), confirmed as a single 47-line `:root{}` block, ratified "canon v1.1.2 — 2026-08-02, all values measured from `docs/reference/Homepage A.png`" (`css/tokens.css:11-12`).

**Color** — `--ivory #F5F5F5`, `--cocoa #3C2F2F`, `--gold #C9A86A`, `--hotico-pink #FE0990`, `--field-gray #D9D9D9`, `--white #FFFFFF`, `--card #E9E9E9`, `--placeholder #9E9E9E`, plus `--gold-grad` (a 7-stop gradient) and `--gold-line`.
**Type** — `--font-head: 'Raleway', sans-serif`; `--font-body: 'DM Sans', sans-serif`.
**Shadow** — `--shadow-neo`, a 4-layer neomorphic shadow.
**Spacing/breakpoint scaffold** — `--bp-desktop:768px`, `--bp-split:1024px`, `--width-grade:1440px`, `--content-max:1200px` (commented "provisional, Commander re-pours at will"), `--column-read:720px` (commented "ratified at D-1 eye-gate, still re-pourable"). **These four are explicitly marked as reference-only / re-pourable, not frozen law** — treat them as **TUNING REFERENCE**, not **DESIGN CONSTANT**.

**Declared color-law exceptions (2, both self-commented, both DESIGN CONSTANT as documented exceptions):**
1. Swiss-flag red/white (`css/main.css:1143-1163`) — "national flag colours, not brand colours: deliberately outside the tokens.css colour law."
2. Mask-alpha black (`css/main.css:685-693`) — "`#000` here is mask alpha, not a colour."

**Undeclared token duplication found by direct code read (new evidence, confirms Conflict C4 — see §20):** four `rgba()` rules inside the hero CSS section duplicate `--ivory`/`--gold` as raw channel triplets, with no "outside the law" comment: `css/main.css:194` (`.kh__h1` text-shadow, `rgba(245,245,245,.85)` ×2 = `--ivory`), `css/main.css:214` (`.kh__caption-dot` box-shadow, `rgba(201,168,106,.25)` = `--gold`), `css/main.css:237` (`.kh__static-veil` gradient, `rgba(245,245,245,…)` = `--ivory`), `css/main.css:371` (`.kh__veil` gradient, same). A fifth, non-hero instance at `css/main.css:883` (`.stepper__bars i`, `rgba(254,9,144,.25)` = `--hotico-pink`) **is** accompanied by an explanatory comment ("inactive rules measured #F7BADC = --hotico-pink at 25% on ivory") but does not use the "outside the colour law" framing of the two declared exceptions — a gray-zone case. These line numbers match `LEDGER.md` Entry #40's independent claim exactly. **The fact of the four rules is now VERIFIED by direct code read; the remedy (adding `--ivory-rgb`/`--gold-rgb` tokens, per the ledger's own proposed fix) is a Tower/Commander act, not resolved here** — logged, not fixed, consistent with Lap H-1's instruction.

**Reuse classification:** `css/tokens.css` — **REUSABLE** as a starting value set (colors/type/shadow are ratified design constants); the four breakpoint/spacing tokens — **TUNING REFERENCE** only.

---

## 7. Information architecture

| Page | Role | noindex |
|---|---|---|
| `index.html` (861 lines) | Homepage: header, kintsugi-scroll hero, 5-slide video carousel, 6 service pills, "Pasii transformarii" 3-card focus walk, 2-step booking form + confirmation, reviews carousel, footer. | `<meta name="robots" content="noindex,nofollow">` at line 6 — confirmed present. |
| `servicii/areola.html` (655 lines) | The one fully-built individual service page: nav switcher to the other 5 (placeholder) services, Vimeo "stage" player, Détails/Prix/Galerie tabs, 7 FAQ accordions wired to swap the stage video, collapsible pricing tiers, a gallery tab held pending photo consent, the same booking form + reviews as the homepage. | Present, line 6. |
| `servicii/in-curand.html` (36 lines) | "Coming soon" placeholder for the other 5 services; fills the service name from a whitelisted `?s=` param, offers a WhatsApp/tel facade instead of a dead end. | Present, line 6. |

`noindex,nofollow` is standing law for this prototype (`CLAUDE.md`, "permanent" — every page, every lap). **Whether production keeps or removes it is a production launch decision outside this repository's law and outside this task's scope** — flag it explicitly to whoever owns the production deploy checklist; no evidence here rules either way for the *production* site.

---

## 8. Component / reuse inventory

| File | What it is | Reuse classification |
|---|---|---|
| `js/hero-scroll.js` (1527 lines, v26) | Kintsugi-scroll hero engine — see §10, the full subsystem spec. | **REFERENCE ONLY** for the behavior/invariants; the specific vanilla-JS architecture is a **REUSE CANDIDATE** at best — dense, hand-rolled, single-file. |
| `js/main.js` (353 lines) | Shared swipeable carousel engine (video + reviews), video-teaser expand-in-place + lazy iframe, Pasii focus-mode card expansion. | **REUSE CANDIDATE** — sound mechanisms (see §9.2), vanilla architecture not required for production. |
| `js/form.js` (174 lines) | Booking wizard step navigation + WhatsApp deep-link composition. | **PROTOTYPE ONLY** for the "backend" (no validation/submission — see §9.1); the **WhatsApp message-composition contract itself is REFERENCE ONLY** — worth preserving as an approved conversion behavior, not necessarily as code. |
| `js/areola.js` (116 lines) | Tab bar, FAQ/video "jukebox," price-tier collapsibles — specific to the one built service page. | **REUSE CANDIDATE** — the jukebox pattern (§9.3) is a real, transferable interaction design. |
| `js/soon.js` (11 lines) | Whitelists a `?s=` query param against 5 known service names before injecting it into the placeholder page. | **REUSABLE** as a pattern (the one deliberate XSS-safety mechanism in the codebase, and it works) — **but ships with a real defect**, see §15. |
| `css/tokens.css` | Sole color/type/shadow source. | **REUSABLE**, see §6. |
| `css/main.css` (1776 lines) | Full stylesheet, section-commented, three responsive tiers. | **REFERENCE ONLY** for values/behavior; production almost certainly wants a different CSS architecture (§17). |

---

## 9. Major subsystem specifications

### 9.1 Booking / contact form — WhatsApp handoff

**Intent.** Let a visitor request an appointment without building a real booking engine, while never silently failing — every submission produces a real, receivable message.

**Current prototype behavior (OBSERVED).** A 2-step wizard. Step 1: date (`<input type="date">`), time (`<input type="time">`), and a procedure choice rendered as `<span role="radio">` elements in a `role="radiogroup"` (not native `<input type="radio">`) — `index.html:559-600`. Step 2 ("Contact," as of Lap F-5, 2026-08-22): **exactly two real inputs** — "Nom et prénom" (`type="text"`, `data-recap="nom"`, `autocomplete="name"`) and "Téléphone" (`type="tel"`, `data-recap="tel"`, `autocomplete="tel"`) — `index.html:603-617`. Three decorative "consent" list items (`<span class="checks__box" aria-hidden="true">`) are visually present but are not real checkboxes and are not wired to any logic. On confirm, `js/form.js:76-116` composes a WhatsApp message from every `[data-recap]` field plus the selected procedure and opens `https://wa.me/41796472106?text=…` in a new tab; the confirmation panel then shows, with its own disclosure: *"Prototype — aucune donnée n'est envoyée."*

**The exact message template (`js/form.js:88-98`, current field set):**
```
Bonjour Alexandra ! Je souhaite confirmer mon rendez-vous 🌸
Date : {date, DD/MM/YYYY} · Heure : {heure} · Procédure : {procedure}
Nom : {nom} · Téléphone : {tel}
```
Any empty field falls back to the placeholder `—` rather than blocking send. `procedure` is either the selected radio's value, or — on `servicii/areola.html` only — the page's fixed `data-proc-base="Aréole"` concatenated with any additional selection.

**Approved behavior / contract.** Reproduce the *conversion behavior* — a low-friction two-field contact ask, feeding a human-readable recap message to a real WhatsApp number — as the approved interim conversion channel while a real booking engine is designed. This is the outcome of a deliberate, recent, Alexa-ruled simplification (Lap F-5, `LEDGER.md` #62-63): the form went from 4 contact fields (Nom, Prénom, E-mail, Téléphone) down to 2 (merged Nom-et-prénom, Téléphone) — E-mail was removed entirely, not merely deprioritized. **Do not reintroduce fields that were deliberately cut** without a new ruling from the same authority chain (§22.3 of the ignition key — content/business decisions route through the Commander to the client, never through developer judgment).

**Behavioral invariants:**
- **FORM-I1 — Zero validation, zero blocking, by design.** Confirmed directly: no `required` attribute on either input, no regex/format check, and the click handler runs unconditionally (`js/form.js:77`). This is stated prototype law ("nothing validates, everything advances," `js/form.js:3`), **not** a bug to preserve into production as-is — see Known Debt.
- **FORM-I2 — Recomposition on every confirm.** The message is rebuilt fresh from current field state on every click, so an edit-and-reconfirm always sends current data (`js/form.js:78-79`, explicit in comment).
- **FORM-I3 — WhatsApp number is a single source, `41796472106`,** consistent across every page (`in-curand.html`, `areola.html`, footer, form) — verified by direct grep. **The site's `tel:` links use a different country code (+40, Romania) — this is a known, unresolved, client-facing mismatch, not a code bug** — see §15 and §20.

**Reuse classification.** The two-step UI and vanilla step-toggle logic — **PROTOTYPE ONLY** (facade-grade, `hidden`-attribute step swap, no state machine). The WhatsApp message-composition contract (exact fields, exact template, the `wa.me` number) — **REFERENCE ONLY**: what fields to collect and what a well-formed handoff message looks like is real product decision-making worth preserving; the JavaScript that builds the string is not.

**Known debt (do not inherit as a requirement):** No real validation exists anywhere (email format was never validated even before removal; phone format is not validated now). No `aria-checked` maintenance on the fake radio buttons (hardcoded `"false"` in markup, never updated by JS — `index.html:588-593`, confirmed `js/form.js`'s `setGroup()` only toggles a CSS class). The three "consent" checkboxes are `aria-hidden="true"` decorative spans, not functioning checkboxes, and are not wired to anything — **PROTOTYPE ONLY**, must be replaced with real, functioning, accessible checkboxes if consent capture is a production requirement (GDPR-adjacent — flagged in `docs/DOSSIER.md` item A4 as a topic to decide with the engine). No `aria-live` announcement or focus movement when the form is replaced by the success panel.

**Acceptance tests (Given/When/Then):**
- Given a visitor fills Nom-et-prénom and Téléphone and confirms, When the WhatsApp tab opens, Then the message contains exactly those two fields plus date/heure/procédure from Step 1, and no e-mail or prénom-only field appears.
- Given a visitor leaves every field empty and confirms, When the WhatsApp tab opens, Then every field renders as `—` and the send still succeeds (facade law — production must decide whether this remains true or whether real validation replaces it; do not silently assume either way).

---

### 9.2 Shared carousel / expand engine (`js/main.js`)

**Intent.** One engine drives two visually different carousels (video teasers, reviews) plus two different "expand in place" interactions (video teaser text, Pasii step cards), so behavior stays consistent without three separate implementations.

**Current prototype behavior (OBSERVED).** `initCarousel()` (`js/main.js:89-179`) implements pointer/touch drag with axis-locking and edge resistance (`delta * 0.32`), a 15%-of-width swipe threshold, and lazy iframe loading (`data-src` → `src`, current + next slide only) — applied via `document.querySelectorAll('[data-carousel]').forEach(initCarousel)`. A shared `expand()`/`collapse()` height-transition helper (`js/main.js:41-77`, 340ms, kept in sync with a CSS duration by convention, not by shared source) powers both the video-teaser "Voir plus" text reveal and the Pasii step-card focus mode. The Pasii focus mode hides the other two cards, swaps a header image and label, and shows body copy per a `data-phase` match; its post-collapse scroll target is deliberately width-split (mobile scrolls to the card, ≥768px scrolls to the section top) — documented as a **Commander ruling**, not an oversight (`js/main.js:328-345`).

**Approved behavior / contract.** The carousel's drag physics (axis lock, edge resistance, 15% threshold), the lazy-load pattern for embedded video, and the width-split scroll-rescue rule for the Pasii expand are worth preserving as interaction contracts. The specific vanilla implementation (a MutationObserver watching carousel dots to auto-collapse an open teaser, `js/main.js:260-273`; the `scrollHome()` viewport-rescue helper) is not.

**Accessibility.** Carousel dots carry `aria-label` and a correctly-maintained `aria-current` (`js/main.js:117`) — **REUSABLE** as a pattern. The drag/swipe track itself has **no keyboard equivalent** — arrow-key navigation is absent; only the dot buttons are keyboard-operable. **PROTOTYPE ONLY** as-is; production needs a keyboard path for the swipeable track itself, not just its dots.

**Reuse classification.** **REUSE CANDIDATE** — real, tested interaction design; vanilla architecture, no state library, would benefit from review before adoption.

---

### 9.3 Areola service page — tab bar, FAQ "jukebox," pricing

**Intent.** One built service-page template that the other five services will eventually follow: a tabbed Détails/Prix/Galerie structure where FAQ answers double as a video-selection mechanism ("jukebox law: play swaps the stage and scrolls to it. Closing an accordion never changes the record — the stage keeps the last one played," `js/areola.js:45-48`).

**Current prototype behavior (OBSERVED).** `js/areola.js` drives three independent mechanisms: a tab bar with a sliding gold-pill indicator (`showTab()`, lines 28-39); 7 FAQ accordions in "focus mode" (only one open at a time) where each accordion's own play button swaps a shared Vimeo iframe's `src` and only commits the visible "à l'écran" label once the new video's `load` event actually fires — a deliberate race-condition guard (lines 45-96); and two independently collapsible pricing tiers (client-account price, retouches) whose CTAs scroll to the always-on contact section (lines 98-113).

**Approved behavior / contract.** The jukebox pattern (one open accordion, deliberate label-commit-on-load, explicit "no payments anywhere" scope note at `js/areola.js:109`) is a real, reusable interaction design for the other five service pages once built.

**Known debt — real defect found in this audit (OBSERVED, not previously logged):** `servicii/areola.html`'s own nav switcher to the other 5 services links to `in-curand.html?s=Cicatrici`, `?s=Alopecie`, `?s=Sprancene`, `?s=Buze` (Romanian/unaccented spellings) — but `js/soon.js`'s whitelist array is `['Sourcils','Eyeliner','Alopécie','Lèvres','Cicatrices']` (French/accented). None of areola's own nav links match the whitelist, so navigating from the Areola page to any other placeholder service silently falls back to the generic label "Service" instead of naming it — while the *homepage's* pill links (`index.html:413-445`, correctly spelled/accented) work. This is a real, fixable bug, not a design decision — flag for production (or even for a prototype patch, at Commander's discretion; this document does not fix it, only reports it).

**Reuse classification.** **REUSE CANDIDATE** — the jukebox and tab mechanisms are sound; the specific file is tightly coupled to the one page it was written for.

### 9.4 "Coming soon" facade (`servicii/in-curand.html` + `js/soon.js`)

**Intent.** Five of six services have no built page yet; rather than a dead link or empty stub, the visitor lands on a real, honest placeholder naming the service they clicked and offering a live WhatsApp/tel path — the honest-facades principle (§4) applied to unbuilt content.

**Current prototype behavior (OBSERVED).** `js/soon.js` (11 lines, quoted in full): reads `?s=` from the URL, matches it case-insensitively against a 5-item whitelist, and writes only the matched whitelist string (or the hardcoded fallback `'Service'`) to `textContent` — never the raw query value. **Verified safe against injection**: no code path can place attacker-controlled text into the DOM, whitelist match or not.

**Reuse classification.** **REUSABLE** as a security pattern (whitelist-before-render for any query-driven label) — subject to fixing the whitelist/link mismatch in §9.3's debt note first.

---

## 10. Hero scroll specification — "the kintsugi scroll"

### Intent

A single sculptural image, scroll-scrubbed through 6 named stops (Sourcils → Eyeliner → Alopécie → Lèvres → Cicatrices → Aréole), functioning as both the homepage's opening statement and a slow reveal of the six services. The reveal must feel physically responsive to the visitor's actual gesture — not like a video playing *at* them — while never fighting or capturing their native scroll.

### Current prototype behavior (OBSERVED)

`js/hero-scroll.js` (1527 lines, internal version v26) is a hand-rolled scroll-scrubbing engine: a `position:sticky` pinned frame, driven purely by reading `scrollY`/`visualViewport` on every native scroll/resize event (no `preventDefault`, no scroll capture — see §4). It computes a virtual camera (pan/zoom via `translate3d`) across one 1024×1536px source image, a "settle" system that eases the visitor to the nearest semantically meaningful stop when they pause, and a two-phase dissolve handoff into the next section.

### Approved behavior / contract

The 6-stop structure, the settle-on-pause behavior, the direction-asymmetric one-stop rule (see I2 below), and the exit-dissolve handoff are the approved experience. The specific single-file vanilla-JS implementation is not — see Reuse classification.

### Behavioral invariants

Sourced from `docs/qa/gesture-matrix.md` (VERIFIED — 210/210 asserted cells pass against these, out of 240; 30 cells are structurally unreachable, not failures) and direct code read (VERIFIED against `js/hero-scroll.js`):

| ID | Invariant | Status |
|---|---|---|
| **I1 — Drift immunity** | A gesture ≤ `DOOR_COMMIT_VH` (7.5vh, the single knob governing both launch eagerness and exit commitment) never changes which stop the visitor is on. | VERIFIED, 100% of applicable cells |
| **I2 — Direction-asymmetric one-stop rule** | Downward: exactly one semantic stop per gesture — Alopécie is never skippable on the way down. Upward: navigation, not story — a violent up-flick lands at the *nearest* stop, unclamped, because "going home is a destination, not a page of the story." This asymmetry is a deliberate amendment (R-2f Addendum 3) fixing a real bug where the old symmetric clamp hauled a visitor backward 4 stops on a fast up-flick and mislogged it internally as `action=advance`. | VERIFIED |
| **I3 — Door obedience** | A committed gesture ending inside a transition ("door") segment resolves in the direction it traveled, never against the visitor's own thumb. | VERIFIED |
| **I4 — Border supremacy** | A gesture ending at or past the exit boundary ("the Southern Border" in code comments, not just docs — `js/hero-scroll.js:1151,1345-1384`) is never captured. | VERIFIED |
| **I5 — Mobile/desktop agreement** | All 240 matrix cells resolved identically on 390×844 and 1280×720. | VERIFIED, no exceptions |
| **I6 — Reduced motion gets real content** | The reduced-motion path is real (an instant-jump `scrollTo`, and a separate static markup fallback, `.kh__static`) but **has zero test-cell coverage** — it is dead code in this file specifically because a `<head>` gate script keeps `html.js-kh` off entirely when `prefers-reduced-motion` is set, so this file's own internal re-check (`js/hero-scroll.js:43-52`) never fires in practice. **OPEN — never VERIFIED**, do not present as tested. |
| **I7 — Native scroll is the physical source of truth** | See §4. Structurally guaranteed (zero `preventDefault`, all listeners passive) — VERIFIED by code inspection, not by a dedicated matrix cell. |
| **I8 — Paint may lag scroll; interaction jurisdiction must not** | A fading hero element's *pointer-events/click-eating* state (`is-fading` class) is keyed to `targetFadeT` (the scroll-truth value), not `renderedFadeT` (the animated/painted value) — so a not-yet-visually-faded pin instantly stops eating clicks meant for the content underneath, even while its paint is still catching up (`js/hero-scroll.js:725-748`). The inverse (`is-dissolved`/`visibility:hidden`, a paint-cost optimization) is correctly keyed to the *painted* value instead, so it never clips a still-animating frame (`js/hero-scroll.js:749-762`). **Satisfied by design reasoning recorded in code comments, not by a test cell — OPEN, never VERIFIED against a real invariant assertion**, though the mechanism is unambiguous in the source. |

**HERO-I9 — The focus guard (mandatory, with bug archaeology).** While any `input`/`textarea`/`select` has focus, the hero engine must hold fire entirely: no recalculation, no settle, and any in-flight settle animation already running must be cancelled. This exists because of a real, shipped, Commander-diagnosed defect:

> **The bug (pre-v26, `LEDGER.md` #60):** the engine measures viewport height via `visualViewport.height` (deliberately, to work around iOS Safari's layout-viewport lie about toolbar visibility — see K-6 in the same file, `js/hero-scroll.js:261-268`). The iOS on-screen keyboard shrinks `visualViewport.height`. A focus event that popped the keyboard therefore shrank the engine's measuring tape mid-interaction; the settle system read the shrunken tape as real and drove `window.scrollTo` to a garbage target — observed on device as the page jumping to the footer on focus and to the "étapes" section on keyboard dismissal.
> **The fix (v26, Commander-ruled, ceremonial amendment to an otherwise-frozen file):** a `userIsTyping()` check (`document.activeElement.matches('input, textarea, select')`) gates three choke points — `onResize()` (`js/hero-scroll.js:955-956`), `easeTick()` (line 1298, cancels an in-flight ease if typing starts mid-animation), and `settle()` (line 1342) — plus a `focusout` listener that fires exactly one resync when focus leaves a field for a non-field target (skipped on field-to-field tabbing so mid-form navigation doesn't thrash it). **No camera, keyframe, dwell, settle-target, or easing math was touched** — this was a scoped, five-insertion, additive-only patch, verified by a pre/post file hash check at the time.
> **Device certification (`LEDGER.md` #61):** iOS Safari — clean, no teleport, no scroll-jump on keyboard dismissal, confirmed on the exact device/browser the original bug video was shot on. Brave iOS — one residual scroll quirk remains, ruled by the Commander as browser-specific and **accepted as a watched, not fixed, seam**; `?khdebug=1` is the standing diagnostic instrument if a client ever reports a recurrence.

**Production must not "clean up" this focus guard as dead-looking code.** It is the fix for a real, previously-shipped, user-visible defect. Any re-architecture of the hero engine must reproduce this invariant — holding fire while a form field is focused — by whatever mechanism fits the new architecture.

### Geometry and timing

Classified per the master prompt's four-way scheme. All values from `js/hero-scroll.js` and `css/main.css`, cross-verified to agree (they must — see Known Debt).

| Constant | Value | Classification | Why |
|---|---|---|---|
| `TOTAL_VH` (`.kh__scrubwrap` height, `main.css:286`) | 478vh | **TUNING REFERENCE** | Explicitly documented derivation history: 760vh → 400vh (R-2 B tune pass) → 428vh (+28, R-2 tune pass finding 2) → 478vh (+50, R-2c exit extension) — a deliberately re-poured value, not an arbitrary magic number, but the comment explicitly frames it as "tune target for the Commander's device walk, not a hard law." |
| `TOTAL_VH_BASE` = 428 | | **IMPLEMENTATION ARTIFACT** | The legacy denominator every pre-existing timeline fraction still divides by, purely so byte-identical fractions survive the runway's growth to 478vh via a uniform `RESCALE` factor. This is an implementation mechanism to *preserve* the tuned feel above, not itself a design decision. |
| `DOOR_COMMIT_VH` = 7.5 | | **DESIGN CONSTANT** | The single knob governing both accidental-drift immunity (I1) and deliberate-gesture commitment (I3/door rule) — set as the midpoint between measured accidental drift (<5vh) and deliberate-but-previously-failing flicks (10-20vh). Changing it changes felt responsiveness directly; it is not an artifact of the current architecture. |
| `ADVANCE_BIAS_FRAC` = 0.20 | | **DESIGN CONSTANT** | The certified "30/70" coverage bias (30% coverage to advance, 70% to reverse) — explicitly ruled "LAW, value untouched" in the gesture matrix's own documentation; only its *jurisdiction* (which segments it applies to) was ever revised, never the number. |
| 6-stop order, per-stop `DWELL_VY` / `MOBILE_ZOOM_BOOST` arrays | | **DESIGN CONSTANT** | Per-stop camera anchor/zoom tuning, index-matched to the DOM order `Sourcils, Eyeliner, Alopécie, Lèvres, Cicatrices, Aréole` — encodes real art-direction (why the two chest stops sit closer to center to avoid pushing their subject off-frame). |
| `FADE_CHASE_MS`=520 / `FADE_CHASE_DOWN_MS`=260 | | **TUNING REFERENCE** | Explicitly the midpoint of a "blessed 450-600ms range" — a felt-motion tuning value, reasonable to recalibrate on production hardware. |

**Known duplication debt (`LEDGER.md` Entry #40, finding M4 — confirmed current by direct read):** the 478/378vh values exist independently in `js/hero-scroll.js:105-109` and `css/main.css:159,286`, with **no shared source** — both files carry hand-written comments instructing whoever edits one to update the other. Production should give this a single source of truth (a build-time constant, a CSS custom property read by JS, or equivalent) — but note the *specific numbers* are tuning references, not laws; only the *duplication mechanism* is the debt.

### Responsive behavior

The engine reads `visualViewport` when available (falling back to `window.innerWidth/Height`) specifically because iOS Safari's layout viewport misreports available height when the address bar auto-hides — this is load-bearing, not defensive over-engineering (K-6 fix, `js/hero-scroll.js:261-268`). `MOBILE_ZOOM_BOOST` applies extra per-stop zoom on narrow viewports only, fading to neutral as the effective scale grows.

### Accessibility / failure fallback

`prefers-reduced-motion` is honored at the `<head>` gate level (before this file even runs) via an `html.js-kh` class toggle, with a `.kh__static` markup fallback rendering real content, not broken animation. **This satisfies I6's letter but has zero automated or matrix test coverage** — one screenshot exists (`docs/qa/r2-scroll-feel/reduced-motion_static-tier.png`), not pixel-diffed by any tooling. **Do not represent this as a certified path to production; it is untested, not unimplemented.**

### Performance

Architecturally sound by construction: passive listeners throughout, zero `preventDefault`, lazy iframe loading elsewhere in the codebase (not this file). **No measured production-scale performance data exists** — the only real-device evidence is manual "Commander's eye" certification (§14), not instrumented profiling.

### Prototype references

`js/hero-scroll.js` (whole file); `css/main.css:107-467` (the `.kh` block); `docs/qa/gesture-matrix.md` (the certified matrix); `docs/qa/harness/*.js` (the re-runnable proof harness, §14); `docs/IGNITION_kintsugi-scroll.md` (original design brief, not independently re-verified by this task).

### Reuse classification

**REFERENCE ONLY** for the behavior and every invariant above. The specific single-file, hand-rolled vanilla-JS engine — **REUSE CANDIDATE at best**: it is dense, uncommented in places a newcomer would need most, and was debugged into its current shape through eleven-plus laps of real device defects (§14's harness exists specifically because this class of bug is easy to reintroduce). A from-scratch re-architecture (e.g. on top of a scroll-driven-animation primitive, GSAP ScrollTrigger, or a framework's own scroll-linked animation API) is explicitly permitted by developer freedom (§17) — **provided every invariant above, especially HERO-I9, is independently re-verified**, not assumed to transfer.

### Known debt

Hero source image ships at ~1024×1536px; a 4× upscale attempt was abandoned after the Commander's own pixel-scanline check confirmed visible palette-quantization banding baked into the upscale tool's output (`LEDGER.md` #24) — accepted as debt, files remain at `assets/src/` if a better upscale tool is ever tried. 478/378vh duplication across CSS/JS (above). Two named-but-untested invariants, I6 and I8 (above) — do not grade production against a standard the prototype itself never met.

### Acceptance tests

- Given a visitor rests on Eyeliner, When they make one strong downward gesture, Then the hero lands on Alopécie and does not skip to Lèvres. (I2, downward)
- Given a visitor is deep in the film (e.g. resting on Aréole) and makes a violent upward flick toward the page top, When the gesture resolves, Then the hero lands at the nearest stop to their release point, not clamped to one stop back. (I2, upward — this is the exact defect the R-2f Addendum 3 amendment fixed; regression here is a real product regression, not a style nit.)
- Given a visitor focuses the "Nom et prénom" field mid-scroll (e.g. on iOS, popping the on-screen keyboard), When the keyboard opens and later closes, Then the page does not jump to an unrelated scroll position at any point during or after the interaction. (HERO-I9 — the v26 regression test.)
- Given `prefers-reduced-motion: reduce` is set, When the hero section renders, Then real, complete content is shown with no broken/partial animation state — **and this must be freshly verified on real devices before production launch**, since no current evidence certifies it beyond one screenshot.

---

## 11. Content contract

**Verbatim law (binding).** Client copy ships as-written, typos included. The developer never copyedits, paraphrases, or "improves" the French. Any copy defect or change routes to the Commander → client — never to developer judgment. Language: French, "tu" register.

**`content/fr.json` is the current staged copy source, but it is not production-clean.** Its own `_meta` block (verified, lines 2-19) declares itself `"law": "verbatim — copy is reproduced exactly as stored in the spreadsheet"`, sourced from `content/source/hotico-content-fr.xlsx`. `content/fr-review.md` is a human-readable, equally unedited mirror of the same data, for proofing only — not an editorial review, and not evidence of content approval.

**Internal scaffolding contamination (needs stripping, copy itself stays verbatim).** `content/fr.json` carries Romanian-language internal machinery mixed in with client-facing French text: `row_label`/`title_row_label`/`cta_row_label`/`_sheet_labels` keys (spreadsheet-column notes, e.g. `"sub logo si poza ->"`) at roughly a dozen locations across every service section, and Romanian branching-logic notes embedded inside the (now-retired from the live form, but still present in this content file) medical-intake questionnaire object (`areola.form_notes.questions[]`, e.g. `"note": "daca bifeaza trebuie sa apara alte 2 coloare..."`). **This is machinery, not client copy — flag it for stripping in production's content pipeline without touching the surrounding French text.** Grep pattern for a developer: `row_label|_sheet_labels|branching`.

**EN/RO source spreadsheets delivered, never processed (OPEN).** `content/source/hotico-content-en.xlsx` and `hotico-content-ro.xlsx` exist, same batch delivery timestamp as the FR file (2026-08-04), but no `en.json`/`ro.json` were ever extracted. If English or Romanian versions are wanted, this is a live gap, not a decision made and reversed.

**Duplicate FR source file, unreconciled location (Conflict C3 — TO DECIDE, not resolved here).** `content/source/hotico-content-fr.xlsx` and `docs/spec/refonte/hotico-fr-content.xlsx` are byte-identical (SHA-256 confirmed at Lap H-1) but live at two unrelated paths with no cross-reference between them. Pick one canonical path before production; this document does not pick.

**Currency (business decision, TO DECIDE, routes to client).** The prototype currently ships **RON (Romanian Lei)** pricing on the built service page (`servicii/areola.html`: 2000 ron full price, 1700 ron client-account price, 400/600/800 ron retouch tiers). `docs/DOSSIER.md` (item B10) separately recommends production treat prices as **data, not hardcoded strings**, and notes a Geneva/CHF market mapping exists. **This is unresolved**: whether production ships CHF, RON, or a market-selected currency is a client/business call, not something this document settles — flag prominently, since shipping the wrong currency silently is a real production risk, not a cosmetic one.

**Testimonial duplication — production gate, non-negotiable (see §18).** Both the homepage reviews carousel and the confirmation-screen carousel ship the identical single client quote repeated across every slide — a deliberate, explicitly-logged demo mechanic (`LEDGER.md` #52: *"tripled quote is demo scaffolding — slides 2–3 must be replaced by distinct ratified client quotes before any production release"*), never closed through the ledger's final entry.

**Gallery photo consent — production gate, non-negotiable (see §18).** Real client result photography is held pending a confirmed consent posture (`docs/DOSSIER.md` item D13; `LEDGER.md` #12: *"ALEXA BLESSING REQUIRED before this ships"*). `servicii/areola.html`'s gallery tab ships a `role="note"` placeholder band, not real images, and its surrounding intro copy is itself marked provisional pending the same approval. No evidence found that this was resolved by the ledger's close.

---

## 12. Asset contract

| Asset family | Status | Evidence |
|---|---|---|
| `assets/brand/logo-black.png`, `logo-white.png` | Reference-final (no evidence of pending revision) | Brand reference set |
| `assets/brand/style-guide-v1.1.pdf` | Not opened by any audit to date (binary, out of tooling reach) — treat as **NEEDS REVIEW** before relying on it for anything not already mirrored in `css/tokens.css` | `docs/handoff/EVIDENCE-MAP.md` §2.5 |
| `assets/img/pill-*.webp`, `etapes-*.webp` | **APPROVED** — live, referenced set | Directly referenced by shipped pages |
| `assets/img/statue-kintsugi-v3.webp` | **APPROVED but resolution-limited** — ships at ~1024-1365px after an abandoned 4× upscale attempt (banding) | `LEDGER.md` #24, §10 |
| `assets/img/temp-1x/*` | **PLACEHOLDER**, self-declared | Own `README.txt` inside that directory flags these explicitly |
| `pill-levres` (lips) image specifically | **NEEDS REVIEW** — repeatedly flagged as visually weak/source-limited across three separate laps, never resolved, explicitly "source-limited, not a cropping mistake" | `LEDGER.md` #29, #30, #40 |
| Gallery result photography (`servicii/areola.html`) | **MISSING pending consent** — see §11 | `docs/DOSSIER.md` D13, `LEDGER.md` #12 |
| `docs/spec/refonte/spec-*.png` | Figma-exported design specs, with a documented supersession of an earlier hero direction, since retired | `docs/handoff/EVIDENCE-MAP.md` §2.5 |

---

## 13. Accessibility contract

**What the prototype currently implements (OBSERVED) vs. what production must implement — kept explicitly separate per the master prompt's instruction not to let incorrect prototype semantics survive for "visual fidelity."**

| Area | Current prototype state | Production requirement |
|---|---|---|
| Form field labeling | No `<label for>`/`<input id>` pairing anywhere — labels are plain `<span>` elements (`index.html:560,572,604,609` and the `areola.html` mirror). | **PROTOTYPE ONLY — must not survive.** Production needs real, programmatically-associated labels. |
| Procedure "radio" selection | Real ARIA (`role="radiogroup"`/`role="radio"`, `index.html:586-593`) but `aria-checked` is hardcoded `"false"` in markup and **never updated by JS** — confirmed: `js/form.js`'s `setGroup()` only toggles a CSS class. A screen reader will announce every option, including the selected one, as unchecked. | **PROTOTYPE ONLY — real defect, not a design choice.** Production must either use native `<input type="radio">` or correctly maintain `aria-checked`. |
| "Consent" checkboxes | Three `<span class="checks__box" aria-hidden="true">` — invisible to assistive tech, not real controls, not wired to any logic. | **PROTOTYPE ONLY.** If consent capture is required, these must become real, functioning, accessible checkboxes — not a styling pass on the existing spans. |
| Form-to-success transition | Silent DOM swap (`root.hidden=true; success.hidden=false`), no `aria-live` announcement, no focus movement. | Needs an announced state change and a moved focus target. |
| Carousel dots | `aria-label` + correctly-maintained `aria-current` (`js/main.js:117`). | **REUSABLE as-is.** |
| Carousel swipe track | No keyboard equivalent — only dots are keyboard-operable. | Needs arrow-key (or equivalent) support for the track itself. |
| Step-card / video-teaser expand buttons | `aria-expanded`/`aria-controls`/`aria-label`, correctly toggled (`js/main.js:231,239,312-314,348-350`). | **REUSABLE as-is**, though neither moves focus into the revealed panel. |
| Hero reduced-motion path | Real fallback content exists (`.kh__static`), gated correctly at the `<head>` level — but **zero test coverage** (I6, §10). | Must be freshly verified on real devices; do not assume prototype-certified. |
| Hero pointer/paint-lag jurisdiction | Correctly implemented per design reasoning (I8, §10), never asserted by an automated test. | Preserve the *rule* (interaction state follows scroll truth, not paint) in any re-architecture; re-verify, don't assume. |

---

## 14. Performance / device expectations

**Architecturally sensible (by construction, not measurement):** zero `preventDefault` anywhere in the hero engine, all scroll/touch/wheel listeners passive, lazy iframe loading for off-screen video slides, transform/opacity-driven hero animation (no layout thrash by design).

**Actually measured:** the QA harness (`docs/qa/harness/`, 16 Node scripts) runs the **real, unmodified** `js/hero-scroll.js` inside a synthetic 60fps DOM-shim clock — built specifically because the preview sandbox reports `document.hidden===true`, which kills `requestAnimationFrame` and throttles timers, making real time-domain tracing impossible in-browser there. From repo root: `cd docs/qa/harness && node matrix.js` (expects 210/210, 0 mismatched) and `node sens.js` (expects 52/52 PASS) — both run standalone against the working tree, no setup needed. **This proves the code's logic, not device feel** — the harness's own README states this directly: *"It is the real code. It is not a device. Momentum is modelled, not captured."* Nine of the harness's other eleven scripts are historical-comparison tools that are **not currently re-runnable out of the box** — they need a historical build restored via `git show <hash>:js/hero-scroll.js` first (commands documented in `docs/qa/harness/snapshots/README.md`); treat any claim sourced from those nine as **historical**, not currently re-verified, unless someone actually regenerates and reruns them.

**Real-device verified (the only ground truth that exists):** iOS Safari — certified clean (`LEDGER.md` #61: no teleport, no scroll-jump, full WhatsApp handoff walk holds end to end). Brave iOS — certified with one accepted, unresolved, browser-specific scroll quirk, explicitly ruled "watched, not fixed" rather than blocking. **No Android device and no named desktop browser were ever tested** — the ledger records the Commander testing "desktop wheel" input repeatedly, but never names a specific desktop browser, and grep across the entire ledger for "android" returns zero hits. **Do not construct or imply a broader device matrix than this — it does not exist.**

**Harness defects, self-disclosed (D1-D8):** every harness script's header discloses eight defects found and fixed in the *harness itself* during its own construction (wrong wheel-event ordering, double-counted log lines, a loop bound that re-evaluated its own drag distance, a false-passing gesture set that omitted a real flick the Commander had actually made, a lost function on refactor, a hoisted-`var` bug that silently broke every comparison, a false-all-clear discriminator, an off-by-one boundary filter). The harness's own documentation calls out D4 and D7 specifically as "suites that could not fail" — both cases where a green test run meant only that the cells someone thought to write were green, not that the behavior was correct. **Worth carrying forward as a QA-culture warning, not just trivia**: a passing production test suite proves what it was written to check, nothing more.

---

## 15. Known debt register

Full candor — real names for fakes, facades, and duct tape, per this document's audience (§22.7 of the ignition key).

| Item | What it is | Status |
|---|---|---|
| **Testimonial duplication** | Homepage + confirmation carousels both ship one quote repeated across every slide. | **Non-negotiable production gate** (§18) — distinct client quotes required. |
| **Gallery consent** | Real result photography held pending confirmed consent. | **Non-negotiable production gate** (§18). |
| **Phone/WhatsApp country-code mismatch** | `tel:+40723344555` (Romania) vs. `wa.me/41796472106` (Switzerland), consistent across every page — a single content decision left unmade, not drift. | **Client question, explicitly ruled "never edit unilaterally"** (`LEDGER.md` #40) — see §20. |
| **Currency (RON vs. CHF)** | Live prices ship in RON; production market/currency is undecided. | Business decision, routes to client (§11). |
| **`closedPx` caching bug** | Video-teaser collapsed height computed once at init (`js/main.js:226`), never recomputed on resize/orientation change. Explicitly logged as "never fired wrong here [prototype], but production must recompute at collapse time." | Real bug, not just rough edge — must be fixed, not preserved. |
| **`soon.js` whitelist mismatch on `areola.html`'s own nav** | Areola's nav links to the other 5 services use spellings that don't match `soon.js`'s whitelist array — falls back to a generic label instead of naming the service. | Real defect found in this audit — not previously logged. Fixable independent of any architecture decision. |
| **`aria-checked` never updated** | Procedure "radio" buttons always announce as unchecked to assistive tech. | Real defect — see §13. |
| **478/378vh duplicated, no shared source** | Same hero timing constant hand-copied into `js/hero-scroll.js` and `css/main.css` twice each, both files carrying "keep in sync manually" comments. | Real synchronization risk — see §10. |
| **4 undeclared rgba() color-law exceptions** | Hero CSS hardcodes `--ivory`/`--gold` as raw `rgba()` in 4 rules without the "outside the law" comment the codebase uses elsewhere for genuine exceptions. | Logged, not fixed — remedy is a tokens.css change, a Tower act (§6, §20 Conflict C4). |
| **Hero image resolution** | Ships at ~1024-1365px after an abandoned 4× upscale (palette banding). | Accepted debt; files for a future retry remain at `assets/src/`. |
| **`pill-levres` framing** | Repeatedly flagged as visually weak across 3 laps, source-limited. | Never resolved. |
| **`fr.json` internal scaffolding** | Romanian spreadsheet-editor notes mixed into client-facing content file. | Flagged for stripping — copy itself untouched (§11). |
| **EN/RO content never processed** | Source spreadsheets delivered, never extracted. | Open gap, not a decision (§11). |
| **Duplicate FR source file path** | Two byte-identical xlsx files at two unrelated paths (Conflict C3). | Logged, not resolved (§20). |
| **`areola.html` prototype-note deviation** | `LEDGER.md` #51 logs a minor copy-parity gap against spec on this page, still open through the ledger's final entry (#63); insufficient detail recovered by any audit to date to state precisely what the gap is. | **TO DECIDE** — needs the original spec re-checked against current copy by someone with both in hand; not resolvable from this evidence alone. |
| **Dual POLARIS (Conflict C1)** and **stale STATE-MAP (Conflict C2)** | See §20. | Tower/Commander acts, not developer or this-document acts. |

---

## 16. Production reuse map

| Layer | Verdict |
|---|---|
| Brand tokens (`css/tokens.css` colors/type/shadow) | **REUSABLE** as starting values |
| Breakpoint/spacing tokens | **TUNING REFERENCE** |
| Overall CSS architecture (`css/main.css`) | **REFERENCE ONLY** — reproduce the responsive behavior described in §5, not the file |
| Hero scroll behavior + all invariants (§10) | **REFERENCE ONLY** — must survive any re-architecture |
| Hero scroll implementation (`js/hero-scroll.js`) | **REUSE CANDIDATE** at best |
| Carousel/expand mechanisms (`js/main.js`) | **REUSE CANDIDATE** |
| Areola jukebox/tab pattern (`js/areola.js`) | **REUSE CANDIDATE**, fix the whitelist bug first |
| `soon.js` whitelist-before-render pattern | **REUSABLE** as a security pattern |
| Booking form UI (`js/form.js`, both HTML forms) | **PROTOTYPE ONLY** |
| WhatsApp message-composition contract (exact fields, template) | **REFERENCE ONLY** — worth preserving as the approved interim conversion behavior |
| All content in `content/fr.json` | Copy itself **REFERENCE ONLY / verbatim law**; scaffolding **PROTOTYPE ONLY**, strip it |
| QA harness (`docs/qa/harness/`) | **REFERENCE ONLY** — the *technique* (real-code, virtual-clock testing) is valuable; the specific scripts are prototype-scoped |

---

## 17. Developer freedoms

Unless a specific rule above says otherwise, the production developer may freely change: framework, module structure, CSS architecture, state-management strategy, naming, build tooling, rendering strategy, animation implementation (including replacing the hand-rolled hero engine entirely), and internal data structures. The production implementation succeeds by preserving the documented experience contract (§9, §10, §11), not by resembling this prototype's source tree. Nothing in this document should be read as a request to keep vanilla JS, keep the single-file hero engine, or avoid a framework.

---

## 18. Non-negotiables

Kept deliberately small — genuine product laws only, each traceable to strong evidence above.

1. **The hero focus guard (HERO-I9, §10)** must survive in any re-architecture — it fixes a real, previously-shipped, device-certified defect.
2. **Distinct, real client testimonial quotes replace the duplicated placeholder** before any production release (§11, §15 — explicit, unclosed production gate).
3. **Real client gallery photography ships only with confirmed consent** (§11, §15 — explicit, unclosed production gate).
4. **Client copy ships verbatim** — no developer copyedits, corrections, or normalization of the French; any copy change routes to the Commander → client (§11).
5. **`css/tokens.css`'s color/type/shadow values are the sole source of truth** — this is standing constitutional law (`CLAUDE.md`) for this repository; production inherits the *values* as ratified design constants (§6) even though the prototype itself currently carries 4 undeclared exceptions to its own rule (§15) — don't perpetuate the breach while claiming to honor the law.
6. **The `tel:`/WhatsApp country-code mismatch is not a developer's call to resolve unilaterally** — it was explicitly ruled a client question in the source ledger; production must get an explicit answer, not silently pick one on deploy.

---

## 19. Acceptance / QA checklist

Prioritized for high-risk, non-obvious, or historically-regressed behavior — not exhaustive by design (per the master prompt's instruction against generating hundreds of trivial tests).

- The four hero acceptance tests in §10 (I2 downward/upward, HERO-I9 focus guard, reduced-motion fallback).
- The two form acceptance tests in §9.1 (exact WhatsApp message field set, empty-field fallback behavior — re-decide the latter deliberately, don't inherit it silently).
- `cd docs/qa/harness && node matrix.js && node sens.js` — both must report full pass (210/210, 52/52) against any reproduced hero-scroll logic before it's considered behaviorally equivalent; a verdict change on any cell is a choreography change requiring a ruling, not a refactor, per the matrix's own documented culture.
- Real-device pass on iOS Safari (parity bar: no teleport, no scroll-jump, full WhatsApp handoff completes) — the only device this prototype was ever fully certified against.
- Explicit, fresh reduced-motion verification on a real device — do not carry forward "I6 passes" from this prototype, since it never had test coverage here either.
- Keyboard-only pass through the booking form and both carousels, checking specifically for the gaps named in §13 (no swipe-track keyboard path, `aria-checked` never updates, fake checkboxes are invisible to AT).

---

## 20. Conflict register

Transferred from `docs/handoff/EVIDENCE-MAP.md` (Lap H-1) in substance. **All five remain logged, not resolved, by this document.**

**C1 — Dual POLARIS, scoped supersession.** Root `POLARIS.md` (2026-08-04) supersedes `docs/POLARIS.md` (2026-08-01) — but its own supersession clause is scoped (the desktop clause + one specific ruling), not a full-document replacement, while `CLAUDE.md` names `docs/` as law generally, meaning a reader following the constitution literally can land on the superseded brief. `LEDGER.md` #40 logs this as a structural problem and rules its remedy ("retire `docs/POLARIS.md` to Trash") a Tower/Commander act. **TO DECIDE**, not this document's or any executor session's call.

**C2 — `docs/STATE-MAP.md` is two eras stale.** Specifies an earlier, now-retired hero direction; the shipped hero (this document's §10) postdates it by eleven-plus laps documented nowhere in that file. `CLAUDE.md` states this session does not author STATE-MAP. **TO DECIDE by the Tower**, never treat `docs/STATE-MAP.md` as current specification regardless.

**C3 — Duplicate FR content source file.** See §11. Byte-identical, two unreconciled paths. **TO DECIDE** — pick one canonical path.

**C4 — Color-law breach claim.** `LEDGER.md` #40 named 4 specific `css/main.css` rules (194, 214, 237, 371) as undeclared token duplicates. **This document's own direct code read independently confirms all 4 at the same line numbers** (§6) — the *fact* of the breach is now VERIFIED, not merely claimed. **The remedy remains TO DECIDE** (adding `--ivory-rgb`/`--gold-rgb` tokens is a Tower act) — evidence strength changed, adjudication did not.

**C5 — Phone/WhatsApp country-code mismatch.** See §15, §18. Explicitly ruled a client question, never resolved through the source ledger's final entry. **TO DECIDE by the client**, never by a developer unilaterally.

---

## 21. Open decisions

Consolidated pointer list — each item's full context lives at its cited section, not repeated here.

- C1-C5 (§20).
- Currency: CHF vs. RON vs. market-selected (§11).
- `noindex,nofollow` for the *production* site — no evidence either way (§7).
- `areola.html`'s Entry #51 prototype-note deviation — insufficient detail recovered to resolve (§15).
- Whether the booking form's zero-validation posture is intentional for production or purely a prototype facade to be replaced wholesale (§9.1 — evidence supports "replace," but this document does not rule).

---

## 22. Contract changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-08-22 | Initial issue. Authored under Lap H-2 (Ignition Key), built on the Tower-certified Lap H-1 evidence map. Not yet hostile-validated (Lap H-3) or Tower-certified. |
