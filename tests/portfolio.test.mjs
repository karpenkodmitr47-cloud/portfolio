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
