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
// WHAT THIS VERIFIES: THE GESTURE MATRIX — the certified choreography spec.
// region x gesture x direction x input, every cell classified and checked
// against an invariant stated BEFORE the run. This is the artifact LEDGER
// entry #39 calls "the certified choreography spec"; docs/qa/gesture-matrix.md
// is its rendered form.
//
// Run it bare to grade the working tree; pass a path to grade any other build:
//   node matrix.js                          # current js/hero-scroll.js
//   node matrix.js ../snapshots/v22.js      # a historical build
//   MD=1 node matrix.js                     # emit the collapsed markdown table
//
// TO DIFF A CHANGE: run it before and after and compare the SUMMARY line and
// the per-cell verdicts. A cell that changes verdict is a choreography change
// and must be ruled on, not absorbed.
//
// DEFECT D4 LIVED HERE and is the reason this file is worth distrusting on
// sight: the original gesture set omitted the Commander's own 10vh flick and
// the free-zone region sat outside the abduction band, so the matrix returned
// a clean pass on the exact build it was written to indict. Both are fixed —
// `relaunch 10vh` and `free zone lo` (release-40vh) exist because of it — but
// the lesson is that a green matrix proves only that the cells you thought to
// write are green.
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
// R-2f ADDENDUM 2 — STEP 3: THE GESTURE MATRIX.
// region x gesture x direction x input, every cell classified and checked
// against an intention stated BEFORE the run.
const G = require('./gest');
const { mkSim, walkTo, gesture, park, describe, landmarks, pToVh, P, idxOf,
        SETTLE_TARGETS, AREOLE, RELEASE } = G;

const pad = (s, n) => String(s).padEnd(n);
const FILE = process.argv[2] || path.resolve(__dirname, '../../../js/hero-scroll.js');
const DOOR_COMMIT_VH = 7.5;

const STOP_NAMES = ['establish', 'Sourcils', 'Eyeliner', 'Alopécie', 'Lèvres', 'Cicatrices', 'Aréole'];
const REGIONS = [
  { key: 'establish', kind: 'stop', idx: 0 },
  { key: 'Sourcils', kind: 'stop', idx: 1 },
  { key: 'Eyeliner', kind: 'stop', idx: 2 },
  { key: 'Alopécie', kind: 'stop', idx: 3 },
  { key: 'Lèvres', kind: 'stop', idx: 4 },
  { key: 'Cicatrices', kind: 'stop', idx: 5 },
  { key: 'Aréole', kind: 'stop', idx: 6 },
  { key: 'exit strip', kind: 'raw', at: 'strip' },
  { key: 'corridor', kind: 'raw', at: 'corridor' },
  { key: 'free zone hi', kind: 'free', vhAbove: 25 },
  { key: 'free zone lo', kind: 'free', vhAbove: 40 },   // the Crime-2 abduction band
  { key: 'site', kind: 'site' }
];
const GESTURES = [
  { key: 'drift', vh: 3 },
  { key: 'relaunch', vh: 10 },      // the Commander's own failing flick
  { key: 'lazy', vh: 15 },
  { key: 'committed', vh: 40 }, { key: 'violent', vh: 120 }
];

function startP(v, g, region) {
  const L = landmarks(v);
  if (region.kind === 'stop') return SETTLE_TARGETS[region.idx];
  if (region.kind === 'raw') return region.at === 'strip'
    ? L.areoleDwellEnd + (1 / 100) * v.vh / g.total       // 1vh past the dwell end
    : (L.corridorLo + L.border) / 2;                      // corridor midpoint
  if (region.kind === 'free') return 1 - (region.vhAbove / 100) * v.vh / g.total;
  return 1;                                               // site: progress clamps at release
}

function place(sim, v, g, region) {
  if (region.kind === 'stop') { walkTo(sim, region.idx, v, g); return; }
  if (region.kind === 'free') { park(sim, v, g, { vhAboveRelease: region.vhAbove }); return; }
  if (region.kind === 'site') {
    walkTo(sim, RELEASE, v, g);
    let d = 600; const gf = () => { if (d <= 0) return; const s = Math.min(24, d); d -= s; sim.setScrollY(sim.scrollY + s); };
    for (let f = 0; f < 30; f++) sim.stepFrame(gf);
    for (let f = 0; f < 120; f++) sim.stepFrame(null);
    return;
  }
  // raw: reach the position and gesture IMMEDIATELY, before any settle can
  // intervene — this is the mid-chain case, the only way these are reachable.
  walkTo(sim, AREOLE, v, g);
  const to = v.wrapTopAbs + startP(v, g, region) * g.total;
  let rem = to - sim.scrollY;
  const n = Math.ceil(Math.abs(rem) / 24) + 1;
  const gf = () => { if (Math.abs(rem) < 0.25) return; const d = Math.abs(rem) < 24 ? rem : Math.sign(rem) * 24; rem -= d; sim.setScrollY(sim.scrollY + d); };
  for (let f = 0; f < n; f++) sim.stepFrame(gf);
}

