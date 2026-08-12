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
// WHAT THIS VERIFIES: runs every variants.js build through the probe.js corridor
// sweep and prints them side by side — restInWindow / white / tail / landings —
// so a mechanism is chosen on measurement rather than on argument.
//
// The table it produced is the reason corridor pre-emption shipped and the
// Tower's mechanism (a) did not: (a) and (b) both left the in-window frozen
// interval at 167ms; only (c) moved it, to 33ms.
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
const files = require('./variants');
const { sweep, worst } = require('./probe');

const CASES = [
  ['REV flick mobile', 'mobile', 'up', 'flick'],
  ['REV crawl mobile', 'mobile', 'up', 'crawl'],
  ['REV flick desktop', 'desktop', 'up', 'flick'],
  ['FWD flick mobile', 'mobile', 'down', 'flick'],
  ['FWD crawl mobile', 'mobile', 'down', 'crawl'],
  ['FWD flick desktop', 'desktop', 'down', 'flick']
];

const names = Object.keys(files);
console.log('metric: restInWindowMs / whiteMs / tailMs  (worst across corridor rests)  | land indices\n');
CASES.forEach(([label, vp, dir, kind]) => {
  console.log('## ' + label);
  names.forEach((n) => {
    const w = worst(sweep(vp, dir, kind, false, files[n]));
    console.log(
      '  ' + n.padEnd(11) +
      ' rest=' + String(w.restInWindowMaxMs).padStart(4) +
      '  white=' + String(w.whiteMsMax).padStart(4) +
      '  tail=' + String(w.tailMsMax).padStart(4) +
      '  land=[' + w.landIdxs.join(',') + ']' +
      '  flips=' + w.dirFlipsMax +
      '  settles=' + w.settlesMax
    );
  });
  console.log('');
});
