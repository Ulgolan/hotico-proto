=== IGNITION KEY — LAP K-6 / KINTSUGI HERO — MOBILE PROJECTION BUG ===
EXECUTOR: Claude Code session, Sonnet.
REPO: ~/projects/hotico-proto. BRANCH: continue on k-1-kintsugi-hero
(PR #15). NEVER commit to main. Drop this key into docs/ first.
BLAST RADIUS: js/hero-scroll.js + hero CSS viewport units. No keyframe
fx/fy value changes, no marker styling changes, no timeline changes.

SYMPTOM (Commander's iPhone, K-5 preview): desktop correct; on mobile
ALL SIX anchor dots sit systematically ~one body-zone too high
(Alopécie floats above the crown, Sourcils on the crown, Eyeliner on
the brow, Lèvres on the eye, Cicatrices on the neck, Aréole on the
sternum). Uniform offset ⇒ coordinate-space/viewport bug, NOT bad
fx/fy. Do not tune per-stop values.

INVESTIGATE, IN ORDER:
1. iOS dynamic viewport: any 100vh (pin height, camera fit math,
   establishing padding) sees the LAYOUT viewport; the user sees the
   VISUAL viewport. Migrate hero sizing to dvh (with vh fallback) and
   drive the JS math from a single measured viewport height
   (visualViewport.height where available, updated on resize/
   orientationchange), used consistently by BOTH the film transform
   AND the marker projection.
2. Single source of truth: markers must derive their screen position
   FROM the film's actual current transform applied to (fx,fy) — the
   exact same numbers, same function — never parallel math. Refactor
   if they're computed separately today.
3. Verify the k wide-viewport compensation is applied identically to
   film and markers (a k applied to one but not the other produces
   exactly this class of drift).

VERIFY: in DevTools iPhone emulation (390×844) AND with a shortened
visual viewport simulated (resize the window height ~-80px to mimic
the Safari bar): each dot must sit ON its body zone at every stop, and
the dot must track the SAME pixel of statue anatomy while the toolbar
state changes. Desktop 1440 must remain pixel-identical to K-5
(regression guard — screenshot establishing + two stops before/after).
SECONDARY RULE (apply only AFTER the projection fix): at any stop
where the pill now covers its own featured zone, the pill may flip to
the opposite side of the anchor dot (per-stop flag, default below).
CACHE LAW: bump touched files +1.
EXIT: push, PR #15 updated, NEW PREVIEW URL EXPLICIT, root cause named
in one sentence in the report, checks one by one, LEDGER entry (K-6
mobile projection root-cause fix).
=== END KEY ===
