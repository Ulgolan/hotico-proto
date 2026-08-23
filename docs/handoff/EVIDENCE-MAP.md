# EVIDENCE-MAP — HOTICO Production Handoff (Lap H-1)

Scope: this is a **map only**. It inventories what exists and what it can
prove; it drafts nothing toward `PRODUCTION-HANDOFF.md` (that is Lap H-2)
and resolves no conflict it finds. Every contradiction below is logged,
not adjudicated.

## 1. Snapshot

| | |
|---|---|
| Branch | `handoff-h1-evidence-map` (cut from `main`) |
| Commit SHA at branch point | `62c2bfaa0c373568f44a844cd1c918ad9b5067bf` |
| Date | 2026-08-22 |
| Working-tree state | Clean at branch time, except one **untracked, uncommitted** directory: `_ingest/` (`convert.py` + 6 PNGs — an image-conversion staging area). It is not in this mission's file list and is not inventoried below; see Coverage Confession §4. |

---

## 2. Inventory

### 2.1 Major pages

| Path | What it is | Evidence questions it answers |
|---|---|---|
| `index.html` (860 lines) | Single-page homepage: header, kintsugi-scroll hero, 5-slide video carousel, 6 service pills, "Pasii transformarii" 3-card focus walk, 3-step booking form + confirmation, reviews carousel, footer. `<meta name="robots" content="noindex,nofollow">` confirmed present. | Full section/page inventory for a rebuild; confirms the noindex law is honored in code, not just in CLAUDE.md. |
| `servicii/areola.html` (655 lines) | The one fully-built individual service page: nav switcher to the other 5 (placeholder) services, Vimeo "stage" player, Détails/Prix/Galerie tab bar, 7 FAQ accordions wired to swap the stage video ("jukebox" pattern), collapsible pricing tiers, a gallery tab held pending client photo-consent, plus the same booking form/reviews as the homepage. `noindex,nofollow` present. | What a "complete" service-page template must reproduce; what content is withheld pending consent. |
| `servicii/in-curand.html` (36 lines) | "Coming soon" placeholder for the other 5 services; `soon.js` fills in the service name from a whitelisted `?s=` param. `noindex,nofollow` present. | What the deliberate dead-end/facade pattern looks like for unbuilt content — 5 of 6 services have no real page yet. |

### 2.2 Major interactive systems / components

| Path | What it is | Evidence questions it answers |
|---|---|---|
| `js/hero-scroll.js` (1528 lines, internal version marker v26) | The kintsugi-scroll hero engine: scroll-scrubbed virtual camera (pan/zoom/`translate3d`) across one statue image through 6 named stops, a hand-rolled "settle" easing/snap system, a two-phase dissolve handoff into the next section, touch/wheel gesture-anchoring, and a focus guard that suspends itself while a form field is active. The single most complex and fragile file in the codebase. | What exact animation/interaction logic a production build must replicate or deliberately re-architect; where the highest porting risk sits. |
| `js/main.js` (353 lines) | Shared swipeable carousel engine (drives both the video block and reviews), video-teaser expand-in-place with lazy iframe load, and the Pasii "focus-mode" card expansion. | Which single engine underlies two different-looking carousels. |
| `js/form.js` (174 lines) | Booking wizard step navigation; on confirm, composes a message and opens a `wa.me` WhatsApp deep link with name/phone/date/time/procedure. Explicitly a facade — no field validation, no data submitted anywhere. | Confirms the booking form's entire "backend" is a WhatsApp deep link; what real validation/submission a production build must add from scratch. |
| `js/areola.js` (116 lines) | Powers `servicii/areola.html`: tab bar, FAQ/video jukebox, price-tier collapsibles. | What logic is specific to the one built service page vs. shared in `main.js`. |
| `js/soon.js` (11 lines) | Whitelists a `?s=` query param against 5 known service names before injecting it into the placeholder page; never renders raw query text. | The one deliberate XSS-safety pattern in the codebase, worth preserving as-is. |

### 2.3 Design-system files

