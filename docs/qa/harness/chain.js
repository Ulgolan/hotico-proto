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
// WHAT THIS VERIFIES: the S1-vs-S2 DISCRIMINATOR, run against MAIN's pre-lap
// v17 to convict before any fix was written.
//   S1  STALE ANCHOR   chained gestures never confirm rest, so lastRestProgress
//                      freezes pre-chain and the clamp hauls backward.
//   S2  LEGAL SNAPBACK the certified bias correctly returning lazy swipes.
// The discriminator chains COMMITTED links (75% of a gap, far past the 30%
// advance line). S1 predicts committed chains still get hauled; S2 predicts only
// lazy ones snap back. Verdict was S1: ref frozen at 0.3182 while p marched
// 0.4028 -> 0.4979 -> 0.5677, action flipping to `back`, hauls of 181-934px.
// The control at >=500ms gaps shows no yank at all, isolating the mechanism.
//
// DEFECT D7 LIVED HERE: the first draft used 100%-coverage links, which land
// EXACTLY on a stop, trip SETTLE_EPS, confirm rest and refresh the anchor —
// producing a clean all-clear with zero settles fired. 75% is what exposes it.
// A discriminator that cannot fail is not a discriminator.
//
// NEEDS SNAPSHOTS: baseline.js. See README.
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
// R-2f ADDENDUM STEP 1 — S1 (stale anchor) vs S2 (legal snap-back).
// Run against MAIN's v17 (baseline.js) BEFORE any fix.
//
// Discriminator: chain COMMITTED swipes — each link covers a FULL inter-stop
// gap, i.e. ~100% coverage, far past the 30% advance line, so the certified
// bias alone would advance every single link. Chains are mid-film.
//   S1 predicts: committed chains STILL get hauled backward, because
//                lastRestProgress never updates and the clamp caps the whole
//                chain at origin+1 no matter how far it actually travelled.
//   S2 predicts: committed links each advance; only LAZY links snap back.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const BASELINE = __dirname + '/snapshots/baseline.js';   // main, v17
const SHIPPED = path.resolve(__dirname, '../../../js/hero-scroll.js');

function walkTo(sim, idx, v, g) {
  for (let i = 1; i <= idx; i++) {
    const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
    let rem = to - sim.scrollY;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < Math.ceil(Math.abs(rem) / 24) + 2; f++) sim.stepFrame(gf);
    for (let f = 0; f < 90; f++) sim.stepFrame(null);
  }
}

// One physical swipe: touchstart, drag `px`, touchend, optional momentum,
// then `gapMs` of quiet before the caller starts the next link.
function swipe(sim, px, gapMs, momentumPx) {
  sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
  let rem = px;
  const step = Math.sign(px) * 14;           // brisk, committed drag
  const gf = () => { if (Math.abs(rem) < 0.5) return; const d = Math.abs(rem) < Math.abs(step) ? rem : step; rem -= d; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + d))); };
  for (let f = 0; f < Math.ceil(Math.abs(px) / 14) + 2; f++) sim.stepFrame(gf);
  sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
  let vel = (momentumPx || 0) * 0.07 * Math.sign(px);
  const gapFrames = Math.round(gapMs / FRAME_MS);
  for (let f = 0; f < gapFrames; f++) {
    sim.stepFrame(() => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(Math.max(0, Math.min(sim.maxScroll, sim.scrollY + vel))); vel *= 0.93; });
  }
}

const idxOf = (p) => { let n = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[n] - p)) n = i; }); return n; };

function chainRun(file, vpName, { originIdx, links, gapMs, coverage, dir, momentumPx }) {
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: true });
  sim.stepFrame(null);
  walkTo(sim, originIdx, v, g);
  const startP = (sim.scrollY - v.wrapTopAbs) / g.total;
  const logMark = sim.logs.length;

  // one link = `coverage` of the local inter-stop gap, in px
  for (let i = 0; i < links; i++) {
    const here = (sim.scrollY - v.wrapTopAbs) / g.total;
    const hereIdx = idxOf(here);
    const nextIdx = dir > 0 ? Math.min(hereIdx + 1, SETTLE_TARGETS.length - 1) : Math.max(hereIdx - 1, 0);
    const gapProgress = Math.abs(SETTLE_TARGETS[nextIdx] - SETTLE_TARGETS[hereIdx]) || 0.1129;
    swipe(sim, dir * coverage * gapProgress * g.total, gapMs, momentumPx);
  }
  // peak: how far the chain's own scrolling actually got, before any correction
  const peakP = (sim.scrollY - v.wrapTopAbs) / g.total;
  for (let f = 0; f < 200; f++) sim.stepFrame(null);   // let everything resolve
  const finalP = (sim.scrollY - v.wrapTopAbs) / g.total;

  const logs = sim.logs.slice(logMark);
  const settles = logs.filter((l) => l.msg.startsWith('[kh] settle,'));
  const refs = [...new Set(settles.map((l) => (l.msg.match(/ref= ([\d.]+)/) || [])[1]))];
  return {
    startIdx: idxOf(startP), peakIdx: idxOf(peakP), finalIdx: idxOf(finalP),
    peakP: +peakP.toFixed(4), finalP: +finalP.toFixed(4),
    backPx: +((finalP - peakP) * g.total * -dir).toFixed(0),
    backGaps: +(((finalP - peakP) * -dir) / 0.1129).toFixed(2),
    settles: settles.length,
    refsSeen: refs
  };
}

