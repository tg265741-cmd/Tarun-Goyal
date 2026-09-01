# Golens — Official-Style Showcase Site

A fast, honest, Samsung.com-inspired e-commerce experience for **Golens** (GoLens Import & Export Pvt Ltd, Bikaner) — the smart-lock and security importer behind [golens.in](https://golens.in).

Built as a static site (HTML + CSS + vanilla JS, no build step) with a **single source of truth**: `assets/js/data.js` mirrors the real golens.in catalogue — real prices, real specifications, real product URLs and real Shopify CDN imagery. Nothing on this site is fabricated: no invented ratings, reviews, stock claims or delivery promises.

## Pages

| Page | What it does |
|---|---|
| `index.html` | Samsung-style home: auto hero carousel, benefits, category circles, feature-card carousels, KV banner, split promos, recommended grid, support strip |
| `locks.html` | Full lock catalogue with sticky filter chips (door type, access, features, price) + deep-linkable `?f=` presets |
| `product.html` | PDP: gallery, honest buy box, spec table, **interactive door-compatibility checker**, installation paths, FAQ (with schema), related locks, sticky mobile buy bar |
| `find-my-lock.html` | 6-question recommender with a hard-gate scoring engine; borderline cases route to a human expert instead of guessing |
| `compare.html` | Side-by-side comparison of up to 4 locks; "—" means the official listing doesn't state it |
| `support.html` | Contact paths (toll-free 1800-123-7255, WhatsApp, care@golens.in), installation paths, warranty scope, FAQ |
| `business.html` | B2B: offices, glass cabins, retail, hotels — with volume-quote CTA |

## Architecture

```
assets/
  css/samsung.css   # whole design system (white, Manrope, #034ea2 blue)
  js/data.js        # catalogue: 36 SKUs, collections, store facts (authoritative)
  js/samsung.js     # shared runtime: header/footer injection, mega menu, mobile nav,
                    # search overlay (Ctrl+K), cart drawer (localStorage → golens.in checkout),
                    # toast, product cards, scroll reveals, analytics (dataLayer)
assets/img/         # lifestyle/concept photography (never misrepresents product geometry)
```

- Load order on every page: `data.js` → `samsung.js` → page script.
- Pages mount the chrome with `<div id="gsHeader"></div>` / `<div id="gsFooter"></div>`.
- Cart is local (`golens_cart_v1`); checkout hands off to up to 3 real golens.in product URLs.
- Analytics events (`home_view`, `product_view`, `add_to_cart`, `filter`, `finder_*`, `compatibility_check`, …) push to `window.dataLayer`.
- Accessibility: skip links, keyboard nav, focus states, `prefers-reduced-motion` support, ESC closes overlays.
- SEO: Organization / Product / FAQ JSON-LD, canonicals, honest meta descriptions.

## Data honesty rules

1. Prices, MRP, specs, warranty — only from `data.js` (mirrors golens.in).
2. Unstated specs render as "—", never guessed.
3. Compatibility checker and recommender give honest outcomes, including "expert confirmation recommended" and "expert route" when unsure.
4. Lifestyle imagery is atmospheric; product imagery is the real Shopify CDN photography.

## Run locally

Any static server, e.g.:

```bash
python3 -m http.server 8080
# or: npx serve .
```
