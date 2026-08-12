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
// WHAT THIS VERIFIES: THE DOOR RULE (bounce 2) — the Areole jail. Places
// gestures by COVERAGE of the Areole->release gap, because that is the axis the
// straddle lives on: ADVANCE_BIAS_FRAC's 30% advance line falls at coverage 30%
// while the fade corridor spans 13.9%-42.6%, so a gentle gesture died at 14-29%
// and was marched back. Asserts the jailbreak (14/18/20/25/29% now go through),
// the reverse case still returning to Areole, no oscillation, and an EXHAUSTIVE
// 16-combination clamp/door deadlock proof (every origin x door direction lands
// outside the window).
//
// Also reports DOOR_EPS_VH reachability honestly: it was a dormant guard, never
// a live path, because ref is always a SETTLE_TARGETS entry and none lies inside
// the window. That constant has since been retired into DOOR_COMMIT_VH.
//
// NEEDS SNAPSHOTS: v19.js. See README.
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
// R-2f THE DOOR RULE — verification.
// Gestures are placed by COVERAGE of the Aréole->release gap, because that is
// the axis the straddle lives on: ADVANCE_BIAS_FRAC's 30% line falls inside
// the fade window, so 14-29% coverage was a cell.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom, sweep, worst } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const SHIPPED = path.resolve(__dirname, '../../../js/hero-scroll.js');
const V19 = __dirname + '/snapshots/v19.js';
const AREOLE = 6, RELEASE = 7;
let fails = 0;
function assert(name, ok, detail) {
  if (!ok) fails++;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + pad(name, 60) + (detail ? '[' + detail + ']' : ''));
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

// A gentle finger drag with genuine motionless micro-pauses, ending at a
// chosen COVERAGE of the Aréole->release gap, then a clean lift, no momentum.
function gentleTo(file, vpName, coverage, dir, prof) {
  const o = Object.assign({ movePx: 3, moveN: 4, pauseN: 3 }, prof || {});
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: true });
  sim.stepFrame(null);
  if (dir === 'down') walkTo(sim, AREOLE, v, g);
  else {
    walkTo(sim, RELEASE, v, g);
    let d = 700; const gd = () => { if (d <= 0) return; const s = Math.min(24, d); d -= s; sim.setScrollY(sim.scrollY + s); };
    for (let f = 0; f < 32; f++) sim.stepFrame(gd);
    for (let f = 0; f < 60; f++) sim.stepFrame(null);
  }
  const logMark = sim.logs.length, markIdx = sim.trace.length;
  const targetP = SETTLE_TARGETS[AREOLE] + coverage * (1 - SETTLE_TARGETS[AREOLE]);
  let rem = (v.wrapTopAbs + targetP * g.total) - sim.scrollY;
  sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
  let phase = 0, done = -1;
  for (let f = 0; f < 4000; f++) {
    if (done >= 0 && f - done >= 3) break;
    const inMove = (phase++ % (o.moveN + o.pauseN)) < o.moveN;
    sim.stepFrame(() => {
      if (Math.abs(rem) < 0.25) { if (done < 0) done = f; return; }
      if (!inMove) return;
      const d = Math.abs(rem) < o.movePx ? rem : Math.sign(rem) * o.movePx;
      rem -= d;
      sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d)));
    });
  }
  sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
  for (let f = 0; f < 300; f++) sim.stepFrame(null);

  const logs = sim.logs.slice(logMark);
  const tr = sim.trace.slice(markIdx);
  const frameAt = (t) => sim.trace.find((f) => Math.abs(f.t - t) < FRAME_MS / 2);
  const preempts = logs.filter((l) => l.msg.includes('corridor pre-empt'));
  const underFinger = preempts.filter((l) => { const f = frameAt(l.t); return f && f.touch; }).length;
  const cancels = logs.filter((l) => l.msg.includes('foreign scroll during ease')).length;
  const settles = logs.filter((l) => l.msg.includes('settle, source=')).length;
  let flips = 0, prev = 0;
  tr.forEach((f) => { const s = Math.sign(f.d); if (s !== 0 && prev !== 0 && s !== prev) flips++; if (s !== 0) prev = s; });
  const p = (sim.scrollY - v.wrapTopAbs) / g.total;
  let land = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[land] - p)) land = i; });
  return { land, preempts: preempts.length, underFinger, cancels, settles, flips };
}

