=== SPEC (write to docs/IGNITION_kintsugi-scroll.md) ===
CONCEPT — validated in a Claude Design flow test; do not reinterpret.
Full-viewport pinned hero. A virtual camera pans/zooms across ONE statue image
between keyframes, scrubbed by native scroll. translate3d + scale + opacity
ONLY. Tone: calm, sculptural, museum dolly. Nothing moves except what the
scroll moves. No wheel/touch interception, no snap traps, native scroll speed.

ESTABLISHING FRAME (frame 0) — on the site's ivory token, full statue visible
with breathing room. Overlaid: H1 on a solid white block hugging the text
(slight padding, whisper-soft shadow at most) overlapping the statue; intro
paragraph; existing gold social icon row; "DÉFILER" hint in letterspaced small
caps with a thin vertical line, bottom center. All of it fades out over the
first ~3.5% of scroll progress — OPACITY FADE, NEVER UNMOUNTED (SEO + screen
readers keep the content).

TIMELINE — LOCKED. Pinned scroll length ~760vh. Establishing hold: 0.075 of
timeline. Dwell per stop: 0.062. Easing between stops: smootherstep
t*t*t*(t*(t*6-15)+10). Zoom interpolates in LOG space (constant perceived
speed). EXIT (Gate 2, resolved): after the Aréole dwell, pull back to the
establishing camera over the final ~0.09 of the timeline; the section releases
only once the full statue is back in frame; NO UI reappears during pull-back.

KEYFRAMES — LOCKED (fx, fy = focal point in image coords; s = zoom):
0 Establishing: full statue centered, scale fits viewport w/ breathing room
1 Alopécie    fx 0.385  fy 0.105  s 2.3
2 Sourcils    fx 0.520  fy 0.190  s 2.7
3 Eyeliner    fx 0.600  fy 0.220  s 3.1
4 Lèvres      fx 0.520  fy 0.312  s 3.2
5 Cicatrices  fx 0.485  fy 0.545  s 2.0
6 Aréole      fx 0.645  fy 0.665  s 2.3
7 Exit = keyframe 0
Wide-viewport intimacy compensation: k = 1 + ((vw/vh)/(390/844) - 1) * 0.18,
clamped [1, 1.35], multiplied into stop scales.

PER-STOP UI — appears only during dwell: fade+rise in with a 300ms delay AFTER
the camera settles; instant fade-out on leave; never animates during camera
movement. Aréole = pill (rounded-full, ivory fill, thin gold border, cacao
text ≥4.5:1 contrast, label + " >", real <a>). Other five = captions per LINK
LAW. Inactive stop elements: aria-hidden + tabindex="-1".

DOT RAIL — fixed left, vertically centered, 6 dots as <button>s with
aria-label = service name. Active: solid gold, scale 1.22. Inactive: 50%-gold
outline. Click → smooth-scroll to that stop's mid-dwell. Rail fades in after
progress 0.05.

GATE 1 (resolved) — DESKTOP FULL-BLEED. At the split tier (≥1024) the hero
breaks the 480px column floor, full viewport. Everything below resumes the
existing centered column on the same ivory: no divider, no shadow — the page
simply narrows after the statue releases. Below 1024: hero fills the viewport
as on mobile.

REDUCED MOTION / NO-JS — prefers-reduced-motion: reduce → no pinning, no
scrub: 6 static stacked sections (statue crop framed per that stop's keyframe
+ its caption/pill). This static layout is ALSO the no-JS baseline: H1,
paragraph, and the Aréole link must exist as plain markup that works with
scripts disabled; the scrub enhances progressively on top.

PERFORMANCE — image: explicit width/height, preloaded on the homepage,
decoding="async"; zero CLS (pinned height reserved before paint); scrub =
transform/opacity writes only, passive listeners + rAF with a setTimeout(32)
throttle fallback; will-change: transform on the film layer only.

CACHE LAW — read current main.css?v=N and bump to v=N+1 on ALL pages that
reference it.
=== END SPEC ===
