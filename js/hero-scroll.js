// js/hero-scroll.js — K-1: kintsugi scroll hero.
// A virtual camera pans/zooms across one statue image between locked
// keyframes, scrubbed by native scroll. translate3d + scale + opacity
// only. Runs only when html.js-kh is set (gate script in <head>, before
// paint, keyed off prefers-reduced-motion) — otherwise the static
// markup already in the DOM is the whole story, no JS needed for it.

(function () {
  'use strict';

  if (!document.documentElement.classList.contains('js-kh')) return;

  var section = document.querySelector('[data-kh]');
  var scrub = section && section.querySelector('[data-kh-scrub]');
  if (!scrub) return;

  var wrap = scrub.querySelector('[data-kh-wrap]');
  var pin = scrub.querySelector('[data-kh-pin]');
  var stage = scrub.querySelector('[data-kh-stage]');
  var film = scrub.querySelector('[data-kh-film]');
  var stopsWrap = scrub.querySelector('[data-kh-stops]');
  var establish = scrub.querySelector('[data-kh-establish]');
  var stopEls = Array.prototype.slice.call(scrub.querySelectorAll('[data-kh-stop]'));
  var rail = scrub.querySelector('[data-kh-rail]');
  var railBtns = Array.prototype.slice.call(rail.querySelectorAll('[data-kh-go]'));

  var IMG_W = 1365, IMG_H = 2048;

  // R-2: prefers-reduced-motion is normally checked once, before paint,
  // by the gate script in <head> — reduced-motion never reaches this
  // file at all (html.js-kh is absent, .kh__static renders instead).
  // Re-checking here is redundant defense, not a live code path: it
  // only matters if that gate is ever loosened.
  var prefersReducedMotion = false;
  try {
    prefersReducedMotion = !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) {}

  // ---- LOCKED TIMELINE (see docs/IGNITION_kintsugi-scroll.md), in
  // absolute vh so R-2 B's cadence tuning and this tune-pass's
  // first-transition bonus (below) can both be exact, independent
  // numbers instead of fractions fighting over one shared denominator.
  // .kh__scrubwrap's height must equal TOTAL_VH — see main.css.
  var TOTAL_VH_BASE = 428; // 400 (R-2 B) + 28 (tune pass, finding 2 — see below). LAW: every fraction formula below still divides by THIS number, unchanged — see EXIT_BONUS_VH for why TOTAL_VH itself (used only for CSS height / the exit's own bonus term) is a different, larger number.
  var HOLD_VH = 30;                      // 0.075 * 400, B's tuned value
  var DWELL_VH = 24.8;                   // 0.062 * 400, B's tuned value
  var EXIT_VH = 36;                      // 0.09  * 400, B's tuned value
  var N_STOPS = 6;
  var TRANS_VH = (400 - HOLD_VH - DWELL_VH * N_STOPS - EXIT_VH) / N_STOPS; // ~30.87, B's tuned value
  // R-2 tune pass, finding 2 — Commander's recording measured the
  // establish->Sourcils crossing at ~0.25s on a normal flick, both on
  // mobile touch and desktop wheel; it read as a slam. A flick uses up
  // a short transition's runway near-instantly regardless of its easing
  // curve (smootherstep already ramps from/to zero velocity at both
  // ends — the "slam" is a DISTANCE problem, not a curve-shape one).
  // Fix: more runway for just this one segment. Added on top of the
  // total instead of carved out of another segment, so every other
  // stop's cadence stays exactly what B tuned — this doesn't touch
  // TRANS_VH/DWELL_VH/EXIT_VH above, it just pushes stop 1 onward
  // later by a fixed 28vh. Roughly doubles the first transition's own
  // length. Tune target for the next device walk, not a hard law.
  var FIRST_TRANS_BONUS_VH = 28;

  // R-2c EXIT EXTENSION — Commander ratified the dissolve's mid-
  // viewport timing (C1's uncompressed anchors, restored below) and
  // ordered the exit segment given the runway to actually hold it,
  // same precedent as FIRST_TRANS_BONUS_VH above: additive, not
  // carved out of anything else.
  // The naive version of "additive" — just bumping the shared
  // TOTAL_VH denominator from 428 to 478 and leaving every other
  // fraction's own /TOTAL_VH untouched — does NOT give byte-identical
  // per-stop distances: `total` (real scroll px, see update()) is
  // (TOTAL_VH-100)/100*vh, so growing TOTAL_VH alone grows the shared
  // denominator every OTHER segment's real length is measured
  // against too (measured: +3.19% drift on every non-exit segment at
  // 900px vh, HOLD 206.92px -> 213.51px, checked before writing this
  // — the SAME class of drift the original FIRST_TRANS_BONUS_VH pass
  // likely carried too, just never audited to this precision).
  // Fix: keep every EXISTING fraction dividing by the historical
  // TOTAL_VH_BASE (428, byte-identical formulas, untouched above)
  // exactly as before, then uniformly RESCALE all of them by
  // R_BASE/R_NEW — the ratio of the OLD real scroll range (328vh,
  // TOTAL_VH_BASE-100) to the NEW one (378vh, +EXIT_BONUS_VH) — which
  // exactly cancels the shared-denominator growth for every segment
  // EXCEPT the exit, which gets EXIT_BONUS_VH added on top, in real
  // vh terms, after the rescale. Algebraically the whole set still
  // sums to exactly 1 (RESCALE + EXIT_BONUS_VH/R_NEW = R_NEW/R_NEW),
  // and the scroll-distance table (PR) proves every non-exit segment
  // unchanged to the pixel at two viewports.
  var EXIT_BONUS_VH = 50;
  var R_BASE = TOTAL_VH_BASE - 100; // 328 — the OLD real scroll range, vh-equivalent
  var R_NEW = R_BASE + EXIT_BONUS_VH; // 378 — the NEW real scroll range; only the exit grew
  var TOTAL_VH = R_NEW + 100; // 478 — CSS height (.kh__scrubwrap/.kh, see main.css) follows this
  var RESCALE = R_BASE / R_NEW;

  var ESTABLISH_HOLD = (HOLD_VH / TOTAL_VH_BASE) * RESCALE;
  var ESTABLISH_FADE = (0.035 * 400 / TOTAL_VH_BASE) * RESCALE; // same absolute-vh fade distance as B tuned
  var DWELL = (DWELL_VH / TOTAL_VH_BASE) * RESCALE;
  var EXIT = (EXIT_VH / TOTAL_VH_BASE) * RESCALE + (EXIT_BONUS_VH / R_NEW);
  var TRANS = (TRANS_VH / TOTAL_VH_BASE) * RESCALE;
  var FIRST_TRANS_EXTRA = (FIRST_TRANS_BONUS_VH / TOTAL_VH_BASE) * RESCALE;
  // R-2 tune pass, finding 3 — hysteresis margin on the dwell-active
  // check only (see update()); TRANS (~31-59vh) is far larger than
  // 2*ACTIVE_PAD (~17vh combined), so adjacent stops' padded ranges
  // never touch.
  var ACTIVE_PAD = DWELL * 0.35;

  // R-2 C — per-stop viewport anchor placement (vertical fraction of the
  // pin the anchor point lands on, replacing the old flat vh/2 center).
  // fx/fy (LAW, from the markup) say WHERE ON THE IMAGE; this says WHERE
  // ON THE SCREEN — biasing it into the upper-middle kills the dead void
  // that opened above the head when every stop centered dead-on. Face
  // stops sit a touch higher (more torso/hair below reads as context);
  // the two chest stops (Cicatrices, Aréole — already lower on the body,
  // tighter local crop) sit closer to true center so they don't push
  // their own subject off the bottom edge. Index-matched to the DOM
  // order of [data-kh-stop] (Sourcils, Eyeliner, Alopécie, Lèvres,
  // Cicatrices, Aréole) — same order the anchors/pills are locked to.
  var DWELL_VY = [0.32, 0.30, 0.32, 0.34, 0.46, 0.46];

  // R-2 C — mobile-only zoom lift. data-s is untouched (still the R-1
  // Commander-approved zoom, LOCKED for every viewport) — this is an
  // ADDITIONAL multiplier that fades to exactly 1 (no-op) as `k`
  // (recalc()'s existing wide-viewport factor, below) reaches its own
  // 1.35 ceiling. Reason: raising data-s directly also raised it through
  // that ceiling, since desktop already sits at k's max — a face stop
  // that read as "commands the screen" on a phone became "all hair,
  // no face" at 1440px. Tapering against k means desktop math is
  // BYTE-IDENTICAL to pre-lap (boost=1 at k=1.35); only narrow/portrait
  // viewports (k near 1, where the bottom-heavy complaint was raised)
  // get the lift. Chest stops (Cicatrices, Aréole) needed no zoom help —
  // the vy shift alone already cleared their void — so their boost is 1.
  var MOBILE_ZOOM_BOOST = [1.35, 1.4, 1.3, 1.35, 1, 1];

  var STOPS = stopEls.map(function (el, idx) {
    return {
      fx: parseFloat(el.getAttribute('data-fx')),
      fy: parseFloat(el.getAttribute('data-fy')),
      s: parseFloat(el.getAttribute('data-s')),
      vy: DWELL_VY[idx] != null ? DWELL_VY[idx] : 0.5,
      mobileBoost: MOBILE_ZOOM_BOOST[idx] != null ? MOBILE_ZOOM_BOOST[idx] : 1,
      el: el
    };
  });
  var N = STOPS.length;
  // fy is a placeholder here — recalc() overwrites it below before first
  // paint, and on every resize. Mutated in place (not reassigned) since
  // the 'exit' segment's `to` holds a reference to this same object.
  var ESTABLISH_KF = { fx: 0.5, fy: 0.5, vy: 0.5, isEstablish: true };

  // ---- build the segment timeline ----
  var segments = [];
  segments.push({ type: 'hold', start: 0, end: ESTABLISH_HOLD });
  var t = ESTABLISH_HOLD;
  var prevKF = ESTABLISH_KF;
  var dwellByIndex = [];
  for (var i = 0; i < N; i++) {
    // finding 2 — only segment 0 (establish->Sourcils) gets the bonus.
    var thisTrans = TRANS + (i === 0 ? FIRST_TRANS_EXTRA : 0);
    var transStart = t, transEnd = t + thisTrans;
    segments.push({ type: 'trans', start: transStart, end: transEnd, from: prevKF, to: STOPS[i], stopIndex: i });
    t = transEnd;
    var dwellStart = t, dwellEnd = t + DWELL;
    var dwellSeg = { type: 'dwell', start: dwellStart, end: dwellEnd, kf: STOPS[i], stopIndex: i };
    segments.push(dwellSeg);
    dwellByIndex[i] = dwellSeg;
    t = dwellEnd;
    prevKF = STOPS[i];
  }
  segments.push({ type: 'exit', start: t, end: t + EXIT, from: prevKF, to: ESTABLISH_KF });

  // ---- viewport-derived camera constants (resize-only recompute) ----
  var vw, vh, coverScale, containScale, establishScale, k;
  var ESTABLISH_K = 0.92;     // fraction of contain-fit — "large, fully present"
  var ESTABLISH_TOP_RATIO = 0.18; // LAW past 768px — share of the vertical
                                   // slack left ABOVE the head; the rest goes
                                   // below. A fixed fy (K-3's 0.5, dead
                                   // center) put half the slack above her
                                   // crown at every aspect — fine on tall
                                   // mobile viewports where slack is
                                   // generous, but on short/wide desktop
                                   // viewports the image is nearly height-
                                   // bound already, so half-above reads as a
                                   // dead band under the header. Sizing the
                                   // gap as a RATIO of whatever slack actually
                                   // exists (rather than a fixed fy) keeps the
                                   // crown clear of the header at every width
                                   // without ever pushing it off-screen.
  // R-3b — on a narrow/tall phone containScale is width-bound (recalc()
  // below), leaving a LOT of vertical slack; 18% of a big number is still
  // a big dead band above the crown, and main.css's .kh__establish carried
  // a flat 40vh copy padding-top on top of that, independent of where the
  // statue actually sat. Commander's device walk (390x844/764, Brave)
  // read the sum as a dead crown of space while the scroll hint crowded
  // the bottom chrome. Fix: one shared upward PIXEL shift, applied
  // identically to the image's gap-above (ESTABLISH_TOP_RATIO's result)
  // and the copy's padding-top, so the two move as a single rigid
  // ensemble — the gap between image-bottom and copy-top (what the
  // .kh__veil gradient, untouched, was tuned against) stays exactly what
  // it was, just relocated higher in the pin. Independent deltas were
  // tried first and broke that relationship: the copy slid up faster
  // than the image, landing over a less-washed part of the statue.
  // Tapered by raw viewport WIDTH — not the k/wideT aspect taper below
  // (that one's shaped for in-scroll dwell framing, and leaks partial
  // values into in-between aspects like a tall 768-wide window).
  // establishMobileT() matches the literal 768px line main.css already
  // draws between mobile and desktop rules: any viewport >=768px wide is
  // mt=0, so both values below stay their exact ORIGINAL numbers,
  // unconditionally — desktop composition is untouched by construction.
  var ESTABLISH_LIFT_PX_MOBILE = 55; // tune target for device walk
  function establishMobileT() {
    return clamp01((768 - vw) / (768 - 390));
  }
  // K-6 FIX 1 — single measured viewport, used by every formula below
  // (film transform, establishing fy, progress) and by the marker
  // projection. window.innerWidth/Height is the LAYOUT viewport —
  // on iOS Safari that's sized as if the address/tab bar were
  // permanently hidden, taller than what's actually on screen.
  // visualViewport reports the real, currently-visible area and
  // fires its own resize event when the toolbar shows/hides (a
  // window 'resize' does not always fire for that).
  function measuredVW() {
    return (window.visualViewport && window.visualViewport.width) || window.innerWidth;
  }
  function measuredVH() {
    return (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  }

  function recalc() {
    vw = measuredVW();
    vh = measuredVH();
    coverScale = Math.max(vw / IMG_W, vh / IMG_H);
    containScale = Math.min(vw / IMG_W, vh / IMG_H);
    establishScale = containScale * ESTABLISH_K;
    var kRaw = 1 + ((vw / vh) / (390 / 844) - 1) * 0.18;
    k = Math.max(1, Math.min(1.35, kRaw));

    var imgH = establishScale * IMG_H;
    var slack = Math.max(0, vh - imgH);
    var mt = establishMobileT();
    var lift = ESTABLISH_LIFT_PX_MOBILE * mt; // 0 at >=768px — desktop untouched
    // gapTopBase is the original LAW formula's result (ESTABLISH_TOP_RATIO,
    // never edited); gapTop is that same number minus the shared lift,
    // floored at 0 so the image can never be pushed above the pin's own
    // top edge. solved from: gap_top = slack/2 - imgH*(fy-0.5)
    var gapTopBase = slack * ESTABLISH_TOP_RATIO;
    var gapTop = Math.max(0, gapTopBase - lift);
    ESTABLISH_KF.fy = 0.5 + (slack / 2 - gapTop) / imgH;

    // R-3b — copy block (H1/intro/socials/hint) moves with the statue by
    // the exact same `lift` px. mt===0 clears the inline override so
    // main.css's 40vh/40dvh alone governs, byte-identical to pre-lap.
    if (mt > 0) {
      var paddingBase = vh * 0.40;
      establish.style.paddingTop = Math.max(0, paddingBase - lift) + 'px';
    } else {
      establish.style.paddingTop = '';
    }
  }

  // Shared by getScale() and effectiveVy(): 0 at k=1 (mobile/reference
  // aspect, the device-walk target), 1 at k=1.35 (desktop's ceiling).
  function wideT() { return clamp01((k - 1) / 0.35); }

  function getScale(kf) {
    if (kf.isEstablish) return establishScale;
    // at k=1 the full mobileBoost applies; at k=1.35 boost collapses to
    // 1, exactly — desktop's zoom is untouched by this lap.
    var boost = lerp(kf.mobileBoost, 1, wideT());
    return coverScale * kf.s * k * boost;
  }

  // R-2 C — same taper for the vy placement bias: full mobile bias at
  // k=1, eases back to the original dead-center 0.5 at k=1.35. The wide
  // desktop crop showed WAY more image width than height at once (this
  // aspect's whole point), so shifting the anchor's vertical placement
  // there reshuffles a much larger fraction of the frame than it does
  // on a portrait phone — exactly the kind of desktop side-effect the
  // brief's "must not break desktop" line was guarding against.
  function effectiveVy(kf) {
    if (kf.isEstablish) return 0.5;
    return lerp(kf.vy, 0.5, wideT());
  }

  function clamp01(n) { return Math.max(0, Math.min(1, n)); }
  function lerp(a, b, e) { return a + (b - a) * e; }
  function smootherstep(x) {
    x = clamp01(x);
    return x * x * x * (x * (x * 6 - 15) + 10);
  }

  function findSegment(p) {
    for (var j = 0; j < segments.length; j++) {
      var seg = segments[j];
      if (p < seg.end || j === segments.length - 1) return seg;
    }
  }

  function camera(seg, p) {
    if (seg.type === 'hold') {
      return { fx: 0.5, fy: ESTABLISH_KF.fy, vy: 0.5, scale: establishScale };
    }
    if (seg.type === 'dwell') {
      return { fx: seg.kf.fx, fy: seg.kf.fy, vy: effectiveVy(seg.kf), scale: getScale(seg.kf) };
    }
    // trans / exit — smootherstep on position, log-space on zoom
    var lt = clamp01((p - seg.start) / (seg.end - seg.start));
    var e = smootherstep(lt);
    var fx = lerp(seg.from.fx, seg.to.fx, e);
    var fy = lerp(seg.from.fy, seg.to.fy, e);
    var vy = lerp(effectiveVy(seg.from), effectiveVy(seg.to), e);
    var sFrom = getScale(seg.from), sTo = getScale(seg.to);
    var scale = Math.exp(lerp(Math.log(sFrom), Math.log(sTo), e));
    return { fx: fx, fy: fy, vy: vy, scale: scale };
  }

  // R-2c TUNE — THE DISSOLVE, timed against the release point rather
  // than past it. Commander's C1: under the first cut (fade window
  // AFTER release), the incoming section's top had already climbed
  // above the viewport by the time the fade finished — the reveal
  // read as late. Fix: the window now sits BEFORE release, timed so
  // the fade COMPLETES while the incoming section's top is still no
  // higher than mid-viewport (that section's top tracks scrollY
  // 1:1 once it's in normal flow, so "top at mid-viewport" is simply
  // "FADE_END_OFFSET_VH of scroll left before release").
  //
  // Commander-ruled anchors, RESTORED to their uncompressed values:
  // end the fade 50vh before release, running for 25vh before that (a
  // 75vh window) — the exit segment's top lands EXACTLY at
  // mid-viewport when the dissolve completes. The first pass of this
  // ruling had to compress these (50->18, 25->9) because the exit
  // segment was only ~27.59vh long; per the EXIT EXTENSION above
  // (EXIT_BONUS_VH, additive, same precedent as FIRST_TRANS_BONUS_VH)
  // the exit segment is now EXIT_VH*R_BASE/TOTAL_VH_BASE +
  // EXIT_BONUS_VH = 36*328/428 + 50 ≈ 77.59vh — the 75vh window fits
  // with ~2.59vh to spare, still never opening before Aréole's own
  // dwell ends.
  var FADE_END_OFFSET_VH = 50;
  var FADE_DISTANCE_VH = 25;

  // ---- render ----
  var ticking = false;

  function update() {
    ticking = false;

    var rect = wrap.getBoundingClientRect();
    var total = rect.height - vh;
    var progress = total > 0 ? clamp01(-rect.top / total) : 0;

    var seg = findSegment(progress);
    var cam = camera(seg, progress);

    // R-2c TUNE — THE DISSOLVE, through white. Commander's C2: no
    // frame may ever show statue-over-video (a crossfade reads as
    // info-over-info); the handoff must read as white LIFTING OFF
    // content. Two-phase, both driven off the same fadeT:
    //   phase 1 (fadeT 0->0.5): the statue (.kh__film) fades to
    //   nothing while .kh__stage's own ivory background — the "veil"
    //   — stays fully opaque. By fadeT=0.5 the frame is pure ivory,
    //   indistinguishable from the page background; nothing of the
    //   arriving section is visible yet.
    //   phase 2 (fadeT 0.5->1): the veil itself (.kh__stage) fades,
    //   revealing whatever's beneath. film is already at opacity 0
    //   by this phase, so fading its ancestor (stage) on top doesn't
    //   double-fade anything visible — 0 times anything is still 0.
    // No new markup for the veil: .kh__stage already IS an opaque
    // ivory layer wrapping the film (see main.css), so fading it
    // directly is simpler than adding a dedicated overlay element,
    // and keeps this lap's footprint to JS + one data-hook.
    //
    // pxFromRelease is raw, UNCAPPED, and SIGNED scroll distance
    // relative to the release point (negative before it, 0 at it,
    // positive past it) — a pure function of current scroll position
    // (rect.top), never of `progress` (which clamps to 1 at release
    // and can't express "before" it) or of time, so reversing the
    // scroll re-traces the exact same curve, symmetrically, with no
    // pop at any point either direction. The window itself now sits
    // BEFORE release (C1) — see FADE_END_OFFSET_VH/FADE_DISTANCE_VH
    // above for why those two specific numbers.
    var pxFromRelease = -rect.top - total;
    var fadeWindowStartPx = -(FADE_END_OFFSET_VH + FADE_DISTANCE_VH) / 100 * vh;
    var fadeDistancePx = FADE_DISTANCE_VH / 100 * vh;
    var fadeT = clamp01((pxFromRelease - fadeWindowStartPx) / fadeDistancePx);
    var phase1T = clamp01(fadeT / 0.5);
    var phase2T = clamp01((fadeT - 0.5) / 0.5);
    var chromeOpacity = 1 - smootherstep(phase1T);
    film.style.opacity = chromeOpacity;
    stage.style.opacity = 1 - smootherstep(phase2T);
    // Measured, not assumed: the compressed window opens only ~0.6vh
    // after Aréole's literal dwell end (see FADE_END_OFFSET_VH's own
    // comment), but ACTIVE_PAD (LAW, R-2 tune pass finding 3,
    // untouched) keeps a just-left stop's .is-active — and therefore
    // its caption's own opacity:1/pointer-events:auto, main.css —
    // alive for a further ~6.7vh past that. The two overlap: for
    // roughly the first two-thirds of this window, Aréole's pill is
    // still technically on screen and clickable even as the statue
    // starts to fade, unless addressed here. Rather than touch
    // ACTIVE_PAD or the dwell system it belongs to (LAW), fold the
    // SAME chromeOpacity into .kh__stops (the pill is exactly the
    // "film chrome" phase 1 already claims) — an inactive stop is
    // already opacity:0 so this is a no-op for it, and whichever
    // stop is still mid-hysteresis fades out in the same breath as
    // the statue instead of lingering. main.css's
    // .kh__pin.is-fading .kh__stop.is-active .kh__caption rule
    // backstops pointer-events specifically, since opacity alone
    // never disables clicks.
    stopsWrap.style.opacity = chromeOpacity;
    // The trap: a fading-but-still-solid pin sits, in stacking terms,
    // ABOVE the video/carousel now showing through it (z-index:1,
    // see main.css) — pointer-events:auto there would let a
    // half-transparent ghost keep eating clicks meant for what's
    // underneath. Drops the INSTANT any fade starts (fadeT>0, not
    // just at full dissolve) and restores only once fully back at
    // rest (fadeT===0 exactly). Aréole's own CTA is fully interactive
    // through its entire dwell, which ends before this window can
    // open — verified via elementFromPoint mid-dwell, not just by
    // this reasoning; the overlap handled above is purely the
    // hysteresis tail, not the dwell itself.
    var fading = fadeT > 0;
    if (fading !== pin.__khFading) {
      pin.__khFading = fading;
      pin.classList.toggle('is-fading', fading);
    }
    // visibility:hidden is a paint-cost cut only, valid exactly at
    // fadeT===1 (both film and stage are already opacity 0 there
    // regardless) and un-set the instant fadeT drops below 1 —
    // clamp01 above means fadeT cannot exceed 1, so `>= 1` is exact
    // equality, not a fuzzy epsilon threshold.
    var dissolved = fadeT >= 1;
    if (dissolved !== pin.__khDissolved) {
      pin.__khDissolved = dissolved;
      pin.classList.toggle('is-dissolved', dissolved);
    }

    var tx = vw / 2 - cam.scale * cam.fx * IMG_W;
    var ty = vh * cam.vy - cam.scale * cam.fy * IMG_H;
    film.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0) scale(' + cam.scale + ')';

    // K-6 FIX 2 — markers derive their screen position FROM the film's
    // own tx/ty/scale, projecting each stop's (fx,fy) through the
    // exact same numbers used above — never parallel math. The old
    // approach (CSS flex-centering .kh__stop inside a 100vh box) is
    // mathematically equivalent ONLY when the CSS box's rendered
    // height exactly equals the JS `vh` — which K-6's own symptom
    // proved false on iOS. Projecting explicitly removes that
    // assumption instead of just narrowing the gap.
    STOPS.forEach(function (stop) {
      var mx = tx + cam.scale * stop.fx * IMG_W;
      var my = ty + cam.scale * stop.fy * IMG_H;
      stop.el.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    });

    // establishing overlay — opacity fade only, never unmounted
    var fadeT = clamp01(progress / ESTABLISH_FADE);
    var overlayOpacity = 1 - smootherstep(fadeT);
    establish.style.opacity = overlayOpacity;
    var faded = overlayOpacity < 0.02;
    if (faded !== establish.__khFaded) {
      establish.__khFaded = faded;
      establish.classList.toggle('is-hidden', faded);
      var links = establish.querySelectorAll('a');
      for (var li = 0; li < links.length; li++) {
        if (faded) links[li].setAttribute('tabindex', '-1');
        else links[li].removeAttribute('tabindex');
      }
    }

    // per-stop dwell UI — R-2 tune pass, finding 3: arrival at Lèvres
    // (desktop) showed the pill quick-appear/disappear/stabilize.
    // Root cause: activeStop was tied to the LITERAL dwell boundary via
    // findSegment(); a brief momentum overshoot just past that boundary
    // (settle() corrects it right back within a couple of ticks) flips
    // active->inactive->active fast enough to read as a flicker, even
    // though each individual state was technically correct for that
    // instant. Fix: hysteresis — the active check now uses each dwell's
    // OWN padded range directly (independent of findSegment/exact
    // boundary), so a small in-and-out doesn't cross it. Only the pill
    // visibility is padded; the camera's actual position (fx/fy/scale)
    // is untouched, so framing stays pixel-identical to R-2 C.
    var activeStop = -1;
    for (var di = 0; di < N; di++) {
      var d = dwellByIndex[di];
      if (progress >= d.start - ACTIVE_PAD && progress <= d.end + ACTIVE_PAD) {
        activeStop = di;
        break;
      }
    }
    STOPS.forEach(function (stop, idx) {
      var active = idx === activeStop;
      if (active === stop.el.__khActive) return;
      stop.el.__khActive = active;
      stop.el.classList.toggle('is-active', active);
      stop.el.setAttribute('aria-hidden', active ? 'false' : 'true');
      var link = stop.el.querySelector('a');
      if (link) {
        if (active) link.removeAttribute('tabindex');
        else link.setAttribute('tabindex', '-1');
      }
    });

    railBtns.forEach(function (btn, idx) {
      btn.classList.toggle('is-active', idx === activeStop);
    });
    rail.classList.toggle('is-visible', progress > 0.05 && seg.type !== 'exit');
  }

  var raf = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : function (cb) { return setTimeout(cb, 32); };
  // R-2b — cancel half of the raf/caf pair, needed once the settle ease
  // owns its own rAF loop (below) and must be able to stop cleanly.
  var caf = window.cancelAnimationFrame
    ? window.cancelAnimationFrame.bind(window)
    : clearTimeout;

  function onTick() {
    if (ticking) return;
    ticking = true;
    raf(update);
  }

  function onResize() {
    recalc();
    onTick();
  }

  window.addEventListener('scroll', onTick, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });
  // visualViewport fires its OWN resize when the toolbar shows/hides —
  // window doesn't always. Same recalc, same code path either way.
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onResize, { passive: true });
  }

  // ---- R-2 A — snap-on-settle ----
  // Native scroll still drives the camera the entire time — nothing here
  // intercepts a wheel/touch event or calls preventDefault. Once the
  // browser reports scroll has actually stopped, we ease the REST
  // position to whichever "stop" is nearest: the establishing frame
  // (progress 0), a dwell segment's own midpoint, or fully released
  // (progress 1 — statue back at establishing scale, section unpinned).
  // That is exactly the set findSegment()/camera() already treat as a
  // resting state, so nothing mid-transition is ever a valid landing.
  var SETTLE_TARGETS = [0].concat(dwellByIndex.map(function (seg) {
    return (seg.start + seg.end) / 2;
  })).concat([1]);
  var SETTLE_EPS = 0.004; // already resting within ~tolerance — skip the no-op scrollTo

  // R-2 tune pass, finding 1 — debug instrumentation. Off by default;
  // append ?khdebug=1 to log settle triggers (source, position, chosen
  // target, direction) to the console for a device-inspector session.
  // No iOS Simulator on this build machine (no full Xcode) to capture
  // real numbers directly — this is what the NEXT device walk reads.
  var KH_DEBUG = /[?&]khdebug=1\b/.test(location.search);
  function khlog() {
    if (KH_DEBUG && window.console) {
      console.log.apply(console, ['[kh]'].concat(Array.prototype.slice.call(arguments)));
    }
  }

  function currentProgress() {
    var rect = wrap.getBoundingClientRect();
    var total = rect.height - measuredVH();
    return total > 0 ? clamp01(-rect.top / total) : 0;
  }

  // lastRestProgress doubles as "where this gesture started": it only
  // ever updates when settle() confirms rest (see below), so for the
  // whole duration of a gesture it correctly holds the position the
  // user was at before they started moving — no separate gesture-start
  // tracking needed.
  var lastRestProgress = 0;

  // R-2 tune pass, finding 1b — Commander's normal flick off Sourcils
  // needed two tries to reach Eyeliner: the plain nearest-target pick
  // (a flat 50/50 split) judged his flick's travel as "lazy" and
  // snapped it back. Biased pick instead: figure out which way the
  // gesture was headed (current progress vs. where it started) and
  // require LESS travel in that direction to advance, MORE to reverse
  // it — advancing is the default assumption, snap-back is reserved
  // for a drag that covers less than ADVANCE_BIAS_FRAC of the gap.
  // 0.20 -> forward needs 30% coverage to advance (was 50%), backward
  // needs 70% coverage to reverse into advancing instead. Tune target
  // for the next device walk, not a hard law.
  var ADVANCE_BIAS_FRAC = 0.20;

  // R-2d — one-stop-per-gesture clamp. Commander law, ruled on device
  // evidence (a single vigorous flick skipped Alopécie outright, Tower
  // frame-forensics confirmed it): a gesture may advance AT MOST ONE
  // stop from the stop it began at, no matter how far the raw scroll
  // distance traveled. The bracket search above picks lo/hi from the
  // MOMENTARY progress `p` — on a hard flick that's already landed two
  // or three SETTLE_TARGETS past where the gesture started, so the old
  // code was biasing a choice between two targets neither of which was
  // adjacent to the origin. This clamps the outcome, not the search.
  //
  // Origin = `ref`, i.e. lastRestProgress. No new state needed: as the
  // comment above lastRestProgress's declaration already establishes,
  // it only ever updates at a GESTURE BOUNDARY — settle() confirming
  // rest, or an ease completing (easeTick's frac>=1 branch) — so for
  // the entire duration of one gesture it already holds exactly "the
  // stop where the gesture began". That's the same definition this key
  // asks for; reusing it is what keeps a wheel burst-chain correct too
  // (each burst's settle/ease completion re-arms the origin for the
  // next burst, so a chain can still walk multiple stops one at a
  // time — only a single unbroken gesture is capped at one).
  //
  // Establish (0) and release (1) are ordinary entries in SETTLE_TARGETS
  // and clamp like any other stop, per the key's own instruction.
  function settleTargetIndex(value) {
    var closest = 0, closestDist = Infinity;
    for (var i = 0; i < SETTLE_TARGETS.length; i++) {
      var d = Math.abs(SETTLE_TARGETS[i] - value);
      if (d < closestDist) { closestDist = d; closest = i; }
    }
    return closest;
  }

  function biasedSettleTarget(p, ref) {
    var lo = SETTLE_TARGETS[0], hi = SETTLE_TARGETS[SETTLE_TARGETS.length - 1];
    for (var i = 0; i < SETTLE_TARGETS.length - 1; i++) {
      if (p >= SETTLE_TARGETS[i] && p <= SETTLE_TARGETS[i + 1]) {
        lo = SETTLE_TARGETS[i]; hi = SETTLE_TARGETS[i + 1];
        break;
      }
    }
    if (hi === lo) return lo;
    var fracFromLo = (p - lo) / (hi - lo);
    var movingForward = p >= ref;
    var advanceThreshold = movingForward ? (0.5 - ADVANCE_BIAS_FRAC) : (0.5 + ADVANCE_BIAS_FRAC);
    var picked = fracFromLo >= advanceThreshold ? hi : lo;

    var originIdx = settleTargetIndex(ref);
    var pickedIdx = settleTargetIndex(picked);
    var clampedIdx = Math.max(originIdx - 1, Math.min(originIdx + 1, pickedIdx));
    return SETTLE_TARGETS[clampedIdx];
  }

  // ---- R-2b — the settle ease itself, owned instead of native ----
  // R-2's settle() handed the actual motion to the browser via
  // `window.scrollTo({behavior:'smooth'})`. Tower's frame-level motion
  // analysis of the Commander's device recording found two problems with
  // that, both traced to the same root cause: native smooth-scroll gives
  // us no control over its duration/curve and no way to cancel it short of
  // starting a second one.
  //
  // FINDING A — THE SLAM. A full stop-to-stop settle completed in ~0.5s
  // with near-instant rise to peak velocity (0->max in under 100ms),
  // read as violent. Fix: an ease we drive ourselves, frame by frame, so
  // duration and curve are both ours to set instead of whatever the
  // platform's native smooth-scroll happens to pick.
  //
  // FINDING B — THE STRAGGLER FIGHT. drag plateau -> 2-frame freeze ->
  // slam -> mid-slam hiccup -> freeze -> resume. Diagnosis: a late iOS
  // momentum scroll event arrives after the 140ms debounce has already
  // started a settle; the only way the old code had to react was to call
  // scrollTo again, which starts a SECOND native animation racing the
  // first instead of replacing it — the hiccup is that collision. Fix:
  // own the loop, so an incoming foreign scroll event can cancel it
  // outright (cancelAnimationFrame, no leftover animation to fight) and
  // re-arm the debounce for a fresh attempt once things go quiet.
  //
  // Curve: smootherstep (already defined above for the camera's spatial
  // easing) reused here in the TIME domain — zero velocity at both t=0
  // and t=1 by construction, i.e. gather, glide, land, no instant peak.
  // One curve, one mental model, for both what the camera does in space
  // and what the settle does in time.
  //
  // Duration: distance-proportional, normalized against the largest gap
  // between two adjacent SETTLE_TARGETS (computed once below) rather than
  // a hardcoded pixel number — a small in-gesture correction stays quick,
  // a full inter-stop travel is visibly longer, and the formula keeps
  // working un-retuned if SETTLE_TARGETS' own spacing ever changes.
  var SETTLE_EASE_MIN_MS = 220; // shortest ease — a small correction
  var SETTLE_EASE_MAX_MS = 640; // longest ease — a full stop-to-stop travel
  var SETTLE_MAX_GAP = (function () {
    var max = 0;
    for (var i = 0; i < SETTLE_TARGETS.length - 1; i++) {
      max = Math.max(max, SETTLE_TARGETS[i + 1] - SETTLE_TARGETS[i]);
    }
    return max;
  })();

  function settleEaseDuration(distanceFrac) {
    var t = SETTLE_MAX_GAP > 0 ? clamp01(distanceFrac / SETTLE_MAX_GAP) : 1;
    return SETTLE_EASE_MIN_MS + (SETTLE_EASE_MAX_MS - SETTLE_EASE_MIN_MS) * t;
  }

  function now() {
    return (window.performance && performance.now) ? performance.now() : Date.now();
  }

  // activeEase is the single source of truth for "is a settle in flight";
  // expectingSelfScroll distinguishes OUR per-frame scrollTo write (about
  // to fire its own 'scroll' event) from a foreign one arriving in the
  // same window. Per-spec, a scroll event queued by a synchronous write
  // dispatches during that frame's render-update step — after this frame's
  // rAF callbacks finish, before the next one runs — so the flag set right
  // before the write and consumed by the very next 'scroll' listener call
  // never races across frames.
  var activeEase = null;
  var expectingSelfScroll = false;

  function cancelEase() {
    if (!activeEase) return;
    if (activeEase.rafId != null) caf(activeEase.rafId);
    activeEase = null;
  }

  function easeTick(frameTime) {
    if (!activeEase) return;
    var e = activeEase;
    // frameTime is the rAF-supplied timestamp — same clock as now()
    // (performance.now()-based where available), read once by the
    // browser per frame rather than re-queried here.
    var elapsed = (typeof frameTime === 'number' ? frameTime : now()) - e.startTime;
    var frac = e.duration > 0 ? clamp01(elapsed / e.duration) : 1;
    var eased = smootherstep(frac);
    var y = e.startY + e.deltaY * eased;
    expectingSelfScroll = true;
    window.scrollTo({ top: y, behavior: 'auto' });
    if (frac >= 1) {
      activeEase = null;
      lastRestProgress = e.targetProgress;
      khlog('ease complete, target=', e.targetProgress.toFixed(4));
      return;
    }
    e.rafId = raf(easeTick);
  }

  function startEase(targetY, targetProgress, distanceFrac) {
    cancelEase();
    activeEase = {
      startTime: now(),
      startY: window.pageYOffset,
      deltaY: targetY - window.pageYOffset,
      duration: settleEaseDuration(Math.abs(distanceFrac)),
      targetProgress: targetProgress,
      rafId: null
    };
    khlog('ease start, duration=', Math.round(activeEase.duration) + 'ms',
      'target=', targetProgress.toFixed(4));
    activeEase.rafId = raf(easeTick);
  }

  // No re-entrancy flag: this same handler fires again once its own
  // ease comes to rest (scrollend, or the debounce fallback after its
  // last synthesized scroll event) — by then progress is within
  // SETTLE_EPS of `target` and the function is a no-op. Self-terminating.
  function settle(source) {
    var p = currentProgress();
    var target = biasedSettleTarget(p, lastRestProgress);
    if (Math.abs(target - p) < SETTLE_EPS) {
      khlog('rest confirmed, source=', source, 'p=', p.toFixed(4));
      lastRestProgress = target;
      return;
    }

    khlog('settle, source=', source, 'p=', p.toFixed(4), 'ref=', lastRestProgress.toFixed(4),
      'target=', target.toFixed(4), 'action=', target > p ? 'advance' : 'back');

    var rectNow = wrap.getBoundingClientRect();
    var totalNow = rectNow.height - measuredVH();
    if (totalNow <= 0) return;
    var wrapTopAbs = window.pageYOffset + rectNow.top;
    var targetY = wrapTopAbs + target * totalNow;

    if (prefersReducedMotion) {
      // untouched — instant jump, no ease. Dead code path today (the
      // js-kh gate in <head> keeps reduced-motion off this file
      // entirely) but kept exact in case that gate is ever loosened.
      window.scrollTo({ top: targetY, behavior: 'auto' });
      return;
    }

    startEase(targetY, target, target - p);
  }

  // R-2 tune pass, finding 1a — debounce used to be skipped entirely
  // whenever `scrollend` was supported, betting the whole settle
  // response on that one native event. That bet is the "1+ second of
  // frozen, pill-less limbo" Commander hit: iOS Safari's `scrollend`
  // is documented to sometimes fire well after motion looks finished
  // (feature-detecting `'onscrollend' in window` says nothing about
  // its firing latency). Now both run in parallel as of this pass —
  // debounce is a ~140ms-after-last-scroll-event safety net regardless
  // of whether/when scrollend shows up; scrollend, when prompt, wins
  // by clearing the pending debounce timer and settling immediately.
  // settle()'s own epsilon short-circuit makes firing both harmless.
  //
  // R-2b — the 140ms figure itself is untouched. It answers "how long
  // has it been quiet since the last scroll input", which is orthogonal
  // to finding B's bug (the ease fighting an event that arrives WHILE
  // it's running, not the wait before it starts). That fight is what the
  // self/foreign split below removes; 140ms keeps its original,
  // device-measured meaning.
  var hasScrollend = 'onscrollend' in window;
  var settleTimer = null;
  var SETTLE_DEBOUNCE_MS = 140;

  function scheduleSettleFallback() {
    if (activeEase) {
      if (expectingSelfScroll) {
        // our own per-frame write — expected, not a new event. Leave the
        // ease running and don't touch the debounce timer at all while
        // it's live: the ease knows exactly when it's done (easeTick's
        // own frac>=1 check), it doesn't need the debounce to confirm it.
        expectingSelfScroll = false;
        return;
      }
      // a scroll landed that we didn't write — finding B's straggler.
      // Cancel cleanly instead of letting a second write fight the
      // first, then fall through to re-arm the debounce below.
      khlog('foreign scroll during ease — cancel + rearm');
      cancelEase();
    }
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () { settle('debounce'); }, SETTLE_DEBOUNCE_MS);
  }

  window.addEventListener('scroll', scheduleSettleFallback, { passive: true });
  if (hasScrollend) {
    window.addEventListener('scrollend', function () {
      if (activeEase) {
        // our own instant per-frame writes can each read to the browser
        // as a discrete, already-ended scroll — scrollend firing mid-ease
        // is not a signal the EASE is done; easeTick's own completion
        // check is. Ignore it here.
        return;
      }
      clearTimeout(settleTimer);
      settle('scrollend');
    }, { passive: true });
  }

  railBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = parseInt(btn.getAttribute('data-kh-go'), 10);
      var dwellSeg = dwellByIndex[idx];
      if (!dwellSeg) return;
      var mid = (dwellSeg.start + dwellSeg.end) / 2;
      var rectNow = wrap.getBoundingClientRect();
      var totalNow = rectNow.height - measuredVH();
      var wrapTopAbs = window.pageYOffset + rectNow.top;
      window.scrollTo({ top: wrapTopAbs + mid * totalNow, behavior: 'smooth' });
    });
  });

  recalc();
  raf(update); // deferred one frame: painting the transform synchronously,
               // before the browser's first layout/paint cycle settles,
               // left the film layer unpainted until the next repaint trigger
}());
