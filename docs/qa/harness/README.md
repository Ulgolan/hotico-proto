# R-2f scroll-feel harness

Recovered artifact. Authored 2026-08-08/09 during the R-2f « LE COULOIR »
executor session; emitted as permanent files 2026-08-11. Lap record: `LEDGER.md`
entry #39. The rendered spec is [`../gesture-matrix.md`](../gesture-matrix.md).

Plain Node. No build system, no dependencies, no install step.

## Quick start

```sh
cd docs/qa/harness
node matrix.js      # the 240-cell gesture matrix — expect 210/210, 0 mismatched
node sens.js        # the four added families — expect 52 PASS, 0 FAIL
```

Both grade the working tree's `js/hero-scroll.js` and need no snapshots.
Everything else is a trace tool or a historical comparison; see
[`snapshots/README.md`](snapshots/README.md).

## Why a Node harness and not a browser

The preview sandbox reports `document.hidden === true`, which kills
`requestAnimationFrame` **and** throttles timers to ~1Hz. No time-domain code
can be traced in-browser at all (ledger #37/#38, re-confirmed in #39). These
scripts evaluate the **real** `js/hero-scroll.js` inside a DOM shim with a
synthetic 60fps frame clock — real constants, real closures, real `.style`
writes.

It is the real code. **It is not a device.** Momentum is modelled, not captured.
Feel was certified only on the Commander's glass.

## Files

| file | what it verifies |
|---|---|
| `harness.js` | the engine — DOM shim, virtual frame clock, virtual scroller. Models touch, wheel (fired *before* its motion), coalesced vs separate scroll notification, iOS rubber-band overscroll, native smooth-scroll, timers, rAF. |
| `probe.js` | timeline geometry and the original lap object — the white room. Corridor sweeps measuring in-window rest, white duration, paint tail. |
| `gest.js` | the shared gesture driver, expressed in vh of scroll travel. |
| **`matrix.js`** | **the 240-cell gesture matrix — the certified choreography spec.** |
| **`sens.js`** | **the four added families: go-home, launch, keyboard, rail.** |
| `verify.js` | white-room suite: frame-level DOM trace, no-rest/oscillation, instrumented clamp check. |
| `verify2.js` | the touch gate — the slow half-swipe that seized the device. |
| `door.js` | the Door Rule — the Aréole jail, plus the 16-combination deadlock proof. |
| `border.js` | the Southern Border — free-zone no-capture, both faces of the abduction. |
| `addendum.js` | the stale anchor — straggler 64, chained committed swipes. |
| `chain.js` | the S1-vs-S2 discriminator, run against v17 to convict before fixing. |
| `autopsy.js` | Addendum 3 step 0 — the go-home descent, autopsied before the law changed. |
| `repro2.js` | Addendum 2 step 1 — both crimes reproduced before fixing. |
| `variants.js` + `compare.js` | generate and compare candidate mechanisms; this pair proved Tower mechanism (a) was dead code. |
| `touch.js` | bounce-1 reproduction: coalesced vs separate notification. |

Every file carries a header naming what it verifies and which defects lived in
it.

## Known defects (ledger entry #39) — all fixed, all named in-file

| | defect | lived in |
|---|---|---|
| D1 | `wheel` fired **after** the frame's motion; a real wheel event fires before the scroll it causes. At a large per-frame step this shifted the gesture anchor a whole stop and made a legal origin−1 landing read as a clamp violation. | `harness.js` |
| D2 | a khlog line containing the exact substring `settle, source=` was double-counted as a second settle. | counters; log reworded in `hero-scroll.js` |
| D3 | a loop bound re-evaluated `rem` as the drag consumed it, halving every link's travel and turning committed swipes into lazy ones. | `addendum.js` |
| D4 | **false-passing matrix set** — the gesture set omitted the Commander's own 10vh flick and the free-zone region sat outside the abduction band, so the matrix passed on the build it was written to indict. | `matrix.js` |
| D5 | a block replacement deleted `scrollTotalPx`/`fadeTAtProgress` along with the old door. | `hero-scroll.js` edit |
| D6 | `WHEEL_GESTURE_GAP_MS` cached a `var` declared ~750 lines later — hoisted, undefined, every comparison false; would have shipped the wheel path still broken. | `hero-scroll.js`, caught here |
| D7 | the discriminator used 100%-coverage links, which land exactly on a stop, trip `SETTLE_EPS`, confirm rest and refresh the anchor — a false all-clear with zero settles fired. | `chain.js` |
| D8 | a boundary filter used `>= 50` where `fadeT` is already 1 **at** 50, mis-scoping the Southern Border row itself. | `verify.js` |

D4 and D7 are the two worth internalising: **both were suites that could not
fail.** A green run means only that the cells you thought to write are green.

## Changes made during recovery

Only what portability required, noted here so the diff is not mistaken for
tampering:

- the absolute path to `js/hero-scroll.js` became `path.resolve(__dirname,
  '../../../js/hero-scroll.js')`;
- snapshot paths moved to `./snapshots/`;
- `sens.js` treats its v23 comparison column as optional instead of crashing
  when the snapshot is absent;
- `touch.js` no longer shells out to `git show` to fetch its own snapshot — it
  now fails with a message pointing at `snapshots/README.md`. **Do not restore
  an automatic git invocation.**

No assertion, threshold, gesture or expectation was altered. `matrix.js` and
`sens.js` produce the same results as at authoring: 210/210 and 52 PASS.
