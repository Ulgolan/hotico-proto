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

---

## Entry #31 — 2026-08-07 — LAP R-2: SCROLL FEEL — MERGE & CLOSE

**GATE PASSED, twice.** Commander walked both devices twice — once
after the initial build (framing PASS, feel flagged for one tune
pass), once after the tune pass (snappy, locks, no purgatory, first
transition approved, no pill stutter). Tower diff-cert via codeload
tarballs, both rounds: scope held to hero-scroll.js/main.css/index.html
+ the two service pages' cache-busts, stop markup byte-identical to
main throughout, zero `preventDefault` invocations at any point.

**The lap's one variable was the FEEL** — anchors, labels, links,
connector geometry untouched across both rounds, confirmed by diff
each time.

**A — snap-on-settle.** Native scroll drives the camera the whole
time; once settled (`scrollend`, debounce fallback), eases to the
nearest of establish/dwell-mid/release — `SETTLE_TARGETS` is the
complete, exhaustive set, so nothing mid-transition is ever a valid
landing.

**B — cadence.** Runway cut 760vh→400vh, one knob scaling the locked
hold/trans/dwell/exit ratios together. Inter-stop cycle ~55.7vh.

**C — stop framing, and the lap's one accepted deviation.** The
ignition key's literal instruction was "raise data-s." Building it
that way surfaced a real interaction bug: `data-s` is read through the
same wide-viewport `k` compensation that's already maxed on desktop,
so a mobile zoom-boost compounds through that ceiling too — a stop
that read as "commands the screen" on a phone became "all hair, no
face" at 1440px. Decoupled instead: `data-s` stays exactly R-1's
Commander-approved values (untouched, still LOCKED); a JS-only mobile
zoom lift and a vy anchor-placement bias (upper-middle instead of
`vh/2`) both taper to a hard no-op at `k`'s 1.35 ceiling, so desktop's
transform is byte-identical to pre-lap — verified by direct transform
inspection, not just claimed. Tower accepted this as superior to the
key's own instruction, not drift: **the key's letter yielded to the
key's actual intent** (mobile framing fixed, desktop untouched) once
the two turned out to be in tension.

**Then: the tune pass.** Commander's first walk passed the framing but
flagged the feel — three findings, diagnosed and fixed on the same
branch, same PR, per standing rule for a retune:

- **Snap-back purgatory (Sourcils↔Eyeliner).** Root cause: the debounce
  fallback was gated `if (hasScrollend) return` — on any browser
  reporting `scrollend` support, the entire safety net was skipped,
  betting the whole settle response on one native event whose firing
  latency isn't part of the feature-detection contract (and is
  documented to lag behind on WebKit after momentum scrolling). Fixed
  by running debounce unconditionally in parallel (~140ms after the
  last `scroll` event) — `scrollend`, when prompt, still wins by
  clearing the pending timer; `settle()`'s own epsilon check makes
  firing both harmless. Compounding second cause: nearest-target
  picking was a flat 50/50 split, judging a normal flick's travel as
  "lazy" and snapping it back — a normal user was never meant to pay
  the same cost for a slightly-short advance as for a genuinely lazy
  drag. Ruling: bias the tie-break asymmetrically. The direction the
  gesture was already headed needs only 30% coverage of the gap to
  advance; reversing that direction needs 70% — advancing is the
  default assumption, snap-back is reserved for a drag that covers
  less than the 30% floor (`ADVANCE_BIAS_FRAC = 0.20`, tune value not
  a law). The asymmetry is deliberate: a false "advance" costs the
  user one extra flick backward to correct; a false "snap-back" costs
  the exact purgatory Commander hit — the two mistakes are not equally
  expensive, so the threshold isn't centered.
- **First transition read as a slam** (establish→Sourcils crossed in
  ~0.25s, both mobile touch and desktop wheel). A flick uses up a
  short transition's runway near-instantly regardless of its easing
  curve — `smootherstep` already ramps from/to zero velocity at both
  ends, so the fix is distance, not curve shape. Runway 400vh→**428vh**,
  all 28 of the added vh going to the establish→Sourcils transition
  alone (`FIRST_TRANS_BONUS_VH`), added on top of the total rather than
  carved from another segment — every other stop's B-tuned cadence is
  unchanged in absolute vh.
- **Lèvres pill stutter** (quick-appear/disappear/stabilize on
  arrival). Root cause: the pill's active state was tied to the
  literal dwell-segment boundary; a brief momentum overshoot just past
  it — which settle() correctly corrects right back — flickered the
  class through active→inactive→active fast enough to read as a bug,
  though each instant was technically correct. Same narrow-dwell-zone
  mechanism as the purgatory finding, manifesting as a stutter instead
  of a wrong-stop snap. Fixed with hysteresis: the active check now
  tests each dwell's own padded range directly (`ACTIVE_PAD = DWELL ×
  0.35`) instead of `findSegment`'s exact boundary. Camera position
  itself is untouched — framing stays pixel-identical to C.
- `?khdebug=1` console instrumentation shipped and kept, not stripped
  before merge: logs settle source/position/target/decision, silent
  by default. Built because no iOS Simulator was available on the
  build machine to capture real device numbers directly (no full
  Xcode install) — this is what the next device-inspector session
  reads if any of the three tune values above need another turn.

**One Tower error, corrected by the Hands — same shelf as the
silhouette-bbox anchor miscalculation in entry #29.** The ignition
key's verification item (d) demanded proof that reduced-motion on the
SCRUB tier settles as an instant jump. That state doesn't exist: the
gate architecture (pre-existing, untouched by this lap) only adds
`html.js-kh` when `prefers-reduced-motion` reads false, `.kh__scrub`
is `display:none` without that class, and `hero-scroll.js` returns at
line 11 before any of this lap's code runs — scrub and reduced-motion
are mutually exclusive by construction, not by omission. Confirmed
with Chrome's actual `--force-prefers-reduced-motion=reduce` flag
against the built branch: static tier renders, scrub tier does not.
The Hands flagged this as a premise correction rather than staging a
misleading test to manufacture compliance, and proved the underlying
code path (the `prefersReducedMotion` branch inside `settle()`) correct
by inspection instead: it reads the identical `matchMedia` query the
gate already evaluated to decide whether `hero-scroll.js` runs at all,
so it is provably `false` on every path that reaches `settle()` today
— defensive-only, correct if the gate is ever loosened, not exercisable
now. Item discharged by premise correction, not by screenshot.

PR #18 merged into `main` via a merge commit
(`d2867ae0dce728fb1a9813205de329eda349238d`, two parents — not
squashed, not rebased): both rounds' history — the initial build, the
data-s deviation, and the three-finding tune pass — is part of the
record and now lives in `main` alongside this LEDGER. 24 before/after
certification screenshots (all six stops, both mobile heights) and the
reduced-motion proof screenshot live at `docs/qa/r2-scroll-feel/`, not
deleted post-merge — the audit trail stays in-repo.

**Scroll Feel landed; Commander's eye passed twice, Tower cert twice.**
No open debts — the three tune-pass values (`ADVANCE_BIAS_FRAC`,
`FIRST_TRANS_BONUS_VH`, `ACTIVE_PAD`) are live constants, not hardcoded
forever, should a future device walk ever want another turn, but
nothing here is flagged soft or accepted-as-is.

Session retires at this boundary. Next: wherever the Tower routes —
R-3 (scroll indicator) was named out-of-scope twice now, in R-1 and
again here.

---

## Entry #32 — 2026-08-07 — LAP R-3: INDICATOR — MERGE & CLOSE

**The lap's one variable:** the hero's empty scroll-indicator box
becomes a labeled invitation. `.kh__hint` was a bare 1px vertical
line above the word "Défiler" — no arrow, no direction, no invitation
a first-time visitor could read at a glance. It is now inline text,
"DÉFILER VERS LE BAS", followed by a down-arrow.

**Arrow — one accepted deviation, ruled by Commander's eye against his
own stem-arrow mock.** The key called for "an inline Ivory-Loom-style
primitive SVG." Rather than draw a new primitive, the build reused the
filled-triangle chevron already living in this codebase
(`.scard__arrow` / `.field__caret` — `viewBox="0 0 16 16"`, path
`M3.4 5.8h9.2L8 11.2 3.4 5.8Z`), wired through `fill:currentColor` so
`.kh__hint`'s `color:var(--cocoa)` — Cocoa `#3C2F2F` — drives it, per
the key's explicit color instruction. Commander's eye passed this
against the mock: same weight class, same quiet register, one fewer
one-off asset in the repo.

**Everything else held to the letter.** Existing micro-typography
tokens carried over unchanged — `.75rem` size, `.28em` letterspacing,
uppercase via `text-transform` (source markup stays lowercase,
`"Défiler vers le bas"`, matching the file's existing pattern of
letting CSS do the capitalization). No new type size invented. No
scroll affordance added — the pre-lap element had no click handler or
animation tied to it (`hero-scroll.js` grep confirmed zero references
to `.kh__hint`), so none was added now. Homepage only; stop markup and
`hero-scroll.js` untouched.

**Verification.** 390×844 and 1440 desktop screenshots on record,
band-walk 768/1024/1920 spot-checked — indicator clears the statue
and H1 at every width, no collision at any band.

**Cache-bust.** `main.css` v19→v20, bumped on all three referencing
pages (`index.html`, `servicii/areola.html`,
`servicii/in-curand.html`) since CSS was touched (`.kh__hint` layout
flipped column→row, new `.kh__hint-arrow` rule added, `.kh__hint-line`
rule retired as dead weight once the line it drew was replaced).

**Gate.** Commander's eye: PASS (mobile walk, screenshot on record).
Tower diff-cert via codeload tarballs: PASS — scope held to hint
markup + hint CSS + the three v20 cache-busts; `hero-scroll.js` and
stop markup byte-identical to `main` throughout.

PR #19 merged into `main` via a merge commit
(`7cc20a5`, two parents — not squashed, not rebased): the build commit
and the merge commit both live in `main`'s history alongside this
LEDGER entry.

**No open debts.** Session retires at this boundary.

---

## Entry #33 — 2026-08-08 — LAP R-3b: CADRAGE — MERGE & CLOSE

**The lap's one variable:** the mobile establishing-frame vertical
composition. Commander's device walk (390-wide, Brave, 23:11
screenshot) found "DÉFILER VERS LE BAS" licking the browser chrome
while a dead crown of space sat above the statue's head. The whole
ensemble — statue, H1, paragraph, socials, indicator — is raised as
one unit.

**Diagnosis, all three suspects, before anything was touched.**
Suspect (a), hero height unit: ruled out — `.kh__pin` and
`.kh__scrubwrap` already carry the vh+dvh fallback pattern from K-6.
Suspect (b), header-to-hero spacing: ruled out — no stray margin or
padding sits between `.hdr` and `.kh`; the gap measured was the
header's own natural height (~92px), not a bug. Suspect (c), the
establishing camera state: the actual cause, and it was two bugs
compounding, not one. On a narrow/tall phone `containScale` is
width-bound, leaving a large vertical slack; `ESTABLISH_TOP_RATIO`
(0.18, LAW past 768px) reserved 18% of that slack above the crown as
a flat, unconditional ratio. Independently, `.kh__establish`'s CSS
carried a flat `40vh`/`40dvh` copy padding-top on top of that — with
no formula tying the two together, they were each eating the same
dead space with no relationship to each other or to where the statue
actually sat.

**The honest first attempt, scrapped.** The first build moved the
statue's gap and the copy's padding-top by independent deltas (a
tapered top-ratio for the image, a separately-tapered vh fraction for
the copy). It overshot: the copy slid up faster than the image and
landed over a less-washed part of the statue, breaking the
`.kh__veil` legibility relationship the original 40vh value had been
tuned against. Caught by screenshot before it reached a PR, not after.

**The landed fix: one shared rigid-ensemble lift.** A single pixel
value, `ESTABLISH_LIFT_PX_MOBILE` (tune target 55px), subtracted
identically from both the image's gap-above-head and the copy's
padding-top, each floored at 0 independently — so image and copy move
as one rigid body up to the point the image goes flush against the
pin's top edge, after which the copy alone continues closing the
remaining distance. The gap between image-bottom and copy-top that
`.kh__veil` was tuned against is preserved throughout, just relocated
higher in the pin.

**One accepted deviation from the key, ruled by the Tower.** The key
suggested the existing k/wideT aspect-ratio taper (the mechanism
already driving `DWELL_VY`/`MOBILE_ZOOM_BOOST`) as the tapering
discipline. The build used a raw viewport-WIDTH taper instead
(`establishMobileT()`), hard-gated at 768px to match main.css's own
mobile/desktop line. Reasoning offered at PR time: the aspect taper
leaks partial values into in-between aspects (e.g. a tall 768-wide
window sits at k≈1.15, not the 1.35 ceiling), which would have made
this specific composition fix not-quite-byte-identical on some
literally-desktop-width viewports — a real risk for a composition
guardrail specifically, even though the existing aspect taper is
correct and accepted for in-scroll dwell framing. The Tower accepts
this as tighter than ordered, not a scope violation: desktop is
byte-identical by construction at every width `>=768px`, not merely
identical at the specific bands walked.

**Static tier checked, not touched.** `js-kh` forced off to render
`.kh__static`: it already sits flush against the header with zero
dead space — a structurally different layout (`height:auto`,
bottom-anchored copy, no `establishScale`/`ESTABLISH_TOP_RATIO` math
in play at all), never exposed to this bug. Left byte-identical.

**Six stops and the establish→Sourcils transition — untouched,
verified.** This change only ever reads/writes `ESTABLISH_KF` and
`.kh__establish`'s padding-top; dwell state (`fx`/`fy`/`s`,
`DWELL_VY`, `MOBILE_ZOOM_BOOST`) is a separate code path, byte-
identical. The establish→Sourcils gather was walked at progress 0.14
(mid-transition) and 0.205 (arrival) post-fix — same smootherstep
mechanism, landing on a different (higher) start point, no jump.

**Measured, 390×764 (the worst-case gate — chrome eats more here than
764).** Gap above statue (film `ty`): 40.6px → 0px. Copy padding-top:
305.6px → 250.6px. Indicator clearance to viewport bottom: 60.6px →
115.6px. Void-above-head reduction, measured against the source
image's own pixel content (a canvas scan found the statue's hairline
begins 6.3% into the asset, i.e. a fixed, untranslatable ~34px of
headroom baked into the art) and excluding the header's own fixed
chrome: ~55% at 764, ~62% at 390×844 — both clear the key's "at least
50%" floor.

**Verification.** Screenshots at 390×844, 390×764, and 375×667
(mobile, all three clean); band-walk 768×900/1024×768/1440×900/1920×1080
(desktop) — film transform values compared numerically against
pre-lap baseline and found identical at 768 and 1440, inline
padding-top override confirmed empty (never set) at all four widths.

**Cache-bust.** `main.css` v20→v21, bumped on all three referencing
pages (`index.html`, `servicii/areola.html`,
`servicii/in-curand.html`). `hero-scroll.js` v8→v9 — only page that
references it.

**Gate.** Commander's eye: PASS (r3b-cadrage preview — composition
validated, void killed, indicator clear). Tower diff-cert via codeload
tarballs: PASS — scope held to 5 files; index.html cache-bust lines
only; CSS carries one documenting comment, the 40vh rule itself
untouched; JS carries the shared `ESTABLISH_LIFT_PX_MOBILE` ensemble
lift, width-gated at 768px, zero at desktop by construction; stop
markup byte-identical; zero `preventDefault`.

PR #20 merged into `main` via a merge commit (`bfcb104`, two
parents — not squashed, not rebased): the build commit (`978ab56`)
and the merge commit both live in `main`'s history alongside this
LEDGER entry.

**One open tunable, not a debt.** `ESTABLISH_LIFT_PX_MOBILE = 55` is a
live constant, same standing as R-2's `ADVANCE_BIAS_FRAC`/
`FIRST_TRANS_BONUS_VH`/`ACTIVE_PAD` — a tune target for the next
device walk if one is ever wanted, not hardcoded-forever and not
flagged soft.

Session retires at this boundary.

---

## Entry #34 — 2026-08-08 — LAP R-2b: SCROLL FEEL II — THE POLISH — MERGE & CLOSE

**The lap's one variable:** the MOTION QUALITY of the settle ease.
`SETTLE_TARGETS`, the 30/70 advance bias, and the 428vh cadence —
LAW from R-2 — did not change; only how the ease moves did.

**Finding A — the slam, root cause and fix.** Tower's frame-level
motion analysis of the Commander's device recording measured a full
stop-to-stop settle completing in ~0.5s with near-instant rise to
peak velocity (0→max in under 100ms). Root cause: `settle()` handed
the actual motion to `window.scrollTo({behavior:'smooth'})` — native
smooth-scroll picks a fixed, short duration regardless of distance,
with a curve that's front-loaded rather than eased in. Fix: the ease
is now owned — an rAF loop writing `scrollTo` per frame — so both
duration and curve are ours. Curve: `smootherstep` (already defined
for the camera's spatial easing) reused in the *time* domain, zero
velocity at both t=0 and t=1 by construction — gather, glide, land,
no instant peak; one curve serving both what the camera does in
space and what the settle now does in time. Duration:
distance-proportional, 220ms (a small in-gesture correction) to
640ms (a full inter-stop travel), normalized against the largest gap
between two adjacent `SETTLE_TARGETS` rather than a hardcoded pixel
number, so the formula keeps working un-retuned if that spacing is
ever retuned.

**Finding B — the straggler fight, root cause and fix.** Measured
pattern: drag plateau → 2-frame hard freeze → violent slam →
mid-slam hiccup (a velocity dip between two peaks) → freeze →
resume. Root cause: native smooth-scroll exposes no cancel API and
no "still running" query — the only way the old code could react to
a late iOS momentum event arriving after the 140ms debounce had
already started a settle was to call `scrollTo` again, which starts
a *second* competing animation instead of replacing the first; the
hiccup was that collision. Fix: owning the loop makes it
interruptible. `activeEase` is the single source of truth for
"a settle is in flight"; any `scroll` event that isn't our own
per-frame write cancels it cleanly (`cancelAnimationFrame`, no
leftover animation to fight) and re-arms the debounce for a fresh
attempt once things actually go quiet. Self vs. foreign is told
apart with a single-frame flag (`expectingSelfScroll`) set right
before our own write and consumed by the very next `scroll` listener
call — per spec, a synchronous write's scroll event dispatches
within that same frame's render-update step, so the flag never races
across frames. The `scrollend` listener got the matching guard: our
own instant per-frame writes can each read to the browser as a
discrete, already-ended scroll, so `scrollend` firing mid-ease is not
treated as the ease's own completion signal — the rAF loop's own
`frac>=1` check is.

**The 140ms debounce — deliberately not touched, reasoning on
record.** The ignition key asked whether the debounce window itself
needed tuning. It answers a different question — "how long has it
been quiet since the last scroll input" — than the one Finding B's
bug actually turned on: the ease fighting an event that arrives
*while it's running*, not the wait before it starts. That fight is
what the self/foreign split removes; the 140ms figure keeps its
original, R-2-tune-pass, device-measured meaning, untouched.

**Reduced-motion instant-jump branch — untouched, semantically.**
Tower's diff-cert noted the branch moved structurally (pulled into
its own early-return inside the rewritten `settle()`) but confirmed
it byte-behaviorally identical: still a single unconditional instant
`scrollTo({behavior:'auto'})`, no ease, still a dead code path today
(the `js-kh` gate in `<head>` keeps reduced-motion off this file
entirely) — accepted as the same law, relocated by the shape of the
rewrite around it, not changed.

**Verification.** A standalone Node trace mirroring the exact
`smootherstep`/duration formulas confirmed zero velocity at both
ends of the ease and the distance-proportional split (260ms for a
short correction, 640ms for a full stop-to-stop). A live browser
trace (`?khdebug=1`) confirmed four clean
`settle → ease start → ease complete → rest confirmed` sequences on
mobile — both directions, varying distances, correct biased targets,
correct rail-pill activation — and one clean sequence on a 1440×900
desktop viewport, no console errors either width. The straggler-
cancel branch itself could not be made to fire live in the build
machine's headless test harness — a backgrounded browser tab
throttles/pauses `requestAnimationFrame` hard enough that a short
(220–640ms) ease collapses into a single frame before a same-session
interrupt can be timed against it — so that path was shipped
verified by code inspection only, flagged honestly as needing the
Commander's actual device walk, where the ease runs at real 60fps.
**Closed there:** the Commander's walk certified it directly — phone
flicks including mid-glide interrupts, "sublime smooth" — the only
place the straggler-cancel branch could actually be exercised, and
it was.

**Cache-bust.** `hero-scroll.js` v9→v10 — only page that references
it (`index.html`). `main.css` untouched, no bump.

**Gate.** Commander's eye: PASS on both instruments — phone flicks
(mid-glide interrupts included) and desktop wheel. Tower diff-cert
via codeload tarballs: PASS — scope held to two files
(`hero-scroll.js` + the one `index.html` cache-bust line); LAW
constants byte-identical (`TOTAL_VH=428`, `ADVANCE_BIAS_FRAC=0.20`,
`SETTLE_DEBOUNCE_MS=140`, `SETTLE_TARGETS` construction); owned-ease
machinery verified (`smootherstep` time-domain, 220–640ms
distance-proportional, `cancelAnimationFrame` cancel-and-rearm);
zero `preventDefault`.

PR #21 merged into `main` via a merge commit (`4016a04`, two
parents — not squashed, not rebased): the build commit (`f3fab26`)
and the merge commit both live in `main`'s history alongside this
LEDGER entry.

**No open debts.**

**THE HERO IS COMPLETE.** R-0 through R-2b — statue and asset
foundry, anchors, scroll feel (twice: cadence and now motion
quality), the indicator, the mobile establishing-frame cadrage —
close together here. This entry closes the hero chapter of Campagne
REFONTE.

Session retires at this boundary.

---

## Entry #35 — 2026-08-08 — LAP R-2c: LA SORTIE — MERGE & CLOSE

**The lap's one variable:** the film's exit handoff — the gap between
the statue's release and the Découvrez video section's arrival. This
entry tells the whole war honestly: three architectures, two bounced,
two Tower errors caught by the Hands before they shipped.

**Root cause, measured before any fix was attempted.** `.kh__pin` is
a 100vh/100dvh sticky child of the tall `.kh__scrubwrap`. By
construction of any sticky-pin-in-a-tall-wrapper pattern, the pin's
sticky offset maxes out (the "release") exactly one pin-height
*before* the wrapper's own bottom edge — past that point the pin is
just an ordinary flow box occupying the wrapper's own last 100vh,
no longer scrubbed, and `.kh` (unshrunk) reserved and painted its
ivory background across that same trailing 100vh regardless. Measured
directly via `getBoundingClientRect`, not estimated: exactly 100vh of
dead white at both 1440×900 and 390×844 before any of this lap's
code ran.

**Architecture 1 — margin-pull + opaque band. BOUNCED on Commander's
walk.** Pulled the next section up by one pin-height via negative
margin so it started exactly at the release point, with an opaque
fill to cover the spent pin. Proved occlusion at the seam and shipped
on that proof alone — insufficient. Commander's walk found the
approach itself broken: the pulled-up section's box geometrically
overlapped document space that was still live film for roughly the
last quarter of the scrub, so the incoming band visibly crept up over
the running statue from Cicatrices onward (F1), and the band's own
opaque fill covered only the band, leaving the video carousel's own
un-filled span to let the motionless pin bleed through underneath it
(F2). A document overlap is not occlusion — the pin has to actually
stop rendering, not just be out-raced by whatever's pulled over it.

**Architecture 2 — `.kh` shrunk to 328vh + instant `is-released`
visibility toggle. Geometry RETAINED; the toggle BOUNCED.** Root
cause fixed properly this round: `.kh` itself (not `.kh__scrubwrap`,
kept at full height, LAW) shrunk to end exactly one pin-height early,
`overflow:visible` so the sticky pin — governed only by
`.kh__scrubwrap`, a level below `.kh` — is completely unaffected. The
next section now starts in plain normal flow at the exact release
point, zero overlap with the running film at any point in the scrub.
This architecture held for the rest of the lap. What didn't hold: an
instant `visibility:hidden` toggle at the exact release instant read,
on Commander's walk, as the statue being *executed*, not released —
a teleport, not a handoff. **Tower error, on record:** "instant" was
the Tower's own bounce-brief specification, not a choice made in
`hero-scroll.js` — corrected by Commander's ruling (Option A, The
Dissolve) rather than re-litigated.

**Architecture 3 — the Dissolve, through white. Commander-ruled,
certified.** A scroll-driven, two-phase opacity fade replaced the
toggle: `.kh__film` fades to nothing first while `.kh__stage`'s own
opaque ivory background holds — a pure white veil, no frame ever
shows statue-over-video — then the veil itself fades to reveal the
section beneath. `fadeT` is a pure function of signed scroll distance
from the release point (`pxFromRelease`, derived from `rect.top`),
never of the clamped `progress` value and never of time, so reversing
the scroll re-traces the identical curve with no pop either direction
— proven by matching state at identical scrollY regardless of
approach, not merely asserted. First cut placed the fade window
*after* release and drew Commander's C1: the reveal read as late, the
incoming section's top already scrolled above the viewport by the
time the fade finished. Moved the window to *before* release instead,
timed so the fade completes with the section's top no higher than
Commander's comfort ruling — mid-viewport.

**Tower error #2, caught by measurement before implementation —
same shelf as the reduced-motion premise error in entry #31.** The
exit-extension ignition key ordered "`TOTAL_VH` 428→478, additive" in
the same breath as "every per-stop scroll distance byte-identical" —
mathematically contradictory as written under the existing
architecture: `total` (real scroll px) is `(TOTAL_VH-100)/100*vh`, so
naively growing the shared `TOTAL_VH` denominator grows the real
length of *every* segment measured against it, not only the exit's.
The Hands measured this before writing a line of the fix (a +3.19%
universal drift, confirmed by computing both formulas side by side)
rather than implementing the letter of the key and finding out on
Commander's walk. The corrected mechanism: every existing fraction
keeps dividing by the historical `TOTAL_VH_BASE` (428, formulas
untouched), uniformly rescaled by `R_BASE/R_NEW` (328/378 — old real
scroll range over new) to exactly cancel that drift, with the exit
bonus added on top of the rescaled exit fraction alone. Proven exact
algebraically (the full set sums to 1 by construction) and empirically
— a live scroll-distance table at 1440×900 showing all 14 non-exit
segments (hold, six transitions, six dwells) at `diff = 0` to the
pixel, the exit alone growing by exactly 450px (50vh at that
viewport). With that runway, Commander's uncompressed 50vh/25vh
window fit the ~77.6vh exit segment with margin, and the section top
lands within a hair of exact mid-viewport (49.5–50.1% measured across
both viewports) at full reveal.

**Latent bugs found and fixed en route, none of them guessed at —
each one measured via `elementsFromPoint`/`elementFromPoint` before
being called a bug.** The `.video` carousel's own `position:relative`
internals out-stacked the sticky pin mid-scrub (confirmed exactly at
the Cicatrices dwell) despite `.kh` itself being positioned one level
up — fixed with an explicit `z-index` on `.kh__pin` rather than
relying on ancestor promotion, which doesn't reach across sibling
subtrees. `.kh`/`.kh__scrub`/`.kh__scrubwrap`, still hit-testable even
where nothing paints once the pin dissolves, silently swallowed
clicks meant for the section now occupying that reclaimed space —
cut off with `pointer-events:none` at `.kh`, the common ancestor,
restored on `.kh__pin` alone. `ACTIVE_PAD`'s hysteresis (LAW, R-2 tune
pass finding 3, never touched) keeps a just-left stop's caption
`opacity:1`/`pointer-events:auto` alive for several vh past its
literal dwell end — which the compressed fade window's first draft
opened into for roughly two-thirds of its own length, leaving
Aréole's pill visibly clickable through most of the dissolve. Fixed
without touching `ACTIVE_PAD` or the dwell system it belongs to: the
stops wrapper fades in the same breath as the statue, and a
higher-specificity CSS rule backstops pointer-events specifically,
since opacity alone never disables a click.

**Carried findings, deliberately NOT fixed this lap — one variable
stays one variable.** F3: mobile establish trailing white below the
scroll hint, measured (not estimated) at ~164px/19.4% of viewport at
390×844, growing to ~213px/23.0% at 390×926 (chrome-collapsed
approximation) — `containScale` is width-bound at this aspect ratio,
so the establish image doesn't grow with a taller viewport, only the
trailing gap does. Reported in-lap, held for its own key. The
Alopécie stop-skip: no per-gesture clamp exists today on how far a
single flick can advance through the dwell sequence, diagnosed but
explicitly out of scope here — its own key, R-2d « LE CRAN », already
written and Commander-ratified, waiting in the queue.

