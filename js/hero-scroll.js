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

  var IMG_W = 1024, IMG_H = 1536;

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
  function recalc() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    coverScale = Math.max(vw / IMG_W, vh / IMG_H);
    containScale = Math.min(vw / IMG_W, vh / IMG_H);
    establishScale = containScale * 0.86; // breathing room around the full statue
    var kRaw = 1 + ((vw / vh) / (390 / 844) - 1) * 0.18;
    k = Math.max(1, Math.min(1.35, kRaw));
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
      return { fx: 0.5, fy: 0.5, scale: establishScale };
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
    rail.classList.toggle('is-visible', progress > 0.05 && progress < 0.999);
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

  railBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = parseInt(btn.getAttribute('data-kh-go'), 10);
      var dwellSeg = dwellByIndex[idx];
      if (!dwellSeg) return;
      var mid = (dwellSeg.start + dwellSeg.end) / 2;
      var rectNow = wrap.getBoundingClientRect();
      var totalNow = rectNow.height - window.innerHeight;
      var wrapTopAbs = window.pageYOffset + rectNow.top;
      window.scrollTo({ top: wrapTopAbs + mid * totalNow, behavior: 'smooth' });
    });
  });

  recalc();
  update();
}());
