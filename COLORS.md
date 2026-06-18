# Color Palette — AYRES Pet Supply

## Design Philosophy

The palette is **restrained and professional**: a single green accent against warm neutral grays. No bright secondary colors. The restraint communicates premium quality and seriousness, while the green anchors everything in nature and health.

## Primary Colors

### Accent Green (Naturaleza)
- **HEX**: `#3DB870`
- **Usage**: The **only** accent color. Used for CTAs, buttons, dividers, badges, links, hover states, and decorative elements.
- **Represents**: Nature, health, vitality, freshness

### Accent Green Dark (Hover)
- **HEX**: `#2A9455`
- **Usage**: Hover state for green buttons and interactive elements

### Green Muted (Decorativo)
- **HEX**: `#82B086`
- **Usage**: Decorative elements, badge/shield details in the footer logo, subtle accents

### Green Forest (Chatbot / Favicon)
- **HEX**: `#2d6a4f`
- **Usage**: Favicon background, chatbot UI primary color. A deeper, more premium green.

## Neutral Colors

### Dark (Primary Text)
- **HEX**: `#3E484E`
- **Usage**: Main text color, headings, dark section backgrounds. This is NOT pure black — it's a warm charcoal with blue undertones.

### Dark 2 (Deepest)
- **HEX**: `#2A3035`
- **Usage**: Top bar, footer background, mobile navigation, deepest dark surfaces

### Text Light (Secondary Text)
- **HEX**: `#7A8A92`
- **Usage**: Secondary/muted text, descriptions, captions, metadata

### Background Light
- **HEX**: `#F5F4F2`
- **Usage**: Light section backgrounds (contact, alternating sections). Note: this is NOT pure white — it has a **warm cream/stone undertone**.

### Background Off
- **HEX**: `#ECEAE7`
- **Usage**: Alternative backgrounds, card borders, distributor chips. Slightly darker than bg-light, same warm tone.

### White
- **HEX**: `#FFFFFF`
- **Usage**: Main body background, card surfaces, header

## Shadows (Color-Tinted)

| Element | Shadow Color | Value |
|---|---|---|
| Primary button hover | `rgba(61,184,112, 0.35)` | Green-tinted glow |
| Dark button hover | `rgba(42,48,53, 0.25)` | Dark neutral glow |
| Hero overlay | `rgba(42,48,53, 0.85)` | Deep dark overlay |
| Chatbot float | `rgba(61,184,112, 0.45)` | Strong green glow |
| Cards hover | `rgba(0,0,0, 0.11)` | Neutral subtle lift |
| Contact form | `rgba(0,0,0, 0.07)` | Very subtle elevation |

## Gradients

### Hero Overlay
```css
linear-gradient(120deg, rgba(42,48,53,.85) 0%, rgba(42,48,53,.45) 55%, rgba(42,48,53,.1) 100%)
```
Dark overlay that fades from opaque left to transparent right — text legibility over hero image.

### Pet Section Overlays
```css
/* Dogs (left-to-right) */
linear-gradient(135deg, rgba(42,48,53,.72) 0%, rgba(42,48,53,.3) 100%)

/* Cats (right-to-left) */
linear-gradient(225deg, rgba(42,48,53,.72) 0%, rgba(42,48,53,.3) 100%)
```

### Quality Section Glow
```css
radial-gradient(circle, rgba(61,184,112,.13) 0%, transparent 70%)
```
Subtle green radial glow behind quality content.

## Dark Mode

Full dark mode support via `data-theme="dark"` attribute:

| Token | Light | Dark |
|---|---|---|
| `--bg-light` | `#F5F4F2` | `#1C2126` |
| `--bg-off` | `#ECEAE7` | `#161B1F` |
| `--white` | `#FFFFFF` | `#1A1F23` |
| `--text` | `#3E484E` | `#BDC9D0` |
| `--text-light` | `#7A8A92` | `#5C6E78` |
| Body background | `#FFFFFF` | `#141A1E` |
| Headings | `#3E484E` | `#D8E6EC` |
| Input borders | inherited | `#2A3338` |
| Card hover | inherited | `#212930` |

**Note**: The accent green `#3DB870` remains **unchanged** in dark mode — it's the constant anchor across both themes.

## Color Usage Rules

1. **Green is the ONLY accent** — never introduce secondary colors (no orange, blue, red for decoration)
2. **Text is warm charcoal** (`#3E484E`), never pure black `#000000`
3. **Backgrounds are warm** (`#F5F4F2`), never pure white `#FFFFFF` for section alternation
4. **Overlays use the dark base** (`#2A3035`) at varying opacity, never pure black
5. **Shadows are subtle** — the design is flat-ish with minimal elevation
6. **Green button glow** on hover creates a signature "living" feel
