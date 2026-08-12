# The Gesture Matrix — certified choreography spec

**Source session:** R-2f « LE COULOIR » executor session (Opus), the lap that
carried the original object plus three bounces and three addenda.
**Authored:** 2026-08-08 / 2026-08-09. **Recovered to file:** 2026-08-11.
**Lap record:** `LEDGER.md` entry #39. **Merge:** `a4a275f`, PR #26.
**Graded build at authoring:** `js/hero-scroll.js` v24.

**Certified result:** **210 / 210 asserted cells satisfy their invariant, 0
mismatched**, out of 240 total cells (30 are N/A — see *Unreachable cells*).
Plus four added gesture families: **go-home 12, launch 14, keyboard 8, rail 18
= 52**, all passing.

> **Ledger correction required.** Entry #39 credits the families as
> *"go-home 12, launch 14, keyboard 8, rail 32"*. The rail figure is wrong: the
> harness runs 7 origin→destination pairs plus 2 mid-flight interrupts per
> viewport, over 2 viewports = **18**, not 32. The 32 was an arithmetic error in
> the PR report that was carried into the ledger. This artifact is
> authoritative; the ledger wants the correction. Nothing was invented here to
> close the gap.

**The ruling it was graded under — amended intentions.** Every cell is graded
against an invariant *stated before the run*, never against a re-derivation of
the code (which would be tautological). Where a gesture ends among the stops and
is above the drift threshold, the outcome belongs to the certified 30/70
coverage bias and only I2 is asserted.

---

## The invariants (the engine's constitution)

| | invariant | source |
|---|---|---|
| **I1** | drift immunity — a gesture ≤ `DOOR_COMMIT_VH` never changes which stop you are on | R-2f Addendum 2 |
| **I2** | *(amended)* one semantic stop per gesture **in the story direction** (downward). Downward is byte-identical and Alopécie stays unskippable; **upward is navigation and lands nearest, unclamped** — going home is a destination, not a page of the story | R-2d, amended by Addendum 3 |
| **I3** | door obedience — a committed gesture ending inside a door segment resolves the way you travelled, never against your own thumb | R-2f Door Rule |
| **I4** | border supremacy — a gesture ending at or past the Southern Border is never captured at all | R-2f Southern Border |
| **I5** | agreement — mobile and desktop resolve identically | all |
| **I6** | reduced motion gets real content, not broken animation; the static experience remains complete | external audit §38 |
| **I7** | native scroll remains the physical source of truth; the hero augments scrolling rather than replacing browser scrolling | external audit §38 |
| **I8** | paint may lag scroll, semantic interaction must not; pointer/focus state follows target visibility and jurisdiction rather than waiting for the visual opacity chase | external audit §38 |

**I6–I8 are NOT exercised by this matrix.** They were appended to the ledger by
Tower reconciliation after the lap closed. I7 is structurally safe (zero
`preventDefault` was a standing guardrail, verified every lap). I6 and I8 have
no cells: the reduced-motion path is dead code behind the `js-kh` gate and was
never exercised, and I8's pointer/focus rule was satisfied by reasoning recorded
at the time (R-2e keyed `pointer-events` to `targetFadeT`, not `renderedFadeT`)
rather than by a test. **Holding I6 and I8 to the standard of I1–I5 requires new
cells that do not exist.**

---

## The two constants the grading depends on

| constant | value | what it governs |
|---|---|---|
| `DOOR_COMMIT_VH` | **7.5** | the single knob: launch eagerness *and* exit commitment. Above it a gesture is a decision and the door obeys its direction; below it the gesture is noise and the segment returns you to the side you started on. |
| `ADVANCE_BIAS_FRAC` | **0.20** | the certified 30/70 coverage bias. **LAW, value untouched**; its *jurisdiction* was retired from the two long gaps (launch and exit segments), never its number. |

## Geometry the cells are placed against (mobile 390×844)

Measured from the Aréole stop. Coverage is of the Aréole→release gap.

