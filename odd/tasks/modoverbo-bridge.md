# Modo Verbo bridge page

## Objective
Build a mobile-first link-in-bio page for Modo Verbo that introduces Arturo Valdés and presents two clear paths: free resources and the *Elocuencia sin miedo* book.

## Problem and why
Social visitors need a fast, recognizable destination instead of choosing between separate URLs without context. The supplied mockup defines the visual direction; the page must use supplied Arturo imagery and the existing book cover, not invented product art.

## Scope and constraints
- Authorized workspace: `pagina-puente-modoverbo/` only. Sibling projects are read-only asset sources.
- Design: premium vertical composition, dark background, gold accents, concise Spanish copy, two prominent visual cards.
- Approved follow-up: bring Arturo forward with a brighter, closer portrait and only a slight reduction in hero copy; use real captured resource-landing screens; improve the authentic book-cover mockup; keep all visuals clear of card edges.
- Testimonials: show 12 illustrative examples (the book landing's four existing fictional entries plus eight new ones) in an accessible dynamic carousel. A conspicuous adjacent notice must state that the words, people, and images are fictitious and not real customer reviews. New voices and candid environmental portraits should vary naturally.
- Destinations: `https://modoverborecursos.vercel.app/` and `https://modoverbo.vercel.app/`.
- No backend, forms, analytics, or framework dependencies.
- Effective TDD: enabled by session instructions; runner: `node --test`.
- Route: delegated direct. Evidence: a new multi-file page requires asset selection, HTML/CSS, tests, and visual verification.
- Prior delivery strategy: local work-unit commits on `feat/visual-testimonials-qa`; this approved follow-up uses `feat/bridge-mobile-final-ux`. No push, deploy, or PR authorized.

## Checklist
- [x] **T1 — Publish the bridge page.** Wrote failing tests for structure, exact destinations, and local assets; built the semantic HTML/CSS page; copied the supplied portrait and authentic cover; verified mobile and desktop layouts. Work-unit commit: `ef28cb2`.
- [x] **T2 — Refine hero and offer visuals.** Increased Arturo's mobile prominence and brightness without clipping his face, slightly trimmed hero typography, replaced drawn resource sheets with genuine captures, and inset the authentic book cover. Route: delegated direct; trigger: HTML/CSS/test/asset work spans multiple non-trivial files. Work-unit commit: `49f6fa7`.
- [x] **T3 — Add visibly disclosed fictional testimonial carousel.** Reused four demo examples, added eight varied fictional voices and candid generated portraits, and delivered a twelve-card carousel with swipe, arrows, keyboard support, safe autoplay, and a persistent pause control. Route: delegated direct; trigger: HTML/CSS/JS/test/asset work spans multiple non-trivial files. Work-unit commit: `49f6fa7`.

## Acceptance criteria
- The first screen names Arturo Valdés and communicates the Modo Verbo promise quickly.
- The first card leads to the free resources URL; the second leads to the book URL.
- Cards contain useful short descriptions and visible action labels.
- Supplied Arturo photo and actual existing book cover appear correctly with no broken local assets.
- Keyboard focus is visible; images have appropriate alternative text; reduced-motion users are respected.
- Layout works on narrow mobile screens and wider desktop screens without horizontal overflow.
- Arturo is visibly brighter and closer, with no text covering his face; resource and book art maintain interior margins at narrow widths.
- Resource imagery is captured from the real live resource page, while the book uses the authentic existing cover.
- The book card layers two genuine edition preview pages behind the real cover without obscuring the title or leaving the card's safe margins.
- Twelve fictional examples are navigable in a responsive carousel; the section clearly labels both text and portraits as fictitious, without implying actual customer endorsements.

## Checks and progress
- `node --test`: observed RED before implementation (4 failing tests because `index.html` was absent), then GREEN (4 passing tests, 0 failures).
- Browser visual inspection: 320px, 390px, and 1024px widths; no horizontal overflow. Book cover retains its 3:4 ratio and does not overlap copy.
- Asset identity: copied portrait and book cover SHA-256 values match their supplied/source files. Exact destination URLs checked in HTML and browser.
- Independent verification identified narrow-width overlaps; CSS corrections were rechecked in the browser.
- A parent-root `node --test` run is not applicable: it discovers unrelated Deno tests in `flui/` and fails on `jsr:` imports. Run the check from `pagina-puente-modoverbo/`.
- Native risk assessment was unassessable because unrelated sibling repositories are untracked under the parent Git root; RDD mode is off. Independent verifier and parent spot checks were used.
- Follow-up TDD: repeated RED→GREEN cycles for layout/assets, carousel interactions, autoplay/reduced motion, and track-relative scrolling. Final scoped `node --test`: 14 passed, 0 failed; `node --check script.js` and `git diff --check` passed.
- Browser visual QA at 320, 390, 430, 768, and 1024px found no horizontal page overflow. At 320px, resource captures stay at least 22px from the card's right edge and 68px from its bottom; at 1024px, at least 27px right/45px bottom. The book cover is inset at least 13px right/34px bottom across the tested widths.
- Independent code review found and verified correction of the track-relative carousel scroll bug and missing persistent pause control. Real desktop navigation advanced to the intended third card; no page scroll jump was observed.
- Eight new portraits were generated and optimized to 320px WebP files of 10–21KB each; exact generation prompts and source provenance for the four reused fictional portraits are in `assets/testimonials/PROVENANCE.md`.
- The bridge folder is itself a nested Git repository, distinct from the parent `modoverbo` Git repository. Delivery commits for this follow-up belong on the bridge feature branch; prior parent-root Git references above document historical work only.
- Prior local work-unit commit `49f6fa7` recorded. This follow-up's local work-unit commits are `e4e5c1b` and `1f6c138`; no push, deploy, or PR requested.

## Approved mobile-final follow-up
- Authorized branch: `feat/bridge-mobile-final-ux`; sibling repositories are read-only asset sources. Do not push, deploy, or open a PR.
- Route: delegated direct. Trigger evidence: carousel logic/tests and responsive touch behavior span multiple non-trivial files; authentic preview pages require local asset copies and responsive CSS/HTML/tests.
- Effective TDD: enabled; exact runner `node --test`. Every behavior change requires observed RED before implementation and GREEN after.
- `skill_resolution`: loaded `work-unit-commits`, `superpowers:test-driven-development`, `superpowers:systematic-debugging`, and `superpowers:verification-before-completion` from the supplied registry-resolved paths.
- Acceptance/checks: autoplay continues while Resume remains focused and can restart at the end; touch-first swipe UX uses native scrolling and has a visible cue while preserving keyboard/reduced-motion support; testimonial `<img>` paths are local, exist, and decode; 2–3 genuine edition preview pages appear behind the cover with responsive inset margins; fictional disclaimer and all CTAs stay unchanged; `node --test`, `node --check script.js`, `git diff --check`, local-image/path validation and WebP decoding where available.
- Browser runtime QA is a parent follow-up; do not claim it was run here.
- [ ] **T4 — Fix carousel autoplay/resume and touch-first swipe UX (reopened).** The earlier fix cleared focus on explicit Resume but missed the simultaneous hover guard. Parent browser QA reproduced at 390px: pause then resume leaves the pointer over the section and focus on the toggle, so autoplay remains stopped. Corrective acceptance: regression test proves pause → hover + focus → Resume starts timer; passive hover/focus still pause; reduced-motion remains respected. Route: delegated direct, focused correction. Original work-unit commit: `e4e5c1bec26ac2f7255b3970f1050a546863abca`; corrective commit pending.
- [ ] **T5 — Add authentic inset book preview pages (responsive correction reopened).** Parent QA measured only ~5px between the right preview sheet and card edge at 320px. Corrective acceptance: keep the right preview page at least 12px inside the card at 320px while leaving the authentic cover unobscured; add a responsive layout assertion. Route: delegated direct, focused correction. Original work-unit commit: `1f6c1387a97753a51b1de325ecb46837fe91e967`; corrective commit pending.

### T4 verification
- RED observed before implementation: `node --test` failed the new swipe-cue assertion (missing cue) and explicit-resume assertion (timer remained paused by focus). The portrait-locality/decode test passed for all 12.
- GREEN: `node --test` — 17 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed.
- Runtime/browser QA: not run by this worker; parent follow-up.
- Reopen reason: parent browser QA observed that after pausing and resuming at 390px, pointer hover and keyboard focus remain active; clearing only `hasFocus` leaves `isHovered` blocking autoplay. Corrective RED/GREEN evidence and commit to follow.
- Additional T5 reopen reason: parent browser QA measured the genuine right preview at x=303.97px against a 309px card edge at 320px viewport (about 5px inset). Corrective test must assert a safe 12px minimum without hiding the sheet or covering the cover.

### T5 verification
- RED observed before implementation: `node --test --test-name-pattern="layers authentic local edition pages"` failed because the book art had no preview-page layers.
- GREEN: focused T5 test passed; final `node --test` — 18 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed; ImageMagick decoded both copied 900×1200 WebP pages.
- Asset regression checks skip only the optional ImageMagick decode assertion when `identify` is unavailable; local-path and file-existence checks always run. Test portability commit: `8e5ae35` (`test(assets): make WebP decoding check optional`).
- Runtime/browser QA: not run by this worker; parent follow-up.
