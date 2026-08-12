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
// WHAT THIS VERIFIES: nothing on its own — this is the engine. A minimal DOM
// shim, a virtual 60fps frame clock, and a virtual scroller, inside which the
// real js/hero-scroll.js is evaluated.
//
// Frame order models the HTML spec's update-the-rendering step:
//   timers -> user gesture motion -> wheel -> scroll events -> rAF callbacks
// which is the ordering hero-scroll.js's own expectingSelfScroll comment
// reasons about (a scrollTo written inside a rAF callback fires its scroll
// event in the NEXT frame's scroll steps).
//
// MODELS, added one bounce at a time as the campaign forced each one:
//   - touch events (touchstart/touchend/touchcancel) with e.touches.length
//   - wheel events, fired BEFORE the motion they cause (see D1)
//   - `separateScrollEvents`: the touch case, where a programmatic write and
//     the finger's own scroll are notified INDEPENDENTLY. Under the default
//     coalesced single event per frame, the bounce-1 machine-gun does not
//     reproduce at all — this flag is the difference between desktop passing
//     and mobile seizing.
//   - `overscrollPx`: iOS rubber-band, pageYOffset genuinely negative at the
//     top boundary and springing back, raising scroll events with no wheel and
//     no touch.
//   - native smooth-scroll (the rail's own motion), animated over ~30 frames
//     so a mid-flight interrupt is testable.
//   - auto-wheel is suppressed for the rest of a sim once any touch event is
//     dispatched: post-touchend momentum raises scroll but never wheel, and
//     that separation is what keeps stragglers from re-anchoring.
//
// KNOWN LIMITATION, not a defect: momentum is MODELLED (exponential decay),
// not captured from a device.
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

// R-2f LE COULOIR — trace harness.
// Runs the REAL js/hero-scroll.js (not a reimplementation) under a minimal
// DOM shim with a virtual 60fps frame clock and a virtual scroller, so the
// time-domain machinery (fade chase, settle debounce, settle ease) can be
// traced. The preview sandbox reports document.hidden===true, which kills
// rAF *and* throttles timers, so no in-browser trace of timed code is
// possible here (ledger #37/#38 precedent).
//
// Frame order models the HTML spec's update-the-rendering step:
//   timers -> user gesture motion -> scroll events -> rAF callbacks
// which is exactly the ordering hero-scroll.js's expectingSelfScroll
// comment reasons about (a scrollTo written inside a rAF callback fires its
// scroll event in the NEXT frame's scroll steps).

'use strict';
const fs = require('fs');

const FRAME_MS = 1000 / 60;

function makeEl(name) {
  const el = {
    __name: name,
    style: {},
    __classes: new Set(),
    offsetHeight: 0,
    __attrs: {},
    classList: {
      contains: (c) => el.__classes.has(c),
      add: (c) => el.__classes.add(c),
      remove: (c) => el.__classes.delete(c),
      toggle: (c, on) => { if (on === undefined) on = !el.__classes.has(c); on ? el.__classes.add(c) : el.__classes.delete(c); return on; }
    },
    setAttribute: (k, v) => { el.__attrs[k] = v; },
    getAttribute: (k) => (k in el.__attrs ? el.__attrs[k] : null),
    removeAttribute: (k) => { delete el.__attrs[k]; },
    __on: {},
    addEventListener: (ev, fn) => { (el.__on[ev] = el.__on[ev] || []).push(fn); },
    dispatch: (ev, e) => (el.__on[ev] || []).forEach((fn) => fn(e || {})),
    querySelector: () => null,
    querySelectorAll: () => [],
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 })
  };
  return el;
}

// Keyframe attributes lifted verbatim from index.html's [data-kh-stop] list.
const STOP_ATTRS = [
  { fx: '0.4700', fy: '0.1590', s: '1.2' },   // Sourcils
  { fx: '0.5010', fy: '0.1800', s: '1.35' },  // Eyeliner
  { fx: '0.4010', fy: '0.1920', s: '1.1' },   // Alopécie
  { fx: '0.4670', fy: '0.2525', s: '1.4' },   // Lèvres
  { fx: '0.4290', fy: '0.4220', s: '1.1' },   // Cicatrices
  { fx: '0.6150', fy: '0.5220', s: '1.1' }    // Aréole
];
const STOP_NAMES = ['Sourcils', 'Eyeliner', 'Alopécie', 'Lèvres', 'Cicatrices', 'Aréole'];

