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
// WHAT THIS VERIFIES: THE STALE ANCHOR (addendum 1) and its named resurrection
// vector. Two suites:
//   1  THE STRAGGLER 64 — a single violent flick must land EXACTLY origin+1
//      downward, across origins 1-6, both directions, both viewports, with
//      post-touchend momentum stragglers at none / +40px@200ms / +90px@400ms /
//      +25px@700ms. This is the Tribunal's named vector; momentum raises scroll
//      but never wheel or touchstart, so it cannot reach beginGesture at all —
//      the clamp is safe by CONSTRUCTION, not by timing.
//   2  CHAINED COMMITTED SWIPES — 2/3/5 links at 80/200/300ms gaps, touch and
//      wheel, asserting no backward haul and forward progress.
//
// AMENDED BY ADDENDUM 3: the upward expectation is no longer origin-1. Under the
// amended I2 upward is navigation and lands nearest, so up cells assert the
// nearest stop to where the momentum actually stopped. Downward is unchanged and
// byte-identical — that is the regression gate for LE CRAN.
//
// DEFECT D3 LIVED HERE: `for (f=0; f < Math.ceil(Math.abs(rem)/14)+2; f++)`
// re-evaluates its bound as the drag consumes `rem`, halving every link's travel
// so "committed" swipes silently became lazy ones and the bias legitimately
// snapped them back. Fixed by computing nFrames up front.
//
// NEEDS SNAPSHOTS: v21.js. See README.
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
// R-2f ADDENDUM STEP 2 — verification of the gesture anchor.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const SHIPPED = path.resolve(__dirname, '../../../js/hero-scroll.js');
const V21 = __dirname + '/snapshots/v21.js';
const BASELINE = __dirname + '/snapshots/baseline.js';
let fails = 0;
function assert(name, ok, detail) {
  if (!ok) fails++;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + pad(name, 56) + (detail ? '[' + detail + ']' : ''));
}
const idxOf = (p) => { let n = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[n] - p)) n = i; }); return n; };

function mkSim(file, vpName) {
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: true });
  sim.stepFrame(null);
  return { sim, v, g };
}
// wheel-driven positioning, one gesture per stop (this is how a desktop user
// gets there, and the harness dispatches wheel for non-touch motion)
function walkTo(sim, idx, v, g) {
  for (let i = 1; i <= idx; i++) {
    const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
    let rem = to - sim.scrollY;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < Math.ceil(Math.abs(rem) / 24) + 2; f++) sim.stepFrame(gf);
    for (let f = 0; f < 90; f++) sim.stepFrame(null);
  }
}
const P = (sim, v, g) => (sim.scrollY - v.wrapTopAbs) / g.total;

// A single violent flick: touchstart, hard drag, touchend, then iOS momentum
// carrying far past one stop, optionally with a LATE straggler event after the
// settle ease has already begun.
function violentFlick(file, vpName, originIdx, dir, opts) {
  // travelGaps is deliberately ~2.4 inter-stop gaps: a genuine multi-stop skip
  // the R-2d clamp must catch, but still landing INSIDE the film's own
  // jurisdiction. A harder flick overshoots past the Southern Border, where
  // this lap's newer ruling forbids any capture at all — that collision is
  // real and reported, but it is not what the skip clamp is being tested on.
  const o = Object.assign({ stragglerDelayMs: 0, stragglerPx: 0, travelGaps: 2.4 }, opts || {});
  const { sim, v, g } = mkSim(file, vpName);
  walkTo(sim, originIdx, v, g);
  const logMark = sim.logs.length;
  const travelPx = o.travelGaps * 0.1129 * g.total;
  sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
  let rem = dir * travelPx * 0.3;
  const step = Math.max(12, Math.abs(rem) / 8);
  const gf = () => { if (Math.abs(rem) < 1) return; const d = Math.abs(rem) < step ? rem : Math.sign(rem) * step; rem -= d; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d))); };
  for (let f = 0; f < 12; f++) sim.stepFrame(gf);
  sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
  let vel = dir * travelPx * 0.7 * 0.06;    // decays at 0.94 -> sums to the rest
  for (let f = 0; f < 200; f++) {
    sim.stepFrame(() => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + vel))); vel *= 0.94; });
  }
  if (o.stragglerPx) {
    // a late momentum straggler landing AFTER the settle ease has started
    const wait = Math.round(o.stragglerDelayMs / FRAME_MS);
    for (let f = 0; f < wait; f++) sim.stepFrame(null);
    let s = dir * o.stragglerPx;
    sim.stepFrame(() => sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + s))));
  }
  const peakIdx = idxOf(Math.max(0, Math.min(1, P(sim, v, g))));
  for (let f = 0; f < 400; f++) sim.stepFrame(null);
  const logs = sim.logs.slice(logMark);
  return {
    peakIdx,
    land: idxOf(P(sim, v, g)),
    p: +P(sim, v, g).toFixed(4),
    anchors: [...new Set(logs.filter((l) => l.msg.includes('gesture start')).map((l) => (l.msg.match(/anchor= ([\d.]+)/) || [])[1]))],
    cancels: logs.filter((l) => l.msg.includes('foreign scroll during ease')).length
  };
}