**Verification, both certified walks.** Commander: mid-viewport
reveal honored, dissolve-through-white honored (no crossfade frame at
any sampled point), reversible both directions, feel regression
clean against R-2/R-2b's certified cadence and ease. Tower diff-cert,
fourth pass: `TOTAL_VH_BASE=428` preserved as the universal divisor
for every pre-existing fraction, `EXIT_BONUS_VH=50` purely additive,
the rescale proven byte-identical on all 14 non-exit segments via a
live table (diff=0 to the pixel), CSS runway (478vh/378vh) consistent
with the JS constants it must match, every other preserved LAW
constant (`ADVANCE_BIAS_FRAC`, `SETTLE_DEBOUNCE_MS`, `SETTLE_TARGETS`
construction, the R-2b owned-ease machinery) byte-identical, stop
markup/anchors/labels/links untouched, zero `preventDefault`
anywhere.

**Cache-bust.** `hero-scroll.js` v10→v14 across the four passes this
lap took; `main.css` v24→v32; `index.html`/`servicii/areola.html`/
`servicii/in-curand.html` bumped to match at every pass.

**Gate.** Commander's eye: PASS. Tower diff-cert: PASS, fourth pass,
detailed above.

PR #22 merged into `main` via a merge commit
(`92011688e2b568b61b33d57996a0c42be5e8ff9b`, two parents — not
squashed, not rebased): all three architectures' full history — the
bounced margin-pull, the bounced instant toggle, the certified
Dissolve, and the exit extension that gave it room — is part of the
record and now lives in `main` alongside this LEDGER entry.

**No open debts on the variable this lap owned.** Two carried
findings are named above, each with its own future key rather than
folded in here. The measure-before-obeying discipline that caught
both Tower errors this lap — the reduced-motion premise in entry #31,
the byte-identical/additive contradiction here — is noted in the
record as a pattern, not a one-off: the Hands check the brief's own
arithmetic against the actual architecture before implementing it,
every time, and say so when the two disagree.

**LA SORTIE IS CLOSED.** The hero's exit now reads as a single
continuous gesture — statue, white, video — with no dead scroll, no
teleport, and no crossfade anywhere in it.

Session retires at this boundary.

## Entry #36 — 2026-08-08 — LAP R-2d: LE CRAN — MERGE & CLOSE

**The lap's one variable:** settle target selection gains a clamp.
Commander law, ruled on device evidence — Alopécie skipped outright
by one vigorous flick, Tower frame-forensics on record — a single
gesture may advance AT MOST ONE stop from the stop where it began.

**Mechanism — three lines, no new state.** `biasedSettleTarget()`'s
existing bracket search picks `lo`/`hi` from the MOMENTARY scroll
progress; on a hard flick that progress can already sit two or three
`SETTLE_TARGETS` past where the gesture started, so the old bias
check was choosing between two candidates neither adjacent to the
origin — the search itself was never wrong, only unclamped. Fix: find
both the origin's and the biased pick's index in `SETTLE_TARGETS`,
clamp the pick's index to `[originIdx-1, originIdx+1]`, return that.
Origin is `lastRestProgress` — no new tracking variable was needed,
because R-2's own machinery already freezes that value for a
gesture's entire duration (it updates only at rest-confirmed or at an
ease's completion) and R-2b's `ref` parameter already threaded it
into this exact function. The clamp leans on architecture already
built to do something adjacent; it does not duplicate it.

**Gesture boundary — defined and reported, per the key's own ask:
settle completion or rest confirmed.** Those are the two, and only
two, places `lastRestProgress` is written. Consequence worth stating
plainly: this is why a desktop wheel burst-chain still walks multiple
stops — each discrete burst's own settle/ease completion re-arms the
origin before the next burst is read, so a chain of separate bursts
correctly advances one stop at a time across several settles, while a
single unbroken gesture is capped at exactly one. Establish (0) and
release (1) are ordinary `SETTLE_TARGETS` entries and clamp like any
other stop, per instruction — no special-casing needed since they
were already members of the same array.

**Proof — 5 scenarios, verbatim-copied logic against the real
`SETTLE_TARGETS`** (computed from the file's own timeline constants,
not approximated): a flick landing 3 targets past origin clamps to
origin+1 exactly; the same reversed clamps to origin-1 exactly; a
flick past release stays inside array bounds at the last valid index;
a two-burst wheel chain walks index 1→2→3, one stop per settle. All
five PASS.

**The honest gap, carried rather than hidden.** This session's
browser sandbox could not dispatch real `scroll` events — neither a
programmatic `scrollTo` nor the tooling's synthetic wheel input
reached the page's own scroll listener (0 events observed after
either). The DOM-trace proof above is real code, run against the
file's real constants, but it is not a live gesture. Commander's
device walk was therefore the FIRST live gesture this code ever
received — not a re-confirmation of a prior device pass. It passed:
violent flicks land exactly origin+1 in both directions, Alopécie is
unskippable, gentle walking is uncaged, wheel burst-chains still walk
stop-by-stop. Recorded so a future session doesn't mistake sandbox
math for device proof.