function boot(cfg) {
  const src = fs.readFileSync(cfg.file, 'utf8');

  // ---- virtual clock ----
  let vnow = 0;

  // ---- virtual scroller ----
  const maxScroll = cfg.docH - cfg.vh;
  const minScroll = -(cfg.overscrollPx || 0);   // iOS rubber-band headroom
  let scrollY = cfg.startScrollY != null ? cfg.startScrollY : 0;
  let scrollDirtySinceDispatch = false;

  // ---- element graph ----
  const html = makeEl('html');
  html.__classes.add('js-kh');
  const section = makeEl('section');
  const scrub = makeEl('scrub');
  const wrap = makeEl('wrap');
  const pin = makeEl('pin');
  const stage = makeEl('stage');
  const film = makeEl('film');
  const stopsWrap = makeEl('stopsWrap');
  const establish = makeEl('establish');
  const establishCopy = makeEl('establishCopy');
  const rail = makeEl('rail');

  establishCopy.offsetHeight = cfg.copyH;
  establish.querySelector = (sel) => (sel === '.kh__establish-copy' ? establishCopy : null);
  establish.querySelectorAll = () => [];

  const stopEls = STOP_ATTRS.map((a, i) => {
    const el = makeEl('stop' + i);
    el.__attrs['data-fx'] = a.fx;
    el.__attrs['data-fy'] = a.fy;
    el.__attrs['data-s'] = a.s;
    const link = makeEl('a' + i);
    el.querySelector = (sel) => (sel === 'a' ? link : null);
    return el;
  });
  const railBtns = STOP_NAMES.map((_, i) => {
    const b = makeEl('go' + i);
    b.__attrs['data-kh-go'] = String(i);
    return b;
  });
  rail.querySelectorAll = () => railBtns;

  wrap.getBoundingClientRect = () => ({
    top: cfg.wrapTopAbs - scrollY,
    left: 0,
    width: cfg.vw,
    height: cfg.wrapH
  });

  scrub.querySelector = (sel) => ({
    '[data-kh-wrap]': wrap,
    '[data-kh-pin]': pin,
    '[data-kh-stage]': stage,
    '[data-kh-film]': film,
    '[data-kh-stops]': stopsWrap,
    '[data-kh-establish]': establish,
    '[data-kh-rail]': rail
  }[sel] || null);
  scrub.querySelectorAll = (sel) => (sel === '[data-kh-stop]' ? stopEls : []);
  section.querySelector = (sel) => (sel === '[data-kh-scrub]' ? scrub : null);

  const document_ = {
    documentElement: html,
    querySelector: (sel) => (sel === '[data-kh]' ? section : null)
  };

  // ---- virtual event loop ----
  const rafQueue = [];
  let rafId = 1;
  const timers = [];
  let timerId = 1;
  const listeners = { scroll: [], resize: [], orientationchange: [], scrollend: [], touchstart: [], touchend: [], touchcancel: [], wheel: [] };

  const setTimeout_ = (fn, ms) => {
    const id = timerId++;
    timers.push({ id, time: vnow + (ms || 0), fn });
    return id;
  };
  const clearTimeout_ = (id) => {
    const i = timers.findIndex((t) => t.id === id);
    if (i >= 0) timers.splice(i, 1);
  };

  const logs = [];
  const console_ = { log: (...a) => logs.push({ t: vnow, msg: a.map(String).join(' ') }) };

  const window_ = {
    innerWidth: cfg.vw,
    innerHeight: cfg.vh,
    visualViewport: { width: cfg.vw, height: cfg.vh, addEventListener: (ev, fn) => { if (ev === 'resize') listeners.resize.push(fn); } },
    get pageYOffset() { return scrollY; },
    performance: { now: () => vnow },
    matchMedia: () => ({ matches: false }),
    console: console_,
    addEventListener: (ev, fn) => { if (listeners[ev]) listeners[ev].push(fn); },
    requestAnimationFrame: (cb) => { const id = rafId++; rafQueue.push({ id, cb }); return id; },
    cancelAnimationFrame: (id) => { const i = rafQueue.findIndex((r) => r.id === id); if (i >= 0) rafQueue.splice(i, 1); },
    scrollTo: (opts) => {
      if (opts.behavior === 'smooth') { smoothTarget = Math.max(minScroll, Math.min(maxScroll, opts.top)); smoothFrames = 30; return; }
      const y = Math.max(minScroll, Math.min(maxScroll, opts.top));
      progWrites++;
      if (y !== scrollY) { scrollY = y; scrollDirtySinceDispatch = true; progPendingDispatch = true; }
    }
  };
  let progWrites = 0;
  let smoothTarget = null, smoothFrames = 0;
  let progPendingDispatch = false;
  // hasScrollend is feature-detected as `'onscrollend' in window`
  if (cfg.hasScrollend) window_.onscrollend = null;

  const location_ = { search: '?khdebug=1' };

  const run = new Function('window', 'document', 'location', 'setTimeout', 'clearTimeout', 'console', 'performance', src);
  run(window_, document_, location_, setTimeout_, clearTimeout_, console_, window_.performance);

  // ---- frame pump ----
  let movedLastFrame = false;
  const trace = [];

  function stepFrame(gestureFn) {
    vnow += FRAME_MS;

    // 1. due timers, in time order
    for (;;) {
      timers.sort((a, b) => a.time - b.time);
      if (!timers.length || timers[0].time > vnow) break;
      const t = timers.shift();
      t.fn();
    }

    // native smooth-scroll (rail buttons) advances on its own, like the
    // platform's, and is NOT one of our per-frame ease writes
    if (smoothTarget != null && smoothFrames > 0) {
      const step = (smoothTarget - scrollY) / smoothFrames;
      scrollY += step; smoothFrames--;
      if (smoothFrames <= 0) { scrollY = smoothTarget; smoothTarget = null; }
      scrollDirtySinceDispatch = true;
    }

    // 2. user gesture motion (input arrives before the scroll steps)
    const before = scrollY;
    if (gestureFn) gestureFn();
    const userMoved = scrollY !== before;
    if (userMoved) scrollDirtySinceDispatch = true;
    // Wheel input. Fires with the motion, ahead of the frame's scroll steps,
    // as a real wheel event does. Suppressed for the rest of the sim once any
    // touch event has been dispatched: post-touchend momentum produces scroll
    // events but never wheel events, and that separation is exactly what keeps
    // stragglers from re-anchoring.
    if (userMoved && !touchSeen && cfg.autoWheel !== false) {
      // A real wheel event fires BEFORE the scroll it causes, so the listener
      // must see the PRE-motion position — that is what makes it the gesture's
      // true start. Firing it after shifted the anchor by one frame of travel,
      // which at a large per-frame step moved it a whole stop and made a legal
      // origin-1 landing look like a clamp violation. Rewind, dispatch, restore.
      const after = scrollY;
      scrollY = before;
      listeners.wheel.slice().forEach((fn) => fn({}));
      scrollY = after;
    }

    // 3. scroll steps.
    // Default: one coalesced scroll event per frame (spec-ish, and what a
    // main-thread-driven scroller does). separateScrollEvents models the
    // touch case, where the programmatic write and the finger's own scroll
    // are notified independently — so a self-write and a foreign write in
    // the same frame do NOT collapse into one event, and expectingSelfScroll
    // is consumed by the self one, leaving the finger's to read as foreign.
    const movedThisFrame = scrollDirtySinceDispatch;
    if (scrollDirtySinceDispatch) {
      scrollDirtySinceDispatch = false;
      const n = (cfg.separateScrollEvents && progPendingDispatch && userMoved) ? 2 : 1;
      progPendingDispatch = false;
      for (let i = 0; i < n; i++) listeners.scroll.slice().forEach((fn) => fn());
    } else if (movedLastFrame && cfg.hasScrollend) {
      // motion just ended -> scrollend
      listeners.scrollend.slice().forEach((fn) => fn());
    }
    movedLastFrame = movedThisFrame;

    // 4. rAF callbacks
    const due = rafQueue.splice(0, rafQueue.length);
    due.forEach((r) => r.cb(vnow));

    // 5. sample
    const fo = parseFloat(film.style.opacity);
    const so = parseFloat(stage.style.opacity);
    const prevY = trace.length ? trace[trace.length - 1].y : scrollY;
    trace.push({
      t: +vnow.toFixed(1),
      y: +scrollY.toFixed(2),
      d: +(scrollY - prevY).toFixed(2),
      moved: movedThisFrame,
      userMoved,
      progWrites,
      touch: touchDown,
      fo: isNaN(fo) ? null : fo,
      so: isNaN(so) ? null : so
    });
    progWrites = 0;
  }

  // Touch is dispatched from inside the gesture callback, i.e. in the task
  // phase before the frame's scroll steps — where real input events land.
  let touchDown = false;
  let touchSeen = false;
  function dispatchTouch(type, remaining) {
    touchSeen = true;
    touchDown = type === 'touchstart' ? true : (remaining || 0) > 0;
    listeners[type].slice().forEach((fn) => fn({ touches: { length: type === 'touchstart' ? 1 : (remaining || 0) } }));
  }

  return {
    stepFrame, trace, logs, dispatchTouch,
    railBtns, stopEls,
    get scrollY() { return scrollY; },
    setScrollY(y) { scrollY = Math.max(minScroll, Math.min(maxScroll, y)); scrollDirtySinceDispatch = true; },
    get minScroll() { return minScroll; },
    cfg, maxScroll
  };
}

module.exports = { boot, FRAME_MS, STOP_NAMES };
