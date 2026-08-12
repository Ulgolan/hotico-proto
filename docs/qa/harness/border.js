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
// WHAT THIS VERIFIES: THE SOUTHERN BORDER (bounce 3) — the abduction. The film's
// settle jurisdiction ends at the fade window's completion edge; past it fadeT
// is exactly 1 and a rest must be left completely alone. Asserts zero scrollTo
// calls of ANY kind at 5/10/20/30/40/45/49vh above release, both viewports,
// touch AND wheel; the free-zone origin handling (a rest records the RAW
// position, which is what kills the mis-billing); that a downward door trip
// still lands release exactly; and re-runs the 16-combination clamp proof.
//
// The mirror defect is verified here too: on the far side of the Areole|release
// snap midpoint (release-43.5vh) the old code pushed an UP-peek DOWN to release,
// opposite the reader's thumb. That face was never briefed — the harness found
// it.
//
// NEEDS SNAPSHOTS: v20.js. See README.
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
// R-2f THE SOUTHERN BORDER — verification.
// The free zone is fadeT===1: scrollY in [releaseY - FADE_END_OFFSET_VH*vh/100,
// releaseY]. A rest there must be left completely alone — no settle, no ease,
// no scrollTo of any kind.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom, sweep, worst } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const SHIPPED = path.resolve(__dirname, '../../../js/hero-scroll.js');
const V20 = __dirname + '/snapshots/v20.js';
const AREOLE = 6, RELEASE = 7;
let fails = 0;
function assert(name, ok, detail) {
  if (!ok) fails++;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + pad(name, 58) + (detail ? '[' + detail + ']' : ''));
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

// Gentle finger drag with genuine motionless micro-pauses to an absolute
// target scrollY, then a clean lift and a long idle. Returns what the page
// did AFTER the finger left the glass.
function driftTo(file, vpName, targetY, opts) {
  const o = Object.assign({ movePx: 3, moveN: 4, pauseN: 3, from: 'areole' }, opts || {});
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: true });
  sim.stepFrame(null);
  if (o.from === 'areole') walkTo(sim, AREOLE, v, g);
  else if (o.from === 'release') walkTo(sim, RELEASE, v, g);
  else if (o.from === 'site') {
    walkTo(sim, RELEASE, v, g);
    let d = 700; const gd = () => { if (d <= 0) return; const s = Math.min(24, d); d -= s; sim.setScrollY(sim.scrollY + s); };
    for (let f = 0; f < 32; f++) sim.stepFrame(gd);
    for (let f = 0; f < 60; f++) sim.stepFrame(null);
  }
  const logMark = sim.logs.length, markIdx = sim.trace.length;
  let rem = targetY - sim.scrollY;
  sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
  let phase = 0, done = -1;
  for (let f = 0; f < 6000; f++) {
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
  const yAtLift = sim.scrollY;
  for (let f = 0; f < 400; f++) sim.stepFrame(null);

  const logs = sim.logs.slice(logMark);
  const post = sim.trace.slice(sim.trace.findIndex((f) => f.t > sim.trace[markIdx].t) );
  // every programmatic write after the lift
  const liftIdx = sim.trace.length - 400;
  let progAfterLift = 0;
  for (let i = liftIdx; i < sim.trace.length; i++) progAfterLift += sim.trace[i].progWrites;
  const p = (sim.scrollY - v.wrapTopAbs) / g.total;
  let land = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[land] - p)) land = i; });
  return {
    yAtLift: +yAtLift.toFixed(1),
    yFinal: +sim.scrollY.toFixed(1),
    movedAfterLift: +(sim.scrollY - yAtLift).toFixed(1),
    progAfterLift,
    settles: logs.filter((l) => l.msg.includes('settle, source=')).length,
    freeZone: logs.filter((l) => l.msg.includes('free zone')).length,
    preempts: logs.filter((l) => l.msg.includes('corridor pre-empt')).length,
    land, p: +p.toFixed(4)
  };
}

(function header() {
  const v = VIEWPORTS.mobile, g = geom(v);
  const borderP = 1 - 0.50 * v.vh / g.total;
  const cov = (borderP - SETTLE_TARGETS[AREOLE]) / (1 - SETTLE_TARGETS[AREOLE]);
  // where the reverse 70% bias line sits, in vh above release
  const line70 = SETTLE_TARGETS[AREOLE] + 0.70 * (1 - SETTLE_TARGETS[AREOLE]);
  console.log('GEOMETRY — mobile 390x844');
  console.log('  SOUTHERN BORDER (release-50vh)  progress ' + borderP.toFixed(4) + '  coverage ' + (cov * 100).toFixed(1) + '%');
  console.log('  reverse 70% bias line           progress ' + line70.toFixed(4) + '  = ' + ((1 - line70) * g.total / v.vh * 100).toFixed(1) + 'vh above release');
  console.log('  release                         progress 1.0000');
  console.log('  -> the free zone spans 50vh; the old bias line cut it at ~' +
    ((1 - line70) * g.total / v.vh * 100).toFixed(0) + 'vh, abducting everything above.\n');
})();

