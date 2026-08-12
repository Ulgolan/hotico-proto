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
// WHAT THIS VERIFIES: ADDENDUM 2 STEP 1 — reproduction of both crimes on v22
// before any fix.
//   CRIME 1  DEAD TAPS. Prints the exit geography, then flicks 5-60vh off
//            Areole. The no-man's strip runs from the dwell end (+9.5vh) to the
//            old door (+12.1vh), and 30% of an 87.1vh gap is 26.1vh of travel.
//   CRIME 2  FREE-ZONE CAPTURE. Rests across the reveal band, then up-peeks.
//
// HONEST NOTE ON CRIME 2: it did NOT reproduce on the first grid (20/30/45vh),
// because the Areole|release snap midpoint sits at release-43.5vh and that grid
// straddled it. The grid was widened rather than the miss reported as an
// absence. The band is release-36 to -42vh.
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
// R-2f ADDENDUM 2 — STEP 1: reproduce both crimes on v22 before any fix.
const G = require('./gest');
const { mkSim, park, gesture, describe, landmarks, pToVh, P, idxOf, AREOLE, RELEASE, SETTLE_TARGETS } = G;

const pad = (s, n) => String(s).padEnd(n);
const V22 = __dirname + '/snapshots/v22.js';
const FILE = process.argv[2] || V22;
const LABEL = process.argv[3] || 'v22';

function run(file, vpName, parkSpec, vhTravel, dir, input) {
  const { sim, v, g } = mkSim(file, vpName);
  park(sim, v, g, parkSpec);
  const startP = P(sim, v, g);
  gesture(sim, v, g, vhTravel, dir, input);
  const endP = P(sim, v, g);
  return {
    startP, endP,
    start: describe(startP, v, g), end: describe(endP, v, g),
    netVh: +pToVh(endP - startP, v, g).toFixed(1),
    landIdx: idxOf(endP)
  };
}

console.log('=================================================================');
console.log(' STEP 1 — REPRODUCTION on ' + LABEL);
console.log('=================================================================');
(function geom() {
  const v = G.VIEWPORTS.mobile, g = G.geom(v);
  const L = landmarks(v);
  console.log('EXIT GEOGRAPHY (mobile 390x844), measured from the Aréole stop:');
  console.log('  Aréole stop (settle target)  +0.0vh');
  console.log('  Aréole dwell END             +' + pToVh(L.areoleDwellEnd - L.areoleMid, v, g).toFixed(1) + 'vh   <- exit segment begins');
  console.log('  corridor lower edge          +' + pToVh(L.corridorLo - L.areoleMid, v, g).toFixed(1) + 'vh   <- door jurisdiction began (v22)');
  console.log('  30% bias advance line        +' + (0.30 * pToVh(1 - L.areoleMid, v, g)).toFixed(1) + 'vh   <- what a flick had to beat');
  console.log('  Southern Border              +' + pToVh(L.border - L.areoleMid, v, g).toFixed(1) + 'vh');
  console.log('  release                      +' + pToVh(1 - L.areoleMid, v, g).toFixed(1) + 'vh');
  console.log('  -> NO-MAN\'S STRIP: +' + pToVh(L.areoleDwellEnd - L.areoleMid, v, g).toFixed(1) +
    'vh to +' + pToVh(L.corridorLo - L.areoleMid, v, g).toFixed(1) + 'vh, bias-ruled, needs ' +
    (0.30 * pToVh(1 - L.areoleMid, v, g)).toFixed(0) + 'vh to escape\n');
})();

console.log('--- CRIME 1: DEAD TAPS — down-flick off Aréole ---');
console.log(pad('travel', 10) + pad('input', 8) + pad('geom', 9) + pad('lands', 34) + 'verdict');
let dead = 0, alive = 0;
[5, 10, 15, 20, 25, 30, 40, 60].forEach((vh) => {
  ['touch', 'wheel'].forEach((input) => {
    ['mobile', 'desktop'].forEach((vp) => {
      const r = run(FILE, vp, { stop: AREOLE }, vh, 1, input);
      const isDead = r.landIdx === AREOLE && Math.abs(r.endP - SETTLE_TARGETS[AREOLE]) < 0.002;
      if (vp === 'mobile') {
        console.log(pad(vh + 'vh', 10) + pad(input, 8) + pad(vp, 9) + pad(r.end, 34) +
          (isDead ? 'DEAD TAP (back to Aréole)' : 'relaunched'));
      }
      if (isDead) dead++; else alive++;
    });
  });
});
console.log('  -> ' + dead + ' dead / ' + (dead + alive) + ' gestures\n');

console.log('--- CRIME 2: FREE-ZONE ABDUCTION — up-peek from the reveal zone ---');
console.log(pad('rest', 20) + pad('peek', 8) + pad('input', 8) + pad('lands', 34) + 'verdict');
let abducted = 0, total = 0;
[20, 30, 45].forEach((restVh) => {
  [5, 10, 15, 20].forEach((peek) => {
    ['touch', 'wheel'].forEach((input) => {
      ['mobile', 'desktop'].forEach((vp) => {
        const r = run(FILE, vp, { vhAboveRelease: restVh }, peek, -1, input);
        const isAbduction = r.landIdx === AREOLE && Math.abs(r.endP - SETTLE_TARGETS[AREOLE]) < 0.002;
        if (vp === 'mobile' && input === 'touch') {
          console.log(pad('release-' + restVh + 'vh', 20) + pad(peek + 'vh', 8) + pad(input, 8) +
            pad(r.end, 34) + (isAbduction ? 'ABDUCTED to Aréole (net ' + r.netVh + 'vh)' : 'ok'));
        }
        if (isAbduction) abducted++;
        total++;
      });
    });
  });
});
console.log('  -> ' + abducted + ' abductions / ' + total + ' peeks\n');

console.log('--- CRIME 2b: THE THRASH — abduction then counter-gesture chain ---');
(function thrash() {
  const vp = 'mobile';
  const { sim, v, g } = mkSim(FILE, vp);
  park(sim, v, g, { vhAboveRelease: 45 });
  const t0 = sim.trace.length;
  // peek up, get abducted, fight back down, get abducted again, three rounds
  for (let i = 0; i < 3; i++) {
    gesture(sim, v, g, 10, -1, 'touch');
    gesture(sim, v, g, 30, 1, 'touch');
  }
  const tr = sim.trace.slice(t0);
  let moving = 0, maxRun = 0, run = 0;
  tr.forEach((f) => { if (Math.abs(f.d) > 0.5) { moving++; run++; maxRun = Math.max(maxRun, run); } else run = 0; });
  console.log('  six alternating gestures: ' + (moving * G.FRAME_MS / 1000).toFixed(1) + 's of the page in motion, ' +
    'longest unbroken motion ' + (maxRun * G.FRAME_MS / 1000).toFixed(1) + 's');
  console.log('  ends at: ' + describe(P(sim, v, g), v, g));
})();
