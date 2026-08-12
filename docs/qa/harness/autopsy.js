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
// WHAT THIS VERIFIES: ADDENDUM 3 STEP 0 — the go-home descent autopsy, run
// against v23 BEFORE the law was touched, per the order's autopsy-before-law
// discipline. A violent up-flick from a deep stop, momentum to the page top,
// then an iOS rubber-band bounce (scroll events past the boundary and back,
// no wheel, no touch).
//
// It prints the crime's own 'gesture start' log so the verdict is readable
// rather than argued:
//     gesture start, source= touchstart  anchor= 0.6567  startP= 0.6567
//     settle p= 0.0000  ref= 0.6567  target= 0.5439  action= advance
// Anchor CORRECT (the deep stop). Bounce IRRELEVANT (identical with and
// without). The symmetric clamp took a landing at establish and hauled it to
// origin-1 — the machine descending 4 stops from the top while logging it as
// an `advance`. The LAW was the defect, not the plumbing.
//
// NEEDS SNAPSHOTS: v23.js. See README.
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
// R-2f ADDENDUM 3 — STEP 0: autopsy of the go-home descent, on v23.
// Violent up-flick from the Cicatrices region, momentum all the way to the page
// top, then an iOS rubber-band bounce: scroll events past the top boundary and
// back, with NO wheel and NO touch.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const FILE = process.argv[2] || __dirname + '/snapshots/v23.js';
const LABEL = process.argv[3] || 'v23';
const NAMES = ['establish', 'Sourcils', 'Eyeliner', 'Alopécie', 'Lèvres', 'Cicatrices', 'Aréole', 'release'];
const idxOf = (p) => { let n = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[n] - p)) n = i; }); return n; };

function goHome(vpName, originIdx, opts) {
  const o = Object.assign({ bounce: true }, opts || {});
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file: FILE, ...v, startScrollY: 0, hasScrollend: false,
                     separateScrollEvents: true, overscrollPx: 120 });
  sim.stepFrame(null);
  // walk down to the origin stop, one gesture per stop (wheel)
  for (let i = 1; i <= originIdx; i++) {
    const to = v.wrapTopAbs + SETTLE_TARGETS[i] * g.total;
    let rem = to - sim.scrollY;
    const n = Math.ceil(Math.abs(rem) / 24) + 2;
    const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
    for (let f = 0; f < n; f++) sim.stepFrame(gf);
    for (let f = 0; f < 90; f++) sim.stepFrame(null);
  }
  const logMark = sim.logs.length;
  const startIdx = idxOf((sim.scrollY - v.wrapTopAbs) / g.total);

  // THE GESTURE: violent go-home up-flick
  sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
  let rem = -0.35 * v.vh;                       // 35vh of finger
  const gf = () => { if (Math.abs(rem) < 1) return; const d = Math.abs(rem) < 40 ? rem : -40; rem -= d; sim.setScrollY(sim.scrollY + d); };
  for (let f = 0; f < 10; f++) sim.stepFrame(gf);
  sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
  let vel = -150;                               // momentum enough to reach the top
  for (let f = 0; f < 120; f++) {
    sim.stepFrame(() => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(sim.scrollY + vel); vel *= 0.95; });
  }
  const yAtTop = sim.scrollY;
  // THE BOUNCE: rubber-band past the boundary and spring back. Scroll events
  // only — this is the compositor, not the finger.
  if (o.bounce) {
    const band = [-60, -95, -110, -95, -60, -30, -12, -4, 0];
    band.forEach((y) => sim.stepFrame(() => sim.setScrollY(y)));
  }
  for (let f = 0; f < 400; f++) sim.stepFrame(null);

  const p = (sim.scrollY - v.wrapTopAbs) / g.total;
  return {
    startIdx, yAtTop: +yAtTop.toFixed(1),
    landIdx: idxOf(Math.max(0, Math.min(1, p))),
    landP: +p.toFixed(4),
    logs: sim.logs.slice(logMark)
  };
}

console.log('=================================================================');
console.log(' STEP 0 — AUTOPSY: the go-home descent, on ' + LABEL);
console.log('=================================================================');
console.log(pad('origin', 14) + pad('geom', 9) + pad('bounce', 9) + pad('reached', 10) + pad('LANDED', 14) + 'verdict');
[5, 6, 4].forEach((oi) => {
  ['mobile', 'desktop'].forEach((vp) => {
    [true, false].forEach((bounce) => {
      const r = goHome(vp, oi, { bounce });
      const descended = r.landIdx > 0;
      console.log(pad(NAMES[oi], 14) + pad(vp, 9) + pad(bounce ? 'yes' : 'no', 9) +
        pad('top', 10) + pad(NAMES[r.landIdx] + ' (idx' + r.landIdx + ')', 14) +
        (descended ? 'DESCENDED ' + r.landIdx + ' stops from the top' : 'stayed home'));
    });
  });
});

console.log('\n--- the crime\'s own log (Cicatrices, mobile, with bounce) ---');
const r = goHome('mobile', 5, { bounce: true });
r.logs.forEach((l) => console.log('   ' + l.msg));
console.log('\n   landed: ' + NAMES[r.landIdx] + '  (p=' + r.landP + ')');
