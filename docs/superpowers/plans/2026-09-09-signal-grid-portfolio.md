# Signal Grid Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete English-language cyberpunk-tech portfolio for Kirill Karpenko that opens without a build step and is ready for GitHub Pages.

**Architecture:** The site is a progressive-enhancement static application. Semantic HTML owns all content, CSS owns the responsive Signal Grid presentation, and one ES module adds filters, dialog behavior, navigation state, reveal motion, cursor enhancement, and ambient pointer effects while keeping the page usable when JavaScript is unavailable.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript ES modules, Node.js built-in test runner, local HTTP server for browser verification

**Spec:** `docs/superpowers/specs/2026-09-09-signal-grid-portfolio-design.md`

## Global Constraints

- Use no frontend framework, package manager, backend, database, analytics, authentication, or build pipeline.
- Keep the deliverable in `index.html`, `styles.css`, and `script.js`; tests live in `tests/portfolio.test.mjs`.
- Use Space Grotesk and IBM Plex Mono from Google Fonts; all other visuals are local CSS or inline SVG.
- Preserve the palette `#07070A`, `#F4F7FF`, `#9295A5`, `#42F5E6`, and `#9B5CFF`.
- Support viewport widths from 320px through 2560px and honor `prefers-reduced-motion: reduce`.
- Keep all content in English and identify the owner as “Kirill Karpenko — Frontend Developer & Creative Coder.”
- Do not invent real employers, clients, awards, testimonials, or production metrics.
- Use `mailto:` for contact; do not submit a real form.

---

### Task 1: Semantic portfolio foundation

**Files:**
- Create: `tests/portfolio.test.mjs`
- Create: `index.html`

**Interfaces:**
- Consumes: the content architecture and accessibility rules from the design specification
- Produces: stable IDs `home`, `about`, `work`, `skills`, `process`, and `contact`; `.project-card` elements with `data-category`; `.filter-button` controls with `data-filter`; `dialog#project-dialog`; `button#menu-toggle`; `nav#site-nav`

- [ ] **Step 1: Write the failing structural tests**

Create `tests/portfolio.test.mjs` with the following initial content:

```js
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
```

- [ ] **Step 2: Run the tests and verify the expected failure**

Run: `node --test tests/portfolio.test.mjs`

Expected: FAIL because `index.html` does not exist.

- [ ] **Step 3: Build the semantic HTML**

Create `index.html` with a complete document shell, metadata, Google Fonts preconnects, `styles.css`, and `<script type="module" src="script.js"></script>`. Include:

```html
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="cursor" aria-hidden="true"><span></span></div>
  <header class="site-header" data-header>
    <a class="brand" href="#home" aria-label="Kirill Karpenko, home">KK<span>/26</span></a>
    <button id="menu-toggle" class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span>Menu</span><i aria-hidden="true"></i>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
      <a href="#about">About</a><a href="#work">Work</a><a href="#skills">Stack</a><a href="#contact">Contact</a>
    </nav>
  </header>
  <main id="main-content">
    <section id="home" class="hero" aria-labelledby="hero-title"></section>
    <section id="about" aria-labelledby="about-title"></section>
    <section id="work" aria-labelledby="work-title"></section>
    <section id="skills" aria-labelledby="skills-title"></section>
    <section id="process" aria-labelledby="process-title"></section>
    <section id="contact" aria-labelledby="contact-title"></section>
  </main>
  <dialog id="project-dialog" aria-labelledby="dialog-title"></dialog>
  <footer class="site-footer"></footer>
</body>
```

Fill every section with final English copy. Add six complete project articles named Luma Commerce, Pulse Atlas, Synapse Studio, Offset Journal, Orbit Rooms, and Shader Kit. Give each card a category, summary, technology list, CSS/SVG artwork, and `.project-open` button with `data-project`. Add filter buttons for All, Interfaces, Data, and Experiments. Add four skill nodes, four process steps, a `mailto:hello@kirillkarpenko.dev` CTA, footer navigation, and non-deceptive GitHub/LinkedIn placeholder links pointing to `#contact` with accessible labels.

- [ ] **Step 4: Run the structural tests and verify green**

Run: `node --test tests/portfolio.test.mjs`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 5: Commit the semantic foundation**

```bash
git add index.html tests/portfolio.test.mjs
git commit -m "feat: add semantic portfolio content"
```

---

### Task 2: Signal Grid visual system and responsive layout

**Files:**
- Modify: `tests/portfolio.test.mjs`
- Create: `styles.css`

