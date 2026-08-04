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
