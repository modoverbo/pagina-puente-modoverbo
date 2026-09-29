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
- Delivery strategy: `ask-on-risk`; forecast about 350 authored lines excluding copied binary assets. No push or PR authorized.

## Checklist
- [x] **T1 — Publish the bridge page.** Wrote failing tests for structure, exact destinations, and local assets; built the semantic HTML/CSS page; copied the supplied portrait and authentic cover; verified mobile and desktop layouts. Work-unit commit: `ef28cb2`.
- [ ] **T2 — Refine hero and offer visuals.** Increase Arturo's visual prominence, slightly trim hero typography, replace drawn resource sheets with genuine screenshots of the resource landing, and improve the book mockup with safe inset spacing. Route: delegated direct; trigger: HTML/CSS/test/asset work spans multiple non-trivial files.
- [ ] **T3 — Add visibly disclosed fictional testimonial carousel.** Reuse four demo testimonials, add eight distinctive fictional examples with realistic generated candid portraits, add keyboard/swipe/controls and reduced-motion behavior, and keep the disclosure visible and near the carousel. Route: delegated direct; trigger: HTML/CSS/JS/test/asset work spans multiple non-trivial files.

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
- Next: no push or PR requested.
- Follow-up pending: T2 and T3. Resource screenshots already captured from the live page in `/tmp/modoverbo-resource-{trabalenguas,frases,diagnostico}.png`; copy selected captures into workspace assets for the site.