| Path | What it is | Evidence questions it answers |
|---|---|---|
| `css/tokens.css` (46 lines) | The sole declared source of color (`--ivory`, `--cocoa`, `--gold`, `--hotico-pink`, `--field-gray`, `--white`, `--card`, `--placeholder`, plus `--gold-grad`/`--gold-line`), type (`--font-head`: Raleway, `--font-body`: DM Sans), shadow (`--shadow-neo`), and the desktop-campaign spacing scaffold (`--bp-desktop:768px`, `--bp-split:1024px`, `--width-grade:1440px`, `--content-max:1200px`, `--column-read:720px`). Also codifies the `body{max-width:480px}` mobile law directly, commented "canon v1.1.2 — ratified 2026-08-02." | The canonical palette/font/shadow values and their ratification date; where the 480px law actually lives in code. |
| `css/main.css` (1776 lines) | The full stylesheet, lettered-section commented (header, kintsugi hero, video, servicii, pasii, form, reviews, footer, plus a second pass for `areola.html`'s tabs/FAQ/price/gallery and `in-curand.html`'s "soon" costume). Confirmed breakpoints in the actual rules: base/mobile below 768px; `@media (min-width:768px)` at line 1578 (`body{max-width:none}` + column-read constraint, the desktop-grace-floor override CLAUDE.md refers to); `@media (min-width:1024px)` at line 1606 (the "split tier" — 2-col video, 3×2 services grid, 3-across Pasii, 2-col form, single-column reviews). Two raw (non-token) color values are self-commented as deliberate exceptions to the color law: the Swiss-flag red/white and a mask-alpha black. | The exact breakpoint values and what changes at each tier — confirms in code what CLAUDE.md states as law; which two color-law exceptions are self-declared vs. accidental. |

### 2.4 Content sources

| Path | What it is | Evidence questions it answers |
|---|---|---|
| `content/fr.json` (751 lines) | Extracted French copy (lap C-1), one key per service/page (home, areola, alopécie, cicatrices, sourcils, eyeliner, lèvres, a landing-page section, a "cosmetic LP" section, contact). Declares itself in `_meta` as sourced **verbatim** from `content/source/hotico-content-fr.xlsx`. Still carries internal Romanian scaffolding (`_sheet_labels`, branching-logic notes) mixed in with client-facing French text. | Whether the current staged copy is production-clean (it is not — internal notes remain embedded and would need stripping). |
| `content/fr-review.md` (1630 lines) | A human-readable Markdown mirror of `fr.json`, explicitly "rendered verbatim... nothing here is edited, corrected, or normalised." A proofing artifact for the extraction, not an editorial content review. | Whether a readable proof of the extraction exists (yes) — but it is not evidence of content quality/approval. |
| `content/source/hotico-content-en.xlsx` (80,113 bytes), `hotico-content-ro.xlsx` (88,090 bytes), `hotico-content-fr.xlsx` (83,603 bytes) | Trilingual source spreadsheets, all modified at the identical timestamp 2026-08-04 16:54 — a single batch delivery. Only the FR file has been extracted into the prototype (`fr.json`/`fr-review.md`); no `en.json`/`ro.json` exist. | Confirms EN and RO content was delivered and never processed — a live gap, not a decision, if English/Romanian versions are ever wanted. |
| `docs/spec/refonte/MANIFEST.md` + `docs/spec/refonte/hotico-fr-content.xlsx` | Chain-of-custody manifest for lap `r0-asset-foundry` (2026-08-07), listing files moved verbatim from an intake folder, including a SHA-256 hash for `hotico-fr-content.xlsx`. | Whether a verifiable hash-anchored copy of the French source exists — yes, and it was independently confirmed (see §3, C3) to be byte-identical to `content/source/hotico-content-fr.xlsx`. |

### 2.5 Asset families

| Path | What it is | Evidence questions it answers |
|---|---|---|
| `assets/brand/` — `logo-black.png` (46.6KB), `logo-white.png` (48.8KB), `style-guide-v1.1.pdf` (922KB) | Brand reference assets. PDF not opened by this task (binary, out of grep reach). | Where the canonical logo files and brand-guide document live. |
| `assets/img/` — 6× `pill-*.webp` (service pills), 3× `etapes-*.webp` ("Pasii" steps), `statue-kintsugi-v3.webp` (current hero source image), `temp-1x/` (lip before/after, pasii cube/sphere/stone, video-thumb — its own `README.txt` flags these as temporary placeholders) | The live raster asset set actually referenced by the shipped pages. | Which images are final vs. explicitly marked temporary. |
| `assets/src/` — `Hero_Hotico_4x.png`, `Hero_Hotico2_4x.png` | High-resolution hero-image attempts. Per `LEDGER.md`, a 4× upscale of the statue source was abandoned after palette-quantization banding — accepted as prototype debt (see §2.7). | Why the shipped hero source is lower-resolution than these files despite their presence. |
| `docs/reference/` — 8 PNGs (`Homepage A/B`, `Services_areola-1..6`) | Client-supplied reference screenshots. | What the client's own visual reference looked like at various points. |
| `docs/spec/refonte/` — spec PNGs (`spec-anchors-v3`, `spec-anchors-v3-1`, one `spec-*` sheet per service) + `MANIFEST.md` + the xlsx above | Figma-exported design specs moved into the repo for the refonte (redesign) chain, with a documented supersession (an earlier "Statue A" direction killed by client ruling, old mockups moved to Trash per the no-hard-delete law, superseded by the v3/v3-1 anchor sheets). | The specific design-direction supersession trail for the hero's anchor artwork. |

