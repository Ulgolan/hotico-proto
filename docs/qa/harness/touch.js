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
// WHAT THIS VERIFIES: BOUNCE 1 reproduction — the mobile seizure. Models an iOS
// SLOW DRAG: finger down, per-frame deltas with genuine motionless micro-pauses,
// then lift, then momentum. Runs it under BOTH scroll-notification regimes,
// which is the whole point of the file:
//   coalesced  1 pre-empt,  0 cancels          -> the loop does not close
//   separate   10-18 pre-empts, 9-17 cancels,  -> the machine-gun, peak
//              oscillation 1017-6067ms             inter-frame 18.2px
// The Tower measured 17-20px on glass. Arrived at independently.
//
// WHY THE EARLIER HARNESS COULD NOT SEE THIS: its crawl moved a constant 6px
// EVERY frame and so never repeated a scroll position — which is the exact
// precondition for a one-motionless-frame trigger. A Node DOM has no fingers,
// and the gesture model had no pauses either.
//
// NEEDS SNAPSHOTS: v18.js. This file originally shelled out to `git show` to
// create it; that call has been REMOVED — generate snapshots manually per the
// README. Do not restore an automatic git invocation here.
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
const path = require('path');
// R-2f bounce — models an iOS SLOW DRAG: finger down, per-frame deltas with
// genuine motionless micro-pauses, then lift, then momentum. The previous
// harness crawl moved a constant 6px EVERY frame and so never repeated a
// scroll position — which is exactly why it could not see this defect.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom, targetFadeT } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const SHIPPED = path.resolve(__dirname, '../../../js/hero-scroll.js');
const V18 = __dirname + '/snapshots/v18.js'; // the bounced build

function walkTo(sim, idx, v, g) {
  for (let i = 1; i <= idx; i++) {
    const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
    let rem = to - sim.scrollY;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < Math.ceil(Math.abs(rem) / 24) + 2; f++) sim.stepFrame(gf);
    for (let f = 0; f < 60; f++) sim.stepFrame(null);
  }
}

// A slow half-swipe: `movePx` per moving frame, `moveN` moving frames, then
// `pauseN` genuinely motionless finger-down frames. Repeat until `distance`
// is covered, then lift and let momentum (if any) run out.
function slowSwipe(sim, v, g, distance, { movePx = 3, moveN = 4, pauseN = 3, momentumPx = 0, dwellAfterLiftFrames = 240 } = {}) {
  const markIdx = sim.trace.length;
  const logMark = sim.logs.length;
  sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
  let rem = distance, phase = 0;
  const total = Math.ceil(Math.abs(distance) / movePx) * ((moveN + pauseN) / moveN) + 40;
  for (let f = 0; f < total; f++) {
    const inMove = (phase % (moveN + pauseN)) < moveN;
    phase++;
    sim.stepFrame(() => {
      if (!inMove || Math.abs(rem) < 0.25) return; // finger down, motionless
      const d = Math.abs(rem) < movePx ? rem : Math.sign(rem) * movePx;
      rem -= d;
      sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d)));
    });
  }
  sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
  let vel = momentumPx * 0.07 * Math.sign(distance);
  for (let f = 0; f < dwellAfterLiftFrames; f++) {
    sim.stepFrame(() => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + vel))); vel *= 0.93; });
  }
  return { markIdx, logMark };
}

