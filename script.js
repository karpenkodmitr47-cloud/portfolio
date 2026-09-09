export const matchesCategory = (category, filter) => filter === 'all' || category === filter;

export const getProjectById = (items, id) =>
  items.find((project) => project.id === id) ?? null;

export const projects = [
  {
    id: 'luma',
    index: '01',
    title: 'Luma Commerce',
    discipline: 'Immersive commerce',
    year: '2026',
    summary: 'A luminous product journey balancing atmosphere, speed, and conversion. The interface turns product discovery into a paced visual story without hiding the actions that matter.',
    stack: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'pulse',
    index: '02',
    title: 'Pulse Atlas',
    discipline: 'Data visualization',
    year: '2026',
    summary: 'A live-feeling atlas that turns complex signals into a calm visual narrative. Layered charts keep dense information legible from overview to detail.',
    stack: ['SVG', 'Canvas', 'Accessibility']
  },
  {
    id: 'synapse',
    index: '03',
    title: 'Synapse Studio',
    discipline: 'AI interface',
    year: '2025',
    summary: 'A focused creative workspace for shaping and comparing generative outputs. Its flexible panels support iteration while preserving a clear sense of context.',
    stack: ['Design systems', 'Motion', 'UX']
  },
  {
    id: 'offset',
    index: '04',
    title: 'Offset Journal',
    discipline: 'Digital editorial',
    year: '2025',
    summary: 'An experimental reading experience with uncompromising typographic rhythm. The layout shifts between quiet essays and high-energy cultural features.',
    stack: ['CSS Grid', 'Typography', 'Performance']
  },
  {
    id: 'orbit',
    index: '05',
    title: 'Orbit Rooms',
    discipline: 'Spatial web',
    year: '2025',
    summary: 'A spatial exhibition concept that makes digital rooms feel tangible. Movement is expressive but remains predictable, responsive, and optional.',
    stack: ['WebGL', 'Interaction', '3D']
  },
  {
    id: 'shader',
    index: '06',
    title: 'Shader Kit',
    discipline: 'Creative toolkit',
    year: '2024',
    summary: 'A modular playground for prototyping expressive real-time materials. A direct manipulation interface keeps visual experimentation fast and understandable.',
    stack: ['GLSL', 'Canvas', 'Tooling']
  }
];

function setupFilters() {
  const buttons = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.project-card')];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      buttons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle('is-active', active);
        candidate.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card, index) => {
        card.classList.add('is-filtering');
        window.setTimeout(() => {
          card.hidden = !matchesCategory(card.dataset.category, filter);
          card.classList.remove('is-filtering');
          if (!card.hidden) card.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
        }, 160);
      });
    });
  });
}

function setupDialog() {
  const dialog = document.querySelector('#project-dialog');
  if (!dialog) return;

  const closeButton = dialog.querySelector('.dialog-close');
  const title = dialog.querySelector('#dialog-title');
  const index = dialog.querySelector('[data-dialog-index]');
  const discipline = dialog.querySelector('[data-dialog-discipline]');
  const year = dialog.querySelector('[data-dialog-year]');
  const summary = dialog.querySelector('[data-dialog-summary]');
  const stack = dialog.querySelector('[data-dialog-stack]');
  let trigger = null;

  document.querySelectorAll('.project-open').forEach((button) => {
    button.addEventListener('click', () => {
      const project = getProjectById(projects, button.dataset.project);
      if (!project) return;

      trigger = button;
      title.textContent = project.title;
      index.textContent = project.index;
      discipline.textContent = project.discipline;
      year.textContent = project.year;
      summary.textContent = project.summary;
      stack.replaceChildren(...project.stack.map((item) => {
        const node = document.createElement('li');
        node.textContent = item;
        return node;
      }));
      dialog.showModal();
    });
  });

  const close = () => dialog.open && dialog.close();
  closeButton?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => trigger?.focus());
}

function setupMenu() {
  const toggle = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
}

function setupReveal() {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  if (!('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });

  targets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
    observer.observe(target);
  });
}

function setupSectionSpy() {
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-42% 0px -48% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

function setupCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let frame = 0;
  let x = -50;
  let y = -50;
  const render = () => {
    cursor.style.setProperty('--cursor-x', `${x}px`);
    cursor.style.setProperty('--cursor-y', `${y}px`);
    frame = 0;
  };

  window.addEventListener('pointermove', (event) => {
    x = event.clientX;
    y = event.clientY;
    cursor.classList.add('is-visible');
    if (!frame) frame = window.requestAnimationFrame(render);
  }, { passive: true });

  document.querySelectorAll('a, button').forEach((target) => {
    target.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
    target.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  });
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
}

function setupAmbientMotion() {
  const hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2));
    hero.style.setProperty('--pointer-x', x.toFixed(3));
    hero.style.setProperty('--pointer-y', y.toFixed(3));
  }, { passive: true });
}

function setupHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function setupYear() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}

if (typeof document !== 'undefined') {
  setupFilters();
  setupDialog();
  setupMenu();
  setupReveal();
  setupSectionSpy();
  setupCursor();
  setupAmbientMotion();
  setupHeader();
  setupYear();
}