| landmark | offset | coverage |
|---|---|---|
| Aréole stop (settle target) | +0.0vh | 0.0% |
| Aréole dwell END — exit segment begins | +9.5vh | 10.9% |
| fade corridor lower edge | +12.1vh | 13.9% |
| `ADVANCE_BIAS_FRAC` 30% advance line | +26.1vh | 30.0% |
| Southern Border (release−50vh) | +37.1vh | 42.6% |
| release | +87.1vh | 100.0% |

The exit gap is **87.1vh** — roughly twice the ~43vh mid-film gaps the bias was
tuned against. `establish → Sourcils` is **77.6vh** for the same reason
(`FIRST_TRANS_BONUS`). Those two long gaps are the whole story of this lap.

---

## Reading the outcomes

| outcome | meaning |
|---|---|
| `STAY` | ended on the stop it started on |
| `ADVANCE-1` / `RETREAT-1` | moved exactly one stop |
| `ARÉOLE` / `RELEASE` | resolved to that specific stop (door verdict) |
| `STOP idxN` | resolved to a stop, from a non-stop origin |
| `UNCAPTURED (…)` | the film declined jurisdiction and left it where it landed |
| `SKIP to idxN (!)` | moved more than one stop — an I2 violation **downward**; legal upward under the amendment |

**Every one of the 240 cells resolved identically on mobile (390×844) and
desktop (1280×720)** — I5 holds with no exceptions, so the two viewport columns
are collapsed below into a single outcome column.

---

## The matrix — all 240 cells

