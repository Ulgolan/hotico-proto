// form.js — Lap 2b: the Programare form, demo-grade.
// One shared implementation; both the homepage and the Areola page
// load this file. Facade law: nothing validates, everything advances.

(function () {
  'use strict';

  var root = document.querySelector('[data-steps]');
  if (!root) return;

  var track  = root.querySelector('[data-steps-track]');
  var steps  = Array.prototype.slice.call(root.querySelectorAll('.step'));
  var label  = document.querySelector('[data-step-label]');
  var bars   = Array.prototype.slice.call(document.querySelectorAll('.stepper__bars i'));
  var success = document.querySelector('[data-success]');
  var stepper = document.querySelector('.stepper');

  // Step 1's title differs per page ("Date contact" vs "Date personale");
  // read it once so we never overwrite the frame's own wording.
  var NAMES = [label ? label.textContent.trim() : '1. Contact',
               '2. Rendez-vous',
               '3. Particularités'];

  var index = 0;

  function sizeTo(step) {
    root.style.height = step.getBoundingClientRect().height + 'px';
  }

  function go(n) {
    index = Math.max(0, Math.min(steps.length - 1, n));
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    if (label) label.textContent = NAMES[index];
    bars.forEach(function (b, i) { b.classList.toggle('is-active', i === index); });
    sizeTo(steps[index]);
    // re-measure once the slide has settled: a step measured mid-transition
    // can report the outgoing step's height and leave dead space below.
    setTimeout(function () { sizeTo(steps[index]); }, 380);
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
      if (!revealName) { sizeTo(steps[index]); return; }

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
      sizeTo(steps[index]);
    });
  });

  /* ---- D. confirmation ---- */
  var confirm = document.querySelector('[data-confirm]');
  if (confirm && success) {
    confirm.addEventListener('click', function () {
      root.hidden = true;
      if (stepper) stepper.hidden = true;
      success.hidden = false;
    });
  }

  var reset = document.querySelector('[data-reset]');
  if (reset) {
    reset.addEventListener('click', function () {
      success.hidden = true;
      root.hidden = false;
      if (stepper) stepper.hidden = false;
      document.querySelectorAll('[data-reveal]').forEach(function (p) { p.hidden = true; });
      document.querySelectorAll('[data-val].is-on').forEach(function (d) {
        d.classList.remove('is-on');
      });
      go(0);
    });
  }

  go(0);
  window.addEventListener('resize', function () { sizeTo(steps[index]); });
}());
