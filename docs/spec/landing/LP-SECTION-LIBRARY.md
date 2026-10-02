# LP SECTION LIBRARY — HOTICO web

**Status:** DRAFT v0.1 · 2026-10-02 (v0 2026-09-27) · pending Commander ratification
**Author:** Tower (Hotico web Project) · derived from the DESCRIBE/CLASSIFY audit of the
"Dermopigmentare sprâncene — românce din Genève" brief (custom-GPT output, structure binding 1:1)
**Governs:** the landing-page system of the Hotico web umbrella (27 pages, 3 languages)
**Does not govern:** visual design (→ `css/tokens.css` canon, Polaris NN3) · copy truth (→ Alexandra's ratification gate)
**Evidence tier:** T2 on the cosmetic skeleton (read from the brief); T3 on the paramedical family (no brief seen yet)
**Proposed home:** `hotico-proto/docs/spec/landing/LP-SECTION-LIBRARY.md` (hotico-proto is the spec artifact by its own constitution)

---

## 0. The three authorities (ruling of 2026-09-27)

| Layer | Authority | Fidelity |
|---|---|---|
| STRUCTURE — section order, roles, form fields, CTA pattern | the GPT brief | 1:1, binding |
| COPY — per language (RO/FR/EN) | Alexandra, drafted via GPT | ratified fact-by-fact + tic-audited per language; never verbatim law |
| VISUALS — palette, type, components, motion | HOTICO canon (`tokens.css`, Raleway/DM Sans, neomorphic system) | brief is silent; its "reguli de design" have no standing |

Three GPT design lines survive because they are content rules: one primary CTA in the hero;
every result photo labeled "vindecat" / "imediat după procedură"; no medical/aggressive hero image.

---

## 1. Atoms (13)

| # | Atom | Variants | Used in |
|---|---|---|---|
| A1 | SectionHeader | eyebrow label (optional) · title · subtitle/intro (optional) | all 19 |
| A2 | CardGrid | 3-col · 2×2 · with/without image per card | §2 §4 §5 §9 |
| A3 | TwoColumn | text|image · image|text · text|form | §3 §6 §10 §13 §19 |
| A4 | HighlightBox | statement · quote (attributed) | §5 §6 §9 §10 |
| A5 | Accordion | closed by default (binding) | §15 §17 §18 |
| A6 | IconList | checklist · "nu" list · includes list · micro-proofs | §1 §3 §10 §14 §16 |
| A7 | StepTimeline | vertical (mobile) · horizontal 5-step (desktop) | §7 |
| A8 | ReviewCard | quote · first name/initial · source | §8 §12 |
| A9 | MediaGrid | gallery (9–12, zoomable, labeled) · mini (≤3 diplomas) | §11 §10 |
| A10 | CTA | primary (scroll → form) · mini · secondary (WhatsApp template) · form button | §1 §2 §13 §19 |
| A11 | PriceCard | amount · service name · includes list · payment modes | §16 |
| A12 | Form | 7 fields · 2 gating checkboxes (REAL) · WhatsApp composer · post-submit state | §19 |
| A13 | Footer | identity · location · contacts · 5 internal links · disclaimer | footer |

Not in the brief, required anyway (§4): Header, ConsentBanner, StickyCTA (proposal), PostSubmitState.

---

## 2. Sections (19 + footer) — composition and scope

Scope: **U** universal (all 27, translated only) · **A** audience/language · **S** service · **F** family

| § | Role | Composition | Scope | Notes |
|---|---|---|---|---|
| 1 | Hero | A1 (label+H1+sub) · image · A10 primary · A6 micro-proofs ×4 | A + S | one primary CTA (binding) |
| 2 | Differentiator | A1 · text · A2 3-col · A10 mini | **A** | a ROLE slot, not "the Romanian section" |
| 3 | Problem recognition | A3 · A6 list · labeled before/after | S | |
| 4 | Benefits | A1 · intro · A2 2×2 · optional image | S | |
| 5 | Techniques | A1 · A2 3-col w/ images · A4 statement | S (F?) | eyebrow-specific; paramedical equivalent unknown |
| 6 | Expectations | A3 · A4 quote | S | |
| 7 | Process | A1 · A7 5 steps · image | U skeleton / S wording | |
| 8 | Reviews I | A1 · A8 ×2 | U block / curated | |
| 9 | Healing, retouch | A1 · A2 3-col · A4 retouch box | S | numbers are ratified facts |
| 10 | About Alexandra | A3 image|text · A4 quote · A6 "nu" list · A9 mini ≤3 · A10 mini | **U** | 4 media slots; personal-loss line needs explicit blessing |
| 11 | Gallery | A1 · text · A9 9–12 labeled · mandatory note | S | CONSENT GATE (handoff §18) |
| 12 | Reviews II | A1 · A8 ×3–5 · ≤2 screenshots | U block / curated | |
| 13 | Old procedures | A3 · A10 secondary (WA template #2) | S | absent for areola |
| 14 | Preparation | A1 · A6 · note | S | |
| 15 | Eligibility | A1 · intro · A5 · legal note | S | no diagnostic wording |
| 16 | Investment | A1 · A11 | S | price visible (binding) |
| 17 | Scheduling policy | A1 · 3 blocks · link to full policy page | **U** | wants its own page |
| 18 | FAQ | A1 · A5 | S | closed by default |
| 19 | Final CTA + form | A3 text|form · A12 · note | U structure / A headline / S prefilled | |
| F | Footer | A13 | **U** | 5 links must resolve |

~half of every page is written once (U). Per-page work = S-scope content + photos.

---

## 3. Form contract (A12) — binding, from §19

1. Full name — required · 2. Service — prefilled, locked · 3. Preferred day — date picker ·
4. Time slot — 10:00–13:00 · 13:00–16:00 · 16:00–18:00 · "exceptional slot" ·
5. Prior procedure in the area — Yes/No · 6. Data-processing consent — REAL checkbox, mandatory, links to privacy policy in page language ·
7. Scheduling-policy acceptance — REAL checkbox, mandatory, links to full policy page.
Button opens WhatsApp with the message composed from fields (template per language); both checkboxes gate it.
Post-submit: reuse the ratified F-2 "Merci" state. §13 carries WA template #2.

Harness targets: field presence/order · option sets · checkbox gating · composed message byte-equals template ·
forbidden-words grep per language = 0 (diacritic/inflection tolerant) · declared section list = rendered list.

---

## 4. Gaps the brief does not know about

| Block | Why | Owner |
|---|---|---|
| Header | **RATIFIED R1 (27.09):** lockup + language switch + WhatsApp affordance, NO nav | canon |
| ConsentBanner (CMP) | Meta Pixel/GA4 dark until consent, refuse-parity, Consent Mode v2 default denied | Tower spec, Hands build |
| PostSubmitState | F-2 pattern exists | reuse |
| Footer destinations ×5 | privacy (FR only; RO/EN missing) · full scheduling policy · T&Cs · aftercare · about | build or route honestly |
| Tracking events | form start · WhatsApp handoff; consent-gated | Tower spec |
| StickyCTA (mobile) | PROPOSAL — see R2 | Commander |
| noindex | standing law | inherit |

## 4b. Media slot inventory — photos are SERVICE-scoped, not page-scoped

§1 (1) · §3 (1) · §4 (0–1) · §5 (3) · §6 (1) · §7 (1 + 0–3) · §9 (0–1) · §10 (**4**: portrait + ≤3 diplomas) ·
§11 (9–12) · §12 (≤2) · §13/§14/§19 (0–1 each). Per page ~22–30 slots; per SERVICE (shared by RO/FR/EN sisters)
~20–25 images; UNIVERSAL set (§7, §10) shot once for all 27. All §11 images pass the consent gate.

---

## 5. Record schema (data, not code)

```
page: slug · family (cosmetic|paramedical) · service · audience · lang (ro|fr|en) · sisters[] · sections[]
section instance: type (§ role) · content {ro, fr, en} · media refs (labeled) · flags
shared records: about-alexandra · scheduling-policy · footer · legal-notes · review pool (by id)
```
Compatible with `content/translations.json` ({ro,en,fr} per key, generated by `tools/extract_content.py`,
never hand-edited) and its `lp_para.*` / `lp_cosmetic.*` seeds.

---

## 6. Copy gates (before any content enters a record)

1. **Fact ratification** — Alexandra ticks each claim: years, procedure count, "trainer acreditat", training
   countries, healing window, durability, retouch window/price, cancellation/lateness rules, payment, reply time;
   explicit blessing on the personal-loss line (§10).
2. **Tic audit per language** — brief violates Alexandra's Aug-2026 rule against negative parallelism
   ("nu e doar X, e Y") in §2, §3, §6.
3. **Forbidden-words set per language** — from the brief's "Nu folosim" list, translated, machine-checked.

---

## 7. Open rulings (Commander)

- R1 Header — **RATIFIED 27.09.2026.**
- R2 StickyCTA — pending. If adopted: hides when §19 in view · the ONE persistent mobile affordance · behind a flag.
- R3 Paramedical skeleton — flexibility ruled 27.09; blocked until one paramedical brief is read.
- R4 The 27 list — family × service × audience × lang grid still unknown.
- R5 Privacy/policy pages RO + EN — Commander checking with Alexandra.
- **R6 (new, 02.10) Foundation** — since 30.09 production is a React + Vite app (Hus, Firebase,
  hotico-web.web.app) built from the handoff contract, with tokens, translations.json, self-hosted fonts,
  noindex and the WhatsApp composer already in place. Proposal: landing pages are ROUTES in that codebase,
  not a separate static repo. Needs: where that code lives (repo), who builds (Hands on a branch vs Hus), Hus's agreement.

---

## 8. Hypothesis register (T3)

- H1 27 = 3 languages × 9 — unverified
- H2 19-section long-form converts for a high-consideration procedure — measure scroll depth
- H3 §2 differentiator role generalizes to FR/EN audiences — needs the FR brief
