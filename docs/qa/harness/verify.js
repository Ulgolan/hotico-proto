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
// WHAT THIS VERIFIES: the ORIGINAL lap object — the white room in the fade
// corridor. Baseline (pre-lap main) vs the working tree, plus a frame-level DOM
// trace of a reverse crossing printing the literal film/stage .style.opacity
// writes, plus the no-rest and no-oscillation assertions, plus the instrumented
// R-2d clamp check (origin / picked / clamped) that proved the clamp holds on
// reverse entry and that the Commander's "Alopecie landing" was the camera
// genuinely framed on Alopecie mid-transit, not a clamp hole.
//
// NEEDS SNAPSHOTS: baseline.js. See README.
//
// DEFECT D8 LIVED HERE: a boundary filter used `vhBefore >= 50` when fadeT is
// already 1 AT exactly 50, so the Southern Border row itself was graded as a
// captured rest. The residual error it reported, 0.0981, turned out to be
// precisely that row's distance to Areole — an accidental confirmation that the
// border sits exactly where computed.
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
const P = require('./probe');
const { runCase, sweep, worst, VIEWPORTS, SETTLE_TARGETS, geom, targetFadeT } = P;

const SHIPPED = path.resolve(__dirname, '../../../js/hero-scroll.js');
const BASELINE = __dirname + '/snapshots/baseline.js';

const pad = (s, n) => String(s).padEnd(n);

// ---------- 1. headline: baseline vs shipped ----------
console.log('=========================================================');
console.log(' 1. BASELINE (main) vs SHIPPED (lap/r2f-couloir)');
console.log('    worst case across rest positions inside the corridor');
console.log('=========================================================');
const CASES = [
  ['REV flick  mobile 390x844', 'mobile', 'up', 'flick'],
  ['REV crawl  mobile 390x844', 'mobile', 'up', 'crawl'],
  ['REV flick  desktop 1280x720', 'desktop', 'up', 'flick'],
  ['REV crawl  desktop 1280x720', 'desktop', 'up', 'crawl'],
  ['FWD flick  mobile 390x844', 'mobile', 'down', 'flick'],
  ['FWD crawl  mobile 390x844', 'mobile', 'down', 'crawl'],
  ['FWD flick  desktop 1280x720', 'desktop', 'down', 'flick'],
  ['FWD crawl  desktop 1280x720', 'desktop', 'down', 'crawl']
];
console.log(pad('case', 30) + pad('restInWindow', 22) + pad('fullWhite', 20) + pad('paintTail', 20) + 'land');
CASES.forEach(([label, vp, dir, kind]) => {
  const b = worst(sweep(vp, dir, kind, false, BASELINE));
  const s = worst(sweep(vp, dir, kind, false, SHIPPED));
  console.log(
    pad(label, 30) +
    pad(b.restInWindowMaxMs + ' -> ' + s.restInWindowMaxMs + ' ms', 22) +
    pad(b.whiteMsMax + ' -> ' + s.whiteMsMax + ' ms', 20) +
    pad(b.tailMsMax + ' -> ' + s.tailMsMax + ' ms', 20) +
    '[' + b.landIdxs.join(',') + '] -> [' + s.landIdxs.join(',') + ']'
  );
});

// ---------- 2. frame-level DOM trace, reverse crossing ----------
function dumpTrace(file, label, vhBefore) {
  const r = runCase({ vpName: 'mobile', file, dir: 'up', kind: 'flick', vhBefore, keepTrace: true });
  const v = VIEWPORTS.mobile, g = geom(v);
  console.log('\n--- ' + label + '  (reverse flick, rest ' + vhBefore + 'vh before release) ---');
  console.log('  t(ms)   scrollY   moved  targetFadeT  film.opacity  stage.opacity   frame reads as');
  const tr = r.__trace;
  // first frame where the gesture's own motion ends
  let lastUser = 0;
  tr.forEach((f, i) => { if (f.userMoved) lastUser = i; });
  const from = Math.max(0, lastUser - 3);
  const to = Math.min(tr.length, lastUser + 46);
  const t0 = tr[from].t;
  for (let i = from; i < to; i += 2) {
    const f = tr[i];
    const tf = targetFadeT(f.y, v, g);
    const white = f.so >= 0.98 && f.so * f.fo <= 0.02;
    const statueBack = f.fo >= 0.999 && f.so >= 0.999;
    const reads = statueBack ? 'STATUE RESTORED' : white ? 'PURE WHITE' : 'mid-dissolve';
    console.log(
      pad((f.t - t0).toFixed(0), 8) + pad(f.y.toFixed(1), 10) + pad(f.moved ? 'yes' : 'NO', 7) +
      pad(tf.toFixed(3), 13) + pad(f.fo.toFixed(3), 14) + pad(f.so.toFixed(3), 15) + reads
    );
  }
  console.log('  settle log:');
  r.__logs.forEach((l) => console.log('    ' + l.msg));
  return r;
}
console.log('\n\n=========================================================');
console.log(' 2. FRAME-LEVEL DOM TRACE — reverse crossing, worst rest');
console.log('    (values are the literal film/stage .style.opacity writes)');
console.log('=========================================================');
dumpTrace(BASELINE, 'BASELINE (main)', 62.5);
dumpTrace(SHIPPED, 'SHIPPED (lap/r2f-couloir)', 62.5);

