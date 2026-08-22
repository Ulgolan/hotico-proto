// form.js — Lap 2b: the Programare form, demo-grade.
// One shared implementation; both the homepage and the Areola page
// load this file. Facade law: nothing validates, everything advances.

(function () {
  'use strict';

  var root = document.querySelector('[data-steps]');
  if (!root) return;

  var steps  = Array.prototype.slice.call(root.querySelectorAll('.step'));
  var label  = document.querySelector('[data-step-label]');
  var bars   = Array.prototype.slice.call(document.querySelectorAll('.stepper__bars i'));
  var success = document.querySelector('[data-success]');
  var stepper = document.querySelector('.stepper');

  // step titles; index 0 read from the page so per-page wording stays free.
  // Index 2 (Confirmation) has no .step slide of its own — the stepper
  // borrows it to label the success panel, set by hand below, not by go().
  var NAMES = [label ? label.textContent.trim() : '1. Rendez-vous',
               '2. Contact',
               '3. Confirmation'];

  var index = 0;

  function go(n) {
    index = Math.max(0, Math.min(steps.length - 1, n));
    steps.forEach(function (step, i) { step.hidden = i !== index; });
    if (label) label.textContent = NAMES[index];
    bars.forEach(function (b, i) { b.classList.toggle('is-active', i === index); });
  }

  root.addEventListener('click', function (e) {
    var next = e.target.closest('[data-next]');
    var back = e.target.closest('[data-back]');
    if (next) go(index + 1);
    if (back) go(index - 1);
  });

  /* ---- the one live disclosure (gentle-firm law: warn, never block) ---- */
  function setGroup(group, value) {
    group.querySelectorAll('[data-val]').forEach(function (d) {
      d.classList.toggle('is-on', d.getAttribute('data-val') === value);
    });
  }

  document.querySelectorAll('[data-group]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var dot = e.target.closest('[data-val]');
      if (!dot) return;
      var value = dot.getAttribute('data-val');
      setGroup(group, value);

      var revealName = group.getAttribute('data-reveals');
      var showOn     = group.getAttribute('data-reveal-on');
      if (!revealName) { return; }

      var panel = document.querySelector('[data-reveal="' + revealName + '"]');
      if (panel) panel.hidden = value !== showOn;

      // closing a parent must not strand its child open
      if (panel && panel.hidden) {
        panel.querySelectorAll('[data-group]').forEach(function (g) {
          setGroup(g, null);
          var childName = g.getAttribute('data-reveals');
          var child = childName &&
            document.querySelector('[data-reveal="' + childName + '"]');
          if (child) child.hidden = true;
        });
      }
    });
  });

  /* ---- D. confirmation ---- */
  var confirm = document.querySelector('[data-confirm]');
  if (confirm && success) {
    confirm.addEventListener('click', function () {
      /* ---- recomposition law: runs on every confirm click, so an
         edit-and-reconfirm always sends a freshly composed message. ---- */
      var recap = {};
      root.querySelectorAll('[data-recap]').forEach(function (el) {
        recap[el.getAttribute('data-recap')] = el.value.trim();
      });

      var selection = root.querySelector('[data-val].is-on');
      var procBase  = root.getAttribute('data-proc-base');
      var procedure = procBase
        ? procBase + (selection ? ' + ' + selection.getAttribute('data-val') : '')
        : (selection ? selection.getAttribute('data-val') : '—');

      var dateParts = (recap.date || '').split('-');
      var date = dateParts.length === 3
        ? dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]
        : '—';

      var heure  = recap.heure  || '—';
      var nom    = recap.nom    || '—';
      var tel    = recap.tel    || '—';

      var message =
        'Bonjour Alexandra ! Je souhaite confirmer mon rendez-vous 🌸\n' +
        'Date : ' + date + ' · Heure : ' + heure + ' · Procédure : ' + procedure + '\n' +
        'Nom : ' + nom + ' · Téléphone : ' + tel;

      window.open('https://wa.me/41796472106?text=' + encodeURIComponent(message),
        '_blank', 'noopener,noreferrer');

      root.hidden = true;
      success.hidden = false;
      // the stepper lives on: label + bar 3 light up by hand, since
      // go() has no third .step slide to size against.
      index = 2;
      if (label) label.textContent = NAMES[2];
      bars.forEach(function (b, i) { b.classList.toggle('is-active', i === 2); });
    });
  }

  /* ---- retour is navigation, not a wipe: it returns to Contact with
     every field, the date, and the selected procedure intact, so a
     correction is one edit away, not a re-fill. ---- */
  var reset = document.querySelector('[data-reset]');
  if (reset) {
    reset.addEventListener('click', function () {
      success.hidden = true;
      root.hidden = false;
      if (stepper) stepper.hidden = false;
      go(1);
    });
  }

  go(0);

  /* ---- E. confirmation carousel — testimonials, no-op if absent.
     Namespaced data-conf-* throughout: the house `[data-carousel]`
     selector in main.js (FROZEN) auto-inits any element carrying that
     bare attribute against its own `[data-track]` markup — colliding
     with this one crashes main.js's initCarousel on a null track. ---- */
  document.querySelectorAll('[data-conf-carousel]').forEach(function (carousel) {
    var ctrack = carousel.querySelector('[data-conf-track]');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-conf-slide]'));
    var dots   = Array.prototype.slice.call(carousel.querySelectorAll('[data-conf-dot]'));
    var dotsEl = carousel.querySelector('[data-conf-dots]');
    if (!ctrack || !slides.length) return;

    if (dotsEl) dotsEl.hidden = slides.length < 2;
    if (slides.length < 2) return; // one slide: static card, nothing to wire

    var ci = 0;
    function showSlide(n) {
      ci = Math.max(0, Math.min(slides.length - 1, n));
      ctrack.style.transform = 'translateX(' + (-ci * 100) + '%)';
      dots.forEach(function (d, di) { d.classList.toggle('is-active', di === ci); });
    }

    dots.forEach(function (dot, di) {
      dot.addEventListener('click', function () { showSlide(di); });
    });

    // pointer events alone: on touch devices they cover swipe too, so a
    // parallel touchstart/touchend pair would double-fire the same drag.
    var startX = null;
    ctrack.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    ctrack.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) < 30) return;
      showSlide(dx < 0 ? ci + 1 : ci - 1);
    });
    ctrack.addEventListener('pointercancel', function () { startX = null; });

    showSlide(0);
  });
}());
