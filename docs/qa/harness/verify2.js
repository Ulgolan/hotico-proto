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
// WHAT THIS VERIFIES: the TOUCH GATE (bounce 1). The certification gesture is
// a slow half-swipe to mid-corridor with genuine motionless finger-down
// micro-pauses — the shape that seized the Commander's device. Asserts: no
// pre-empt under finger, no pre-empt-driven ease under finger, zero ease
// cancels, exactly one clean pre-empt at +17ms AFTER lift, and a landing on a
// stop outside the window. Also sweeps iOS momentum after lift (0-1800px) and
// the wheel path, where the gate is inert by construction.
//
// THE ASSERTION THAT MATTERS MOST is "fires cleanly after lift". The first
// version of the touch gate passed every negative assertion (no oscillation,
// no fight) while silently firing ZERO pre-empts ever — mobile had quietly
// reverted to the 167ms white room. Only the positive assertion caught it.
//
// NEEDS SNAPSHOTS: v18.js. See README.
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
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom, sweep, worst } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const SHIPPED = path.resolve(__dirname, '../../../js/hero-scroll.js');
const V18 = __dirname + '/snapshots/v18.js';
let fails = 0;
function assert(name, ok, detail) {
  if (!ok) fails++;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + pad(name, 62) + (detail ? '[' + detail + ']' : ''));
}

function walkTo(sim, idx, v, g) {
  for (let i = 1; i <= idx; i++) {
    const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
    let rem = to - sim.scrollY;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < Math.ceil(Math.abs(rem) / 24) + 2; f++) sim.stepFrame(gf);
    for (let f = 0; f < 60; f++) sim.stepFrame(null);
  }
}

// Slow drag: finger down, movePx per moving frame, pauseN genuinely
// motionless finger-down frames between bursts, then lift, then momentum.
function slowSwipe(file, vpName, opts) {
  const o = Object.assign({ movePx: 3, moveN: 4, pauseN: 3, momentumPx: 0, vhBefore: 62.5, sep: true, dir: 'down', holdFrames: 3 }, opts);
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: o.sep });
  sim.stepFrame(null);
  if (o.dir === 'down') walkTo(sim, 6, v, g);
  else { walkTo(sim, 7, v, g); const gd = (() => { let d = 700; return () => { if (d <= 0) return; const s = Math.min(24, d); d -= s; sim.setScrollY(sim.scrollY + s); }; })(); for (let f = 0; f < 32; f++) sim.stepFrame(gd); for (let f = 0; f < 60; f++) sim.stepFrame(null); }

  const markIdx = sim.trace.length, logMark = sim.logs.length;
  const target = g.releaseY - (o.vhBefore / 100) * v.vh;
  let rem = target - sim.scrollY;
  sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
  let phase = 0;
  const nFrames = Math.ceil(Math.abs(rem) / o.movePx) * ((o.moveN + o.pauseN) / o.moveN) + 400;
  let done = -1;
  for (let f = 0; f < nFrames; f++) {
    if (done >= 0 && f - done >= o.holdFrames) break;
    const inMove = (phase++ % (o.moveN + o.pauseN)) < o.moveN;
    sim.stepFrame(() => {
      if (Math.abs(rem) < 0.25) { if (done < 0) done = f; return; }
      if (!inMove) return;
      const d = Math.abs(rem) < o.movePx ? rem : Math.sign(rem) * o.movePx;
      rem -= d;
      sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d)));
    });
  }
  const liftFrame = sim.trace.length;
  sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
  let vel = o.momentumPx * 0.07 * Math.sign(rem || 1);
  for (let f = 0; f < 300; f++) {
    sim.stepFrame(() => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + vel))); vel *= 0.93; });
  }

  const tr = sim.trace, logs = sim.logs.slice(logMark);
  const t0 = tr[markIdx].t;
  const frameAt = (t) => tr.find((f) => Math.abs(f.t - t) < FRAME_MS / 2);
  const preempts = logs.filter((l) => l.msg.includes('corridor pre-empt'));
  const underFinger = preempts.filter((l) => { const f = frameAt(l.t); return f && f.touch; });
  const afterLift = preempts.length - underFinger.length;
  const cancels = logs.filter((l) => l.msg.includes('foreign scroll during ease')).length;
  let flips = 0, first = -1, last = -1, maxAbs = 0, prev = 0, fight = 0;
  tr.slice(markIdx).forEach((f, i) => {
    const s = Math.sign(f.d);
    if (s !== 0 && prev !== 0 && s !== prev) { flips++; if (first < 0) first = i; last = i; }
    if (s !== 0) prev = s;
    maxAbs = Math.max(maxAbs, Math.abs(f.d));
    if (f.progWrites > 0 && f.touch) fight++;
  });
  const p = (sim.scrollY - v.wrapTopAbs) / g.total;
  let land = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[land] - p)) land = i; });
  return {
    preempts: preempts.length, underFinger: underFinger.length, afterLift, cancels,
    flips, oscMs: first < 0 ? 0 : Math.round((last - first) * FRAME_MS),
    maxDelta: +maxAbs.toFixed(1), easeUnderFinger: fight, land,
    liftToPreemptMs: preempts.length && afterLift ? Math.round((preempts[preempts.length - 1].t - tr[liftFrame].t)) : null
  };
}

