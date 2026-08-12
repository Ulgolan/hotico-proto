# Snapshots — historical builds of `js/hero-scroll.js`

These are **not committed**. Several harness scripts compare the current build
against the build that preceded a specific fix, and those comparison columns
need the older file on disk. Generate them yourself; they are large near-copies
of `hero-scroll.js` and duplicating seven of them into `docs/` would be waste.

**The two scripts that matter most — `matrix.js` and `sens.js` — do NOT require
any snapshot.** They grade the working tree standalone. Snapshots only restore
the historical *comparison columns*.

## Regenerating

From the repo root:

```sh
S=docs/qa/harness/snapshots
git show 9c25e49:js/hero-scroll.js > $S/baseline.js   # v17 — pre-lap main
git show 49f2079:js/hero-scroll.js > $S/v18.js        # corridor pre-emption + chase-down
git show ec5f327:js/hero-scroll.js > $S/v19.js        # touch gate + lift-kick
git show 3b0ce9e:js/hero-scroll.js > $S/v20.js        # the Door Rule
git show 5b3ed90:js/hero-scroll.js > $S/v21.js        # the Southern Border
git show fd7f16c:js/hero-scroll.js > $S/v22.js        # gesture-start anchor
git show bdb7fda:js/hero-scroll.js > $S/v23.js        # La Porte Entière
```

v24 is the merged state — it is simply `js/hero-scroll.js` on `main`
(merge `a4a275f`, PR #26).

## Which script needs which

| script | snapshot(s) | what the comparison shows |
|---|---|---|
| `matrix.js` | *(optional arg)* | grade any build: `node matrix.js ./snapshots/v22.js` |
| `sens.js` | `v23.js` *(optional)* | the four families, before/after the amended I2 |
| `verify.js` | `baseline.js` | the white room, pre-lap vs now |
| `chain.js` | `baseline.js` | the S1/S2 discriminator, run against v17 to convict |
| `verify2.js` | `v18.js` | the mobile seizure, before/after the touch gate |
| `touch.js` | `v18.js` | coalesced vs separate scroll notification |
| `door.js` | `v19.js` | the Aréole jail, before/after the Door Rule |
| `border.js` | `v20.js` | the abduction, before/after the Southern Border |
| `addendum.js` | `baseline.js`, `v21.js` | straggler 64 + chained committed swipes |
| `repro2.js` | `v22.js` | dead taps and free-zone capture, reproduced |
| `autopsy.js` | `v23.js` | the go-home descent, autopsied before the law changed |

Add a `.gitignore` here if you would rather not see them in `git status`; the
seal lap decides that, not this file.