function metrics(sim, markIdx, v, g) {
  const tr = sim.trace.slice(markIdx);
  let flips = 0, sustained = 0, run = 0, maxRun = 0, maxAbs = 0, fightFrames = 0;
  let prevSign = 0;
  tr.forEach((f) => {
    const s = Math.sign(f.d);
    if (s !== 0 && prevSign !== 0 && s !== prevSign) { flips++; run++; maxRun = Math.max(maxRun, run); }
    else if (s !== 0) run = 0;
    if (s !== 0) prevSign = s;
    maxAbs = Math.max(maxAbs, Math.abs(f.d));
    if (f.progWrites > 0 && f.touch) fightFrames++;
    if (Math.abs(f.d) >= 10) sustained++;
  });
  const settles = sim.logs.filter((l) => l.msg.includes('settle, source='));
  const preempts = sim.logs.filter((l) => l.msg.includes('corridor pre-empt'));
  const cancels = sim.logs.filter((l) => l.msg.includes('foreign scroll during ease'));
  return {
    dirFlips: flips,
    maxFlipRun: maxRun,
    maxDelta: +maxAbs.toFixed(1),
    framesOver10px: sustained,
    easeWritesUnderFinger: fightFrames,
    settles: settles.length,
    preempts: preempts.length,
    easeCancels: cancels.length,
    oscillationMs: Math.round(maxRun * FRAME_MS)
  };
}

function run(file, label, opts) {
  opts = opts || {};
  const v = VIEWPORTS.mobile, g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: !!(opts && opts.separateScrollEvents) });
  sim.stepFrame(null);
  walkTo(sim, 6, v, g); // rest at Aréole, the stop the slow swipe starts from
  const target = g.releaseY - 0.625 * v.vh; // mid-corridor, the certification gesture
  const { markIdx } = slowSwipe(sim, v, g, target - sim.scrollY, opts);
  const m = metrics(sim, markIdx, v, g);
  const p = (sim.scrollY - v.wrapTopAbs) / g.total;
  let n = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[n] - p)) n = i; });
  console.log(pad(label, 26) +
    'flips=' + pad(m.dirFlips, 6) +
    'osc=' + pad(m.oscillationMs + 'ms', 10) +
    'maxΔ=' + pad(m.maxDelta, 8) +
    '>10px=' + pad(m.framesOver10px, 7) +
    'easeUnderFinger=' + pad(m.easeWritesUnderFinger, 6) +
    'preempts=' + pad(m.preempts, 5) +
    'cancels=' + pad(m.easeCancels, 5) +
    'land=idx' + n);
  return { sim, markIdx, m, v, g };
}

const fs = require('fs');
if (!fs.existsSync(V18)) {
  console.error('missing snapshots/v18.js — see README, generate it manually. This file no longer shells out to git.');
  process.exit(1);
}

console.log('SLOW HALF-SWIPE to mid-corridor (finger down, micro-pauses), mobile 390x844\n');
const SEP = { separateScrollEvents: true };
console.log('-- v18 (bounced build), COALESCED scroll notification --');
run(V18, 'v18 3px/4on3off', { movePx: 3, moveN: 4, pauseN: 3 });
run(V18, 'v18 2px/3on4off', { movePx: 2, moveN: 3, pauseN: 4 });
run(V18, 'v18 1px/2on5off', { movePx: 1, moveN: 2, pauseN: 5 });
console.log('\n-- v18 (bounced build), SEPARATE scroll notification (touch) --');
run(V18, 'v18 3px/4on3off', Object.assign({ movePx: 3, moveN: 4, pauseN: 3 }, SEP));
run(V18, 'v18 2px/3on4off', Object.assign({ movePx: 2, moveN: 3, pauseN: 4 }, SEP));
run(V18, 'v18 1px/2on5off', Object.assign({ movePx: 1, moveN: 2, pauseN: 5 }, SEP));
console.log('\n-- shipped (working tree), SEPARATE scroll notification (touch) --');
run(SHIPPED, 'now 3px/4on3off', Object.assign({ movePx: 3, moveN: 4, pauseN: 3 }, SEP));
run(SHIPPED, 'now 2px/3on4off', Object.assign({ movePx: 2, moveN: 3, pauseN: 4 }, SEP));
run(SHIPPED, 'now 1px/2on5off', Object.assign({ movePx: 1, moveN: 2, pauseN: 5 }, SEP));

module.exports = { run, slowSwipe, metrics, walkTo };
