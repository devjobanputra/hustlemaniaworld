# DESIGN.md — Hustle Mania Spatial Design System

> **Codename:** Obsidian Frost
> **Creative North Star:** "Aggressive Etherealism"
> **Version:** 2.0 — 3D-First Spatial Rebuild
> **Generated via:** Stitch MCP (Project: `2895288990282322860`)
> **Stitch Screens:**
>   - Homepage: `d157f0b4df074316b707184367806193`
>   - Product Detail: `765dc98d4933456e8ddfb6a5873d2892`
> **Design System Asset:** `assets/8828611f11884d878fe7a211a3f1ae70`
> **Date:** April 15, 2026

---

## 0. Core Philosophy — 3D First

**This UI does not have a background.** The background IS a live WebGL 3D scene (React Three Fiber). Every HTML panel, navbar, and card is a floating glass overlay that sits above the 3D canvas. All design decisions flow from this single principle.

**The question is never "what background color?" — it is always "how transparent should this glass be?"**

---

## 1. Overview

"Obsidian Frost" bridges the high-fidelity translucent depth of spatial computing (Apple Vision Pro) with the raw, unapologetic rigidity of brutalist streetwear culture. We use **zero-radius geometry**, **translucent glass surfaces**, and **intentional asymmetry**. Layouts feel like a series of obsidian monoliths floating in a pressurized void.

---

## 2. Z-Index Architecture (3D Layer Contract)

| z-index | Layer | Component | Rule |
|---------|-------|-----------|------|
| `0` | **3D World** | `GlobalCanvas` (WebGL) | Fixed, full-viewport, `pointer-events: none` |
| `10` | **UI Root** | `layout.tsx` wrapper div | Relative, all UI lives here |
| `40` | **Mobile Menu** | Mobile overlay | Full-screen obsidian frost |
| `50` | **Navbar** | `Navbar.tsx` | Sticky, always glassmorphic |
| `99` | **Cart Backdrop** | CartDrawer backdrop | `pointer-events: auto` only when open |
| `100` | **Cart Panel** | `CartDrawer.tsx` | Slides in from right |

---

## 3. Spatial Glass Tokens

The core design innovation. CSS classes replace all solid backgrounds.

### Primary Glass Surfaces

| Class | Formula | Usage |
|-------|---------|-------|
| `.glass-obsidian` | `rgba(13,13,13, 0.78)` + blur(32px) | Navbar, top-level modals |
| `.glass-panel` | `rgba(26,25,25, 0.65)` + blur(20px) | Product cards, info panels |
| `.glass-subtle` | `rgba(20,19,19, 0.50)` + blur(12px) | Inner nesting, secondary panels |
| `.glass-drawer` | `rgba(14,14,14, 0.92)` + blur(40px) | Cart drawer, deep panels |

### Ghost Borders

All glass panels use ghost borders — never solid outlines.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-glass-border` | `rgba(255,59,48, 0.18)` | Standard panel border |
| `--color-glass-border-subtle` | `rgba(255,59,48, 0.08)` | Inner/nested borders |
| `--color-glass-glow` | `rgba(255,59,48, 0.12)` | Ambient red glow on active elements |

### Ambient Glow

```css
/* Floating active element glow — like red neon on glass */
.glow-red       { box-shadow: 0 12px 40px rgba(255,59,48, 0.12); }
.glow-red-strong { box-shadow: 0 0 24px rgba(255,59,48, 0.25), 0 0 8px rgba(255,59,48, 0.4); }
```

---

## 4. Color Palette

### Core Tokens (unchanged from v1 — Obsidian Edge foundation)

| Token | Hex | Spatial Usage |
|-------|-----|---------------|
| `--color-hm-void` | `#0D0D0D` | Glass base color |
| `--color-hm-bg` | `#131313` | Body background (shows through glass) |
| `--color-hm-brand-red` | `#FF3B30` | Only fully opaque/solid element |
| `--color-hm-on-surface` | `#E5E2E1` | Primary text |
| `--color-hm-text-muted` | `rgba(255,180,170, 0.60)` | Metadata, secondary labels |

