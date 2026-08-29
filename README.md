# GOLENS — "Threshold" Experience

A complete reconception of **golens.in** as an international-grade smart-security
commerce experience. Business structure preserved; the experience reinvented.

**Live preview:** served from this repo (static site — open `index.html`).

---

## 1 · What this is

| Layer | Approach |
|---|---|
| **Source of truth** | The live Shopify store golens.in, audited 2026-08-29 (homepage, all-locks collection ×5 pages, attendance/camera/dashcam/doorbell collections, sitemap pages & collections, product JSON for X95 Black/Gold + X28, policy pages). |
| **Products & prices** | 36 real SKUs with real handles, prices, compare-at prices, access methods, warranty & door-fit data in `assets/js/data.js`. Every product links to its real golens.in product URL. **Nothing is fabricated.** |
| **Imagery** | Real product photography from the Shopify CDN (untouched). Environment scenes (entrances, doors, install, travel) are AI-generated concepts that contain **no product hardware** — products are never misrepresented. |
| **Checkout** | Cart & buy actions hand off to the official golens.in product pages to complete payment securely. Cart state persists in `localStorage`. |

## 2 · The design language — "Threshold"

Golens owns a moment: **the threshold**. The site is built around the door →
authentication → welcome sequence.

- **Chapters, not one background:** ink (cinematic dark) ↔ ivory (architectural
  light) alternate — dark hero → light range → dark launch → dark scenarios →
  light shop → light trust → dark security → light answers → dark conversion.
- **Signature motif:** the arched doorway + the vertical light seam (hero door,
  launch plate, compatibility door, result card).
- **Type:** Fraunces (editorial display) + Archivo (UI/body) + ui-monospace for
  technical chips.
- **Motion:** weighted cubic-bezier(.16,1,.3,1) reveals; hero authentication
  timeline (recognise → confirm → grant → open); scroll-scrubbed flagship
  launch; product-transform-per-chapter; `prefers-reduced-motion` fully
  honoured (sticky launch degrades to a readable stack).
- **Colour system:** Ink `#0B0E13` · Ivory `#F6F2E9` · Bronze `#B9975A`
  (restrained metal) · Signal green `#43C98D` (authentication states only).

## 3 · Pages

| Page | Purpose |
|---|---|
| `index.html` | Cinematic hero (door unlocks on load), trust strip + ticker, shop-by-door portals, **7-chapter sticky flagship launch (X95)**, ways-in rail, 4 real-life scenarios, best-sellers, why-buy-direct, more security, honest reviews shell, B2B, FAQ + schema. |
| `locks.html` | Collection with filter chips (door / capability / Wi-Fi / camera / price) over the live catalogue; URL presets `?f=main\|glass\|room\|face\|fp\|wifi\|camera`. |
| `product.html?p=id` | Full PDP: gallery (swipe/zoom-hover), price + save pill, Buy/Add, WhatsApp expert, decision module ("is this the right lock?"), **interactive hotspots**, stories, spec table, install, **live compatibility checker with animated door**, FAQ + schema, related, mobile sticky buy bar. |
| `find-my-lock.html` | **Real recommender**: 6 questions → weighted scoring over catalogue (hard gates for glass/face/fingerprint asks, priority re-weighting, budget ceiling, sold-out penalty). Verified to return different winners for different personas (glass→Armor Face, value→X3N/X39, max-security→Protector X57). |
| `compare.html` | 2–4 locks, grouped for non-technical buyers (ways in / security / smart / fit / install / price). Accepts `?ids=`. |
| `support.html` | Compatibility paths, installation story (both honest paths + real ₹1,200–1,500 range), warranty, 8 FAQs, real contact block (1800-123-7255, WhatsApp, care@golens.in). |
| `business.html` | Builders / architects / hotels / offices + dealer & bulk links (real pages). |

## 4 · Shared systems

`assets/js/app.js` — injected header/mega-menu/mobile-nav/footer, cart drawer,
search overlay (intent-aware: "face", "glass", "under 10000"…), toast, reveal
engine (IntersectionObserver), icon sprite (custom 30-icon line set),
`dataLayer`-ready analytics (`Gtrack`): product_view, add_to_cart, begin_checkout,
whatsapp_click, search, filter, compare, find_my_lock_*, compatibility_check,
hotspot_open, cta_click… all wired via `data-event` attributes (A/B-testable
components).

## 5 · Verified business facts used

- Company: GoLens Import & Export Pvt Ltd, Bikaner · Toll-free 1800-123-7255 ·
  care@golens.in / support@golens.in · WhatsApp +91 99829 87865 (10:30–18:00)
- 2-year standard warranty (X32 lists 1 year) · Easy EMI · video-call support
- Installation: expert paid from ₹1,200 (X95: ₹1,200–1,500, location-based) or
  any carpenter; complimentary post-install on-site support
- Collections preserved: main-door-lock-2, glass-door-lock, room-interior-door-locks,
  cabinet-locks, 3d-face-lock, biometric-lock, all-locks, cameras, dash-cameras,
  attendance-machines, doorbell, deals, become-a-dealer, buy-bulk-discounts…

## 6 · Run it

Static site — any static server:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## 7 · Known honest limits

- Reviews module is a CMS-ready shell — no invented ratings.
- The theme's leftover demo carousel (earbud data) on the live site was
  deliberately **not** reproduced.
- Cart checkout completes on golens.in (official store) — no payment is simulated.