| # | region | gesture | dir | input | invariant | expected | outcome | verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | establish | drift 3vh | down | touch | I1 drift immunity | STAY | STAY | ok |
| 2 | establish | drift 3vh | down | wheel | I1 drift immunity | STAY | STAY | ok |
| 3 | establish | drift 3vh | up | touch | — | N/A | N/A | n/a |
| 4 | establish | drift 3vh | up | wheel | — | N/A | N/A | n/a |
| 5 | establish | relaunch 10vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 6 | establish | relaunch 10vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 7 | establish | relaunch 10vh | up | touch | — | N/A | N/A | n/a |
| 8 | establish | relaunch 10vh | up | wheel | — | N/A | N/A | n/a |
| 9 | establish | lazy 15vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 10 | establish | lazy 15vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 11 | establish | lazy 15vh | up | touch | — | N/A | N/A | n/a |
| 12 | establish | lazy 15vh | up | wheel | — | N/A | N/A | n/a |
| 13 | establish | committed 40vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 14 | establish | committed 40vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 15 | establish | committed 40vh | up | touch | — | N/A | N/A | n/a |
| 16 | establish | committed 40vh | up | wheel | — | N/A | N/A | n/a |
| 17 | establish | violent 120vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 18 | establish | violent 120vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 19 | establish | violent 120vh | up | touch | — | N/A | N/A | n/a |
| 20 | establish | violent 120vh | up | wheel | — | N/A | N/A | n/a |
| 21 | Sourcils | drift 3vh | down | touch | I1 drift immunity | STAY | STAY | ok |
| 22 | Sourcils | drift 3vh | down | wheel | I1 drift immunity | STAY | STAY | ok |
| 23 | Sourcils | drift 3vh | up | touch | I1 drift immunity | STAY | STAY | ok |
| 24 | Sourcils | drift 3vh | up | wheel | I1 drift immunity | STAY | STAY | ok |
| 25 | Sourcils | relaunch 10vh | down | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 26 | Sourcils | relaunch 10vh | down | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 27 | Sourcils | relaunch 10vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 28 | Sourcils | relaunch 10vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 29 | Sourcils | lazy 15vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 30 | Sourcils | lazy 15vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 31 | Sourcils | lazy 15vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 32 | Sourcils | lazy 15vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 33 | Sourcils | committed 40vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 34 | Sourcils | committed 40vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 35 | Sourcils | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 36 | Sourcils | committed 40vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 37 | Sourcils | violent 120vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 38 | Sourcils | violent 120vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 39 | Sourcils | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 40 | Sourcils | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 41 | Eyeliner | drift 3vh | down | touch | I1 drift immunity | STAY | STAY | ok |
| 42 | Eyeliner | drift 3vh | down | wheel | I1 drift immunity | STAY | STAY | ok |
| 43 | Eyeliner | drift 3vh | up | touch | I1 drift immunity | STAY | STAY | ok |
| 44 | Eyeliner | drift 3vh | up | wheel | I1 drift immunity | STAY | STAY | ok |
| 45 | Eyeliner | relaunch 10vh | down | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 46 | Eyeliner | relaunch 10vh | down | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 47 | Eyeliner | relaunch 10vh | up | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 48 | Eyeliner | relaunch 10vh | up | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 49 | Eyeliner | lazy 15vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 50 | Eyeliner | lazy 15vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 51 | Eyeliner | lazy 15vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 52 | Eyeliner | lazy 15vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 53 | Eyeliner | committed 40vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 54 | Eyeliner | committed 40vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 55 | Eyeliner | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 56 | Eyeliner | committed 40vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 57 | Eyeliner | violent 120vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 58 | Eyeliner | violent 120vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 59 | Eyeliner | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | SKIP to idx0 (!) | ok |
| 60 | Eyeliner | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | SKIP to idx0 (!) | ok |
| 61 | Alopécie | drift 3vh | down | touch | I1 drift immunity | STAY | STAY | ok |
| 62 | Alopécie | drift 3vh | down | wheel | I1 drift immunity | STAY | STAY | ok |
| 63 | Alopécie | drift 3vh | up | touch | I1 drift immunity | STAY | STAY | ok |
| 64 | Alopécie | drift 3vh | up | wheel | I1 drift immunity | STAY | STAY | ok |
| 65 | Alopécie | relaunch 10vh | down | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 66 | Alopécie | relaunch 10vh | down | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 67 | Alopécie | relaunch 10vh | up | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 68 | Alopécie | relaunch 10vh | up | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 69 | Alopécie | lazy 15vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 70 | Alopécie | lazy 15vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 71 | Alopécie | lazy 15vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 72 | Alopécie | lazy 15vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 73 | Alopécie | committed 40vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 74 | Alopécie | committed 40vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 75 | Alopécie | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 76 | Alopécie | committed 40vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 77 | Alopécie | violent 120vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 78 | Alopécie | violent 120vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 79 | Alopécie | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | SKIP to idx0 (!) | ok |
| 80 | Alopécie | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | SKIP to idx0 (!) | ok |
| 81 | Lèvres | drift 3vh | down | touch | I1 drift immunity | STAY | STAY | ok |
| 82 | Lèvres | drift 3vh | down | wheel | I1 drift immunity | STAY | STAY | ok |
| 83 | Lèvres | drift 3vh | up | touch | I1 drift immunity | STAY | STAY | ok |
| 84 | Lèvres | drift 3vh | up | wheel | I1 drift immunity | STAY | STAY | ok |
| 85 | Lèvres | relaunch 10vh | down | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 86 | Lèvres | relaunch 10vh | down | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 87 | Lèvres | relaunch 10vh | up | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 88 | Lèvres | relaunch 10vh | up | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 89 | Lèvres | lazy 15vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 90 | Lèvres | lazy 15vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 91 | Lèvres | lazy 15vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 92 | Lèvres | lazy 15vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 93 | Lèvres | committed 40vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 94 | Lèvres | committed 40vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 95 | Lèvres | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 96 | Lèvres | committed 40vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 97 | Lèvres | violent 120vh | down | touch | I3 door obedience | DOWNWARD | ADVANCE-1 | ok |
| 98 | Lèvres | violent 120vh | down | wheel | I3 door obedience | DOWNWARD | ADVANCE-1 | ok |
| 99 | Lèvres | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | SKIP to idx1 (!) | ok |
| 100 | Lèvres | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | SKIP to idx1 (!) | ok |
| 101 | Cicatrices | drift 3vh | down | touch | I1 drift immunity | STAY | STAY | ok |
| 102 | Cicatrices | drift 3vh | down | wheel | I1 drift immunity | STAY | STAY | ok |
| 103 | Cicatrices | drift 3vh | up | touch | I1 drift immunity | STAY | STAY | ok |
| 104 | Cicatrices | drift 3vh | up | wheel | I1 drift immunity | STAY | STAY | ok |
| 105 | Cicatrices | relaunch 10vh | down | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 106 | Cicatrices | relaunch 10vh | down | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 107 | Cicatrices | relaunch 10vh | up | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 108 | Cicatrices | relaunch 10vh | up | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 109 | Cicatrices | lazy 15vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 110 | Cicatrices | lazy 15vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 111 | Cicatrices | lazy 15vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 112 | Cicatrices | lazy 15vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 113 | Cicatrices | committed 40vh | down | touch | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 114 | Cicatrices | committed 40vh | down | wheel | I2 one-stop (amended) | BIAS | ADVANCE-1 | ok |
| 115 | Cicatrices | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 116 | Cicatrices | committed 40vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 117 | Cicatrices | violent 120vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 118 | Cicatrices | violent 120vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 119 | Cicatrices | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | SKIP to idx2 (!) | ok |
| 120 | Cicatrices | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | SKIP to idx2 (!) | ok |
| 121 | Aréole | drift 3vh | down | touch | I1 drift immunity | STAY | STAY | ok |
| 122 | Aréole | drift 3vh | down | wheel | I1 drift immunity | STAY | STAY | ok |
| 123 | Aréole | drift 3vh | up | touch | I1 drift immunity | STAY | STAY | ok |
| 124 | Aréole | drift 3vh | up | wheel | I1 drift immunity | STAY | STAY | ok |
| 125 | Aréole | relaunch 10vh | down | touch | I3 door obedience | DOWNWARD | ADVANCE-1 | ok |
| 126 | Aréole | relaunch 10vh | down | wheel | I3 door obedience | DOWNWARD | ADVANCE-1 | ok |
| 127 | Aréole | relaunch 10vh | up | touch | I2 one-stop (amended) | BIAS | STAY | ok |
| 128 | Aréole | relaunch 10vh | up | wheel | I2 one-stop (amended) | BIAS | STAY | ok |
| 129 | Aréole | lazy 15vh | down | touch | I3 door obedience | DOWNWARD | ADVANCE-1 | ok |
| 130 | Aréole | lazy 15vh | down | wheel | I3 door obedience | DOWNWARD | ADVANCE-1 | ok |
| 131 | Aréole | lazy 15vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 132 | Aréole | lazy 15vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 133 | Aréole | committed 40vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 134 | Aréole | committed 40vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 135 | Aréole | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 136 | Aréole | committed 40vh | up | wheel | I2 one-stop (amended) | BIAS | RETREAT-1 | ok |
| 137 | Aréole | violent 120vh | down | touch | I4 border supremacy | AT-RELEASE | ADVANCE-1 | ok |
| 138 | Aréole | violent 120vh | down | wheel | I4 border supremacy | AT-RELEASE | ADVANCE-1 | ok |
| 139 | Aréole | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | SKIP to idx3 (!) | ok |
| 140 | Aréole | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | SKIP to idx3 (!) | ok |
| 141 | exit strip | drift 3vh | down | touch | I1 drift immunity | NEAR-SIDE | ARÉOLE | ok |
| 142 | exit strip | drift 3vh | down | wheel | I1 drift immunity | N/A | N/A | n/a |
| 143 | exit strip | drift 3vh | up | touch | I1 drift immunity | NEAR-SIDE | ARÉOLE | ok |
| 144 | exit strip | drift 3vh | up | wheel | I1 drift immunity | N/A | N/A | n/a |
| 145 | exit strip | relaunch 10vh | down | touch | I3 door obedience | DOWNWARD | RELEASE | ok |
| 146 | exit strip | relaunch 10vh | down | wheel | I3 door obedience | N/A | N/A | n/a |
| 147 | exit strip | relaunch 10vh | up | touch | I2 one-stop (amended) | BIAS | UNCAPTURED (idx6+1vh) | ok |
| 148 | exit strip | relaunch 10vh | up | wheel | I2 one-stop (amended) | N/A | N/A | n/a |
| 149 | exit strip | lazy 15vh | down | touch | I3 door obedience | DOWNWARD | RELEASE | ok |
| 150 | exit strip | lazy 15vh | down | wheel | I3 door obedience | N/A | N/A | n/a |
| 151 | exit strip | lazy 15vh | up | touch | I2 one-stop (amended) | BIAS | ARÉOLE | ok |
| 152 | exit strip | lazy 15vh | up | wheel | I2 one-stop (amended) | N/A | N/A | n/a |
| 153 | exit strip | committed 40vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 154 | exit strip | committed 40vh | down | wheel | I4 border supremacy | N/A | N/A | n/a |
| 155 | exit strip | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | STOP idx5 | ok |
| 156 | exit strip | committed 40vh | up | wheel | I2 one-stop (amended) | N/A | N/A | n/a |
| 157 | exit strip | violent 120vh | down | touch | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 158 | exit strip | violent 120vh | down | wheel | I4 border supremacy | N/A | N/A | n/a |
| 159 | exit strip | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | STOP idx3 | ok |
| 160 | exit strip | violent 120vh | up | wheel | I2 one-stop (amended) | N/A | N/A | n/a |
| 161 | corridor | drift 3vh | down | touch | I1 drift immunity | NEAR-SIDE | ARÉOLE | ok |
| 162 | corridor | drift 3vh | down | wheel | I1 drift immunity | N/A | N/A | n/a |
| 163 | corridor | drift 3vh | up | touch | I1 drift immunity | NEAR-SIDE | ARÉOLE | ok |
| 164 | corridor | drift 3vh | up | wheel | I1 drift immunity | N/A | N/A | n/a |
| 165 | corridor | relaunch 10vh | down | touch | I3 door obedience | DOWNWARD | RELEASE | ok |
| 166 | corridor | relaunch 10vh | down | wheel | I3 door obedience | N/A | N/A | n/a |
| 167 | corridor | relaunch 10vh | up | touch | I3 door obedience | UPWARD | ARÉOLE | ok |
| 168 | corridor | relaunch 10vh | up | wheel | I3 door obedience | N/A | N/A | n/a |
| 169 | corridor | lazy 15vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 170 | corridor | lazy 15vh | down | wheel | I4 border supremacy | N/A | N/A | n/a |
| 171 | corridor | lazy 15vh | up | touch | I3 door obedience | UPWARD | ARÉOLE | ok |
| 172 | corridor | lazy 15vh | up | wheel | I3 door obedience | N/A | N/A | n/a |
| 173 | corridor | committed 40vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 174 | corridor | committed 40vh | down | wheel | I4 border supremacy | N/A | N/A | n/a |
| 175 | corridor | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | STOP idx5 | ok |
| 176 | corridor | committed 40vh | up | wheel | I2 one-stop (amended) | N/A | N/A | n/a |
| 177 | corridor | violent 120vh | down | touch | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 178 | corridor | violent 120vh | down | wheel | I4 border supremacy | N/A | N/A | n/a |
| 179 | corridor | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | STOP idx4 | ok |
| 180 | corridor | violent 120vh | up | wheel | I2 one-stop (amended) | N/A | N/A | n/a |
| 181 | free zone hi | drift 3vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 182 | free zone hi | drift 3vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 183 | free zone hi | drift 3vh | up | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 184 | free zone hi | drift 3vh | up | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 185 | free zone hi | relaunch 10vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 186 | free zone hi | relaunch 10vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 187 | free zone hi | relaunch 10vh | up | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 188 | free zone hi | relaunch 10vh | up | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 189 | free zone hi | lazy 15vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 190 | free zone hi | lazy 15vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 191 | free zone hi | lazy 15vh | up | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 192 | free zone hi | lazy 15vh | up | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 193 | free zone hi | committed 40vh | down | touch | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 194 | free zone hi | committed 40vh | down | wheel | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 195 | free zone hi | committed 40vh | up | touch | I3 door obedience | UPWARD | ARÉOLE | ok |
| 196 | free zone hi | committed 40vh | up | wheel | I3 door obedience | UPWARD | ARÉOLE | ok |
| 197 | free zone hi | violent 120vh | down | touch | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 198 | free zone hi | violent 120vh | down | wheel | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 199 | free zone hi | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | STOP idx4 | ok |
| 200 | free zone hi | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | STOP idx4 | ok |
| 201 | free zone lo | drift 3vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 202 | free zone lo | drift 3vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 203 | free zone lo | drift 3vh | up | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 204 | free zone lo | drift 3vh | up | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 205 | free zone lo | relaunch 10vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 206 | free zone lo | relaunch 10vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 207 | free zone lo | relaunch 10vh | up | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 208 | free zone lo | relaunch 10vh | up | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 209 | free zone lo | lazy 15vh | down | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 210 | free zone lo | lazy 15vh | down | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 211 | free zone lo | lazy 15vh | up | touch | I3 door obedience | UPWARD | ARÉOLE | ok |
| 212 | free zone lo | lazy 15vh | up | wheel | I3 door obedience | UPWARD | ARÉOLE | ok |
| 213 | free zone lo | committed 40vh | down | touch | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 214 | free zone lo | committed 40vh | down | wheel | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 215 | free zone lo | committed 40vh | up | touch | I2 one-stop (amended) | BIAS | ARÉOLE | ok |
| 216 | free zone lo | committed 40vh | up | wheel | I2 one-stop (amended) | BIAS | ARÉOLE | ok |
| 217 | free zone lo | violent 120vh | down | touch | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 218 | free zone lo | violent 120vh | down | wheel | I4 border supremacy | AT-RELEASE | RELEASE | ok |
| 219 | free zone lo | violent 120vh | up | touch | I2 one-stop (amended) | BIAS | STOP idx4 | ok |
| 220 | free zone lo | violent 120vh | up | wheel | I2 one-stop (amended) | BIAS | STOP idx4 | ok |
| 221 | site | drift 3vh | down | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 222 | site | drift 3vh | down | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 223 | site | drift 3vh | up | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 224 | site | drift 3vh | up | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 225 | site | relaunch 10vh | down | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 226 | site | relaunch 10vh | down | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 227 | site | relaunch 10vh | up | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 228 | site | relaunch 10vh | up | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 229 | site | lazy 15vh | down | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 230 | site | lazy 15vh | down | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 231 | site | lazy 15vh | up | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 232 | site | lazy 15vh | up | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 233 | site | committed 40vh | down | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 234 | site | committed 40vh | down | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 235 | site | committed 40vh | up | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 236 | site | committed 40vh | up | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 237 | site | violent 120vh | down | touch | I4 border supremacy | UNCAPTURED | STAY | ok |
| 238 | site | violent 120vh | down | wheel | I4 border supremacy | UNCAPTURED | STAY | ok |
| 239 | site | violent 120vh | up | touch | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |
| 240 | site | violent 120vh | up | wheel | I4 border supremacy | UNCAPTURED | UNCAPTURED (free zone) | ok |

