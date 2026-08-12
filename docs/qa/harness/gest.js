//
// ---------------------------------------------------------------------------
// R-2f SCROLL-FEEL HARNESS — recovered artifact.
// Authored 2026-08-08/09 in the R-2f "LE COULOIR" executor session; emitted as
// a permanent file by the recovery lap. LEDGER entry #39 is the lap record.
//
// WHY A NODE HARNESS AND NOT A BROWSER: the preview sandbox reports
// document.hidden === true, which kills requestAnimationFrame AND throttles
// timers to ~1Hz, so no time-domain code can be traced in-browser at all
// (ledger #37/#38 precedent, re-confirmed in #39). These scripts execute the
// REAL js/hero-scroll.js under a DOM shim with a synthetic 60fps frame clock:
// real constants, real closures, real .style writes. It is the real code. It is
// NOT a device — feel was only ever certified on the Commander's glass.
// ---------------------------------------------------------------------------
// WHAT THIS VERIFIES: nothing on its own — the shared gesture driver.
// Everything is expressed in vh of SCROLL TRAVEL, because that is the unit the
// Commander's recordings are measured in.
//
//   gesture(sim, v, g, vhTravel, dir, 'touch')  40% dragged, touchend, then
//                                               60% as decaying iOS momentum
//   gesture(sim, v, g, vhTravel, dir, 'wheel')  the whole travel as wheel input
//   park()      places the sim at a landmark the legal way (walking stop to
//               stop, or drifting into the free zone) rather than teleporting
//   describe()  names a position in human terms (stop / exit mid / free zone)
//
// LEDGERED HARNESS DEFECTS (entry #39). All are FIXED in these files; they are
// named here because the doctrine now expects them found, and because a future
// session must know which failure modes this harness has already had:
//   D1  harness fired `wheel` AFTER the frame's motion. A real wheel event
//       fires BEFORE the scroll it causes; at a large per-frame step this
//       shifted the gesture anchor by a whole stop and made a legal origin-1
//       landing read as a clamp violation.            [harness.js]
//   D2  a khlog line containing the exact substring "settle, source=" was
//       double-counted as a second settle.            [counters; log reworded
//                                                      in hero-scroll.js]
//   D3  a loop bound re-evaluated `rem` as the drag consumed it, halving every
//       link's travel below the 30% line and turning committed swipes into
//       lazy ones.                                    [addendum.js chained()]
//   D4  FALSE-PASSING MATRIX SET: the gesture set omitted the Commander's own
//       10vh flick and the free-zone region sat outside the abduction band, so
//       the matrix passed on the very build it was meant to indict.
//                                                      [matrix.js]
//   D5  a block replacement deleted scrollTotalPx/fadeTAtProgress along with
//       the old door.                                 [hero-scroll.js edit]
//   D6  WHEEL_GESTURE_GAP_MS cached a `var` declared ~750 lines later —
//       hoisted, undefined, every comparison false, which would have shipped
//       the wheel path still broken.                  [hero-scroll.js; caught
//                                                      by this harness]
// Two further defects recorded in the same entry's narrative:
//   D7  the S1/S2 discriminator used 100%-coverage links, which land exactly
//       on a stop, trip SETTLE_EPS, confirm rest and refresh the anchor — a
//       false all-clear with zero settles fired.      [chain.js]
//   D8  a boundary filter used `>= 50` where fadeT is already 1 AT 50, so the
//       Southern Border row itself was mis-scoped.    [verify.js]
//

'use strict';
// Shared gesture driver for R-2f ADDENDUM 2 (LA PORTE ENTIÈRE).
// Everything is expressed in vh of scroll travel, because that is the unit the
// Commander's recordings are measured in.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom } = require('./probe');

const AREOLE = 6, RELEASE = 7;

// timeline landmarks, in progress (recomputed from the file's own constants
// by probe.js, so these stay honest if the timeline ever moves)
function landmarks(v) {
  const g = geom(v);
  const DWELL = 0.0502793;              // one dwell's own length in progress
  return {
    g,
    areoleMid: SETTLE_TARGETS[AREOLE],
    areoleDwellEnd: SETTLE_TARGETS[AREOLE] + DWELL / 2,
    corridorLo: 1 - 0.75 * v.vh / g.total,
    border: 1 - 0.50 * v.vh / g.total,
    release: 1
  };
}
const vhToP = (vh, v, g) => (vh / 100) * v.vh / g.total;
const pToVh = (p, v, g) => p * g.total / v.vh * 100;
const P = (sim, v, g) => (sim.scrollY - v.wrapTopAbs) / g.total;
const idxOf = (p) => { let n = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[n] - p)) n = i; }); return n; };

