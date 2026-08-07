# LEDGER — hotico-proto

## Entry #1 — 2026-08-02 — Lap 0: forge

**Scope:** scaffold the repo. Foundation only, no screens.

**Created:**
- `index.html` — hello page: logo + "HOTICO — prototype în construcție",
  Raleway/DM Sans via Google Fonts, `noindex,nofollow` in head
- `css/tokens.css` — the five colors, two fonts, neomorphic shadow,
  480px body max-width
- `css/main.css` — hello-page layout only
- `js/main.js` — empty placeholder
- `docs/STATE-MAP.md`, `docs/POLARIS.md`, `docs/DOSSIER.md` — stubs,
  Tower-authored content pending
- `CLAUDE.md`, `README.md`, `LEDGER.md`
- `assets/` — unzipped from `hotico-starter.zip`: `brand/` (logos, style
  guide v1.1 PDF, 10 icons, 4 patterns) and `img/` (hero-torso,
  7 service strips, temp-1x set). Zip moved to Trash, not deleted.

**Notes / debts:**
- Service strips are **1x proto-grade**. A 2x re-export is owed before
  anything leaves prototype status.
- Gallery imagery is **pending consent confirmation** — not yet cleared
  for use.

**State at close:** local preview only. Awaiting ACP's eye before GitHub
push and Vercel connection.

**Certification:** Lap 0 certified by Commander's eye; prototip wording
fixed; Tower docs delivered to docs/; launch.json footprint in parent
folder noted.

---

## Entry #2 — 2026-08-02 — Lap 1a: homepage, static

Branch `lap-1a-homepage-static`. Frame A resting states, sections a–i,
one commit each. **Zero JS** — `js/main.js` untouched, no inline handlers.
Reference frames (Aug 1 pair) copied to `docs/reference/`.

### Rulings carried in
- **FB icon → WhatsApp per Commander; canonical URLs used; WA number
  is +41 (dossier E19 note).** All four socials `target="_blank"
  rel="noopener"`, in hero and footer.
- **Band wording per frames; supersession applies to lockup only,
  C11 open.** Band reads "Descoperiti HOTICO Dermopigmentation
  Institute"; header/footer use the RESTAURATION INSTITUTE lockup.
- Footer nav typo fixed: frame reads "Servici", built as **"Servicii"**
  (typo law).
- Duplicate "Marina" review shipped as designed (DOSSIER D15).
- Footer tel: `+40723344555`.

### Token amendment — canon v1.1.1, values MEASURED from Homepage A.png
Sampled at y=570, rule span x=26..363 (337px), symmetric fade:

```
--gold-grad: linear-gradient(90deg,
  var(--ivory) 0%, #DAC49E 16%, #CEB27B 28%,
  #C9A86A 50%,
  #CEB27B 72%, #DAC49E 84%, var(--ivory) 100%);
--gold-line: #C9A86A;
--white:     #FFFFFF;
--card:      #E9E9E9;
```

Measured stops verbatim, edge → centre: `#F0EBE4 0.0%`, `#EAE2D2 3.3%`,
`#E4D8C0 7.1%`, `#E2D3B8 11.0%`, `#DFCEAF 11.3%`, `#DCCAA7 15.7%`,
`#DAC49E 16.0%`, `#D4BB8C 21.1%`, `#D1B683 27.6%`, `#CEB27B 27.9%`,
`#C9A86A 37.1%–62.9%` (core plateau), then mirrored.

**Finding that contradicts the amendment's premise:** there is no
metallic gold gradient anywhere in frame A. Pill borders, arrow circles,
social circles and the video frame are all **flat #C9A86A** (verified by
pixel census: 1869 px on the social circles, 347 px on the video frame,
zero non-AA neighbours). The only gradient is the section divider rule
above. What read as "metallic" at low resolution is the marble
photography plus `--shadow-neo`.

**Deviation pending ruling:** the amendment named `--white:#FFFFFF` for
"pill/card grounds". Measured, those grounds are flat **#E9E9E9** — a
deliberate step *darker* than the ivory page, which is what the
neomorphic separation rests on. Built with a new `--card:#E9E9E9`;
`--white` retained as ratified and used for the burger circle and icon
glyphs. **`--card` is not a ratified token name.**

Two further values measured rather than invented, no new tokens:
- inactive stepper bars `#F7BADC` = `--hotico-pink` at 25% on ivory
  → built as `rgba(254,9,144,.25)`
- pink CTA is a 2px pink ring + 1px ivory inset + pink fill (frame A
  y2516–2519), not a pale-pink border
- placeholder glyph colour `#9E9E9E` (darkest sampled px) — the one
  value with no token and no derivation; flagged.

### Service strip mapping (numeric match against docs/reference)
| Service | Strip |
|---|---|
| Areola | strip-01 |
| Cicatrici | strip-02 |
| Alopecie | strip-03 |
| Sprancene | strip-03 |
| Eyeliner | strip-04 |
| Buze | strip-05 |

**strip-03 and strip-06 are two export variants of the same
photograph**, and frame A uses that photograph for both Alopecie and
Sprancene (mean pixel diff 5.8 — same image, different crop offset).
strip-06 fades to black, wrong against an ivory pill, so strip-03 serves
both. **strip-06 is currently unused** — awaiting ruling.

### Debts opened this lap
- `video-thumb.png` (temp-1x) ships with the gold frame **and** the
  "▶ 3mn" badge baked into the pixels. CSS frame + badge were built,
  then suppressed to stop them doubling. Request a clean photo-only 2x
  export so both become token-driven again.
- Header ground measured `#F1F1F1` vs page `#F5F5F5`; built with
  `--ivory` to hold the colour law. Imperceptible, logged for honesty.
- Favicon not built this lap (out of key scope). STATE-MAP names the H
  kintsugi symbol — `assets/brand/icons/icon-8.png` or `icon-9.png`
  are the candidates.
