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
- Delivery strategy: local work-unit commit on `feat/visual-testimonials-qa`; no push or PR authorized. The additional authored diff is about 500 lines, primarily carousel behavior and regression tests, so it remains one cohesive local correction pending any separate PR-size decision.

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
- Next: local work-unit commit `49f6fa7` recorded. No push or PR requested.
