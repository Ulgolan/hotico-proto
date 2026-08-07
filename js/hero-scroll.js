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
  var film = scrub.querySelector('[data-kh-film]');
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

  // ---- LOCKED TIMELINE (see docs/IGNITION_kintsugi-scroll.md) ----
  var ESTABLISH_HOLD = 0.075;
  var ESTABLISH_FADE = 0.035;
  var DWELL = 0.062;
  var EXIT = 0.09;

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

  // Transitions fill whatever the locked hold/dwell/exit figures leave
  // behind, split evenly across the N camera moves (establish→1, then
  // between each consecutive pair). Not a separately-locked number —
  // arithmetic on the ones that are.
  var TRANS = (1 - ESTABLISH_HOLD - DWELL * N - EXIT) / N;

  // ---- build the segment timeline ----
  var segments = [];
  segments.push({ type: 'hold', start: 0, end: ESTABLISH_HOLD });
  var t = ESTABLISH_HOLD;
  var prevKF = ESTABLISH_KF;
  var dwellByIndex = [];
  for (var i = 0; i < N; i++) {
    var transStart = t, transEnd = t + TRANS;
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
  var ESTABLISH_TOP_RATIO = 0.18; // share of the vertical slack left ABOVE the
                                   // head; the rest goes below. A fixed fy
                                   // (K-3's 0.5, dead center) put half the
                                   // slack above her crown at every aspect —
                                   // fine on tall mobile viewports where slack
                                   // is generous, but on short/wide desktop
                                   // viewports the image is nearly height-
                                   // bound already, so half-above reads as a
                                   // dead band under the header. Sizing the
                                   // gap as a RATIO of whatever slack actually
                                   // exists (rather than a fixed fy) keeps the
                                   // crown clear of the header at every width
                                   // without ever pushing it off-screen.
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
    // solved from: gap_top = slack/2 - imgH*(fy-0.5) = slack*ESTABLISH_TOP_RATIO
    ESTABLISH_KF.fy = 0.5 + (slack * (0.5 - ESTABLISH_TOP_RATIO)) / imgH;
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

  // ---- render ----
  var ticking = false;

  function update() {
    ticking = false;

    var rect = wrap.getBoundingClientRect();
    var total = rect.height - vh;
    var progress = total > 0 ? clamp01(-rect.top / total) : 0;

    var seg = findSegment(progress);
    var cam = camera(seg, progress);

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

    // per-stop dwell UI
    var activeStop = seg.type === 'dwell' ? seg.stopIndex : -1;
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

  function currentProgress() {
    var rect = wrap.getBoundingClientRect();
    var total = rect.height - measuredVH();
    return total > 0 ? clamp01(-rect.top / total) : 0;
  }

  function nearestSettleTarget(p) {
    var best = SETTLE_TARGETS[0], bestDist = Math.abs(p - best);
    for (var i = 1; i < SETTLE_TARGETS.length; i++) {
      var d = Math.abs(p - SETTLE_TARGETS[i]);
      if (d < bestDist) { bestDist = d; best = SETTLE_TARGETS[i]; }
    }
    return best;
  }

  // No re-entrancy flag: this same handler fires again once its own
  // scrollTo comes to rest (scrollend, or the debounce fallback after
  // its last synthesized scroll event) — by then progress is within
  // SETTLE_EPS of `target` and the function is a no-op. Self-terminating.
  function settle() {
    var p = currentProgress();
    var target = nearestSettleTarget(p);
    if (Math.abs(target - p) < SETTLE_EPS) return;

    var rectNow = wrap.getBoundingClientRect();
    var totalNow = rectNow.height - measuredVH();
    if (totalNow <= 0) return;
    var wrapTopAbs = window.pageYOffset + rectNow.top;
    window.scrollTo({
      top: wrapTopAbs + target * totalNow,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }

  var hasScrollend = 'onscrollend' in window;
  var settleTimer = null;
  var SETTLE_DEBOUNCE_MS = 140; // iOS Safari fallback where scrollend is unsupported

  function scheduleSettleFallback() {
    if (hasScrollend) return;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, SETTLE_DEBOUNCE_MS);
  }

  window.addEventListener('scroll', scheduleSettleFallback, { passive: true });
  if (hasScrollend) {
    window.addEventListener('scrollend', settle, { passive: true });
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
