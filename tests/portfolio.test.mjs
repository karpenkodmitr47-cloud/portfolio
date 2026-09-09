import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (name) => readFile(new URL(name, root), 'utf8');

test('HTML contains the complete semantic page structure', async () => {
  const html = await read('index.html');
  for (const id of ['home', 'about', 'work', 'skills', 'process', 'contact']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /<header\b/);
  assert.match(html, /<main\b/);
  assert.match(html, /<footer\b/);
});

test('portfolio exposes six filterable project cards', async () => {
  const html = await read('index.html');
  assert.equal((html.match(/class="project-card/g) ?? []).length, 6);
  assert.ok((html.match(/class="filter-button/g) ?? []).length >= 4);
  assert.match(html, /data-category=/);
});

test('interactive controls have accessible hooks', async () => {
  const html = await read('index.html');
  assert.match(html, /id="menu-toggle"[^>]*aria-expanded="false"/);
  assert.match(html, /<dialog[^>]*id="project-dialog"[^>]*aria-labelledby=/);
  assert.match(html, /href="mailto:/);
});

test('CSS defines the approved visual tokens and responsive ranges', async () => {
  const css = await read('styles.css');
  for (const value of ['#07070a', '#f4f7ff', '#9295a5', '#42f5e6', '#9b5cff']) {
    assert.ok(css.toLowerCase().includes(value));
  }
  for (const width of ['600px', '960px', '1440px']) {
    assert.ok(css.includes(width));
  }
});

test('CSS provides accessibility and motion fallbacks', async () => {
  const css = await read('styles.css');
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /pointer:\s*coarse/);
  assert.match(css, /scrollbar-color|::-webkit-scrollbar/);
});

test('project matching treats all as a wildcard', async () => {
  const { matchesCategory } = await import(new URL(`../script.js?case=${Date.now()}`, import.meta.url));
  assert.equal(matchesCategory('data', 'all'), true);
  assert.equal(matchesCategory('data', 'data'), true);
  assert.equal(matchesCategory('data', 'interfaces'), false);
});

test('project lookup returns a matching project or null', async () => {
  const { getProjectById } = await import(new URL(`../script.js?lookup=${Date.now()}`, import.meta.url));
  const projects = [{ id: 'luma' }, { id: 'pulse' }];
  assert.deepEqual(getProjectById(projects, 'pulse'), { id: 'pulse' });
  assert.equal(getProjectById(projects, 'missing'), null);
});

test('JavaScript includes all progressive enhancement initializers', async () => {
  const js = await read('script.js');
  for (const name of ['setupFilters', 'setupDialog', 'setupMenu', 'setupReveal', 'setupSectionSpy', 'setupCursor', 'setupAmbientMotion']) {
    assert.match(js, new RegExp(`function\\s+${name}\\b`));
  }
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /showModal\(/);
});