**A slip caught before it mattered.** The Hands began the first edit
of this lap on `main` — against the constitution's own first standing
law, never build on main — noticed it before any commit existed, and
moved the (still-uncommitted) change to `lap/r2d-cran` before writing
history. Nothing landed on `main` out of turn; noted here as the same
measure-before-shipping discipline the ledger has recorded before
([[entry #31]]'s reduced-motion premise, [[entry #35]]'s two Tower
errors), not as a debt.

**Cache-bust.** `hero-scroll.js` v14→v15. No CSS/geometry touched —
`main.css` stays at v32.

**Gate.** Commander device walk: PASS, both directions, both flick
strengths, burst-chains intact. Tower diff-cert via codeload
tarballs: PASS — scope confirmed as two files, a three-line clamp in
`biasedSettleTarget` plus the version bust; every timeline/bias/fade
LAW constant (`TOTAL_VH_BASE`, `RESCALE`, `EXIT_BONUS_VH`,
`ADVANCE_BIAS_FRAC`, `SETTLE_EASE_MIN_MS`/`MAX_MS`, `SETTLE_TARGETS`
construction) byte-identical; stop markup/anchors/labels untouched;
zero `preventDefault` anywhere.

PR [#23](https://github.com/Ulgolan/hotico-proto/pull/23) merged into
`main` via a merge commit (`a9e4705`), two parents — not squashed,
not rebased.

**LE CRAN IS SET.** A gesture can no longer out-run its own dwell —
one flick, one stop, in either direction, no matter how hard it's
thrown.

Session retires at this boundary.

---

## Entry #37 — 2026-08-08 — LAP R-2e: LE VOILE — MERGE & CLOSE

**The lap's one variable:** the dissolve's TEMPO under speed.
Commander verdict from the device, post-R-2d-clamp: at violent-flick
speed the statue→white→video handoff read as a FLASHBANG. Diagnosis:
`fadeT` is (LAW, untouched) a pure function of scroll position — its
wall-clock speed equals gesture speed. Crawl speed was Commander-
blessed; a clamped violent flick still settles across the whole 75vh
fade window in one fast eased motion, compressing the white veil into
a flash. Target: the dissolve reads calm at ANY input speed.

**Mechanism chosen — (a) rendered-opacity smoothing, per the Tower's
lean.** `fadeT` (renamed `targetFadeT`, formula byte-identical) stays
the TARGET — scroll position is still the only source of truth, LAW
untouched. A new `renderedFadeT` is the PAINTED value: it chases the
target at a rate capped by `FADE_CHASE_MS` (520ms, the midpoint of
the key's own 450–600ms range for a full 0→1 sweep) instead of
jumping to it every frame. **(b) — stretching the settle ease's own
duration through the window — was rejected**: it can only slow
gestures `settle()` itself drives. A hard flick's own native momentum
fires a real `scroll` event every frame throughout its deceleration
and can carry raw scroll position across the entire fade window
*before* `settle()` ever engages — (b) has no hook into that motion
at all; only (a) can reach it, exactly the key's own diagnosis.

**Rate cap, not exponential decay.** An exponential chase
(`renderedFadeT += (target-renderedFadeT)*k`) never actually reaches
its target — the "eternal 0.98 opacity" the key explicitly warned
against. A capped rate-of-change (constant-speed chase, clamped to
the remaining distance each frame) reaches the target in FINITE time
and then stops exactly — no epsilon-fudging needed for convergence.

**The target/rendered split forced a class-keying decision, both
ways.** `is-fading` (pointer-events lockout, `main.css`'s
`.kh__pin.is-fading{pointer-events:none}`) stays keyed to
`targetFadeT`, per the key's own guardrail: a ghost is untouchable
from the first target-fade pixel even while the paint lags behind it.
`is-dissolved` (`visibility:hidden`, a paint-cost cut only) moves the
OTHER way, to `renderedFadeT` — pre-R-2e code keyed it to the same
`fadeT` because target and rendered were the same value; once they
split, keeping it on the target would cut a still-visibly-fading
frame to `visibility:hidden` mid-chase, a pop, the exact defect this
lap exists to remove. Reasoned deviation from the literal old
condition, not an oversight — recorded here since it's the one place
this lap's own two new variables disagree on which to key off.

**The chase self-continues on its own, reusing existing plumbing.**
A hard flick's momentum can go fully still (zero further `scroll`
events) before `FADE_CHASE_MS` has elapsed. Fix: at the bottom of
`update()`, `if (renderedFadeT !== targetFadeT) onTick();` — the same
`ticking`/`raf` machinery scroll events already drive, one extra
self-continuation call rather than a second parallel rAF loop.
Converges and stops scheduling itself the instant `renderedFadeT`
snaps to `targetFadeT` — no eternal idle frames once at rest.

**A bug the session's own verification trace caught before it
shipped.** First draft reset the chase's timing baseline
(`fadeChaseLastTime`) to `null` the instant `renderedFadeT` caught up
to `targetFadeT` — correct reasoning for a genuinely idle chase, wrong
for a *continuously moving* target: a slow scroll crawl re-diverges
almost every frame, and resetting on every one of those micro-
convergences forced `dt=0` on the very next frame each time, turning
smooth 1:1 tracking into a one-frame sawtooth stutter. Caught by
running the verbatim chase logic standalone against the file's own
constants (see PR) before any device time was spent on it — not
caught on the device, caught by the harness this session built for
itself. Fixed with gap-based staleness detection instead: the
previous `update()` call's timestamp is refreshed unconditionally on
every call, and only a gap larger than `FADE_CHASE_STALE_MS` (100ms —
bigger than any single real frame, smaller than any genuine idle gap)
makes `dt` read as 0. A standalone resume-from-idle trace (8s at
rest, then a fresh flick) confirmed the fix: the first frame of the
new chase does not snap.

**Proof — 4 scenarios, verbatim-copied chase logic against the file's
real `FADE_CHASE_MS`/`FADE_CHASE_STALE_MS`:** an instant jump across
the whole window still takes its full ~520ms minimum to converge;
a slow crawl tracks the target within one frame-step the entire time,
no drift; a mid-fade reversal keeps every frame-to-frame delta inside
the rate cap, symmetric, no pop at the reversal instant; a fresh
gesture after 8s idle starts its chase from zero rather than snapping.
Live in-browser trace (scroll jumped into the fade window, `film`/
`stage` inline opacity and `is-fading` sampled over real wall-clock
time) confirmed the wiring end-to-end — no console/server errors,
`is-fading` flips true immediately on divergence, opacity moves
gradually rather than snapping — but the sandbox tab reported
backgrounded (`document.hidden === true`), throttling
`requestAnimationFrame` too heavily to measure exact tempo there,
same category of limitation [[entry #36]] recorded for scroll events
in this environment. Commander's device walk was the first, and only,
place the actual tempo was ever certified.

**Cache-bust.** `hero-scroll.js` v15→v16. `main.css` untouched (no
geometry/CSS touched this lap) — stays at v32.

**Gate.** Commander device walk: PASS — violent flick reads as a
breath, crawl unchanged from the blessed version, mid-fade reversal
smooth. Tower diff-cert via codeload tarballs: PASS — scope confirmed
as two files (the chase machinery plus the version bust); every
timeline/bias/fade LAW constant (`fadeT` formula, window anchors,
two-phase-through-white choreography, mid-viewport reveal, R-2d's
one-stop clamp, cadence, dwells, settle targets) byte-identical; stop
markup/anchors/labels untouched; zero `preventDefault` anywhere;
static tier untouched.

PR [#24](https://github.com/Ulgolan/hotico-proto/pull/24) merged into
`main` via a merge commit (`3300c0b`), two parents — not squashed,
not rebased.

**LE VOILE LIFTS SLOWLY NOW.** The dissolve's speed is no longer the
gesture's speed — a violent flick and a slow crawl both spend the
same ~half-second lifting the veil, only the SCROLL itself still
answers to the hand that threw it.

Session retires at this boundary.

---

## Entry #38 — 2026-08-08 — LAP F3: LE BLANC FINAL — MERGE & CLOSE

**The lap's one variable:** the trailing white below the "DÉFILER
VERS LE BAS" hint on the MOBILE establishing frame. Known and
measured since R-2c (carried finding F3, PR #22 record): ~163.6px at
390×844 (19.4%), growing to ~212.8px at 390×926-equivalent
(chrome-collapsed, 23.0%). By this session's own re-measurement,
post-R-3b, the numbers had grown further — R-3b's flush-under-header
lift shifted MORE of the slack downward, not less: 255.4px (30.3%) at
390×844, 304.6px (32.9%) at 390×926-equivalent, the actual worst case
this lap closed against.

**Two compounding root causes, not one — diagnosis went past the
key's own framing.** (1) `establishScale` (`ESTABLISH_K *
containScale`) is WIDTH-bound on every phone aspect tested —
`containScale = min(vw/IMG_W, vh/IMG_H)` pins to width whenever the
phone is taller/narrower than the image itself, true across the
entire mobile range. The statue's rendered height is then a function
of `vw` ALONE — `vh` never enters it — so every extra pixel of
viewport height became blank `.kh__stage` ivory below the statue.
(2) Independently, the copy block's (H1/intro/socials/hint)
`padding-top` was a flat `vh*0.40` fraction, decoupled from the
copy's own roughly-fixed, content-driven height. As `vh` grew, the
gap between `padding-top + content` and the pin's bottom edge grew
with it, unbounded. Root cause (2) alone accounts for the literal
"trailing white below the hint" metric — establishScale never enters
that formula at all — but leaving (1) unfixed meant a bigger,
closer-cropped statue was still the compositional target ("fills the
phone" per the key), not just a text-positioning patch. Combination
(c), per the key's own menu.

**Mechanism — (a) height-aware establish scale.** `establishScale`'s
basis now blends 40% of the way from `containScale` toward
`coverScale` (height-bound: `vh/IMG_H` on these aspects), tapered by
the existing `establishMobileT()` — the same mobile-width gate
R-3b's lift already used. Not blended to 1 (full height-bound): that
crops ~29% off each side of the statue at the tightest tested aspect
(390×926) — a "large, fully-present" full-body establishing shot
doesn't tolerate that. 0.4 grows the statue meaningfully (538px→634px
tall at 390×844) while keeping the crop under 12%/side at the same
tightest aspect (390×926 was worst; 375×667 stayed at 0% crop).
**Explicitly a VIEW crop, not an asset crop** — the film layer's own
`transform:scale()`/`translate3d()` is what changes; `IMG_W`/`IMG_H`
and the image asset itself are untouched, so the Never-Crop Frame Law
(protects the asset's own coordinate system) does not apply here and
was not at risk.

**Mechanism — (b) content-relative padding-top.** Replaced the flat
`vh*0.40` with a target: padding-top now sizes so the copy's OWN
measured height (`establishCopy.offsetHeight` — self-adjusting, no
hardcoded content-height constant) lands its bottom edge a fixed
~20px above the pin's bottom, before the shared `lift` (R-3b, LAW,
untouched) pulls the whole ensemble up further on top of that. Lerp'd
against the original `vh*0.40` base by the same `establishMobileT()`
so the inline override still resolves to exactly `main.css`'s
`40vh`/`40dvh` at the 768px boundary — continuous, no snap, and
`mt=0` collapses BOTH new formulas to their exact pre-lap values,
proving desktop untouched by construction rather than by promise.

**Numbers — trailing white, before → after, all four gated
viewports:** 390×844: 255.4px (30.3%) → 75.0px (8.9%). 390×926-equiv
(chrome collapsed, worst case): 304.6px (32.9%) → 75.0px (8.1%).
390×764: 207.4px (27.2%) → 75.0px (9.8%). 375×667: 149.2px (22.4%) →
75.0px (11.2%). The after-column's near-constant ~75px is not a
coincidence — the target formula solves directly for a fixed pixel
margin (`M + lift`, `M=20`), independent of `vh` by construction,
which is why it lands inside such a tight band across four very
different viewport heights.

**Establish→Sourcils transition — feel-relevant numbers, flagged per
the key's own CAUTION, not silently absorbed.** A bigger, closer
establishing frame means a gentler zoom-in punch into the first stop:
zoom ratio 2.54x→2.16x at 390×844, 2.79x→2.26x at 390×926 (~15-20%
smaller across the board). The segment's own runway/timing
(`FIRST_TRANS_BONUS_VH`, `TRANS_VH`, smootherstep easing) is
completely untouched — only the STARTING scale differs. Whether the
transition still "gathers correctly" from the new scale was a feel
call for the device, not a number this session could certify alone —
Commander's device walk confirmed it: PASS, gentler punch accepted.

**Static tier — checked, found structurally immune, no fix applied.**
`.kh__static-img{width:100%;height:auto}` sizes the frame from the
image's own aspect ratio (no vh-bound box exists there at all), and
`.kh__static-copy{position:absolute;bottom:0}` pins directly to the
image's own bottom edge. The disease this key targets — slack
opening between a vh-sized frame and content that doesn't grow with
it — cannot occur in a layout with no vh-sized frame in the first
place. Verified, not assumed, before reporting it closed.

**Verification note — a limitation this session's own testing
surfaced, not just repeated from precedent.** The preview sandbox's
tab reports `document.hidden === true`, the same condition
[[entry #37]] recorded for `requestAnimationFrame` tempo measurement.
This session confirmed the limitation runs deeper than rAF alone: it
blocks COMPOSITING too — a live DOM/style mutation (verified correct
via `getBoundingClientRect`, which forces synchronous layout and is
NOT rAF-gated) failed to reach even an unmissable debug `outline`
applied directly to the film element in a screenshot taken moments
later. Screenshots in this environment cannot be trusted for verifying
any post-load paint change; only computed geometry can. The
establishScale/crop/zoom-ratio numbers above were verified by
`getBoundingClientRect` against the file's own live formulas, not by
screenshot. Commander's device walk remains the only place the actual
visual composition has ever been certified, same precedent as
[[entry #37]]'s tempo.

**Cache-bust.** `hero-scroll.js` v16→v17. `main.css` untouched (no
CSS touched this lap) — stays at v32.

**Gate.** Commander device walk: PASS — trailing white closed to
~75px breathing room across all four gated viewports, establishing
composition approved, gentler establish→Sourcils punch accepted,
desktop unaffected. Tower diff-cert via codeload tarballs: PASS —
scope confirmed as two files (the height-blend + content-relative
padding retarget, both riding the R-3b `mt` taper to zero at 768px by
construction, plus the version bust); every LAW constant across every
prior polish lap (timeline, fade, R-3b's own lift formula, cadence,
dwells, settle targets) byte-identical; stop markup/anchors/labels
untouched; zero `preventDefault` anywhere; static tier proven
structurally immune rather than left unchecked.

PR [#25](https://github.com/Ulgolan/hotico-proto/pull/25) merged into
`main` via a merge commit (`2163dfc`), two parents — not squashed,
not rebased.

**LE BLANC FINAL IS BREATHING ROOM NOW, NOT ABSENCE.** The
establishing frame's own composition — statue, headline, socials,
hint — now reads as a single deliberate ensemble filling the phone,
with a small constant margin at the foot instead of a void that grew
with every extra pixel of screen. F3, open since the R-2c session,
closes here.

Session retires at this boundary.

---

## Entry #39 — 2026-08-09 — LAP R-2f: LE COULOIR — MERGE & CLOSE

**Merge SHA `a4a275f04cbf2cac30c8fcb2334990ffedd639a7`** — PR
[#26](https://github.com/Ulgolan/hotico-proto/pull/26) merged into `main`
via a merge commit, two parents (`9c25e49` + `9e4edf4`), not squashed, not
rebased. `js/hero-scroll.js` v17 → **v24**; `css/main.css` untouched
throughout at v32. Two files, start to finish.

The longest lap of the campaign: one original object, three bounces, three
addenda, one external audit and one Tribunal. The record in order.

### The original object — the white room

**The veil is a corridor, never a room.** Commander evidence: reverse entry
from the site parked a fully-white viewport at rest for ~0.5–1s.

The Tower's lean — mechanism (a), "window exclusion in settle" — was proven
**DEAD CODE by executor measurement before implementation**. No
`SETTLE_TARGET` lies inside the fade window (window ≈ progress 0.802–0.868;
Aréole's midpoint 0.770, release 1.0), and `biasedSettleTarget()` only ever
returns a `SETTLE_TARGETS` entry, so the settle's *landing* was never in the
window in either direction. Traced: (a) and (b) each left the in-window
frozen interval at **167ms, unchanged**, every direction, speed and viewport.

Root cause was not *where* the settle lands but *when* it starts: rest
detection costs `SETTLE_DEBOUNCE_MS`, and for those 140ms the raw scroll sits
motionless at a `targetFadeT` strictly between 0 and 1 — at ~0.5 a pure ivory
frame with nothing in it. Shipped: **corridor pre-emption** (inside the
window one motionless frame declares rest, because there is no stop in there
to commit to) plus **`FADE_CHASE_DOWN_MS` 260** (the 520ms cap was tuned
against the dissolve only; re-materialisation had merely inherited it).
Measured 167ms → **33ms** in-window rest; paint tail 667 → 317ms.

### Bounce 1 — the mobile seizure

One-frame pre-emption is sound against a wheel and **unsound against touch
physiology**: a slow iOS drag is motion interleaved with genuinely motionless
frames at every micro-pause, so pre-emption declared rest under an active
touch and the ease fought the finger — fire, fight, cancel, fire.

The executor reproduced the Commander's recording signature exactly, and
identified **two** preconditions, the second of which explains why desktop
passed: the loop only sustains when the programmatic write and the finger's
own scroll are notified as **separate** scroll events; under one coalesced
event per frame `expectingSelfScroll` swallows the fight. Measured v18 under
separate notification: 10–18 pre-empts, all under finger, 9–17 cancels,
oscillation span 1017–6067ms, peak inter-frame **18.2px** against the Tower's
measured 17–20 on glass — arrived at independently.

Shipped: **touch gate** (passive `touchstart`/`touchend`/`touchcancel`,
resolved through `e.touches.length`, `touchcancel` registered because a
system-stolen touch fires no `touchend`). **The executor then caught a silent
regression in its own first fix**: gating the clause also stopped `update()`
self-continuing, and nothing restarted it on lift — traced as *zero
pre-empts, ever, on touch*, i.e. mobile quietly reverting to the 167ms white
room while the oscillation metric read clean. `onTouchUp` now kicks
`onTick()`; pre-emption fires at **+17ms** after lift.

### Bounce 2 — the Aréole jail

The corridor **straddled the 30% bias line** of the R-2c-extended gap. The
Aréole→release gap carries `EXIT_BONUS_VH` (+50vh), so `ADVANCE_BIAS_FRAC`'s
advance line lands at coverage 30% = progress ~0.839, inside a window
spanning coverage 13.9–42.6%. A gentle gesture off Aréole died at 14–29%
coverage and was marched back; escape required airborne momentum.

Shipped: **the Door Rule** — inside the window the target is chosen by
*direction*, not coverage, from net scroll displacement since the gesture's
origin. Measured: 14/18/20/25/29% coverage all **jailed** on v19, all
**through** on v20, both geometries. Clamp/door deadlock disproven
exhaustively (16 origin × direction combinations, every clamped target
outside the window — a consequence of no `SETTLE_TARGETS` entry lying inside
it). `DOOR_EPS_VH` was implemented as specified and **reported dormant**:
smallest reachable net was 102px against a 17px epsilon.

### Bounce 3 — the abduction

**The standing bias law outliving its jurisdiction** over the R-2c reveal
band. The reverse 70% line falls at progress 0.9309 — **26.1vh above
release** — cutting the 50vh reveal zone in two. Above it, a reader resting
to read the section title was marched back to Aréole, *backwards through the
veil already passed*. Below it, the mirror: a rest snapped forward to
release. **The mirror defect was found and fixed unasked.**

Shipped: **the Southern Border** — the film's settle jurisdiction ends at the
fade window's completion edge; past it `fadeT` is exactly 1 and there is no
statue and no fade left to park in, so `settle()` captures nothing. Measured
v20 → v21: 168.8px / 253.2px / 379.8px of abduction → **0px, untouched**;
the site-side upward peek's −397.5px to Aréole → **0px**. Zero `scrollTo`
calls at seven positions across the band, both geometries, touch and wheel.

### Addendum 1 — the stale anchor

**R-2d implementation divergence from the Commander's ruling**, latent on
`main` since that lap merged. The ruling said "one stop from where the
GESTURE began"; the implementation read `lastRestProgress`, "from the last
CONFIRMED REST". Identical only while every gesture is allowed to finish;
they diverge the instant gestures chain, because a cancelled ease
deliberately does not confirm rest.

Convicted by discriminator (S1 vs S2), post-Tribunal. The v17 trace:

```
settle p= 0.4028 ref= 0.3182 target= 0.4310 action= advance
settle p= 0.4979 ref= 0.3182 target= 0.4310 action= back
settle p= 0.5677 ref= 0.3182 target= 0.4310 action= back
```

`ref` frozen, `p` marching away, target pinned at origin+1; hauls of
181/406/869/934px. The control isolates it: at ≥500ms gaps every ease
completes, refs advance, and there is **no yank at all**. A first draft of the
discriminator used 100%-coverage links, which land exactly on a stop, trip
`SETTLE_EPS` and refresh the anchor — a false all-clear with zero settles
fired; 75% coverage is what exposes it.

Shipped: **gesture-start anchoring** (`touchstart`, or the first `wheel`
after `SETTLE_DEBOUNCE_MS` of wheel silence — the wheel-silence boundary),
with **straggler immunity by construction**: momentum raises `scroll` events
but never `wheel` or `touchstart`, so stragglers cannot reach `beginGesture`
at all. 64 straggler cases land exactly origin±1.

### Addendum 2 — La Porte Entière

Two crimes, one root: intent billed from a **snapped** anchor instead of the
true start. Dead taps — a bias-ruled no-man's strip between Aréole's dwell
end (+9.5vh) and the old door (+12.1vh), where "30%" of an 87.1vh gap means
26.1vh of travel. And free-zone capture — the anchor snapping to whichever
stop is nearer, with the midpoint at release−43.5vh, so a 10–15vh up-peek
billed as ~50vh. **The mirror face was found by the harness**: on the far
side of that midpoint the anchor snapped to Aréole, an up-peek billed
net-DOWN, and the reader was pushed to release, opposite their own thumb.

Shipped: **true-start billing** (two snapshots — snapped for the clamp, raw
for the door) and **one door over the whole exit segment**, with
**`DOOR_COMMIT_VH = 7.5` as the single knob**, derived as the midpoint of the
measured separation band (drifts <5vh, failing flicks 10–20vh). The 30/70
bias retired from that segment only; its value untouched. Billing error from
true start: **0.0vh in every case measured**.

The **240-cell GESTURE MATRIX** was authored here and **becomes the certified
choreography spec**, ledgered with this entry.

### Addendum 3 — Le Sens Unique

**The symmetric clamp convicted by autopsy.** A violent go-home up-flick
reached the page top and the machine then descended 3–5 stops on its own. The
log convicts in two lines:

```
gesture start, source= touchstart  anchor= 0.6567  startP= 0.6567
settle p= 0.0000  ref= 0.6567  target= 0.5439  action= advance
```

**Anchor correct** (touchstart, the deep stop). **Bounce irrelevant** —
identical with and without an iOS rubber-band model. The clamp took a landing
at establish and hauled it to origin−1, logging it as `action= advance` while
the user was going home. **The LAW was the defect, not the plumbing.**

**INVARIANT I2 AMENDED — one semantic stop per gesture IN THE STORY
DIRECTION.** Downward LE CRAN byte-identical, Alopécie unskippable, the whole
downward suite passing with zero downward failures. Upward is navigation and
lands nearest, unclamped: going home is a destination, not a page of the
story.

External audit contributions, all three verified before being acted on:
§30 **rail clamp defect confirmed-then-fixed** (measured on v23: rail
establish → Aréole landed **Sourcils**, clamped to origin+1; the rail now
seeds its anchor at the destination); §31 **keyboard/scrollbar gesture
visibility** via a foreign-scroll hook gated on a `restConfirmed` latch
(PageDown ×3 now walks idx1→2→3→4); §29 **the launch door on raw px** —
the proxy bug being that `currentProgress()` pins to 0 across the header
offset, so a 15vh flick at the page top registered as *zero net* and the
launch could not see it. Launch now fires at 8vh, drifts ≤7vh settle home,
identical on both viewports, **no new constant**.

### TOWER ERRORS, ledgered

1. **The dead-code lean.** Mechanism (a) was the Tower's root-fix
   recommendation and was already true by construction; implementing it would
   have shipped provably dead code. Caught by executor measurement before any
   line was written.
2. **The "instant"** — begat none of this lap, cross-referenced here for the
   record.
3. **The `[5,10]` / clause (d) knob contradiction** in the Porte brief: (b)
   put `DOOR_COMMIT_VH` in [5,10] while (d) required a 10vh peek to read as
   accidental. Not both satisfiable with one direction-agnostic knob. Resolved
   by the executor per the Commander's standing ruling that one deliberate
   flick relaunches the machine, flagged in the PR with a thumb-tuning table
   rather than papered over.
4. **The false binary and the unproven reconstruction**, caught by Tribunal
   before firing.

### EXECUTOR TOOLING DEFECTS, self-caught and ledgered

Recorded because the doctrine now expects them found: the harness fired
`wheel` *after* the frame's motion when a real event fires before it (shifting
the anchor a whole stop and making a legal origin−1 landing read as a clamp
violation); a khlog line containing the exact substring `settle, source=`
double-counted as a second settle; a test loop re-evaluating its bound as the
drag consumed it, halving every link's travel below the 30% line; a matrix
gesture set that omitted the Commander's own 10vh flick and so passed on the
build it was meant to indict; a block replacement that deleted
`scrollTotalPx`/`fadeTAtProgress` along with the old door; and
`WHEEL_GESTURE_GAP_MS` caching a `var` declared 750 lines later — hoisted,
undefined, every comparison false, which would have shipped the wheel path
still broken.

### TUNING NOTES — knobs, not bounces

- **`DOOR_COMMIT_VH` 7.5** — launch eagerness and exit commitment, one number
  for both. The launch is deliberately eager at 8vh.
- **`FADE_CHASE_MS` 520 / `FADE_CHASE_DOWN_MS` 260** — dissolve deliberate,
  recovery twice as eager.
- **`SETTLE_DEBOUNCE_MS` 140** — rest detection, and the wheel-gesture
  boundary that reuses it.

### CARRIED — open, post-freeze

- **Comment archaeology pass**: stale `lastRestProgress` narratives across the
  file. This lap corrected only the two adjacent to touched code, per rider.
- **CSS/JS constant-sync debt.**
- **External audit filed as reference.**
- **Clamp-vs-border collision** (a flick violent enough to overshoot past the
  Southern Border is not captured at all; the border currently wins) — flagged
  twice, still unruled.
- **Establish→Sourcils gap** carries `FIRST_TRANS_BONUS` at 77.6vh; the launch
  door now covers it, but the gap's own length remains a tuning question.

### THE ENGINE'S CONSTITUTION

Recorded alongside the matrix. **I1** drift immunity — a gesture ≤
`DOOR_COMMIT_VH` never changes which stop you are on. **I2 (amended)** one
semantic stop per gesture in the story direction; upward lands nearest.
**I3** door obedience — a committed gesture ending inside a door segment
resolves the way you travelled, never against your own thumb. **I4** border
supremacy — a gesture ending at or past the Southern Border is never captured.
**I5** agreement — mobile and desktop resolve identically.

The remaining three are the external audit's own formulation (§38),
Tower-transcribed verbatim:

**I6** — Reduced motion gets real content, not broken animation. The static
experience remains complete.

**I7** — Native scroll remains the physical source of truth. The hero augments
scrolling rather than replacing browser scrolling.

**I8** — Paint may lag scroll, semantic interaction must not. Pointer/focus
state follows target visibility and jurisdiction rather than waiting for the
visual opacity chase.

I6–I8 appended by Tower reconciliation, 2026-08-09, from the filed external
audit.

### Certification

Commander's armistice walk: **PASS, both devices** — go-home free, launch
eager, reading sovereign, relaunch true, keyboard and rail citizens. Tower
diff-cert at v24: **PASS** — direction-aware clamp, door on the raw-px ruler,
`LAUNCH_END_P`, foreign-scroll hook, rail anchor seeding; LAW battery
byte-identical to `main`; stop markup/anchors identical; zero
`preventDefault`, all ten listeners passive; matrix **210/210** under amended
intentions plus four new families green (go-home 12, launch 14, keyboard 8,
rail 32).

**Standing verification limitation, unchanged and restated:** the preview
sandbox reports `document.hidden === true`, which kills `requestAnimationFrame`
*and* throttles timers, so no time-domain code can be traced in-browser. Every
number in this lap comes from the real shipped file executed under a Node DOM
shim with a synthetic 60fps frame clock — real constants, real closures, real
`.style` writes — progressively taught touch state, finger-down pauses, lift,
momentum, both scroll-notification regimes, iOS rubber-band, native
smooth-scroll and foreign-scroll input. It is the real code. It is not a
device. **Feel was certified only on the Commander's glass**, every time.

**THE VEIL IS A CORRIDOR. THE DOOR IS WHOLE. THE CRAN POINTS ONE WAY.**
R-2f closes, and with it the scroll-feel campaign.

Session retires at this boundary.

---

## Entry #40 — 2026-08-09 — PHASE C: HERO CHAPTER CLOSE (findings, AAR, integrity, baton)

**Read-only lap. ZERO FIXES.** No code, CSS, HTML or asset was changed. The
only write in this lap is this entry. Every item below is a finding routed to
backlog, never to a patch — including the ones that were tempting.

Boundary declared by the Commander: the HERO CHAPTER — R-0 → R-2f plus F3,
LEDGER entries **#29–#39** — is complete. Phase C runs per PROJECT-GENESIS §3.

Scope of the sweep: `index.html` hero region, `js/hero-scroll.js` (1493 lines,
v24), `css/main.css` hero blocks, and the `servicii/` hero-adjacent surface.
Precondition verified before starting: `main` at `98b4a9f`, LEDGER #39 +
reconciliation present, `hero-scroll.js?v=24` at `index.html:1021`.

---

### 1. FINDINGS — quality review, read-only

#### CRITICAL

**C1 — TWO COMPASSES, AND THE STALE ONE SITS WHERE THE LAW POINTS.**
`docs/POLARIS.md` is the **superseded 2026-08-01** brief. The live compass is
root `POLARIS.md`, sealed 2026-08-04, whose own first line reads "Supersedes
2026-08-01 brief". `docs/POLARIS.md` last moved at `9a92de9` (2026-08-02) and
has never been retired. CLAUDE.md names `docs/` as law; a reader obeying the
constitution literally lands on the wrong brief. Two files, one name, one of
them wrong, and the wrong one is the one the constitution points at.
*Remedy is a Tower/Commander act (Trash, never delete) — not this session's.*

**C2 — THE INTERACTION SPEC IS TWO ERAS BEHIND THE ARTIFACT.**
`docs/STATE-MAP.md` — "the interaction spec", law — last moved at the same
`9a92de9` (2026-08-02), which **predates the entire kintsugi hero** (K-1 landed
at `e0ec3d1`). Its `## HOMEPAGE` item 2 still specifies *"marble kintsugi
torso, tagline «Pielea: singurul tău veșmânt.»"* — the D-2 split hero, in
Romanian. What ships is a 478vh scroll film with the French tagline *«La peau :
ton seul vêtement.»* Eleven laps of certified behaviour — the settle, the
clamp, the door, the border, the corridor — exist in **no spec document at
all**. CLAUDE.md is explicit that this session does not author STATE-MAP.
Reported, not touched.

**C3 — THE CERTIFIED CHOREOGRAPHY SPEC HAS NO ARTIFACT.**
Entry #39 declares: *"The 240-cell GESTURE MATRIX was authored here and becomes
the certified choreography spec."* It is not in `docs/`. It is not in `docs/qa/`.
It exists as **one sentence of LEDGER prose** plus a pass count (210/210 + four
new families: go-home 12, launch 14, keyboard 8, rail 32). Nothing can be
re-run. No future change can be diffed against it. The campaign's single most
valuable verification asset — the thing that convicted the stale anchor, the
Aréole jail, the abduction and the symmetric clamp — is unrecoverable outside
the executor session that built it. Measured against POLARIS success criterion
3 ("spec-grade… a future Hands builds without inventing a design decision"),
this is the largest hole the chapter leaves. **Highest-value backlog item.**

**C4 — THE SCRUB TIER HAS NO FAILURE MODE.**
The `<head>` gate (`index.html:10`) sets `html.js-kh` on **any** browser not
asking for reduced motion. That single class hides `.kh__static` and shows
`.kh__scrub` (`main.css:180-182`). `hero-scroll.js` is the only thing that ever
writes a transform to `.kh__film`; CSS gives that element no resting transform
at all — `position:absolute;top:0;left:0;width:1365px;height:2048px`
(`main.css:332-343`). So if that one file 404s, is blocked, or throws before
its first `raf(update)`, the page renders a raw 1365×2048 statue pinned
top-left inside a 378vh empty section, with the perfectly good static tier
hidden. **The IIFE's own guards make this worse, not better**: `if (!scrub)
return;` (`:15`) exits silently into exactly that state, and `:23`/`:25-26`
dereference `establish`/`rail` with no guard at all. no-JS is protected.
reduced-motion is protected. **Script-failure is not.** Latent — never observed
— but the outcome is total and there is no fallback.

**C5 — COLOUR LAW BREACHED IN THE HERO BLOCKS.**
CLAUDE.md: *"`css/tokens.css` is the **only** source of colour… No hex value…
is written anywhere else."* Four hero rules hardcode colours that already exist
as tokens:
- `main.css:194` `.kh__h1` text-shadow — `rgba(245,245,245,.85)` ×2 = `--ivory`
- `main.css:237` `.kh__static-veil` — `rgba(245,245,245,.9/,0)` = `--ivory`
- `main.css:371` `.kh__veil` — `rgba(245,245,245,.94/,0)` = `--ivory`
- `main.css:214` `.kh__caption-dot` — `rgba(201,168,106,.25)` = `--gold`

Outside the hero, `:911` does the same for `--hotico-pink` and admits it in its
own comment. The `#000` mask stops (`:341-342`, `:648-649`) are **not** a breach
— `:647` correctly rules them alpha, not colour — and `:1101-1103` is the
Romanian flag, i.e. content. **Cosmetically invisible; constitutionally a
breach.** The cause is structural, not sloppy: `rgba()` needs channel triplets
and tokens are whole colours, so obeying the law requires *adding* to
`tokens.css` (e.g. `--ivory-rgb`, `--gold-rgb`) — which is a Tower act. Filed,
not fixed.

#### MINOR

**M1 — I6 (reduced-motion tier): structurally sound, evidentially stale.**
Carried from the key, now measured. The only artifact on record is
`docs/qa/r2-scroll-feel/reduced-motion_static-tier.png`, added at `94ea7cf`
(R-2). Since that shot, `js/hero-scroll.js` has changed in **20 commits** and
`main.css`'s `.kh` blocks in several. Structural review says the tier is intact
**by construction** — every rule R-2c/R-2f could have leaked through it is
gated behind `html.js-kh` (`main.css:159` height, `:178` pointer-events,
`:180-182` display), and the JS never runs at all. But *by construction* is an
argument, not a device pass. **Needs matrix cells + one device pass.**

**M2 — I8 (pointer-keying): the touch gate is keyed to touch only.**
Carried, and confirmed exact. Corridor pre-emption is gated on `touchActive`
(`:888`), fed solely by `touchstart`/`touchend`/`touchcancel` (`:505-507`). A
pen/stylus on a hybrid device raises pointer events without necessarily raising
touch events — the gate then reads "no finger down" mid-gesture and the
one-motionless-frame trigger can fire under an active stylus drag. That is
**structurally Bounce 1's mobile seizure**, on an input class the campaign never
exercised. Untested, no device on hand, no evidence of it in the wild.
**Needs matrix cells + one device pass.**

**M3 — Comment archaeology, sharpened: `lastRestProgress` is dead state.**
The carried item said "stale `lastRestProgress` narratives". All twelve
occurrences were read; every narrative is post-addendum **accurate**. The real
finding is underneath them: the variable has **one declaration (`:989`), four
writes (`:1279`, `:1353`, `:1370`, `:1480`) and ZERO READS.** Every consumer
migrated to `gestureAnchor`/`gestureStartP` in the R-2f addendum. It is
write-only residue, and `:983-988` still dignifies it with a paragraph
explaining that it "keeps only its literal meaning" — a meaning nothing
consults. Harmless at runtime. Post-freeze.

**M4 — CSS/JS constant-sync debt.** `TOTAL_VH` = 478 is *derived* at
`hero-scroll.js:95` and *restated by hand* as `478vh` at `main.css:286`;
`TOTAL_VH - 100` = 378 is restated again at `main.css:159`. Three numbers, two
files, no shared source. Both files carry comments instructing the reader to
keep them in sync manually (`hero-scroll.js:45`, `main.css:122-129`). Production
debt, exactly as carried.

**M5 — The rail leaves 77.6vh early.** `rail.is-visible` is keyed to
`seg.type !== 'exit'` (`:820`), set at K-1 (`0785fc9`) when the exit segment was
~27.6vh. R-2c's `EXIT_BONUS_VH` grew it to **~77.6vh**. The behaviour was never
re-examined against its own grown segment: the rail now vanishes at Aréole's
dwell end and stays gone for the whole long final approach, while the statue is
still fully solid and the reader may still want to go back. Unchanged code,
changed meaning. **Observation for the Commander's eye, not a defect ruling.**

**M6 — `doorPick`'s unnamed sub-case.** `:1134-1137` — "started inside the
segment itself", reachable only after a cancelled ease leaves a gesture
mid-segment. Falls back to nearest end. **Self-flagged in the code by its own
author**, no ruling ever issued. Carried forward.

**M7 — Orphan assets: 29 unreferenced files under `assets/`.** Full sweep
(every file cross-referenced against all HTML/CSS/JS):
`img/hero-torso.png` (the carried tidy-lap item); the three superseded statues
`statue-kintsugi.png`, `statue-kintsugi.webp`, `statue-kintsugi-v2.webp`; all
six `img/pill-*.webp` (superseded by `img/services/strip-0*.png`); three
`img/etapes-*.webp` + their three `src/etapes-*.png` sources; ten
`brand/icons/icon-*.png`; four `brand/pattern/pattern-*.png`; both
`brand/logo-lockup-alt-*.png`; `img/temp-1x/lips-before-after-composite.png`;
`img/services/strip-small.png`. **`temp-1x` itself is NOT orphaned** — its
`lips-before/after.png` are live behind 15 references in `index.html`, and its
README correctly marks the whole directory as placeholder-grade pending 2x
Figma exports. **Removals go to Trash, never hard-delete** (standing law).

**M8 — `pill-levres` soft framing.** Carried. Judge dressed in R-5. Untouched
here, and `pill-levres.webp` is among M7's orphans — the two items should be
reconciled together, not separately.

**M9 — `tel:` country code, +40 vs +41.** `tel:+40723344555` (Romanian prefix)
sits against `wa.me/41796472106` (Swiss) on all three pages —
`index.html:984`, `servicii/areola.html:645`, `servicii/in-curand.html:28`.
Verified **consistent across the whole site**, so this is a single content
decision, not drift. **CLIENT QUESTION. NEVER EDIT UNILATERALLY.**

**M10 — Finding B: the desktop staccato ruling.** PENDING Commander. No
deadline. Carried unchanged.

**M11 — Clamp-vs-border collision.** A flick violent enough to overshoot past
the Southern Border is not captured at all; the border currently wins. Flagged
twice in #39, **still unruled**. Carried.

**M12 — Establish→Sourcils gap length.** Carries `FIRST_TRANS_BONUS` at 77.6vh.
The launch door now covers it, but the gap's own length remains an open tuning
question. Carried.

#### TUNING KNOBS ON RECORD (not findings — the dial positions, for the record)

| Knob | Value | Governs |
|---|---|---|
| `DOOR_COMMIT_VH` | **7.5** | launch eagerness AND exit commitment — one number for both |
| `FADE_CHASE_MS` | **520** | the dissolve, deliberate |
| `FADE_CHASE_DOWN_MS` | **260** | re-materialisation, twice as eager |
| `SETTLE_DEBOUNCE_MS` | **140** | rest detection, and the wheel-gesture boundary reusing it |
| `ADVANCE_BIAS_FRAC` | **0.20** | 30/70 coverage bias, retired from launch+exit segments only |
| `ACTIVE_PAD` | **DWELL × 0.35** | pill hysteresis |

#### PASS

- **Standing law — robots.** `<meta name="robots" content="noindex,nofollow">`
  present at line 6 of all three pages. **PASS.**
- **Standing law — desktop grace floor.** `body{max-width:480px}` at
  `tokens.css:46`, single declaration, unopposed. **PASS.**
- **Passivity law.** Ten `window` listeners, every one `{passive:true}`; zero
  `preventDefault` in the file. Re-counted at v24. **PASS.**
- **I8, the fade path.** `is-fading` (pointer-events kill) keys to
  **`targetFadeT`** — semantic, immediate. `is-dissolved` (`visibility:hidden`)
  keys to **`renderedFadeT`** — paint. Stop `.is-active` / `tabindex` /
  `aria-hidden` and the establish links' `tabindex` key to **`progress`**.
  Paint lags; semantics do not. Exactly I8. **PASS.**
- **Blast radius.** Neither `servicii/areola.html` nor `servicii/in-curand.html`
  loads `hero-scroll.js` or carries any `.kh__*` markup. Eleven laps of hero
  work never reached the servicii surface. **PASS.**
- **Type/shadow law.** Zero `font-family` and zero `box-shadow` declarations
  outside `var(--font-*)` / `var(--shadow-*)` tokens. **PASS.** (Colour alone
  breaks — see C5.)

---

### 2. AAR — HERO CHAPTER, entries #29–#39

#### STRATEGY — what we set out to do

Replace the D-2 split hero with a single scroll-driven film: one statue, six
locked keyframes, native scroll as the only motive force, and a handoff that
reads as white lifting off content rather than a crossfade. The front door had
to carry the whole vision in one gesture, on a phone, without ever taking the
scroll away from the reader.

#### ACHIEVED — by the numbers

- **11 laps**, **11 LEDGER entries** (#29–#39), **11 PRs** (#16–#26).
- **45 commits** on `main` since the R-0 merge; **20** of them to
  `js/hero-scroll.js`, carrying it **v1 → v24**. `css/main.css` sat at **v32,
  untouched**, through the entire R-2f lap — two files, start to finish.
- **240-cell gesture matrix** authored; **210/210** green under amended
  intentions, plus four new families (go-home 12, launch 14, keyboard 8,
  rail 32).
- **8 invariants** constituted — I1–I5 from the engine, I6–I8 transcribed
  verbatim from the external audit and appended by Tower reconciliation.
- **Two architectures bounced on the Commander's eye** (R-2c: margin-pull +
  opaque band; the instant visibility toggle). **Three in-lap bounces and three
  addenda** in R-2f alone.
- Measured wins on record: in-window frozen rest **167ms → 33ms**; paint tail
  **667 → 317ms**; abduction **379.8px → 0px**; billing error from true start
  **0.0vh**; launch threshold **35vh → 8vh**.
- Commander's armistice walk: **PASS, both devices.** Tower diff-cert at v24:
  **PASS.**

#### SUSTAIN — what the doctrine should keep doing

1. **MEASURE BEFORE IMPLEMENTING — including the Tower's own lean.** The single
   most valuable act of the chapter was the executor proving mechanism (a) was
   **dead code by construction** before writing a line of it. The doctrine's
   habit of demanding a trace instead of an argument paid for itself.
2. **THE EXECUTOR AUDITS ITS OWN FIX.** R-2f's touch gate shipped a silent
   regression (`update()` stopped self-continuing; zero pre-empts, ever, on
   touch) and the executor **caught it itself**, from its own trace, while the
   headline metric read clean. That is the behaviour that makes single-executor
   laps safe.
3. **LEDGER THE TOOLING DEFECTS, NOT JUST THE CODE DEFECTS.** Six harness bugs
   were recorded in #39 — the false-passing matrix set, the hoisted
   `WHEEL_GESTURE_GAP_MS`, the substring double-count. A harness that can pass
   a build it was written to indict is the most dangerous object in the room,
   and this doctrine now names them out loud.
4. **ADDITIVE RUNWAY, NEVER CARVED.** `FIRST_TRANS_BONUS_VH`, then
   `EXIT_BONUS_VH` with its `RESCALE` cancellation — every extension paid for
   with new distance and proved byte-identical on every untouched segment. The
   precedent held three times.
5. **NO SESSION CERTIFIES ITS OWN WORK.** Feel was certified on the Commander's
   glass, every single time, and the entries say so plainly rather than
   implying device coverage the harness never had.
6. **VERIFY EXTERNAL AUDIT CLAIMS BEFORE ACTING.** All three §29/§30/§31 items
   were reproduced first. §30's rail clamp defect was **confirmed, then fixed** —
   in that order.

#### IMPROVE — what it should do differently

1. **THE TOWER LEANED ON UNMEASURED MECHANISM, REPEATEDLY.** Mechanism (a) was
   the Tower's root-fix recommendation and was **provably dead code**. The
   `[5,10]`-vs-clause-(d) knob contradiction shipped in a brief that could not
   be satisfied by one direction-agnostic constant. The false binary and the
   unproven reconstruction were caught only by Tribunal. Four Tower errors in
   one lap. **A brief that names a mechanism must name the measurement that
   would falsify it, in the same brief.**
2. **THE LAW OUTLIVED ITS JURISDICTION THREE SEPARATE TIMES.** The 30/70 bias
   ruling the R-2c reveal band (the abduction). The bias ruling the 87vh exit
   strip (dead taps). The symmetric clamp ruling an upward go-home flick (Le
   Sens Unique). Same disease, three convictions, each found only by the
   Commander's thumb. **When a lap changes a SEGMENT'S GEOMETRY, the standing
   laws governing that segment must be re-audited in the same lap** — geometry
   changes are jurisdiction changes.
3. **THE SPEC WAS NEVER WRITTEN DOWN.** C1, C2 and C3 are one failure with
   three faces: a superseded compass left in the law directory, an interaction
   spec eleven laps stale, and the certified matrix living in prose. The
   doctrine ledgered *narrative* superbly and produced *artifacts* not at all.
   **A lap that certifies behaviour must emit the certification as a file.**
4. **THE INVARIANTS ARRIVED LAST, AND FROM OUTSIDE.** I1–I5 were written at
   the chapter's *close*, and I6–I8 came from an **external audit**, not from
   the eleven laps that built the thing. The engine ran for ten laps without a
   written constitution to test against — which is precisely why the same
   jurisdiction bug could be committed three times.
5. **VERIFICATION NEVER REACHED A REAL DEVICE.** The standing limitation is
   restated honestly in every entry — `document.hidden === true` in the sandbox
   kills rAF, so every number came from a Node DOM shim. That shim is the real
   file with real closures, and it earned its keep. **It is still not glass.**
   I6 and I8 (M1, M2) are unexercised today for exactly this reason.
6. **RULE ZERO NEEDED TO EXIST.** That this close had to be declared
   explicitly ZERO FIXES is itself a finding: an eleven-lap chapter builds
   enough momentum that a review session's default is to patch. Phase C should
   be read-only **by doctrine**, not by per-key instruction.

---

### 3. INTEGRITY AUDIT — PASS 1

Three sources compared. **ALL THREE AGREE.**

| Source | Result |
|---|---|
| Local working tree | **CLEAN** — `git status --porcelain -uall` empty; zero modified, zero untracked, zero stashes |
| Local git log (`HEAD`) | `98b4a9f80e66912ad7fac9ebfad7b1b398bf9a5a` on branch `main` |
| Remote (`git ls-remote origin refs/heads/main`, live) | `98b4a9f80e66912ad7fac9ebfad7b1b398bf9a5a` |

`git rev-list --left-right --count origin/main...HEAD` → **`0  0`** (zero
ahead, zero behind). Upstream correctly tracked as `origin/main`.
`git diff --stat HEAD` against `js/hero-scroll.js`, `index.html`, `css/main.css`
→ **empty**: the files reviewed above are byte-identical to the certified
commit. `index.html:1021` carries `hero-scroll.js?v=24`, matching #39's
certification.

**INTEGRITY: PASS.** No divergence of any kind between tree, log and origin.

---

### 4. CERTIFICATION

This session certifies nothing. Read-only lap; findings are findings until the
Commander's eye rules on them. The Tower certifies this entry post-hoc via raw
pull.

**THE HERO CHAPTER CLOSES. THE FILM IS CERTIFIED; THE SPEC IS NOT WRITTEN.**

---

## >> BATON — HANDOFF FROM PHASE C

**STATE**
- Repo `Ulgolan/hotico-proto`, branch `main` at **`98b4a9f`**, clean, in sync
  with `origin/main`. No open branches, no stashes, no PR in flight.
- Live hero: `js/hero-scroll.js` **v24** (1493 lines), `css/main.css` **v32**,
  `css/tokens.css` **v8**, referenced from `index.html`.
- The hero is a 478vh scroll film — `TOTAL_VH` 478 in JS, `.kh__scrubwrap`
  478vh and `html.js-kh .kh` 378vh in CSS. Six stops (Sourcils, Eyeliner,
  Alopécie, Lèvres, Cicatrices, Aréole), one statue
  (`assets/img/statue-kintsugi-v3.webp`), native scroll only, zero
  `preventDefault`, ten passive listeners.
- Two tiers coexist in the DOM: `.kh__static` (no-JS / reduced-motion) and
  `.kh__scrub`, switched by `html.js-kh` set pre-paint by the gate at
  `index.html:10`.

**CERTIFIED**
- Commander's armistice walk, **both devices, PASS** (#39).
- Tower diff-cert at v24, **PASS** (#39).
- Gesture matrix **210/210** + four new families (go-home 12, launch 14,
  keyboard 8, rail 32) — **result certified, artifact missing (see OPEN C3)**.
- Invariants **I1–I8** constituted (#39 + reconciliation `98b4a9f`).
  I1 drift immunity · I2 (amended) one semantic stop per gesture in the story
  direction, upward free · I3 door obedience · I4 border supremacy ·
  I5 mobile/desktop agreement · I6 reduced motion gets real content ·
  I7 native scroll is the source of truth · I8 paint may lag, semantics may not.
- **I6 and I8 are constituted but UNEXERCISED** — no device pass, no matrix
  cells. See OPEN M1/M2.

**OPEN** *(all findings-only; nothing below has been fixed)*
- **C1** `docs/POLARIS.md` is the superseded 2026-08-01 brief; live compass is
  root `POLARIS.md` (2026-08-04). Retire to Trash — Tower act.
- **C2** `docs/STATE-MAP.md` two eras stale (specs the D-2 torso hero). Tower
  authors it; this session may not.
- **C3** 240-cell gesture matrix has **no artifact** — prose only. Highest-value
  backlog item.
- **C4** `.kh__scrub` has no script-failure fallback; silent guards at
  `hero-scroll.js:15/23/25-26` exit into the broken state.
- **C5** Colour law breached: `--ivory`/`--gold` hardcoded as `rgba()` at
  `main.css:194/214/237/371`. Fix requires new `*-rgb` tokens — Tower act.
- **M1** I6 device pass + matrix cells. Evidence 20 hero-scroll commits stale.
- **M2** I8 pointer-keying: touch gate blind to pen/stylus. Matrix cells + device.
- **M3** `lastRestProgress` is write-only dead state (4 writes, 0 reads).
  Post-freeze.
- **M4** CSS/JS constant-sync debt (478/378 hand-restated across two files).
- **M5** Rail leaves 77.6vh before release — unchanged code, changed meaning.
- **M6** `doorPick` unnamed sub-case (`:1134-1137`), self-flagged, unruled.
- **M7** 29 orphan assets under `assets/` — **Trash, never delete**.
- **M8** `pill-levres` soft framing — judge dressed in R-5; reconcile with M7.
- **M9** `tel:+40` vs `wa.me/41` — **CLIENT QUESTION, never edit unilaterally**.
- **M10** Finding B, desktop staccato — **PENDING COMMANDER**, no deadline.
- **M11** Clamp-vs-border collision — flagged twice, **still unruled**.
- **M12** Establish→Sourcils 77.6vh gap length — open tuning question.

**NEXT**
- Nothing is scheduled. The hero chapter is closed by Commander declaration and
  the scroll-feel campaign closed with R-2f.
- **R-2g «LA CONSTITUTION»** is the named next hero lap if called: I6 + I8
  matrix cells and one device pass. It is the only OPEN item that can close an
  invariant.
- The three documentation criticals (C1/C2/C3) are **Tower work, not executor
  work** — `docs/` is law and this tier does not author it.
- POLARIS (root, 2026-08-04) still points at the **desktop campaign**: both
  pages composed at reference widths, milestone mobile walk, house furnished
  spec-grade. The hero chapter served criterion 1; **criterion 3 is where C3
  bites**.

**TRAPS** *(read before touching anything in the hero)*
1. **NEVER re-tune a segment without re-auditing the laws over it.** Three
   separate convictions this chapter came from a standing law outliving its
   jurisdiction after a geometry change.
2. **`TOTAL_VH_BASE` (428) is the LAW denominator; `TOTAL_VH` (478) is NOT.**
   Every existing fraction divides by 428 and is then uniformly rescaled by
   `R_BASE/R_NEW`. Bumping the shared denominator instead drifts **every**
   non-exit segment (+3.19% measured). See `hero-scroll.js:66-96`.
3. **`SETTLE_DEBOUNCE_MS` is read at event time, never cached.** Its `var` is
   declared ~800 lines below the wheel listener that reads it; caching it makes
   every comparison `> undefined` and silently restores the stale-anchor bug.
4. **The corridor's one-frame trigger MUST stay gated on `!touchActive`,** and
   `onTouchUp` **must** kick `onTick()`. Removing either is silent: the first
   machine-guns the finger, the second kills pre-emption on touch entirely
   while every metric still reads clean.
5. **`is-fading` keys to `targetFadeT`; `is-dissolved` keys to `renderedFadeT`.**
   Swapping either breaks I8 in one direction and pops the paint in the other.
6. **Editing `.kh` CSS heights without editing `hero-scroll.js` (or vice versa)
   desynchronises the film from its own scroll range.** No shared source
   exists — see OPEN M4.
7. **The preview sandbox reports `document.hidden === true`**, killing rAF and
   throttling timers. **No time-domain hero code can be traced in-browser
   here.** Every number in this chapter came from a Node DOM shim running the
   real file. **Feel is certified on the Commander's glass, only.**
8. **File removals go to Trash, never hard-delete** — assets, docs, code alike.
   Applies to every OPEN item above that proposes a removal.

Session retires here.

## Entry #41 — 2026-08-09 — LAP C4: LE FILET — MERGE & CLOSE

**Merge SHA `af9d7fbd0dd3c67330abe969c7ee34f2a9d7c1a9`** — PR
[#27](https://github.com/Ulgolan/hotico-proto/pull/27) merged into
`main` via a merge commit, per repo convention. `js/hero-scroll.js`
v24 → **v25**; `css/main.css` untouched at v32. Two files, +9/−2,
one lap, zero bounces. Branch `c4-fallback` preserved on remote
(`c72205f`) and local.

### The object — boot failure demotes to the static tier

The head gate stamps `js-kh` before paint and nothing verified the
promise was kept. Three boot-death modes left a blank 378vh hero
with `pointer-events:none` over the whole door: script never loads
(no `onerror`), the scrub guard exits silently, an exception thrown
during synchronous init. Worst of the three, proven by the Hands'
controls against the un-netted engine: the guard exit dies with
**zero console signal**. Shipped: `khDemote()` — remove `js-kh`,
CSS falls to `.kh__static`, real statue, real stops, real scroll.
Coverage: inline `onerror` on the script tag (load death) ·
demoting guard (silent exit) · `try/catch` bracketing the
synchronous boot only, inserted without re-indenting the frozen
file. Runtime failure after successful boot is OUT OF SCOPE by
ruling — yanking the film mid-scroll would be worse than the
disease. **Invariant named: I6** (real content under degradation);
whether this mints as I9 proper is parked with the Commander.

### Certification

Tower diff-cert from codeload tarballs: footprint exactly the
intended edits, nothing else in the tree. Harness V1–V3 with
controls; V1 transform byte-identical to v24
(`translate3d(419.254px, 10.368px, 0) scale(0.323437)`). Commander
glass, both paths: happy path re-certified on charged device;
blocked-script path certified desktop DevTools — static tier
rendered, caption pills confirmed honest (inert labels, no fake
affordance).

### Branch point ruling

Key pinned main at `98b4a9f`; live main was `7525160`. Hands
measured the delta (LEDGER-only, entry #40), flagged, proceeded.
Tower independently verified and RATIFIED. Measure-before-obeying,
working as doctrine.

### Tower errors (own the record)

The key contradicted itself on `khDemote` placement (step 2 anchor
vs step 4 parenthetical). Hands tiebroke on the anchored
instruction — correct — behaviorally identical, no re-roll. Error
is the Tower's. Same session, error two: the Tower handed the
Commander a terminal task for this very entry — file work is the
Hands' seat, always.

### Same-evening rulings (Commander recording, Tower forensics)

- **Stutter convicted as environmental**: 7% battery / Low Power
  Mode throttled settle eases to ~6–8 rendered frames. Re-test on
  charged device restored certified feel. CLOSED, not an engine
  defect.
- **The 26–28s haul (rip down, ~48% giveback)**: machine-vs-thumb
  UNPROVEN — iOS recordings carry no touch overlay, and the border
  code reads current position at settle time, which should forbid
  it. On MONITOR-WATCH; standing trap: `?khdebug=1` + console
  capture on repro. Autopsy before law holds.
- **I2 under energetic use**: one-stop-per-gesture experienced as
  confiscation under hard flicks. This is the LAW as constituted,
  not a defect. Amendment options A (keep) / B (momentum tiers) /
  C (nearest-ahead free flight) / D (split desktop/touch
  jurisdiction — absorbs Finding B) are on the Commander's desk.
  No ruling yet.
- **M11 CLOSED**: free-zone-wins, as built — Commander ratified.

Next per Commander's ruled order: R-6 ÉTAPES, then R-4 vs R-5
ruling. C1/C2 documentation criticals remain Tower work, queued as
their own doc-only lap after R-6.

## Entry #42 — 2026-08-09 — LAP R-6: ÉTAPES — MERGE & CLOSE

**Merge SHA `909edf4ccbe5e4cfa3d80f85dd5a7bf797240edc`** — PR
[#28](https://github.com/Ulgolan/hotico-proto/pull/28) merged into
`main`. `css/main.css` v32 → **v33**; `js/hero-scroll.js` untouched
at v25. Two files, five surgical changes, one lap, zero bounces.
Branch `r6-etapes` preserved.

### The object — chrome debt paid

The three step cards trade `temp-1x/pasii-{cube,stone,sphere}.png`
(baked gold border/label in the pixels) for the real 2400²
`etapes-{conseil,procedure,entretien}.webp`. The obsolete
baked-chrome comment above `.steps-cards.is-focused .scard img`
retired; the crop rule beneath it ships byte-identical. `alt=""`
preserved (decorative; labels carried by `.scard__label`). The
line-1608 desktop media-query rule left untouched by correct scope
judgment — the key named one comment block and the Hands held the
line. Temp PNGs remain on disk for the queued tidy lap
(Trash-never-delete).

### Certification

Tower diff-cert from codeload tarballs: footprint exact. Hands V4
partial by honest flag: 900/1200/1440 band-walk verified via
computed-style + resource-load only — their harness fought the hero
pin (known limitation; behavior certifies on Commander glass).
Commander's eye closed the gap: mobile impeccable, closed cards
impeccable across bands, desktop banner strip PASS on function.

### Finding R-6-A → lap R-6c opened

Desktop 250px banner (central ~22% of the square) cuts the conseil
and procédure subjects: generated finals grew past the band the
spec drew (subject extents 29% and 41% of frame vs the ~20% the
band law allows; entretien sphere at ~20% fits — proof the spec
works). Ruled asset-vs-spec drift, NOT a code defect and NOT an
R-6 execution error. Commander ruled REGEN over CSS slice-tuning:
band-law assets are self-certifying; per-image object-position is
scar tissue. R-6c pipeline: Commander generates loose → Tower
measures (centroid/extent forensics) → Tower computes deterministic
recenter crop → Hands cut, resample to 2400², overwrite in place.
Conseil regen already measured GREEN on scale (7.5% height; 8%-low
offset correctable by computed crop, full-res file pending); stone
pending generation.

### Standing template change (Tower)

Every ignition key henceforth carries a PREVIEW: line with the
computed Vercel URL so the Hands print the Commander's tappable
link in their report.

Next: R-6c asset lap, then the R-4 vs R-5 ruling per Commander's
standing order. C1/C2 doc criticals remain queued Tower work.

## Entry #43 — 2026-08-10 — LAP R-6c: LE RECADRAGE — MERGE & CLOSE

**Merge SHA `2d4ca84ab7a3f4410a9a043b721f48bd486aeaa4`** — PR
[#29](https://github.com/Ulgolan/hotico-proto/pull/29) merged into
`main`. Three binary files only: the étapes webps replaced in
place, filenames law-stable, zero code touched.

### The object — the band law made flesh

The Commander regenerated the full triptych set (2508² exports,
same studio, same light — including a fresh entretien for family
unity). Tower forensics measured all three: subjects 13–15% of
frame, centers within 2–4 points of the cross — band-fitting
as-generated but with razor margins (0.1–0.4pt at the shadow
line), inside measurement noise. Ruling: deterministic recenter
crops (Tower-computed windows, ~92% of source side), resample to
2400², overwrite in place. Post-crop independent verification:
all subjects at (50±0.5, 50±0.2), 15–16% height, ~8pt clearance
every side. The desktop banner now frames whole subjects by law,
not luck. Pipeline ratified as standing practice for étapes
assets: generate loose → Tower measures → Tower computes crop →
Hands cut.

### Finding R-6c-A → lap R-6d opened

The band-lawful masters trade closed-card presence for open-state
correctness: the 1:1 closed crop now shows small subjects in vast
studio, and the Commander's eye mourned the old scale on scan.
Ruled: one file CAN serve both worlds via a centered CSS zoom on
the closed state (unlocked precisely by this lap's dead-centering)
— releasing to scale 1 on open. Lap R-6d « LA LOUPE » keyed,
Tribunal-amended (WebKit transform-clipping fix mandated; frozen-
engine guard; transition-vs-container-morph autopsy V0), fires
after this merge.

Next: R-6d, then the R-4 vs R-5 ruling per Commander's standing
order. C1/C2 doc criticals remain queued Tower work.

## Entry #44 — 2026-08-10 — LAP R-6d: LA LOUPE — MERGE & CLOSE

**Merge SHA `8869b56c66b0bae23fac7b9c57c3e0b33685c871`** — PR
[#30](https://github.com/Ulgolan/hotico-proto/pull/30) merged into
`main`. One bounce, one ratification. `css/main.css` → **v36**;
markup change: three `.scard__imgbox` wrappers.

### The object — one file, both worlds

The band-lawful masters (Entry #43) traded closed-card presence
for open-state correctness; this lap restores presence via a
centered CSS zoom clipped to a dedicated photo box. Certified
values, Commander's thumb: closed 3.0 mobile / 3.4 desktop;
mobile-open 2.6; desktop banner scale(1), pixel-untouched.
Instant apply/release ruled at V0 (an animated ease would fight
the accordion's instant aspect-flip). isolation:isolate shipped
on card and imgbox against the WebKit transform-clipping bleed;
corners certified on Commander iPhone glass. Sharpness at 3.4
certified on glass — no layout-zoom fallback needed.

### Bounce 1 — Tower error #3 (own the record)

The original key clipped the zoom against the whole card:
subjects rode high, labels drowned at ≥2.2. Tribunal (three
chairs) missed the clip-box geometry; the Commander's eye caught
it. Fix: .scard__imgbox owns overflow/isolation/top-radius; the
label row is structurally uncoverable at any magnification.
Tribunal DID pre-catch: the WebKit clipping fix, the frozen-
engine guard, the V0 transition autopsy, the zero-state control,
and the child-combinator pre-flight — four traps paid, one
missed. Also ledgered: the Hands isolated a session screenshot-
tool defect (fails to paint transformed children under
overflow:hidden clipping) with a proper overflow:visible control;
computed-style used as ground truth where it applied.

### Findings parked / opened

- **Horizon drift (parked):** Procédure's horizon sits a few
  points off its siblings — generation artifact, visible at high
  zoom, Commander aware, fix-on-itch (measured re-crop available).
- **R-6e « LA PILE » (opened):** mobile closed grid renders
  3-across; Commander ruled stacked single-column per standard
  practice. New lap; mobile closed zoom gets re-tasted there
  (full-width cards change the feel).

Next: R-6e, then the R-4 vs R-5 ruling per Commander's standing
order. C1/C2 doc criticals remain queued Tower work.

## Entry #45 — 2026-08-10 — LAP R-6e: LA PILE — MERGE & CLOSE

**Merge SHA `2387aeec92b3d9d2c7a864faddc9b88f022d96a3`** — PR
[#31](https://github.com/Ulgolan/hotico-proto/pull/31) merged into
`main`. Two bounces + one rider. `css/main.css` → **v38**;
`js/main.js` → **v5** (first walk-toggler touch of the arc;
hero-scroll.js byte-identical throughout, verified per bounce).

### The object — the stack, then the simplification

Mobile closed étapes cards stack single-column below the 768 gate
(Commander: standard practice, caught on first true stare at the
section). Bounce 1, Commander simplification ruling: below 768
the image has ONE state — the certified mobile-open geometry
(16/9, scale 2.6) whether open or closed; tapping the label
toggles only the text. The picture does not move. All zoom dials
retired; no live tunables remain (grep-verified; the
--etapes-zoom-open ghost was confirmed already retired at the
R-6d ratification). Redundant-but-load-bearing focused rules
kept with comments for the tidy lap — they still serve the
768–1023 fall-through zone.

### The V0 dividends (autopsy clause, twice)

(1) The key assumed the étapes desktop tuning gated at 768; the
autopsy found it gates at 1024, with a 768–1023 fall-through
zone the naive edit would have silently broken. Hands restored
the fall-through explicitly inside the 768 block — ≥768 verified
byte-equivalent. Ledgered as **Tower error #4** (unverified
breakpoint assumption baked into a key; the autopsy clause is
why it cost a paragraph, not a bounce). (2) Bounce 2's autopsy
located the close-snapback relic precisely: a hard-coded section
target in js/main.js's collapse handler, correct in the 3-across
era, wrong on the stack.

### Bounce 2 + rider — the viewport follows the card

Close-time scroll target: below 768 → the card that was open
(Conseil lands Conseil, Procédure lands Procédure); at ≥768 →
the original section target preserved (heading visible — the
Hands measured the 47px delta honestly and the Commander ruled
the width-split rather than silently accepting either). Evaluated
at close time via matchMedia, resize-safe. Focus law (siblings
hide on open) RATIFIED as standing étapes doctrine.

### Arc closure — R-6 → R-6c → R-6d → R-6e

The étapes section retires from the campaign board: baked-chrome
debt paid (#42), band-lawful centered masters (#43), the loupe
with photo-box clipping (#44), and the stack with one-state
images and card-anchored close (#45). Five Tower errors owned
across the arc; three Tribunals paid dividends; the Commander's
eye caught what every other layer missed, twice. The system
worked in all directions.

Next per Commander's standing order: the R-4 vs R-5 ruling.
Parked: Procédure horizon drift (fix-on-itch); I2 amendment
options A–D; Finding B; I9 minting; C1/C2 doc criticals (Tower,
queued); the tidy lap.

## Entry #46 — 2026-08-10 — LAP R-4: DÉCOUVREZ — MERGE & CLOSE

**Merge SHA `74d3077da82a3ec70abd5993bb9ff0a31465833a`** — PR
[#32](https://github.com/Ulgolan/hotico-proto/pull/32) merged into
`main`. Two commits: build + ratification, zero bounces. `css/main.css`
→ **v40**; `js/main.js` → **v7**; `index.html` markup rebuilt across
the section (`hero-scroll.js` byte-identical throughout, SHA-verified
per commit; `initCarousel` untouched, diff-proven per commit).

### The object — Alexandra's redesign, sealed

The Découvrez section as the client drew it, annotated on one document
(alexachanges 1–5), executed as one intent: desktop split flipped —
video LEFT, text RIGHT, 600px/46vw cap preserved on the video column;
the gold band retired and its title moved atop each slide's text
column as Commander-ruled canon **« Découvrez HOTICO »** — one line,
accent restored per the Tower's standing accent duty over the client's
row-9 label (real `<h2>` on slide 1, `aria-hidden` repeats 2–5,
pixel-identical); teaser italic, text untouched; long text truncated
behind **« Voir plus » / « Voir moins »** (French labels ruled law over
the mock's RO-site English) with expand-in-place through the page's
existing settle()/DUR engine — judged honestly by the Hands as the
right reuse when expand()/collapse()'s hidden-panel bookkeeping didn't
fit a truncated-but-visible clamp.

### Chain of custody — verbatim law, held mechanically

All five long texts restored from the client's French master (xlsx,
SHA-256 `21d20ae1…86641`, verified at session open, at key build, and
at certification). The copy payload never passed through human or
model retyping: the ignition key was generated programmatically from
the verified sheet and the shipped markup round-tripped byte-exact —
26 paragraphs, 10,491 rendered characters, five slides. All five
Vimeo IDs + privacy hashes verified against the master. Teasers left
byte-identical to prod, including slide 5's one-word divergence from
the master (le/la) — preserved, not reconciled: prod is correct
French, the master is the client's; the discrepancy travels on the
Commander's side-list to the client with the unclosed guillemet
(slide 1), the row-9 « Decouvrez » accent, and the tu/vous register
breaks (slides 4–5, ammunition for the queued vous-conversion lap).
Zero unilateral fixes.

### Ratification — dials tasted, defaults crowned

House taste-param ritual, four dials, Commander's thumb on the
preview: closed clamp **5 lines** (`?vp=`), slide alignment **start**
(`?valign=`), section gap **3.4rem** (`?vgap=`, byte-equivalent to the
retired band's spacing), dot rail **section-centred** (`?vdots=`). All
four picks matched the shipped defaults; ratification collapsed every
`var()` to its fallback and stripped the machinery — grep-proven zero
residue, computed-style-proven pixel-identical to the approved
preview.

### Traps paid before firing (two Tribunals on the Tower's own brief)

The pre-mortem converted depth into breadth: **(1)** the slide grid's
`align-items:center` would have re-centred the video down the page on
every expand — mandated to `start` in the key, ratified by thumb;
**(2)** « Voir plus » lands on the carousel's deliberate swipe surface
(the iframe swallows pointer events, so the text IS the surface) —
solved outside initCarousel via stopPropagation on the button's own
pointerdown/touchstart, adversarially verified with a dispatched
jittery-tap sequence; slide-change auto-collapse solved via a
MutationObserver on the dots' class attribute, zero hooks added to the
shared function. The Reviews carousel — same shared engine — verified
unaffected.

### Certification catch — Tower error #5 (own the record)

The build shipped `doClose()` pinning an inline pixel height it never
released: expand → collapse → rotate (or resize across the 1024 gate)
left the clamp at a stale height, landing mid-line. Both Hands
Tribunal chairs and the key's author missed it; the Tower caught it at
tarball certification — but the Tower also *wrote* the key that
specified height-over-max-height without specifying the release, so
the error is ledgered on the Tower's side of the board. Fixed at
ratification: inline height cleared in the settle callback, stylesheet
governs at rest, verified across resize.

### Ruling — the stranding rescue extends to the swipe path

Entry #45's law (the viewport follows the card) was scoped at build to
the reader's own « Voir moins » tap, with the Hands flagging the
judgment call honestly. Tower ruling: the swipe surface is the text
she is reading, so a swipe mid-read collapses ~1,500px beneath her —
that IS the stranding #45 outlawed. Extended at ratification: both
close paths rescue under one guard (only when scrolled above the
viewport), differing only in target — button-close homes the slide,
slide-change homes the section. The Hands improved the spec's shape
in flight (one rescueTarget parameter over a boolean branch) —
ledgered as the relay working upward. Verified in three scenarios:
deep-scroll swipe rescues to section top; in-view swipe moves zero
pixels; button path unchanged.

### Tooling finding — TRAP 5 gains a third head

Known screenshot defects (transformed-children blindness, blank
deep-scroll captures) joined by a new one: the headless browser does
not pump compositor frames during setTimeout-driven polling, so
computed-style reads of in-flight transitions return pre-transition
values indefinitely — chased as a phantom bug until a forced paint
(screenshot call) between steps resolved it. Standing note: any
future key verifying transition-dependent state mandates paint-forcing
steps. Glass certifies feel; harness certifies math; and the harness
must be made to blink.

### Board

The Découvrez front closes: annotated by the client, keyed from a
SHA-verified master, twice-Tribunaled before firing, built in one
pass, corrected at certification, sealed at ratification. Zero
bounces — the pre-mortem did the bouncing before the Hands ever fired.

Next per the vaulted 08-09 spec: **R-5 SERVICES** (in-curand FR copy,
pill order, honest-facade links; the +40/+41 tel question travels to
the client with the side-list). Parked: Procédure horizon drift
(fix-on-itch); I2 amendment options A–D; Finding B; I9 minting; C1/C2
doc criticals (Tower, queued); the tidy lap; R-2g.

## Entry #47 — 2026-08-10 — LAP R-5: SERVICES — MERGE & CLOSE

**Merge SHA `3d7956b42c58310534613fcea3106a7aa335b375`** — PR #33, branch r-5-services (alive per law).

THE LAP: before/after widget cut (DOM + JS dead); six panel shells +
abundance-mode block removed (Commander-ratified in session); pills
reordered to the hero journey (Sourcils→Eyeliner→Alopécie→Lèvres→
Cicatrices→Aréole); whole-pill single-tap links, arrows gone, five FR
params character-exact + soon.js whitelist RO→FR (URLSearchParams);
in-curand.html rewritten French, copy byte-certified against the vault
(od-level: apostrophe, U+2039, every accent); stale pointers cured.

ASSETS — PLAN A EXECUTED: Commander exported the six comp frames at
@12x (4548×1140 = exactly 12× the 379×95 window; deterministic-by-
construction, the anchor-derivation law's cleanest win). SHA-manifest
ingest, name-map overwrite of the six pill-*.webp (semantic filenames
killed all ambiguity), 742×186 WebP, 4–7KB each. Mask-rule amendment
RATIFIED: silhouette edges permitted when part of the certified
composition; any alpha flattened to white at ingest.

THE BOUNCE ARC (the entry's heart): the Commander's eye bounced the
lap's geometry on preview — art rendered 247px in pills stretching
380–672px (a pre-existing frame mismatch made visible by the tighter
art). Root diagnosis: build pill never matched the 379×95 comp frame.
Dial lap (a: comp-ratio full-bleed / b: comp-ratio capped 480px /
c: 95px conservative) walked on deployed preview at all six bands.
COMMANDER RULED B. Baked as the base geometry at all widths, dial
machinery stripped, sweep matched the certified table digit-for-digit
(390:342×85.7 · 768/900:480×120.3 centered · 1024:304×76.2 ·
1440/1920:362.7×90.9). Also inside the arc: the Commander bounced HIS
OWN first aréole export and re-composed it (feature at 43% width,
verified) — the taste gate held against its own gatekeeper. Ships as
pill-areole.webp?v=2.

TOWER ERRORS (the record; the pattern): #6 false "webps missing from
main" ruling — subfolder-filtered grep; the Commander's Finder
screenshot caught it. #7 R-5 v1 key ordered overwrite of unwired
webps and never ordered the strip→webp rewire — Tribunal caught it
pre-fire; live-source pull would have prevented it. #8 v2 micro-key
dropped the push/preview exit condition (work stranded local, walk
blocked) and its diff-scope contradicted the cache-bust law (forced a
Hands revert). #9 Tower-authored dial-B CSS (post-Tribunal, un-
reviewed) collapsed the pill to 103×26 at every band — Hands caught
it, refused to improvise, reported. Lesson unchanged: keys are
theories; every fired error traced to an unverified assumption, every
catch to a pull of ground truth.

HANDS CATCHES (with satisfaction): staged-aréole hash stop at gate
zero; self-caught scope violation (areola pointer) with flagged
revert; screenshot-harness death met with canvas pixel-sampling + WCAG
math, method disclosed per band; Vercel hook silence diagnosed and
cured by empty-commit trigger.

TRIBUNAL RECORD: three full runs this lap — two AMBER (killed defects
pre-fire), one GREEN on the bake key (first clean verdict of the
campaign; scrutiny found the verification already done).

STATE AFTER MERGE: main.css v42 · main.js v10 · soon.js v3 ·
tokens v8 · form.js v3 · hero-scroll v25 FROZEN (SHA verified
campaign-long). TIDY QUEUE grows: temp-1x/lips-*.png ·
services/strip-01..06.png (unwired) · dead selectors (.pill__arrow,
.pill.is-open*, .panel*, .ba-*) · areola.html form.js?v=2b stale
pointer. 495×124 crops died by overwrite as planned.

>> BATON
STATE: R-5 merged; Services redesigned end-to-end; geometry B is law.
CERTIFIED: Tower diff-cert at 4337e6e + 026e4b2 (tarball, byte-level).
OPEN: R-4 vs R-5 docs? no — C1/C2 doc rewrites queued (Tower work);
  Alexa side-list (5 items, draft on request); I2 A–D + Finding B;
  I9 minting; R-2g; vous-conversion lap; tidy lap (queue above).
NEXT: Commander's call — tidy lap is fat and cheap; C1/C2 rewrites
  are Tower-only; Alexa side-list needs his clipboard.
TRAPS: areola.html form pointer stale (queued, don't panic-fix);
  Vercel hook occasionally silent — empty-commit trigger is the cure;
  screenshot harness dies on tall-pinned pages ≥900px — canvas
  sampling is the proven fallback.

## Entry #48 — 2026-08-10 — PHASE C AUDIT — R-5 SESSION CLOSE

Findings-only review, read-only, ZERO fixes applied. CRITICAL: none.
MINOR (all → tidy-lap backlog): (1) pill webps render 1.55x density
at the 480px cap band — the 186px resize spec predates the B-geometry
ruling; re-encode ≥241px height from the Commander's 4548×1140
masters (re-staging required; masters never entered the repo, by law).
Corroborated independently: Hands observed visible softness in the
tablet-band screenshot during the bake sweep — 1.55x explains it.
(2) areola.html form.js?v=2b stale pointer. (3) dead selector
families: .pill__arrow, .pill.is-open*, .panel*, .ba-*. (4) orphans:
temp-1x/lips-*.png, services/strip-01..06.png. (5) record cure: in
R-5, Hands' "byte-identical" cert claim on guarded main.js regions
was code-exact but comment-loose (section relabels D→B, C→A) —
disclosed in-session, Tower-verified harmless, now in the book.
Integrity Pass 1: origin leg verified at content level (main ≡
certified bake ≡ merge 3d7956b; ledger c26169; branch preserved);
local leg per Hands' clean-tree attestation. Incident: not triggered.
AAR: deferred to campaign close. Audit closes the R-5 session.

## Entry #49 — 2026-08-12 — CAMPAIGN CLOSE: HOTICO PROTO v1

**Scope: the tidy queue, executed.** Branch `seal-v1`. This is the campaign's
final lap. The repo REMAINS OPEN for future chapters; v1 becomes the
certified reference, not a tombstone.

WHAT SHIPPED: (1) `docs/qa/gesture-matrix.md` + `docs/qa/harness/` committed
unmodified, recovered from the R-2f executor session — closes OPEN C3
(artifact missing). (2) `servicii/areola.html` cache-bust:
`form.js?v=2b` → `v=3`, stale pointer flagged since Entry #48 cured.
(3) `js/main.js:18` comment de-fanged: the dead `.panel` reference dropped,
`.walk` stands alone — code untouched. (4) `css/main.css`: the four retired
Services families — `.pill__arrow`, `.pill.is-open*`, `.panel*`, `.ba*` —
removed (111 lines), zero references anywhere in `*.html`/`css`/`js`
confirmed before the cut; `.panel-tab` (live areola tabs) and `.walk`
(live Découvrez) untouched. (5) prototype disclosure line landed in the
`index.html` success panel: "Prototype — aucune donnée n'est envoyée.",
muted via the existing `--placeholder` token, new `.success__note` rule
only — no new color, no new font. (6) `CLAUDE.md`'s desktop-grace-floor
law split at the 768px gate: `body{max-width:480px}` now scoped BELOW
768px only, superseded above it by the ratified desktop campaign
(root POLARIS, 2026-08-04; `main.css` `min-width:768` override).

ORPHAN REPORT — verification law applied, no list trusted, every candidate
grepped by filename across all `*.html`, `css/`, `js/` before the cut:

*Removed to Trash (31 files, zero references found):*
`assets/img/services/strip-01..06.png` + `strip-small.png` (7);
`assets/img/temp-1x/lips-before-after-composite.png` (1);
`assets/img/hero-torso.png` (1); `assets/img/statue-kintsugi.png`,
`.webp`, `-v2.webp` (3, superseded by the live `statue-kintsugi-v3.webp`);
`assets/src/etapes-conseil.png`, `-entretien.png`, `-procedure.png` (3,
raw source exports, not the live `.webp` derivatives); `assets/brand/
icons/icon-6..15.png` (10); `assets/brand/pattern/pattern-17..20.png`
(4); `assets/brand/logo-lockup-alt-black.png` + `-white.png` (2).

*Skipped — live, grep found references:* the six `img/pill-*.webp`
(trap b named in the brief — live in `index.html`'s pill gallery,
post-R-5; the M7 list at Entry #40 predates R-5 and is stale on them).
`img/temp-1x/lips-before.png` / `lips-after.png` (trap a — 15 live
references, only the composite was ever a candidate). **New finding,
same shape as trap b:** the three `img/etapes-*.webp` are ALSO live
(`index.html`'s Découvrez `scard__imgbox` images) despite M7 listing
them as orphaned alongside their `src/etapes-*.png` sources — M7 is
stale on these too. The grep, not either list, is what shipped.

PRODUCTION DEBT (recorded, not fixed — out of this lap's scope):
Découvrez's expand/collapse (`js/main.js:226` `closedPx`, consumed at
`:243`) caches the collapsed height ONCE at init via
`getBoundingClientRect()`. A prototype never resizes mid-session in any
graded gesture, so this has never fired wrong here. Production must
recompute the collapsed target from current geometry at collapse time,
not trust a value cached before any resize, orientation change, or
zoom the user performs between load and their first "Voir moins" tap.

RECORD CORRECTION: Entry #39 credited the four added gesture families as
*"go-home 12, launch 14, keyboard 8, rail 32"*. The rail figure was an
arithmetic error carried from the PR report into the ledger. The
recovered `docs/qa/gesture-matrix.md` (this lap, item 1 above) is
authoritative and self-corrects: 7 origin→destination pairs + 2
mid-flight interrupts × 2 viewports = **rail 18**, family total **52**,
not 66. Nothing was invented to close the gap — the artifact already
carried its own correction notice.

KNOWN INVARIANT DEBT, CARRIED: I6 and I8 (reduced-motion completeness;
paint-lag-but-not-interaction-lag) remain cell-less in the gesture
matrix — appended to the constitution by Tower reconciliation after the
R-2f lap closed, never exercised by the 240-cell matrix built before
they existed. I7 is structurally safe by standing guardrail (zero
`preventDefault`, verified every lap). I6's reduced-motion path is dead
code behind the `js-kh` gate, never exercised; I8's pointer/focus rule
was satisfied by reasoning recorded at the time (R-2e), not by a test.
Documented in full in `docs/qa/gesture-matrix.md`. Holding I6/I8 to the
I1–I5 standard requires cells that do not exist yet — carried, not
closed.

AAR: the full campaign-close audit — estate, findings, and Tower
reconciliation — lives at
`acp-doctrine/audits/2026-08-11-hotico-campaign-estate-audit.md`
(outside this repo, Tower's book).

>> BATON
STATE: tidy queue executed on `seal-v1`; disclosure line and the
  768px-gated grace-floor law land with it. Preview pending Commander's
  eye; merge and the `hotico-proto-v1` tag are the two steps left in
  this lap.
CERTIFIED: pending — this entry documents the build, not a cert. Tower
  certifies post-merge via raw pull at the `hotico-proto-v1` tag, per
  this lap's exit condition.
OPEN: everything already on record and untouched by this lap — R-2g;
  vous-conversion lap; I2 A–D + Finding B (M10); I9 minting; C1/C2 doc
  rewrites (Tower work); Alexa side-list (M9, client question, never
  edited unilaterally); the Découvrez `closedPx` production debt above;
  I6/I8 invariant debt above.
NEXT: push `seal-v1`, confirm the Vercel preview, hand the preview URL
  + HEAD SHA to the Commander. On his word: merge, then tag
  `hotico-proto-v1` at the merge commit on `main`. Repo stays open
  after — v1 is a certified reference, not a close-out.
TRAPS: pill-*.webp AND etapes-*.webp both read as orphaned on the stale
  M7 list — both are live; grep before touching any asset flagged only
  by a list. Vercel hook occasionally silent — empty-commit trigger is
  the cure. `.panel-tab` and `.walk` share name-shape with the retired
  `.panel`/`.pill` families but are unrelated and live — don't let a
  substring match pull them into a future cut.
COST (new standing law, first application — figures below are a
  one-time reconstruction, not a lap-by-lap log, since no prior entry
  carried this line): 49 ledger entries/laps recorded 2026-08-02 →
  2026-08-12 (~10 calendar days) across this campaign. Model mix mixed
  across sessions — at least one graded lap (R-2f) ran its executor
  session on Opus per `gesture-matrix.md`'s own header; this close
  ran on Sonnet 5; per-lap model was not logged historically, so no
  precise mix can be given. Hours were never tracked lap-by-lap before
  this entry — no honest figure exists to report here. Going forward,
  every lap's own BATON should carry its own COST line at close, so
  this stops being a retroactive estimate and starts being a real
  record.

---

## Entry #50 — 2026-08-19 — LAP F-1: WIZARD RESTRUCTURE

**Scope:** flip the Rendez-vous wizard's step order on both pages so the
flow becomes Rendez-vous (date + procédure) → Contact (ends in "Confirmer
le rendez-vous") → the existing success panel. Particularités médicales
leaves the wizard entirely. Branch `f1-wizard-restructure`, off `main` at
`4b5652f68924eeaa883983f9d9100997a25af718` — that SHA is the resurrection
pointer for the deleted medical block, recoverable from git history on
this branch or main's log at any time.

ENGINE TRUTH CONFIRMED: `js/form.js` builds its step list from DOM order
(`querySelectorAll('.step')`), not the `data-step` attribute value — the
attribute is decoration. Both wizard blocks were physically cut and
pasted (not retyped) to their new positions; attributes renumbered after
to keep the decoration honest.

WHAT SHIPPED, both `index.html` and `servicii/areola.html`: (1) the
Rendez-vous block (date + procédure) moved to first position,
`data-step="1"`; the Contact block (name/email/phone/checks) moved to
second, `data-step="2"`. (2) the existing `button.backbtn` node —
`data-back` + its svg — relocated wholesale from the Rendez-vous block's
`.stepnav` into the Contact block's `.stepnav`, left of the main button;
step 1 now opens with no back button, step 2 carries the only one on the
page. (3) Contact step's closing button is now
`<button class="btn-pink" type="button" data-confirm>Confirmer le
rendez-vous</button>`, replacing its old `data-next` Suivant. (4) the
entire Particularités médicales block (old step 3, all `data-reveal`
disclosure machinery) deleted. (5) stepper label initial text →
"1. Rendez-vous"; three stepper bars in the markup untouched (bar 3
stays the unlit promise of the confirmation step, not this lap's job).

INDEX-ONLY: the procédure question relabeled "Quelle procédure
souhaites-tu ?" (both the `q__label` span and the `ul`'s `aria-label`),
and a sixth option — Aréole — inserted second, directly after Alopécie,
identical dot markup to its siblings. The other five options are
byte-identical and in their original order. `servicii/areola.html`'s
question and its five options were not touched beyond the step-position
swap.

`js/form.js`: `NAMES` trimmed from three entries to two —
`'1. Contact'` fallback → `'1. Rendez-vous'`, `'2. Rendez-vous'` →
`'2. Contact'`, `'3. Particularités'` removed. The read-label-from-page
mechanic for index 0 is unchanged. The stale comment above `NAMES`
(referencing "Date contact" / "Date personale" titles that no longer
exist anywhere) rewritten to one honest line.

CACHE-BUST: `js/form.js` consumer pointer `v=3` → `v=4` in both
`index.html` and `servicii/areola.html`. `css/main.css` untouched, stays
`v=42`.

VERIFICATION — DO-4 grep counts, both pages, post-cut:
`<div class="step" data-step=` → 2; `data-reveal` → 0; `backbtn` → 1.
All six (two pages × three counts) held. `git diff main --stat` confirms
exactly `index.html`, `servicii/areola.html`, `js/form.js` touched
(LEDGER.md is this entry). `js/hero-scroll.js`, `css/main.css`,
`css/tokens.css`, the `.scard` elements, and `[data-success]` all
confirmed untouched by diff. Full click-through exercised via JS on a
local static-server preview on both pages: step 1 opens bar-1-active
with no back button; Suivant → step 2, bar 2 active, back button
present and returns to a clean step 1; Suivant → Confirmer le
rendez-vous → success panel (root + stepper hidden); `data-reset`
('‹ retour') returns to a clean step 1 with selections cleared. Zero
console errors on load or through the walk, either page.

>> BATON
STATE: `f1-wizard-restructure` built and locally verified against every
  EXIT CONDITION in the brief, on both pages. Not yet pushed — Vercel
  preview + Commander's eye are the two steps left before merge.
CERTIFIED: pending — Tower/Commander review per house law, no session
  certifies its own work.
OPEN: F-2 (confirmation screen — the success panel's current interim
  role and the third, still-unlit stepper bar are its variables to
  claim); F-3 (validation, wiring inputs, making the date field real —
  explicitly out of this lap).
NEXT: push branch, confirm Vercel preview triggers (empty commit is the
  proven cure if not), hand preview URL + HEAD SHA to the Commander.
TRAPS: `js/form.js`'s confirm/reset wiring uses `document.querySelector`
  (singular) on `[data-confirm]` and `[data-reset]` — this lap works
  only because deleting the medical step also deleted its own
  `data-confirm` button, leaving exactly one on the page. A future lap
  adding a second confirm-shaped button anywhere in the DOM will
  silently wire to the wrong one. `NAMES[index]` is positional against
  DOM order, not against the `data-step` attribute — the same trap the
  ENGINE TRUTH note above exists to prevent; keep renumbering attributes
  by hand whenever blocks move.
COST: single-session lap, Sonnet 5, one branch, no re-work.

## Entry #51 — 2026-08-19 — LAP F-2: CONFIRMATION SCREEN

**Scope:** replace the interim success panel on both pages with the
ratified confirmation screen — Alexandra's mock, ratified French copy,
house design system. One variable: the post-confirm surface. Branch
`f2-confirmation-screen`, off `main` at
`98f1a72bd332f98e7b0bc378e252624c47ab5c64`. `js/form.js` untouched —
its confirm/reset handler already produces the ruled behavior (stepper
+ wizard hidden on confirmation) and needed nothing new.

ANCHOR CHECK, on `main` before the cut: all four certified anchors
(`class="success" data-success`, `Demande bien reçue`,
`.success{text-align:center`, `--card:#E9E9E9;`) landed exactly once
per named file. No stop condition triggered.

WHAT SHIPPED, both `index.html` and `servicii/areola.html`: the old
`.success__check` / `__h` / `__copy` / `__urgent` / `__btns` markup
inside `[data-success]` replaced by a new `.conf` block — heading
"Merci.", subline, lead, four numbered blocks (plain cocoa numerals,
top-left, no decoration), gold two-digit sub-step numerals inside
block 1, a cream-ground testimonial block 2, the Instagram CTA
(`.btn-pink`, reused) in block 3, the WhatsApp inline link in block 4,
and the Alexandra Hotico signature block. The container div, its
`hidden` attribute, `success__note`, and the `data-reset` '‹ retour'
button (last element) are unmoved. Ratified copy shipped verbatim,
character for character, including the space before every `?` and the
straight-apostrophe / literal-`·` conventions already standing in the
codebase.

DEVIATION FLAGGED: `servicii/areola.html`'s `[data-success]` block had
no `success__note` on `main` — only `index.html` did. The brief's
instruction ("keep... the existing prototype note, unmoved") assumed
both pages carried it; areola.html didn't. Since the EXIT CONDITION
requires "Prototype note visible at the bottom of the screen" on both
pages, the note was added to areola.html verbatim from index.html's
copy rather than treated as "unmoved" (there was nothing to move). Not
one of the four certified anchors, so no stop — but flagged here for
the Tower's eye since it's copy that entered a file beyond what the
anchors certified.

CSS — `css/main.css`: retired `.success__check` (+ its svg),
`.success__h`, `.success__copy`, `.success__urgent`, `.success__btns`
(+ its `a`) from the D. confirmation block; kept `.success`,
`.success[hidden]`, `.success__note`, `.success__back` verbatim.
Appended a new `.conf` family directly after `.success__back`: page
grounds `--white` (blocks 1/3/4) and `--cream` (block 2, testimonial)
against the `--ivory` body; headings `--font-head`, body `--font-body`;
kickers reuse the house letterspaced-small-caps shape already standing
in `.kh__hint-label` (cocoa for block 1, gold for block 2's cream
ground — a judgment call within the brief's "cocoa or gold" latitude);
CTA is `.btn-pink` reused (needed one addition, `text-decoration:none`,
since the class alone doesn't reset anchor underline — the old
`.success__btns a` rule that used to do this was retired with its
block). FLAT GOLD LAW respected: `--gold` flat only, no `--gold-grad`
use. No new tokens beyond `--cream`; no font imports.

`css/tokens.css`: `--cream:#F9F2EA` minted directly after `--card`,
with the one-line provenance comment specified in the brief.

CACHE-BUST: `css/main.css` `v=42` → `v=43`, `css/tokens.css` `v=8` →
`v=9`, both pointers on both pages.

VERIFICATION — local static-server preview (`http://localhost:4173`),
both pages, driven via JS-dispatched clicks (the harness's pointer-click
tool intermittently timed out against this pane this session; every
click was confirmed to have landed via DOM state read back immediately
after): `grep -c 'Demande bien reçue'` → 0 per page; ratified strings
(« Merci. », "TROIS ÉTAPES", "Marie L., Genève") present, 1 per page.
Full walk on both pages: service/step card → step 1 (Rendez-vous) →
Suivant → step 2 (Contact) → Confirmer le rendez-vous → new
confirmation screen renders, wizard root and stepper both `hidden`.
"Voir les résultats" resolves to `https://www.instagram.com/hotico.ink/`
with `target="_blank" rel="noopener"`; "sur WhatsApp" resolves to
`https://wa.me/41796472106` with the same. `data-reset` ('‹ retour')
returns both pages to a clean step 1: success hidden, wizard root and
stepper visible again, bar 1 active, label "1. Rendez-vous". Zero
console errors through the walk, either page. Desktop width (1280px)
checked via computed style + bounding rect (`body`'s `max-width` came
back `none`, confirming the ratified desktop override holds; the
`.conf` block's rect sat correctly inside the 768px-gated column) —
the pane's screenshot capture returned blank at this viewport this
session while returning correctly at mobile width, an apparent tool
quirk unrelated to the shipped CSS; visual confirmation is mobile-only
this lap. `git diff main --stat` shows exactly the five named files
(`css/main.css`, `css/tokens.css`, `index.html`,
`servicii/areola.html`, `LEDGER.md`).

>> BATON
STATE: `f2-confirmation-screen` built and locally verified against every
  EXIT CONDITION in the brief bar the desktop screenshot (data-verified,
  not eye-verified — see the tool quirk above), on both pages. Not yet
  pushed.
CERTIFIED: pending Tower.
OPEN: the areola.html prototype-note deviation above, for the Tower's
  ruling; the desktop-viewport screenshot gap, if an eye-check there
  matters before merge.
NEXT: F-3 — WhatsApp prefill handoff (wiring the recap into the bare
  `wa.me` link in block 4; explicitly out of this lap).
TRAPS: `.btn-pink` alone does not reset anchor `text-decoration` —
  every prior use sat inside a wrapper rule (`.success__btns a`) that
  did the resetting. Any future bare `.btn-pink` on an `<a>` outside
  such a wrapper needs the same one-line fix `.conf__cta` got, or it
  ships underlined.
COST: single-session lap, Sonnet 5, one branch, no re-work.

## Entry #52 — 2026-08-19 — LAP F-2b: EYE-GATE CORRECTIONS

**Scope:** Commander's eye-gate punch list against the F-2 confirmation
screen, iterated on `f2-confirmation-screen` (not merged). Two rounds
of instructions arrived; the second amended the first — CTA arrow kept
("Voir les résultats →" is Commander-ratified, item 6 cancelled), the
testimonial carousel ships live with three slides/dots/swipe instead
of the single static card originally specified, and wizard grounds
(steps 1–2) joined the grey-cut. `css/tokens.css` untouched, stays v9,
`--card`'s value byte-identical throughout (confirmed by diff).

WHAT SHIPPED:

1. STEPPER LIVES ON THE CONFIRMATION — `js/form.js`: `NAMES` gained a
   third entry, `'3. Confirmation'`. The `[data-confirm]` handler no
   longer hides `.stepper`; it sets `index = 2`, the label to
   `NAMES[2]`, and only bar 3 `is-active`, bypassing `go()` (which has
   no third `.step` slide to size against). `data-reset` still calls
   `go(0)`, unchanged, and was verified — not assumed — to restore
   label "1. Rendez-vous", bar 1, stepper visible.

2. KILL THE GREY — `.success` (confirmation surface) gained
   `background:var(--white)`. Blocks keep their own `--white` +
   `shadow-neo`, white-on-white, separated by shadow alone, as
   directed.

3. MARKERS DELETED — all four `conf__marker` spans (markup, both
   pages) and the `.conf__marker` rule (CSS) are gone. `.conf__block`
   padding lost its numeral-reserving left indent, now symmetric.

4. SIGNATURE CENTERED — `.conf__sig{text-align:center;}` added.

5. TESTIMONIAL → GOLD CAROUSEL — `.conf__block--cream` renamed
   `.conf__block--gold`, flat `var(--gold)` ground (FLAT GOLD LAW: no
   `--gold-grad`). Kicker, quote, and attribution all `var(--cocoa)`;
   quote keeps its italic and « » guillemets. Markup restructured to a
   track + three slides (`data-conf-slide`) + three dots
   (`data-conf-dot`), every slide carrying the identical ratified
   Marie L. quote verbatim — per the amendment, a deliberate mechanic
   demo, not a content choice. `js/form.js` gained a guarded carousel
   block: dots-click and pointer-drag swipe advance, clamped at both
   ends, dots hidden automatically if a future edit ever drops slide
   count below 2. No autoplay, no library.
   **PRODUCTION GATE: tripled quote is demo scaffolding — slides 2–3
   must be replaced by distinct ratified client quotes before any
   production release.**

6. CTA ARROW KEPT — item 6 (strip the arrow) was cancelled by the
   amendment before it was ever applied; "Voir les résultats →" is
   unchanged from the original F-2 ship.

7. CACHE-BUST: `css/main.css` `v=43`→`v=44`, `js/form.js` `v=4`→`v=5`,
   both pointers on both pages. `css/tokens.css` untouched at `v=9`.

9. WIZARD GROUNDS JOIN THE GREY-CUT — the single `--card` usage on
   `.programare__form` (desktop-only rule, `main.css` line ~1698)
   changed to `--white`. Nothing else touched: `--card`'s token value
   in `tokens.css` is untouched, and no other `--card` consumer
   (`.backbtn`, `.scard`, review cards, pill grounds, the desktop
   split-form card) was found sharing that selector — no STOP needed.
   Mobile carried no separate grey ground for the wizard to begin
   with, so there was nothing to change there.

TWO BUGS FOUND AND FIXED DURING VERIFICATION, neither present in the
brief's own instructions — both caught by the "verify, don't assume"
standard the brief itself set for item 1:

- **Selector collision with FROZEN `js/main.js`.** The first carousel
  markup used a bare `data-carousel` attribute. `main.js` (never
  touched this lap, per the file list) auto-inits *any* element with
  that exact attribute name via
  `document.querySelectorAll('[data-carousel]').forEach(initCarousel)`
  — a call already live on the page for the video and reviews
  carousels. It matched the new testimonial block too, tried to read
  `.children` off a `[data-track]` child that doesn't exist in this
  markup, and threw on every single page load, confirmation screen or
  not. Fixed by namespacing every attribute in the new component —
  `data-conf-carousel` / `data-conf-track` / `data-conf-slide` /
  `data-conf-dots` / `data-conf-dot` — none of which intersect
  `main.js`'s `[data-carousel]` / `[data-track]` / `[data-dots] .dot`
  vocabulary. `main.js` itself was never edited.
- **Stale `setTimeout` closure crash.** `go()`'s existing
  re-measure timer (`setTimeout(() => sizeTo(steps[index]), 380)`)
  reads `index` live, not at schedule time. Confirming quickly after a
  `go()` call (e.g. the Suivant → Confirmer sequence inside the same
  380ms window) let that timer fire *after* the confirm handler had
  already moved `index` to 2 — a slot with no matching `.step` —
  and crashed reading `undefined.getBoundingClientRect()`. Fixed by
  guarding inside `sizeTo` itself (`if (!step) return;`), the single
  choke point every caller already goes through, rather than patching
  each call site.

VERIFICATION — local static-server preview, both pages, fresh browser
tabs used for every console-error check this pass (a same-tab
`navigate` was found to return stale accumulated console history
across reloads, not just the current load — a tooling gotcha, not a
site bug; noted so a future session doesn't chase a phantom). Full
walk both pages: Rendez-vous → Contact → Confirmer le rendez-vous →
confirmation renders with stepper visible, label "3. Confirmation",
only bar 3 lit; `data-reset` restores label "1. Rendez-vous", bar 1,
stepper and wizard root both visible. Zero console errors on fresh
load and through the entire walk, both pages, confirmed in fresh tabs
after both bugfixes landed. `grep -c conf__marker` → 0, all three
locations (both HTML files, main.css). CTA text confirmed
byte-`"Voir les résultats →"` on both pages. Carousel: dot-click
jumps directly; simulated `PointerEvent` swipes (dispatched at
`[data-conf-track]`, ±50px past the 30px threshold) advance and
retreat correctly across all three slides with dots staying in sync,
and clamp cleanly at both ends with no error or visual glitch on an
over-swipe. `.programare__form` computed `background-color` reads
`rgb(255,255,255)` at 1280px; a sibling `.scard` reads
`rgb(233,233,233)` (`--card`, unchanged) in the same check — the
grey-cut is scoped as ordered. Desktop-viewport (1280×900) visual
screenshot returned blank again this session, same tool quirk logged
in Entry #51 — verified by computed style instead; mobile screenshots
confirm all markup/CSS changes visually. `git diff --stat` shows
exactly `css/main.css`, `index.html`, `js/form.js`,
`servicii/areola.html` (plus this entry in `LEDGER.md`) —
`css/tokens.css` absent from the diff, confirmed byte-identical.

>> BATON
STATE: `f2-confirmation-screen` carries both the original F-2 build and
  this eye-gate correction pass, locally verified against every EXIT
  CONDITION in both the corrections brief and its amendments, on both
  pages. Not merged — holding for the Commander's next word per this
  session's explicit instruction.
CERTIFIED: pending Tower.
OPEN: testimonial slides 2–3 await distinct ratified client quotes —
  see the PRODUCTION GATE line above; the branch must not reach
  production with three identical Marie L. quotes. Entry #51's
  areola.html prototype-note deviation and the desktop-screenshot tool
  gap remain open from that entry too.
NEXT: hold for Commander's eye on this pass; F-3 (WhatsApp prefill
  handoff) still waits behind it.
TRAPS: any future element on this site using a bare `data-carousel`
  attribute will silently wire itself into `main.js`'s house carousel
  and crash unless it also supplies a `[data-track]` child and
  `[data-dots] .dot` buttons in that vocabulary — namespace instead,
  the way this lap's `data-conf-*` family does. Any `setTimeout`
  callback in `form.js` that closes over the shared `index` variable
  must tolerate `index` having moved by the time it fires — `sizeTo`'s
  new null-guard is the backstop, not a substitute for that awareness
  in code added later.
COST: single-session lap, Sonnet 5, one branch, two bugs caught and
  fixed pre-report (not post-eye-gate rework).

## Entry #53 — 2026-08-19 — LAP F-2c: MOBILE EYE-GATE — CREAM GROUND

**Scope:** one-line correction from the Commander's iPhone regrade of
Entry #52's grey-cut. `--cream` re-employed as the confirmation
surface's ground, all viewport widths, both pages — superseding
Entry #52's `--white` choice for `.success` only. Wizard steps 1–2
(`.programare__form`) stay white, untouched; the white→cream shift on
confirm is deliberate, per instruction. `css/tokens.css` untouched
(no new token — `--cream` was already minted in Entry #51, only
retired from use in Entry #52 and now brought back). No markup or JS
touched this pass — a pure CSS + cache-bust correction, confirmed by
diff (`css/main.css` one line, `index.html` and `servicii/areola.html`
one pointer each).

WHAT SHIPPED: `.success{background:var(--white)}` → `var(--cream)`,
`css/main.css`. `.conf__block` keeps its own `background:var(--white)`
and `shadow-neo`, so the inner blocks now float white-on-cream instead
of white-on-white; `.conf__block--gold`'s flat `--gold` is untouched
and reads cleanly against the new ground, no contrast concern (both
were designed against a light neutral already).

CACHE-BUST: `css/main.css` `v=44`→`v=45`, both pointers, both pages.
`css/tokens.css` stays `v=9`.

VERIFICATION — local static-server preview, fresh browser tabs, both
pages, mobile viewport (375×812): full walk to confirmation, ground
reads cream edge-to-edge behind the heading/subline/lead text and
carries through unbroken to the signature/note/retour tail — no white
gap, no seam-shock against the page's `--ivory`. Gold carousel block
sits legibly on cream. `data-reset` restores a clean step 1 (label,
bar 1, stepper/root visible) on both pages. Zero console errors on
fresh load and through the full walk, both pages. Desktop width
(1280px) spot-checked by computed style, not screenshot (same tool
quirk as Entries #51–52): `.programare__form` reads
`rgb(255,255,255)` (unchanged), `.success` reads `rgb(249,242,234)` —
`--cream` exactly — confirming the rule is unconditional across
widths as ordered, not just correct at mobile. `git diff --stat`
shows exactly `css/main.css`, `index.html`, `servicii/areola.html`
(plus this entry in `LEDGER.md`); `css/tokens.css` absent, confirmed
byte-identical.

>> BATON
STATE: `f2-confirmation-screen` carries the F-2 build, the F-2b
  eye-gate corrections, and this F-2c mobile-eye correction, all
  locally verified, both pages. Not merged — holding for the
  Commander's next word.
CERTIFIED: pending Tower.
OPEN: unchanged from Entry #52 — testimonial slides 2–3 await
  distinct ratified client quotes (PRODUCTION GATE stands); Entry
  #51's areola.html prototype-note deviation; the desktop-viewport
  screenshot tool gap, now spot-checked three laps running by
  computed style instead of by eye.
NEXT: hold for Commander's eye on this pass; F-3 (WhatsApp prefill
  handoff) still waits behind it.
TRAPS: none new this pass — the correction was a single token swap on
  an already-isolated selector.
COST: single-session lap, Sonnet 5, one branch, one-line CSS
  correction, no re-work.

## Entry #54 — 2026-08-19 — LAP F-2d: CREAM REJECTED — INHERIT IVORY

**Scope:** Entry #53's `--cream` ground rejected at the Commander's
eye-gate as off-canon. The confirmation surface now carries no
background declaration of its own — transparent, inheriting the
page's `--ivory` straight through. Alongside the reversal, a repair:
`servicii/in-curand.html`, a third consumer of `tokens.css`/`main.css`
that every prior cache-bust this campaign (F-1 through F-2c) had
missed, was found stuck at `v=42`/`v=8` while `index.html` and
`servicii/areola.html` had climbed to `v=45`/`v=9`.

PRE-FLIGHT: all three consumers' pointer values verified against the
brief's stated baseline before any edit —
`index.html`/`servicii/areola.html` at `main.css?v=45`,
`tokens.css?v=9`; `servicii/in-curand.html` at `main.css?v=42`,
`tokens.css?v=8`. All three matched exactly; no STOP triggered.

WHAT SHIPPED:

1. `.success{background:var(--cream)}` → declaration removed entirely
   (not swapped for `var(--ivory)` — the brief was explicit: inherit
   through transparency, don't restate the page's own color). Inner
   `.conf__block` white, `.conf__block--gold` flat gold, and the
   wizard's `.programare__form` white (Entry #52) are all untouched —
   this lap touched exactly one declaration.

2. `--cream:#F9F2EA` and its provenance comment ("Confirmation
   surface — measured from Alexandra's mock, F-2") removed from
   `css/tokens.css`. Minted in Entry #51, used through Entry #53,
   retired here — this entry is that token's full provenance record
   now that no line of code carries the comment forward.

3. `git grep -i cream` (html/css/js) → 0 matches repo-wide, confirmed
   post-edit. Only two occurrences existed pre-edit (the token
   declaration and the one `.success` consumer); both gone.

4. CACHE-BUST, three consumers each, the skew repair folded into the
   same bump: `css/main.css` `v=45`→`v=46` (`index.html`,
   `servicii/areola.html`) and `v=42`→`v=46` directly
   (`servicii/in-curand.html`, skipping the intermediate versions it
   never carried); `css/tokens.css` `v=9`→`v=10` (`index.html`,
   `servicii/areola.html`) and `v=8`→`v=10` directly
   (`servicii/in-curand.html`). `js/form.js` untouched at `v=5` on its
   two consumers; `in-curand.html` carries no form and correctly no
   `form.js` pointer at all — confirmed by grep, not assumed.

STANDING LESSON FOR THE DOCTRINE LAP: this campaign's cache-bust law
has been applied per-lap against a consumer list held in the
executing session's head, not re-derived from the repository each
time — that's exactly how `in-curand.html` drifted three versions
behind unnoticed across F-1, F-2, F-2b, and F-2c. `grep -rl
'main\.css?v=\|tokens\.css?v='` (or equivalent) should be the first
step of every future cache-bust, every lap, regardless of how
confident the session is about which files reference these assets —
consumer lists are enumerated by grep, never assumed.

VERIFICATION — local static-server preview, fresh browser tabs, both
form pages, mobile viewport: full walk to confirmation, ground
computed `background-color` reads `rgba(0,0,0,0)` (transparent) on
both pages — indistinguishable from the page's `--ivory` by
inheritance, not by a matching color value restated. White/gold
blocks float clean, no seam anywhere; the signature/note/retour tail
carries the same inherited ground straight through, no color gap
against the page. `data-reset` restores a clean step 1 (label, bar 1,
stepper/root visible) on both pages. Zero console errors, fresh load
through full walk, both pages. `servicii/in-curand.html` (loaded with
its `?s=` query, the same way its own nav links reach it) renders
normally — logo, headline, WhatsApp CTA, "Retour à l'accueil" all
present and styled correctly, zero console errors, network panel
confirms `tokens.css?v=10` and `main.css?v=46` both `200 OK`; its
content diff is pointer-only, two lines. `git diff --stat`: exactly
`css/main.css` (1 line), `css/tokens.css` (3 lines removed),
`index.html`, `servicii/areola.html`, `servicii/in-curand.html`
(2-pointer diffs each) — plus this entry in `LEDGER.md`.

>> BATON
STATE: `f2-confirmation-screen` carries the full F-2 lineage (build,
  eye-gate corrections, mobile cream correction, and now the cream
  reversal + skew repair), locally verified, all three HTML consumers
  pointer-aligned at `v=46`/`v=10`. Not merged — holding for the
  Commander's next word.
CERTIFIED: pending Tower.
OPEN: unchanged from Entry #52 — testimonial slides 2–3 await
  distinct ratified client quotes (PRODUCTION GATE stands); Entry
  #51's areola.html prototype-note deviation; the desktop-viewport
  screenshot tool gap (untested again this lap — the ground change is
  a transparency removal, verified sufficiently by computed style and
  mobile screenshot without needing the desktop eye). NEW: the
  doctrine-lap lesson above — a repo-wide consumer grep should become
  a standing step in the cache-bust law itself, not just this entry's
  advice.
NEXT: hold for Commander's eye on this pass; F-3 (WhatsApp prefill
  handoff) still waits behind it.
TRAPS: none new to the confirmation screen itself. The general trap
  this lap surfaces: any asset with more than one HTML consumer can
  silently drift if cache-bust bumps are applied by memory instead of
  by search — `in-curand.html` sat three versions stale for four laps
  before anyone looked.
COST: single-session lap, Sonnet 5, one branch, one CSS line removed,
  one token retired, three-file pointer repair, no re-work.

---

## Entry #55 — 2026-08-19 — LAP F-3: WHATSAPP HANDOFF

**Scope:** "Confirmer le rendez-vous" becomes a real handoff. The
button now composes a blessed WhatsApp recap message from the
wizard's own form state and opens `wa.me` with it pre-filled,
alongside the existing (unconditional) advance to the confirmation
screen. The date field stops being a static `dd/mm/yyyy` facade and
becomes a real `<input type="date">`. One lap, one variable: the
handoff — nothing else in the wizard moved.

PRE-FLIGHT: `form.js?v=5` (index, areola), `main.css?v=46` (index,
areola, in-curand), `tokens.css?v=10` (all three) — verified by grep
against the brief's stated baseline before any edit. All matched; no
STOP triggered.

WHAT SHIPPED:

1. Date facade → real input, both pages: the `<span class="field__ph">`
   inside `.field__box` replaced by
   `<input class="field__input" type="date" data-recap="date">`, the
   calendar SVG kept untouched beside it. `.field__box` already
   carries a fixed `height:50px` (not `min-height`) shared by every
   field on the form — the empty date box needed no new sizing rule
   to hold that height; verified live at exactly `50px` on both
   pages before and after a value is picked. New CSS scoped to
   `.field__input[type="date"]` only (native chrome stripped,
   `::-webkit-date-and-time-value{text-align:left}`), so text/email/tel
   fields sharing `.field__input` are untouched.

2. Recap hooks, both pages, Contact step: `data-recap="nom"` /
   `"prenom"` / `"email"` / `"tel"` added to the four existing inputs —
   no other attribute or markup touched.

3. `data-proc-base="Aréole"` added to `[data-steps]` on
   `servicii/areola.html` only; `index.html`'s root carries none.

4. `js/form.js` — the handoff prepended synchronously to the existing
   `[data-confirm]` handler, every original line kept intact below
   it. Collection is root-scoped throughout
   (`root.querySelectorAll('[data-recap]')`,
   `root.querySelector('[data-val].is-on')`) — never
   `document`-wide. Procedure string: `data-proc-base + " + " + selection`
   when both exist, base alone when no extra procedure is selected,
   the bare selection (or `"—"`) when the page carries no base. Date
   reformatted from the input's native `yyyy-mm-dd` to `dd/mm/yyyy`;
   every other empty field renders `"—"` — confirmed never
   `"undefined"`, never blank, by direct URL inspection. `window.open`'s
   return value is never branched on; the pre-existing success flow
   (`root.hidden`, `success.hidden`, `index = 2`, label, bar 3) runs
   unconditionally right after it, so a blocked popup can't strand
   the client on step 2.

5. `[data-reset]` extended one line: `root.querySelectorAll('[data-recap]')`
   cleared alongside the pre-existing (untouched) document-wide
   dot-clearing — reset now returns the date input and all four
   contact fields to empty, in addition to the dots it already
   cleared.

6. CACHE-BUST, per the standing consumer-enumeration rider:
   `js/form.js` `v=5`→`v=6` (`index.html`, `servicii/areola.html` —
   its only two consumers, confirmed by grep); `css/main.css`
   `v=46`→`v=47` (`index.html`, `servicii/areola.html`, AND
   `servicii/in-curand.html` — three consumers, confirmed by grep).
   `css/tokens.css` untouched at `v=10`, all three consumers, per the
   brief.

VERIFICATION — local static-server preview, fresh tabs, both form
pages: filled walk (native date picked, procedure selected, contact
filled) → `wa.me` URL decoded and diffed byte-for-byte against the
blessed template, exact match including 🌸 and both `·` separators;
confirmation screen appears, bar 3 lit. Empty walk (nothing filled) →
`"—"` in every slot, confirmed zero `"undefined"` occurrences;
confirmation still appears, nothing blocked. `servicii/areola.html`
procedure composition checked both ways: base alone (`"Aréole"`, no
extra selected) and base+extra (`"Aréole + Lèvres"`). `data-reset`
(`‹ retour`) restores a clean step 1 on both pages: date input empty,
all four recap fields empty, dots cleared, label/bar back to step 1.
Empty-state `.field__box` height confirmed `50px` on both pages,
matching pre-lap rendering — no collapse. Zero console errors
attributable to this lap (one pre-existing, unrelated `allowfullscreen`
attribute warning from the Vimeo iframe, present before this lap).
`git diff main --stat`: `css/main.css`, `index.html`, `js/form.js`,
`servicii/areola.html`, `servicii/in-curand.html` (pointer-only, one
line) — plus this entry in `LEDGER.md`. Pointers confirmed at `v=6`
(two `form.js` consumers) / `v=47` (three `main.css` consumers) /
`v=10` (`tokens.css`, untouched, three consumers) post-edit.

>> BATON
STATE: `f3-whatsapp-handoff` carries the full handoff build, locally
  verified on both form pages (filled walk, empty walk, reset,
  base/base+extra procedure composition), not merged — holding for
  the Commander's eye.
CERTIFIED: pending Tower.
OPEN: unchanged from Entry #52 — testimonial slides 2–3 still await
  distinct ratified client quotes (PRODUCTION GATE stands); Entry
  #51's areola.html prototype-note deviation, still true after this
  lap (the site sends nothing — the client sends her own WhatsApp
  message via the handoff this lap built).
NEXT: hold for Commander's eye-gate on this pass.
TRAPS: iOS leaves a spare tab open after the `wa.me` handoff when the
  app-switch back to Safari isn't automatic — known, accepted at the
  eye-gate this lap, not treated as a bug. An empty iOS date input
  renders blank by nature (no `dd/mm/yyyy` ghost text — that facade
  is gone now that the field is real); the `"Choisis la date"` label
  above it carries the context iOS won't. The prototype note remains
  true and unedited: the site sends nothing, the client sends her own
  WhatsApp message — this lap composes that message, it doesn't send
  anything on the client's behalf.
COST: single-session lap, Sonnet 5, one branch, one new input type,
  one composed-message JS block, two-file cache-bust (three
  `main.css` consumers, two `form.js` consumers), no re-work.

---

## Entry #56 — 2026-08-19 — LAP F-3b: THUMB-GATE CORRECTION — AUTO-OPEN RETIRED

**Scope:** Entry #55's auto-open handoff failed the Commander's thumb
test: on mobile, `window.open` hijacked to WhatsApp before the
confirmation screen was ever seen. Corrected on the same branch
(`f3-whatsapp-handoff`, not merged): the handoff becomes a deliberate
button the client taps ON the confirmation screen, sitting above a
recap card she can read before sending anything. `‹ retour` stops
wiping the form — it now navigates back to Contact with every value
intact, so a correction is one edit away.

PRE-FLIGHT: `form.js?v=6` (index, areola), `main.css?v=47` (index,
areola, in-curand), `tokens.css?v=10` (all three) — verified by grep
against Entry #55's shipped state before any edit. All matched; no
STOP triggered.

WHAT SHIPPED:

1. Confirmation screen opening trio replaced, both pages, copy
   verbatim: heading "Merci." → "Presque fini."; subline "Ta demande
   est bien arrivée chez moi." → "Ton message est prêt — il ne reste
   qu'à l'envoyer."; the old lead ("Je te réponds personnellement sur
   WhatsApp, dans les 24 heures.") retired and replaced by "Je te
   réponds personnellement, dans les 24 heures.", now sitting *below*
   the CTA instead of above it. New order: heading → subline → recap
   card → CTA → lead. Everything below (trois étapes, gold carousel,
   résultats, autre date, signature, note, retour) untouched.

2. Recap card, both pages: a new `.conf__recap` block (same
   `.conf__block` white house pattern as the existing blocks — no new
   surface color, `css/tokens.css` untouched) with six rows — Date,
   Procédure, Nom, Prénom, E-mail, Téléphone — quiet uppercase
   `.conf__recap-label`s in `--placeholder`, values in `--cocoa`,
   hairline dividers in `--field-gray`. Value slots are empty
   `data-recap-out="…"` spans seeded with the `"—"` fallback glyph in
   markup, so a client who never confirms sees "—" rather than blank
   cells if the card is ever inspected pre-fill.

3. The `data-wa-cta` anchor ships exactly as specified: `<a
   class="btn-pink conf__cta" data-wa-cta href="#" target="_blank"
   rel="noopener noreferrer">Envoyer ma demande sur WhatsApp</a>` —
   inert `href="#"` until the first confirm sets it.

4. `js/form.js` `[data-confirm]` handler: message-composition logic
   (blessed template, root-scoped `[data-recap]`/`[data-val].is-on`
   reads, `dd/mm/yyyy` reformat, `"—"` fallbacks) carried over
   byte-for-byte from Entry #55 — not touched beyond removing the
   `window.open` call it fed. Two new steps added after composition,
   both scoped to the `success` panel: `[data-recap-out]` spans
   populated via `textContent` only (no `innerHTML`, no template-
   string DOM injection — the recap card echoes client-typed text, so
   this is the one hard security line drawn this lap), and
   `[data-wa-cta]`'s `href` set to the same `wa.me` URL Entry #55
   used to open directly. All of this reruns on every confirm click
   (recomposition law), so an edit-and-reconfirm always refreshes
   both the card and the href before the client taps send. `grep -c
   "window.open" js/form.js` → `0`, confirmed post-edit — no popup,
   auto-open, or orphaned machinery survives.

5. `[data-reset]` reworked from a wipe to navigation: hides success,
   shows root + stepper, calls `go(1)` — lands on step 2 (Contact)
   with the date, all four contact fields, and the selected procedure
   dot preserved. The dot-clearing line, the `[data-recap]`-clearing
   line, and the already-dead `[data-reveal]` line (no `data-reveal`
   panel exists anywhere in current markup — confirmed by grep) are
   all removed, not just bypassed. Button text `‹ retour` unchanged.

6. CACHE-BUST, consumer rider: `js/form.js` `v=6`→`v=7` (`index.html`,
   `servicii/areola.html`); `css/main.css` `v=47`→`v=48` (`index.html`,
   `servicii/areola.html`, `servicii/in-curand.html`). `tokens.css`
   untouched at `v=10`, three consumers.

VERIFICATION — local static-server preview, fresh tabs, both pages,
`window.open` hooked to a counter rather than blocked, so a
regression would be caught even where a real popup blocker would hide
it. Filled walk: confirm → recap card shows the typed values
verbatim, `data-wa-cta`'s decoded `href` byte-exact against the
blessed template (🌸, both `·`, `dd/mm/yyyy`; areola base-alone
`"Aréole"` and base+extra `"Aréole + Lèvres"` both checked), zero
`window.open` calls recorded, step 3 shown, bar 3 lit. Correction
loop: `‹ retour` → step 2, label reads "2. Contact", bar index 1
active, date/nom/prenom/email/tel/dot all confirmed intact by direct
read — edited the phone field, reconfirmed, recap card AND href both
carried the new number, old value gone from both. Empty walk: every
recap row and the href read `"—"`, zero `window.open` calls, zero
`"undefined"` anywhere (checked by string search over the serialized
recap object, not by eye). Injection probe: typed `<b>test</b>` into
Nom, confirmed — `[data-recap-out="nom"]` `innerHTML` reads the
HTML-escaped literal (`&lt;b&gt;test&lt;/b&gt;`), `textContent` reads
the raw string, `.querySelector('b')` on the node returns `null` — no
markup executes. Zero console errors attributable to this lap on
either page (one pre-existing, unrelated `allowfullscreen` attribute
warning from the Vimeo iframe, present since before F-3). `git diff
main --stat`: `css/main.css`, `index.html`, `js/form.js`,
`servicii/areola.html`, `servicii/in-curand.html` (pointer-only, one
line) — plus this entry in `LEDGER.md`, exactly the six files named
in the brief. Pointers confirmed at `v=7` (two `form.js` consumers) /
`v=48` (three `main.css` consumers) / `v=10` (`tokens.css`, untouched)
post-edit.

PRODUCTION GATE: the new opening copy (Presque fini. / Ton message
est prêt — il ne reste qu'à l'envoyer. / Envoyer ma demande sur
WhatsApp) replaces client-ratified copy and requires Alexandra's
blessing before any production release.

WATCHED SEAM: block 4's bare WhatsApp link remains a second,
unprefilled door by design (other-date intent); revisit only if real
clients arrive message-less.

>> BATON
STATE: `f3-whatsapp-handoff` now carries the corrected, deliberate-tap
  handoff (recap card + CTA on the confirmation screen, retour as
  navigation) on top of the F-3 build, locally verified on both form
  pages across filled/empty/correction-loop/injection checks. Not
  merged — holding for the Commander's thumb on this pass.
CERTIFIED: pending Tower.
OPEN: unchanged from Entry #52 — testimonial slides 2–3 still await
  distinct ratified client quotes (PRODUCTION GATE stands); Entry
  #51's areola.html prototype-note deviation, still true and untouched
  this lap. NEW: the PRODUCTION GATE above — the "Presque fini." /
  "Envoyer ma demande sur WhatsApp" opening copy is this session's
  prose, not Alexandra's, and needs her word before it ships past
  prototype.
NEXT: hold for the Commander's eye-and-thumb-gate on this pass.
TRAPS: none new. The general shape of this lap's fix: a flow that
  looks correct on desktop (auto-open feels seamless with a mouse)
  can still fail on the exact device the client will actually use —
  the thumb test is not optional for anything that opens an external
  app. The prototype note remains true and unedited: the site sends
  nothing, the client sends her own WhatsApp message, now by her own
  deliberate tap rather than by a script opening it for her.
COST: single-session correction lap, Sonnet 5, same branch, one
  handler split into recap-population + href-set (message logic
  unchanged), one reset handler inverted from wipe to navigate,
  two-file cache-bust (three `main.css` consumers, two `form.js`
  consumers), no re-work beyond this correction itself.

---

## Entry #57 — 2026-08-19 — LAP F-4: ALEXA'S GATE — REVIEW SCREEN RETIRED, HEURE, SWISS PHONE

**Scope:** Client-ruled revisions, one batch, branch `f4-alexas-gate`
off main (HEAD `8430645`): (1) the recap-card review screen built in
Entries #55/#56 is retired at Alexandra's ruling — "Confirmer le
rendez-vous" opens WhatsApp directly again, and the confirmation
screen's opening reverts to its client-ratified "Merci." trio; (2) a
Swiss flag and Swiss example number replace the RO flag and RO-style
placeholder on the phone field; (3) a time picker joins the date
picker in step 1, and the time value joins the WhatsApp message.

PRE-FLIGHT: `form.js?v=7` (index, areola), `main.css?v=48` (index,
areola, in-curand), `tokens.css?v=10` (all three) — verified by grep
against main (`8430645`) before any edit. All matched; no STOP
triggered.

WHAT SHIPPED:

1. Confirmation-screen opening cluster removed whole, both pages: the
   "Presque fini." heading, "Ton message est prêt…" subline, the
   entire `.conf__recap` block (six rows: Date, Procédure, Nom,
   Prénom, E-mail, Téléphone), the `[data-wa-cta]` anchor, and the
   post-CTA lead line — all gone, not just hidden. In their place, the
   ratified opening trio verbatim, on the existing `conf__h` /
   `conf__subline` / `conf__lead` classes: "Merci." / "Ta demande est
   bien arrivée chez moi." / "Je te réponds personnellement sur
   WhatsApp, dans les 24 heures." Exactly one heading, one subline,
   one lead survive per screen — confirmed by direct count, not just
   by eye. Everything below (trois étapes, gold carousel, résultats,
   autre date, signature, note, retour) untouched.

2. Time picker added, both pages: a sibling `.field` block directly
   below the date field in step 1, identical structure — clock-face
   `.field__caret` SVG, `<input class="field__input" type="time"
   data-recap="heure">`. `css/main.css`'s date-input rule family
   (`.field__input[type="date"]`, its `::-webkit-date-and-time-value`
   pseudo) extended to `[type="time"]` rather than duplicated — same
   50px `min-height` pin, same stripped native chrome, same blank
   empty-state (the label carries context, as for the date field).

3. Swiss flag: `.field__flag`'s three `<i>` stripe children removed
   from markup on both pages; `css/main.css` restyles the bare span as
   `position:relative; background:#DA291C` with the white cross drawn
   by `::before` (vertical bar) / `::after` (horizontal bar), both
   `position:absolute`, arms at 60% of the span's dimension, 20%
   thickness, centered. The three `:nth-child` stripe rules retired
   along with the RO-flag comment, replaced by the Swiss equivalent —
   colours stay hex-literal, no tokens minted, same "deliberately
   outside the tokens.css colour law" precedent the RO flag set. Phone
   placeholder now reads `079 123 45 67` on both pages.

4. `js/form.js` `[data-confirm]` handler reworked: the `waCta`
   variable and all `[data-wa-cta]` / `[data-recap-out]` machinery
   removed outright (`grep -c "wa-cta\|recap-out" js/form.js` → `0`,
   confirmed post-edit — nothing orphaned). Message composition stays
   root-scoped with `"—"` fallbacks, byte-compatible with the prior
   template plus one new line-2 field: `recap.heure` (native `HH:MM`,
   read automatically off the new field's `data-recap="heure"` — no
   new read logic needed). Blessed template, verbatim:
   `Bonjour Alexandra ! Je souhaite confirmer mon rendez-vous 🌸` /
   `Date : {date} · Heure : {heure} · Procédure : {procédure}` /
   `Nom : {nom} {prenom} · E-mail : {email} · Téléphone : {tel}`. On
   confirm, `window.open(...)` fires synchronously in the click
   handler against the composed message, its return value never
   branched on — the success flow (hide root, show success, `index =
   2`, label, bar 3) runs unconditionally right after, same as before
   Entry #55 ever built the recap screen.

5. `[data-reset]` (retour) left untouched by deliberate choice: still
   navigation, not a wipe — `go(1)` back to step 2 with every field,
   the date, the new time, and the selected procedure dot intact.

6. CACHE-BUST, consumer rider: `js/form.js` `v=7`→`v=8` (`index.html`,
   `servicii/areola.html`); `css/main.css` `v=48`→`v=49` (`index.html`,
   `servicii/areola.html`, `servicii/in-curand.html`). `tokens.css`
   untouched at `v=10`, three consumers.

VERIFICATION — local static-server preview (`python3 -m http.server`
on a scratch port; this session's Browser pane could not reach the
shared dev server another chat already held on the project's usual
port), `window.open` hooked to a recording stub so a regression would
be caught even where a real popup blocker would hide it, both pages.
Structural checks via computed style and DOM read rather than
screenshot (this pane's screenshot capture was not rendering content
this session; console, computed CSS, and direct value reads carried
the verification instead): `.field__flag` computed `background-color`
`rgb(218,41,28)` (`#DA291C`) with `::before`/`::after` both
`position:absolute` and white, both date and time inputs computed
`min-height:50px` and empty, tel placeholder `"079 123 45 67"` — all
confirmed on both pages. Filled walk (index): date `2026-09-15`, time
`14:30`, procedure `Aréole`, full contact fields → single `window.open`
call, decoded `text=` byte-exact against the blessed template
including `Heure : 14:30`. Base+extra check (areola, `data-proc-base
="Aréole"`): selecting `Lèvres` composed `Procédure : Aréole + Lèvres`
correctly. Empty walk (index): confirm with nothing filled → single
`window.open` call, every field including `Heure` reads `"—"`, zero
blocking. Correction loop: retour after a filled confirm landed back
on step 2 (label "2. Contact") with date, time (`14:30`), the
`Aréole` dot, and all four contact fields read back intact by direct
value inspection. Zero console errors on index, areola, and
in-curand (checked via `read_console_messages`, `onlyErrors`). Exit
greps: `grep -c "Presque fini\|conf__recap\|wa-cta\|recap-out"` → `0`
across `index.html`, `servicii/areola.html`, `js/form.js`,
`css/main.css`. `git diff main --stat`: `css/main.css`, `index.html`,
`js/form.js`, `servicii/areola.html`, `servicii/in-curand.html`
(pointer-only, one line) — plus this entry in `LEDGER.md`, exactly
the six files named in the brief; `css/tokens.css` untouched.
Pointers confirmed post-edit: `v=8` (two `form.js` consumers) / `v=49`
(three `main.css` consumers) / `v=10` (`tokens.css`, untouched).

CLIENT GATE: the recap-card review screen (Entries #55/#56) is
retired at Alexandra's ruling — she wants the direct handoff back.
The "Presque fini." / recap-card opening copy never cleared the
PRODUCTION GATE Entry #56 opened for it (it needed her blessing
before shipping past prototype); that gate closes as **moot** this
lap — the copy it guarded no longer exists. The ratified "Merci." /
"Ta demande est bien arrivée chez moi." / "Je te réponds
personnellement sur WhatsApp, dans les 24 heures." trio is restored
verbatim, so no new production gate opens on the opening copy.
Restoring auto-open also restores the tradeoff Entry #56 retired it
to avoid: on mobile, `window.open` fires before any confirmation
screen is seen, so mobile clients will mostly never see the "Merci."
screen, the trois-étapes card, the carousel, or the signature block
below it — accepted this lap by client ruling, not rediscovered as a
surprise. The WhatsApp template's `Heure` line ships on the
Commander's blessing, not a fresh client ratification — flagged here
for completeness, not as an open gate.

WATCHED SEAM: unchanged from Entry #56 — block "Besoin d'une autre
date ?" still carries a second, unprefilled `wa.me` link by design
(other-date intent); revisit only if real clients arrive
message-less.

>> BATON
STATE: `f4-alexas-gate` carries the full batch — review screen
  retired, ratified "Merci." opening restored, time picker added and
  wired into the WhatsApp template, Swiss flag + Swiss phone
  placeholder — locally verified on index and areola across
  empty/filled/base+extra/correction-loop checks, in-curand verified
  pointer-only and console-clean. Not merged — holding for the
  Commander's eye.
CERTIFIED: pending Tower.
OPEN: unchanged from Entry #52 — testimonial slides 2–3 still await
  distinct ratified client quotes; Entry #51's areola.html
  prototype-note deviation, still true and untouched this lap. Entry
  #56's PRODUCTION GATE on the "Presque fini." opening copy closes as
  moot (see CLIENT GATE above) — no replacement gate opens.
NEXT: hold for the Commander's eye-gate on this pass; push and report
  preview URL + HEAD SHA once cleared to push.
TRAPS: none new. The auto-open mobile tradeoff flagged in Entry #56
  is back by client ruling, not by drift — worth re-reading Entry #56
  in full before assuming it's forgotten context if this surfaces
  again later. Screenshot capture failed silently in this session's
  Browser pane while the DOM, computed styles, and console all read
  correctly — verification leaned on those instead; worth a plain
  screenshot check in a fresh pane before the Commander's own eye-gate
  if the same tool glitch recurs.
COST: single-session batch lap, Sonnet 5, new branch off main, one
  markup cluster removed and replaced across two pages, one new field
  block duplicated across two pages, one CSS rule family extended
  (date→date+time) and one restyled in place (RO→Swiss flag) with a
  dead rule family (`.conf__recap*`) retired, one JS handler
  simplified (fewer moving parts than Entry #56's version, not more),
  three-file cache-bust rider (two `form.js` consumers, three
  `main.css` consumers).

---

## Entry #58 — 2026-08-19 — LAP F-4b: MOBILE GATE — SQUARE FLAG, KEYBOARD-RESIZE GUARD

**Scope:** Two corrections from the Commander's iPhone gate on
Entry #57's build, same branch (`f4-alexas-gate`, not merged): the
Swiss flag squares up, and the wizard's resize listener stops
re-animating step height every time iOS toggles the keyboard or the
QuickType suggestion bar while a client types. A third item the
Commander flagged — `.field__input`'s font-size as a possible iOS
focus-zoom trigger — was checked and closed as already-true: it reads
16px already, so no zoom fires and nothing needed touching. Recorded
here so it isn't re-proposed as a fix for a bug that doesn't exist.

DO NOT triggered: no font sizes, markup, ratified copy, other JS
paths, or frozen files were touched.

WHAT SHIPPED:

1. `.field__flag` (`css/main.css`) squared: `width:22px`→`15px`
   (`height` was already `15px`). The `::before`/`::after` cross
   percentages were already exactly the spec the Commander gave —
   `top:20%;bottom:20%;left:40%;right:40%` (vertical bar) and
   `top:40%;bottom:40%;left:20%;right:20%` (horizontal bar) — so on a
   square box those percentages now resolve to equal-length arms on
   both axes instead of the rectangle's stretched horizontal one.
   Confirmed by computed style: `15px`×`15px` box, vertical bar
   spanning `3px`–`12px` (9px, 60% of 15px), horizontal bar spanning
   `3px`–`12px` the same way — a true uniform cross.

2. `js/form.js`'s bare `window.addEventListener('resize', …)` gained a
   width guard: `lastWidth` is captured once at `go(0)` time and
   compared on every resize; an unchanged `innerWidth` returns before
   calling `sizeTo`, a changed one updates `lastWidth` and re-measures
   exactly as before. iOS fires `resize` on keyboard/QuickType
   show-hide with `innerHeight` moving and `innerWidth` static — those
   now no-op. Rotation and genuine viewport resizes still change
   `innerWidth` and still re-measure.

3. CACHE-BUST, consumer rider: `js/form.js` `v=8`→`v=9` (`index.html`,
   `servicii/areola.html`); `css/main.css` `v=49`→`v=50`
   (`index.html`, `servicii/areola.html`, `servicii/in-curand.html`).
   `tokens.css` untouched at `v=10`, three consumers.

VERIFICATION — local static-server preview (scratch port, this
session's Browser pane again unable to reach another chat's dev
server on the project's usual port), mobile viewport (375×812), both
pages. Flag: computed `.field__flag` box `15px`×`15px`,
`background-color rgb(218,41,28)` (`#DA291C`), `::before` rect
`top/bottom 3px, left/right 6px` and `::after` rect `top/bottom 6px,
left/right 3px` — both bars 9px long (60% of 15px) and 3px thick
(20% of 15px), confirmed on index and areola. Keyboard-hop guard:
overrode `window.innerWidth`/`innerHeight` to simulate a height-only
resize (`375`→`375` width, `812`→`500` height) and dispatched
`resize` — `[data-steps]`'s inline `height` was byte-identical before
and after, confirming `sizeTo` did not fire. Then simulated a
rotation (`innerWidth` `375`→`812`) with the height first perturbed
to a sentinel value — the dispatched `resize` overwrote the sentinel
back to the correct measured height, confirming the width path still
re-measures. Full walk unaffected: filled confirm (date `2026-11-20`,
time `10:15`, procedure `Sourcils`, full contact fields) produced a
`window.open` call with the byte-exact template; retour returned to
step 2 with date, time, and the selected dot intact. Zero console
errors on index and areola (`read_console_messages`, `onlyErrors`).
`git diff f4-alexas-gate --stat` for this correction: `css/main.css`,
`js/form.js`, `index.html`, `servicii/areola.html`,
`servicii/in-curand.html` (pointer-only) — plus this entry in
`LEDGER.md`; cumulative branch scope against main remains exactly the
six files named in Entry #57's brief. Pointers confirmed post-edit:
`v=9` (two `form.js` consumers) / `v=50` (three `main.css`
consumers) / `v=10` (`tokens.css`, untouched).

TRIBUNAL-KILLED: the Commander's third flagged item — `.field__input`
possibly needing `font-size:16px` to stop iOS Safari's focus-zoom —
was checked against `css/main.css` before any edit and found already
true (`.field__input{…font-size:1rem…}` resolves to 16px at the
project's root font-size). No zoom fires, no fix was applied, no line
changed for it. Recorded so a future lap doesn't re-diagnose the same
non-bug.

>> BATON
STATE: `f4-alexas-gate` now carries Entry #57's full batch plus this
  mobile correction — square Swiss flag, keyboard-resize guard —
  locally verified on index and areola at mobile viewport across
  flag/keyboard-hop/rotation/full-walk checks, in-curand verified
  pointer-only. Not merged — holding for the Commander's eye.
CERTIFIED: pending Tower.
OPEN: unchanged from Entry #57 — testimonial slides 2–3 still await
  distinct ratified client quotes; Entry #51's areola.html
  prototype-note deviation, still true and untouched this lap; Entry
  #57's mobile auto-open tradeoff stands, client-accepted, unrelated
  to this correction.
NEXT: hold for the Commander's eye-gate on this pass; push and report
  HEAD SHA once cleared to push.
TRAPS: none new. General shape worth remembering: a `resize` event on
  iOS is not proof the viewport actually resized — the keyboard and
  QuickType bar both fire it on `innerHeight` alone, so any resize
  handler meant to react to real layout changes needs a width (or
  explicit dimension) guard, not just a bare listener. The
  16px-already-true finding is the mirror lesson: verify the claimed
  bug exists before spending a line fixing it.
COST: single-session mobile-correction lap, Sonnet 5, same branch,
  one CSS dimension changed (cross geometry already correct, no
  pseudo-element math redone), one resize listener gained a two-line
  width guard, one non-fix confirmed and recorded, three-file
  cache-bust rider (two `form.js` consumers, three `main.css`
  consumers).

---

## Entry #59 — 2026-08-19 — LAP F-4c: VIDEO GATE — SLIDE ENGINE RETIRED, STATIC REST STATE

**Scope:** Root-caused from the Commander's device video (frame-
analyzed): WebKit's focus-scroll teleports on step-2 fields and
scroll-jumps on keyboard dismissal, traced in code to
`.steps__track` holding `translateX(-100%)` at rest inside an
`overflow:hidden` ancestor with a JS-pinned height — the exact
ancestor combination that corrupts WebKit's scroll-into-view and
scroll-restoration math. Fixed at the root, same branch
(`f4-alexas-gate`, not merged): the wizard's rest state is now static
DOM. No transform, no pinned height, ever — the disease's absence,
not a counter-scroll.

WHAT SHIPPED:

1. Markup-first, both pages: `<div class="step" data-step="2">`
   gains the `hidden` attribute directly in the HTML, so step 2 is
   hidden before any script runs — kills the flash-of-all-steps on a
   slow load. Step 1 ships visible as before.

2. `js/form.js` slide engine retired:
   - `go(n)` no longer writes `track.style.transform`. It toggles
     `hidden` on every step — the active step loses it, every other
     step gains it — then runs the unchanged label/bars logic.
     `hidden = display:none` means input values persist under the
     hood, so retour preservation holds by construction, not by
     extra code.
   - `sizeTo()` deleted along with every call site: both calls inside
     the old `go()`, the 380ms settle `setTimeout`, the whole
     `resize` listener with F-4b's `lastWidth` guard, and the two
     remnant calls inside the reveal handler (`data-group` click) —
     the `if (!revealName) { sizeTo(...); return; }` early return
     lost only the `sizeTo` call, and the trailing `sizeTo(...)` at
     the handler's end was deleted outright. The rest of that
     handler's shape is untouched — broader dead-code cleanup there
     is a future lap, not this one. `grep -c "sizeTo" js/form.js` →
     `0`, confirmed post-edit. The now-unused `track` variable
     (`[data-steps-track]` lookup, read only by the deleted transform
     write) was removed alongside it — direct residue of this exact
     change, not separate cleanup.
   - `root.style.height` is never written anywhere in the file
     post-edit; confirmed by reading the diff, not just by grep, since
     the assignment site is gone along with `sizeTo` itself.
   - Confirm, handoff (`window.open`, blessed template incl. Heure),
     and reset (`go(1)`, navigation not wipe) flows: untouched beyond
     what deleting `sizeTo`'s call sites required — no message-
     composition or recap-read line was touched this lap.

3. `css/main.css` slide styling retired: `.steps` loses
   `overflow:hidden` and `transition:height` (margin `0 -10px` stays
   — RIDER A's shadow-clearance reasoning still holds without the
   clipping-box framing, so the comment above it was trimmed to match,
   not deleted). `.steps__track` loses `transition:transform`; no
   `transform` property is set on it anywhere. `.step` loses
   `flex:0 0 100%` — steps are full-width blocks now, `min-width:0`
   and the 10px side padding kept. New entrance: `@keyframes
   stepIn{from{opacity:0}to{opacity:1}}` and `.step{animation:stepIn
   .18s ease;}` — fires on every un-hide, including step 1 on first
   paint, which is expected and left alone (subtle, not a bug). Inside
   the existing `prefers-reduced-motion:reduce` block, `.step
   {animation:none;}` joins the pre-existing `.steps,.steps__track
   {transition:none;}` line (now itself vestigial since neither
   selector carries a transition anymore, but left as the DO
   specified — not this lap's cleanup).

4. CACHE-BUST, consumer rider: `js/form.js` `v=9`→`v=10`
   (`index.html`, `servicii/areola.html`); `css/main.css`
   `v=50`→`v=51` (`index.html`, `servicii/areola.html`,
   `servicii/in-curand.html`). `tokens.css` untouched at `v=10`,
   three consumers.

VERIFICATION — local static-server preview (scratch port; this
session's Browser pane again could not reach another chat's dev
server on the project's usual port), both pages, DOM/computed-style
reads throughout. Static-state: `.step[data-step="2"]` computed
`display:none` and `.hidden === true` at rest on fresh load (query
scoped to `.step[data-step="2"]` specifically — a same-named
`data-step="2"` exists on an unrelated `.scard` earlier in
`index.html`'s DOM and was excluded from the check); `.step[data-step
="1"]` visible; `[data-steps-track]` computed `transform: none`;
`[data-steps]` root's `style` attribute `null` (no inline height ever
written); `grep -c "sizeTo" js/form.js` → `0`; `grep -c "@keyframes
stepIn" css/main.css` → `1`. Full walk (index): `Suivant` → step 1
hides, step 2 un-hides with computed `animation-name: stepIn`, track
transform stays `none`, root stays height-unset. `Retour`
(`[data-back]`, step 2 → step 1) then `Suivant` again: date, heure,
procedure dot, and all four contact fields read back byte-identical
by direct value inspection — plain `hidden`-toggle persistence, no
recap-restore code involved. Confirm: single `window.open` call,
decoded `text=` byte-exact against the blessed template including
`Heure`, success shown, bar 3 lit, label "3. Confirmation". Post-
confirm retour (`[data-reset]`): back to step 2 with date, heure,
dot, and nom all intact. Repeated on areola with a base+extra
procedure (`Aréole + Sourcils`) — same shape, message composed
correctly. Reveal-handler surviving territory exercised: clicked the
one live `[data-group]` (procedure radiogroup, no `data-reveals` in
current markup, so the early-return path this lap touched) —
zero console errors before or after. `read_console_messages`
(`onlyErrors`) clean on index, areola, and in-curand. `git diff
f4-alexas-gate --stat` for this correction: `css/main.css`,
`js/form.js`, `index.html`, `servicii/areola.html`,
`servicii/in-curand.html` (pointer-only) — plus this entry in
`LEDGER.md`; cumulative branch scope against main remains exactly the
six files named in Entry #57's original brief. Pointers confirmed
post-edit: `v=10` (two `form.js` consumers) / `v=51` (three
`main.css` consumers) / `v=10` (`tokens.css`, untouched).

STATE FOR THE COMMANDER: this session's tooling cannot reproduce iOS
keyboard choreography — every check above is DOM state, computed
style, and console output, not an on-device replay. The true
certification of this fix is the Commander's own device gate.

>> BATON
STATE: `f4-alexas-gate` now carries Entry #57's batch, Entry #58's
  mobile correction, and this video-gate root-cause fix — wizard rest
  state is static DOM, no transform/height-pin/resize-listener
  machinery survives — locally verified on index and areola across
  static-state/full-walk/retour/confirm/console checks, in-curand
  verified pointer-only. Not merged — holding for the Commander's
  device gate.
CERTIFIED: pending Tower, and specifically pending the Commander's
  device — see STATE FOR THE COMMANDER above.
OPEN: unchanged from Entry #57 — testimonial slides 2–3 still await
  distinct ratified client quotes; Entry #51's areola.html
  prototype-note deviation, still true and untouched this lap; Entry
  #57's mobile auto-open tradeoff stands, unrelated to this fix. NEW:
  the reveal-handler's post-`sizeTo`-removal shape (the `data-group`
  click handler's `data-reveals` branch) is noted dead-code-adjacent
  and left for a future cleanup lap, per this lap's DO. The 180ms
  `stepIn` fade replacing the slide is this session's taste call, not
  a client ratification — may return as a future taste lap on the
  Commander's ruling.
NEXT: hold for the Commander's device gate on this pass; push and
  report HEAD SHA once cleared to push.
TRAPS: If the Commander's device gate still shows any focus teleport,
  do NOT improvise counter-scrolls — report; the Tower hunts the next
  transformed/filtered ancestor with the video method. Standing
  lesson from this lap: a slide/carousel built on a persistent
  `transform` inside a clipped, height-pinned ancestor is a known
  WebKit scroll-corruption shape, not just a visual technique choice —
  worth checking any *other* transform-based component (the
  confirmation-screen testimonial carousel, `data-conf-carousel`,
  still uses `ctrack.style.transform` for its slide) against the same
  risk before it ships to a real device, though it was out of this
  lap's scope and untouched.
COST: single-session root-cause lap, Sonnet 5, same branch, one JS
  function deleted with five call sites removed (two in `go()`, one
  `setTimeout`, one whole `resize` listener, two in the reveal
  handler) and one now-dead variable removed with it, three CSS rules
  stripped of their transition/transform/flex properties and one
  keyframe animation added, two markup attributes added
  (`hidden` ×2), three-file cache-bust rider (two `form.js`
  consumers, three `main.css` consumers) — no scroll/resize
  "helpers" added, the fix is subtractive.

---

## Entry #60 — 2026-08-19 — CONSTITUTIONAL AMENDMENT: `js/hero-scroll.js` v25 → v26 — FOCUS GUARD

**Scope:** `js/hero-scroll.js` has stood FROZEN since its sealing —
touched by no lap since, its blob hash carried forward as a standing
pre-flight check every session that so much as reads near it. This
entry records the freeze law's first formal exercise: a Commander-
sanctioned amendment, opened under ceremony, not drift.

RULING: the Commander's own device video, frame-analyzed, proved
WebKit focus-scroll teleports on step-2 fields and scroll-jumps on
keyboard dismissal. Code autopsy (Tower-certified) traced it to the
engine's snap-on-settle system: it reads `visualViewport.height` as
its measuring tape; the iOS keyboard shrinks that tape; the poisoned
progress math this produces drives `settle()`'s `window.scrollTo`
calls to garbage targets — down to the footer on focus, up to the
étapes on dismissal. The Commander ruled a focus guard at the
engine's choke points, and nothing else: no camera math, keyframe,
dwell segment, settle target, ease curve, or gesture logic touched.

PRE-FLIGHT (constitutional): `git hash-object js/hero-scroll.js` on
`f4-alexas-gate` before this edit —
`b14a99c3ec7b162255627044963818ef055d21b9` — matched the sealed v25
artifact exactly, confirmed before the file was opened. `index.html`
carried `hero-scroll.js?v=25` exactly once; repo-wide grep confirmed
no other page references `hero-scroll` (the QA harness under
`docs/qa/harness/` reads the real file by path for its own tests —
not a page consumer, not touched, not counted).

WHAT SHIPPED — five insertions, zero deletions, zero reformatting:

1. Header comment extended with the amendment record verbatim (the
   Commander's own text, unedited) — the file's opening block now
   documents its own v26 provenance, root cause, and re-freeze
   declaration inline.

2. `function userIsTyping()` added beside the existing listener
   block (right after `onTick`, right before the `scroll`/`resize`/
   `orientationchange`/`visualViewport` registrations): reads
   `document.activeElement`, true if it's an `input`, `textarea`, or
   `select`.

3. `onResize()` gains `if (userIsTyping()) return;` as its first
   statement — no recalc against a keyboard-shrunken viewport while a
   field is focused.

4. `settle(source)` gains `if (userIsTyping()) { khlog('settle
   suppressed: typing, source=', source); return; }` as its first
   statement — covers every settle initiator (corridor pre-empt,
   scrollend, and the 140ms debounce fallback) and the reduced-motion
   instant `scrollTo` nested inside it, since none of those paths run
   without passing through `settle()` first.

5. `easeTick()` gains `if (userIsTyping()) { activeEase = null;
   khlog('ease cancelled: typing'); return; }` immediately after the
   existing `if (!activeEase) return;` guard — defense in depth: an
   ease already mid-flight when focus lands dies instead of dragging
   the page under the user's thumb.

6. A `focusout` listener added beside the existing registrations:
   when focus leaves an `input`/`textarea`/`select` for a target that
   is itself not one of those, `onResize` fires once via `setTimeout
   (onResize, 0)` — one honest recalc against the real, un-shrunken
   viewport now that typing has truly ended. Field-to-field focus
   hops (Nom → Prénom, etc.) don't match the condition and are
   correctly skipped.

7. CACHE-BUST: `index.html`'s `hero-scroll.js?v=25` → `?v=26`. Sole
   consumer — no other pointer in the repo needed bumping this pass.

POST-EDIT: `git hash-object js/hero-scroll.js` on the amended file —
`286ad873516c9ab71e9ae28ef98a3a7bf6dac0e4`.

CONTAINER VERIFICATION: `grep -c "userIsTyping" js/hero-scroll.js` →
`4` (1 definition + 3 guard call sites, matching the three layers
above — the `focusout` listener calls `onResize`, not `userIsTyping`
directly, so it is not itself a 4th call site; the count is exactly
the definition plus Layers A/B/C). Header carries `"v26"`. Pointer
confirmed `hero-scroll.js?v=26` in `index.html`. `git diff --stat
js/hero-scroll.js`: 28 insertions, 0 deletions — purely additive,
confirmed against the pre-edit blob. NOTED DISCREPANCY, reported
plainly rather than silently reconciled: a raw `grep -c
"window.scrollTo"` now reads `5`, not the `3` named in the exit
condition — because the Commander's own verbatim header text (item 1
above) contains the prose phrase "drove `window.scrollTo` to garbage
targets," and the file already carried one pre-existing prose mention
in an untouched comment near `settleEaseDuration`. Counting only
actual `window.scrollTo(...)` invocations (the figure the exit
condition is evidently protecting — proof no settle-target logic was
touched) the count is unchanged at exactly **3**, same three call
sites, byte-identical lines, merely shifted downward by the insertions
above them — confirmed by direct line-by-line comparison against the
pre-edit file, not by regex alone.

DEVICE CERTIFICATION PROTOCOL — for the Commander, verified locally
as far as this session's tooling reaches (container tooling cannot
reproduce iOS keyboard choreography; this is not a substitute for the
device gate): opened the local preview with `?khdebug=1`, scrolled
the hero unfocused as a control — `settle`/`ease start` fired
normally, landing on the expected dwell target, log line `ease start,
duration= 337ms target= 0.4310`. Then focused a step-2 field
(`data-recap="nom"`), repeated the identical scroll — logged exactly
`settle suppressed: typing, source= debounce`, no ease started, and
`window.pageYOffset` held at the exact scrolled value with no
teleport. Full wizard walk (fill → confirm → retour) re-verified on
both index and areola with the amended engine loaded — byte-exact
WhatsApp template, all fields preserved through retour, zero console
errors on both pages throughout every check above.

RE-FREEZE DECLARATION: `js/hero-scroll.js` is FROZEN at v26 /
`286ad873516c9ab71e9ae28ef98a3a7bf6dac0e4` effective this merge. The
next amendment requires the same ruling ceremony this entry records:
Commander-certified root cause, scoped DOs, a pre-flight hash check
against this new sealed value, and a constitutional LEDGER entry at
close.

EXONERATION NOTE: Entries #58 (F-4b, the square-flag/resize-guard
mobile correction) and #59 (F-4c, the wizard slide-engine retirement)
operated on innocent organs — `js/form.js`'s own resize listener and
`.steps__track`'s transform were real defects worth fixing on their
own terms, but neither was the device video's root cause. Good
architecture, wrong patient. This entry is the actual cure; #58 and
#59 stand as correct, independent fixes, not superseded diagnoses.

DOCTRINE SEEDS — flagged for the next doctrine lap, not resolved
here: "frozen files still get autopsies — the freeze protects bytes,
not suspicion"; "any engine that writes scroll position holds fire
while the user types."

>> BATON
STATE: `f4-alexas-gate` now carries the full F-4 batch (#57–#59) plus
  this constitutional amendment — `js/hero-scroll.js` re-frozen at
  v26. Locally verified: hero scrub control/focused-suppression
  behavior, full wizard walk on both pages, zero console errors,
  purely-additive diff against the sealed pre-edit blob. Not merged —
  holding for the Commander's device gate, the only certification
  this fix can actually receive.
CERTIFIED: pending Tower; pending the Commander's device (see DEVICE
  CERTIFICATION PROTOCOL above — container tooling cannot reproduce
  iOS keyboard choreography).
OPEN: unchanged from Entry #57 — testimonial slides 2–3 still await
  distinct ratified client quotes; Entry #51's areola.html
  prototype-note deviation, still true and untouched this lap. NEW:
  the two DOCTRINE SEEDS above, unresolved, waiting for a doctrine
  lap. The `window.scrollTo` grep-count discrepancy (prose vs.
  invocation count, see CONTAINER VERIFICATION) is explained, not a
  live gate — flagged so a future audit doesn't re-discover it as a
  surprise.
NEXT: hold for the Commander's device gate on this pass, protocol
  above; push and report HEAD SHA once cleared to push.
TRAPS: the standing lesson of this whole F-4 arc: two prior laps
  (#58, #59) fixed real bugs in the wizard's own machinery while the
  actual device-video defect lived one file over, in a component
  neither lap was scoped to touch. A device video proves a symptom,
  not a location — the autopsy that finds the true choke point can
  land somewhere the symptom never visibly touches. Worth remembering
  before declaring victory on the NEXT device-reported bug after only
  fixing the first plausible-looking culprit.
COST: single-session constitutional lap, Sonnet 5, same branch, one
  frozen file opened under ceremony (pre-flight hash check, exactly
  five insertions, zero deletions, zero reformatting, post-edit hash
  recorded), one pointer bump (sole consumer), full unified diff
  supplied for line-by-line Tower review per the constitutional
  report requirement.

---

## Entry #61 — 2026-08-19 — DEVICE CERTIFICATION: THE F-4 ARC

**Scope:** The Commander's own device gate on the full F-4 arc
(Entries #57–#60: review-screen retirement, mobile flag/keyboard
guard, wizard slide-engine retirement, and the `js/hero-scroll.js`
v26 focus-guard amendment) — the certification container tooling
could not perform for itself, flagged as outstanding at the close of
every entry in the arc.

RESULT:

- **iOS Safari:** perfect. Focus stillness confirmed on the wizard's
  contact fields (no teleport, no scroll-jump on keyboard dismissal),
  the hero scrub reads unchanged from v25 by eye, and the full
  WhatsApp handoff walk holds end to end. This was the exact defect
  Entry #60's amendment targeted, and it is closed on the browser the
  device video was shot on.

- **Brave iOS:** residual scroll quirks remain. Ruled by the
  Commander as browser-specific, not a regression from this arc's
  work, and accepted as a WATCHED SEAM rather than a blocking defect.
  `?khdebug=1` remains the standing instrument for this seam — if a
  real client ever reports a jump, that query param plus the console
  is where the next investigation starts, same method as Entry #60's
  own root-cause hunt.

>> BATON
STATE: `f4-alexas-gate`'s full F-4 arc is device-certified on the
  Commander's own hardware — iOS Safari clean, Brave iOS carrying one
  accepted, browser-specific watched seam. Certification gate that
  every entry in the arc held open is now closed.
CERTIFIED: Commander's device, this entry. Tower certification
  remains as recorded per-entry above.
OPEN: unchanged from Entry #60 — testimonial slides 2–3 still await
  distinct ratified client quotes; Entry #51's areola.html
  prototype-note deviation, still true; the two doctrine seeds from
  Entry #60, unresolved. NEW watched seam: Brave iOS's residual
  scroll quirks, accepted, not queued as a fix — revisit only if a
  real client reports it, per the Commander's ruling above.
NEXT: branch is device-certified and clear to merge.
TRAPS: none new. Brave iOS's quirk is recorded here specifically so a
  future session doesn't mistake it for a regression from this arc
  and go hunting for a cause that isn't there — it was already
  present, already looked at, already ruled browser-specific.
COST: single-entry certification record, no code changed.

---

## Entry #62 — 2026-08-22 — Lap F-5: Contact à deux champs

**Scope:** Alexa's friction cut, ruled by the Commander post-tribunal
(2026-08-22, Alexa via WhatsApp 15:08). Contact step reduces from
four fields to two: Nom and Prénom merge into one field, E-mail is
removed entirely. Branch `f5-contact-deux-champs`.

**Touched:**
- `index.html` (Contact step) — Prénom `.field` block and E-mail
  `.field` block deleted; Nom relabeled "Nom et prénom (obligatoire)",
  placeholder "Ana Popescu", `autocomplete="name"` added; Téléphone
  gets `autocomplete="tel"`. Pointer `js/form.js?v=10` → `?v=11`.
- `servicii/areola.html` (Contact step) — identical twin surgery.
  Pointer `../js/form.js?v=10` → `?v=11`.
- `js/form.js` — `prenom`/`email` reads deleted; message line now
  reads `'Nom : ' + nom + ' · Téléphone : ' + tel`. No validation
  added to the merged field — autocomplete is autofill, not
  validation, per the file's own Facade-law header (line 3),
  confirmed still true.

**Verified (local preview, both pages):** contact step renders
exactly 2 fields; filled "Ana Popescu" + phone, ran Confirmer,
intercepted the composed WhatsApp string —
`Nom : Ana Popescu · Téléphone : 079 123 45 67`, no E-mail segment,
byte-identical greeting/date/heure/procédure framing. Zero console
errors, zero server errors.
`grep -in "prenom\|e-mail"` across `index.html`, `servicii/areola.html`,
`js/form.js` returns zero live references.

>> BATON
STATE: F-5 built and locally verified on branch
  `f5-contact-deux-champs`, not yet pushed or merged.
CERTIFIED: pending Tower diff-cert and ACP's eye — this session does
  not certify its own work.
OPEN: unchanged from Entry #61 — testimonial slides 2–3 still await
  distinct ratified client quotes; Entry #51's areola.html
  prototype-note deviation, still true; the two doctrine seeds from
  Entry #60, unresolved; Brave iOS watched seam, unchanged.
NEXT: push branch, hand off for Tower diff-cert against the codeload
  tarball, hold for ACP's word before any merge.
TRAPS: none. `js/hero-scroll.js` was not opened (frozen at v26, out
  of scope this lap).
COST: single-session lap, Sonnet 5, three files touched (two HTML
  field-block deletions/relabels, one JS message-line edit), two
  pointer bumps, local preview verification only.

---

## Entry #63 — 2026-08-22 — Arc F-5 shipped: contact à deux champs

**Scope:** Merge word closing the F-5 arc. Contact step drops from
four fields to two — Nom and Prénom merged into one field, "Nom et
prénom (obligatoire)" (placeholder "Ana Popescu"), E-mail removed
entirely, `autocomplete="name"`/`autocomplete="tel"` added, on both
`index.html` and `servicii/areola.html`. `js/form.js` pointer at v11
on both pages, WhatsApp message composer trimmed to match.

**Ruling source:** Alexa, WhatsApp 15:08, 2026-08-22 — tribunal-
amended ignition key. Certified by Tower diff-cert against the
codeload tarball (four-file scope, byte checks) plus dual SHA match
(branch/main HEAD verified against fetch before merge). Commander's
eye on iPhone Brave: passed.

>> BATON
STATE: F-5 merged to main; Vercel production deploy triggered by
  the push.
CERTIFIED: Tower diff-cert (four-file scope, byte checks, dual SHA)
  + Commander's eye.
OPEN: unchanged from Entry #61 — testimonial slides 2–3 still await
  distinct ratified client quotes; Entry #51's areola.html
  prototype-note deviation, still true; the two doctrine seeds from
  Entry #60, unresolved.
NEXT: relay to Alexa (2 champs done + live link); next HOTICO lap
  per Commander.
TRAPS: `js/hero-scroll.js` untouched at v26. Watch Brave iOS seam on
  the shortened contact step.

---

## Entry #64 — 2026-08-22 — Campaign close: production handoff, Laps H-1 → H-3b

**Scope:** Four-lap campaign producing and hostile-certifying the
production handoff contract, on branch `handoff-h2-draft` (cut from
`handoff-h1-evidence-map`).

- **Lap H-1** — `docs/handoff/EVIDENCE-MAP.md` authored: the coverage
  index and conflict-register seed for the handoff. Tower-certified.
- **Lap H-2** — `docs/handoff/PRODUCTION-HANDOFF.md` v1.0 drafted
  (commit `7b84ad6`) on top of the certified H-1 map: the production
  contract itself — what a developer inherits, what they're free to
  change, where the debt is. Certification pass: **pass-with-one-
  correction**.
- **Lap H-3** — hostile, independent validation (commit `c50f930`,
  `docs/handoff/VALIDATION-H3.md`): the mandated §9.3 correction
  applied and verified; a clean sweep; a hostile pass re-sampling
  five claims and ten citations, four quality tests. Findings
  **F1-F4** raised (deferred-UI convention undocumented, an
  undisclosed `ADVANCE_BIAS_FRAC` classification conflict, a
  paraphrase presented as a verbatim quote, an unsubstantiated
  self-test claim) — reported, not fixed, per that lap's charge.
- **Lap H-3b (this entry)** — F1-F4 corrected in
  `PRODUCTION-HANDOFF.md` (commit `6a54d46`, now v1.1): the
  `.is-deferred` convention documented in §4/§13/§15 with a fresh,
  independently-counted instance total (8/page on `index.html` and
  `servicii/areola.html`, 0 on `servicii/in-curand.html`) rather than
  an inherited number; the `ADVANCE_BIAS_FRAC` conflict disclosed
  verbatim from both sources (matrix: "LAW, value untouched"; code:
  "tune target for the next device walk, not a hard law") and left
  disclosed, not resolved; the tokens.css ratification quote made
  verbatim; the §1 self-test claim repointed to the real H-3
  validation. `VALIDATION-H3.md` closed with a RESOLUTION note citing
  commit `6a54d46` — its findings themselves left untouched, per the
  ground rule that a validator's record is not a place for its
  reviewer to edit.

**Ruling source:** H-3/H-3b ignition keys (Commander-issued),
hostile-validation charge distinct from the H-2 authoring session per
that charge's own "no session certifies its own work" law.

>> BATON
STATE: handoff on `handoff-h2-draft` awaiting Tower final cert +
  Commander's eye + merge.
CERTIFIED: evidence map (H-1), H-2 sampling (pass-with-one-
  correction), H-3 findings (F1-F4, now corrected at H-3b).
OPEN: C5 phone fix lap (the `tel:`/WhatsApp country-code mismatch,
  `PRODUCTION-HANDOFF.md` §15/§18 — client question, not a developer
  call); `_ingest/` ruling (untracked image-conversion staging
  directory, present since before H-1, explicitly out of every
  handoff lap's scope so far); `docs/POLARIS.md` retirement ruling
  (Conflict C1, superseded-but-un-trashed); repo visibility + webdev
  delivery scope — Commander ruling required before any external
  repo access is granted.
NEXT: merge = ship, then webdev handover.
TRAPS: the exclusion sweep stays dumb — its pattern lives in the
  campaign ignition keys only, never reproduced in repo documents,
  never "improved," even under a false hit; the standing
  Commander-only exclusion is absolute.

## Entry #65 — 2026-09-28 — Lap C-0b: source re-intake

**Prior state:** the handoff merge (`a6fb0bc`, branch
`handoff-h2-draft`) landed on main without a close entry. This entry
records it as merged; Entry #64's BATON (`NEXT: merge = ship`) is
thereby discharged.

**Scope:** the three trilingual source workbooks in `content/source/`
replaced, byte-exact (`cp`, never opened or re-saved), with
Alexandra's September Drive versions. Repo filenames unchanged.

| File | Outgoing size | Outgoing sha256 | Incoming size | Incoming sha256 |
|---|---|---|---|---|
| `content/source/hotico-content-en.xlsx` | 80,113 B | `e6ccee900737bc7f9c1099178570d8c813d11182e930c2515ce0605b96f2bb9c` | 54,639 B | `2098ef701c6398307d153c8fcc7f403f12eaa3b7de4e28b2f85294f6e0eab56b` |
| `content/source/hotico-content-fr.xlsx` | 83,603 B | `21d20ae183251835ff19af114a6df34156ad5710743a67968eb33a6f8d086641` | 59,260 B | `66f1025e054ace543e2614277524c731899c1a6afd8323737b96df0f2ef94752` |
| `content/source/hotico-content-ro.xlsx` | 88,090 B | `0432d314d5d157ee1fa1b6d79f163b54eadc887c0849310598141217c5a942d7` | 63,204 B | `a320b145bdd5ed534ee91e6c4240880bafcd53ef5383201a74f9b59c7df5126a` |

**Provenance:** Alexandra's Drive, Commander-downloaded (Drive names
`Engleza/Franceza/Romana link-uri video + text hotico.ink (3).xlsx`),
Tower-diffed 2026-09-28. Incoming hashes verified before copy and
re-verified in the repo after copy.

**Diff summary (Tower T2, from cell-level comparison), verbatim:**
all 3 langs: 5 homepage carousel bodies rewritten by
Alexandra (~50% shorter; FR home now "tu"); FAQ numbering
removed; "another procedure?" form row now on all 6 service
sheets. FR: manifesto Vimeo changed to 1143404826; eyeliner
pigments Vimeo 1134716206 added (closes Alexa-batch item a).
RO: placeholders replaced, diacritics fixed. Areola sheet:
rows below booking block shifted ~85 rows down (content
identical). NOT fixed: FR scars pain answer still duplicates
pigments answer.

**Declared staleness:**
- `content/fr.json` and `content/fr-review.md` now mirror the
  PREVIOUS FR workbook; re-extraction = Lap C-1b.
- `PRODUCTION-HANDOFF.md` / `EVIDENCE-MAP.md` sizes are historical
  evidence, intentionally not edited.
- Conflict C3: the refonte duplicate
  (`docs/spec/refonte/hotico-fr-content.xlsx`) is no longer
  byte-identical to `content/source/` FR.

**Ruling source:** Lap C-0b ignition key + input-source amendment
(Commander-issued).

>> BATON
STATE: branch `c0b-source-reintake` — 3 workbooks re-intaken, PR
  open, not merged.
CERTIFIED: pending Tower.
OPEN: C5 phone fix lap; `_ingest/` ruling; `docs/POLARIS.md`
  retirement ruling (C1); Conflict C3 (refonte FR duplicate now
  divergent); FR scars pain answer duplicating pigments answer
  (client-side, unfixed in source); repo visibility + webdev
  delivery scope.
NEXT: Lap C-1b — re-extraction FR+EN+RO from the new workbooks.
TRAPS: bytes are the law — never open/re-save/convert the xlsx; any
  re-extraction reads them, never writes them. Areola sheet rows
  shifted ~85 down: row-indexed extraction will misread it.
HARNESS: 0 tests [n/a — uninstrumented] · last full eval n/a ·
  signals n/a

**Merged:** PR #35 → main at `2fd3847`, 2026-09-28.
CERTIFIED: Tower PASS 2026-09-28 (fresh-clone cert: 3 sha256 +
sizes match input, diff scope 3 binaries + LEDGER pure-append).

## Entry #66 — 2026-09-28 — Lap C-1b: les trois voix (trilingual re-extraction)

**Scope:** the three C-0b source workbooks re-extracted into structured
JSON through a committed, re-runnable extractor. `content/fr.json`
refreshed; `content/en.json` and `content/ro.json` created; the three
`*-review.md` files regenerated/created. Extraction only: no page, no
css/js, no `docs/`, no `_ingest/`, no `content/source/` touched.

**Inputs (sha256, verified before and after, unchanged):**
- en `2098ef701c6398307d153c8fcc7f403f12eaa3b7de4e28b2f85294f6e0eab56b`
- fr `66f1025e054ace543e2614277524c731899c1a6afd8323737b96df0f2ef94752`
- ro `a320b145bdd5ed534ee91e6c4240880bafcd53ef5383201a74f9b59c7df5126a`

**Extractor:** `tools/extract_content.py` (Python 3, openpyxl
`read_only=True`; built with openpyxl 3.1.5 on Python 3.9.6). One run
writes both `content/<lang>.json` and `content/<lang>-review.md`:

    python tools/extract_content.py fr
    python tools/extract_content.py en
    python tools/extract_content.py ro

Cells are located by label (`titlu video`, `cta intrebari`, `pasul 3`,
…), URL shape, column header and block structure — never coordinates.
Every placed cell is ledgered; any cell left over lands in `_unplaced`.
Audit: every JSON string (bar the `cont` prefix-stripped fields the
schema already derived in C-1) equals a source cell byte-for-byte, and
placed + unplaced = all cells (fr 379, en 377, ro 413). Review-renderer
fidelity: rendering the OLD `fr.json` reproduces the OLD
`fr-review.md` byte-for-byte, plus one addition (YouTube URL index, for
"every URL listed") and a new Unplaced section.

**Determinism:** two full runs, identical sha256 on all six outputs:
- fr.json `d4c5632678362b723ab6ec9281daae3f1642e91f817d62841eee639d62eedad2`
- en.json `e2d4f39d0c9f3d7381ff568e9b49610f2dd32b8cf92535766872099e357f4217`
- ro.json `82bceab12147000b974f75d634b1cf389e936194cdb4adee936445b4c13c98b6`
- fr-review.md `d50d9bb0bd1df65a00522265e6857508f94af5bdb4517be8827690eada206f2d`
- en-review.md `fccbd18aaa77c97747be72ed0c13a4b336b909bf59e129baf332b21991308055`
- ro-review.md `ce3640039e5ea26a8dffa065c33e5702168a410f67ae87e5db2f9846bdb6a9b9`

**Counts:** strings (non-null leaves outside `_meta`/`_unplaced`) /
characters / Vimeo / YouTube / `_unplaced`:
fr 395 / 108,127 / 57 / 57 / 0 · en 394 / 94,980 / 57 / 57 / 0 ·
ro 415 / 97,650 / 57 / 57 / 14. Per sheet (all three languages
identical): Home 5+5, areola 7+7, alopecie 8+8, cicatrici 8+8, spr 9+9,
eyeliner 8+8, buze 8+8, LP para 1+1, lp cosmetic 1+1, cont 2+2.
No URL is shared between languages.

**Schema reading (flag for Tower):** the key tree of C-1 `fr.json` is
held in all three files. Two readings needed a call: (1) on the five
non-areola service pages `form_notes` was `null` in C-1 because the
step-2 row didn't exist; it now exists on all six sheets, so
`form_notes` takes areola's shape with unfilled slots null.
(2) `_meta.source_sha256` and top-level `_unplaced` added per key.

**Parity (non-null in one language, null/absent in another):**
- FR↔EN: FR-only `areola.form_notes.questions[2].branching`,
  `questions[3].branching`, `free_text.note`; EN-only
  `areola.form_notes.questions[0].extra`, `spr._sheet_labels.A1`.
- FR↔RO: FR-only `lp_cosmetic._headers.youtube`; RO-only
  `areola.form_notes.questions[0].extra` and, on alopecie, cicatrici,
  spr, eyeliner, buze: `form_notes.step3.row_label`, `.step3.heading`,
  `.intro`, `.branching_column_header` (20 paths).
- EN↔RO: EN-only `spr._sheet_labels.A1`, `lp_cosmetic._headers.youtube`;
  RO-only `areola.form_notes.questions[2].branching`, `[3].branching`,
  `free_text.note` + the same 20 RO-only form-block paths.
All list lengths match across languages (FAQ 7/8/8/9/8/8, carousel 5,
steps 3×3, areola questions 16).

**`_unplaced`:** fr 0, en 0, ro 14 — `s. areola` I4 (unlabelled line
beside the Galerie tab), `s. areola` K26 (whitespace-only), and the
twelve `<- TITLU` / `<- TEXT EXPLICATIV` arrows (C102/C103 on areola;
C100/C101 on the five other service sheets).

**Source defects observed — reported, NOT fixed:**
- EN `s.alopecie` B3 — questions intro is Romanian text.
- FR `s. cicatrici` C6 (pain answer) byte-identical to C5 (pigments).
- EN `s. areola` F105, F106 — no branching cell for the radiotherapy and
  chemotherapy questions (FR/RO carry one).
- EN `s. areola` — no free-text note next to B120 (FR C121 / RO C122).
- EN `spr` — `titlu video` in A1, title in B2, A2 empty; B1 holds the
  column header. Extractor placed B2 as title.
- RO `lp cosmetic` A1 — YouTube URL in the header row, no header.
  FR `lp cosmetic` header B1 sits over an A2 URL (column mismatch).
- RO `LP para` A2 — same video (R0d-AAGRoPk) as RO `Home Page` C5.
- RO `Home Page` C3 — YouTube URL with a trailing space.
- RO five service sheets rows 100–101 — medical-form header block with
  no questions beneath it.
- FR `s. areola` A5, A7–A10 still numbered ("2. " … "10. "), contrary to
  C-0b's "FAQ numbering removed".
- Leading spaces / quote marks (kept verbatim): FR `s.alopecie` A8,
  `s. cicatrici` A8; EN `s. areola` A5, A7, A8, `s.alopecie` A5, A7, A8,
  `s. cicatrici` B3, `buze` A10; RO `spr` B2, `s. cicatrici` B3,
  `s. areola` I4. RO `s. areola` A6 double space.
- EN `Home Page` B24 "We here for you" (no "CTA:" prefix, verb missing).
Language scan: EN `s.alopecie` B3 is the only content cell whose
language doesn't match its workbook.

**Ruling source:** Lap C-1b ignition key (Commander-issued).

>> BATON
STATE: branch `c1b-trilingual-extract` — extractor + 3 JSON + 3 review
  files committed, PR open, not merged.
CERTIFIED: pending Tower.
OPEN: the source defects above (client-side, unfixed in source); schema
  reading on non-areola `form_notes` (null → object) awaits Tower;
  C5 phone fix lap; `_ingest/` ruling; `docs/POLARIS.md` retirement
  ruling (C1); Conflict C3 (refonte FR duplicate divergent); repo
  visibility + webdev delivery scope.
NEXT: Tower cert of C-1b; then the overlay lap (C-2b adaptations live
  there, never in the mirror).
TRAPS: the JSON is a mirror — any correction goes in the overlay, never
  in `content/*.json` by hand (the next extractor run would erase it).
  Columns drift per language (FAQ answers B/C, Vimeo G/H, step-2 text
  B/C, areola form block rows 101/100/102): never add coordinates to
  the extractor. `row` in `form_notes.questions` is the source row
  and moves when the workbook moves.
HARNESS: 0 tests [n/a — uninstrumented] · last full eval n/a ·
  signals n/a

**Merged:** PR #36 → main at `66a94b8`, 2026-09-28.
CERTIFIED: Tower PASS 2026-09-28 (fresh-clone re-run: 6 outputs
byte-identical, verbatim audit clean, FR delta = C-0b diff;
form_notes reading accepted).

## Entry #67 — 2026-09-28 — Lap C-1c: le dictionnaire (dev export)

**Scope:** `tools/extract_content.py` gains a `merge` mode that writes
ONE developer-facing file, `content/translations.json`: one block per
text, each block `{ro, en, fr}`, keyed by dotted ID from the key path
(`page.section.element`, list items numbered from 1, e.g.
`alopecie.faq.3.answer`). New source `content/source/ui-labels.json`
holds eight `nav.*` labels. No xlsx, no `content/{fr,en,ro}.json`, no
review file, no html/css/js/docs touched.

**Commander override (2026-09-28):** the eight `nav.*` UI labels
(areola, scars, alopecia, brows, eyeliner, lips, home, account) are
Commander-authored, not Alexandra's text. They sit first in the export.

**Command:**

    python tools/extract_content.py merge

**Input gate:** `python tools/extract_content.py fr|en|ro` re-run
(openpyxl 3.1.5 in a scratch venv, not in the repo) before and after
the extractor edit: all six committed outputs byte-identical.

**Rules applied:** Romanian key order is the baseline; an ID missing
from RO goes right after the ID before it in its own language. Values
are copied verbatim (URLs included, since videos differ per language).
`null` means the language lacks the text. Excluded, never exported:
`_meta`, `_unplaced`, `_sheet_labels`, `_headers`, `row`, `row_label`,
`*_row_label`, `branching_column_header`, `note`, `branching`.
`_meta` of the export: lap, command, law, and the four sources with
sha256 (ui-labels `55c32e66…f219`; ro/en/fr = the C-1b hashes).

**EXIT REPORT**

(a) 402 blocks (8 nav + 394 content). All 3 languages: 319. Missing
ro 72 · missing en 82 · missing fr 83. The 72 missing-ro blocks are all
all-null, so no block has FR/EN text without RO. All-null blocks
(72) are the schema's empty slots: `home.hero.h1`, `home.pasii.intro`,
`home.pasii.steps.{1,2,3}.body`, `home.form.{labels,options,confirmation}`,
`home.reviews.items`, `home.footer`, `<service>.pricing` ×6,
`<service>.gallery` ×6, `areola.form_notes.questions.N.{options,extra}`
for N = 2, 5–16 (26), `<5 non-areola>.tabs`, `.form_notes.step3`,
`.form_notes.questions`, `.form_notes.free_text` (20),
`lp_para.text`, `lp_cosmetic.text`, `cont.videos.2.cta`,
`cont.videos.2._verbatim.cta`.

(b) RO-only blocks (10): `alopecie.form_notes.step3.heading`,
`alopecie.form_notes.intro`, `cicatrici.form_notes.step3.heading`,
`cicatrici.form_notes.intro`, `spr.form_notes.step3.heading`,
`spr.form_notes.intro`, `eyeliner.form_notes.step3.heading`,
`eyeliner.form_notes.intro`, `buze.form_notes.step3.heading`,
`buze.form_notes.intro`.

(c) FR/EN-only IDs (5, all all-null): `<page>.form_notes.step3` for
alopecie, cicatrici, spr, eyeliner, buze. Each placed right after
`<page>.form_notes.step2.text`, just before RO's
`<page>.form_notes.step3.heading`. Cause: FR/EN hold `step3: null`
where RO holds a `step3` object, so the null leaf becomes its own ID.
Kept, never dropped, per key. FLAG for Tower: each of these IDs is
a prefix of an RO-only ID (`…step3` / `…step3.heading`).

(d) Determinism: merge run twice, identical sha256
`0960330727987e001a45a17c2a9a05a1387d23a34d646ebb545874d394c10664`.
Verbatim audit: every content block value equals the flattened source
leaf (0 mismatches); IDs unique.

(e) Excluded paths (counted at the exclusion point; ro / en / fr):
- `_meta` 1/1/1 · `_unplaced` 1/1/1 (top level)
- `_sheet_labels` 7/7/7: home, areola, alopecie, cicatrici, spr,
  eyeliner, buze
- `_headers` 2/2/2: lp_para, lp_cosmetic
- `row` 16/16/16: `areola.form_notes.questions.N.row`
- `row_label` 17/12/12: `home.hero`, `home.services_menu`,
  `home.form.gdpr`, `home.form.cancellation`, `areola.tabs`,
  `<6 service>.form_notes.step2`, `areola.form_notes.step3`, and
  (RO only) `<5 non-areola>.form_notes.step3`
- `*_row_label` 20/20/20: `home.hero.cta_row_label`,
  `<6 service>.intro.{title,cta,questions}_row_label`,
  `cont.vimeo_row_label`
- `branching_column_header` 6/6/6: `<6 service>.form_notes`
- `note` 17/17/17: `areola.form_notes.questions.N.note` (16),
  `areola.form_notes.free_text.note`
- `branching` 16/16/16: `areola.form_notes.questions.N.branching`
Totals: ro 103 · en 98 · fr 98.

(f) Exported blocks containing a flagged string (report only, export
verbatim):
- `home.pasii.steps.1.items.3`: ro "pasul" (page prose: "să fac
  pasul către tine", not an instruction)
- `areola.form_notes.questions.1.options`: ro/en/fr "coloana"
- `areola.form_notes.questions.1.extra`: ro "Coloana"
- `areola.form_notes.questions.3.options`: ro/fr "Coloana"
- `areola.form_notes.questions.3.extra`: ro "Coloana"
- `areola.form_notes.questions.4.options`: fr "Coloana"
None for "daca", "->", "bifeaz".

**Not in the exclusion list, exported as-is (FLAG for Tower):**
`cont.videos.{1,2}.slot` (Romanian slot keys "pregatire",
"intretinere"), and `cont.videos.{1,2}._verbatim.{youtube,title,cta,vimeo}`
(prefixed duplicates of the clean title/cta/url blocks). That is 10
blocks.

**Tower corrections carried:**
"Tower error (C-0b entry #65): the diff summary said FAQ
numbering was removed in all 3 languages; FR s. areola A5,
A7–A10 keep it. Caught by the C-1b Hands against source."
"The C-1b BATON's NEXT (overlay lap) is superseded by
Commander priority: C-1c first, overlay after."

**Ruling source:** Lap C-1c ignition key (Commander-issued), and the
Commander override of 2026-09-28 for the nav labels.

>> BATON
STATE: branch `c1c-dev-export`: extractor merge mode + ui-labels +
  translations.json committed, PR open, not merged.
CERTIFIED: pending Tower.
OPEN: FR/EN `step3: null` vs RO object gives 5 all-null prefix IDs
  (c). `slot` / `_verbatim` exported because they are not in the
  exclusion list. "Coloana"/"coloana" column scaffolding inside areola
  form option values (f). All C-1b OPEN items stand (source defects,
  C5 phone fix, `_ingest/`, POLARIS retirement C1, Conflict C3, repo
  visibility + webdev delivery scope).
NEXT: Tower cert of C-1c; then the overlay lap (C-2b adaptations).
TRAPS: `translations.json` is generated. Never hand-edit it; re-run
  `merge` after any `content/<lang>.json` change (its `_meta` hashes
  will drift otherwise). The nav labels live only in
  `content/source/ui-labels.json`. The site does not read `content/`
  at runtime.
HARNESS: 0 tests [n/a — uninstrumented] · last full eval n/a ·
  signals n/a

CERTIFIED: Tower PASS-WITH-CORRECTIONS 2026-09-30 (fresh clone: 3
lang outputs byte-identical; translations.json sha 0960330727987e00…
reproduced twice; verbatim audit 0 mismatches; scope 4 files; LEDGER
pure-append). Corrections C1-C2 carried by Lap C-1d, stacked on this
branch by Tower ruling; merges with it.

## Entry #68 — 2026-09-30 — Lap C-1d: sacred source

**Branch:** `c1d-sacred-source`, cut from `origin/c1c-dev-export`
(8498a34; origin/main 925e160). Stacked on the unmerged C-1c by Tower
ruling; one merge carries both.

**What changed:**
- The Commander's three workbooks are now the canonical source,
  byte-copied (never opened or re-saved) into `content/source/`.
  Provenance: folder `~/Downloads/TEXTE ALEXANDRA GOOD`; originals
  `Engleza link-uri video + text hotico.ink.xlsx` → `hotico-content-en.xlsx`,
  `Franceza link-uri video + text hotico.ink.xlsx` → `hotico-content-fr.xlsx`,
  `Romana link-uri video + text hotico.ink.xlsx` → `hotico-content-ro.xlsx`.
  sha256 verified before and after copy: en 0ec15813…, fr 03ffa097…,
  ro 126996bc…. Downloads untouched.
- `python tools/extract_content.py fr|en|ro` re-run. en.json and
  ro.json identical to before outside `_meta`; fr.json differs only at
  `home.carousel[0].vimeo_url` (→ `https://vimeo.com/1143404826?share=copy`)
  and `_meta`.
- C1: `slot` and `_verbatim` added to `EXCLUDE_KEYS` (10 blocks out).
- C2: merge drops all-null blocks whose ID is a strict prefix of another
  ID (5 blocks, each reported): `alopecie|cicatrici|spr|eyeliner|buze
  .form_notes.step3`. `MERGE_LAP = "C-1d"`.
- `translations.json`: 387 blocks (402 − 10 − 5); only content change
  `home.carousel.1.vimeo_url` fr; zero prefix collisions; verbatim audit
  942 values, 0 mismatches; merge run twice, sha256 identical
  (292846ec…).

**Tower corrections carried:**
"Tower error (certification of PRODUCTION-HANDOFF, 2026-08-23):
§19 states `node matrix.js && node sens.js` pass 210/210 and 52/52.
Since the v26 focus guard (2026-08-19) both crash on main: the
harness DOM shim lacks `document.addEventListener`. Engine intact:
with a 2-line shim patch in a scratch copy, matrix 210/210 and
sens ALL ASSERTIONS PASS (Tower, 2026-09-30). Shim repair parked
to backlog; not fixed in this lap."

**Ruling source:** Lap C-1d ignition key v3 (Commander-issued) and
Tower ruling of 2026-09-30 on branch stacking.

>> BATON
STATE: branch `c1d-sacred-source` (stacked on `c1c-dev-export`), PR open
  to main, not merged. Carries the C-1c commits; C-1c PR stays open.
CERTIFIED: C-1c by Tower PASS-WITH-CORRECTIONS 2026-09-30. C-1d pending
  Tower.
OPEN: harness shim repair (backlog). Conflict C3
  (`docs/spec/refonte/hotico-fr-content.xlsx`) stays logged. Source
  defects not fixed. "Coloana" scaffolding in areola option values;
  C-1b/C-1c OPEN items stand (C5 phone fix, `_ingest/`, POLARIS
  retirement C1, repo visibility + webdev delivery scope).
NEXT: Tower cert of C-1d; Commander merges once; then the overlay lap.
TRAPS: `translations.json` is generated; never hand-edit, re-run
  `merge` after any `content/<lang>.json` change. Extraction needs
  `openpyxl` (not installed system-wide; used a scratch venv). The
  workbooks are sha-identified, never re-save them.
HARNESS: 0 tests [n/a — uninstrumented; docs/qa harness crashes on main,
  see Tower error above] · last full eval n/a · signals n/a

**Merged:** PR #38 → main at `0a86926` (merge commit), 2026-09-30.
Carries C-1c + C-1d. CERTIFIED: Tower PASS 2026-09-30 (fresh clone:
extractor outputs and translations.json byte-identical on re-run, sha
292846ec…6f43 twice; 387 blocks; 1 content change; verbatim audit
0 mismatches; LEDGER pure-append).

## Entry #69 — 2026-09-30 — Lap C-2: the overlay (scaffolding strip)

**Branch:** `c2-overlay`, cut from main at `028dbc6` (after the Entry #68
merge record; origin/main code tip `0a86926`).

**What changed:**
- NEW `content/source/overlay.json` (Commander-authored): five entries
  stripping Alexandra's annotations to the developer ("CTA:", "buton")
  from `home.form.cta` (ro, fr) and `home.form.next_button` (ro, en, fr).
  Ruling: Commander 2026-09-30. sha256 c92a2163…d0c6.
- `tools/extract_content.py`: `OVERLAY` constant; `merge()` applies each
  entry after the prefix drop. Current value must equal `expect`
  byte-for-byte, else exit 1 naming the entry. `_meta` gains the overlay
  in `sources` and `overlay_applied` (the five pairs); `MERGE_LAP = "C-2"`.
- `content/translations.json` regenerated: 387 blocks, same keys and
  order; exactly the five values differ from main, plus `_meta`.
- Mirrors untouched: `content/{ro,en,fr}.json` and `*-review.md`
  byte-identical to main after re-running the extractor. No xlsx, html,
  css, js or docs touched. EN "We here for you" left as client text.

**Verification:** merge run twice, sha256 identical (5d0be763…498b).
Audit: every non-null value equals its source leaf except the five
overlay pairs (equal to overlay value); nav.* equal ui-labels.json;
0 mismatches. Negative test (scratch copy, one `expect` altered): merge
aborted exit 1 naming the entry; nothing from scratch committed.

>> BATON
STATE: branch `c2-overlay`, PR open to main, not merged.
CERTIFIED: C-1c + C-1d by Tower PASS 2026-09-30 (merged, PR #38). C-2
  pending Tower.
OPEN: harness shim repair (backlog). Conflict C3
  (`docs/spec/refonte/hotico-fr-content.xlsx`) stays logged. Source
  defects not fixed. "Coloana" scaffolding in areola option values; EN
  "We here for you" is client text (stays). C-1b/C-1c OPEN items stand
  (C5 phone fix, `_ingest/`, POLARIS retirement C1, repo visibility +
  webdev delivery scope).
NEXT: Tower cert of C-2; Commander merges once.
TRAPS: `translations.json` is generated; never hand-edit, re-run `merge`
  after any `content/<lang>.json` or overlay change. Overlay `expect` is
  byte-exact (EN next_button has a trailing space); a source fix upstream
  makes merge abort until the overlay entry is retired. Extraction needs
  `openpyxl` (scratch venv).
HARNESS: 0 tests [n/a — uninstrumented; docs/qa harness crashes on main,
  see Tower error in Entry #68] · last full eval n/a · signals n/a

## Entry #70 — 2026-10-02 — Landing-page spec filed (doc-only) + Entry #69 merge record

**Merge record (overdue):** `c2-overlay` merged to main as `7fe7804` on 2026-09-30
(PR #39). Entry #69's BATON said "not merged"; main's tip said otherwise. One entry
behind reality for two days — MINOR, same pattern as the #64/#a6fb0bc gap in August.

**What landed (doc-only; lap LP-F-1 on branch `lp-spec-filing`, PR to main, Commander merges; Tower cert from raw pull):**
- `docs/spec/landing/LP-SECTION-LIBRARY.md` — v0.1. The 19-section eyebrow brief
  (custom-GPT output, used by Alexandra) dissected into 13 atoms, 4 scopes
  (universal / audience / service / family), media-slot inventory, form contract,
  copy gates, open rulings R1–R6. Authorities: STRUCTURE = brief (1:1) ·
  COPY = Alexandra, ratified + tic-audited per language · VISUALS = canon.
- `docs/spec/landing/lp-sprancene-ro.html` — the brief made visual, HOTICO canon,
  responsive at the tokens breakpoints (768 / 1024). Production footer shape with the
  brief's mandatory content. Header per R1 (lockup + language + WhatsApp, no nav).
- `docs/spec/landing/lp-sprancene-ro--sticky.html` — same page with the R2 sticky
  mobile CTA, for the Commander's eye. R2 undecided.
Both pages: `noindex,nofollow`; logos from `/assets/brand/`; copy = brief as received,
UNRATIFIED; photos = labelled placeholders. Mockup, not production.

**Rulings this entry records:** R1 header ratified 27.09. Door question of 19.09
(proto / new repo / webdev) superseded 30.09 by events: production is the React +
Vite port on Firebase; landing pages are proposed as ROUTES in that codebase (R6,
pending Hus's word on where the code lives and who builds).

**Tower error, owned:** the section-library spec existed only in a chat from 27.09 to
02.10. "Files are the institution" — five days late to its own law.

>> BATON
STATE: branch `lp-spec-filing` cut from `7fe7804`; PR open to main, awaiting Commander's merge. No LP code exists anywhere. Spec + mockup filed.
CERTIFIED: C-2 (Tower PASS 30.09, merged). This entry's files: pending Tower raw-pull cert.
OPEN: R2 sticky CTA · R3 paramedical brief · R4 the 27 grid · R5 legal pages RO/EN ·
  R6 LP foundation (React repo location, builder) · Alexandra fact-ratification of ~15 claims ·
  photos + consent (critical path) · harness shim repair · C5 phone · `_ingest/` · POLARIS retirement C1.
NEXT: Hus answers R6 → Phase R for the LP module (CLAUDE.md laws, Polaris EXTERNAL-USER, LP-0 build key).
TRAPS: mockup HTML is NOT a build seed — fork the intent (sections, scopes), not the markup.
  `translations.json` is generated; `lp_para.*` / `lp_cosmetic.*` are seeds with text:null.
HARNESS: 0 tests [n/a — uninstrumented; docs/qa harness crashes on main, Entry #68] · last full eval n/a · signals n/a

### Merge record — 2026-10-02 — LP-F-1 → main

`lp-spec-filing` merged as `8f91d5a` (PR #40, merge commit, parents `7fe7804` · `0332a58`).
Tower certification from raw pull: branch point ✓ · scope ✓ (3 files + LEDGER, 0 deletions) ·
sha256 ×3 ✓ · Entry #70 byte-identical ✓. Commander's eye: live on Vercel, approved.
Main tip is now `8f91d5a`; the next lap branches from the current tip, never from this SHA.