### New Spatial Tokens (v2)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-glass-base` | `rgba(13,13,13, 0.78)` | Obsidian frost background |
| `--color-glass-panel` | `rgba(26,25,25, 0.65)` | Floating product panels |
| `--color-glass-border` | `rgba(255,59,48, 0.18)` | Ghost red border |

### The Red Rule

`#FF3B30` is the **only** fully solid (opaque) color in the system. It is used exclusively for:
- Primary CTA buttons (`.btn-primary`)
- Product price display (`.text-price`)
- Badge labels (BEST SELLER, NEW DROP)
- The Strike vertical line
- Annotation dot glow pulses

**Everything else is translucent.**

---

## 5. Typography

**Font:** Inter (all weights 400–900)

| Class | Weight | Size | Transform | Tracking | Notes |
|-------|--------|------|-----------|----------|-------|
| `.text-display-lg` | 900 | clamp(3.5rem → 7rem) | UPPERCASE | -0.04em | Hero headlines |
| `.text-display-md` | 700 | clamp(2.25rem → 4.5rem) | UPPERCASE | -0.03em | Section statements |
| `.text-headline-lg` | 700 | clamp(1.75rem → 3rem) | UPPERCASE | -0.02em | Section titles |
| `.text-headline-md` | 600 | clamp(1.25rem → 2rem) | UPPERCASE | -0.01em | Sub-titles |
| `.text-label-lg` | 500 | 0.875rem | UPPERCASE | +0.06em | Buttons, nav links |
| `.text-label-md` | 500 | 0.75rem | UPPERCASE | +0.09em | Tags, badges |
| `.text-label-sm` | 500 | 0.65rem | UPPERCASE | +0.11em | Technical specs |
| `.text-price` | 900 | clamp(1.25rem → 2rem) | Normal | -0.02em | Product prices, in `#FF3B30` |
| `.text-muted` | — | inherit | — | — | `rgba(255,180,170, 0.60)` |

### Typography Rules (Spatial)

- **Display and labels are ALWAYS ALL CAPS** — monolithic blocks
- **Body text uses sentence case** — provides breathing room against loud headlines
- **"Drastic Scale"** — pair display-lg with label-sm in close proximity for editorial tension
- **Text overlaps glass** — text blocks are allowed to slightly overlap glass panel edges (spatial depth)

---

## 6. Spatial Components

### `.btn-primary` — The Only Solid Element
```css
background: #FF3B30;        /* ONLY fully opaque/solid color */
color: #FFFFFF;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.06em;
border-radius: 0;           /* ZERO. Always. */
padding: 1rem 2rem;
transition: background 150ms ease-out;

hover: background → #690003, color → #FFB4AA
```

### `.btn-ghost` — Outline/Secondary CTA
```css
background: transparent;
border: 1px solid rgba(255,59,48, 0.4);   /* Ghost red border */
color: #E5E2E1;
border-radius: 0;

hover: border-color → #FF3B30, color → #FF3B30, bg → rgba(255,59,48,0.06)
```

### `.product-card` — Floating Glass Panel
```css
background: rgba(26,25,25, 0.65);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,59,48, 0.15);
border-radius: 0;
transition: transform 200ms, border-color 200ms, box-shadow 200ms;

hover: translateY(-6px) + border-color → rgba(255,59,48,0.35) + glow-red
```

### `.size-chip` — Size Selector (Square, Sharp)
```css
/* Default */
width: 44px; height: 44px;
background: rgba(42,42,42, 0.9);
border: 1px solid rgba(255,59,48, 0.15);
border-radius: 0;

/* Active */
background: #FF3B30;
color: #FFFFFF;

/* Sold Out */
opacity: 0.28;
pointer-events: none;
text-decoration: line-through;
```

