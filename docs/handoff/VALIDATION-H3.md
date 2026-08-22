# VALIDATION-H3 — hostile validation of PRODUCTION-HANDOFF.md

**Audience: Commander ↔ Tower only. Not client-facing.**

| | |
|---|---|
| Validates | `docs/handoff/PRODUCTION-HANDOFF.md`, contract version 1.0 (2026-08-22) |
| Session | Lap H-3, fresh adversarial validator — did not author the document under review |
| Branch | `handoff-h2-draft` |
| Verdict authority | This document reports findings. It does not certify. Certification and merge remain the Tower's and Commander's, per the H-3 ignition key. |

---

## STEP 1 — Mandated correction

Applied exactly as keyed, in §9.3's known-debt paragraph. Verified against source before applying:

- `servicii/areola.html:43-47` nav links: `?s=Cicatrici`, `?s=Alopecie`, `?s=Sprancene`, `?s=Eyeliner`, `?s=Buze`.
- `js/soon.js:4` whitelist: `['Sourcils','Eyeliner','Alopécie','Lèvres','Cicatrices']`, matched case-insensitively.
- Case-insensitive match result: `Cicatrici`✗, `Alopecie`✗ (missing accent), `Sprancene`✗ (different word), `Eyeliner`✓, `Buze`✗ (different word) — **4 of 5 fail, 1 (`Eyeliner`) matches and works.**

This confirms the mandated correction's factual content exactly. Text changed as specified — the "None of areola's own nav links match" claim, and the "any other placeholder service" phrase. **GREEN.**

---

## STEP 2 — Sweep

The standing exclusion sweep (pattern defined in the campaign ignition keys; deliberately not reproduced in repository documents) run against the corrected `docs/handoff/PRODUCTION-HANDOFF.md` → **zero hits.** Detector run unmodified as instructed. **GREEN.**

---

## STEP 3 — Hostile pass

### 3a. Re-sampled claims (5, excluding the H-1/H-2-verified set)