// Chained committed swipes: each link covers `coverage` of the local gap,
// separated by gapMs of quiet — the S1 reproduction gesture.
function chained(file, vpName, originIdx, links, gapMs, coverage, dir, useTouch) {
  const { sim, v, g } = mkSim(file, vpName);
  walkTo(sim, originIdx, v, g);
  const startIdx = idxOf(P(sim, v, g));
  const logMark = sim.logs.length;
  for (let i = 0; i < links; i++) {
    const hereIdx = idxOf(P(sim, v, g));
    const nextIdx = dir > 0 ? Math.min(hereIdx + 1, 7) : Math.max(hereIdx - 1, 0);
    const gapP = Math.abs(SETTLE_TARGETS[nextIdx] - SETTLE_TARGETS[hereIdx]) || 0.1129;
    let rem = dir * coverage * gapP * g.total;
    const nFrames = Math.ceil(Math.abs(rem) / 14);   // fixed up front (`rem` shrinks); no silent padding, so gapMs IS the wheel silence
    if (useTouch) sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
    const gf = () => { if (Math.abs(rem) < 0.5) return; const d = Math.abs(rem) < 14 ? rem : Math.sign(rem) * 14; rem -= d; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d))); };
    for (let f = 0; f < nFrames; f++) sim.stepFrame(gf);
    if (useTouch) sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
    for (let f = 0; f < Math.round(gapMs / FRAME_MS); f++) sim.stepFrame(null);
  }
  const peakIdx = idxOf(P(sim, v, g)), peakP = P(sim, v, g);
  for (let f = 0; f < 250; f++) sim.stepFrame(null);
  const finalP = P(sim, v, g);
  const logs = sim.logs.slice(logMark);
  return {
    startIdx, peakIdx, land: idxOf(finalP),
    backPx: +((finalP - peakP) * g.total * -dir).toFixed(0),
    refs: [...new Set(logs.filter((l) => l.msg.startsWith('[kh] settle,')).map((l) => (l.msg.match(/ref= ([\d.]+)/) || [])[1]))]
  };
}

console.log('=================================================================');
console.log(' 1. THE RESURRECTION VECTOR — R-2d skip clamp WITH stragglers');
console.log('    a single violent flick must land EXACTLY origin+1');
console.log('=================================================================');
console.log(pad('origin', 9) + pad('dir', 6) + pad('geom', 9) + pad('straggler', 22) + pad('v21', 8) + pad('v22', 8) + 'expected');
[[1, 1], [2, 1], [3, 1], [4, 1], [6, -1], [5, -1], [3, -1], [2, -1]].forEach(([o, d]) => {
  ['mobile', 'desktop'].forEach((vp) => {
    [[0, 0, 'none'], [200, 40, '+40px @200ms'], [400, 90, '+90px @400ms'], [700, 25, '+25px @700ms']].forEach(([delay, px, lbl]) => {
      const b = violentFlick(SHIPPED, vp, o, d, { stragglerDelayMs: delay, stragglerPx: px });
      const a = violentFlick(V21, vp, o, d, { stragglerDelayMs: delay, stragglerPx: px });
      // AMENDED I2 (Addendum 3): downward is still exactly origin+1; upward is
      // navigation and lands nearest to where the momentum actually stopped.
      const exp = d > 0 ? o + d : b.peakIdx;
      if (vp === 'mobile' && delay === 0) {
        console.log(pad('idx' + o, 9) + pad(d > 0 ? 'down' : 'up', 6) + pad(vp, 9) + pad(lbl, 22) +
          pad('idx' + a.land, 8) + pad('idx' + b.land, 8) + 'idx' + exp);
      }
      assert('flick idx' + o + (d > 0 ? '>' : '<') + ' ' + vp + ' straggler ' + lbl,
        b.land === exp, 'landed idx' + b.land + ' expected idx' + exp +
        (d > 0 ? ' (origin+1)' : ' (nearest, unclamped)') + ' anchors=[' + b.anchors.join(',') + ']');
    });
  });
});

