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
