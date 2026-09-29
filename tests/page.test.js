const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('introduces Arturo Valdés with the Modo Verbo promise', () => {
  const html = read('index.html');

  assert.match(html, /<h1[^>]*>[\s\S]*Arturo[\s\S]*Vald[eé]s[\s\S]*<\/h1>/i);
  assert.match(html, /Habla mejor[\s\S]*Haz que te escuchen/i);
  assert.match(html, /<title>[^<]*Modo Verbo/i);
});

test('offers the two exact external destinations with visible action labels', () => {
  const html = read('index.html');

  assert.match(html, /href="https:\/\/modoverborecursos\.vercel\.app\/"[^>]*>[\s\S]*?(Ver recursos|Explorar recursos)/i);
  assert.match(html, /href="https:\/\/modoverbo\.vercel\.app\/"[^>]*>[\s\S]*?(Conseguir el libro|Conoce el libro)/i);
  assert.match(html, /Recursos gratuitos/i);
  assert.match(html, /Elocuencia sin miedo/i);
});

test('uses local supplied portrait and authentic titled book cover', () => {
  const html = read('index.html');
  const portrait = path.join(root, 'assets', 'arturo-valdes.png');
  const cover = path.join(root, 'assets', 'elocuencia-sin-miedo-cover.webp');

  assert.match(html, /src="assets\/arturo-valdes\.png"[^>]*alt="[^"]+"/i);
  assert.match(html, /src="assets\/elocuencia-sin-miedo-cover\.webp"[^>]*alt="[^"]+"/i);
  assert.ok(fs.statSync(portrait).size > 10_000, 'portrait asset should be copied locally');
  assert.ok(fs.statSync(cover).size > 10_000, 'book cover asset should be copied locally');
});

test('keeps a centered, responsive layout, visible keyboard focus, and reduced motion', () => {
  const css = read('styles.css');

  assert.match(css, /@media\s*\(max-width:\s*\d+px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /max-width:\s*\d+px/);
  assert.match(css, /overflow-x:\s*hidden/);
});

test('makes Arturo brighter and more visually prominent without changing the promise', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /Habla mejor[\s\S]*Haz que te escuchen/i);
  assert.match(css, /\.hero-portrait[^}]*brightness\(/);
  assert.match(css, /\.hero-portrait[^}]*opacity:\s*1/);
  assert.match(css, /h1\s*\{[^}]*font-size:[^}]*clamp\(/);
});

test('uses genuine local resource-page captures instead of CSS-drawn paper and phone art', () => {
  const html = read('index.html');
  const captures = [...html.matchAll(/<img\b(?=[^>]*class="[^"]*\bresource-screenshot\b[^"]*")(?=[^>]*src="([^"]+)")[^>]*>/g)];

  assert.equal(captures.length, 3, 'three real resource captures should be shown');
  for (const [, asset] of captures) {
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} should exist locally`);
  }
  assert.doesNotMatch(html, /class="(?:resource-sheet|phone)\b/);
});

test('keeps the authentic book-cover ratio and gives the artwork inset margins', () => {
  const css = read('styles.css');

  assert.match(css, /\.book-art\s*\{[^}]*padding:\s*\d+px/);
  assert.match(css, /\.book-art img\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.book-art img\s*\{[^}]*rotateY\(/);
  assert.match(css, /\.book-art img\s*\{[^}]*box-shadow:/);
});

test('shows twelve fictional examples, a visible disclosure, and local described portraits', () => {
  const html = read('index.html');
  const cards = html.match(/class="testimonial-card"/g) ?? [];
  const disclosure = 'Ejemplos ficticios: textos, personas e imágenes creados para ilustrar posibles experiencias; no son reseñas de clientes reales.';
  const portraits = [...html.matchAll(/class="testimonial-avatar"[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/g)];

  assert.equal(cards.length, 12);
  assert.ok(html.includes(disclosure));
  assert.equal(portraits.length, 12);
  for (const [, asset, alt] of portraits) {
    assert.ok(alt.startsWith('Retrato ficticio de '), `portrait alt should disclose fiction: ${alt}`);
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} should exist locally`);
  }
  for (const name of ['Santiago R.', 'Valentina M.', 'Daniel G.', 'Isabel C.', 'Camila R.', 'Lucía P.', 'Diego A.', 'Mariana T.', 'Andrés C.', 'Sofía V.', 'Javier M.', 'Pilar N.']) {
    assert.ok(html.includes(name), `carousel should include ${name}`);
  }
  assert.ok(html.includes('Qué libro tan brutal. La verdad no pensé que me fuera a servir tanto'));
  assert.ok(html.includes('Amooo este libro! De verdad me ha ayudado un montón'));
  assert.ok(html.includes('Excelente contenido. Me gustó mucho que no se queda solo en teoría'));
  assert.ok(html.includes('No soy de leer muchos libros, pero este sí me atrapó'));
});

