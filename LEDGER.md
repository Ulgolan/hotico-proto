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