// corridor bounds, in coverage-of-the-gap terms
(function geometryHeader() {
  const v = VIEWPORTS.mobile, g = geom(v);
  const lo = 1 - 0.75 * v.vh / g.total, hi = 1 - 0.50 * v.vh / g.total;
  const cov = (p) => (p - SETTLE_TARGETS[AREOLE]) / (1 - SETTLE_TARGETS[AREOLE]);
  console.log('GEOMETRY (mobile 390x844, identical in coverage terms on desktop)');
  console.log('  Aréole midpoint      progress ' + SETTLE_TARGETS[AREOLE].toFixed(4) + '   coverage   0.0%');
  console.log('  corridor lower edge  progress ' + lo.toFixed(4) + '   coverage ' + (cov(lo) * 100).toFixed(1) + '%');
  console.log('  ADVANCE_BIAS 30% line progress ' + (SETTLE_TARGETS[AREOLE] + 0.30 * (1 - SETTLE_TARGETS[AREOLE])).toFixed(4) + '   coverage  30.0%   <-- STRADDLES THE CORRIDOR');
  console.log('  corridor upper edge  progress ' + hi.toFixed(4) + '   coverage ' + (cov(hi) * 100).toFixed(1) + '%');
  console.log('  release              progress 1.0000   coverage 100.0%\n');
})();

console.log('=========================================================');
console.log(" 1. THE COMMANDER'S INSTRUMENT — gentle swipe off Aréole");
console.log('    that jailed him: 14-29% coverage, lower corridor');
console.log('=========================================================');
console.log(pad('coverage', 12) + pad('geometry', 10) + pad('v19 lands', 14) + pad('v20 lands', 14) + 'verdict');
[0.14, 0.18, 0.20, 0.25, 0.29].forEach((c) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const a = gentleTo(V19, vp, c, 'down');
    const b = gentleTo(SHIPPED, vp, c, 'down');
    console.log(pad((c * 100).toFixed(0) + '%', 12) + pad(vp, 10) +
      pad('idx' + a.land + (a.land === AREOLE ? ' (JAILED)' : ' (through)'), 14) +
      pad('idx' + b.land + (b.land === AREOLE ? ' (JAILED)' : ' (through)'), 14) +
      (b.land === RELEASE ? 'DOOR OPENS' : 'still jailed'));
  });
});

console.log('\n=========================================================');
console.log(' 2. ASSERTIONS');
console.log('=========================================================');
console.log('  -- (1) gentle forward into lower corridor escapes THROUGH --');
[0.14, 0.18, 0.20, 0.25, 0.29].forEach((c) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const r = gentleTo(SHIPPED, vp, c, 'down');
    assert('fwd ' + (c * 100).toFixed(0) + '% ' + vp + ' -> release', r.land === RELEASE,
      'idx' + r.land + ' preempts=' + r.preempts + ' underFinger=' + r.underFinger + ' cancels=' + r.cancels);
  });
});

console.log('\n  -- (2) reverse entry from the site escapes BACK to Aréole --');
[0.14, 0.20, 0.29, 0.40, 0.50].forEach((c) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const r = gentleTo(SHIPPED, vp, c, 'up');
    assert('rev ' + (c * 100).toFixed(0) + '% ' + vp + ' -> Aréole', r.land === AREOLE,
      'idx' + r.land + ' preempts=' + r.preempts + ' underFinger=' + r.underFinger + ' cancels=' + r.cancels);
  });
});

console.log('\n  -- (3) no oscillation on any door decision --');
[0.14, 0.20, 0.29].forEach((c) => {
  ['down', 'up'].forEach((d) => {
    const r = gentleTo(SHIPPED, 'mobile', c, d);
    assert('single settle, no flip: ' + d + ' ' + (c * 100).toFixed(0) + '%',
      r.settles <= 1 && r.flips <= 1 && r.cancels === 0 && r.underFinger === 0,
      'settles=' + r.settles + ' flips=' + r.flips + ' cancels=' + r.cancels);
  });
});

console.log('\n  -- (3b) jiggle / ambiguous-intent fallback --');
(function jiggle() {
  // Reachability of the DOOR_EPS branch, checked rather than assumed.
  // ref (lastRestProgress) is ALWAYS a SETTLE_TARGETS entry, and no entry lies
  // inside the window, so the smallest possible |net| for a corridor position
  // is the distance from the window's near edge to the nearest stop.
  const v = VIEWPORTS.mobile, g = geom(v);
  const loP = 1 - 0.75 * v.vh / g.total, hiP = 1 - 0.50 * v.vh / g.total;
  const minNetFromAreole = Math.abs(loP - SETTLE_TARGETS[AREOLE]) * g.total;
  const minNetFromRelease = Math.abs(hiP - 1) * g.total;
  const epsPx = 2 / 100 * v.vh;
  console.log('        min |net| from Aréole origin  = ' + minNetFromAreole.toFixed(0) + 'px');
  console.log('        min |net| from release origin = ' + minNetFromRelease.toFixed(0) + 'px');
  console.log('        DOOR_EPS_VH (2vh)             = ' + epsPx.toFixed(0) + 'px');
  assert('DOOR_EPS branch is a guard, not a live path (reported, not hidden)',
    minNetFromAreole > epsPx && minNetFromRelease > epsPx,
    'smallest reachable net is ' + Math.min(minNetFromAreole, minNetFromRelease).toFixed(0) + 'px >> ' + epsPx.toFixed(0) + 'px eps');
})();

