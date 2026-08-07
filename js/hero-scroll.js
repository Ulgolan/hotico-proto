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

  var IMG_W = 1639, IMG_H = 2048;

  // ---- LOCKED TIMELINE (see docs/IGNITION_kintsugi-scroll.md) ----
  var ESTABLISH_HOLD = 0.075;
  var ESTABLISH_FADE = 0.035;
  var DWELL = 0.062;
  var EXIT = 0.09;

  var STOPS = stopEls.map(function (el) {
    return {
      fx: parseFloat(el.getAttribute('data-fx')),
      fy: parseFloat(el.getAttribute('data-fy')),
      s: parseFloat(el.getAttribute('data-s')),
      el: el
    };
  });
  var N = STOPS.length;
  // fy is a placeholder here — recalc() overwrites it below before first
  // paint, and on every resize. Mutated in place (not reassigned) since
  // the 'exit' segment's `to` holds a reference to this same object.
  var ESTABLISH_KF = { fx: 0.5, fy: 0.5, isEstablish: true };

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

  function getScale(kf) {
    return kf.isEstablish ? establishScale : coverScale * kf.s * k;
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
      return { fx: 0.5, fy: ESTABLISH_KF.fy, scale: establishScale };
    }
    if (seg.type === 'dwell') {
      return { fx: seg.kf.fx, fy: seg.kf.fy, scale: getScale(seg.kf) };
    }
    // trans / exit — smootherstep on position, log-space on zoom
    var lt = clamp01((p - seg.start) / (seg.end - seg.start));
    var e = smootherstep(lt);
    var fx = lerp(seg.from.fx, seg.to.fx, e);
    var fy = lerp(seg.from.fy, seg.to.fy, e);
    var sFrom = getScale(seg.from), sTo = getScale(seg.to);
    var scale = Math.exp(lerp(Math.log(sFrom), Math.log(sTo), e));
    return { fx: fx, fy: fy, scale: scale };
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
    var ty = vh / 2 - cam.scale * cam.fy * IMG_H;
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
