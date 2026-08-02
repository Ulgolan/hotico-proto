// areola.js — Lap 2a: services page. Vanilla only.
//   B. tab bar (gold pill slides, panels swap)
//   C. Detalii accordions, FOCUS MODE + jukebox stage
//   D. Pret collapsibles, ABUNDANCE MODE + CTAs scroll to Contact

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollToEl(el) {
    var top = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset);
    var start = window.pageYOffset;
    if (REDUCED) { window.scrollTo(0, top); return; }
    window.scrollTo({ top: top, behavior: 'smooth' });
    // no stranding — same guard as the homepage
    setTimeout(function () {
      if (Math.abs(window.pageYOffset - start) < 2 &&
          Math.abs(start - top) > 2) window.scrollTo(0, top);
    }, 350);
  }

  /* ---------------- B. tabs ---------------- */
  var tabs   = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  var pill   = document.querySelector('[data-pill]');
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));

  function showTab(name) {
    tabs.forEach(function (t, i) {
      var on = t.getAttribute('data-tab') === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      if (on && pill) pill.style.transform = 'translateX(' + (i * 100) + '%)';
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute('data-panel') !== name;
      p.classList.toggle('is-active', !p.hidden);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showTab(t.getAttribute('data-tab')); });
  });

  /* ---------------- C. Detalii accordions — FOCUS MODE ----------------
     Jukebox law: play swaps the stage and scrolls to it. Closing an
     accordion never changes the record — the stage keeps the last one
     played.                                                            */
  var stage    = document.getElementById('stage-player');
  var nowLabel = document.querySelector('[data-now] b');
  var stageBox = document.querySelector('.stage');

  document.querySelectorAll('[data-faq]').forEach(function (item) {
    var head = item.querySelector('.faq__head');
    var body = item.querySelector('.faq__body');
    var play = item.querySelector('[data-play]');

    head.addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      document.querySelectorAll('[data-faq].is-open').forEach(function (o) {
        o.classList.remove('is-open');
        o.querySelector('.faq__head').setAttribute('aria-expanded', 'false');
        o.querySelector('.faq__body').hidden = true;
      });
      if (!open) {
        item.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
        body.hidden = false;
      }
    });

    if (play) {
      play.addEventListener('click', function () {
        var src   = play.getAttribute('data-src');
        var title = play.getAttribute('data-title');
        if (stage && src) stage.src = src;
        if (nowLabel && title) nowLabel.textContent = title;
        if (stageBox) scrollToEl(stageBox);
      });
    }
  });

  /* ---------------- D. Pret collapsibles — ABUNDANCE MODE ---------------- */
  document.querySelectorAll('[data-collapse]').forEach(function (btn) {
    var body = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.classList.toggle('is-open', !open);
      if (body) body.hidden = open;
    });
  });

  /* CTAs land on the always-on Contact form. No payments anywhere. */
  var contact = document.getElementById('contact');
  document.querySelectorAll('[data-goto-contact]').forEach(function (btn) {
    btn.addEventListener('click', function () { if (contact) scrollToEl(contact); });
  });

  showTab('detalii');
}());