test('carousel exposes semantic controls, a live position, keyboard navigation, and reduced motion', () => {
  const html = read('index.html');
  const css = read('styles.css');
  const script = read('script.js');

  assert.match(html, /aria-live="polite"[^>]*data-carousel-counter/);
  assert.match(html, /aria-label="Testimonio anterior"[^>]*data-carousel-previous/);
  assert.match(html, /aria-label="Testimonio siguiente"[^>]*data-carousel-next/);
  assert.match(html, /aria-label="Pausar reproducción automática" aria-pressed="false" data-carousel-autoplay-toggle>Pausar/);
  assert.match(html, /data-testimonial-track[^>]*tabindex="0"/);
  assert.match(css, /scroll-snap-type:\s*x\s*mandatory/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);

  const events = new Map();
  const scrollRequests = [];
  const cards = Array.from({ length: 12 }, (_, index) => ({
    offsetLeft: index * 280,
    clientWidth: 250,
    getBoundingClientRect() { return { left: this.offsetLeft, width: 250 }; },
  }));
  const listen = (name) => ({ disabled: false, addEventListener(event, callback) { events.set(`${name}:${event}`, callback); } });
  const track = {
    clientWidth: 300,
    scrollLeft: 0,
    addEventListener(event, callback) { events.set(`track:${event}`, callback); },
    getBoundingClientRect() { return { left: 100 }; },
    querySelectorAll() { return cards; },
    scrollTo(options) { scrollRequests.push(options); },
  };
  cards.forEach((card, index) => {
    card.offsetLeft = 100 + index * 280;
    card.getBoundingClientRect = () => ({ left: 100 + index * 280, width: 250 });
  });
  const counter = { textContent: '' };
  const toggle = {
    disabled: false,
    textContent: 'Pausar',
    attributes: {},
    addEventListener(event, callback) { events.set(`toggle:${event}`, callback); },
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  const nodes = {
    '[data-testimonial-track]': track,
    '[data-carousel-previous]': listen('previous'),
    '[data-carousel-next]': listen('next'),
    '[data-carousel-autoplay-toggle]': toggle,
    '[data-carousel-counter]': counter,
  };
  const document = {
    querySelector(selector) { return nodes[selector] ?? null; },
    addEventListener() {},
  };
  const window = { matchMedia() { return { matches: false }; } };

  vm.runInNewContext(script, { document, window });
  assert.equal(counter.textContent, '1 / 12');
  events.get('next:click')();
  assert.equal(counter.textContent, '2 / 12');
  assert.equal(scrollRequests.at(-1).behavior, 'smooth');
  assert.equal(scrollRequests.at(-1).left, 255, 'card position must be measured relative to a track offset by 100px');
  assert.equal(toggle.attributes['aria-pressed'], 'false');
  events.get('track:keydown')({ key: 'ArrowRight', preventDefault() {} });
  assert.equal(counter.textContent, '3 / 12');
  events.get('previous:click')();
  assert.equal(counter.textContent, '2 / 12');
});

test('keeps mobile artwork inside cards and shows one complete carousel card', () => {
  const css = read('styles.css');
  const mobileRules = css.split('@media (max-width: 520px)')[1].split('@media (max-width: 360px)')[0];

  assert.match(mobileRules, /\.hero-portrait\s*\{[^}]*right:\s*-(?:2[0-8])%/);
  assert.match(mobileRules, /\.resource-art\s*\{[^}]*right:\s*12px[^}]*bottom:\s*12px/);
  assert.match(mobileRules, /\.screenshot-diagnostico\s*\{[^}]*right:\s*12px/);
  assert.match(mobileRules, /\.screenshot-trabalenguas\s*\{[^}]*right:\s*12px/);
  assert.match(mobileRules, /\.testimonial-track\s*\{[^}]*grid-auto-columns:\s*100%[^}]*scrollbar-width:\s*none/);
  assert.match(mobileRules, /\.testimonial-track::-webkit-scrollbar\s*\{[^}]*display:\s*none/);
});

