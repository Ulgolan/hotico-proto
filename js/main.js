// main.js — Lap 1b: homepage choreography. R-4 added video expand-in-place.
// Vanilla only, no libraries. Four behaviours:
//   A. Servicii pills — gold arrow toggles an inline panel (ABUNDANCE)
//   B. Before/After comparison slider inside each panel
//   C. Pasii transformarii — one card expands, others hide (FOCUS)
//   D. Découvrez video — truncated long text expands in place (R-4)
// Out of scope: burger, form logic.

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Height transition helper. <details>-free, so panels can animate
     from 0 to their natural height and back without hardcoding px.
  --------------------------------------------------------------- */
  var DUR = 340; // keep in step with .panel / .walk transition-duration

  // Scroll a section back to the top of the viewport. Read the target
  // AFTER the caller has finished changing layout — collapsing the
  // walkthrough removes ~650px, and a scroll aimed before that shrink
  // lands short. NO STRANDING: if a browser ignores the smooth request,
  // land it instantly rather than leaving the viewer mid-page.
  function scrollHome(el) {
    void el.offsetHeight;                     // force layout to settle
    var top   = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset);
    var start = window.pageYOffset;
    if (REDUCED) { window.scrollTo(0, top); return; }
    window.scrollTo({ top: top, behavior: 'smooth' });
    setTimeout(function () {
      var moved = Math.abs(window.pageYOffset - start) > 2;
      if (!moved && Math.abs(start - top) > 2) window.scrollTo(0, top);
    }, 350);
  }

  // Runs fn once the height transition on `el` itself settles. A timer
  // backs up transitionend: descendants inside these panels animate too
  // (arrow transform, slider width), and a missed event must never leave
  // a panel half-open. Whichever arrives first wins; fn runs exactly once.
  function settle(el, fn) {
    var spent = false;
    function finish(e) {
      if (e && (e.target !== el || e.propertyName !== 'height')) return;
      if (spent) return;
      spent = true;
      el.removeEventListener('transitionend', finish);
      clearTimeout(timer);
      fn();
    }
    var timer = setTimeout(finish, DUR + 80);
    el.addEventListener('transitionend', finish);
  }

  function expand(panel, onDone) {
    panel.hidden = false;
    if (REDUCED) { panel.style.height = 'auto'; if (onDone) onDone(); return; }
    panel.style.height = '0px';
    void panel.offsetHeight;            // synchronous reflow: pins the start
    panel.style.height = panel.scrollHeight + 'px';
    settle(panel, function () {
      panel.style.height = 'auto';
      if (onDone) onDone();
    });
  }

  function collapse(panel, onDone) {
    if (REDUCED) { panel.hidden = true; panel.style.height = ''; if (onDone) onDone(); return; }
    panel.style.height = panel.scrollHeight + 'px';
    void panel.offsetHeight;            // synchronous reflow: pins the start
    panel.style.height = '0px';
    settle(panel, function () {
      panel.hidden = true;
      panel.style.height = '';
      if (onDone) onDone();
    });
  }

  /* ---------------------------------------------------------------
     B. Before/After slider
     The source is one composite photo split at the handle line, so
     the two halves are different widths (173px / 212px). Each layer
     is drawn at full panel size and only the clip moves — dragging
     never rescales an image. Proto-grade; see LEDGER.
  --------------------------------------------------------------- */
  var START = 45; // % — matches the composite's own split (175/390)

  function initSlider(ba) {
    var before = ba.querySelector('[data-ba-before]');
    var seam   = ba.querySelector('[data-ba-seam]');
    var handle = ba.querySelector('[data-ba-handle]');
    var dragging = false;

    function set(pct) {
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      seam.style.left = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }

    function pctFromX(clientX) {
      var r = ba.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    }

    function onDown(e) {
      dragging = true;
      ba.classList.add('is-dragging');
      if (e.pointerId != null && handle.setPointerCapture) {
        try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      }
      e.preventDefault();
    }

    function onMove(e) {
      if (!dragging) return;
      var x = e.clientX != null ? e.clientX
            : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      if (x == null) return;
      set(pctFromX(x));
      e.preventDefault();
    }

    function onUp() {
      dragging = false;
      ba.classList.remove('is-dragging');
    }

    if (window.PointerEvent) {
      handle.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    } else {
      handle.addEventListener('mousedown', onDown);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      handle.addEventListener('touchstart', onDown, { passive: false });
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onUp);
    }

    // tap anywhere on the sample jumps the seam there
    ba.addEventListener('click', function (e) {
      if (e.target.closest('[data-ba-handle]')) return;
      set(pctFromX(e.clientX));
    });

    // keyboard
    handle.addEventListener('keydown', function (e) {
      var now = parseFloat(handle.getAttribute('aria-valuenow')) || START;
      var step = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowLeft')       { set(now - step); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { set(now + step); e.preventDefault(); }
      else if (e.key === 'Home')       { set(0);   e.preventDefault(); }
      else if (e.key === 'End')        { set(100); e.preventDefault(); }
    });

    set(START);
  }

  /* ---------------------------------------------------------------
     Shared carousel — one gesture vocabulary for video and reviews.

     Gesture compromise (video): a cross-origin <iframe> swallows every
     pointer event over the player, so a swipe started on the video
     itself cannot reach us. The swipe surface is therefore everything
     around it — the title, the description, the block's padding — and
     the DOTS are the primary navigation. Reviews have no iframe, so
     the whole card swipes.
  --------------------------------------------------------------- */
  function initCarousel(root) {
    var track  = root.querySelector('[data-track]');
    var slides = Array.prototype.slice.call(track.children);
    var dots   = Array.prototype.slice.call(root.querySelectorAll('[data-dots] .dot'));
    var index  = 0;
    var dragging = false, startX = 0, startY = 0, delta = 0, locked = null;

    function lazy(n) {
      [n, n + 1].forEach(function (k) {           // current + the next one
        var slide = slides[k];
        if (!slide) return;
        var frame = slide.querySelector('iframe[data-src]');
        if (!frame) return;
        frame.src = frame.getAttribute('data-src');
        frame.removeAttribute('data-src');
      });
    }

    function paint(offset) {
      track.style.transform =
        'translateX(calc(' + (-index * 100) + '% + ' + (offset || 0) + 'px))';
    }

    function go(n) {
      index = Math.max(0, Math.min(slides.length - 1, n));
      paint(0);
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === index);
        d.setAttribute('aria-current', k === index ? 'true' : 'false');
      });
      lazy(index);
    }

    dots.forEach(function (d) {
      d.addEventListener('click', function () { go(+d.getAttribute('data-go')); });
    });

    function down(e) {
      if (e.target.closest('[data-dots]')) return;   // dots handle themselves
      dragging = true; locked = null; delta = 0;
      startX = e.clientX; startY = e.clientY;
      root.classList.add('is-dragging');
    }

    function move(e) {
      if (!dragging) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (locked === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
      if (locked === 'y') { up(); return; }          // let the page scroll
      delta = dx;
      // resist at the ends so the track never feels unhinged
      if ((index === 0 && dx > 0) ||
          (index === slides.length - 1 && dx < 0)) delta = dx * 0.32;
      paint(delta);
      if (e.cancelable) e.preventDefault();
    }

    function up() {
      if (!dragging) return;
      dragging = false;
      root.classList.remove('is-dragging');
      var threshold = root.getBoundingClientRect().width * 0.15;
      if (delta <= -threshold) go(index + 1);
      else if (delta >= threshold) go(index - 1);
      else paint(0);
      delta = 0;
    }

    if (window.PointerEvent) {
      root.addEventListener('pointerdown', down);
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    } else {
      root.addEventListener('touchstart', function (e) {
        down(e.touches[0]);
      }, { passive: true });
      window.addEventListener('touchmove', function (e) {
        if (!dragging) return;
        var t = e.touches[0];
        move({ clientX: t.clientX, clientY: t.clientY,
               cancelable: e.cancelable, preventDefault: function () { e.preventDefault(); } });
      }, { passive: false });
      window.addEventListener('touchend', up);
    }

    go(0);
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);

  /* ---------------------------------------------------------------
     D. Découvrez video — expand-in-place teaser (R-4, sealed R-4 rat.).

     .video__long is always rendered (never `hidden` the way the pill/
     walk panels above start), so expand()/collapse() don't fit it as-
     is — their `hidden` bookkeeping assumes a panel with no closed-
     state box at all. This drives the SAME settle()/DUR engine on the
     `height` property instead — the transitionend/timeout machinery
     is not duplicated, only the open/close bookkeeping around it is
     new, because the two components don't share a starting state.
     Inline height is scratch space for the transition only: doClose()
     releases it once settle() lands, so the stylesheet's em-based
     clamp is back in control at rest and recomputes correctly across
     a resize or rotation instead of staying pinned to a stale px.

     TRAP 2 — the button sits on the carousel's swipe surface (see the
     comment above initCarousel). stopPropagation on the button's own
     pointerdown/touchstart keeps initCarousel's down() from ever
     seeing the gesture, so a tap can never get axis-locked into a
     drag and have its click eaten by move()'s preventDefault. Solved
     entirely outside initCarousel, per brief.

     Slide-change auto-collapse — also outside initCarousel: a
     MutationObserver watches the dots' class attribute. go() toggles
     .is-active there on every slide change, tap or swipe alike, so
     this catches both without initCarousel exposing any hook.

     Entry #45's stranding rescue (viewport follows the card) covers
     both ways a card can close: a reader's own « Voir moins » tap
     rescues to the SLIDE she was reading; a swipe that auto-collapses
     her open card out from under her rescues to the SECTION, so she
     lands oriented at its top with the newly active slide in view.
     Same guard both times — rescue only when the target has scrolled
     above the viewport — read after settle() so layout is at rest,
     never mid-shrink.
  --------------------------------------------------------------- */
  var videoSection = document.querySelector('.video');

  document.querySelectorAll('[data-carousel="video"] .carousel__slide').forEach(function (slide) {
    var long = slide.querySelector('[data-long]');
    var btn  = slide.querySelector('[data-more]');
    if (!long || !btn) return;

    var closedPx = long.getBoundingClientRect().height;
    var open = false;

    function doOpen() {
      open = true;
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Voir moins';
      long.style.height = long.scrollHeight + 'px';
      settle(long, function () { long.style.height = 'auto'; });
    }

    function doClose(rescueTarget) {
      open = false;
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Voir plus';
      long.style.height = long.scrollHeight + 'px';
      void long.offsetHeight;               // pin the current height before dropping it
      long.style.height = closedPx + 'px';
      settle(long, function () {
        long.style.height = '';             // release — stylesheet clamp governs at rest
        if (rescueTarget && rescueTarget.getBoundingClientRect().top < 0) scrollHome(rescueTarget);
      });
    }

    btn.addEventListener('click', function () {
      if (open) doClose(slide); else doOpen();
    });

    btn.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
    btn.addEventListener('touchstart', function (e) { e.stopPropagation(); }, { passive: true });

    slide.__collapseVideoLong = function () { if (open) doClose(videoSection); };
  });

  (function () {
    var videoDots = document.querySelector('[data-carousel="video"] [data-dots]');
    if (!videoDots) return;
    var slides = document.querySelectorAll('[data-carousel="video"] .carousel__slide');
    var lastActive = videoDots.querySelector('.dot.is-active');
    new MutationObserver(function () {
      var nowActive = videoDots.querySelector('.dot.is-active');
      if (nowActive === lastActive) return;
      lastActive = nowActive;
      slides.forEach(function (slide) {
        if (slide.__collapseVideoLong) slide.__collapseVideoLong();
      });
    }).observe(videoDots, { attributes: true, attributeFilter: ['class'], subtree: true });
  }());

  /* ---------------------------------------------------------------
     A. Servicii pills — ABUNDANCE MODE, several may sit open.
  --------------------------------------------------------------- */
  document.querySelectorAll('.pill__arrow').forEach(function (btn) {
    var wrap  = btn.closest('.pill-wrap');
    var pill  = wrap.querySelector('.pill');
    var panel = wrap.querySelector('.panel');
    var ba    = panel.querySelector('[data-ba]');
    var ready = false;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';

      if (open) {
        btn.setAttribute('aria-expanded', 'false');
        pill.classList.remove('is-open');
        collapse(panel);
      } else {
        btn.setAttribute('aria-expanded', 'true');
        pill.classList.add('is-open');
        expand(panel);
        if (!ready) { initSlider(ba); ready = true; }
      }
    });
  });

  /* ---------------------------------------------------------------
     C. Pasii transformarii — FOCUS MODE, one card open at a time.
  --------------------------------------------------------------- */
  var cards    = document.querySelector('[data-cards]');
  var walk     = document.getElementById('walk');
  var walkImg  = document.querySelector('[data-walk-img]');
  var walkLbl  = document.querySelector('[data-walk-label]');
  var collapseBtn = document.querySelector('[data-walk-collapse]');

  var focusedCard = null;

  if (cards && walk) {
    cards.querySelectorAll('.scard__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.scard');
        var img  = card.querySelector('img');
        focusedCard = card;   // RIDER 2 — remembered for the close-time
                           // scroll target below; the 3-across relic
                           // scrolled to the section top, which stopped
                           // matching the opened card once the stack
                           // made cards vertically distinct.

        // costume: the chosen card stays, the other two recede
        cards.querySelectorAll('.scard').forEach(function (c) {
          c.classList.toggle('is-hidden', c !== card);
        });
        cards.classList.add('is-focused');

        walkImg.src = img.getAttribute('src');
        walkLbl.textContent = card.querySelector('.scard__label').textContent;

        // three cards, three different bodies — swap in the matching phase
        var phase = card.getAttribute('data-step');
        walk.querySelectorAll('.walk__body').forEach(function (b) {
          b.hidden = b.getAttribute('data-phase') !== phase;
        });

        cards.querySelectorAll('.scard__btn').forEach(function (b) {
          b.setAttribute('aria-expanded', String(b === btn));
        });

        expand(walk);
      });
    });

    var pasii = document.querySelector('.pasii');

    collapseBtn.addEventListener('click', function () {
      collapse(walk, function () {
        cards.classList.remove('is-focused');
        cards.querySelectorAll('.scard').forEach(function (c) {
          c.classList.remove('is-hidden');
        });
        // RIDER 1 — scroll home. The target is read AFTER the cards are
        // back and a reflow is forced: collapsing removes ~650px, and a
        // scroll aimed before that shrink lands short and strands the
        // viewer mid-page. RIDER 2 — width-split target, evaluated HERE
        // (not cached at load, so a resize/rotation between open and
        // close still gets the right answer). Below 768, the stack
        // anchors to the card that was open (falls back to the section
        // for the no-card-was-open case, which shouldn't occur since
        // collapseBtn only exists while a card is focused) — the
        // section top sits above the heading, well clear of whichever
        // card the viewer was just reading. At 768+, the 3-across row
        // keeps the original section target: Commander-ruled B —
        // width-split — the certified desktop landing (heading visible
        // on close) stays as campaign-certified, only mobile follows
        // the card.
        var closeTarget = window.matchMedia('(max-width: 767px)').matches
          ? (focusedCard || pasii)
          : pasii;
        scrollHome(closeTarget);
      });
      cards.querySelectorAll('.scard__btn').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
      });
    });
  }
}());
