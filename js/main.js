// main.js — Lap 1b: homepage choreography.
// Vanilla only, no libraries. Three behaviours:
//   A. Servicii pills — gold arrow toggles an inline panel (ABUNDANCE)
//   B. Before/After comparison slider inside each panel
//   C. Pasii transformarii — one card expands, others hide (FOCUS)
// Out of scope this lap: video carousel, burger, form logic.

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Height transition helper. <details>-free, so panels can animate
     from 0 to their natural height and back without hardcoding px.
  --------------------------------------------------------------- */
  var DUR = 340; // keep in step with .panel / .walk transition-duration

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

  if (cards && walk) {
    cards.querySelectorAll('.scard__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.scard');
        var img  = card.querySelector('img');

        // costume: the chosen card stays, the other two recede
        cards.querySelectorAll('.scard').forEach(function (c) {
          c.classList.toggle('is-hidden', c !== card);
        });
        cards.classList.add('is-focused');

        walkImg.src = img.getAttribute('src');
        walkLbl.textContent = card.querySelector('.scard__label').textContent;

        cards.querySelectorAll('.scard__btn').forEach(function (b) {
          b.setAttribute('aria-expanded', String(b === btn));
        });

        expand(walk);
      });
    });

    collapseBtn.addEventListener('click', function () {
      collapse(walk, function () {
        cards.classList.remove('is-focused');
        cards.querySelectorAll('.scard').forEach(function (c) {
          c.classList.remove('is-hidden');
        });
      });
      cards.querySelectorAll('.scard__btn').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
      });
    });
  }
}());