### 2.6 QA / test evidence

| Path | What it is | Evidence questions it answers |
|---|---|---|
| `docs/qa/gesture-matrix.md` | Certified choreography matrix: 12 regions × 5 gesture speeds × 2 directions × 2 inputs (240 cells; 210 asserted-pass, 30 documented as structurally unreachable) against 5 named invariants (I1–I5), plus 52 addendum assertions (go-home, launch-threshold, keyboard, rail-click). Explicitly states 2 invariants — **I6 (reduced-motion) and I8 (paint-lag-vs-interaction)** — have **zero** test-cell coverage. Only 2 synthetic viewports tested: 390×844 and 1280×720. | Exactly what scroll-gesture behavior is proven, and exactly what is not (reduced-motion and paint-lag are explicit gaps). |
| `docs/qa/harness/*.js` (16 files: `harness`, `probe`, `gest`, `matrix`, `sens`, `verify`, `verify2`, `door`, `border`, `addendum`, `chain`, `autopsy`, `repro2`, `variants`, `compare`, `touch`) | A Node DOM-shim harness that runs the real `js/hero-scroll.js` (not a reimplementation) inside a virtual 60fps clock and virtual scroller, built because the preview sandbox cannot run real `requestAnimationFrame`/compositing. Each file targets one named historical bug or invariant (e.g. `touch.js` reproduces the original mobile touch-seizure bug; `door.js` proves the "exit gap" resolution rule; `border.js` asserts native scroll is never captured past the free-zone boundary). Every file's header self-discloses 8 historical harness defects (D1–D8) found and fixed in the harness itself. | Which specific historical bugs are proven fixed against pre-fix code snapshots, and which are only asserted against current behavior. |
| `docs/qa/harness/snapshots/` | Empty except a README explaining regeneration requirements. 9 of 11 comparison scripts need a historical `js/hero-scroll.js` build restored via `git show <hash>:...` before they can be re-run. | Confirms the historical-comparison harness scripts are **not currently re-runnable out of the box** — a real gap for a production team trying to re-verify these claims. |
| `docs/qa/r2-scroll-feel/` | 25 PNGs: before/after screenshot pairs at two heights (764px, 844px) across the 6 hero stops, plus one `reduced-motion_static-tier.png`. Static visual evidence only — not pixel-diffed by any tooling. | What the reduced-motion fallback tier looks like as a rendered artifact (one screenshot exists; no automated visual-regression coverage exists beyond it). |
| `LEDGER.md` device-certification entries | Human ("Commander's eye") certification passes: iOS Safari certified clean (no teleport/scroll-jump) at Entry #61; Brave iOS certified with one residual scroll quirk explicitly ruled "browser-specific" and accepted as a **watched, not fixed**, seam. | The only real-device evidence in the repo is manual and narrow (2 iOS browsers, no Android, no desktop-browser device matrix). |

### 2.7 Known prototype debt (as explicitly logged in `LEDGER.md`)

