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
// WHAT THIS VERIFIES: the timeline's own geometry and the ORIGINAL lap object —
// the white room. Recomputes SETTLE_TARGETS from hero-scroll.js's own timeline
// constants, locates the fade corridor and the Southern Border in progress
// terms, and sweeps rest positions across the corridor measuring:
//   restInWindowMs   how long the raw scroll sits motionless with 0<fadeT<1
//   whiteMs          how long the composite is a pure ivory frame
//   paintTailMs      from the user's last motion until the paint resolves
// This is the file that proved Tower mechanism (a) was dead code: (a) and (b)
// each left restInWindow at 167ms, unchanged, every direction/speed/viewport.
//
// Exports the geometry helpers every other script builds on.
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

const FILE = process.argv[2] || path.resolve(__dirname, '../../../js/hero-scroll.js');

const VIEWPORTS = {
  desktop: { vw: 1280, vh: 720, wrapTopAbs: 91.87, wrapH: 3441.59, docH: 5513, copyH: 277 },
  mobile:  { vw: 390,  vh: 844, wrapTopAbs: 91.87, wrapH: 4034.31, docH: 6201, copyH: 306 }
};

const FADE_END_OFFSET_VH = 50;
const FADE_DISTANCE_VH = 25;

// SETTLE_TARGETS, recomputed from hero-scroll.js's own timeline constants.
// Cross-checked at runtime against the khlog 'ease complete, target=' values.
const SETTLE_TARGETS = (function () {
  const TOTAL_VH_BASE = 428, HOLD_VH = 30, DWELL_VH = 24.8, EXIT_VH = 36, N = 6;
  const TRANS_VH = (400 - HOLD_VH - DWELL_VH * N - EXIT_VH) / N;
  const FIRST_TRANS_BONUS_VH = 28, EXIT_BONUS_VH = 50;
  const R_BASE = TOTAL_VH_BASE - 100, R_NEW = R_BASE + EXIT_BONUS_VH, RESCALE = R_BASE / R_NEW;
  const HOLD = (HOLD_VH / TOTAL_VH_BASE) * RESCALE;
  const DWELL = (DWELL_VH / TOTAL_VH_BASE) * RESCALE;
  const TRANS = (TRANS_VH / TOTAL_VH_BASE) * RESCALE;
  const FIRST = (FIRST_TRANS_BONUS_VH / TOTAL_VH_BASE) * RESCALE;
  const out = [0];
  let t = HOLD;
  for (let i = 0; i < N; i++) {
    t += TRANS + (i === 0 ? FIRST : 0);
    out.push(t + DWELL / 2);
    t += DWELL;
  }
  out.push(1);
  return out;
})();
const AREOLE = SETTLE_TARGETS.length - 2; // index 6
const RELEASE = SETTLE_TARGETS.length - 1; // index 7

function geom(v) {
  const total = v.wrapH - v.vh;
  return { total, releaseY: v.wrapTopAbs + total };
}
const yOf = (p, v, g) => v.wrapTopAbs + p * g.total;

function targetFadeT(y, v, g) {
  const px = y - g.releaseY;
  const start = -(FADE_END_OFFSET_VH + FADE_DISTANCE_VH) / 100 * v.vh;
  const dist = FADE_DISTANCE_VH / 100 * v.vh;
  return Math.max(0, Math.min(1, (px - start) / dist));
}

function momentum(sim, distance, decay) {
  let v = distance * (1 - decay);
  return () => { if (Math.abs(v) < 0.25) return; sim.setScrollY(clampY(sim, sim.scrollY + v)); v *= decay; };
}
function drag(sim, distance, pxPerFrame) {
  let rem = distance;
  const step = Math.sign(distance) * Math.abs(pxPerFrame);
  return () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < Math.abs(step) ? rem : step; rem -= d; sim.setScrollY(clampY(sim, sim.scrollY + d)); };
}
const clampY = (sim, y) => Math.max(0, Math.min(sim.maxScroll, y));

// Walk stop-to-stop so lastRestProgress (the clamp's origin) is armed the
// same way a real user arms it: one gesture per stop, each allowed to settle.
function walkTo(sim, idx, v, g) {
  for (let i = 1; i <= idx; i++) {
    const to = yOf(SETTLE_TARGETS[i], v, g);
    const gf = drag(sim, to - sim.scrollY, 24);
    const n = Math.ceil(Math.abs(to - sim.scrollY) / 24) + 2;
    for (let f = 0; f < n; f++) sim.stepFrame(gf);
    for (let f = 0; f < 60; f++) sim.stepFrame(null); // settle + ease + chase converge
  }
}
// A real visitor reaches the site the only way the clamp allows: by walking
// DOWN through every stop, one gesture each, then on past release.
function primeInSite(sim, v, g) {
  walkTo(sim, RELEASE, v, g);
  const gf = drag(sim, 700, 24);
  for (let f = 0; f < 32; f++) sim.stepFrame(gf);
  for (let f = 0; f < 60; f++) sim.stepFrame(null);
}

