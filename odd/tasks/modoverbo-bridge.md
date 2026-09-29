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
- Browser runtime QA was completed by the parent after the corrective commits; worker-only checks below remain historical evidence.
- [x] **T4 — Fix carousel autoplay/resume and touch-first swipe UX (restart race corrected).** Restart now returns to card 1 with immediate scrolling, preventing intermediate scroll events from restoring the end state; the regression test verifies card 1, Pause label, a live timer, advancement despite retained hover/focus, and continued passive hover/focus pauses. Route: delegated direct, focused correction. Corrective commit: `b7c901750549ac61568b0327250e65545beed20d` (`fix(carousel): restart immediately at first card`), following previous correction `888999ae709f2489817fab3632b16f022731720d`.
- [x] **T5 — Add authentic inset book preview pages (responsive correction completed).** Added a narrow-screen override moving the right preview sheet's inset from 9% to 18%; the focused layout assertion locks that mobile rule while keeping the unchanged cover in front. This shifts the sheet inward by 9% of its containing width; parent browser measurement after the correction remains the final pixel-level confirmation. Corrective commit: `888999ae709f2489817fab3632b16f022731720d`, following original commit `1f6c1387a97753a51b1de325ecb46837fe91e967`.

### T4 verification
- RED observed before implementation: `node --test` failed the new swipe-cue assertion (missing cue) and explicit-resume assertion (timer remained paused by focus). The portrait-locality/decode test passed for all 12.
- GREEN: `node --test` — 17 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed.
- Runtime/browser QA: not run by this worker; parent follow-up.

- Reopen reason: parent browser QA observed that after pausing and resuming at 390px, pointer hover and keyboard focus remain active; clearing only `hasFocus` leaves `isHovered` blocking autoplay. Corrective test observed RED with the timer still stopped, then GREEN after Resume clears both transient pause flags.
- Additional T5 reopen reason: parent browser QA measured the genuine right preview at x=303.97px against a 309px card edge at 320px viewport (about 5px inset). The correction increases the mobile right inset to 18%, with a focused test asserting that responsive override.
- Corrective checks: `node --test` — 18 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed. No post-correction browser measurement was run by this worker.

### Approved carousel-loop and favicon follow-up
- Authorized branch: `feat/bridge-carousel-loop-favicon`; workspace-only changes. Do not push, deploy, or open a PR.
- Effective TDD: enabled; exact runner `node --test`. Write and observe tests failing before implementation.
- Route: delegated direct. Trigger evidence: carousel behavior requires coordinated HTML, CSS, JavaScript, and tests; local favicon/head wiring adds a distinct asset unit.
- Acceptance/checks: retain autoplay with seamless last-to-first looping; preserve swipe, keyboard, arrows, visibility/focus/hover pauses and reduced-motion behavior; center previous/play-pause/next controls with an icon-only play/pause button, no position counter or restart state; center the existing swipe hint; add a branded local SVG favicon and head link. Run `node --test`, `node --check script.js`, and `git diff --check`.
- [x] **T6 — Loop carousel and center icon-only playback controls.** Kept automatic playback cycling from the final testimonial back to the first; replaced the position counter with a centered play/pause icon between previous/next arrows and centered the controls row and swipe hint. Preserved accessible labels, reduced-motion semantics, native swipe, keyboard, and manual arrows. Route: delegated direct; trigger: coordinated behavior/UI/test changes span multiple non-trivial files. Work-unit commit: `19e885b` (`feat(carousel): loop testimonials with centered playback controls`); authored changed-line count: 110.
- [x] **T7 — Add a local Modo Verbo SVG favicon.** Created an original local speech-wave mark and linked it from the document head. Route: delegated direct; trigger: separate visual asset and HTML head change with acceptance tests. Work-unit commit: `1d3f960` (`feat(branding): add local Modo Verbo SVG favicon`); authored changed-line count: 18; cumulative T6/T7 authored count: 128.
- Verification commands: `node --test`, `node --check script.js`, `git diff --check`. Never stage `.codegraph/codegraph.db-shm` or other unrelated changes.
- T6 RED: `node --test` failed 3 expected checks for the position counter/icon-only centered controls, missing-counter runtime null access, and the non-wrapping autoplay end state; after fixing the last test fixture's missing `clientWidth`, GREEN was `node --test` — 18 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed.
- T6 RDD state/outcome: globally off; no native review started, delivery unmanaged. Parent's pre-existing `.codegraph/codegraph.db-shm` modification was left unstaged.
- T7 RED: focused `node --test --test-name-pattern='ships an original local Modo Verbo SVG favicon'` failed because the local favicon did not yet exist. GREEN: `node --test` — 19 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed; `file assets/modo-verbo-icon.svg` identified an SVG image. RDD remains globally off; delivery unmanaged.
- Second T4 reopen reason: parent real-browser QA restarted at 12/12 and observed that the smooth scroll's intermediate track events can restore `autoplayFinished` after restart; 1.3 seconds later the counter was 1/12 while the toggle still showed Restart and the timer remained stopped. The regression test first failed because restart requested `smooth` scrolling; it passes with immediate scrolling and a simulated transition event.
- Restart correction checks: `node --test` — 18 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed. No post-correction browser run was performed by this worker.

### T5 verification
- RED observed before implementation: `node --test --test-name-pattern="layers authentic local edition pages"` failed because the book art had no preview-page layers.
- GREEN: focused T5 test passed; final `node --test` — 18 passed, 0 failed; `node --check script.js` — passed; `git diff --check` — passed; ImageMagick decoded both copied 900×1200 WebP pages.
- Asset regression checks skip only the optional ImageMagick decode assertion when `identify` is unavailable; local-path and file-existence checks always run. Test portability commit: `8e5ae35` (`test(assets): make WebP decoding check optional`).
- Runtime/browser QA: not run by this worker; parent follow-up.

### Final parent browser QA
- At 320px, the right book preview stays about 14.9px inside the card border, the authentic cover remains in front, and the page has no horizontal overflow.
- At 390px, Pause then Resume advanced the counter from 2/12 to 3/12 after 6.5 seconds while the button retained focus and the pointer remained over the carousel.
- At 390px, Restart from 12/12 returned immediately to 1/12 with a Pause label, then advanced to 2/12 after 6.5 seconds.
- Native horizontal track scrolling reached 12/12; all 12 testimonial portraits reported nonzero natural width once visited, with no broken image.
- At 1024px, the book preview pages remain at least 27px inside the card's right border, and there is no horizontal page overflow.
- Independent read-only verification passed `node --test` (18/18), `node --check script.js`, and `git diff --check main...HEAD`; both edition previews decoded and returned HTTP 200 locally. No deployment, push, or PR was performed.
