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
// WHAT THIS VERIFIES: the four gesture families added by ADDENDUM 3, which the
// region x gesture matrix does not reach:
//   A  GO HOME    a violent up-flick to the page top, with and without an iOS
//                 rubber-band bounce. Under the AMENDED I2 it must stay home;
//                 under the old symmetric clamp it descended 3-5 stops.
//   B  LAUNCH     one deliberate flick off the establishing frame launches to
//                 Sourcils; drifts settle home. Threshold is DOOR_COMMIT_VH.
//   C  KEYBOARD   PageDown chains, Home, End, Space — inputs that raise no
//                 wheel and no touch, covered by the foreign-scroll hook.
//   D  RAIL       a rail click lands exactly on its stop from any origin, and
//                 a finger or wheel mid-flight takes the ride over.
//
// COUNT DISCREPANCY, flagged not reconciled: LEDGER entry #39 credits these
// families as 12 / 14 / 8 / 32 = 66. This file actually asserts
// 12 / 14 / 8 / 18 = 52. The rail figure of 32 in the ledger is an arithmetic
// error carried from the PR report; the rail section runs 7 origin->destination
// pairs plus 2 interrupts per viewport, over 2 viewports = 18. The artifact is
// authoritative; the ledger needs the correction.
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
// R-2f ADDENDUM 3 — STEP 3: the new cell families.
//   go-home · launch · overscroll · keyboard · rail
// Amended intentions are stated in the section headers, before each run.
const { boot, FRAME_MS } = require('./harness');
const { VIEWPORTS, SETTLE_TARGETS, geom } = require('./probe');

const pad = (s, n) => String(s).padEnd(n);
const NEW = path.resolve(__dirname, '../../../js/hero-scroll.js');
const fs = require('fs');
// The v23 comparison column is a convenience, not a dependency. Without the
// snapshot this suite still grades the CURRENT build in full — which is the part
// that matters as a regression gate. See snapshots/README.md.
const V23_PATH = __dirname + '/snapshots/v23.js';
const V23 = fs.existsSync(V23_PATH) ? V23_PATH : null;
const NAMES = ['establish', 'Sourcils', 'Eyeliner', 'Alopécie', 'Lèvres', 'Cicatrices', 'Aréole', 'release'];
const idxOf = (p) => { let n = 0; SETTLE_TARGETS.forEach((t, i) => { if (Math.abs(t - p) < Math.abs(SETTLE_TARGETS[n] - p)) n = i; }); return n; };
let fails = 0;
function assert(name, ok, detail) { if (!ok) fails++; console.log((ok ? '  PASS  ' : '  FAIL  ') + pad(name, 54) + (detail ? '[' + detail + ']' : '')); }

function mk(file, vpName, overscroll) {
  const v = VIEWPORTS[vpName], g = geom(v);
  const sim = boot({ file, ...v, startScrollY: 0, hasScrollend: false, separateScrollEvents: true, overscrollPx: overscroll || 0 });
  sim.stepFrame(null);
  return { sim, v, g };
}
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
const P = (s, v, g) => (s.scrollY - v.wrapTopAbs) / g.total;
const land = (s, v, g) => idxOf(Math.max(0, Math.min(1, P(s, v, g))));

// a foreign scroll jump: keyboard or scrollbar. No wheel, no touch.
function foreignJump(sim, px, frames) {
  const n = frames || 1, step = px / n;
  for (let f = 0; f < n; f++) sim.stepFrame(() => sim.setScrollY(sim.scrollY + step));
  for (let f = 0; f < 400; f++) sim.stepFrame(null);
}