### Unreachable cells (the 30 N/A)

| region | why N/A |
|---|---|
| `establish`, all **up** gestures (10 cells) | already at the top of the page; there is nothing above establish to travel to. |
| `exit strip`, all **wheel** gestures (10 cells) | not reachable as a wheel *gesture origin*. Any wheel motion through the strip is one continuous burst (gesture boundary = 140ms of wheel silence), and if you pause, corridor pre-emption settles you out within 33ms. Reachable on **touch**, where `touchstart` delimits a new gesture mid-motion — those cells are graded. |
| `corridor`, all **wheel** gestures (10 cells) | same reason. |

These are **not** UNRECOVERED — they are cells the machine cannot be placed in,
and the harness marks them so deliberately rather than inventing a placement.

---

## The four added families (Addendum 3) — 52 assertions

### A. GO HOME — amended I2: upward is navigation, lands nearest

A violent up-flick to the page top from a deep stop, with and without an iOS rubber-band bounce. Under the **old symmetric clamp** these descended 3–5 stops from the top; the autopsy log recorded the machine calling it `action= advance` while the user was going home.

| # | assertion | detail | result |
|---|---|---|---|
| 1 | go home from Lèvres mobile +bounce | landed establish | **PASS** |
| 2 | go home from Lèvres mobile | landed establish | **PASS** |
| 3 | go home from Cicatrices mobile +bounce | landed establish | **PASS** |
| 4 | go home from Cicatrices mobile | landed establish | **PASS** |
| 5 | go home from Aréole mobile +bounce | landed establish | **PASS** |
| 6 | go home from Aréole mobile | landed establish | **PASS** |
| 7 | go home from Lèvres desktop +bounce | landed establish | **PASS** |
| 8 | go home from Lèvres desktop | landed establish | **PASS** |
| 9 | go home from Cicatrices desktop +bounce | landed establish | **PASS** |
| 10 | go home from Cicatrices desktop | landed establish | **PASS** |
| 11 | go home from Aréole desktop +bounce | landed establish | **PASS** |
| 12 | go home from Aréole desktop | landed establish | **PASS** |

