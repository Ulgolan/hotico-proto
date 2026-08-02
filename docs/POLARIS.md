# POLARIS BRIEF — HOTICO PROTO
**Sealed 2026-08-01 · Verbatim canonical text · Audits measure against this document**

```
=== POLARIS BRIEF ===
Project: HOTICO Proto (hotico-proto)
Date: 2026-08-01

GOAL
Ship a live, phone-playable, mobile-first interactive prototype of
HOTICO's website — animating Alexa's Figma storyboard (pages, states,
tabs, steps, overlays) faithfully enough that the site's intended
behavior is understood by playing it, with no explanation needed.

AUDIENCE / BENEFICIARY
Primary: the webdev — vision transferred through his own fingers,
so conversation goes straight to the engine.
Secondary: Alexa — her brand made tangible for the first time.
Tertiary: ACP — the proto + State Map as his design-authority
artifact in the collaboration that follows.

NON-NEGOTIABLES
1. HONEST FACADES — every non-functional action routes somewhere
   real (WhatsApp / tel / mail), so the proto degrades gracefully
   and can never silently lie to a real visitor.
2. COMMANDER'S EYE ON EVERY MERGE — no screen ships without ACP
   grading taste against Alexa's frames; a working ugly thing is
   not done. Alexa ratifies anything touching her brand call.
3. THE FIGMA FILE STAYS UNTOUCHED — extraction only; the proto
   consumes copies, never edits the source.

OUT-OF-SCOPE
- The engine: booking logic, accounts, payments, data storage,
  CMS — named at dinner, never built here.
- Content: filler ships as filler; copy has a different owner
  and deadline.
- Alexa's product debt (AI imagery, photo quality, EN language,
  duplicate reviews) — parked on the HOTICO site ledger.
- A designed desktop surface: the proto ships mobile-first with
  a responsive adaptation art-directed by ACP on preview
  (centered max-width floor guarantees grace at all times);
  desktop as a designed-in-Figma surface with Alexa is future work.
- Tier 4 garnish (working swatch engine) until all prior tiers seal.

SUCCESS CRITERIA
1. FULL PROJECT (the bar): every page in the Figma file exists in
   the proto, and every designed state is reachable through its
   intended interaction — dropdowns dropping, golden tabs
   switching, menu overlaying, multi-step form advancing, connect
   flow flowing. The film plays; verified frame-by-frame against
   the State Map.
2. DINNER MILESTONE: the webdev navigates the sealed tiers on his
   phone unprompted and his questions are engine questions, not
   design questions.
3. The dinner ends with one named, dated next step.
4. Alexa sees her brand move and says some Romanian variant of
   "that's it."

=== END BRIEF ===
```

## Tier structure (Pareto, time-agnostic — every boundary is demoable)

- **T0 Keys** — rulings, canon, State Map, repo + pipeline. *(Sealed 2026-08-01.)*
- **T1 Foundation** — Homepage built completely; forges tokens, components, pipeline. Realistically 2–3 sub-laps (static → interactions → form).
- **T2 Spine** — menu overlay, Services (tabs live), Contact steps, dead-end pattern. **This IS the proto; everything below is garnish.**
- **T3 Garnish** — desktop art-direction lap, login facades, contact states.
- **T4 Rabbit Preserve** — enter only with T0–T3 sealed, knowingly.
- **Outside all tiers** — HOTICO site ledger (Alexa's product debt; see DOSSIER).