console.log('=================================================================');
console.log(' A. GO HOME — amended I2: upward is navigation, lands nearest');
console.log('=================================================================');
['mobile', 'desktop'].forEach((vp) => {
  [4, 5, 6].forEach((oi) => {
    [true, false].forEach((bounce) => {
      const { sim, v, g } = mk(NEW, vp, 120);
      walkTo(sim, oi, v, g);
      sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
      let rem = -0.35 * v.vh;
      const gf = () => { if (Math.abs(rem) < 1) return; const d = Math.abs(rem) < 40 ? rem : -40; rem -= d; sim.setScrollY(sim.scrollY + d); };
      for (let f = 0; f < 10; f++) sim.stepFrame(gf);
      sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
      let vel = -150;
      for (let f = 0; f < 120; f++) sim.stepFrame(() => { if (Math.abs(vel) < 0.25) return; sim.setScrollY(sim.scrollY + vel); vel *= 0.95; });
      if (bounce) [-60, -95, -110, -95, -60, -30, -12, -4, 0].forEach((y) => sim.stepFrame(() => sim.setScrollY(y)));
      for (let f = 0; f < 400; f++) sim.stepFrame(null);
      assert('go home from ' + NAMES[oi] + ' ' + vp + (bounce ? ' +bounce' : ''), land(sim, v, g) === 0,
        'landed ' + NAMES[land(sim, v, g)]);
    });
  });
});

console.log('\n=================================================================');
console.log(' B. THE LAUNCH — one deliberate flick launches, drifts settle home');
console.log('    DOOR_COMMIT_VH = 7.5vh, measured in raw scroll px');
console.log('=================================================================');
console.log(pad('flick', 9) + pad('input', 8) + pad('v23 (if present)', 19) + 'current');
[3, 5, 7, 8, 10, 15, 25].forEach((vh) => {
  ['touch', 'wheel'].forEach((input) => {
    const out = [V23, NEW].filter(Boolean).map((F) => {
      const { sim, v, g } = mk(F, 'mobile');
      walkTo(sim, 0, v, g);
      const totalPx = (vh / 100) * v.vh;
      if (input === 'touch') {
        sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
        let rem = totalPx * 0.4; const st = Math.max(6, rem / 8);
        for (let f = 0; f < Math.ceil(totalPx * 0.4 / st) + 1; f++) sim.stepFrame(() => { if (rem < 0.5) return; const d = Math.min(rem, st); rem -= d; sim.setScrollY(sim.scrollY + d); });
        sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
        let vel = totalPx * 0.6 * 0.07;
        for (let f = 0; f < 160; f++) sim.stepFrame(() => { if (vel < 0.25) return; sim.setScrollY(sim.scrollY + vel); vel *= 0.93; });
      } else {
        let rem = totalPx; const st = Math.max(6, totalPx / 12);
        for (let f = 0; f < Math.ceil(totalPx / st) + 1; f++) sim.stepFrame(() => { if (rem < 0.5) return; const d = Math.min(rem, st); rem -= d; sim.setScrollY(sim.scrollY + d); });
      }
      for (let f = 0; f < 400; f++) sim.stepFrame(null);
      return NAMES[land(sim, v, g)];
    });
    const cur = out[out.length - 1], prev = V23 ? out[0] : 'n/a (no snapshot)';
    if (input === 'touch') console.log(pad(vh + 'vh', 9) + pad(input, 8) + pad(prev, 19) + cur);
    assert('launch ' + vh + 'vh ' + input, cur === (vh > 7.5 ? 'Sourcils' : 'establish'), 'landed ' + cur);
  });
});