### B. THE LAUNCH — one deliberate flick launches, drifts settle home

One deliberate flick off the establishing frame. Threshold is `DOOR_COMMIT_VH` measured in **raw scroll px** — `progress × total` pins to 0 across the header offset, so a 15vh flick at the page top used to register as *zero net*. Launches at 8vh; drifts ≤7vh settle home.

| # | assertion | detail | result |
|---|---|---|---|
| 1 | launch 3vh touch | landed establish | **PASS** |
| 2 | launch 3vh wheel | landed establish | **PASS** |
| 3 | launch 5vh touch | landed establish | **PASS** |
| 4 | launch 5vh wheel | landed establish | **PASS** |
| 5 | launch 7vh touch | landed establish | **PASS** |
| 6 | launch 7vh wheel | landed establish | **PASS** |
| 7 | launch 8vh touch | landed Sourcils | **PASS** |
| 8 | launch 8vh wheel | landed Sourcils | **PASS** |
| 9 | launch 10vh touch | landed Sourcils | **PASS** |
| 10 | launch 10vh wheel | landed Sourcils | **PASS** |
| 11 | launch 15vh touch | landed Sourcils | **PASS** |
| 12 | launch 15vh wheel | landed Sourcils | **PASS** |
| 13 | launch 25vh touch | landed Sourcils | **PASS** |
| 14 | launch 25vh wheel | landed Sourcils | **PASS** |