| # | Claim | Verdict |
|---|---|---|
| 1 | `ADVANCE_BIAS_FRAC = 0.20` in `js/hero-scroll.js`, classed DESIGN CONSTANT, "certified 30/70... LAW, value untouched" per gesture-matrix.md | **MATCH** on the letter — but see Finding F2 below, a real undisclosed conflict |
| 2 | `FADE_CHASE_MS`=520 / `FADE_CHASE_DOWN_MS`=260, "midpoint of a blessed 450-600ms range" | **MATCH** — `js/hero-scroll.js:425-427,430,444`, "blessed" language confirmed at line 439 |
| 3 | `LEDGER.md` #61 device certification quote (iOS Safari clean, Brave iOS watched seam) | **MATCH** — `LEDGER.md:5484-5528`, near-verbatim |
| 4 | Two declared color-law exception comments (Swiss flag `css/main.css:1143-1163`; mask-alpha `css/main.css:685-693`) | **MATCH** — comments verbatim/near-verbatim; cited ranges cover the enclosing rule block, comments themselves sit at 1143-1145 and 690 respectively (not a defect, just a wider citation than the one-line quote) |
| 5 | Lap F-5 field removal, 4→2, e-mail removed entirely (`LEDGER.md` #62-63) | **MATCH** — ledger text, `index.html:603-617` current state, and commits `4dfc948`/`62c2bfa` all agree |

### 3b. Spot-checked citations (10 random file:line pairs)

8 of 10 clean (`css/tokens.css:46-47`, `css/main.css:1578-1598`, `index.html:559-600`, `index.html:603-617`, `js/hero-scroll.js:1151,1345-1384`, `js/main.js:328-345`, `js/areola.js:109`, `index.html:6`).

2 flagged, disposition below:
- `css/tokens.css:11-12` — the document quotes this comment in quotation marks as `"canon v1.1.2 — 2026-08-02, all values measured from docs/reference/Homepage A.png"`. The actual comment reads: *"canon v1.1.2 — ratified 2026-08-02 by Commander's eye. All values MEASURED from docs/reference/Homepage A.png."* A paraphrase presented as a verbatim quote — see Finding F3.
- `css/main.css:883` (`.stepper__bars i`) — flagged by my own spot-check agent as a property mismatch (claimed `box-shadow`, actual `background`). **This is my own briefing error, not a document defect**: I re-read the document's actual text at that citation and it does not claim a property at all — it only cites the rgba value and line number. Logged here for transparency, not held against the document.

Also independently verified while cross-checking Finding F2: the four hero-CSS undeclared-rgba() citations in §6/§20 (`css/main.css:194,214,237,371`) are accurate down to the specific CSS property named (`text-shadow`, `box-shadow`, `gradient` ×2) — this is the document's most evidence-dense claim and it holds up cleanly.

### 3c. Five quality tests, adversarial (master prompt §21, as supplied)

| Test | Verdict | Basis |
|---|---|---|
| **Preservation** | **AMBER** | See Finding F1 — a real, site-wide UI convention is undocumented. |
| **Freedom** | **GREEN** | §17 explicitly disclaims architecture lock-in; every subsystem spec (§9, §10) separates "approved behavior/contract" from "specific implementation," including the hero engine's own reuse note permitting a full re-architecture (GSAP or otherwise) provided invariants are re-verified. Tried to find a place where the document implicitly forces vanilla-JS or single-file structure; found none. |
| **Traceability** | **AMBER** | See Finding F2 — one classification (`ADVANCE_BIAS_FRAC` as DESIGN CONSTANT) is traced to one real source while a directly conflicting real source is not surfaced. §18's six non-negotiables, by contrast, are all cleanly cited. |
| **Bug inheritance** | **GREEN** | Hunted specifically for a defect presented without "prototype only / do not inherit" framing. None found — FORM-I1, the aria-checked bug, the `closedPx` cache bug, the country-code mismatch, and I6/I8's untested status are all explicitly and unambiguously flagged as not-to-inherit. The I2 asymmetric-clamp rule is correctly framed as the *fix*, not the bug it replaced. |
| **Usability** | **AMBER** | Same root cause as F1 — a concrete, realistic implementation question ("is there a header menu / language switcher I need to build?") has no findable answer anywhere in the document, despite the answer existing and being coherent in the source (`LEDGER.md`'s "deferred costume" entry). Everywhere else tested, the document's heavy use of tables made concrete questions fast to answer. |

**Divergence from §19's self-test:** §1 claims the document is "self-tested against §21 of the master prompt (see §19 of this doc)." §19, read directly, is an acceptance/QA checklist (hero tests, form tests, harness commands, device passes) — it does not walk through the five named criteria (Preservation/Freedom/Traceability/Bug-inheritance/Usability) individually or render a verdict on any of them. There is nothing in §19 to diverge *from* on a claim-by-claim basis; the divergence is that **the self-test claim in §1 is not substantiated by the section it points to.** Logged as Finding F4.

### 3d. Disclosure / invention check

- No disclosure of this validation's exclusion list or the sweep detector anywhere in the document — correct, since neither existed until this session.
- No invented device matrix: the document repeatedly and explicitly disclaims one it doesn't have evidence for (§5: "no evidence of a broader device matrix"; §14: "No Android device and no named desktop browser were ever tested... do not construct or imply a broader device matrix than this").
- No framework recommendation: §17 disclaims one directly; the one framework name that appears (GSAP ScrollTrigger, §10) is offered as a permitted example among several, not a recommendation.
- No requirement without a citation, beyond Finding F2 (already logged above — a citation exists, but a conflicting one is omitted, which is a different defect than an absent citation).

---

## STEP 4 — Verdict, per finding

| ID | Finding | Severity |
|---|---|---|
| **F1** | The site-wide `.is-deferred` convention — header burger menu (`hdr__burger`) and language switcher (`hdr__lang`), both `aria-disabled="true"`, plus 4 inert footer-nav links and 2 inline consent-clause references (8 instances/page total, documented in `LEDGER.md` as "the deferred costume") — is never mentioned anywhere in the handoff (§7, §8, §13 all silent on it). Fails the Preservation and Usability tests on this specific point. | **AMBER** |
| **F2** | §10's geometry table classifies `ADVANCE_BIAS_FRAC` as DESIGN CONSTANT / "LAW, value untouched," citing `docs/qa/gesture-matrix.md` — accurately. But `js/hero-scroll.js`'s own comment directly above the constant (~line 1032) calls it a "tune target for the next device walk, not a hard law," a direct contradiction the document doesn't surface, despite quoting this same file closely elsewhere and despite explicitly cross-verifying other hero constants across files for exactly this kind of disagreement. Materially relevant: DESIGN CONSTANT vs. TUNING REFERENCE changes whether production is free to retune the value. | **AMBER** |
| **F3** | §6 presents a paraphrase of the `css/tokens.css:11-12` ratification comment inside quotation marks, implying a verbatim quote. Actual text differs in wording and clause order (though not in the facts represented — version, date, source image all correct). | **GREEN** (minor, not fixed — a wording/quotation-hygiene issue, not a factual error) |
| **F4** | §1's claim that the document is "self-tested against §21 of the master prompt (see §19)" is not substantiated — §19 is a QA/acceptance checklist, not a walkthrough of the five named criteria. The self-certification claim overstates what §19 actually contains. | **AMBER** |

**No trivial typos found to fix directly** — I looked for spelling/mechanical errors independent of the above and found none worth listing.

**Everything re-sampled and spot-checked outside the four findings above held up cleanly** — including the document's most evidence-dense claim (the four undeclared hero-CSS `rgba()` color-law exceptions, §6/§20/Conflict C4), which I verified down to the specific CSS property at each of the four lines, not just the presence of a comment.

---

## STEP 5 — Status

Step 1 correction committed to this branch. No other document edits made (F1–F4 are reported, not fixed, per the ignition key's instruction that anything of substance is reported, not fixed). Certification and merge are not this session's to give.

---

**RESOLUTION (Lap H-3b):** F1-F4 addressed in commit `6a54d46`. Verification: Tower final certification. One methodology line reworded at H-3b close to avoid reproducing the sweep pattern in a repo document; findings and verdicts untouched.