console.log('=========================================================');
console.log(" 1. THE ABDUCTION — rest in the reveal zone, read in peace");
console.log('=========================================================');
console.log(pad('rest', 22) + pad('geom', 9) + pad('v20 moved after lift', 24) + 'v21 moved after lift');
[20, 30, 45].forEach((vhAbove) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const v = VIEWPORTS[vp], g = geom(v);
    const y = g.releaseY - (vhAbove / 100) * v.vh;
    const a = driftTo(V20, vp, y), b = driftTo(SHIPPED, vp, y);
    console.log(pad('release-' + vhAbove + 'vh', 22) + pad(vp, 9) +
      pad(a.movedAfterLift + 'px -> idx' + a.land + (Math.abs(a.movedAfterLift) > 1 ? ' ABDUCTED' : ''), 24) +
      b.movedAfterLift + 'px' + (Math.abs(b.movedAfterLift) < 0.5 ? '  UNTOUCHED' : '  MOVED'));
  });
});

console.log('\n=========================================================');
console.log(' 2. ASSERTIONS');
console.log('=========================================================');
console.log('  -- (1) free-zone rests are never captured --');
[5, 10, 20, 30, 40, 45, 49].forEach((vhAbove) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const v = VIEWPORTS[vp], g = geom(v);
    const y = g.releaseY - (vhAbove / 100) * v.vh;
    const r = driftTo(SHIPPED, vp, y);
    assert('release-' + vhAbove + 'vh ' + vp + ': untouched',
      Math.abs(r.movedAfterLift) < 0.5 && r.progAfterLift === 0 && r.preempts === 0,
      'moved=' + r.movedAfterLift + 'px scrollTo=' + r.progAfterLift + ' freeZoneLogs=' + r.freeZone);
  });
});

console.log('\n  -- arriving from the site side (upward peek) --');
[10, 25, 40].forEach((vhAbove) => {
  const v = VIEWPORTS.mobile, g = geom(v);
  const r = driftTo(SHIPPED, 'mobile', g.releaseY - (vhAbove / 100) * v.vh, { from: 'site' });
  const a = driftTo(V20, 'mobile', g.releaseY - (vhAbove / 100) * v.vh, { from: 'site' });
  assert('upward peek to release-' + vhAbove + 'vh: untouched',
    Math.abs(r.movedAfterLift) < 0.5 && r.progAfterLift === 0,
    'v20 moved ' + a.movedAfterLift + 'px (idx' + a.land + ') -> v21 moved ' + r.movedAfterLift + 'px');
});

console.log('\n  -- (2) upward drift from the free zone dying in the corridor --');
[0.16, 0.20, 0.28, 0.40].forEach((cov) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const v = VIEWPORTS[vp], g = geom(v);
    // origin: a free-zone rest, then drag UP into the corridor
    const startY = g.releaseY - 0.25 * v.vh;
    const sim = boot({ file: SHIPPED, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: true });
    sim.stepFrame(null);
    walkTo(sim, AREOLE, v, g);
    // drift into the free zone and rest there (origin becomes release-side)
    let rem1 = startY - sim.scrollY;
    const g1 = () => { if (Math.abs(rem1) < 0.25) return; const d = Math.abs(rem1) < 6 ? rem1 : Math.sign(rem1) * 6; rem1 -= d; sim.setScrollY(sim.scrollY + d); };
    sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
    for (let f = 0; f < 3000 && Math.abs(rem1) > 0.25; f++) sim.stepFrame(g1);
    sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
    for (let f = 0; f < 120; f++) sim.stepFrame(null);
    // now the upward gesture into the corridor
    const logMark = sim.logs.length;
    const targetP = SETTLE_TARGETS[AREOLE] + cov * (1 - SETTLE_TARGETS[AREOLE]);
    let rem2 = (v.wrapTopAbs + targetP * g.total) - sim.scrollY;
    const g2 = () => { if (Math.abs(rem2) < 0.25) return; const d = Math.abs(rem2) < 3 ? rem2 : Math.sign(rem2) * 3; rem2 -= d; sim.setScrollY(sim.scrollY + d); };
    sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
    for (let f = 0; f < 4000 && Math.abs(rem2) > 0.25; f++) sim.stepFrame(g2);
    sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
    for (let f = 0; f < 300; f++) sim.stepFrame(null);
    const p = (sim.scrollY - v.wrapTopAbs) / g.total;
    let land = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[land] - p)) land = i; });
    const cancels = sim.logs.slice(logMark).filter((l) => l.msg.includes('foreign scroll during ease')).length;
    assert('free-zone origin, up into corridor @' + (cov * 100).toFixed(0) + '% ' + vp + ' -> Aréole',
      land === AREOLE && Math.abs(p - SETTLE_TARGETS[AREOLE]) < 0.0005 && cancels === 0,
      'idx' + land + ' p=' + p.toFixed(4) + ' cancels=' + cancels);
  });
});