test('autoplay runs only while visible, pauses on interaction, and stops at the last example', () => {
  const script = read('script.js');
  const events = new Map();
  let timerCallback;
  let timerDelay;
  let intersectionCallback;
  let activeScroll;
  const cards = Array.from({ length: 12 }, (_, index) => ({
    offsetLeft: index * 280,
    clientWidth: 250,
    getBoundingClientRect() { return { left: this.offsetLeft, width: 250 }; },
  }));
  const listen = (name) => ({
    disabled: false,
    addEventListener(event, callback) { events.set(`${name}:${event}`, callback); },
  });
  const track = {
    clientWidth: 300,
    scrollLeft: 0,
    addEventListener(event, callback) { events.set(`track:${event}`, callback); },
    getBoundingClientRect() { return { left: 0 }; },
    querySelectorAll() { return cards; },
    scrollTo(options) { activeScroll = options.left; },
  };
  const section = {
    addEventListener(event, callback) { events.set(`section:${event}`, callback); },
  };
  const counter = { textContent: '' };
  const toggle = {
    disabled: false,
    textContent: 'Pausar',
    attributes: {},
    addEventListener(event, callback) { events.set(`toggle:${event}`, callback); },
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  const nodes = {
    '[data-testimonial-track]': track,
    '[data-carousel-previous]': listen('previous'),
    '[data-carousel-next]': listen('next'),
    '[data-carousel-counter]': counter,
    '[data-carousel-autoplay-toggle]': toggle,
    '[data-carousel-section]': section,
  };
  const document = {
    visibilityState: 'visible',
    querySelector(selector) { return nodes[selector] ?? null; },
    addEventListener(event, callback) { events.set(`document:${event}`, callback); },
  };
  class FakeIntersectionObserver {
    constructor(callback) { intersectionCallback = callback; }
    observe() { intersectionCallback([{ isIntersecting: true }]); }
    disconnect() {}
  }
  const window = {
    matchMedia() { return { matches: false, addEventListener() {} }; },
    IntersectionObserver: FakeIntersectionObserver,
  };

  vm.runInNewContext(script, {
    document,
    window,
    setInterval(callback, delay) { timerCallback = callback; timerDelay = delay; return 1; },
    clearInterval() { timerCallback = null; },
  });

  assert.equal(timerDelay, 6000);
  assert.equal(counter.textContent, '1 / 12');
  assert.equal(toggle.attributes['aria-pressed'], 'false');
  events.get('toggle:click')();
  assert.equal(timerCallback, null, 'explicit pause suspends all later automatic movement');
  assert.equal(toggle.attributes['aria-pressed'], 'true');
  assert.equal(toggle.attributes['aria-label'], 'Reanudar reproducción automática');
  events.get('toggle:click')();
  assert.equal(typeof timerCallback, 'function', 'explicit resume allows autoplay when motion is permitted');
  assert.equal(toggle.attributes['aria-pressed'], 'false');
  timerCallback();
  assert.equal(counter.textContent, '2 / 12');
  assert.ok(activeScroll > 0, 'navigation should scroll the track horizontally');

  events.get('section:mouseenter')();
  assert.equal(timerCallback, null, 'hover pauses automatic movement');
  events.get('section:mouseleave')();
  assert.equal(typeof timerCallback, 'function', 'leaving hover resumes automatic movement');
  events.get('section:focusin')();
  assert.equal(timerCallback, null, 'keyboard focus pauses automatic movement');
  events.get('section:focusout')({ relatedTarget: null });
  assert.equal(typeof timerCallback, 'function');

  document.visibilityState = 'hidden';
  events.get('document:visibilitychange')();
  assert.equal(timerCallback, null, 'a hidden tab pauses automatic movement');
  document.visibilityState = 'visible';
  events.get('document:visibilitychange')();
  assert.equal(typeof timerCallback, 'function');

  for (let index = 0; index < 10; index += 1) timerCallback();
  assert.equal(counter.textContent, '12 / 12');
  assert.equal(timerCallback, null, 'autoplay stops at the end instead of wrapping');
});

test('does not autoplay when reduced motion is enabled', () => {
  const script = read('script.js');
  let timerStarts = 0;
  let intersectionCallback;
  const callbacks = {};
  const cards = Array.from({ length: 12 }, () => ({
    offsetLeft: 0,
    clientWidth: 250,
    getBoundingClientRect() { return { left: 0, width: 250 }; },
  }));
  const track = {
    clientWidth: 300,
    addEventListener(event, callback) { callbacks[`track:${event}`] = callback; },
    getBoundingClientRect() { return { left: 0 }; },
    querySelectorAll() { return cards; },
    scrollTo() {},
  };
  const button = () => ({ addEventListener() {} });
  const nodes = {
    '[data-testimonial-track]': track,
    '[data-carousel-previous]': button(),
    '[data-carousel-next]': button(),
    '[data-carousel-counter]': { textContent: '' },
  };
  const toggle = {
    disabled: false,
    textContent: 'Pausar',
    attributes: {},
    addEventListener(event, callback) { callbacks[`toggle:${event}`] = callback; },
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  nodes['[data-carousel-autoplay-toggle]'] = toggle;
  const document = {
    visibilityState: 'visible',
    querySelector(selector) { return nodes[selector] ?? null; },
    addEventListener() {},
  };
  class FakeIntersectionObserver {
    constructor(callback) { intersectionCallback = callback; }
    observe() { intersectionCallback([{ isIntersecting: true }]); }
    disconnect() {}
  }
  const window = {
    matchMedia() { return { matches: true, addEventListener() {} }; },
    IntersectionObserver: FakeIntersectionObserver,
  };

  vm.runInNewContext(script, {
    document,
    window,
    setInterval() { timerStarts += 1; return 1; },
    clearInterval() {},
  });

  assert.equal(timerStarts, 0);
  callbacks['toggle:click']();
  assert.equal(timerStarts, 0, 'explicit resume cannot override reduced-motion preference');
  assert.equal(toggle.disabled, true);
});

test('keeps desktop screenshot art and book cover inset from card edges', () => {
  const css = read('styles.css');
  const desktopRules = css.split('@media (min-width: 760px)')[1].split('@media (max-width: 520px)')[0];

  assert.match(desktopRules, /\.resource-art\s*\{[^}]*top:\s*12px[^}]*right:\s*12px[^}]*bottom:\s*12px[^}]*height:\s*auto/);
  assert.match(desktopRules, /\.screenshot-diagnostico\s*\{[^}]*right:\s*18px/);
  assert.match(desktopRules, /\.screenshot-frases\s*\{[^}]*left:\s*18px/);
  assert.match(desktopRules, /\.screenshot-trabalenguas\s*\{[^}]*right:\s*18px/);
  assert.match(desktopRules, /\.screenshot-diagnostico\s*\{[^}]*width:\s*52%/);
  assert.match(desktopRules, /\.screenshot-frases\s*\{[^}]*width:\s*52%/);
  assert.match(desktopRules, /\.screenshot-trabalenguas\s*\{[^}]*width:\s*50%/);
  assert.match(desktopRules, /\.book-art\s*\{[^}]*top:\s*12px[^}]*right:\s*12px[^}]*bottom:\s*12px[^}]*height:\s*auto/);
  assert.match(desktopRules, /\.book-art img\s*\{(?=[^}]*height:\s*230px)(?=[^}]*max-height:\s*none)[^}]*\}/);
  assert.match(css, /\.book-art img\s*\{[^}]*object-fit:\s*contain/);
});