console.log('\n=================================================================');
console.log(' 2. CHAINED COMMITTED SWIPES — one stop per link, no yank');
console.log('=================================================================');
console.log(pad('links', 7) + pad('gap', 8) + pad('mode', 8) + pad('reached', 10) + pad('v21 land', 11) + pad('v21 yank', 13) + pad('v22 land', 11) + 'v22 yank');
[[2, 80], [3, 80], [5, 80], [2, 200], [3, 200], [5, 200], [3, 300]].forEach(([links, gapMs]) => {
  [true, false].forEach((useTouch) => {
    const a = chained(V21, 'mobile', 2, links, gapMs, 0.75, 1, useTouch);
    const b = chained(SHIPPED, 'mobile', 2, links, gapMs, 0.75, 1, useTouch);
    console.log(pad(links, 7) + pad(gapMs + 'ms', 8) + pad(useTouch ? 'touch' : 'wheel', 8) +
      pad('idx' + b.peakIdx, 10) + pad('idx' + a.land, 11) + pad(a.backPx > 2 ? a.backPx + 'px' : 'none', 13) +
      pad('idx' + b.land, 11) + (b.backPx > 2 ? b.backPx + 'px' : 'none'));
    // Gesture semantics, per the key: on TOUCH every link is its own gesture
    // (touchstart delimits it) whatever the gap, so a chain walks. On WHEEL a
    // gesture ends only after SETTLE_DEBOUNCE_MS of wheel silence, so links
    // closer than that are ONE continuous gesture and the R-2d clamp correctly
    // holds it to origin+1 — that pull-back is the law working, not the bug.
    const separateGestures = useTouch || gapMs >= 140;
    const tag = links + 'x' + gapMs + 'ms ' + (useTouch ? 'touch' : 'wheel');
    if (separateGestures) {
      assert('chain ' + tag + ': no stale-anchor haul, ends ahead of origin',
        b.backPx <= 128 && b.land > b.startIdx,
        'land=idx' + b.land + ' start=idx' + b.startIdx + ' peak=idx' + b.peakIdx + ' haul=' + b.backPx + 'px (v21 was ' + a.backPx + 'px)');
    } else {
      assert('chain ' + tag + ': one continuous gesture, clamped to origin+1',
        b.land === 3, 'land=idx' + b.land + ' (origin idx2, clamp allows idx3)');
    }
  });
});

console.log('\n  -- reverse chains --');
[[2, 200], [3, 200], [5, 200]].forEach(([links, gapMs]) => {
  const b = chained(SHIPPED, 'mobile', 6, links, gapMs, 0.75, -1, true);
  assert('reverse chain ' + links + ' links: no stale-anchor haul',
    b.backPx <= 128 && b.land <= b.peakIdx, 'land=idx' + b.land + ' peak=idx' + b.peakIdx + ' yank=' + b.backPx + 'px');
});

console.log('\n  -- lazy chains still snap back (the certified bias, untouched) --');
[2, 3].forEach((links) => {
  const b = chained(SHIPPED, 'mobile', 2, links, 200, 0.20, 1, true);
  assert('lazy chain ' + links + ' links stays near origin', b.land <= 4,
    'land=idx' + b.land + ' peak=idx' + b.peakIdx);
});

console.log('\n=================================================================');
console.log(' 3. WHEEL GESTURE BOUNDARY (' + 'WHEEL_GESTURE_GAP_MS = 140ms' + ')');
console.log('=================================================================');
[[3, 40, 'one continuous burst', 3], [3, 120, 'still one burst (<140ms)', 3],
 [3, 200, 'separate bursts', 5], [3, 300, 'separate bursts', 5]].forEach(([links, gapMs, lbl, expMin]) => {
  const b = chained(SHIPPED, 'mobile', 2, links, gapMs, 0.75, 1, false);
  console.log('  ' + pad(lbl, 26) + 'gap=' + pad(gapMs + 'ms', 8) + 'reached idx' + b.peakIdx + ' -> landed idx' + b.land +
    (b.backPx > 2 ? '  pulled back ' + b.backPx + 'px' : '  no pull-back'));
  if (gapMs < 140) assert('wheel ' + lbl + ' (' + gapMs + 'ms): clamped to origin+1', b.land === 3, 'land=idx' + b.land);
  else assert('wheel ' + lbl + ' (' + gapMs + 'ms): walks, no stale-anchor haul', b.backPx <= 128 && b.land > 2, 'land=idx' + b.land + ' haul=' + b.backPx + 'px');
});

console.log('\n  ' + (fails === 0 ? 'ALL ASSERTIONS PASS' : fails + ' ASSERTION(S) FAILED'));