console.log('\n  -- (3) downward through-door trip still lands release exactly --');
[0.14, 0.20, 0.29].forEach((cov) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const v = VIEWPORTS[vp], g = geom(v);
    const targetP = SETTLE_TARGETS[AREOLE] + cov * (1 - SETTLE_TARGETS[AREOLE]);
    const r = driftTo(SHIPPED, vp, v.wrapTopAbs + targetP * g.total, { from: 'areole' });
    assert('door trip @' + (cov * 100).toFixed(0) + '% ' + vp + ' -> release exactly',
      r.land === RELEASE && Math.abs(r.p - 1) < 0.0005, 'idx' + r.land + ' p=' + r.p);
  });
});

console.log('\n  -- (4) prior suites: no rest in window, no oscillation, clamp --');
const CASES = [
  ['REV flick  mobile', 'mobile', 'up', 'flick'], ['REV crawl  mobile', 'mobile', 'up', 'crawl'],
  ['REV flick  desktop', 'desktop', 'up', 'flick'], ['REV crawl  desktop', 'desktop', 'up', 'crawl'],
  ['FWD flick  mobile', 'mobile', 'down', 'flick'], ['FWD crawl  mobile', 'mobile', 'down', 'crawl'],
  ['FWD flick  desktop', 'desktop', 'down', 'flick'], ['FWD crawl  desktop', 'desktop', 'down', 'crawl']
];
CASES.forEach(([label, vp, dir, kind]) => {
  const b = worst(sweep(vp, dir, kind, false, SHIPPED));
  assert('invariants: ' + label,
    b.restInWindowMaxMs <= 34 && b.settlesMax <= 1 && b.dirFlipsMax === 0,
    'rest=' + b.restInWindowMaxMs + ' settles=' + b.settlesMax + ' flips=' + b.dirFlipsMax + ' land=[' + b.landIdxs.join(',') + ']');
});

console.log('\n  -- (4b) clamp 16-combination deadlock proof, re-run --');
(function deadlock() {
  const v = VIEWPORTS.mobile, g = geom(v);
  const loP = 1 - 0.75 * v.vh / g.total, hiP = 1 - 0.50 * v.vh / g.total;
  const bad = [];
  for (let originIdx = 0; originIdx < SETTLE_TARGETS.length; originIdx++) {
    [-1, 1].forEach((door) => {
      const pickedIdx = door > 0 ? RELEASE : AREOLE;
      const clampedIdx = Math.max(originIdx - 1, Math.min(originIdx + 1, pickedIdx));
      const t = SETTLE_TARGETS[clampedIdx];
      if (t > loP && t < hiP) bad.push('o' + originIdx + 'd' + door);
    });
  }
  assert('no origin x door combination lands inside the corridor', bad.length === 0,
    bad.length ? bad.join(',') : '16 combinations, all outside');
})();

console.log('\n  -- (5) above the corridor, film law byte-identical v20 vs v21 --');
(function aboveCorridor() {
  const diffs = [];
  [0.02, 0.05, 0.08, 0.10].forEach((cov) => {   // <10.9% = still inside Aréole's dwell
    ['mobile', 'desktop'].forEach((vp) => {
      const v = VIEWPORTS[vp], g = geom(v);
      const targetP = SETTLE_TARGETS[AREOLE] + cov * (1 - SETTLE_TARGETS[AREOLE]);
      const y = v.wrapTopAbs + targetP * g.total;
      const a = driftTo(V20, vp, y), b = driftTo(SHIPPED, vp, y);
      if (a.land !== b.land || Math.abs(a.p - b.p) > 0.0005) diffs.push((cov * 100).toFixed(0) + '% ' + vp);
    });
  });
  // and the whole upper timeline, via the stop-to-stop walk
  assert('out-of-free-zone positions unchanged v20 -> v21', diffs.length === 0,
    diffs.length ? diffs.join(', ') : '8 sub-corridor gestures identical');
})();

console.log('\n  -- (5b) wheel path: free zone honoured without any touch event --');
[20, 30, 45].forEach((vhAbove) => {
  ['mobile', 'desktop'].forEach((vp) => {
    const v = VIEWPORTS[vp], g = geom(v);
    const sim = boot({ file: SHIPPED, ...v, startScrollY: 0, hasScrollend: false });
    sim.stepFrame(null);
    walkTo(sim, AREOLE, v, g);
    const y = g.releaseY - (vhAbove / 100) * v.vh;
    let rem = y - sim.scrollY;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 12 ? rem : Math.sign(rem) * 12; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < 3000 && Math.abs(rem) > 0.25; f++) sim.stepFrame(gf);
    const yRest = sim.scrollY;
    const mark = sim.trace.length;
    for (let f = 0; f < 400; f++) sim.stepFrame(null);
    let prog = 0;
    for (let i = mark; i < sim.trace.length; i++) prog += sim.trace[i].progWrites;
    assert('wheel rest release-' + vhAbove + 'vh ' + vp + ': untouched',
      Math.abs(sim.scrollY - yRest) < 0.5 && prog === 0,
      'moved=' + (sim.scrollY - yRest).toFixed(1) + 'px scrollTo=' + prog);
  });
});

console.log('\n  ' + (fails === 0 ? 'ALL ASSERTIONS PASS' : fails + ' ASSERTION(S) FAILED'));