test('ships generated portraits as small local WebP assets with prompt provenance', () => {
  const html = read('index.html');
  const provenance = read('assets/testimonials/PROVENANCE.md');
  const generated = ['camila-cafe', 'lucia-office', 'diego-transit', 'mariana-home', 'andres-workshop', 'sofia-library', 'javier-park', 'pilar-studio'];

  for (const name of generated) {
    const asset = `assets/testimonials/${name}.webp`;
    assert.ok(html.includes(asset), `${asset} should be referenced by the page`);
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} should exist`);
    assert.ok(fs.statSync(path.join(root, asset)).size < 80 * 1024, `${asset} should be under 80 KiB`);
    assert.ok(!fs.existsSync(path.join(root, 'assets', 'testimonials', `${name}.png`)), `unoptimized ${name}.png should not ship`);
    assert.ok(provenance.includes(`${name}.webp`), `${name}.webp should be documented`);
  }

  assert.match(provenance, /all 12 portraits are fictional/i);
  assert.match(provenance, /four.*copied.*sibling/i);
  assert.match(provenance, /eight.*generated/i);
  assert.equal((provenance.match(/^- Prompt:/gm) ?? []).length, 8);
});

test('keeps every testimonial portrait local, present, and decodable', () => {
  const html = read('index.html');
  const imagePaths = [...html.matchAll(/class="testimonial-avatar"[^>]*src="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.equal(imagePaths.length, 12);
  for (const imagePath of imagePaths) {
    assert.doesNotMatch(imagePath, /^(?:https?:)?\/\//, `${imagePath} should be served locally`);
    const absolutePath = path.resolve(root, imagePath);
    assert.ok(absolutePath.startsWith(`${root}${path.sep}`), `${imagePath} should stay inside the bridge project`);
    assert.ok(fs.existsSync(absolutePath), `${imagePath} should exist on disk`);
    assert.equal(require('node:child_process').spawnSync('identify', ['-format', '%m', absolutePath]).status, 0, `${imagePath} should decode`);
  }
});

test('shows a native-scroll swipe cue for touch-first testimonial navigation', () => {
  const html = read('index.html');
  const css = read('styles.css');

  assert.match(html, /class="carousel-swipe-hint"[^>]*>[^<]*Desliza/i);
  assert.match(css, /\.testimonial-track\s*\{[^}]*overflow-x:\s*auto/);
  assert.match(css, /\.testimonial-track\s*\{[^}]*scroll-snap-type:\s*x\s*mandatory/);
});

test('allows explicit resume while the toggle retains focus and offers restart after autoplay completes', () => {
  const script = read('script.js');
  const events = new Map();
  let timerCallback = null;
  let intersectionCallback;
  const cards = Array.from({ length: 12 }, (_, index) => ({
    getBoundingClientRect() { return { left: index * 280, width: 250 }; },
  }));
  const control = (name) => ({
    disabled: false,
    textContent: '',
    attributes: {},
    addEventListener(event, callback) { events.set(`${name}:${event}`, callback); },
    setAttribute(name, value) { this.attributes[name] = value; },
  });
  const track = {
    clientWidth: 300,
    scrollLeft: 0,
    addEventListener(event, callback) { events.set(`track:${event}`, callback); },
    getBoundingClientRect() { return { left: 0 }; },
    querySelectorAll() { return cards; },
    scrollTo() {},
  };
  const section = {
    addEventListener(event, callback) { events.set(`section:${event}`, callback); },
    contains() { return true; },
  };
  const toggle = control('toggle');
  const nodes = {
    '[data-testimonial-track]': track,
    '[data-carousel-section]': section,
    '[data-carousel-previous]': control('previous'),
    '[data-carousel-next]': control('next'),
    '[data-carousel-autoplay-toggle]': toggle,
    '[data-carousel-counter]': { textContent: '' },
  };
  const document = {
    visibilityState: 'visible',
    querySelector(selector) { return nodes[selector] ?? null; },
    addEventListener() {},
  };
  class FakeIntersectionObserver {
    constructor(callback) { intersectionCallback = callback; }
    observe() { intersectionCallback([{ isIntersecting: true }]); }
  }
  const window = {
    matchMedia() { return { matches: false, addEventListener() {} }; },
    IntersectionObserver: FakeIntersectionObserver,
  };

  vm.runInNewContext(script, {
    document,
    window,
    setInterval(callback) { timerCallback = callback; return 1; },
    clearInterval() { timerCallback = null; },
  });

  events.get('toggle:click')();
  assert.equal(timerCallback, null, 'pause click stops autoplay');
  events.get('section:focusin')();
  events.get('toggle:click')();
  assert.equal(typeof timerCallback, 'function', 'explicit resume must override retained focus');

  for (let index = 0; index < 11; index += 1) timerCallback();
  assert.equal(toggle.disabled, false, 'completed autoplay remains restartable');
  assert.equal(toggle.attributes['aria-label'], 'Reiniciar reproducción automática');
  events.get('toggle:click')();
  assert.equal(nodes['[data-carousel-counter]'].textContent, '1 / 12', 'restart returns to the first example');
  assert.equal(typeof timerCallback, 'function', 'restart begins autoplay again');
});