### `.annotation-dot` — Spatial AR Label
```css
width: 10px; height: 10px;
background: #FF3B30;
border-radius: 50%;         /* Circle dot ONLY — exception to zero-radius rule */
animation: glow-pulse 2.4s ease-in-out infinite;
```
> The dot itself is circular, but its callout label panel uses 0px radius.

### `.input-spatial` — Underline Input
```css
background: rgba(26,25,25, 0.5);
border: none;
border-bottom: 1px solid rgba(255,59,48, 0.25);
border-radius: 0;

focus: border-bottom-color → #FF3B30
```

---

## 7. Animation Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| Hover transitions | 150ms | ease-out | Buttons, cards — "snappy" |
| Page fade-in | 300ms | ease-out | Route transitions |
| Cart slide-in | 250ms | ease-out | Drawer open |
| Scroll reveal | 400ms | ease-out | Section entrance |
| Card float hover | 200ms | ease-out | Product card lift |
| Badge pulse | 600ms | ease-in-out | Item added to cart |
| Skeleton shimmer | 1.5s | linear, ∞ | Loading states |
| Glow pulse | 2.4s | ease-in-out, ∞ | Annotation dot, live indicator |
| Marquee | 22s | linear, ∞ | Brand strip |

### Animation Rules (Spatial)
- **Snappy > Smooth** — 150ms for interactions, not 300ms. Aggressive brand persona.
- **`transform` + `opacity` only** — GPU-accelerated, never layout-affecting props
- **No "playful" easing** — linear or ease-out. No springs, no bounces.

---

## 8. Layout & Spacing

| Property | Value |
|----------|-------|
| Max content width | `1440px` |
| Edge padding (desktop) | `64px` |
| Edge padding (mobile) | `16-24px` |
| Grid gap | `20px` (mobile) / `20px` (desktop) |
| Product grid | 1 → 2 → 4 col (home featured) / 1 → 2 → 3 col (new arrivals) |

### The Strike
A single, vertical red line `2px` wide, using a gradient fade (transparent → #FF3B30 → transparent). It connects sections and leads the eye downward. Placed at left-8 (mobile) / left-16 (desktop) of section containers.

```css
.the-strike {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #FF3B30 20%, #FF3B30 80%, transparent);
  opacity: 0.6;
}
```

---

## 9. Strict Spatial Rules

### DO
- ✅ Use glassmorphism for ALL UI panels — the 3D canvas must breathe through
- ✅ Use `#FF3B30` brand red as the ONLY solid color
- ✅ Use ghost borders (`rgba(255,59,48, 0.18)`) — never solid borders
- ✅ Use "The Strike" to connect sections vertically
- ✅ Keep all interactions snappy (150ms ease-out)
- ✅ Use drastic scale contrast (display-lg next to label-sm)
- ✅ Let text overlap glass panel edges for spatial depth
- ✅ Use `font-weight: 900` for display text
- ✅ Use uppercase for all display, headline, and label text

### DON'T
- ❌ Never use `border-radius` > 0 (only exception: annotation dot circles)
- ❌ Never use solid dark backgrounds that block the 3D canvas
- ❌ Never use box shadows for depth — use glass + glow instead
- ❌ Never use grey — all neutrals must be tinted with obsidian or brand red
- ❌ Never use image backgrounds in hero sections — the 3D canvas IS the background
- ❌ Never use 1px solid borders for sectioning — use tonal glass shifts
- ❌ Never center long-form text — left-aligned only
- ❌ Never use slow/bouncy animations — 150ms ease-out maximum

---

## 10. Stitch MCP Screen References

| Screen | ID | Description |
|--------|----|-------------|
| **Spatial Homepage** | `d157f0b4df074316b707184367806193` | HUD hero, floating product strip, manifesto |
| **Spatial Product Detail** | `765dc98d4933456e8ddfb6a5873d2892` | Split 3D canvas + left/right glass panels |

---

*Last updated: April 15, 2026*
*Design System v2.0 — 3D-First Rebuild*
*Source: Stitch MCP — Obsidian Frost Spatial System*
