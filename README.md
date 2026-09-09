# Signal Grid Portfolio

A static cyberpunk-tech portfolio for Kirill Karpenko, built with semantic HTML, modern CSS, and a small vanilla JavaScript enhancement layer. The design uses a disciplined editorial grid, local CSS/SVG artwork, accessible project dialogs, responsive project filters, and preference-aware motion.

## Files

- `index.html` — semantic content and project artwork
- `styles.css` — visual system, responsive layout, and motion
- `script.js` — filters, dialogs, navigation, reveal, cursor, and ambient interaction
- `tests/portfolio.test.mjs` — structural and behavior checks

## Run locally

From this directory, start a static server:

```bash
python -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Test

```bash
node --test tests/portfolio.test.mjs
node --check script.js
```

## GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `master` branch and `/ (root)`, then save.

No build command or output directory is required.
