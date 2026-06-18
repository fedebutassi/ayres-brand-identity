# Logo — AYRES Pet Supply

## Logo Variants

AYRES has **three logo variants**, each available in SVG, PNG, and WebP formats.

---

### 1. Primary Logo (Horizontal)

**Files**: `assets/logo-light.svg`, `assets/logo-light.png`

**Description**: Horizontal layout with isotipo (icon) on the left and wordmark on the right.

- **Isotipo**: A geometric, angular silhouette of a **dog's head and chest** formed by straight lines, resembling a mountain/triangle shape. The dog profile faces right, with pointed ears and a subtle snout curve. The design is minimalist, using only outlines (stroke-based, no fill).
- **Wordmark**: "AYRES" in a custom geometric sans-serif with distinctive letterforms — the "A" lacks a crossbar, the "Y" has a high junction, the "R" has an open bowl, and the "S" and "E" have unique geometric cuts.
- **Subtitle**: "PET SUPPLY" below "AYRES" in the same typeface, smaller, with wide letter-spacing.
- **Color**: Solid near-black `rgb(29,29,27)` / approximately `#1D1D1B`
- **Background**: Transparent

**Usage**: Header/navbar on light backgrounds. Height: 60px desktop, 42px mobile.

---

### 2. Night Logo (Horizontal — Dark Mode)

**Files**: `assets/logo-dark.svg`, `assets/logo-dark.png`

**Description**: Identical layout to the primary logo but in **white** for use on dark backgrounds.

- **Color**: `#FFFFFF`
- **Background**: Transparent

**Usage**: Header/navbar when dark mode is active. Swapped via CSS: `[data-theme="dark"] .logo-light { display:none }`.

---

### 3. Badge Logo (Vertical — Footer)

**Files**: `assets/logo-badge.svg`, `assets/logo-badge.png`

**Description**: Vertical badge/shield format inside a **hexagonal shape**.

- **Outer border**: Hexagonal outline in dark gray (`#3E484E` / `rgb(62,72,78)`)
- **Inner white border**: White stroke creating a double-border effect
- **Top triangle**: Green muted (`#82B086` / `rgb(130,176,134)`) triangle inside the hexagon top, with "est. 2025" text in dark gray
- **Center**: "AYRES" in large geometric type, dark gray
- **Bottom band**: Green muted horizontal bar with "PET SUPPLY" in dark gray, wide letter-spacing
- **Overall feel**: Heritage badge / quality seal / certification mark

**Usage**: Footer. Communicates establishment, tradition, and certified quality.

---

## Favicon

**Files**: `assets/favicon.svg`, `assets/favicon.png`

**Description**: Rounded rectangle (72px radius) with:
- **Background**: Forest green `#2d6a4f`
- **Icon**: White version of the dog isotipo (same geometric dog silhouette as the main logo)
- **Size**: 528×418 viewBox

---

## Logo Color Summary

| Variant | Primary Color | Accent Color |
|---|---|---|
| Light (header) | `#1D1D1B` (near-black) | — |
| Dark (header) | `#FFFFFF` (white) | — |
| Badge (footer) | `#3E484E` (dark gray) | `#82B086` (muted green) |
| Favicon | `#FFFFFF` (white icon) | `#2d6a4f` (forest green bg) |

## Usage Rules

1. The primary logo is **always horizontal** — never stack the isotipo above the wordmark for header use
2. The badge logo is **exclusively for footer** or certification/stamp contexts
3. **Never** place the light logo on dark backgrounds or vice versa — use the correct variant
4. Maintain **generous padding** around all logo variants
5. The isotipo (dog icon) can be used **standalone** only for the favicon or very small UI elements
6. **Never** alter the proportions or add effects (shadows, glows, outlines) to the logo
7. Minimum height: 40px for digital use
8. The logo works purely as a **silhouette** — no gradients, no multi-color fills