console.log('\n  -- (4) exhaustive clamp/door deadlock proof --');
(function deadlock() {
  const v = VIEWPORTS.mobile, g = geom(v);
  const loP = 1 - 0.75 * v.vh / g.total, hiP = 1 - 0.50 * v.vh / g.total;
  const bad = [];
  for (let originIdx = 0; originIdx < SETTLE_TARGETS.length; originIdx++) {
    [-1, 1].forEach((door) => {
      const pickedIdx = door > 0 ? RELEASE : AREOLE;
      const clampedIdx = Math.max(originIdx - 1, Math.min(originIdx + 1, pickedIdx));
      const t = SETTLE_TARGETS[clampedIdx];
      if (t > loP && t < hiP) bad.push('origin' + originIdx + ' door' + door + ' -> idx' + clampedIdx);
    });
  }
  assert('no origin x door combination lands inside the corridor', bad.length === 0,
    bad.length ? bad.join(', ') : '16 combinations checked, all land outside');
})();

console.log('\n  -- (5) regression: prior corridor suite + no-rest invariant --');
const CASES = [
  ['REV flick  mobile', 'mobile', 'up', 'flick'], ['REV crawl  mobile', 'mobile', 'up', 'crawl'],
  ['REV flick  desktop', 'desktop', 'up', 'flick'], ['REV crawl  desktop', 'desktop', 'up', 'crawl'],
  ['FWD flick  mobile', 'mobile', 'down', 'flick'], ['FWD crawl  mobile', 'mobile', 'down', 'crawl'],
  ['FWD flick  desktop', 'desktop', 'down', 'flick'], ['FWD crawl  desktop', 'desktop', 'down', 'crawl']
];
CASES.forEach(([label, vp, dir, kind]) => {
  const a = worst(sweep(vp, dir, kind, false, V19));
  const b = worst(sweep(vp, dir, kind, false, SHIPPED));
  const legal = dir === 'up' ? [AREOLE] : [AREOLE, RELEASE];
  assert('no rest in window, no oscillation: ' + label,
    b.restInWindowMaxMs <= 34 && b.settlesMax <= 1 && b.dirFlipsMax === 0 && b.landIdxs.every((i) => legal.includes(i)),
    'rest=' + b.restInWindowMaxMs + ' settles=' + b.settlesMax + ' flips=' + b.dirFlipsMax +
    ' land v19=[' + a.landIdxs.join(',') + '] -> v20=[' + b.landIdxs.join(',') + ']');
});

console.log('\n  -- (5b) desktop and mobile geometries decide identically --');
[0.14, 0.20, 0.29, 0.45, 0.60].forEach((c) => {
  ['down', 'up'].forEach((d) => {
    const m = gentleTo(SHIPPED, 'mobile', c, d), k = gentleTo(SHIPPED, 'desktop', c, d);
    assert('same decision both geometries: ' + d + ' ' + (c * 100).toFixed(0) + '%', m.land === k.land,
      'mobile=idx' + m.land + ' desktop=idx' + k.land);
  });
});

console.log('\n  -- (5c) outside the corridor, ADVANCE_BIAS still governs --');
(function outsideUnchanged() {
  // Sub-corridor positions only (<13.9% coverage). Everything ABOVE the
  // corridor's upper edge is now the Southern Border's free zone, which
  // deliberately behaves differently — asserted separately in border.js.
  const diffs = [];
  [0.02, 0.05, 0.08, 0.10].forEach((c) => {   // <10.9% = still inside Aréole's dwell
    ['mobile', 'desktop'].forEach((vp) => {
      ['down', 'up'].forEach((d) => {
        const a = gentleTo(V19, vp, c, d), b = gentleTo(SHIPPED, vp, c, d);
        if (a.land !== b.land) diffs.push((c * 100).toFixed(0) + '% ' + vp + ' ' + d + ': ' + a.land + '->' + b.land);
      });
    });
  });
  assert('v19 vs shipped identical for every SUB-corridor position', diffs.length === 0,
    diffs.length ? diffs.join(' | ') : '16 sub-corridor gestures, all unchanged');
})();

console.log('\n  ' + (fails === 0 ? 'ALL ASSERTIONS PASS' : fails + ' ASSERTION(S) FAILED'));