### C. KEYBOARD — §31: a foreign scroll after rest opens a gesture

Inputs that raise no `wheel` and no `touch`. Covered by the foreign-scroll hook: exactly one foreign scroll after a confirmed rest opens a gesture.

| # | assertion | detail | result |
|---|---|---|---|
| 1 | PageDown x3 from Sourcils walks forward: mobile | from idx1 -> idx2 idx3 idx4 | **PASS** |
| 2 | Home from Cicatrices -> establish: mobile | landed establish | **PASS** |
| 3 | End from Eyeliner -> past release, uncaptured: mobile | p=1.650 (>=1 = below release, untouched) | **PASS** |
| 4 | Space then PageUp returns: mobile | idx3 -> idx4 -> idx2 | **PASS** |
| 5 | PageDown x3 from Sourcils walks forward: desktop | from idx1 -> idx2 idx3 idx4 | **PASS** |
| 6 | Home from Cicatrices -> establish: desktop | landed establish | **PASS** |
| 7 | End from Eyeliner -> past release, uncaptured: desktop | p=1.727 (>=1 = below release, untouched) | **PASS** |
| 8 | Space then PageUp returns: desktop | idx3 -> idx4 -> idx2 | **PASS** |

### D. RAIL — §30: the rail's own smooth scroll is OURS, not a gesture