- Service strips remain 1x proto-grade (carried from entry #1).

**State at close:** pushed, not merged. Awaiting Commander's eye on the
Vercel preview URL.

### Eye passed — rulings, 2026-08-02

**Canon v1.1.2 accepted.**
- **Flat gold law:** every gold surface is flat `--gold`. Confirmed as
  canon, not just a measurement.
- `--gold-grad` is the **divider rule only**. Not to be reached for
  anywhere else.
- `--card:#E9E9E9` **RATIFIED** into tokens.css.
- `--placeholder:#9E9E9E` **added**; the naked CSS value is gone.
  `main.css` now holds no brand colour outside tokens — the only hexes
  left are `#000` as mask alpha and the three Romanian flag colours,
  both annotated in place as deliberately outside the colour law.

**Debts confirmed and carried:**
1. `video-thumb.png` — clean photo-only **2x export** owed, so the gold
   frame and "3mn" badge return to being token-driven.
2. **strip-06 retired** — duplicate export variant of strip-03.
3. **NEW —** *"divider soft-shadow bloom per frame A is weaker/absent
   in build; Commander taste note, scheduled Lap 1b."*
4. Service strips remain 1x proto-grade (from entry #1).
5. Favicon (H kintsugi) still unbuilt — out of Key #2 scope.

**Merged to main** on the Commander's word. Lap 1a sealed.
Branch `lap-1a-homepage-static` deleted local + remote; the record
lives in the merge commit and here.

---

## Entry #3 — 2026-08-02 — Lap 1b: homepage choreography

Branch `lap-1b-choreography`. Vanilla JS only, one file. Video
carousel, burger, form logic and smooth-scroll all left untouched.

### A. Servicii dual-action pills
Pill body is now an `<a>` to the service page; the gold arrow is a
separate `<button>` toggling an inline panel. Open costume per State
Map: corners rounded → square-ish, arrow flips up, gold circle becomes
a rounded square. **ABUNDANCE MODE** verified — several panels sit
open at once.

**Dead-end pages built** (honest-facade law — no `#`, no 404):
- `servicii/in-curand.html?s=<Service>` for the five undesigned
  services. The name is resolved against a **whitelist**; raw query
  text is never written into the page.
- `servicii/areola.html` — **not asked for by the key.** The key sets
  the Areola href to this path, and without the file the pill would
  404, which POLARIS non-negotiable #1 forbids. Built with the same
  dead-end costume and marked in-file as a **T2 SLOT** to be replaced
  wholesale when Lap 2 builds the real template. Flagged for ruling.

### B. Before/After slider
Composite split logged: **seam at x=175** (white line spans x=173–177).
`lips-before.png` = x0–172 (173×303), `lips-after.png` = x178–389
(212×303), photo band **y=46–348** — which also drops the baked-in
"Before"/"After" labels and the pill-border chrome the crop carried.
Labels are now DOM elements pinned to the panel corners, so they hold
still while the seam moves.

Reveal uses **clip-path**, not layer width: both photos stay at full
panel size, so dragging never rescales an image. Pointer, touch,
click-to-jump and keyboard (arrows / shift / Home / End) all drive it;
`aria-valuenow` tracks.

**Known simplification, as instructed:** all six pills open the same
lips sample — it is the only designed one.

**Debt:** proper separate 2x before/after exports owed. The two halves
are different crops of one photograph, so they do not register with
each other; the seam reads as a comparison but the two sides are not
the same framing. Only real exports fix this.

### C. Pasii focus dance
Arrow on a card expands the full numbered walkthrough; the other two
cards hide. **FOCUS MODE** — one open maximum. Gold collapse bar with
up-arrow restores the resting three. Copy taken from frame B, filler
as designed: *1. Alege serviciul potrivit · 2. Fa o programare ·
3. Vei primi o confirmare*. (Frame B's "Alege serviciul **potrivit**"
supersedes the shorter STATE-MAP wording — frame is visual truth.)

### D. Polish rider — divider bloom
Measured across every true divider in frame A: **14.7% black adjacent
to the rule, fading to nothing at 46px** (245→209 at 1px, back to 245
by 46px). Built as a `::after` gradient beneath the rule:
`rgba(0,0,0,.147) 0% · .090 25% · .035 55% · 0 100%`, height 46px.

**Observation for the record:** in frame A the bloom sits on **one
side only, and which side alternates** — above the hero and Reviews
dividers, below the video and Pasii ones. That reads as section
containers casting the shadow rather than the rule itself. Rendered
beneath per the Commander's note; say the word if it should alternate.

### Engineering notes
- Panel height helpers finalize on a **timer as well as
  `transitionend`**. A missed event was leaving the Pasii block
  collapsed but the two hidden cards never restored — caught in test,
  fixed. `prefers-reduced-motion` skips the animation entirely.
- Local `css/` and `js/` now carry **`?v=1b`**. Without it a reloaded
  phone kept serving the previous lap's JS — this bit during
  verification and would have bitten the Commander's eye harder.

### Debts opened / carried
1. Separate 2x before/after exports (new, B above).
2. `pasii-*.png` carry their own gold border + label in the pixels,
   same defect as `video-thumb.png`. Focus mode keeps `object-fit:
   cover` to crop that chrome out; faint baked border edges still show
   at the card sides. Clean 2x exports fix both.
3. `video-thumb.png` clean 2x export (carried).
4. Service strips 1x proto-grade (carried); strip-06 retired.
5. Divider bloom side alternation (D above) — awaiting taste ruling.
6. Frame B lists the services in a different order than frame A
   (Cicatrici sits 5th, not 2nd). Built to frame A per Key #2. No
   action taken; logged so it is owned, not drifted into.
7. Favicon still unbuilt.

**State at close:** pushed, not merged. Awaiting the eye.

### Eye passed — riders built 2026-08-02

**RIDER 1 — Pașii scroll-home.** Gold-bar tap now returns the viewport
to the Pașii section top. Target is read **after** the cards restore
and a reflow is forced: collapsing removes ~650px, and a scroll aimed
before that shrink lands ~785px short — caught in test. A landing
guard follows the smooth request; if a browser ignores `behavior:
'smooth'` the scroll completes instantly rather than stranding anyone.
`prefers-reduced-motion` goes straight to instant.

**RIDER 2 — video carousel with real Vimeo embeds.** 3 slides, whole
block (video + title + description) travels as one unit. Responsive
16:9 iframes inside the gold frame costume — which is **token-driven
again**, and the baked "3mn" badge retires with the temp thumb.

All three players verified rendering in-page, no fallbacks needed:
- Slide 1 — `1134716314` · *HOTICO — L'art qui guérit* · 02:23
- Slide 2 — `1134716271` · *Pourquoi HOTICO en bonnes mains* · 01:58
- Slide 3 — `1134716322` · *Changer des vies par l'art* · 02:13

Slides 2–3 lazy-load: a slide's `src` is set when it becomes current,
plus one ahead, so the first paint carries one player, not three.

**Gesture compromise (logged as instructed):** a cross-origin iframe
swallows every pointer event over the player, so a swipe begun on the
video itself cannot reach us. The swipe surface is everything around
it — title, description, block padding — and the **dots are primary
navigation**. Reviews have no iframe, so the whole card swipes. Both
carousels share one gesture implementation: 15%-of-width threshold,
axis lock so vertical drags stay the page's, resistance at the ends.

**Dots: 3, matching content. The frame shows 4 — deviation logged.**

*Carousel demo-grade; real video embeds + per-video copy = future lap.*
Embeds are now real; **per-video copy is still filler** — all three
slides carry "Cine sunt eu", the only designed title/description.

**RIDER 3 — Reviews swipe.** 6 cards, one per view, 6 live dots, same
gesture vocabulary. *6x Marina demo filler; real reviews = content
owner, DOSSIER D15/D16.*

**Bug caught in test:** converting the Reviews grid left one orphaned
lap-1a `<article>` outside the carousel — the section rendered a card,
then the dots, then a stray seventh review. Removed; 6 in, 0 orphans.

**Standing rulings applied:** areola.html T2 slot ratified; bloom stays
uniform (alternation parked as a taste option); lips 1x registration
debt sits with ACP; cache-bust bumped to **`?v=1b2`**.

### Debts after riders
1. Per-video copy — three slides, one set of words.
2. Separate 2x before/after exports (lips registration).
3. Clean 2x exports for `video-thumb` (now unused on the homepage),
   `pasii-*` card crops.
4. Service strips 1x proto-grade; strip-06 retired.
5. Divider bloom alternation — parked taste option.
6. Frame A / frame B service order disagreement — built to frame A.
7. Favicon still unbuilt.

**Merged to main** on the Commander's word. Lap 1b sealed.
Branch deleted local + remote.

**Discovered real Vimeo titles** (homepage carousel):
1. *HOTICO — L'art qui guérit* · 02:23
2. *Pourquoi HOTICO en bonnes mains* · 01:58
3. *Changer des vies par l'art* · 02:13

FR title/CTA overlay upgrade stays a **future rider**, as logged.

---

## Entry #4 — 2026-08-02 — Lap 2a: services / Areola page

Branch `lap-2a-services-areola`. Cache-bust `?v=2a` across all pages.
First commit carried the ruled `walk__img` empty-src fix.

**Content bible (FR) received; RO-tonight/FR-lap-later ruled; homepage
carousel is actually 5 videos with real titles/CTAs — upgrade logged
as future rider.**

### A. Page shell
Header and footer reused from the homepage verbatim (paths re-rooted
for `/servicii/`). Services menu: all six, Areola active with the gold
underline, the other five to `in-curand.html?s=…`. Title, stage
player, "Despre procedura" copy per frame S-3.

### B. Tab menu
Detalii / Pret / Galerie. Gold pill slides on a transform; **all three
panels live in the DOM**, swapped by `hidden`.

### C. Detalii — six accordions, FOCUS MODE, real jukebox
Play swaps the stage to that section's episode and scrolls to the
player. **Closing an accordion never changes the record** — verified.
**STAGE DEFAULT on load: episode 1 (Descriere).**

| # | Accordion | Vimeo |
|---|---|---|
| 1 | Descriere procedura | `1134715905` |
| 2 | Oare doare ? | `1134716246` |
| 3 | Ce pigmenti ? | `1134715933` |
| 4 | Rezistenta | `1134715961` |
| 5 | Inainte de procedura | `1134715918` |
| 6 | Dupa procedura | `1134715947` |

Stage state shows as `acum: <section>` on the player frame. Accordion
body copy is filler, as designed in the frames.

### D. Pret — ABUNDANCE MODE
Pret intreg **2000 ron** + 5 includes + *Programare*. Pret cu cont
client **1700 ron** (pink) collapsible + 5 includes + *Creaza cont
client*. Retusuri **divers** collapsible, "necesare, pentru a pastra
culoarea", 4 includes + tiers **400 / 600 / 800 ron** + *Programare
retus*. All three CTAs smooth-scroll to Contact. No payments anywhere.

### E. Galerie
Intro copy **verbatim** from S-2 — the "curajoase femei, ca tine" line
is reproduced exactly and marked protected in the markup. **Photo grid
HELD** pending consent (DOSSIER D13); an elegant band stands in its
place. Gold IG button → `instagram.com/hotico.ink/` per the key.

### F. Contact + Reviews
Contact per frames: heading "Contact", "1. Date personale", four
fields, **two** checkboxes (homepage has three). Reviews carousel
reused from lap 1b.

### Notes and gaps
1. **Only six reference frames arrived**, `-1`…`-6`. The key's map
   names a seventh, base `S` = Preț resting. Built Preț from `S-1`
   (Preț expanded) plus the key's written content — both collapsibles
   therefore **ship open**, which is what `S-1` shows. If Preț should
   rest closed, that is a one-line change.
2. **Frames disagree on field order**: `S-3` has Telefon before
   E-mail, `S-1`/`S-2` have E-mail before Telefon. Built to the
   majority, which also matches the homepage.
3. **Galerie copy says "SkinartHub", the button points at
   `hotico.ink`** per the key. STATE-MAP also names SkinartHub for
   this outlink. Copy and destination disagree — flagged for ruling.
4. Episode videos are **FR**; page copy is RO, as ruled.
5. Services-page footer in the frames stacks its nav differently from
   the homepage footer. Reused the homepage footer as instructed.

### Debts carried
Per-video copy · 2x before/after exports · clean 2x exports for
`video-thumb` and `pasii-*` · strips 1x · divider bloom alternation ·
frame A/B service order · favicon · gallery consent.

**State at close:** pushed, not merged. FREEZE LAW in effect.

### Eye passed — rulings applied 2026-08-02

1. **Preț rests CLOSED.** The seventh export (base `S`) shows Preț
   întreg visible with both collapsibles collapsed. Abundance mode
   means they *may* sit open together, not that they *start* open.
   Both now load closed; opening both together still works.
2. **IG handle modernized in copy; protected curajoase line
   untouched.** Copy now reads "pagina instagram hotico.ink";
   destination unchanged at `instagram.com/hotico.ink/` (canonical,
   real — honest-facade law). Protected line verified character-for-
   character after the edit:
   *"Cum arata resultatul procedurii te intrebi ? Iata rezultatul la
   alte curajoase femei, ca tine, care au trecut prin procedura."*
3. **Field order ratified as built** — majority of frames plus
   homepage consistency.

**Merged to main** on the Commander's word. Lap 2a sealed. Branch
deleted local + remote.

---

## Entry #5 — 2026-08-02 — Lap 2b: the form, demo-grade

Branch `lap-2b-form`. Cache-bust `?v=2b`. **One shared implementation**
(`js/form.js`) drives the form on both the homepage and the Areola
page. Facade law: nothing validates, everything advances.

**form demo-grade: 1 live disclosure; full questionnaire per content
sheet = future lap.**

### A. Stepper + navigation
Three steps slide left/right in a track. Label and pink bars follow:
*1. Date contact / personale · 2. Programare · 3. Particularitati*.
`Pasul Urmator >` forward, gold `<` chevron back. Button navigation
only — swipe was **not** added: the carousel code is bound to its own
dots/track contract and wiring it in was not trivial inside the
freeze, so it stays out rather than half-done.

Step 1's own heading is read from the page at load, so the homepage
keeps **"1. Date contact"** and Areola keeps **"1. Date personale"**.

### B. Step 2
"Alege data" + calendar glyph (dd/mm/yyyy), "Vrei si alta procedura ?"
with five radios (Alopecie / Buze / Cicatrici / Eyeliner / Sprancene),
forward + back.

### C. Step 3 — Partiularitati ale pielii
Static radios: chirurgie in zona vizata · chimio/radio · afectiuni
(dermatita / eczeme / psoriazis / alte) · herpes activ ·
sarcina/alaptare (**ONCE** — the frame's duplicate stays killed).
Plus Detalii textarea, "Uploadeaza poze" placeholder, Confirmare.

**The one live disclosure:** chirurgie **da** reveals "Cand a fost ?"
→ **mai putin de 12 luni** reveals the pink warning
*"*Pielea are nevoie de minimum 12 luni pentru a se vindeca complet
inainte de o procedura paramedicala"* plus "Cate luni, exact?".
**Warn and allow — Confirmare never blocks** (gentle-firm law).
Answering "nu" clears and hides the child branch so nothing is
stranded open.

### D. Confirmation
Pink check, "Rezervarea a fost facuta cu succes", thank-you copy, then
**real links**: Mail → `mailto:hotico.ink@gmail.com`, Whatsapp →
`wa.me/41796472106`, "Creaza un cont" → the same WhatsApp (facade,
routed honestly). Discreet "‹ inapoi" resets to step 1 and clears
every disclosure, so the demo replays clean.

### Bug caught in test
The step-1 wrapper left a stray `</div>` that closed step 1
immediately, so the fields and the whole confirmation block sat
outside the track. Repaired; div balance now verified on both pages
(104/104 and 70/70). The rewrite also flattened Areola's
"Date personale" to "Date contact" — restored.

**State at close:** pushed. Awaiting the eye inside the freeze.

---

## Entry #6 — 2026-08-04 — Lap F: critique fixes

**Branch:** `lap-f-critique` (from main, commit `cea408c`).
**Preview:** https://hotico-proto-hbza2vzo2-popescu-alexandrus-projects.vercel.app
**Mandate:** nine mechanical fixes from the certified independent
critique. No copy, no features, no structure. Every anchor landed at
its stated count — nothing improvised, no STOP triggered.

### What changed

**1. The deferred costume.** One class — `.is-deferred`
(opacity .45, no shadow, default cursor) — now dresses everything
that is present but not yet wired: burger, language button, the four
footer-nav spans, and the two consent references. Eight per page.
The `<u>` tags are gone; the words are verbatim. Underline read as
"link, click me"; grey reads as "later".

**2. Real inputs, step 1 only.** The four identity fields are
`<input>` now — text, text, email, tel. The box is untouched (50px,
same gray, same radius) and the placeholder is the old `.field__ph`
glyph exactly: italic, `--placeholder`, 1rem. What the visitor types
is cocoa and upright, which is the whole point. No validation, no
`required`. Steps 2 and 3 keep their two costume spans.

**3. Jukebox honesty.** Play now plays: `&autoplay=1&muted=1` on the
swapped src (muted because no browser autoplays sound on a click it
didn't hear). And the "acum:" label stopped lying — it holds the old
title until the new frame fires `load`. A `pendingTitle` var carries
the claim, so clicking two episodes fast means only the last one
wins instead of the label racing ahead of the picture.
Accordion-close still never interrupts a playing record — verified,
untouched.

**4. Gold chrome.** All ten Vimeo URLs carry `&color=C9A86A` —
three on the homepage carousel, the Areola stage, and six episodes.
Vimeo's default blue was the last foreign colour on the page.

**5. The play button speaks.** "Vezi episodul" now sits beside each
gold circle in DM Sans .875rem cocoa — the same words the aria-label
already carried. A gold circle alone was a guess.

**6. Strip swap.** Alopecie takes `strip-06`; Sprancene keeps
`strip-03`. All six strips are now used exactly once.
**Commander re-grades this pairing at preview.**

**7. Dot hit area.** 44×44 for the thumb, carried on a
pseudo-element on `.dot` so the row's geometry does not move — ink
stays 8px, `li` stays 26px, row height stays 26px. It went on the
button, not the `li`, because the click handler binds to `.dot`;
a padded `li` would have looked bigger and clicked nowhere.
**Noted for the eye:** at 33.2px between centres, neighbouring 44px
targets overlap ~11px, and the later dot wins the shared strip.
Removing the overlap means widening the row — a layout shift the
brief forbade. Flagged, not decided.

**8. Stage heading.** `.stage__h` was DM Sans 400 1rem — the same
weight as the paragraph under it, so it read as a caption. Now
Raleway 700 1.5rem, matching `.h-section`'s weight exactly, keeping
the copy's left edge instead of `.h-section`'s centring.

**9. Footer pipe.** `:not(:last-child)` — "Legal |" is now "Legal".

### Out of scope, per the key
Tel number (critic wrong — format valid) · Areola before/after pair
(gated on image exports) · all copy (Lap C owns it).

### Verified before push
Div balance 104/104 and 76/76 · aria attributes 301 before, 301
after — none removed · `noindex,nofollow` on both pages · tokens
untouched, no new hex outside the documented RO flag ·
prefers-reduced-motion untouched · both JS files pass `node --check`
· console clean · all three form steps still walk.

**Deviation to declare:** the key called for Sonnet hands. This lap
was executed by Opus 5 — the session was already open on it. Nine
mechanical fixes did not need the precision; declaring it rather
than burying it.

**State at close:** pushed, preview green. Awaiting the eye.
No session certifies its own work.

---

## Entry #7 — 2026-08-04 — Lap C-0: content source intake

**Scope:** intake only. Three spreadsheets land in the repo as
canonical source data, plus one housekeeping line. No parsing, no
copy lifted, no screen touched — parsing belongs to Lap C proper.

**Landed:** `content/source/`
- `hotico-content-fr.xlsx` — 83,603 bytes
- `hotico-content-ro.xlsx` — 88,090 bytes
- `hotico-content-en.xlsx` — 80,113 bytes

All three matched their expected fingerprints exactly, byte for
byte, before the copy and after it. Language was matched by source
filename (Franceza→fr, Romana→ro, Engleza→en), never by reading the
contents. Files were copied, not moved — the Downloads originals
stand untouched.

**Housekeeping:** `.gitignore` gains `.claude/`. Verified with
`git check-ignore` — `.claude/launch.json` now resolves to
`.gitignore:2`, and the directory no longer appears in status.

**Named exception — commits went straight to main.** The
constitution says never build on main; the key suspended it for
this lap by name. The exception holds because the cargo is inert:
three binary spreadsheets nobody reads yet, and one ignore line.
Zero HTML, CSS, or JS touched, so zero effect on the built site.
The lap discipline resumes at Lap C proper.

**Not done, per the key:** the spreadsheets were never opened or
parsed. Nothing was deleted anywhere.

**State at close:** pushed. Source data is in the repo and inert.
No session certifies its own work.

---

## Entry #8 — 2026-08-04 — Lap C-1: FR content extraction

**Scope:** parse `content/source/hotico-content-fr.xlsx` into structured
content. Data only — no HTML, CSS or JS touched. Branch
`lap-c1-extract`, PR opened, not merged.

**Survey gate:** 10 sheets, names matched the expected list exactly
(Home Page, s. areola, s.alopecie, s. cicatrici, spr, eyeliner, buze,
LP para, lp cosmetic, cont).

**Produced:**
- `content/fr.json` — UTF-8, page → section → element, English keys,
  verbatim French values. All ten sheets covered.
- `content/fr-review.md` — the same content rendered for the eye:
  every string visible, line breaks preserved, plus an index of all
  56 Vimeo URLs.

**Verbatim law held.** Nothing was paraphrased, corrected or
normalised. Two automated checks back this up: all 368 non-empty
workbook cells are present in the JSON (zero loss), and all 384 JSON
strings trace back to a source cell (zero invented text). Suspected
typos were logged in the exit report and left untouched.

**Shape deviations, declared:**
- `home.pasii.steps` stays at 3 as the key required, but the sheet
  holds three *phases* (Conseil / Procédure / Entretien) of three
  numbered paragraphs each. Each step keeps its phase title and an
  `items` array of the three paragraphs verbatim. Nine paragraphs,
  none merged, none dropped.
- The `cont` sheet stores Romanian labels inside the cell values
  (`titlu: `, `cta: `, `pregatire: `, `intretinere: `). Shaped fields
  hold the value after the label; the untouched cell string is kept
  alongside in `_verbatim`.
- `_sheet_labels` on each page preserves the Romanian column
  scaffolding so the extraction is fully auditable against the source.

**Defects found, none fixed:**
- eyeliner "Quels types de pigments utilisez-vous ?" has a YouTube
  link and no Vimeo link. The known defect, confirmed. `vimeo_url`
  is null; no URL was fabricated.
- cicatrici "La procédure est-elle douloureuse ?" carries the pigments
  answer verbatim, identical to the question above it, while its video
  link is the pain video. New find, reported to the Commander.

**State at close:** PR open, awaiting the eye. Not merged.
No session certifies its own work.

---

## Entry #9 — 2026-08-04 — Lap C-2: homepage FR

**Scope:** French-fill the homepage per the ignition key. Branch
`lap-c2-home-fr`, PR opened, not merged. GATE cleared before any edit:
`content/fr.json` on main, PR #2 merged.

**Text law, applied.** Every FR string traces to `content/fr.json`
verbatim or to Annex A verbatim, with these bake-time corrections
applied (the six ratified in the key, plus two ratified mid-lap):

1. Decouvrez → Découvrez
2. Randez-vous → Rendez-vous
3. le dermopigmentation → la dermopigmentation (all)
4. s'fixe → se fixe
5. closed the three orphaned «
6. Testimoniaux → Témoignages
7. `form.cta` "CTA: Nous sommes là pour toi" → strip "CTA: " scaffolding,
   ship "Nous sommes là pour toi" (ratified mid-lap, Ruling Q2)
8. `form.next_button` "buton Suivant" → strip "buton " scaffolding,
   ship "Suivant" — this REPLACES Annex A's "Étape suivante ›"
   everywhere a forward button appears (steps 1, 2, and the step-3
   advance button, since Annex A's button canon names only two labels
   for the whole wizard)
9. "le dermopigmentation cosmétique" → "la dermopigmentation
   cosmétique" (carousel slide 5 cta) — the one survivor of
   correction #3 the first pass missed. Patched in the closeout;
   `le dermopigmentation` count confirmed 0 across `index.html` after.
10. "Creaza un cont" → "Créer un compte" (Commander-ratified, Annex A
    extension) — patched in the closeout. Its `wa.me` href is
    untouched, unchanged from before the patch.

Corrections #3 and #5 found no live occurrence on the homepage
surfaces touched this lap (their strings live on other pages/laps);
applied where found, otherwise inert. Correction #3 in fact had one
surviving occurrence (#9 above) — see closeout note below.

**Annex-A authorship note.** H1 ("La peau : ton seul vêtement."),
the confirmation block, field labels, and the step-3 particularity
block are Commander-ratified strings, not sourced from the FR
spreadsheet. Alexa still owes confirmation on the H1 and confirmation
copy — flagged per the key, not re-litigated here.

**Two mid-lap stops, both ruled on before any edit landed:**

- **Gate hit — step-3 particularity.** `areola.form_notes.questions`
  in `fr.json` holds 16 post-mastectomy/oncology questions with
  branching; the page's step-3 block has 5 generic skin-history
  questions. Not a trim of the same set — a different instrument.
  Stopped, reported the delta, asked. **Ruling:** keep the current
  5-question structure, ship it in French using Commander-ratified
  provisional strings (Annex A extension, quoted in the PR
  description), oui/non replacing da/nu throughout step 3. Marked
  **PROVISIONAL** — superseded by the dedicated 16-question instrument
  in its own future lap. The nested "was it under/over 12 months"
  reveal (options, warning copy, months field) has no ratified source
  either; translated directly as low-risk mechanical/medical-form
  chrome, not covered by the two legal sources — flagged here, not
  silently invented.
- **Gate hit — CTA/button scaffolding.** `form.cta` and
  `form.next_button` carried spreadsheet labels ("CTA: ", "buton ")
  baked into the cell value, unlike the rest of the sheet (which keeps
  labels in a separate `row_label` field). Stopped, asked. **Ruling:**
  strip both prefixes as ratified corrections #7–8 above; "Suivant"
  replaces Annex A's "Étape suivante ›" everywhere.

**Executor-judgment translations, disclosed (not from either legal
source, functional/a11y chrome only — never marketing copy):** every
aria-label, alt, and title attribute touched (nav, socials already
lived in EN, before/after slider, pill arrows, back/close/menu
buttons, dots, stars); the third form checkbox ("Je confirme que
toutes les données du formulaire sont correctes" — no source gives
this string); the three stepper micro-labels ("1. Contact",
"2. Rendez-vous", "3. Particularités" — hardcoded in `form.js`,
built only from words already ratified elsewhere on the page); the
tagline's placement (`hdr__tagline`, new markup + CSS, "sub logo si
poza" row_label read literally as directly under the header logo).

**Leftover Romanian, by design or by gap:**
- Review cards (12 stars/attribution strings across 6 cards) — stay
  RO. Genuine testimonial in original language, per the key. The
  duplicate "Marina" card ships as-is (pre-existing content debt,
  DOSSIER D15, not this lap's to fix).
- Phone country-code flag (RO tricolor) on the Téléphone field — left
  untouched. It signals a dial code, not page language; out of scope,
  not mentioned in the key.

Confirmation screen's third button, "Creaza un cont", was flagged
here as an unresolved leftover at first close — not covered by either
legal source, and functionally a duplicate of the Whatsapp link
beside it. **Resolved in the closeout patch**: Commander-ratified to
"Créer un compte" (correction #10 above), `wa.me` href kept exactly
as-is per the patch key. No longer a leftover.

**Structural changes beyond text (all in-scope, "css/js only where a
step demands"):**
- Video carousel: 3 → 5 slides, 3 → 5 dots. Each slide's Vimeo embed
  src rebuilt from `vimeo_url` (share-link format) into the house
  player-embed format, `?h=…&color=C9A86A` preserved. Lazy-load
  current+1 and axis-lock drag untouched (`js/main.js` carousel logic
  itself not touched — only the markup it walks).
- Pasii: the single shared `.walk__body` (one filler, reused for all
  three cards) split into three `data-phase="0|1|2"` blocks, one per
  Conseil/Procédure/Entretien, each holding that phase's 3 real items
  verbatim. `js/main.js` card-click handler gained a 4-line phase-swap
  (hide all `.walk__body`, show the one matching the clicked card's
  `data-step`) — the only JS logic change this lap. Promoted-image
  aspect-ratio trimmed 4/3 → 16/9 (reused, not invented — same ratio
  already used for the video embeds) to bring the first body line
  within the ~340px budget; measured, not eyeballed: 432px content
  width × 9/16 ≈ 243px image + label + body padding lands ~330px
  before the first line, confirmed live at 183px rendered image height
  well inside budget.

**Bug caught by the cache law itself.** The phase-swap and the
CSS underline fix tested broken on first preview — stale `?v=2b`
assets, cached from before the edit. Step 7's bump to `?v=3` on all
four refs (`tokens.css`, `main.css`, `main.js`, `form.js`) resolved it;
re-verified live (phase 1 click → phase-1 body shown, `hidden`
attributes correct) after the bump, not just assumed fixed.

**Anchors, counted:** 5 video slides / 5 dots · 3 walk-body phases ·
3 form steps · 5 particularity questions (+1 nested +1 details =
7 `q__label` spans in step 3) · 6 servicii pills · 6 review cards
(unchanged). `servicii/*` and `docs/*` confirmed untouched
(`git diff --stat` clean on both paths).

**Not done, per the key:** no string translated outside the two legal
sources except the disclosed executor-judgment chrome above; nothing
in `servicii/*` touched; pink and tokens untouched; no aria removed;
reduced-motion guards untouched (not touched at all this lap).

**Closeout patch (same day, same branch, no new branch).** Two fixes
landed after first close, both Commander-ratified: correction #9
(the one surviving "le dermopigmentation" the first pass missed) and
correction #10 ("Creaza un cont" → "Créer un compte", closing the
leftover flagged above). Appended as a new commit rather than
amending the pushed history — the branch and PR already existed
upstream. Verified by count, not assumed: `le dermopigmentation` = 0,
`Creaza un cont` = 0, `wa.me` href on the renamed button byte-for-byte
unchanged.

**State at close:** pushed, PR open, not merged. Tower certifies next.
No session certifies its own work.

---

## Entry #10 — 2026-08-04 — Lap C-2b: carousel bodies condensed

**Scope:** replace the five carousel slide bodies in `index.html` with
the Commander-ratified condensed versions (Annex B), per the ignition
key. Branch `lap-c2b-carousel-cut`, PR opened, not merged. Titles and
CTA hook lines untouched — only the second `<p class="video__copy">`
per slide (the long body) was replaced.

**Anchor check, before any edit.** Each current body's opening
sentence verified to land exactly once in `index.html` — all 5
confirmed unique before the first edit was made.

**Char counts, per slide (old → new):**
- Slide 1 (À propos de HOTICO): 2331 → 331
- Slide 2 (Comment fonctionne HOTICO): 1913 → 341
- Slide 3 (Apprenez avec HOTICO): 2198 → 368
- Slide 4 (Qu'est-ce que la dermopigmentation paramédicale ?): 2083 → 406
- Slide 5 (Qu'est-ce que la dermopigmentation cosmétique ?): 2005 → 327

**Status: condensation-by-selection, Commander-ratified, provisional
pending Alexa's blessing.** Full texts preserved verbatim in
`content/fr.json`, untouched this lap — it remains the source mirror,
the page now carries the ratified condensations. À-propos page idea
parked, not actioned.

**Not done, per the key:** titles, CTA hooks, video embeds, dots,
`css/`, `js/` untouched (no cache-bump — HTML only); `content/fr.json`
untouched; no other section touched. `git diff --stat` confirms only
`index.html` changed.

**State at close:** pushed, PR open, not merged. Tower certifies next.
No session certifies its own work.

---

## Entry #11 — 2026-08-04 — H-1: repo relocation

**Scope:** housekeeping only, no build content touched. Repo moved
from its nested position, `~/projects/acp-command-center/hotico-proto`,
to its lawful sibling home, `~/projects/hotico-proto` — disk now
matches the Command Center constitution ("never nested"). Plain `mv`,
same volume; `.git` traveled whole, nothing copied, nothing deleted.

**Gates passed, all four, before the move:**
(a) working tree clean, no untracked files
(b) `git log origin/main..main` empty — nothing unpushed
(c) `main` the only local branch — all lap branches already deleted
    at their seals
(d) `~/projects/hotico-proto` did not already exist

**Tip hash, before → after:** `ae8d15806333f3bd6601fbfa6f2f831b62e1057d`
in both places — unchanged, as expected of a plain move.

**Post-move verification:** working tree clean, `git fetch` reaches
`origin` (`Ulgolan/hotico-proto`) without error. `.claude/launch.json`
(local, untracked) checked for absolute paths pointing at the old
location — none found; no edit needed.

**Collateral, reported not edited:**
- `acp-command-center` is not itself a git repository (confirmed, not
  assumed) — no parent-repo diff to check.
- `acp-command-center/.claude/launch.json` still points at the old
  relative path (`--directory hotico-proto`), now stale since the
  folder moved out. Not touched — Commander's file, Commander's edit.
- No `hotico-proto` path references found in `acp-command-center`'s
  `CLAUDE.md` or any other doctrine `.md` file.

**Main-exception, named.** This entry commits directly to `main`, no
lap branch cut — a deliberate exception to "never build on main."
Justified: single inert docs-only commit (`LEDGER.md` text), no
`index.html`/`css`/`js`/`content` touched, nothing to preview or
certify. Housekeeping, not a lap.

**State at close:** pushed directly to `main`. No merge gate applies —
nothing built.

---

## Entry #12 — 2026-08-04 — Lap C-3: Areola page, French

**Scope:** `servicii/areola.html` only, translated RO → FR. Branch
`lap-c3-areola-fr` off `main` (`ae8d158` confirmed present in history
before the cut). `js/areola.js` inspected and left untouched — it is
markup-agnostic (reads `data-title`/`data-src` off the DOM, no
hardcoded strings), so no JS work was demanded. `css/` untouched, as
instructed.

**Text law, three sources, rank order:**
1. `content/fr.json` `areola.*` + `home.form.*`, verbatim.
2. `index.html` AS SHIPPED, for every shared form element.
3. Annex C (ignition key), verbatim.

**Correction applied:** "du dermopigmentation" → "de la
dermopigmentation" — one occurrence, in `areola.intro.cta` (the
`stage__copy` line). Grepped the full `areola` JSON subtree for both
"du dermopigmentation" and "le dermopigmentation" before editing;
only the one instance existed in scope. No stray masculine article
survived.

**Retroactive ratification, per the key.** `home.form.*` in
`content/fr.json` is mostly `null` or admin scratch (e.g. `"cta": "CTA:
Nous sommes là pour toi"`) — the homepage-as-shipped is the only
complete source for shared form copy, and is now the ratified record
for: heading "Rendez-vous", CTA "Nous sommes là pour toi", GDPR/
cancellation checkbox text, the third "toutes les données sont
correctes" checkbox (not present in the old RO version — added to
match parity), step names ("1. Contact" / "2. Rendez-vous" / "3.
Particularités" — the last two are hardcoded FR in `form.js` itself,
already shared; only step 1's label lives in each page's own HTML and
now reads "1. Contact" to match). The step-3 confirm button reads
"Suivant" (not "Confirmer") because that is what the homepage carries
AS SHIPPED — mirrored exactly, not corrected, per source (2)'s
mandate.

**Jukebox / FAQ (12 anchors, verified):** 6 accordion items, matched
to `content/fr.json` `areola.faq` entries by Vimeo ID (the JSON array
holds 7 entries; one — "9. Pourquoi deux séances sont-elles
nécessaires ?", vimeo `1134716258` — has no HTML slot and no Annex C
chip, so it was left unused rather than inventing a 7th accordion
item. Flagging for a ruling: does Areola get a 7th FAQ, or does that
entry belong to a different service page?). Chip labels (`faq__label`)
are Annex C's six, in order: La procédure · La douleur · Les pigments
· La tenue · Avant · Après. `data-title` attributes carry the full
verbatim question from `fr.json`, sheet-numbering prefixes ("2.",
"5.", "7.", "10.") preserved as-is — text law is verbatim, not tidied.
Full verbatim answers now sit in the accordion bodies, replacing the
"Descriere descriere…" filler, split into one `<p class="faq__copy">`
per source paragraph break (29 total) with in-paragraph line breaks
as `<br>` — formatting only, no words touched. "Vezi episodul" → "Voir
l'épisode" applied 12 times (6 visible `playrow__label` + 6
`aria-label`), confirmed by grep.

**Pricing (Annex C, verbatim).** Currency stays RON — Alexa-gated,
not touched. 3× "Comprend :" blocks, 3× retouche tier rows, all per
Annex C.

**Gallery (Annex C, PROVISIONAL).** Lead line, locked-photos
statement, and the Instagram line all replaced per Annex C. The old
guard comment ("PROTECTED COPY — verbatim from frame S-2… no copy
pass may touch") is now stale — replaced with a new in-file flag:
**ALEXA BLESSING REQUIRED** before this ships. Nothing here is final
until she rules on it.

**Chrome swept beyond the itemized steps, to satisfy "zero RO outside
the review card":** header lang toggle ("Langue : Français" / "FR"),
burger `aria-label`, home-link `aria-label`, `svcnav`'s own
`aria-label` ("Servicii" → "Services"), footer nav `aria-label` and
its four items. None of these were named step-by-step in the key, but
they're shared chrome and the sweep gate is unconditional.

**Sweep result (Step 8):** grepped the full file for RO diacritics and
a RO word list, review card excluded. Zero hits outside `data-tab`/
`id` internal identifiers (`detalii`/`pret`/`galerie` — structural,
not copy, left alone) and the Annex C word "divers" (ratified
verbatim, unchanged in both languages). Review card (Marina ×6,
including the "5 din 5" star rating) is untouched RO, as designed
(DOSSIER D15).

**Spotted, not fixed — out of scope for a text lap:** a duplicated
`</main>` closing tag, pre-existing before this lap (was already
broken in the RO version). Flagging for a structural lap, not
touched here.

**Cache law (Step 9): HTML-only lap, no bump.** `js/areola.js` and
`css/` confirmed untouched — `git diff --stat` shows only
`servicii/areola.html` changed. Note for the record: the file's
current version tag is `?v=2b` on all three scripts/two stylesheets,
not `?v=3` as the key's example assumed (the homepage is on `?v=3`;
this page never caught up) — moot this lap since nothing versioned
was touched, but flagging the drift for whoever does bump it next.

**Closeout patch (same day, same branch, appended commits — no
force-push).** Two fixes from the flagged items above, both now
ruled on:

1. **7th FAQ accordion added.** `content/fr.json` `areola.faq[5]`
   ("9. Pourquoi deux séances sont-elles nécessaires ?", vimeo
   `1134716258`/`37a6e600dd`) now has a home: chip label "Deux
   séances", positioned last (after "Après"), same classes/behaviour
   as the other six — cloned structure, `id="faq-7"`. `data-title`
   carries the full verbatim question (numbering prefix "9." kept,
   same verbatim law as the other six). Full verbatim answer, split
   into 5 `<p class="faq__copy">` paragraphs on the source's
   paragraph breaks, no `<br>` needed this time (no in-paragraph line
   breaks in this entry's source text). **No JS touch** —
   `js/areola.js`'s accordion/jukebox wiring runs on
   `document.querySelectorAll('[data-faq]')` generically, no
   hardcoded item count or index anywhere; verified by reading the
   file, not assumed. Cache law therefore stays HTML-only, no bump.
   `"Voir l'épisode"` count: **12 → 14** (confirmed by grep). Caught
   and fixed one mistake mid-patch: a first attempt at the insertion
   swallowed faq-6's own closing `</div></div></li>` along with the
   matched anchor text, which would have merged faq-6 and faq-7 into
   one malformed block — caught before commit, file reverted to the
   prior commit and redone with faq-6's closing tags preserved ahead
   of the new `<li>`.
2. **Duplicated `</main>` removed.** Pre-existing defect (present
   before this lap, logged above at first close) — one of the two
   `</main>` tags removed, the section/div/etc. structure above it
   left untouched. Tag-balance re-verified after: `div` 78/78,
   `section` 7/7, `ul` 16/16, `li` 65/65, `header` 1/1, `footer` 1/1,
   `nav` 2/2, `button` 36/36, `span` 100/100, `p` 62/62, `h1` 1/1,
   `h2` 3/3, `h3` 2/2 — all balanced. `<main>`/`</main>` count: 1/1.

**State at close:** pushed, PR open (#5), not merged. Tower certifies
next. No session certifies its own work.

---

## Entry #13 — 2026-08-04 — Lap C-3b: jukebox answers condensed

**Scope:** replace the seven accordion answer bodies in
`servicii/areola.html` with the Commander-ratified condensed versions
(Annex D), per the ignition key. Branch `lap-c3b-jukebox-cut`, PR
opened, not merged. Questions, chips, videos, "Voir l'épisode", and
`data-title` attributes untouched. `content/fr.json` untouched — it
remains the verbatim source mirror; the page now carries the ratified
cut.

**Anchor check, before any edit.** The key's anchors are file
locators, not annex-content checks (clarified mid-lap, Tower's own
ambiguity): each current answer's opening sentence verified to occur
exactly once in `servicii/areola.html`, confirming the block to
replace. Annex D is not expected to contain the old openings — it is
a Commander-ratified condensed adaptation (her sentences, minimally
stitched), not pure extraction. All 7 locators confirmed unique
before the first edit.

**Mid-lap stop, ruled on before any edit landed.** Flagged that
Annex D's original #5 (Avant) dropped medical-safety specifics
present in the live copy — the burns-specific longer wait time and
the day-of professional-assessment/postponement clause. Accepted as
correct; Commander issued a replacement #5 restoring both, applied
here verbatim in place of the first draft.

**Status: condensation-by-selection corrected to condensation-by-
adaptation — Commander-ratified, provisional pending Alexa's
blessing.** Full verbatim texts preserved in `content/fr.json`,
untouched this lap; the page now carries the ratified cut.

**Char counts, per answer (old → new):**
1. La procédure: 1707 → 604
2. La douleur: 1571 → 502
3. Les pigments: 796 → 411
4. La tenue: 1104 → 447
5. Avant: 3164 → 775 (Commander-amended text, safety detail restored)
6. Après: 2077 → 491
7. Deux séances: 1511 → 417

**Verified before push:** `git diff --stat` shows only
`servicii/areola.html` changed. Tag balance re-checked after edit —
`div` 78/78, `section` 7/7, `ul` 16/16, `li` 65/65, `header` 1/1,
`footer` 1/1, `nav` 2/2, `button` 36/36, `span` 100/100, `p` 35/35,
`h1` 1/1, `h2` 3/3, `h3` 2/2, `main` 1/1 — all balanced (`p` count
drop from 62 to 35 expected: each answer collapses to one paragraph).

**Not done, per the key:** `index.html`, `css/`, `js/` untouched — no
cache bump (HTML-only lap); `content/fr.json` untouched; no other
section of `areola.html` touched.

**State at close:** pushed, PR open, not merged. Tower certifies
next. No session certifies its own work.

## Entry #14 — 2026-08-04 — LAP D-0: FOUNDATION (desktop campaign, lap 1)

POLARIS.md v2 sealed at repo root (desktop campaign brief,
supersedes 2026-08-01 brief). Three system tokens added to
css/tokens.css (--bp-desktop, --width-grade, --content-max).
Desktop scaffold (@media min-width:768px) planted at end of
main.css. Cache unified at main.css?v=4 across index.html,
servicii/areola.html, servicii/in-curand.html. Certified by Tower
via raw pulls at 2d6c6ca, independent of executor.

Session notes: executor halted on three key discrepancies —
including Tower's tokens.css omission (single-source law defended
by the Hands). New law: style-touching ignition keys require a
file-tree inventory before anchors are written. --bp-desktop was
initially commented out; caught pre-push, healed.

Next: D-1 — lift the 480px body cap inside the desktop scaffold;
first full-width composition.

## Entry #15 — 2026-08-04 — LAP D-1: THE CANVAS (desktop campaign, lap 2)

First visible desktop state. At ≥768px: body cap lifted, .hdr /
.wrap / .svcnav settle into a centered 720px column
(--column-read, ratified at the eye-gate, re-pourable), footer
content centered (Commander taste ruling). Cache unified at v=5
(main.css + tokens.css, all three pages) — tokens.css version
drift (3/2b/2a) discovered and healed mid-lap after Tower flagged
the stale-var risk. Eye-gate at 1440/1280/1920 caught the svcnav
orphan (spanning full viewport) and the left-aligned footer; both
healed same lap. Orphan scan: clean; .panel-tab wrappers and
.hero/.hero__torso noted as structural exceptions, no visual
effect, deferred to composition laps. Certified by Tower at
077e5c5. First NN2 pre-merge eye-gate of the campaign: fired and
held.

Next: D-2 — hero composition, first full-width art direction.

---

## Entry #16 — 2026-08-04 — LAP D-2: HERO — THE SPLIT (desktop campaign, lap 3)

First desktop composition. Triptych exploration: three hero
variants (A split / B altar / C stage) built behind a dev-only
?hero= toggle on one preview; Commander's eye chose A — editorial
split, text left (tagline clamped ~2.75rem, 16ch measure), torso
right at 560px (retina ceiling of the 1224px asset respected),
socials centered under the text column (taste amendment). Losers
and toggle stripped same lap; params verified inert. Cache at
v=6, all pages. Certified by Tower at 9b6549b. Triptych mechanism
proven — enters doctrine as the exploration pattern for
composition laps.

Next: D-3 — video carousel adopts the split grammar (voice left,
media right).

---

## Entry #17 — 2026-08-04 — LAP D-3: CAROUSEL SPLIT + THE TWO-TIER SYSTEM (desktop campaign, lap 4)

Video carousel adopts the split grammar: .video__text wrapper
added to all 5 slides (copy verbatim, order preserved), voice
left / media right, dots centered below. Mid-lap, the Commander's
eye caught the tablet band failing (1024 overflow, 768 slide
bleed) — root cause: fixed split columns engaging at 768. Ruling:
systemic two-tier architecture. ≥768 = CANVAS TIER (unlock +
centered column + footer centering). ≥1024 = SPLIT TIER (all
voice/media split rules, hero included, migrated; fluid
minmax(0,1fr)/min(Npx,46vw) columns; min-width:0 guards).
--bp-split:1024px added to tokens. Cache: main v=7, tokens v=6,
all pages. Choreography re-verified at 1024 AND 1440 (dots, drag,
lazy swap, clamps, slide-1 play). Band walk clean at
768/900/1024/1200/1440/1920. Certified by Tower at d5a51d5.
New law: composition laps verify the FULL BAND WALK, not only the
grade widths.

Next: section laps (servicii, pașii, form, reviews) inherit the
two-tier grammar.

---

## Entry #18 — 2026-08-05 — LAP D-4: SERVICES — THE GALLERY (desktop campaign, lap 5)

Second triptych outing: three services compositions (A gallery /
B atlas / C procession) built CSS-only behind a ?svc= dev toggle,
all scoped to the SPLIT TIER. Commander's eye chose A — 3×2 card
grid at content-max, opened panels grow their row, ba sliders
fully draggable in-card. B's display:contents stage (and its
abundance-overlap limitation) honestly reported, judged, and
declined with the variant. Toggle and losers stripped at seal;
params verified inert. Choreography (arrow, abundance, drag +
clamps, navigation, no-scroll) verified at 1024 and 1440; band
walk clean 768→1920; mobile pixel-identical. Seal note: ba
overflow clips the pinned handle to a sliver at 0/100 — correct
behavior, recorded for future verifiers. Net diff vs main: 13 CSS
lines + cache v=8. Certified by Tower at 62f0dd4.
Reserved-stage law upheld: the gallery is a contained region,
replaceable wholesale.

Next: D-5 — pașii at desktop.

---

## Entry #19 — 2026-08-05 — LAP D-5: PAȘII — THE FUSED MONUMENT (desktop campaign, lap 6)

Straight lap, one mid-flight re-pour. Pașii breaks out to
content-max at the SPLIT TIER: three stately cards (cube/stone/
sphere), opened phase presents as ONE gold-framed unit — the
.is-focused card spans full width as a cinematic 250px banner
(image cover, label 1.4rem centered), walk__head stays hidden at
desktop mirroring mobile's own fusion anatomy (role assignment
inspected, not assumed), three step columns below, zero-seam
frame verified by geometry (shared edges, 0px gap). Builder
caught its own display:grid-vs-[hidden] clobber and guarded it.
Commander's eye caught the duplicate-introducer disease and
ruled the fusion; Tower ruled phase-at-a-time switching an
accepted focus rhythm (mobile-consistent), not a defect.
Choreography verified at 1024/1440; band walk clean 768→1920;
mobile pixel-identical. Known debt surfaced: pasii temp-1x
assets soften at 1920 banner crop — joins the ACP export-debt
pile (clean 2x exports), not introduced by this lap. Cache v=9.
Certified by Tower at cf0f2f0.

Next: D-6 — the form at desktop.

---

## Entry #20 — 2026-08-05 — LAP D-6: THE FORM SPLIT + THE RESURRECTION (desktop campaign, lap 7)

The decisive section adopts the split grammar: voice left
(Rendez-vous + sub, left-aligned, vertically centered), form
right — stepper + steps fused into one gold-framed card at
min(600px,46vw). Wrapper divs per the D-3 precedent; copy
verbatim; form.js untouched; air above the section (2.5rem,
re-pourable). PRODUCTION BUG KILLED: the "Demande bien reçue"
success screen — authored in the French campaign's honesty-law
healing — was entombed inside .steps[data-steps]; the confirm
handler hid the parent and buried the confirmation AT EVERY
WIDTH since C-2. Diagnosis by the Hands, ruling by Tower,
Commander ratified the mobile behavioral change (NN1 exception
on record: bug fix restoring designed behavior). Relocated to
sibling of .steps on both pages after verifying [data-success]
is queried document-wide. Full walk 1→2→3→confirm→visible
success→retour verified at 375/1024/1440 on both pages. Also on
record: no validation gate on advancement (facade law,
pre-existing, real-site question). Band walk clean 768→1920.
Cache v=10. Certified by Tower at 1522437.

Next: D-7 — reviews at desktop. The last homepage section.

---

## Entry #21 — 2026-08-05 — LAP D-7: TÉMOIGNAGES — THE QUIET MONUMENT (desktop campaign, lap 8) — THE HOMEPAGE IS COMPOSED.

The reviews section closes the homepage: single-testimonial
stage at column-read (deliberately NOT split — reading content,
not a media pairing), review at 58ch centered, stars scaled with
air, review__who in quiet emphasis, dots below. Multi-card grid
consciously declined: the shared carousel's one-slide-per-view
math + honesty law (no lying dots) + placeholder content
(duplicate Marina cards = Alexa product debt; RO text by design)
made composition-over-machinery the honest call. Choreography
(dots, drag, clamps, geometry flex-basis:100% intact) verified
at 1024/1440; band walk clean; mobile pixel-identical. Cache
v=11. Certified by Tower at 57ce760.

MILESTONE: all six homepage sections — hero, carousel, services,
pașii, form, reviews — now composed at desktop under the
two-tier system. Eight laps, eight merges, zero unratified
mobile changes.

Next: the areola page at desktop — the campaign's second front.

---

## Entry #22 — 2026-08-05 — LAP K-1: KINTSUGI SCROLL HERO — THE FRONT DOOR

Branch `k-1-kintsugi-hero`. Hero replaced on all tiers by Commander's
order — NN1 exception on record. Not a D-campaign lap: the ignition
key came directly from ACP, out of band from the desktop-split system,
and intentionally breaks the mobile-zero law that has governed every
lap since D-1.

The old hero (torso image, centered tagline, intro, socials) is gone.
In its place: a full-viewport pinned hero where a virtual camera
pans/zooms across the kintsugi statue between 6 locked keyframes,
scrubbed by native scroll (translate3d + scale + opacity only, no
wheel/touch interception). Establishing frame — H1 on a white block,
intro, existing gold social row, "DÉFILER" hint — fades over the first
3.5% of scroll progress, opacity only, never unmounted. Smootherstep
easing between stops; zoom interpolates in log space for constant
perceived speed. Aréole is the one live CTA (real pill, real href);
Alopécie, Sourcils, Eyeliner, Lèvres, Cicatrices render as
non-interactive captions — gold dot, hairline connector, label, no
href, no pointer, nothing pretending to be clickable. Dot rail, fixed
left, navigates to any stop's mid-dwell. Exit pulls the camera back to
the establishing frame over the final 9% of timeline; the section
releases only once the full statue is back in frame, no UI reappears
during pull-back.

GATE 1 (desktop full-bleed) fell out for free: the new `.kh` section
carries no `.wrap`, so it was never subject to the column-read/
content-max constraints the D-campaign built for every other section —
full-bleed at ≥1024 and edge-to-edge below it needed no extra rule.

Reduced-motion / no-JS baseline shares the same markup: six statue
crops (CSS transform, same fx/fy/s as the live keyframes) stacked with
their captions/pill, plus the H1/intro/Aréole link as plain elements —
this is what ships with scripts disabled, and is also what
`prefers-reduced-motion: reduce` gets, gated by a synchronous script in
`<head>` that stamps `html.js-kh` before first paint so neither markup
ever flashes into the other.

**D-2 retired.** The desktop hero-split rules from the D-campaign
(`.hero` grid, `.hero__torso`, `.hero .wrap`, `.hero__tagline`,
`.hero__intro` desktop override, plus the now-orphaned mobile-tier
`.hero__torso`/`.hero__tagline`/`.hero__intro` base rules) are gone
from `css/main.css` — superseded by K-1, not merely covered by it.
D-3 through D-7 untouched.

New `js/hero-scroll.js?v=1`, loaded on `index.html` only —
`main.js`/`form.js`/`areola.js` untouched, per brief. One build-time
bug caught and fixed before the eye-gate: the sitewide
`img{max-width:100%}` rule was clamping the film layer's pre-transform
box, breaking the fx/fy/scale math; pinned an explicit 1024×1536 on
`.kh__film`. A second fix deferred the first camera paint one rAF
tick — painting the transform synchronously, before the browser's
first layout/paint cycle settled, left the layer unpainted until the
next repaint trigger.

Choreography verified at 390/768/1024/1440: six stops land on their
body zones (camera reads as one continuous descent, one breath out on
exit); Aréole pill navigates to `servicii/areola.html`; the five
captions carry no interactive affordance; dot rail is keyboard-operable
with visible focus; static/reduced-motion layout confirmed (same six
crops, same Aréole link, no scrub); no horizontal scroll at any tier;
below-hero content pixel-identical, band-through-reviews unaffected.

**Resolution debt (asset law):** `assets/img/statue-kintsugi.png` ships
at ~1024×1536 — accepted interim per the ignition key. The upscale swap
is a future lap, asset-only, no code changes expected.

**Five-caption debt:** Alopécie, Sourcils, Eyeliner, Lèvres, Cicatrices
have no destination pages yet — they stay captions, not pills, by
design (LINK LAW). Each upgrades to a live pill in its own future lap
as the corresponding service page ships, same pattern Aréole just set.

Cache v11→v12 on all three pages. PR open, not merged — awaiting
Commander's eye.

Next: ACP's word on K-1, then resume the D-campaign at the areola page
desktop lap — or wherever the Tower routes next.

---

## Entry #23 — 2026-08-05 — LAP K-2: KINTSUGI HERO — GATE FIXES

Branch `k-1-kintsugi-hero` continued, PR #15 updated (not merged).
Commander's gate review of the K-1 preview surfaced three visual
findings; scrub logic, timeline, dwell timing and stop order untouched
per brief.

**Finding 1 — establishing legibility.** The intro paragraph sat raw
on the statue. Added a two-layer veil: an outer bottom-anchored ivory
gradient on `.kh__establish` (the scene treatment named in the brief)
plus a second veil sized to the copy block's own box
(`.kh__establish-copy`, radial gradient, percentages relative to its
own dimensions) rather than to the viewport. The outer-only version
read fine at 390 but failed at 1440: shorter viewport, shorter
(4-line, not 6-line) wrapped paragraph, so the copy sat almost
entirely in the outer veil's transparent zone — caught on a 1440
screenshot before it shipped. The content-anchored layer holds
regardless of how the text wraps. H1 white block kept (per the brief's
"when in doubt, keep it" — the veil alone tested legible without it,
but no reason to spend the eye-gate on that swap too).

**Finding 2 — DÉFILER.** Gold now (was cocoa), wider tracking, and
moved from `position:absolute;bottom` to normal flow directly below
the socials. Root cause of "below the fold": `.kh__pin` is `height:
100vh` but sits in normal flow until sticky engages — at scroll 0 it
starts below the header, so its own bottom (where the hint used to be
pinned) was rendering ~header-height off-screen. Flowing the hint
after the content sidesteps the sticky-not-yet-engaged geometry
entirely instead of fighting it with an offset.

**Finding 3 — stop framing + markers, the big one.** New scales landed
exactly as briefed (Alopécie 1.35, Sourcils 1.6, Eyeliner 1.8, Lèvres
1.85, Cicatrices 1.25, Aréole 1.4; fx/fy and k untouched). Every stop
now reads head-to-shoulder or torso-with-context instead of forensic
skin. Markers: anchor dot 9px→20px with a soft gold ring, connector
1px→2px/34px→38px, and the caption label rebuilt as one shared
"big pill" class (1.5rem type, 1.05rem/2.25rem padding, solid ivory +
gold border + neo shadow) used by all six stops. Aréole's markup was
restructured to match the other five's dot+connector+label anatomy —
it's now the same pill with a chevron and a real `<a>` instead of a
separate freestanding pill; the five others stay `<span>`, no href, no
chevron, no pointer. `.kh__pill` retired as a class, folded into
`.kh__caption-label`. Static/reduced-motion crops got the same scales
and the same marker rebuild, verified separately — this fallback
shares no runtime code with the scrub path, so both had to be checked.

Interim ~1000px asset held up fine at the new, wider crops — if
anything the framing fix reduces the upscale debt's visibility (less
magnification per stop than K-1 shipped).

Checks 1–8 from the key run at 390/1024/1440 plus reduced-motion:
establishing text legible at every width tested (1440 required the
Finding-1 fix to pass); DÉFILER gold and above the fold everywhere;
all six stops pass know-where-you-are; marker proportions consistent
across all six; Aréole still navigates, five captions confirmed inert
(`<span>`, no href, `cursor:auto`) via DOM inspection; reduced-motion
crops re-verified with the new scales; no horizontal scroll; below-hero
content pixel-identical (untouched this lap). Cache v12→v13
(`main.css`), v1→v2 (`hero-scroll.js`).

Next: Commander's word on K-2, then resume wherever the Tower routes —
areola desktop lap, or the next K-series fix if the gate isn't clean
yet.

---

## Entry #24 — 2026-08-05 — LAP K-4: STATUE ASSET SWAP — ABANDONED, WEBP SHIPPED FROM ORIGINAL

Branch `k-1-kintsugi-hero` continued, PR #15 updated (not merged).

ACP hand-delivered a 4x upscale of the statue asset (1024×1536 →
4096×6144, palette+tRNS alpha intact, same geometry as production —
Tower-verified before this lap opened, so no fx/fy retuning was in
scope). Committed it, generated a WebP (657KB at quality 82 — already
under the ~800KB budget, no downscale needed), wired `<picture>`/
`<source>` with PNG fallback across all eight image references,
updated width/height attributes to the new intrinsic size. The K-4
addendum's added check — inspect the smooth upper-chest marble at a
stop for banding from the source's 256-color palette — is why this
lap exists: it FAILED. Extracted the exact on-screen crop (same fx/fy/
scale math the browser uses) from both the PNG and WebP and viewed
them directly: visible tonal stepping in the shadow gradient,
identical in both formats. That identical-in-both-formats result is
the diagnostic that matters — it rules out WebP compression as the
cause and confirms the banding was baked into the upscale tool's
8-bit/256-color output. A pixel scanline through the shadow region
confirmed it objectively (runs of 7–13 identical consecutive pixel
values where a clean gradient would show none). Per the addendum:
reported the finding and stopped, did not attempt a code fix — a
palette-quantized source has no code-side remedy.

**Commander's ruling: upscale abandoned, tools destroyed the alpha's
color fidelity.** Ship WebP delivery from the ORIGINAL asset instead.
Restored `assets/img/statue-kintsugi.png` (1024×1536, true RGBA, alpha
intact — `git show e0ec3d1:...`, the commit before the upscale
attempt) and kept the `<picture>`/WebP wiring built for this lap:
regenerated the WebP from the original (299KB at quality 82), width/
height attributes reverted to 1024×1536, preload repointed at the
WebP. Re-ran the banding check against the original-sourced WebP:
clean, as expected — confirms the artifact was specific to the failed
upscale, not the delivery pipeline built this lap. `.kh__film`'s CSS
box was never touched (stayed hard-coded at 1024×1536 throughout this
whole lap, upscale attempt included) — the JS transform math never
needed to change, in or out of the abandoned upscale.

Visual pass at 390 + 1440: establishing composition and anchor
placement unchanged from K-2 (expected — same asset content as before
K-4 ever started, only the delivery format changed); no horizontal
scroll; below-hero untouched. Squashed the lap's three working commits
(asset swap, blocked WebP-wiring WIP, revert-to-original) into one
clean commit before push — the intermediate "swapped to 4096, found
banding, reverted" sequence was never pushed, so no shared history to
preserve.

**Resolution debt: ACCEPTED as proto debt by Commander's ruling — NOT
closed.** The interim ~1024px asset ships. A future upscale, if
attempted again, needs tooling that preserves full-color depth (not
palette-quantized) — the alpha-preservation angle was never the
problem, the color depth was.

Cache-bust convention introduced for this asset in K-4 (`?v=N` query
param, none existed before): now at `v=2` after this lap's revert.

Next: Commander's word on K-4, then resume wherever the Tower routes.

---

## Entry #25 — 2026-08-05 — LAP K-3: KINTSUGI HERO — GATE FIXES II

Branch `k-1-kintsugi-hero` continued, PR #15 updated (not merged).
Executed OUT OF ORDER — numbered before K-4 (asset swap) but landed
after it, since the key arrived after the asset lap had already
closed. Baseline for this lap was K-2's visuals plus K-4's WebP
delivery from the original asset; both preserved. Five further fixes
from Commander's continued gate review of the K-2 preview, on top of
K-2's own three findings — scrub logic, timeline, dwell timing, and
stop order untouched throughout.

**Fix 1 — the establishing frame, rebuilt.** K-2's full-frame wash
retired: Commander's reference wanted the statue large, centered, and
fully present, with an elegant serif headline over her lower half, not
a scene-wide veil. H1 now sets in Cormorant Garamond — a new
`--font-serif` token in `tokens.css` (the repo's single source of
type, per constitution), scoped to the hero H1 only, flagged here for
Commander's brand-canon ratification since it's the first typeface
added to the system outside Raleway/DM Sans. K-2's white block behind
the H1 is gone; legibility now comes from one local gradient
(transparent by mid-torso, ~90% ivory by the paragraph/socials) plus a
soft text-glow on the H1 itself.

One real bug caught mid-build: the first attempt anchored the content
block to the bottom of `.kh__establish` via `justify-content:flex-end`
to get "over her lower half" positioning — this silently reintroduced
the exact bug K-2 already diagnosed and fixed (DÉFILER landing off-
screen), because `.kh__pin`'s own bottom edge sits below the fold
until sticky engages, and flex-end anchors to that edge specifically.
Caught via `getBoundingClientRect()` on the hint element at 390 before
it reached a screenshot. Fixed by keeping K-2's top-anchored flow and
pushing the block down with `padding-top:40vh` instead — same "lower
half" result, none of the bottom-anchor fragility.

**Fix 2 — permanent bottom-edge fade.** `mask-image` linear-gradient
on `.kh__film` itself (not the stage), so the fade travels with the
image through every keyframe — establishing and exit included —
regardless of current pan/zoom. Verified clean at the establishing
frame, at least one stop, and exit; the mechanism is keyframe-
independent so the other five stops inherit it identically.

**Fix 3 — zoom, -25% floor 1.1.** 1.35/1.6/1.8/1.85/1.25/1.4 →
1.1/1.2/1.35/1.4/1.1/1.1 across both the scrub `data-s` attributes and
the static fallback's `--s` custom properties. Every stop now reads
head-to-shoulder-plus-torso context, wider than K-2's already-loosened
framing.

**Fix 4 — dot rail, bigger and inboard.** ~2x dot diameter (9→18px
mobile, 10→20px desktop), gaps scaled to match, rail moved in from the
edge (28px mobile, 56px desktop — inside the 48–64px band). Real hit
target is 44px via a `::after` pseudo-element regardless of the
smaller visual dot, matching the site's existing `.dot`/`.dot::after`
tap-target pattern.

**Fix 5 — markers, +35% again.** Anchor dot, connector, and the shared
big-pill label all scaled up from K-2's sizes (dot 20→27px, connector
2px/38px→3px/51px, label 1.5rem/1.05rem+2.25rem padding→2rem/1.42rem+
3.04rem padding). Structure unchanged from K-2: all six stops share
the pill look; only Aréole is a real `<a>` with the chevron, cursor,
and href — the other five stay inert `<span>`s (confirmed via DOM:
`cursor:auto`, no `href`).

Static/reduced-motion fallback rebuilt to mirror the new composition —
was stacked (image, then copy below), now overlaid with its own local
veil and the same serif H1, verified at 390 with the establishing
frame and the stop crops both showing the new scales and marker sizes.

Checks 1–10 run at 390/1024/1440 (1024's zoomed-stop screenshots hit
the same post-resize compositor lag documented in K-1/K-2 — verified
via computed styles instead: dot 27px, connector 3px/51px, label 32px,
rail left 56px, all matching spec exactly). Aréole navigates, five
captions confirmed inert, no horizontal scroll, below-hero pixel-
identical (untouched this lap), `<picture>`/WebP wiring intact and
still serving `statue-kintsugi.webp?v=2` unchanged (asset itself never
touched, per brief).

Cache: `main.css` v13→v14, `tokens.css` v6→v7 (new `--font-serif`
token), `hero-scroll.js` v2→v3 — all bumped from the post-K-4 values
as instructed, `hero-scroll.js` bumped on the letter of the cache law
even though this lap made zero changes to its actual JS content
(CSS/HTML only).

Next: Commander's word on K-3 — and on the serif amendment specifically,
since it's the first departure from the two-typeface system.

---

## Entry #26 — 2026-08-05 — LAP K-5: KINTSUGI HERO — GATE POLISH

Branch `k-1-kintsugi-hero` continued, PR #15 updated (not merged).
Blast radius held exactly to the establishing frame — K-3's stop
keyframes, markers, and rail shipped as-is, untouched and unaffected.

**Serif experiment REJECTED at gate.** Commander's ruling: revert the
hero H1 to the brand heading font. `--font-serif` token removed from
`tokens.css`, the Cormorant Garamond Google Fonts import stripped from
`index.html` — zero references to either left anywhere in the
codebase (grepped `.html`/`.css`/`.js` to confirm). `.kh__h1` back to
`var(--font-head)` at weight 700. K-3's size/position/composition over
her lower half, no white block, kept exactly — only the typeface
reverted. Brand canon reaffirmed: two typefaces (Raleway, DM Sans),
not three.

**Statue raised — the dead band under the header is gone.** This one
needed a real code change, not just CSS: the establishing camera's
vertical framing lives in `hero-scroll.js` (`establishScale`, and now
`ESTABLISH_KF.fy`), not in markup. `ESTABLISH_K` (the fraction of
contain-fit used for the establishing shot) went from 0.86 to 0.92 —
larger, more present, per the brief. The real fix is a new *dynamic*
`fy`: K-3 (and K-1/K-2 before it) centered the establishing shot dead
on (`fy=0.5`), splitting whatever vertical slack existed evenly above
and below her. That's invisible on mobile, where contain-fit is
width-bound and slack is generous — but on a short/wide desktop
viewport, contain-fit is height-bound and slack is almost zero, so
half-above read as a dead band under the header. A single fixed `fy`
can't serve both: tuned to clear the header on mobile, it clips the
crown on desktop, and the reverse. Fixed by computing `fy` in
`recalc()` (alongside `establishScale`/`k`, same resize-driven
lifecycle) so a constant ~18% of whatever slack actually exists at
that viewport sits above her head — scales with the aspect ratio
instead of fighting it. `ESTABLISH_KF` is mutated in place rather than
reassigned, since the exit segment's `to` holds a live reference to
that same object — exit inherits the new framing automatically, no
separate wiring. The six stops compute their own scale/position
independently of `establishScale`/`fy` entirely, so this touches
nothing about them; walked all six plus the exit to confirm regardless.

**DÉFILER, brand dark.** Gold read as inconsistent against the
heading/body ink system — switched `.kh__hint-line` and
`.kh__hint-label` to `var(--cocoa)`. Size, tracking, and position
unchanged.

One verification-process note worth recording: mid-check at 1440, the
film layer's transform read as `none` and `requestAnimationFrame`
never fired even after several seconds' wait — looked like a real
regression at first. It wasn't: the headless preview tab throttles/
suspends `rAF` entirely while not actively compositing, and requesting
a screenshot is what nudges it into producing a frame (and flushing
the queued `rAF` callback with it). Confirmed by hand-deriving the
expected `fy`/`ty` for that viewport, then checking the inline style
after a screenshot — matched exactly. Worth remembering for future
laps: read computed JS/camera state only after a screenshot, not
immediately after a resize or scroll.

Checks 1–7 run at 390/1440: statue high with crown clear at both
(390: ~55px gap under the header; 1440: ~13px, both comfortable, both
un-clipped); all six stops plus exit re-verified landing correctly,
independent of the establishing change as expected; H1 confirmed in
`--font-head`, zero Cormorant references anywhere in the codebase;
DÉFILER and its line confirmed dark and above the fold both widths;
static/reduced-motion fallback carries all three fixes (shares
`.kh__h1` and `.kh__hint` with the scrub markup, so the font/color
fixes applied for free; the "dead band" was never actually present in
the static layout — it was never viewport-height-centered like the
scrub camera, so there was nothing to raise there, confirmed rather
than assumed); no horizontal scroll; below-hero content pixel-
identical (untouched this lap).

Cache: `main.css` v14→v15, `tokens.css` v7→v8, `hero-scroll.js`
v3→v4 — the last one a real content bump this time, not the letter-
of-the-law bump K-3 did on zero JS changes.

Next: Commander's word on K-5. Establishing frame composition should
now be settled across all three gate rounds (K-2, K-3, K-5) — if this
clears, the hero's remaining open item is just the resolution debt
(ACCEPTED as proto debt per K-4's ruling, not closed) and the five-
caption debt from K-1 (Alopécie/Sourcils/Eyeliner/Lèvres/Cicatrices
still non-interactive, pending their own service pages).

---

## Entry #27 — 2026-08-05 — LAP K-6: MOBILE PROJECTION BUG — ROOT CAUSE FIX

Branch `k-1-kintsugi-hero` continued, PR #15 updated (not merged).
Ignition key dropped into `docs/IGNITION_K-6_mobile-projection-bug.md`
per instruction. Blast radius held to `hero-scroll.js` + hero CSS
viewport units — no fx/fy retuning, no marker restyling beyond what
the projection fix itself required.

**Root cause, one sentence:** markers were positioned by CSS flexbox-
centering inside a `100vh` box while the film was positioned by JS
using `window.innerHeight` — two independent coordinate systems that
only agree when the CSS box's rendered height exactly equals the JS-
measured viewport height, which iOS Safari breaks (`vh` sizes against
the taller LAYOUT viewport; the user sees the shorter VISUAL
viewport), producing the uniform ~one-body-zone-high drift Commander
found on his iPhone.

Fixed in the three parts the key laid out, in order:

1. **dvh with a vh fallback**, every hero vh usage: `.kh__scrubwrap`
   (760vh), `.kh__pin` (100vh), `.kh__establish`'s padding-top (40vh —
   the K-5 establishing-camera push-down). Standard fallback order:
   browsers without `dvh` support drop that declaration and keep the
   `vh` line above it.
2. **Single measured viewport.** `measuredVW()`/`measuredVH()` prefer
   `window.visualViewport`'s dimensions, falling back to
   `window.innerWidth/Height`. Wired into `recalc()` (replacing the
   raw `window.inner*` reads) and into the rail's click-to-scroll
   target math, which had its own separate `window.innerHeight` read
   K-6 also caught in passing. Added a listener on
   `visualViewport`'s own `resize` event alongside `window`'s
   resize/orientationchange — a toolbar show/hide doesn't reliably
   fire the latter.
3. **Markers derive their position from the film's own transform —
   not parallel math.** This was the actual structural fix, not just
   a narrower version of the old bug: `.kh__stop` is now a zero-size
   anchor point positioned via `translate3d`, computed in `update()`
   from the exact same `tx`/`ty`/`cam.scale` used for
   `film.style.transform` that same frame. `.kh__caption` (the dot +
   connector + pill group) handles centering: the dot's OWN center —
   not the group's bounding-box center — lands on the anchor, via a
   CSS transform offset by the dot's radius (`--kh-dot-r`, a custom
   property shared between the dot's own sizing and the offset math so
   they can't drift apart); connector and label flow downward from
   there. The fade/rise-in animation moved onto this same transform
   rather than living separately on `.kh__stop`. `k` (the wide-
   viewport compensation) now applies identically to film and markers
   by construction, since both read the same `cam` object each frame —
   no separate check was needed once markers stopped doing their own
   math.

**Secondary rule** (pill flip when it covers its own feature): built —
`.kh__stop[data-flip="above"]` support in CSS, reversing the caption's
flex order and centering offset — but left unused. None of the six
pills covered their own featured zone at any stop after the projection
fix, verified on screenshots at 390×844.

Checks, one by one: (1) all six dots verified landing exactly on their
body zone at 390×844 — Alopécie on the hairline, Sourcils on the brow,
Eyeliner on the eye, Lèvres on the mouth, Cicatrices on the chest
crack, Aréole on the areola itself; (2) re-verified at a shortened
390×764 viewport (simulating the Safari toolbar) — every dot tracked
the identical pixel of anatomy at both heights, confirming the fix
holds across viewport-height changes rather than just narrowing the
old error; (3) desktop 1440 regression guard: establishing frame
screenshot-matched against K-5 pixel-for-pixel, stop projection
confirmed via DOM (`translate3d(720px,450px,0)` against a 1440×900
viewport — exactly `vw/2,vh/2`, matching the math by construction; the
1440-zoomed-stop screenshot itself hit the same environment-specific
compositor lag documented in every prior K-lap, DOM inspection stood
in as it has every time); (4) Aréole still navigates, five captions
still inert (`<span>`, no href, `cursor:auto`); (5) no horizontal
scroll; (6) below-hero content unaffected.

Cache: `main.css` v15→v16, `hero-scroll.js` v4→v5 (a genuine content
change this time).

Next: Commander's word on K-6, ideally the last hero gate round.

---

## Entry #28 — 2026-08-05 — LAP K-7: KINTSUGI SCROLL HERO — MERGE & CLOSE

**GATE PASSED.** Commander walked all six stops on the physical
iPhone, toolbar up and down, tapped Aréole navigation. K-6's
projection fix holds on real hardware, not just emulation. The
K-1→K-6 campaign is approved for production.

PR #15 merged into `main` via a merge commit (`9750f6e`, two parents —
not squashed, not rebased): the lap-by-lap history is the campaign
record and now lives in `main` alongside this LEDGER. Branch
`k-1-kintsugi-hero` kept, not deleted this lap, per the key.

Production verified at **https://hotico-proto.vercel.app**:
`statue-kintsugi.webp?v=2` served (confirmed via response headers and
by grepping the served HTML), establishing frame renders correctly,
Aréole stop spot-checked — projected to `translate3d(195px,422px,0)`
against a 390×844 viewport, i.e. exactly `vw/2,vh/2`, matching K-6's
math by construction — and the Aréole link navigates live to
`/servicii/areola.html` on production.

**Kintsugi Scroll Hero K-1→K-6 merged to production; Commander's
iPhone gate passed.** Open debts carried forward:
- **Resolution debt** — accepted as proto debt by Commander's ruling
  (K-4): the statue ships at its original ~1024×1536 source resolution;
  a full-color re-upscale (avoiding the palette-quantization banding
  the K-4 attempt hit) is a future lap, asset-only.
- **Five inert captions** (K-1) — Alopécie, Sourcils, Eyeliner, Lèvres,
  Cicatrices remain non-interactive captions, no href, by LINK LAW.
  Each upgrades to a live pill in its own future lap as the
  corresponding service page ships, same pattern Aréole already set.
- **`hero-torso.png` + temp assets cleanup** — the old D-2 hero image
  and other now-orphaned temp-1x assets are still sitting in
  `assets/img/`, unused since K-1 retired the split hero. Future tidy
  lap, not urgent, Trash not delete per constitution.

Seven laps, one campaign, closed. Next: wherever the Tower routes —
tidy lap on the orphaned assets, or the next service page's own
front-door treatment.

---

## Entry #29 — 2026-08-07 — LAP R-0: ASSET FOUNDRY — MERGE & CLOSE

**GATE PASSED.** Files-only lap: refonte homepage v2 raw material
landed — spec vault, statue and étapes serving assets, six service
pill crop proposals. No DOM/CSS/JS touched, per brief.

**Spec vault** (`docs/spec/refonte/`): six Commander anchor mockups
and `hotico-fr-content.xlsx` archived untouched from `_intake/`. xlsx
SHA-256 `21d20ae18325...086641` recorded in `MANIFEST.md` as the
chain-of-custody anchor for all verbatim trilingual text pulled in
future laps.

**Statue & étapes**: `Hero_Hotico_4x.png` (4488×5608) and the three
étapes renders archived to `assets/src/`; whole-frame-resized serving
webps produced — `statue-kintsugi-v2.webp` (1639×2048, no crop, alpha
preserved) and three 2400×2400 étapes squares with a pixel-measured
band-check (subject vertical center, mobile 16:9 band coverage,
desktop banner-strip coverage) reported per file.

**Anchor table correction — Hands STOP caught a Tower error.** The
original R-1 anchor table was verified against the actual delivered
`Hero_Hotico_4x.png` before cropping and found off: `alopécie` and
`lèvres` landed in pure transparent background, `sourcils` on the
forehead instead of the eyebrow, `eyeliner` on the cheek instead of
the eye. Flagged rather than silently cropped or self-corrected — a
silhouette-bbox registration error on Tower's side, ledgered. Tower
re-derived a v2 table by pixel correlation + visual placement,
verified again before use, Commander-gated.

**Étapes naming slip** — `_intake` names didn't match the Figma
triptych meaning. Commander ruling: content swapped so
`etapes-procedure` = the rough-hewn rock, `etapes-entretien` = the
gold-veined sphere. `etapes-conseil` (cube) untouched. Applied to both
`assets/src/` masters and `assets/img/` webps; band-check table
relabeled to match, not recomputed (same underlying files).

**Pill crops, twice re-cut.** v1 (centered on the broken anchors) was
scrapped. v2 (Tower's corrected anchors, still centered) landed on
real anatomy for 4/6 but `alopécie` and `cicatrices` stayed weak. v3
(this round, Tower rule): window offset so the feature sits in the
left third of the strip — inside the `.pill__img` mask's fully-opaque
0–55% zone — with zero transparent pixels, clamped fully inside the
statue silhouette. Verified programmatically per crop
(`alpha.getextrema()[0] == 255`, all six). Five landed clean at the
target x-fraction (~0.17, essentially the ideal 1/6). `pill-levres`
could not hit both the left-third target and stay legible — the
chin/jaw silhouette leaves almost no opaque margin there; exact 1/6
placement forced a 104px source crop that blurred to mush at 495px
output, relaxed to x-fraction ≈0.085 (still inside the left third) to
keep a 400px crop. Flagged soft — source-limited, not a cropping
mistake — and accepted by Commander as-is for this lap.

PR #16 merged into `main` via a merge commit
(`2c948d110dd4624ac8ec39972b1528d24cd8c990`, two parents — not
squashed, not rebased): the v1→v2→v3 correction history is part of
the record and now lives in `main` alongside this LEDGER.
`_intake/` confirmed absent from `main` — never tracked, source files
moved out to their vault/archive homes; the local empty directory
was cleared.

**Asset Foundry landed; Commander's eye passed.** Open debts carried
forward:
- **`pill-levres` framing** — accepted soft this lap; may need a
  different anchor point or a different pill treatment to solve
  properly. Future lap.
- **`pill-alopecie` semantic drift** — geometrically valid (zero
  transparency, correct x-fraction) but the v2 anchor still points at
  the eye corner, not scalp/hairline. Carried forward unresolved from
  v2; not a v3 cropping issue.
- **`cicatrices`** — legible as "a scar line" but no strong focal
  mass. Usable, not dramatic.

Session retires at this boundary. Next: wherever the Tower routes —
R-1 territory (HTML/CSS/JS) now has real assets to build against.

---

## Entry #30 — 2026-08-07 — LAP R-1: STATUE & ANCHORS — MERGE & CLOSE

**GATE PASSED.** New hero statue landed; the six-stop scroll film speaks
it, in both the scrub (JS) and static (no-JS/reduced-motion) tiers.

**Opened straightforward, then the ground moved.** R-1 began as a clean
asset-reference swap: `statue-kintsugi.webp` → `statue-kintsugi-v2.webp`
(17 refs), `IMG_W`/`IMG_H` and `.kh__film` re-derived for the new 0.8003
aspect, six stops re-anchored in a new order (Sourcils, Eyeliner,
Alopécie, Lèvres, Cicatrices, Aréole) per the Tower's v2 anchor table,
uniform `6.6vh` connector introduced as a single constant. Commander
ratified the DOM-driven stops discovery (data attributes on `<li
data-kh-stop>`, not a JS literal — the search domain named in the brief
undersold where the config actually lives) and the connector's scrub-
only scope. First amendment: the static/no-JS fallback — a live
reduced-motion user path, easy to forget — got the same six-stop
treatment, verified by forcing `js-kh` off.

**Then: statue A never shipped.** Client ruling (Alexa) mid-lap
superseded the statue entirely. Everything built on statue A —
`statue-kintsugi-v2.webp`, the six `spec-*.png` mockups, the v2 anchor
table — became history in one stroke, not because it was wrong but
because the client changed her mind about the image itself. New master
`Hero_Hotico2_4x.png` (4096×6144) and Commander-gated `spec-anchors-
v3.png` landed via `_intake/`; `statue-kintsugi-v3.webp` produced as a
whole-frame resize (1365×2048, never cropped, alpha preserved) — the
"never crop" law meant the establishing frame now shows the full
pedestal, a visible change from v2's tighter crop, checked against
Commander's own intent ("head + upper chest present, room for the H1")
and passed. All 17 references swapped again, all framing constants
re-derived again, six stops replaced again — same order, same link law,
new coordinates. Six `pill-*.webp` serving assets (produced ahead-of-
use in R-0, not yet wired into any page) re-cut from the new master
rather than the old compressed serving webp, fixing R-0's own blur
debt on `pill-levres` in the process.

**Then: Commander walked the preview.** Composition approved outright.
Three stops needed placement correction (Sourcils, Alopécie, Lèvres —
Eyeliner/Cicatrices/Aréole stood as-is) per a second Commander-gated
sheet, `spec-anchors-v3-1.png`. A fourth ruling, new to this lap:
**continuous connector law** — dot, line, and pill must read as one
unbroken unit, zero gaps at any viewport, zoom, or stop. Root cause
found and fixed at the source: `.kh__caption-line`'s shared `margin:
.5rem 0` was breathing room the static tier still wants but the scrub
tier never should have inherited. Scoped `.kh__stop .kh__caption-
line{margin:0}` alongside the existing length override. Verified by
measuring live DOM edges — `line.top - dot.bottom` and `pill.top -
line.bottom`, both exactly `0px` — at all six stops, not by eye. Three
pills re-cut a second time for the moved anchors; `pill-sourcils`'
hairline-margin debt relaxed slightly as predicted, `pill-levres`
tightened instead — new anchor, narrower opaque margin, same category
of source-limited debt as R-0's original.

**MANIFEST.md** carries the full chain: v2 spec mockups and
`statue-kintsugi-v2.webp` marked superseded-not-deleted; `spec-anchors-
v3.png` and `spec-anchors-v3-1.png` added as the live Commander-gated
references; both masters (`Hero_Hotico_4x.png`, `Hero_Hotico2_4x.png`)
coexist in `assets/src/` as history.

PR #17 merged into `main` via a merge commit
(`3f731779bb062a878abd740fd7c778f90c18b648`, not squashed, not
rebased): the statue-A→B supersession and the v1→v2→v3→v3.1 anchor
correction history is part of the record and now lives in `main`
alongside this LEDGER.

**R-1 landed; Commander's eye passed twice, Tower cert both times.**
Open debts carried forward:
- **`pill-levres`** — soft/weak framing (mostly a lip corner and jaw),
  source-limited by the mask rule's left-third constraint at this
  anchor. Commander-accepted. Same unresolved shape as R-0's debt on
  the same file, now against a different statue.
- **`statue-kintsugi-v2.webp` + the six v2 spec mockups** — orphaned as
  history, not live spec. Trash, never delete, per constitution.
- **Six `pill-*.webp`** — still unwired. No page references any of
  them yet; they remain ahead-of-use serving assets from R-0, now
  current against statue B.

Session retires at this boundary. Next: wherever the Tower routes —
the pill assets have a home waiting in some future service page, and
R-2/R-3 (scroll mechanics, scroll indicator) were named out-of-scope
here, twice.