function analyse(sim, v, g, markIdx) {
  const tr = sim.trace.slice(markIdx);
  let whiteMs = 0, wFrozenMax = 0, wFrozenRun = 0, restWinMax = 0, restWinRun = 0;
  let lastUserMoved = -1;
  tr.forEach((f, i) => {
    if (f.userMoved) lastUserMoved = i;
    const white = f.so != null && f.so >= 0.98 && f.so * f.fo <= 0.02;
    if (white) whiteMs += FRAME_MS;
    wFrozenRun = (white && !f.moved) ? wFrozenRun + FRAME_MS : 0;
    wFrozenMax = Math.max(wFrozenMax, wFrozenRun);
    const tf = targetFadeT(f.y, v, g);
    restWinRun = (tf > 0 && tf < 1 && !f.moved) ? restWinRun + FRAME_MS : 0;
    restWinMax = Math.max(restWinMax, restWinRun);
  });
  let resolved = -1;
  for (let i = lastUserMoved + 1; i < tr.length; i++) {
    const f = tr[i];
    if (f.so == null) continue;
    if ((f.fo >= 0.999 && f.so >= 0.999) || f.so <= 0.001) { resolved = i; break; }
  }
  const settles = sim.logs.filter((l) => l.msg.startsWith('[kh] settle,'));
  const dirs = settles.map((l) => (l.msg.includes('action= advance') ? '+' : '-'));
  let flips = 0;
  for (let i = 1; i < dirs.length; i++) if (dirs[i] !== dirs[i - 1]) flips++;
  const finalP = (sim.scrollY - v.wrapTopAbs) / g.total;
  let nearest = 0;
  SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - finalP) < Math.abs(SETTLE_TARGETS[nearest] - finalP)) nearest = i; });
  return {
    restInWindowMaxMs: Math.round(restWinMax),
    whiteMs: Math.round(whiteMs),
    whiteFrozenMaxMs: Math.round(wFrozenMax),
    tailMs: resolved < 0 ? 'UNRESOLVED' : Math.round((resolved - lastUserMoved) * FRAME_MS),
    landIdx: nearest,
    landErr: +(finalP - SETTLE_TARGETS[nearest]).toFixed(4),
    settles: settles.length,
    dirFlips: flips
  };
}

function runCase({ vpName, file, dir, kind, vhBefore, hasScrollend, keepTrace }) {
  const v = VIEWPORTS[vpName];
  const g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: !!hasScrollend });
  sim.stepFrame(null);
  if (dir === 'up') primeInSite(sim, v, g); else walkTo(sim, AREOLE, v, g);
  const originIdx = dir === 'up' ? RELEASE : AREOLE;
  const markIdx = sim.trace.length;
  const logMark = sim.logs.length;

  const restY = g.releaseY - (vhBefore / 100) * v.vh;
  const distance = restY - sim.scrollY;
  const gf = kind === 'flick' ? momentum(sim, distance, 0.93) : drag(sim, distance, 6);
  const nFrames = kind === 'flick' ? 200 : Math.ceil(Math.abs(distance) / 6) + 2;
  for (let i = 0; i < nFrames; i++) sim.stepFrame(gf);
  for (let i = 0; i < 180; i++) sim.stepFrame(null);

  const simView = { trace: sim.trace, logs: sim.logs.slice(logMark), scrollY: sim.scrollY, maxScroll: sim.maxScroll };
  const res = analyse(simView, v, g, markIdx);
  res.vhBefore = vhBefore;
  res.tf = +targetFadeT(restY, v, g).toFixed(3);
  res.originIdx = originIdx;
  if (keepTrace) { res.__trace = sim.trace.slice(markIdx); res.__logs = simView.logs; res.__v = v; res.__g = g; }
  return res;
}

function table(rows, title) {
  console.log('\n### ' + title);
  const cols = ['vhBefore', 'tf', 'restInWindowMaxMs', 'whiteMs', 'whiteFrozenMaxMs', 'tailMs', 'originIdx', 'landIdx', 'settles', 'dirFlips'];
  console.log(cols.join('\t'));
  rows.forEach((r) => console.log(cols.map((c) => r[c]).join('\t')));
}

function sweep(vpName, dir, kind, hasScrollend, file) {
  const rows = [];
  for (let vhBefore = 45; vhBefore <= 80; vhBefore += 2.5) {
    rows.push(runCase({ vpName, file: file || FILE, dir, kind, vhBefore, hasScrollend }));
  }
  return rows;
}
// Worst case across rows whose rest lands strictly inside the corridor.
function worst(rows) {
  const inWin = rows.filter((r) => r.tf > 0 && r.tf < 1);
  const num = (x) => (typeof x === 'number' ? x : 1e9);
  return {
    restInWindowMaxMs: Math.max(...inWin.map((r) => r.restInWindowMaxMs)),
    whiteMsMax: Math.max(...inWin.map((r) => r.whiteMs)),
    tailMsMax: Math.max(...inWin.map((r) => num(r.tailMs))),
    landIdxs: [...new Set(rows.map((r) => r.landIdx))].sort(),
    dirFlipsMax: Math.max(...rows.map((r) => r.dirFlips)),
    settlesMax: Math.max(...rows.map((r) => r.settles))
  };
}

const mode = process.argv[3] || 'all';
if (require.main === module && (mode === 'all' || mode === 'sweep')) {
  table(sweep('mobile', 'up', 'flick', false), 'REVERSE flick from site — mobile 390x844');
  table(sweep('mobile', 'up', 'crawl', false), 'REVERSE crawl from site — mobile 390x844');
  table(sweep('desktop', 'up', 'flick', false), 'REVERSE flick from site — desktop 1280x720');
  table(sweep('mobile', 'down', 'flick', false), 'FORWARD flick from Aréole — mobile 390x844');
  table(sweep('mobile', 'down', 'crawl', false), 'FORWARD crawl from Aréole — mobile 390x844');
  table(sweep('desktop', 'down', 'flick', false), 'FORWARD flick from Aréole — desktop 1280x720');
}
module.exports = { runCase, VIEWPORTS, SETTLE_TARGETS, geom, targetFadeT, FILE, sweep, worst, table };