**Interfaces:**
- Consumes: the class names and section IDs from `index.html`
- Produces: CSS custom properties `--ink`, `--paper`, `--muted`, `--cyan`, and `--violet`; layouts for all sections; responsive breakpoints at 600px, 960px, and 1440px; reduced-motion and coarse-pointer fallbacks

- [ ] **Step 1: Add failing visual-contract tests**

Append:

```js
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
```

- [ ] **Step 2: Run tests and verify red**

Run: `node --test tests/portfolio.test.mjs`

Expected: the two CSS tests fail because `styles.css` does not exist.

- [ ] **Step 3: Implement tokens, typography, and global composition**

Create `styles.css` beginning with:

```css
:root {
  --ink: #07070a;
  --paper: #f4f7ff;
  --muted: #9295a5;
  --cyan: #42f5e6;
  --violet: #9b5cff;
  --line: rgba(244, 247, 255, 0.14);
  --surface: rgba(16, 16, 23, 0.78);
  --ease: cubic-bezier(.16, 1, .3, 1);
  --gutter: clamp(1rem, 4vw, 4.5rem);
  --content: 1440px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scrollbar-color: var(--violet) var(--ink); }
body {
  margin: 0;
  color: var(--paper);
  background: var(--ink);
  font-family: "Space Grotesk", sans-serif;
  overflow-x: hidden;
}
```

Complete the visual system with a fixed technical-grid background, selection styles, skip link, custom scrollbar, fluid heading scale, technical eyebrow labels, buttons, header states, and section spacing. Keep body copy at a readable maximum line length.

- [ ] **Step 4: Implement section art direction**

Style the hero as an asymmetric grid with a large multiline heading and orbital signal illustration. Style project cards as alternating editorial compositions rather than identical tiles; give each `.project-visual` variant a unique local CSS/SVG treatment. Build the skill map from connected nodes, the process as a numbered signal path, the contact block as a high-contrast typographic finale, and the dialog as a centered near-black panel with a luminous border.

- [ ] **Step 5: Implement responsive and preference-aware behavior**

Add mobile-first rules and explicit enhancements at `@media (min-width: 600px)`, `@media (min-width: 960px)`, and `@media (min-width: 1440px)`. Add `@media (pointer: coarse)` to remove the custom cursor and `@media (prefers-reduced-motion: reduce)` to disable smooth scrolling, transitions, and decorative animation.

- [ ] **Step 6: Run tests and verify green**

Run: `node --test tests/portfolio.test.mjs`

Expected: 5 tests pass, 0 fail.

- [ ] **Step 7: Commit the complete responsive design**

```bash
git add styles.css tests/portfolio.test.mjs
git commit -m "feat: create signal grid visual system"
```

---

### Task 3: Progressive-enhancement interactions

**Files:**
- Modify: `tests/portfolio.test.mjs`
- Create: `script.js`

**Interfaces:**
- Consumes: `.filter-button`, `.project-card`, `.project-open`, `dialog#project-dialog`, `#menu-toggle`, `#site-nav`, `[data-reveal]`, and section IDs from `index.html`
- Produces: exported pure functions `matchesCategory(category, filter)` and `getProjectById(projects, id)`; DOM initializers `setupFilters()`, `setupDialog()`, `setupMenu()`, `setupReveal()`, `setupSectionSpy()`, `setupCursor()`, and `setupAmbientMotion()`

- [ ] **Step 1: Add failing pure-function and source-contract tests**

Append:

```js
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
```

- [ ] **Step 2: Run tests and verify red**

Run: `node --test tests/portfolio.test.mjs`

Expected: the new tests fail because `script.js` does not exist.

- [ ] **Step 3: Implement the tested pure functions and project data**

Create `script.js` with:

```js
export const matchesCategory = (category, filter) => filter === 'all' || category === filter;

export const getProjectById = (projects, id) =>
  projects.find((project) => project.id === id) ?? null;

const projects = [
  { id: 'luma', title: 'Luma Commerce', discipline: 'Immersive commerce', year: '2026', summary: 'A luminous product journey balancing atmosphere, speed, and conversion.', stack: ['HTML', 'CSS', 'JavaScript'] },
  { id: 'pulse', title: 'Pulse Atlas', discipline: 'Data visualization', year: '2026', summary: 'A live-feeling atlas that turns complex signals into a calm visual narrative.', stack: ['SVG', 'Canvas', 'A11y'] },
  { id: 'synapse', title: 'Synapse Studio', discipline: 'AI interface', year: '2025', summary: 'A focused creative workspace for shaping and comparing generative outputs.', stack: ['Design systems', 'Motion', 'UX'] },
  { id: 'offset', title: 'Offset Journal', discipline: 'Digital editorial', year: '2025', summary: 'An experimental reading experience with uncompromising typographic rhythm.', stack: ['CSS Grid', 'Type', 'Performance'] },
  { id: 'orbit', title: 'Orbit Rooms', discipline: 'Spatial web', year: '2025', summary: 'A spatial exhibition concept that makes digital rooms feel tangible.', stack: ['WebGL', 'Interaction', '3D'] },
  { id: 'shader', title: 'Shader Kit', discipline: 'Creative toolkit', year: '2024', summary: 'A modular playground for prototyping expressive real-time materials.', stack: ['GLSL', 'Canvas', 'Tooling'] }
];
```