console.log('=========================================================');
console.log(' 1. THE CERTIFICATION GESTURE — slow half-swipe to mid-corridor');
console.log('    finger down with micro-pauses, touch modelled explicitly');
console.log('=========================================================');
const PROFILES = [
  ['3px / 4 on 3 off', { movePx: 3, moveN: 4, pauseN: 3 }],
  ['2px / 3 on 4 off', { movePx: 2, moveN: 3, pauseN: 4 }],
  ['1px / 2 on 5 off', { movePx: 1, moveN: 2, pauseN: 5 }]
];
['mobile', 'desktop'].forEach((vp) => {
  console.log('\n-- ' + vp + ' geometry --');
  console.log(pad('profile', 20) + pad('build', 9) + pad('preempts', 10) + pad('UNDER FINGER', 14) + pad('cancels', 9) + pad('flips', 7) + pad('osc', 9) + pad('maxD', 8) + 'land');
  PROFILES.forEach(([label, o]) => {
    [['v18', V18], ['fixed', SHIPPED]].forEach(([nm, f]) => {
      const r = slowSwipe(f, vp, o);
      console.log(pad(label, 20) + pad(nm, 9) + pad(r.preempts, 10) + pad(r.underFinger, 14) +
        pad(r.cancels, 9) + pad(r.flips, 7) + pad(r.oscMs + 'ms', 9) + pad(r.maxDelta, 8) + 'idx' + r.land);
    });
  });
});

console.log('\n\n=========================================================');
console.log(' 2. ASSERTIONS — touch gate');
console.log('=========================================================');
['mobile', 'desktop'].forEach((vp) => {
  PROFILES.forEach(([label, o]) => {
    const r = slowSwipe(SHIPPED, vp, o);
    assert('no pre-empt under finger: ' + vp + ' ' + label, r.underFinger === 0, 'underFinger=' + r.underFinger);
    assert('no pre-empt-driven ease under finger: ' + vp + ' ' + label, r.underFinger === 0 && r.easeUnderFinger === 0, 'easeFrames=' + r.easeUnderFinger);
    assert('no ease cancels: ' + vp + ' ' + label, r.cancels === 0, 'cancels=' + r.cancels);
    assert('fires cleanly after lift: ' + vp + ' ' + label, r.afterLift === 1, 'afterLift=' + r.afterLift + ' at +' + r.liftToPreemptMs + 'ms');
    assert('lands on a stop outside the window: ' + vp + ' ' + label, r.land === 6 || r.land === 7, 'idx' + r.land);
  });
});

console.log('\n  -- momentum after lift (the guard the key asked to verify) --');
[0, 150, 400, 900, 1800].forEach((mp) => {
  const r = slowSwipe(SHIPPED, 'mobile', { movePx: 3, moveN: 4, pauseN: 3, momentumPx: mp });
  assert('momentum ' + mp + 'px after lift: single clean pre-empt, no chatter',
    r.underFinger === 0 && r.preempts <= 1 && r.cancels === 0,
    'preempts=' + r.preempts + ' cancels=' + r.cancels + ' land=idx' + r.land);
});

console.log('\n  -- reverse direction, slow drag up out of the site --');
PROFILES.forEach(([label, o]) => {
  const r = slowSwipe(SHIPPED, 'mobile', Object.assign({ dir: 'up' }, o));
  assert('reverse slow drag, no pre-empt under finger: ' + label, r.underFinger === 0 && r.cancels === 0,
    'preempts=' + r.preempts + ' underFinger=' + r.underFinger + ' cancels=' + r.cancels + ' land=idx' + r.land);
});

console.log('\n\n=========================================================');
console.log(' 3. WHEEL-PATH REGRESSION — no touch event ever fires');
console.log('    v18 vs shipped. The touch gate is inert here by construction');
console.log('    (touchActive is constant false), so any delta below is the');
console.log('    DOOR RULE, which deliberately changes forward corridor exits.');
console.log('=========================================================');
const CASES = [
  ['REV flick  mobile', 'mobile', 'up', 'flick'], ['REV crawl  mobile', 'mobile', 'up', 'crawl'],
  ['REV flick  desktop', 'desktop', 'up', 'flick'], ['REV crawl  desktop', 'desktop', 'up', 'crawl'],
  ['FWD flick  mobile', 'mobile', 'down', 'flick'], ['FWD crawl  mobile', 'mobile', 'down', 'crawl'],
  ['FWD flick  desktop', 'desktop', 'down', 'flick'], ['FWD crawl  desktop', 'desktop', 'down', 'crawl']
];
CASES.forEach(([label, vp, dir, kind]) => {
  const a = worst(sweep(vp, dir, kind, false, V18));
  const b = worst(sweep(vp, dir, kind, false, SHIPPED));
  const legal = dir === 'up' ? [6] : [6, 7];
  const invariants = b.restInWindowMaxMs <= 34 && b.settlesMax <= 1 && b.dirFlipsMax === 0 &&
    b.landIdxs.every((i) => legal.includes(i));
  const delta = (a.whiteMsMax !== b.whiteMsMax || a.tailMsMax !== b.tailMsMax ||
    a.landIdxs.join() !== b.landIdxs.join())
    ? 'white ' + a.whiteMsMax + '->' + b.whiteMsMax + ', tail ' + a.tailMsMax + '->' + b.tailMsMax
    : 'unchanged';
  assert('invariants hold: ' + label, invariants,
    'rest=' + b.restInWindowMaxMs + ' settles=' + b.settlesMax + ' flips=' + b.dirFlipsMax + ' | ' + delta);
});

console.log('\n  ' + (fails === 0 ? 'ALL ASSERTIONS PASS' : fails + ' ASSERTION(S) FAILED'));