- **Reviews/testimonial duplication** — the confirmation-screen carousel and the homepage reviews carousel both ship with the identical single testimonial repeated across all slides. Logged as an open **production gate**: distinct client quotes are required before production (still open at the final ledger entry, #63).
- **`closedPx` caching bug** (Découvrez video block) — collapsed height computed once at init, never recomputed on resize/orientation change; flagged as a real bug, not just prototype rough edge (Entry #49).
- **Hero asset resolution** — statue source image ships at ~1024–1365px; a 4× upscale attempt was abandoned after palette-quantization banding (Entry #24, files remain at `assets/src/`); accepted as debt.
- **`pill-levres` (lips) image framing** — repeatedly flagged as visually weak, source-limited, never resolved (Entries #29, #30, #40).
- **Hero timing constants duplicated** across CSS and JS (e.g. 478vh/378vh figures) with no single source of truth (Entry #40, unresolved at close).
- **Color-law exception claim** — Entry #40 (item C5) states four hero CSS rules hardcode `rgba()` values duplicating existing tokens instead of referencing them, calling it a constitutional breach requiring new `*-rgb` tokens. This task's direct read of `css/main.css` found two *different*, self-commented exceptions (Swiss-flag colors, mask alpha) but did not specifically re-locate the four hero `rgba()` rules Entry #40 describes — see Coverage Confession §4 and Conflict C4.
- **Phone/WhatsApp country-code mismatch** (`tel:+40` vs. `wa.me/41`) — flagged repeatedly as an open client question across multiple ledger entries, never edited unilaterally by the executor session, unresolved through Entry #63.
- **Gallery photo consent** — real client photography pending consent confirmation since the earliest entries; `areola.html`'s gallery tab ships a held placeholder, not real images.
- **`areola.html` prototype-note deviation** — a minor copy-parity gap against spec, noted as still open at Entry #51.

### 2.8 Documentation conflicts

See the Conflict Log in §3 — summarized pointer only, per instruction not to duplicate resolution here.

---

## 3. Conflict Log

Each entry: the sources in tension, what each says, and the fact that it is **logged, not resolved**, per instruction.

### C1 — Dual POLARIS: full vs. partial supersession
- **Sources:** root `POLARIS.md` (sealed 2026-08-04) vs. `docs/POLARIS.md` (sealed 2026-08-01).
- **Root POLARIS's own header** reads "Sealed 2026-08-04 · Supersedes 2026-08-01 brief," but its supersession clause, read directly, is **scoped**: it names supersession of "the out-of-scope desktop clause + Option-1 ruling of the 2026-08-01 brief" specifically — not a full document replacement.
- **`LEDGER.md` Entry #40** (Phase C audit) treats this as an unresolved structural problem: *"C1 — TWO COMPASSES, AND THE STALE ONE SITS WHERE THE LAW POINTS"* — because `CLAUDE.md` names `docs/` as law, a reader following the constitution literally lands on the superseded 2026-08-01 brief at `docs/POLARIS.md`, which "has never been retired."
- **Status:** Open through the final ledger entry (#63). The ledger itself rules the fix ("retire `docs/POLARIS.md` to Trash") is a Tower/Commander act, not something an executor session may do unilaterally.
- **Logged, not resolved** by this task.

### C2 — STATE-MAP.md staleness: asserted vs. self-declared
- **Direct read of `docs/STATE-MAP.md`** (this task): the file contains **no internal marker** flagging itself as stale, outdated, or superseded — it presents its interaction spec as current.
- **`LEDGER.md` Entry #40** explicitly asserts staleness: *"C2 — THE INTERACTION SPEC IS TWO ERAS BEHIND THE ARTIFACT"* — noting `docs/STATE-MAP.md` still specifies the pre-kintsugi hero (Romanian tagline, marble-statue description) while the shipped hero is an entirely different, French-tagline scroll film built across eleven subsequent laps that exist "in no spec document at all."
- **Status:** Open through the final ledger entry. Per this mission's own instructions, `docs/STATE-MAP.md` must not be trusted as current specification regardless of this conflict's resolution.
- **Logged, not resolved** by this task.

### C3 — Duplicate French content source file
- **`content/source/hotico-content-fr.xlsx`** (modified 2026-08-04) and **`docs/spec/refonte/hotico-fr-content.xlsx`** (modified 2026-08-07, per `MANIFEST.md`) are **confirmed byte-identical**: both hash to SHA-256 `21d20ae183251835ff19af114a6df34156ad5710743a67968eb33a6f8d086641` (independently verified by this task via `shasum`).
- Neither `content/fr.json`'s `_meta` block nor `docs/spec/refonte/MANIFEST.md` cross-references the other file's location — each lap (C-1 content extraction; r0-asset-foundry chain-of-custody) appears to have independently anchored the same bytes under a different name and path.
- **Status:** Not a content divergence (files are identical), but an unreconciled duplication of "source of truth" location. A production handoff should pick one canonical path and retire the other rather than carrying two.
- **Logged, not resolved** by this task.

### C4 — Color-law breach claim: ledger assertion vs. this task's direct read
- **`LEDGER.md` Entry #40 (item C5)** states four specific hero CSS rules in `css/main.css` hardcode `rgba()` values duplicating existing tokens, calling it an unresolved constitutional breach of the tokens-only color law.
- **This task's direct inspection** of `css/main.css` located two *different* self-commented color-law exceptions (Swiss-flag red/white, a mask-alpha black) but did not independently re-locate or confirm the specific four `rgba()` hero rules the ledger describes.
- **Status:** Unreconciled — this may be the same finding described two different ways, a since-partially-fixed issue, or a genuine gap in this task's coverage. Not verified either way.
- **Logged, not resolved** by this task; flagged again in Coverage Confession §4.

### C5 — Phone / WhatsApp country-code mismatch (content/business-logic, not documentation, but unresolved and evidence-relevant)
- `tel:+40` (Romania) links coexist with `wa.me/41` (Switzerland) WhatsApp links. `LEDGER.md` Entry #40 (item M9) flags this as a standing client question, repeated through Entry #63, never resolved by any executor session.
- **Logged, not resolved** by this task.

---

## 4. Coverage Confession

Read in full and directly inspected by this task or its research delegates: `CLAUDE.md`, root `POLARIS.md`, `docs/POLARIS.md`, `docs/STATE-MAP.md`, `docs/DOSSIER.md`, `docs/IGNITION_K-6_mobile-projection-bug.md`, `docs/IGNITION_kintsugi-scroll.md`, `LEDGER.md` (all 5,607 lines / 63 entries), `docs/qa/gesture-matrix.md`, `docs/qa/harness/README.md` and all 16 harness `.js` files, `docs/qa/harness/snapshots/README.md`, `css/tokens.css`, `css/main.css`, `index.html`, `servicii/areola.html`, `servicii/in-curand.html`, all 5 `js/*.js` files, `content/fr.json`, `content/fr-review.md`, `docs/spec/refonte/MANIFEST.md`, `README.md`, `.gitignore`.

**Not read in full — honestly listed:**

- **Binary spreadsheets** — `content/source/hotico-content-{en,ro,fr}.xlsx` and `docs/spec/refonte/hotico-fr-content.xlsx`: only file metadata (size, mtime) was inspected, plus one SHA-256 hash comparison (C3). No sheet/cell contents were opened or diffed against `content/fr.json`'s "verbatim" claim to independently verify it.
- **`assets/brand/style-guide-v1.1.pdf`** — existence and size (922KB) noted only; not opened.
- **All raster/image assets** — every PNG/webp under `docs/reference/`, `docs/spec/refonte/`, `docs/qa/r2-scroll-feel/`, `assets/img/`, `assets/src/`, and `assets/brand/*.png` — inventoried by filename and path only; none were visually opened or pixel-inspected by this task.
- **The Figma file** — referenced throughout the doctrine as "visual truth," but it is an external resource outside this repository and was not, and could not be, inspected by this task.
- **Live re-execution of the QA harness** — the 16 harness scripts and the gesture matrix were read for their stated purpose and self-reported results, not re-run. The "210/210 cells pass" and "8 harness defects fixed" claims were not independently re-verified against the current `js/hero-scroll.js` by this task.
- **The exact four `rgba()` hero rules** LEDGER Entry #40 (C5) describes — not independently re-located in `css/main.css` by this task; see Conflict C4.
- **`_ingest/`** — an untracked, uncommitted directory present in the working tree (`convert.py` + 6 PNGs, an apparent image-conversion staging area). It is outside this mission's file list and was not inventoried; noted only in the snapshot header (§1) as a working-tree fact.
- **`.claude/launch.json`** — exists (gitignored, per `.gitignore`), not read; not evidence-relevant to a production handoff.
- **Other git branches** — this repo has ~30 local/remote lap branches beyond `main`; only `main`'s current tree was inventoried. Historical branch contents were not diffed except where `LEDGER.md` describes them narratively.

**Self-grep for excluded terms** (performed on this document before commit, per mission instruction): checked for `torso`, `gift`, `cadeau`, `surprise`, `Mission T`, `/lab` — zero unexplained hits found in this file.