function mkSim(file, vpName) {
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: true });
  sim.stepFrame(null);
  return { sim, v, g };
}

// wheel-driven stop-to-stop positioning (one gesture per stop)
function walkTo(sim, idx, v, g) {
  for (let i = 1; i <= idx; i++) {
    const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
    let rem = to - sim.scrollY;
    const n = Math.ceil(Math.abs(rem) / 24) + 2;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < n; f++) sim.stepFrame(gf);
    for (let f = 0; f < 90; f++) sim.stepFrame(null);
  }
}

// One gesture of `vhTravel` vh in direction `dir`.
//   input 'touch': touchstart, 40% of the travel dragged, touchend, the
//                  remaining 60% as decaying iOS momentum.
//   input 'wheel': the whole travel as wheel-driven scroll.
function gesture(sim, v, g, vhTravel, dir, input) {
  const totalPx = (vhTravel / 100) * v.vh;
  if (input === 'touch') {
    const dragPx = totalPx * 0.4, momPx = totalPx * 0.6;
    sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
    let rem = dir * dragPx;
    const step = Math.max(6, dragPx / 8);
    const n = Math.ceil(dragPx / step) + 1;
    const gf = () => { if (Math.abs(rem) < 0.5) return; const d = Math.abs(rem) < step ? rem : Math.sign(rem) * step; rem -= d; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d))); };
    for (let f = 0; f < n; f++) sim.stepFrame(gf);
    sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
    let vel = dir * momPx * 0.07;
    for (let f = 0; f < 160; f++) {
      sim.stepFrame(() => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + vel))); vel *= 0.93; });
    }
  } else {
    let rem = dir * totalPx;
    const step = Math.max(6, totalPx / 12);
    const n = Math.ceil(totalPx / step) + 1;
    const gf = () => { if (Math.abs(rem) < 0.5) return; const d = Math.abs(rem) < step ? rem : Math.sign(rem) * step; rem -= d; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d))); };
    for (let f = 0; f < n; f++) sim.stepFrame(gf);
  }
  for (let f = 0; f < 400; f++) sim.stepFrame(null);   // resolve everything
}

// Park the sim at a resting position described by a landmark spec.
function park(sim, v, g, spec) {
  const L = landmarks(v);
  if (spec.stop != null) { walkTo(sim, spec.stop, v, g); return; }
  if (spec.vhAboveRelease != null) {
    // reach the free zone the legal way: walk to release, then drift up.
    walkTo(sim, RELEASE, v, g);
    gesture(sim, v, g, spec.vhAboveRelease, -1, 'wheel');
    return;
  }
  if (spec.vhBelowAreole != null) {
    walkTo(sim, AREOLE, v, g);
    gesture(sim, v, g, spec.vhBelowAreole, 1, 'wheel');
  }
}

// Where did it end up, described in human terms.
function describe(p, v, g) {
  const L = landmarks(v);
  if (p >= L.border - 1e-9) {
    const vhAbove = pToVh(1 - p, v, g);
    return vhAbove < 0.5 ? 'release' : 'free zone (release-' + vhAbove.toFixed(0) + 'vh)';
  }
  const i = idxOf(p);
  if (Math.abs(p - SETTLE_TARGETS[i]) < 0.002) return 'stop idx' + i;
  if (p > L.areoleDwellEnd) return 'EXIT MID (release-' + pToVh(1 - p, v, g).toFixed(0) + 'vh)';
  return 'idx' + i + '+' + pToVh(p - SETTLE_TARGETS[i], v, g).toFixed(0) + 'vh';
}

module.exports = { mkSim, walkTo, gesture, park, describe, landmarks, vhToP, pToVh, P, idxOf, AREOLE, RELEASE, SETTLE_TARGETS, VIEWPORTS, geom, FRAME_MS };
