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
  const captures = [...html.matchAll(/class="resource-screenshot"[^>]*src="([^"]+)"/g)];

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
  assert.match(html, /data-testimonial-track[^>]*tabindex="0"/);
  assert.match(css, /scroll-snap-type:\s*x\s*mandatory/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);

  const events = new Map();
  const cards = Array.from({ length: 12 }, (_, index) => ({
    offsetLeft: index * 280,
    scrollIntoView(options) { this.behavior = options.behavior; },
    getBoundingClientRect() { return { left: this.offsetLeft, width: 250 }; },
  }));
  const listen = (name) => ({ disabled: false, addEventListener(event, callback) { events.set(`${name}:${event}`, callback); } });
  const track = {
    clientWidth: 300,
    scrollLeft: 0,
    addEventListener(event, callback) { events.set(`track:${event}`, callback); },
    getBoundingClientRect() { return { left: 0 }; },
    querySelectorAll() { return cards; },
  };
  const counter = { textContent: '' };
  const nodes = {
    '[data-testimonial-track]': track,
    '[data-carousel-previous]': listen('previous'),
    '[data-carousel-next]': listen('next'),
    '[data-carousel-counter]': counter,
  };
  const document = { querySelector(selector) { return nodes[selector] ?? null; } };
  const window = { matchMedia() { return { matches: false }; } };

  vm.runInNewContext(script, { document, window });
  assert.equal(counter.textContent, '1 / 12');
  events.get('next:click')();
  assert.equal(counter.textContent, '2 / 12');
  assert.equal(cards[1].behavior, 'smooth');
  events.get('track:keydown')({ key: 'ArrowRight', preventDefault() {} });
  assert.equal(counter.textContent, '3 / 12');
  events.get('previous:click')();
  assert.equal(counter.textContent, '2 / 12');
});