// classify the outcome
function classify(sp, ep, v, g, region) {
  const L = landmarks(v);
  const near = (a, b) => Math.abs(a - b) < 0.002;
  // progress clamps at both ends; treat "scrolled above the wrap" as establish
  const epc = Math.max(0, Math.min(1, ep)), spc = Math.max(0, Math.min(1, sp));
  if (near(spc, epc)) return 'STAY';
  for (let i = 0; i < SETTLE_TARGETS.length; i++) {
    if (near(epc, SETTLE_TARGETS[i])) {
      if (region.kind === 'stop') {
        if (i === region.idx) return 'STAY';
        if (i === region.idx + 1) return 'ADVANCE-1';
        if (i === region.idx - 1) return 'RETREAT-1';
        return 'SKIP to idx' + i + ' (!)';
      }
      return i === RELEASE ? 'RELEASE' : (i === AREOLE ? 'ARÉOLE' : 'STOP idx' + i);
    }
  }
  if (epc >= L.border) return 'UNCAPTURED (free zone)';
  return 'UNCAPTURED (' + describe(epc, v, g) + ')';
}

// ---- THE INTENTION TABLE, stated BEFORE the run ----
//
// Five invariants, each traceable to a ruling on record. The governing region
// is where a gesture ENDS, not where it starts — that is what settle() reads.
//
// I1 DRIFT IMMUNITY   (this key)  a gesture <= DOOR_COMMIT_VH never changes
//                                 which stop you are on.
// I2 ONE STOP         (R-2d,      AMENDED by ADDENDUM 3: one semantic stop per
//    (amended)          Add.3)     gesture IN THE STORY DIRECTION (downward).
//                                  Downward byte-identical, Alopécie stays
//                                  unskippable; UPWARD is navigation and lands
//                                  nearest, unclamped — going home is a
//                                  destination, not a page of the story.
// I3 DOOR OBEDIENCE   (Door Rule) a committed gesture ending inside the exit
//                                 segment resolves the way you travelled —
//                                 never against your own thumb.
// I4 BORDER SUPREMACY (S. Border) a gesture ending at or past the Southern
//                                 Border is never captured at all.
// I5 AGREEMENT        (all)       mobile and desktop resolve identically.
//
// Where a gesture ends among the STOPS and is above the drift threshold, the
// outcome is the certified 30/70 coverage bias's to decide. The matrix records
// what it produces and asserts I2 only — re-deriving LAW here would be
// tautological.
function expected(region, gest, dir, v, g) {
  const L = landmarks(v);
  const sp = startP(v, g, region);
  const reach = Math.max(0, Math.min(1, sp + dir * (gest.vh / 100) * v.vh / g.total));
  if (region.kind === 'stop' && region.idx === 0 && dir < 0) return { want: 'N/A', law: '' };
  if (region.kind === 'site') return { want: 'UNCAPTURED', law: 'I4' };
  // progress clamps at release: a gesture whose reach runs past it simply ends
  // AT release, which is not a capture — the page ran out of film.
  const rawReach = sp + dir * (gest.vh / 100) * v.vh / g.total;
  if (rawReach >= 1) return { want: 'AT-RELEASE', law: 'I4' };
  if (reach >= L.border) return { want: 'UNCAPTURED', law: 'I4' };
  if (gest.vh <= DOOR_COMMIT_VH) {
    // drift: a stop keeps you; a mid-segment start resolves to its near side,
    // which is the machine's ordinary behaviour for a non-resting position.
    return { want: region.kind === 'stop' ? 'STAY' : 'NEAR-SIDE', law: 'I1' };
  }
  if (reach > L.areoleDwellEnd) return { want: dir > 0 ? 'DOWNWARD' : 'UPWARD', law: 'I3' };
  return { want: 'BIAS', law: 'I2' };
}

const VPS = ['mobile', 'desktop'];
const INPUTS = ['touch', 'wheel'];
let checked = 0, ok = 0, bad = [];
const rows = [];
const v0 = G.VIEWPORTS.mobile, g0 = G.geom(v0);

