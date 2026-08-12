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
// WHAT THIS VERIFIES: nothing on its own — it GENERATES candidate builds by
// patching the real hero-scroll.js, so competing mechanisms can be measured
// against each other with exactly one variable changed. Used in the original lap
// to choose between:
//   (a)  window exclusion in settle   — the Tower's lean
//   (b)  direction-split chase cap
//   (a') corridor escape urgency
//   (c)  corridor rest pre-emption    — what actually shipped
// Writes var_*.js siblings. Pair with compare.js.
//
// This is the file that proved (a) was DEAD CODE: it left restInWindow at
// 167ms, identical to doing nothing.
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
// Generates candidate variants by patching the real hero-scroll.js, so every
// measurement runs the same machinery with exactly one variable changed.
const fs = require('fs');
const BASE = path.resolve(__dirname, '../../../js/hero-scroll.js');
const src = fs.readFileSync(BASE, 'utf8');

function must(s, find, repl) {
  if (s.indexOf(find) < 0) throw new Error('anchor not found: ' + find.slice(0, 70));
  return s.replace(find, repl);
}

// --- (b) direction-split chase cap: 520 up (dissolve, LAW), faster down ---
function chaseSplit(s, downMs) {
  s = must(s, 'var FADE_CHASE_MS = 520;',
    'var FADE_CHASE_MS = 520;\n  var FADE_CHASE_DOWN_MS = ' + downMs + ';');
  s = must(s,
    '      var maxStep = dtMs / FADE_CHASE_MS;\n      var diff = targetFadeT - renderedFadeT;',
    '      var diff = targetFadeT - renderedFadeT;\n      var maxStep = dtMs / (diff < 0 ? FADE_CHASE_DOWN_MS : FADE_CHASE_MS);');
  return s;
}

// --- (a') corridor escape urgency: a settle STARTING inside the fade window
// crosses it on the short end of the ease band instead of the distance-
// proportional one. ---
function escapeUrgency(s, ms) {
  s = must(s, '  function settleEaseDuration(distanceFrac) {',
    '  var CORRIDOR_ESCAPE_MS = ' + ms + ';\n' +
    '  function fadeTAtProgress(p) {\n' +
    '    var rect = wrap.getBoundingClientRect();\n' +
    '    var totalNow = rect.height - measuredVH();\n' +
    '    if (totalNow <= 0) return 0;\n' +
    '    var vhNow = measuredVH();\n' +
    '    var px = (p - 1) * totalNow;\n' +
    '    var startPx = -(FADE_END_OFFSET_VH + FADE_DISTANCE_VH) / 100 * vhNow;\n' +
    '    return clamp01((px - startPx) / (FADE_DISTANCE_VH / 100 * vhNow));\n' +
    '  }\n' +
    '  function settleEaseDuration(distanceFrac) {');
  s = must(s, '    startEase(targetY, target, target - p);',
    '    var ft = fadeTAtProgress(p);\n' +
    '    startEase(targetY, target, target - p, ft > 0 && ft < 1);');
  s = must(s, '  function startEase(targetY, targetProgress, distanceFrac) {\n    cancelEase();',
    '  function startEase(targetY, targetProgress, distanceFrac, urgent) {\n    cancelEase();');
  s = must(s, '      duration: settleEaseDuration(Math.abs(distanceFrac)),',
    '      duration: urgent\n' +
    '        ? Math.min(CORRIDOR_ESCAPE_MS, settleEaseDuration(Math.abs(distanceFrac)))\n' +
    '        : settleEaseDuration(Math.abs(distanceFrac)),');
  return s;
}

// --- (c) corridor rest pre-emption: inside the fade window a single
// motionless frame is enough to declare rest, because no SETTLE_TARGET lies
// inside the window — there is nothing there to wait for. ---
function preempt(s) {
  s = must(s, '  var fadeChaseLastTime = null;',
    '  var fadeChaseLastTime = null;\n  var corridorWatchY = null;\n  var corridorFired = false;');
  s = must(s,
    '    if (renderedFadeT !== targetFadeT) onTick();\n  }',
    '    var inCorridor = targetFadeT > 0 && targetFadeT < 1;\n' +
    '    if (inCorridor && !activeEase) {\n' +
    '      var yNow = window.pageYOffset;\n' +
    '      if (corridorWatchY !== yNow) { corridorWatchY = yNow; corridorFired = false; }\n' +
    '      else if (!corridorFired) { corridorFired = true; clearTimeout(settleTimer); settle("corridor"); }\n' +
    '    } else {\n' +
    '      corridorWatchY = null; corridorFired = false;\n' +
    '    }\n' +
    '    if (renderedFadeT !== targetFadeT ||\n' +
    '        (inCorridor && !activeEase && !corridorFired)) onTick();\n  }');
  return s;
}

const variants = {
  'base': (s) => s,
  'c': (s) => preempt(s),
  'c+b260': (s) => preempt(chaseSplit(s, 260)),
  'c+b180': (s) => preempt(chaseSplit(s, 180)),
  'c+b260+a240': (s) => preempt(escapeUrgency(chaseSplit(s, 260), 240)),
  'b260': (s) => chaseSplit(s, 260),
  'b180': (s) => chaseSplit(s, 180),
  'a240': (s) => escapeUrgency(s, 240),
  'b260+a240': (s) => escapeUrgency(chaseSplit(s, 260), 240),
  'b260+a300': (s) => escapeUrgency(chaseSplit(s, 260), 300),
  'b180+a240': (s) => escapeUrgency(chaseSplit(s, 180), 240)
};

const out = {};
Object.keys(variants).forEach((k) => {
  const p = __dirname + '/var_' + k.replace(/\+/g, '_') + '.js';
  fs.writeFileSync(p, variants[k](src));
  out[k] = p;
});
module.exports = out;
if (require.main === module) console.log(JSON.stringify(out, null, 2));