console.log('\n=================================================================');
console.log(' C. KEYBOARD — §31: a foreign scroll after rest opens a gesture');
console.log('    intention: PageDown advances one stop, chains walk, Home goes');
console.log('    home, End leaves the film uncaptured');
console.log('=================================================================');
['mobile', 'desktop'].forEach((vp) => {
  // chained PageDowns from establish: each is its own gesture -> each advances
  const { sim, v, g } = mk(NEW, vp);
  walkTo(sim, 1, v, g);
  const before = land(sim, v, g);
  const seq = [];
  for (let i = 0; i < 3; i++) { foreignJump(sim, v.vh * 0.9, 1); seq.push(land(sim, v, g)); }
  assert('PageDown x3 from Sourcils walks forward: ' + vp,
    seq.every((x, i) => x >= before + i) && seq[2] > before, 'from idx' + before + ' -> ' + seq.map((x) => 'idx' + x).join(' '));

  // Home
  const h = mk(NEW, vp); walkTo(h.sim, 5, h.v, h.g);
  foreignJump(h.sim, -h.sim.scrollY, 1);
  assert('Home from Cicatrices -> establish: ' + vp, land(h.sim, h.v, h.g) === 0, 'landed ' + NAMES[land(h.sim, h.v, h.g)]);

  // End
  const e = mk(NEW, vp); walkTo(e.sim, 2, e.v, e.g);
  foreignJump(e.sim, e.sim.maxScroll - e.sim.scrollY, 1);
  // End lands deep in the site, PAST release. Uncaptured means the film left
  // it there — progress stays at/above 1, it was not hauled back up the film.
  assert('End from Eyeliner -> past release, uncaptured: ' + vp,
    P(e.sim, e.v, e.g) >= 1, 'p=' + P(e.sim, e.v, e.g).toFixed(3) + ' (>=1 = below release, untouched)');

  // Space (one viewport-ish page down) then PageUp back
  const s2 = mk(NEW, vp); walkTo(s2.sim, 3, s2.v, s2.g);
  const b2 = land(s2.sim, s2.v, s2.g);
  foreignJump(s2.sim, s2.v.vh * 0.9, 1);
  const afterSpace = land(s2.sim, s2.v, s2.g);
  foreignJump(s2.sim, -s2.v.vh * 0.9, 1);
  assert('Space then PageUp returns: ' + vp, land(s2.sim, s2.v, s2.g) <= afterSpace,
    'idx' + b2 + ' -> idx' + afterSpace + ' -> idx' + land(s2.sim, s2.v, s2.g));
});

console.log('\n=================================================================');
console.log(' D. RAIL — §30: the rail\'s own smooth scroll is OURS, not a gesture');
console.log('    intention: a rail click lands EXACTLY on its stop from anywhere;');
console.log('    a finger or wheel mid-flight takes the ride over');
console.log('=================================================================');
['mobile', 'desktop'].forEach((vp) => {
  [0, 2, 5].forEach((from) => {
    [0, 3, 5].forEach((to) => {
      if (from === to) return;
      const out = [V23, NEW].filter(Boolean).map((F) => {
        const { sim, v, g } = mk(F, vp);
        walkTo(sim, from, v, g);
        sim.railBtns[to].dispatch('click');
        for (let f = 0; f < 500; f++) sim.stepFrame(null);
        return land(sim, v, g);
      });
      const curL = out[out.length - 1];
      assert('rail ' + NAMES[from] + ' -> stop ' + (to + 1) + ' ' + vp,
        curL === to + 1,
        (V23 ? 'v23 landed ' + NAMES[out[0]] + ', ' : '') + 'current landed ' + NAMES[curL]);
    });
  });
  // interrupt mid-flight
  ['touch', 'wheel'].forEach((input) => {
    const { sim, v, g } = mk(NEW, vp);
    walkTo(sim, 0, v, g);
    sim.railBtns[5].dispatch('click');
    for (let f = 0; f < 12; f++) sim.stepFrame(null);            // mid-ride
    if (input === 'touch') sim.stepFrame(() => sim.dispatchTouch('touchstart', 1));
    let rem = -0.30 * v.vh;
    for (let f = 0; f < 12; f++) sim.stepFrame(() => { if (Math.abs(rem) < 1) return; const d = Math.max(rem, -30); rem -= d; sim.setScrollY(sim.scrollY + d); });
    if (input === 'touch') sim.stepFrame(() => sim.dispatchTouch('touchend', 0));
    for (let f = 0; f < 500; f++) sim.stepFrame(null);
    const l = land(sim, v, g);
    assert('rail ride interrupted by ' + input + ': ' + vp, l >= 0 && l <= 6, 'landed ' + NAMES[l]);
  });
});

console.log('\n  ' + (fails === 0 ? 'ALL ASSERTIONS PASS' : fails + ' ASSERTION(S) FAILED'));