// ---------- 3. oscillation / no-rest assertions ----------
console.log('\n\n=========================================================');
console.log(' 3. ASSERTIONS');
console.log('=========================================================');
let fails = 0;
function assert(name, ok, detail) {
  if (!ok) fails++;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + name + (detail ? '   [' + detail + ']' : ''));
}
CASES.forEach(([label, vp, dir, kind]) => {
  const rows = sweep(vp, dir, kind, false, SHIPPED);
  const w = worst(rows);
  assert('no multi-settle oscillation: ' + label, w.settlesMax <= 1, 'max settles=' + w.settlesMax);
  assert('no direction flip: ' + label, w.dirFlipsMax === 0, 'flips=' + w.dirFlipsMax);
  // Rests at <50vh before release are past the Southern Border: the film has
  // no jurisdiction there, they are legal ordinary-page rests, and they are
  // deliberately NOT snapped onto a SETTLE_TARGET. Only captured rests can be
  // required to land on one.
  const captured = rows.filter((r) => r.vhBefore > 50);
  const freeZone = rows.filter((r) => r.vhBefore <= 50);
  const badLand = captured.filter((r) => Math.abs(r.landErr) > 0.0005);
  assert('every CAPTURED landing is exactly a SETTLE_TARGET: ' + label, badLand.length === 0,
    badLand.length ? 'worst err=' + Math.max(...badLand.map((r) => Math.abs(r.landErr)))
      : captured.length + ' captured err<5e-4, ' + freeZone.length + ' free-zone rests left alone');
  const legal = dir === 'up' ? [6, 7] : [6, 7];
  assert('clamp origin+/-1 respected: ' + label,
    w.landIdxs.every((i) => legal.includes(i)), 'landed=[' + w.landIdxs.join(',') + '] legal=[' + legal.join(',') + ']');
  assert('in-window rest <= 34ms (2 frames): ' + label, w.restInWindowMaxMs <= 34, w.restInWindowMaxMs + 'ms');
});

// clamp check from a NON-adjacent origin: a violent forward flick off
// Cicatrices (index 5) that comes to rest inside the corridor must land on
// Aréole (6), never release (7).
(function cicatricesFlick() {
  const v = VIEWPORTS.mobile, g = geom(v);
  const { boot } = require('./harness');
  const results = [];
  [55, 62.5, 70].forEach((vhBefore) => {
    const sim = boot({ file: SHIPPED, ...v, startScrollY: 0, hasScrollend: false });
    sim.stepFrame(null);
    // walk to Cicatrices (index 5), one gesture per stop
    for (let i = 1; i <= 5; i++) {
      const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
      let rem = to - sim.scrollY;
      const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
      for (let f = 0; f < Math.ceil(Math.abs(rem) / 24) + 2; f++) sim.stepFrame(gf);
      for (let f = 0; f < 60; f++) sim.stepFrame(null);
    }
    const restY = g.releaseY - (vhBefore / 100) * v.vh;
    let vel = (restY - sim.scrollY) * 0.07;
    const gf = () => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(sim.scrollY + vel); vel *= 0.93; };
    for (let f = 0; f < 200; f++) sim.stepFrame(gf);
    for (let f = 0; f < 180; f++) sim.stepFrame(null);
    const p = (sim.scrollY - v.wrapTopAbs) / g.total;
    let nearest = 0;
    SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[nearest] - p)) nearest = i; });
    results.push({ vhBefore, landIdx: nearest });
  });
  const ok = results.every((r) => r.landIdx === 6);
  assert('violent FWD flick from Cicatrices(5) into corridor clamps to Areole(6)', ok,
    results.map((r) => r.vhBefore + 'vh->idx' + r.landIdx).join(' '));
})();

console.log('\n  ' + (fails === 0 ? 'ALL ASSERTIONS PASS' : fails + ' ASSERTION(S) FAILED'));

// ---------- 4. instrumented clamp check (report only) ----------
console.log('\n\n=========================================================');
console.log(' 4. INSTRUMENTED CHECK (report only, per the key)');
console.log('    reverse gesture from below release: origin / picked / clamped');
console.log('=========================================================');
const ADVANCE_BIAS_FRAC = 0.20;
function pickedUnclamped(p, ref) {
  let lo = SETTLE_TARGETS[0], hi = SETTLE_TARGETS[SETTLE_TARGETS.length - 1];
  for (let i = 0; i < SETTLE_TARGETS.length - 1; i++) {
    if (p >= SETTLE_TARGETS[i] && p <= SETTLE_TARGETS[i + 1]) { lo = SETTLE_TARGETS[i]; hi = SETTLE_TARGETS[i + 1]; break; }
  }
  if (hi === lo) return lo;
  const frac = (p - lo) / (hi - lo);
  const fwd = p >= ref;
  const thr = fwd ? 0.5 - ADVANCE_BIAS_FRAC : 0.5 + ADVANCE_BIAS_FRAC;
  return frac >= thr ? hi : lo;
}
const idxOf = (val) => { let b = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - val) < Math.abs(SETTLE_TARGETS[b] - val)) b = i; }); return b; };