console.log('=================================================================');
console.log(' STEP 1 — DISCRIMINATOR, run on MAIN v17 (pre-lap baseline)');
console.log('=================================================================');
console.log('COMMITTED links: each swipe covers 75% of an inter-stop gap — far past');
console.log('the 30% advance line, and never landing exactly ON a stop (which would');
console.log('trip SETTLE_EPS, confirm rest, and refresh the anchor — masking it).');
console.log('The certified 30/70 bias would advance every one of these on its own.');
console.log('If they still get hauled backward, the anchor is poisoned -> S1.\n');

function table(file, label, opts) {
  console.log('--- ' + label + ' ---');
  console.log(pad('links', 7) + pad('gap', 8) + pad('start', 8) + pad('chain reached', 16) + pad('landed', 9) + pad('YANKED BACK', 20) + 'refs the settles used');
  [2, 3, 5].forEach((links) => {
    const r = chainRun(file, 'mobile', Object.assign({ originIdx: 2, links, dir: 1, coverage: 0.75 }, opts));
    console.log(pad(links, 7) + pad(opts.gapMs + 'ms', 8) + pad('idx' + r.startIdx, 8) +
      pad('idx' + r.peakIdx + ' (p=' + r.peakP + ')', 16) + pad('idx' + r.finalIdx, 9) +
      pad(r.backPx > 2 ? r.backPx + 'px (' + r.backGaps + ' gaps)' : 'none', 20) + r.refsSeen.join(' '));
  });
  console.log('');
}

table(BASELINE, 'COMMITTED chain DOWN, rapid (gap 80ms — debounce never even fires)', { gapMs: 80 });
table(BASELINE, 'COMMITTED chain DOWN, rapid (gap 200ms — settle starts, next link cancels it)', { gapMs: 200 });
table(BASELINE, 'COMMITTED chain DOWN, relaxed (gap 900ms — each ease completes)', { gapMs: 900 });

console.log('--- COMMITTED chain UP (reverse), gap 200ms ---');
console.log(pad('links', 7) + pad('start', 8) + pad('chain reached', 16) + pad('landed', 9) + pad('YANKED BACK', 20) + 'refs');
[2, 3, 5].forEach((links) => {
  const r = chainRun(BASELINE, 'mobile', { originIdx: 6, links, dir: -1, coverage: 0.75, gapMs: 200 });
  console.log(pad(links, 7) + pad('idx' + r.startIdx, 8) + pad('idx' + r.peakIdx + ' (p=' + r.peakP + ')', 16) +
    pad('idx' + r.finalIdx, 9) + pad(r.backPx > 2 ? r.backPx + 'px (' + r.backGaps + ' gaps)' : 'none', 20) + r.refsSeen.join(' '));
});

console.log('\n--- CONTRAST: LAZY links (20% coverage each), gap 200ms ---');
console.log('  S2\'s own prediction: these SHOULD snap back — that is the law working.');
console.log(pad('links', 7) + pad('start', 8) + pad('chain reached', 16) + pad('landed', 9) + 'verdict');
[2, 3, 5].forEach((links) => {
  const r = chainRun(BASELINE, 'mobile', { originIdx: 2, links, dir: 1, coverage: 0.20, gapMs: 200 });
  console.log(pad(links, 7) + pad('idx' + r.startIdx, 8) + pad('idx' + r.peakIdx + ' (p=' + r.peakP + ')', 16) +
    pad('idx' + r.finalIdx, 9) + (r.finalIdx <= r.startIdx ? 'snapped back (expected for lazy)' : 'advanced'));
});

console.log('\n--- gap sweep: when does the anchor un-freeze? (3 committed links down) ---');
console.log(pad('gap', 9) + pad('chain reached', 16) + pad('landed', 9) + 'anchor');
[80, 120, 200, 300, 500, 700, 900, 1200].forEach((gapMs) => {
  const r = chainRun(BASELINE, 'mobile', { originIdx: 2, links: 3, dir: 1, coverage: 0.75, gapMs });
  console.log(pad(gapMs + 'ms', 9) + pad('idx' + r.peakIdx, 16) + pad('idx' + r.finalIdx, 9) +
    (r.refsSeen.length > 1 ? 'moved: ' + r.refsSeen.join(' ') : 'FROZEN at ' + r.refsSeen.join('')));
});

module.exports = { chainRun, swipe, walkTo, idxOf };