A rail click must land exactly on its stop from any origin. On v23 `rail establish → Aréole` landed on **Sourcils** — clamped to origin+1 — and §31's new hook would have made it worse. The rail now seeds its anchor at the destination.

| # | assertion | detail | result |
|---|---|---|---|
| 1 | rail establish -> stop 4 mobile | current landed Lèvres | **PASS** |
| 2 | rail establish -> stop 6 mobile | current landed Aréole | **PASS** |
| 3 | rail Eyeliner -> stop 1 mobile | current landed Sourcils | **PASS** |
| 4 | rail Eyeliner -> stop 4 mobile | current landed Lèvres | **PASS** |
| 5 | rail Eyeliner -> stop 6 mobile | current landed Aréole | **PASS** |
| 6 | rail Cicatrices -> stop 1 mobile | current landed Sourcils | **PASS** |
| 7 | rail Cicatrices -> stop 4 mobile | current landed Lèvres | **PASS** |
| 8 | rail ride interrupted by touch: mobile | landed Alopécie | **PASS** |
| 9 | rail ride interrupted by wheel: mobile | landed Alopécie | **PASS** |
| 10 | rail establish -> stop 4 desktop | current landed Lèvres | **PASS** |
| 11 | rail establish -> stop 6 desktop | current landed Aréole | **PASS** |
| 12 | rail Eyeliner -> stop 1 desktop | current landed Sourcils | **PASS** |
| 13 | rail Eyeliner -> stop 4 desktop | current landed Lèvres | **PASS** |
| 14 | rail Eyeliner -> stop 6 desktop | current landed Aréole | **PASS** |
| 15 | rail Cicatrices -> stop 1 desktop | current landed Sourcils | **PASS** |
| 16 | rail Cicatrices -> stop 4 desktop | current landed Lèvres | **PASS** |
| 17 | rail ride interrupted by touch: desktop | landed Alopécie | **PASS** |
| 18 | rail ride interrupted by wheel: desktop | landed Alopécie | **PASS** |