console.log(pad('gesture', 34) + pad('origin', 10) + pad('p at settle', 14) + pad('picked', 12) + pad('clamped', 12) + 'skipped?');
[
  ['reverse flick, rest 55vh pre-release', 55],
  ['reverse flick, rest 62.5vh pre-release', 62.5],
  ['reverse flick, rest 70vh pre-release', 70],
  ['reverse flick, deep overshoot to 210vh', 210],
  ['reverse flick, deep overshoot to 300vh', 300]
].forEach(([label, vhBefore]) => {
  const r = runCase({ vpName: 'mobile', file: SHIPPED, dir: 'up', kind: 'flick', vhBefore, keepTrace: true });
  const line = r.__logs.find((l) => l.msg.startsWith('[kh] settle,'));
  if (!line) { console.log(pad(label, 34) + '(no corrective settle — already at rest target)'); return; }
  const m = line.msg.match(/p= ([\d.]+) ref= ([\d.]+) target= ([\d.]+)/);
  const p = parseFloat(m[1]), ref = parseFloat(m[2]), target = parseFloat(m[3]);
  const pick = pickedUnclamped(p, ref);
  const oIdx = idxOf(ref), pIdx = idxOf(pick), cIdx = idxOf(target);
  console.log(
    pad(label, 34) + pad('idx ' + oIdx, 10) + pad(p.toFixed(4), 14) +
    pad('idx ' + pIdx, 12) + pad('idx ' + cIdx, 12) +
    (pIdx !== cIdx ? 'CLAMP ENGAGED (' + pIdx + '->' + cIdx + ')' : 'no clamp needed')
  );
});

// ---------- 5. burst-chain: how much stillness re-arms the clamp origin ----------
console.log('\n\n=========================================================');
console.log(' 5. BURST CHAIN — a paused reverse gesture (report only)');
console.log('    two momentum bursts separated by N ms of stillness');
console.log('=========================================================');
const { boot: boot5 } = require('./harness');
function burst(file, pauseMs) {
  const v = VIEWPORTS.mobile, g = geom(v);
  const sim = boot5({ file, ...v, startScrollY: 0, hasScrollend: false });
  sim.stepFrame(null);
  for (let i = 1; i <= 7; i++) {
    const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
    let rem = to - sim.scrollY;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < Math.ceil(Math.abs(rem) / 24) + 2; f++) sim.stepFrame(gf);
    for (let f = 0; f < 60; f++) sim.stepFrame(null);
  }
  let d = 700; const gd = () => { if (d <= 0) return; const s = Math.min(24, d); d -= s; sim.setScrollY(sim.scrollY + s); };
  for (let f = 0; f < 32; f++) sim.stepFrame(gd);
  for (let f = 0; f < 60; f++) sim.stepFrame(null);
  // burst 1: up into the corridor
  const restY = g.releaseY - 0.625 * v.vh;
  let vel = (restY - sim.scrollY) * 0.07;
  const g1 = () => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(sim.scrollY + vel); vel *= 0.93; };
  for (let f = 0; f < 120; f++) sim.stepFrame(g1);
  // pause
  for (let f = 0; f < Math.round(pauseMs / (1000 / 60)); f++) sim.stepFrame(null);
  // burst 2: keep going up, hard
  let vel2 = -1400 * 0.07;
  const g2 = () => { if (Math.abs(vel2) < 0.25) return; sim.setScrollY(Math.max(0, sim.scrollY + vel2)); vel2 *= 0.93; };
  for (let f = 0; f < 150; f++) sim.stepFrame(g2);
  for (let f = 0; f < 240; f++) sim.stepFrame(null);
  const p = (sim.scrollY - v.wrapTopAbs) / g.total;
  let n = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[n] - p)) n = i; });
  return n;
}
console.log(pad('pause between bursts', 24) + pad('BASELINE lands', 18) + 'SHIPPED lands');
[0, 100, 200, 300, 400, 500, 700, 1000].forEach((ms) => {
  console.log(pad(ms + ' ms', 24) + pad('idx ' + burst(BASELINE, ms), 18) + 'idx ' + burst(SHIPPED, ms));
});
console.log('\n  (idx 6 = Areole, 5 = Cicatrices, 3 = Alopecie. Two code-gestures');
console.log('   can legally reach idx 5; reaching idx 3 in one physical gesture');
console.log('   would be the reverse-side hole the key asks about.)');
