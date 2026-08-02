# HOTICO DOSSIER — parked decisions & professional recommendations
**Compiled 2026-08-01 by ACP × Tower · For Alexa's desk and the engine conversation · Nothing here blocks the proto**

Legend: 🔴 needs Alexa's ruling · 🟡 engine/webdev topic · 🟢 cheap polish whenever

---

## A. Form v2 (when Alexa does her serious Contact pass)

1. 🔴 **Reorder the steps: Programare → Particularități → Date personale.** Current order asks the highest-friction fields first. Beyond conversion psychology, it is now a *functional* argument: the Particularități questionnaire is **procedure-conditional** (the 12-luni rule fires only for breast dermopigmentation), so the form literally cannot ask the right questions before it knows the procedure.
2. 🔴 **Move disqualifiers early, and design the "not yet" state with warmth.** A woman under 12 months post-op is possibly a cancer survivor; she must not invest the whole form before learning she can't book. Warm copy + "leave your email, Alexa contacts you when the skin is ready" + optional surgery-date field = she is *pre-booked for month 13*, not rejected. Possibly the highest-business-value screen in the flow.
3. 🔴 **The radical option worth weighing:** does the web form need to medically screen at all? Pașii already declares step 1 = Consultanța (human conversation). A 4-field booking form (procedure, name, phone, "Alexa te sună") converts far better; the full questionnaire becomes a *pre-consultation form* sent after booking, where "not yet" arrives with a human voice.
4. 🟡 **GDPR:** Particularități = special-category health data → explicit separate consent, secure storage; **photo upload** raises intensity further. One more argument for post-booking screening.
5. 🟢 Mark only *optional* fields; "(obligatoriu)" on every field is noise.
6. 🔴 "Vrei și altă procedură?" — redundant on service pages (procedure implied by page); on homepage it presupposes a choice never asked. Dies naturally if A1 is adopted.
7. 🟡 Appointment-widget "unavailable" behavior: greyed-out vs. "Alexa te contactează" — undecided, decide with the engine.

## B. Pricing & account

8. 🔴 **Cont-client −300 ron discount: recommend killing the discount, keeping the account.** A visible discount anchors the price as negotiable — poison for premium paramedical positioning, reads as a cheap selling tactic (ACP's own instinct). Reframe account value as **care, not cash**: pașii de pregătire a pielii, booklets, follow-up scheduling — exactly what the confirmation screen already promises. Proto ships the discount as designed until Alexa rules.
9. 🟡 Retușuri buyable-in-advance: pure engine question (payments, vouchers, expiry). Proto shows tiers informationally.
10. 🟡 **Currency is a strategic variable.** ACP's Geneva mapping (80+ professionals) shows the RON sheet converts to CHF nearly symbol-for-symbol. Production site should treat prices as data, not hardcoded strings.

## C. Brand & naming

11. 🔴 **"Restauration" — the Geneva ear.** In French the noble reading (art restoration — perfect kintsugi register) coexists with the everyday one (the restaurant industry). Known tension, consciously open ("we will see"). Logged so the decision is owned, not drifted into.
12. 🟢 Brand guide v1.1 typos for v1.2: "Emphatetic", "Toughtful", "guidea", and one email as "hoti**k**o.ink@gmail.com".

## D. Content debt (Alexa's homework, different deadline)

13. 🔴 **Gallery consent:** written/confirmed consent posture for the nine result photos before any public URL carries them. If already public on Alexa's channels, posture is established. *(Proto holds gallery imagery until confirmed — LEDGER.)*
14. 🔴 ChatGPT-generated imagery used as core visuals (×25 in frames): credibility + licensing risk for a medical-aesthetics brand. Replace with real photography over time.
15. 🟢 Phone-photo source (~820px) is sub-retina; duplicate "Marina" review; 36 filler "Descriere" blocks — copy needs an owner and a date.
16. 🟡 Reviews on production: pull from Google Reviews (engine); proto intent = swipe carousel once >2 exist.

## E. Site chrome & legal

17. 🟡 **Footer spec:** nav echo, tap-to-call phone (+ address when studio address exists), socials, legal links (Politica de confidențialitate, Termeni, Politica de anulare — already referenced by the form, page must exist), copyright, optional tagline whisper. **Romanian legal requirement: ANPC–SAL + EU SOL/ODR links** — absence is fineable; flag to the webdev.
18. 🟡 **Sunset clause:** when the production site ships, the proto URL retires or redirects. (Also in README fate clause.)
19. 🟡 Verify form phone prefix defaults (+40 vs +41) per market before production.

## F. Future horizon (no owner yet)

20. **Mamelon** — new service, home undecided (link from Areola vs. own landing page).
21. **EN language** — switcher exists, content doesn't.
22. **Institute education arm** (PMU artists worldwide, per brand guide audience #2) — entire undesigned site section.
