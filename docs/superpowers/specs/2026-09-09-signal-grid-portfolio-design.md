# Signal Grid Portfolio — Design Specification

## Objective

Build a fully static, production-ready English-language portfolio landing page for **Kirill Karpenko — Frontend Developer & Creative Coder**. The site must feel like a bespoke digital studio piece: technically precise, visually memorable, fast, accessible, and easy to deploy to GitHub Pages or Vercel without a build step.

## Design Direction

The chosen direction is **Signal Grid**: an editorial cyberpunk-tech aesthetic with disciplined asymmetry, oversized typography, thin technical lines, restrained glow, and small monospace system labels. The interface should communicate confidence and craft rather than imitate a game HUD or a hacker terminal.

### Visual system

- Background: `#07070A`
- Primary text: `#F4F7FF`
- Muted text: `#9295A5`
- Cyan accent: `#42F5E6`
- Violet accent: `#9B5CFF`
- Display typeface: Space Grotesk
- Technical/accent typeface: IBM Plex Mono
- Layout: mobile-first fluid grid from 320px to 2560px, with a centered maximum content width and deliberate edge-to-edge moments
- Surfaces: near-black panels, fine borders, subtle noise/grid texture, and tightly controlled cyan/violet glow

## Technology and File Structure

Use plain semantic HTML5, modern CSS3, and minimal vanilla JavaScript. This is preferable to React for a single static portfolio because it removes the build step, minimizes runtime weight, and makes local opening and GitHub Pages deployment immediate.

- `index.html`: content, semantic landmarks, project dialog markup, metadata, and accessible fallbacks
- `styles.css`: tokens, responsive layout, typography, effects, focus states, motion, and reduced-motion behavior
- `script.js`: navigation state, project filtering, modal interactions, reveal-on-scroll, cursor enhancement, and small ambient interactions
- `tests/portfolio.test.mjs`: automated structural and behavioral checks using Node's built-in test runner

External dependencies are limited to Google Fonts. Visual artwork uses local CSS/SVG compositions so the page does not depend on unstable image placeholder services.

## Content Architecture

### Header

A compact fixed header contains the KK monogram, availability indicator, anchor navigation, and a contact action. On small screens it becomes an accessible menu with correct expanded state and keyboard behavior.

### Hero

The opening viewport introduces Kirill with the headline **“I build interfaces for the next signal.”** Supporting copy positions him as a frontend developer and creative coder. Primary CTA links to selected work; secondary CTA opens a `mailto:` contact. A generative orbital/grid composition provides motion without competing with the headline.

### About

A concise personal statement explains the combination of engineering discipline and visual experimentation. Supporting metrics communicate years of practice, shipped projects, and performance focus without inventing employer or client claims.

### Projects

Six fictional but credible concept projects demonstrate varied frontend work: immersive commerce, data visualization, AI tooling, culture/editorial, spatial web, and a creative developer toolkit. Category filters update the visible cards and their accessibility state. Each card has a distinct art-directed CSS/SVG visual, a short summary, technology labels, and a button that opens an accessible modal with expanded details.

### Skills

Skills appear as an interactive signal map rather than a plain list. Four grouped nodes cover interface engineering, creative development, performance/accessibility, and design systems. Hover and focus states expose concise capability notes.

### Process

A four-step horizontal/vertical sequence explains discovery, direction, development, and refinement. It replaces unverifiable testimonials and keeps the portfolio credible without real client quotations.

### Contact and Footer

A high-contrast closing CTA invites collaboration through a `mailto:` link. The footer includes navigation, social placeholder links with clear labels, current year, and a small system-status motif.

## Interaction Design

- Project cards use perspective, border-light, and artwork motion on hover without changing layout.
- Section entrances use Intersection Observer and staggered opacity/transform transitions.
- Project filters animate content changes and preserve keyboard focus.
- Project details open in the native `dialog` element, trap focus through browser behavior, close with Escape, and restore focus to the trigger.
- The desktop custom cursor is an enhancement only and is disabled for coarse pointers and reduced-motion users.
- Hero ambience responds subtly to pointer position and scroll; transforms remain GPU-friendly.
- Navigation highlights the current section using Intersection Observer.
- All animations use considered cubic-bezier easing and respect `prefers-reduced-motion: reduce`.

## Responsive Behavior

- 320–599px: single-column layout, simplified hero artwork, touch-sized controls, compact navigation, stacked project cards
- 600–959px: two-column project grid and expanded skill map
- 960–1439px: asymmetric editorial grid, full hero composition, persistent desktop navigation
- 1440–2560px: capped reading widths with expanded artwork and whitespace, avoiding stretched text lines

## Accessibility and Performance

- Semantic headings and landmarks follow a logical order.
- All controls are reachable and operable by keyboard.
- Visible `:focus-visible` treatment uses the cyan accent with adequate offset.
- Text contrast meets WCAG AA for normal body content.
- Decorative visuals are hidden from assistive technology; meaningful labels are explicit.
- The modal has an accessible name and close control.
- No autoplay audio, layout-shifting assets, or blocking JavaScript.
- JavaScript enhancements preserve usable content when scripts are unavailable.
- CSS and JS are kept local and compact; animation uses transform and opacity where possible.

## Verification

- Automated tests verify required landmarks, section anchors, six project cards, filter controls, dialog semantics, `mailto:` contact behavior, reduced-motion CSS, responsive breakpoints, and expected JavaScript interaction hooks.
- Run HTML/CSS/JS syntax checks and the Node test suite.
- Serve the site locally and inspect at representative mobile, tablet, desktop, and wide-screen sizes.
- Verify keyboard navigation, project filters, modal open/close, reduced-motion behavior, and console cleanliness.

## Out of Scope

- Backend services, databases, analytics, authentication, and real contact-form submission
- CMS integration or editable admin tools
- Claims about real clients, awards, testimonials, or production metrics not provided by Kirill
- Frameworks, package managers, and a build pipeline