REGIONS.forEach((region) => {
  GESTURES.forEach((gest) => {
    [1, -1].forEach((dir) => {
      INPUTS.forEach((input) => {
        const outs = {}, deltas = {}, hops = {};
        const int = expected(region, gest, dir, v0, g0);
        let want = int.want; const law = int.law;
        if (region.kind === 'raw' && input === 'wheel') want = 'N/A';   // same-burst continuation
        VPS.forEach((vp) => {
          const { sim, v, g } = mkSim(FILE, vp);
          place(sim, v, g, region);
          const sp = P(sim, v, g);
          if (want === 'N/A') { outs[vp] = 'N/A'; return; }
          gesture(sim, v, g, gest.vh, dir, input);
          const ep = P(sim, v, g);
          outs[vp] = classify(sp, ep, v, g, region);
          const spc = Math.max(0, Math.min(1, sp)), epc = Math.max(0, Math.min(1, ep));
          deltas[vp] = epc - spc;
          hops[vp] = Math.abs(idxOf(epc) - idxOf(spc));
        });
        const goingDownExp = (deltas.mobile || 0) > 0;
        const got = outs.mobile;
        const agree = outs.mobile === outs.desktop;                       // I5
        // I2 as amended: the one-stop cap binds DOWNWARD only.
        const goingDown = (deltas.mobile || 0) > 0;
        const oneStop = want === 'UNCAPTURED' || !goingDown || (hops.mobile <= 1 && hops.desktop <= 1);
        let verdict;
        if (want === 'N/A') verdict = '—';
        else {
          checked++;
          let match;
          if (want === 'UNCAPTURED') match = got.startsWith('UNCAPTURED') || got === 'STAY';
          else if (want === 'AT-RELEASE') match = got === 'RELEASE' || got === 'ADVANCE-1' || got === 'STAY' || got.startsWith('UNCAPTURED');
          else if (want === 'STAY') match = got === 'STAY';
          else if (want === 'NEAR-SIDE') match = got === 'ARÉOLE' || got === 'RELEASE' || got === 'STAY';
          else if (want === 'DOWNWARD') match = deltas.mobile > -0.002 && deltas.desktop > -0.002;
          else if (want === 'UPWARD') match = deltas.mobile < 0.002 && deltas.desktop < 0.002;
          else match = goingDownExp ? (!/SKIP/.test(got) && !/SKIP/.test(outs.desktop)) : true;
          if (match && agree && oneStop) { verdict = 'ok'; ok++; }
          else {
            verdict = 'MISMATCH' + (!agree ? ' (I5)' : '') + (!oneStop ? ' (I2)' : '');
            bad.push({ region: region.key, gest: gest.key, dir, input, want, law, outs, hops });
          }
        }
        rows.push({ region: region.key, gest: gest.key, vh: gest.vh, dir: dir > 0 ? 'down' : 'up',
                    input, want, law, got, desktop: outs.desktop, verdict });
      });
    });
  });
});

console.log('=================================================================');
console.log(' THE GESTURE MATRIX — ' + rows.length + ' cells');
console.log(' DOOR_COMMIT_VH = ' + DOOR_COMMIT_VH + 'vh');
console.log(' I1 drift-immunity  I2 one-stop  I3 door-obedience  I4 border  I5 agreement');
console.log('=================================================================');
console.log(pad('region', 13) + pad('gesture', 14) + pad('dir', 6) + pad('input', 7) +
  pad('LAW', 5) + pad('EXPECT', 12) + pad('mobile', 25) + pad('desktop', 25) + 'verdict');
let lastRegion = null;
rows.forEach((r) => {
  if (r.region !== lastRegion) { console.log('  ' + '-'.repeat(105)); lastRegion = r.region; }
  console.log(pad(r.region, 13) + pad(r.gest + ' ' + r.vh + 'vh', 14) + pad(r.dir, 6) + pad(r.input, 7) +
    pad(r.law, 5) + pad(r.want, 12) + pad(r.got, 25) + pad(r.desktop, 25) + r.verdict);
});

console.log('\n' + '='.repeat(65));
console.log(' SUMMARY: ' + ok + '/' + checked + ' cells satisfy their invariant, ' + bad.length + ' mismatched');
if (bad.length) {
  console.log('\n MISMATCHES:');
  bad.forEach((b) => console.log('   ' + pad(b.region, 12) + pad(b.gest, 11) + pad(b.dir > 0 ? 'down' : 'up', 6) +
    pad(b.input, 7) + pad(b.law, 4) + 'want ' + pad(b.want, 12) +
    'mobile=' + pad(b.outs.mobile, 24) + 'desktop=' + b.outs.desktop));
}

// ---- condensed markdown emitter: every cell agrees across viewport and input,
// so collapse those two axes and note the agreement once.
if (process.env.MD) {
  const byCell = new Map();
  rows.forEach((r) => {
    const k = r.region + '|' + r.gest + ' ' + r.vh + 'vh|' + r.dir;
    if (!byCell.has(k)) byCell.set(k, new Set());
    byCell.get(k).add(r.got + (r.desktop !== r.got ? ' / ' + r.desktop : ''));
  });
  console.log('\n\n--- MARKDOWN ---\n');
  console.log('| region | gesture | dir | outcome |');
  console.log('|---|---|---|---|');
  let last = null;
  byCell.forEach((v, k) => {
    const [region, gest, dir] = k.split('|');
    const outs = [...v].filter((x) => x !== 'N/A');
    if (!outs.length) return;
    console.log('| ' + (region === last ? '' : '**' + region + '**') + ' | ' + gest + ' | ' + dir + ' | ' +
      outs.join(' · ') + ' |');
    last = region;
  });
}