---

## Re-running this matrix, and diffing a change against it

From the repo root:

```sh
cd docs/qa/harness
node matrix.js            # grade the working tree: expect 210/210, 0 mismatched
node sens.js              # the four families: expect 52 PASS, 0 FAIL
MD=1 node matrix.js       # collapsed markdown table
node matrix.js ./snapshots/v22.js   # grade any historical build
```

Neither script needs a snapshot. `sens.js` prints a v23 comparison column only
if `snapshots/v23.js` exists, and grades the current build either way.

**To diff a change:** run `matrix.js` before and after. Compare the `SUMMARY`
line first, then the per-cell verdicts. **A cell that changes verdict is a
choreography change and must be ruled on, not absorbed** — that is the entire
purpose of this artifact. The lap that produced it changed cell verdicts four
separate times, and each one was a Commander ruling, not a refactor.

**A green matrix proves only that the cells you thought to write are green.**
This one passed on the exact build it was written to indict, because its gesture
set omitted the Commander's own 10vh flick (defect D4). When a defect is found on
glass that the matrix did not catch, the correct response is a new cell, not a
louder assertion.

---

## Provenance and limits

Every number here comes from the **real shipped `js/hero-scroll.js`** executed
under a Node DOM shim with a synthetic 60fps frame clock — real constants, real
closures, real `.style` writes. The preview sandbox reports
`document.hidden === true`, which kills `requestAnimationFrame` *and* throttles
timers, so no time-domain code can be traced in a browser here at all.

It is the real code. **It is not a device.** Momentum is modelled, not captured.
Feel was certified only on the Commander's glass, every lap, and this matrix
never substituted for that.