- [ ] **Step 4: Implement navigation and project interactions**

`setupFilters()` must update `aria-pressed`, toggle each card's `hidden` property through `matchesCategory`, and restart the card entrance animation. `setupDialog()` must read the clicked `data-project`, populate dialog title, discipline, year, summary, and technology list through text nodes, call `showModal()`, close from the explicit close button, and restore focus to the trigger. `setupMenu()` must keep `aria-expanded` and the navigation's open class synchronized and close after an anchor is selected.

- [ ] **Step 5: Implement reveal, section spy, cursor, and ambient motion**

`setupReveal()` and `setupSectionSpy()` use Intersection Observer with conservative thresholds. `setupCursor()` exits for coarse pointers or reduced motion, then updates CSS custom properties with `requestAnimationFrame`. `setupAmbientMotion()` updates hero `--pointer-x` and `--pointer-y` variables with clamped values. Initialize all functions only inside `if (typeof document !== 'undefined')` so Node can import the pure functions.

- [ ] **Step 6: Run tests and verify green**

Run: `node --test tests/portfolio.test.mjs`

Expected: 8 tests pass, 0 fail.

- [ ] **Step 7: Commit the interactions**

```bash
git add script.js tests/portfolio.test.mjs
git commit -m "feat: add portfolio interactions"
```

---

### Task 4: Browser QA, accessibility polish, and deployment readiness

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Modify: `tests/portfolio.test.mjs`
- Create: `README.md`

**Interfaces:**
- Consumes: the complete static site from Tasks 1–3
- Produces: verified keyboard behavior, clean browser console, documented local/deployment instructions, and final automated regression coverage

- [ ] **Step 1: Add the final deployment and metadata test**

Append:

```js
test('site includes deployment-ready metadata and documentation', async () => {
  const [html, readme] = await Promise.all([read('index.html'), read('README.md')]);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<meta name="theme-color" content="#07070A"/i);
  assert.match(html, /property="og:title"/);
  assert.match(readme, /GitHub Pages/);
  assert.match(readme, /python -m http\.server 8000/);
});
```

- [ ] **Step 2: Run tests and verify red**

Run: `node --test tests/portfolio.test.mjs`

Expected: the new test fails because `README.md` does not exist.

- [ ] **Step 3: Add metadata and operating instructions**

Ensure `index.html` contains description, theme color, viewport, Open Graph title/description/type, and a descriptive document title. Create `README.md` with the project concept, file map, local command `python -m http.server 8000`, browser URL `http://localhost:8000`, test command `node --test tests/portfolio.test.mjs`, and GitHub Pages instructions: repository Settings → Pages → Deploy from a branch → `master` and `/ (root)`.

- [ ] **Step 4: Run the full automated verification**

Run: `node --test tests/portfolio.test.mjs`

Expected: 9 tests pass, 0 fail.

Run: `node --check script.js`

Expected: exit code 0 with no output.

- [ ] **Step 5: Serve and inspect responsive layouts**

Run: `python -m http.server 8000`

Inspect `http://localhost:8000` at 320×720, 768×1024, 1440×900, and 2560×1440. Verify that no horizontal overflow occurs; the hero remains legible; project grids change from one to two columns; the menu is usable at narrow widths; and wide layouts retain capped reading widths.

- [ ] **Step 6: Verify interaction and accessibility behavior**

Using keyboard and pointer input, verify skip-link visibility, focus order, mobile menu expanded state, every project filter, all six project dialog triggers, Escape and close-button behavior, focus restoration, section navigation, custom cursor fallback, and reduced-motion mode. Inspect browser console output and correct every error or warning originating from the site.

- [ ] **Step 7: Re-run verification after browser fixes**

Run: `node --test tests/portfolio.test.mjs`

Expected: 9 tests pass, 0 fail.

Run: `node --check script.js`

Expected: exit code 0 with no output.

- [ ] **Step 8: Commit the verified release**

```bash
git add index.html styles.css script.js tests/portfolio.test.mjs README.md
git commit -m "chore: verify portfolio release"
```

