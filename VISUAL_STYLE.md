# Visual Style — AYRES Pet Supply

## Design Philosophy

**Minimalist, professional, and restrained.** The design communicates premium quality through subtlety — clean surfaces, generous whitespace, a single accent color, and sharp geometric typography. No visual noise, no competing colors, no excessive decoration.

The aesthetic sits between a **premium consumer brand** and a **professional B2B platform**.

## Border Radius

| Element | Radius | Notes |
|---|---|---|
| Buttons | `3px` | Nearly rectangular — sharp, professional |
| Content cards | `3-4px` | Very subtle rounding |
| Product cards | `8px` | Slightly softer for product browsing |
| Chatbot panel | `16px` | More rounded for friendly feel |
| Chatbot messages | `14px` | Bubble-like |
| Chatbot buttons | `10px` | Tappable targets |
| Circular icons | `50%` | Perfect circles |
| Badges | `100px` | Pill shape |
| Favicon | `72px` | Squircle |

**Design rule**: The main site uses **very low radius** (3-4px) for a sharp, premium feel. Only the chatbot uses rounder shapes to feel more conversational and approachable.

## Shadows

### Elevation Levels

| Level | Value | Usage |
|---|---|---|
| Resting | `0 2px 18px rgba(0,0,0,.06)` | Cards at rest |
| Hover | `0 14px 40px rgba(0,0,0,.11)` | Cards on hover |
| Form | `0 4px 32px rgba(0,0,0,.07)` | Contact form container |
| Header scroll | `0 2px 30px rgba(0,0,0,.1)` | Fixed header after scrolling |
| Badge | `0 16px 48px rgba(42,48,53,.35)` | Nosotros badge/stat |
| Green glow | `0 10px 28px rgba(61,184,112,.35)` | Primary button hover |
| Dark glow | `0 10px 28px rgba(42,48,53,.25)` | Dark button hover |
| Chatbot float | `0 4px 20px rgba(61,184,112,.45)` | Floating chatbot button |
| Chatbot panel | `0 8px 32px rgba(0,0,0,.18)` | Chatbot popup |
| Lightbox | `0 8px 48px rgba(0,0,0,.7)` | Image lightbox overlay |

**Signature**: The **green glow shadow** on primary buttons is a distinctive brand touch — buttons seem to emit a soft green light on hover.

## Animations

### Entrance — Scroll Reveal
```css
/* Elements start invisible and offset */
opacity: 0;
transform: translateY(22px);

/* Revealed on scroll */
opacity: 1;
transform: translateY(0);
transition: opacity .55s ease, transform .55s ease;

/* Staggered delay per element */
transition-delay: calc(idx * 60ms);
```

### Entrance — Hero fadeUp
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Duration: 0.7s, delays: 0.3s, 0.5s, 0.7s, 0.9s (staggered) */
```

### Hero Slider
```css
transform: .95s cubic-bezier(.77, 0, .18, 1);
/* Smooth, slightly dramatic slide transition */
```

### Hover Effects
```css
/* Buttons */
transform: translateY(-2px);  /* Subtle lift */
box-shadow: 0 10px 28px rgba(61,184,112,.35);  /* Green glow */

/* Cards */
transform: translateY(-5px);  /* More pronounced lift */
box-shadow: 0 14px 40px rgba(0,0,0,.11);  /* Shadow expansion */
```

### Pet Split Background
```css
transform: scale(1.05);  /* Subtle zoom on hover */
transition: transform .8s cubic-bezier(.25,.46,.45,.94);
```

### Chatbot
```css
/* Panel slide-in */
opacity: 0 → 1;
transform: translateY(16px) → translateY(0);
transition: .22s ease;
```

### Coming Soon Pulse
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50%      { transform: scale(0.7); opacity: 0; }
}
/* Duration: 1.6s infinite */
```

### Global Transition
```css
--ease: 0.3s ease;
/* Applied to most interactive elements */
```

## Layout & Spacing

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 28px;
```

### Section Spacing (responsive)
| Breakpoint | Vertical Padding |
|---|---|
| Desktop | `110px 0` |
| Tablet (≤900px) | `72px 0` |
| Mobile (≤600px) | `56px 0` |

### Grid Gaps
| Context | Gap |
|---|---|
| Content cards | `26px` |
| Two-column sections | `90px` |
| Footer columns | `48px` |
| Product cards | `24px` |

### Common Spacing Values
- Tag to title: `6px`
- Title to description: `16px`
- Section header to content: `48-64px`
- Between cards in a list: `26px`
- Button padding: `14px 32px` (primary), `13px 28px` (secondary)

## Decorative Elements

### Section Divider
A short green line used as a visual separator:
```css
width: 42px;
height: 3px;
background: var(--green); /* #3DB870 */
```

### Tag/Eyebrow Labels
Small uppercase green text above section titles:
```css
font-family: var(--font-h); /* Raleway */
font-weight: 700;
font-size: 11px;
letter-spacing: 3-4px;
text-transform: uppercase;
color: var(--green);
```

### Quality Section Radial Glow
```css
radial-gradient(circle, rgba(61,184,112,.13) 0%, transparent 70%)
/* Subtle green ambient glow behind quality content */
```

## Image Treatment

### Hero
- Full-width background image with **dark gradient overlay** (left-heavy: 85% opacity → 10% opacity)
- Text always on the left over the opaque part of the overlay

### Pet Split Section (Dogs/Cats)
- Two-column split with background images
- Each side has a directional gradient overlay (dogs: 135deg, cats: 225deg)
- Images scale subtly on hover (`transform: scale(1.05)`)

### Product Images
- Clean product photography on white/transparent backgrounds
- Displayed in cards with subtle shadow
- WebP format with PNG fallback

### Lightbox
- Full-screen overlay with strong dark shadow (`rgba(0,0,0,.7)`)
- Image centered with max-width/max-height constraints

## Icon Style

- **No icon library** — minimal use of icons
- Custom geometric line icons where needed
- The dog silhouette isotipo is the primary visual mark
- Stats use the number itself as the visual element (large Raleway 800 type)

## Button Variants

### Primary (Green)
```css
background: var(--green);        /* #3DB870 */
color: #fff;
border: none;
border-radius: 3px;
padding: 14px 32px;
font: Raleway 700, 11px, uppercase, 2px letter-spacing;
/* Hover: */
background: var(--green-dark);   /* #2A9455 */
transform: translateY(-2px);
box-shadow: 0 10px 28px rgba(61,184,112,.35);
```

### Secondary (Dark)
```css
background: var(--dark);         /* #3E484E */
color: #fff;
border: none;
border-radius: 3px;
padding: 13px 28px;
/* Hover: */
background: var(--dark-2);      /* #2A3035 */
transform: translateY(-2px);
box-shadow: 0 10px 28px rgba(42,48,53,.25);
```

### Outline (Ghost)
```css
background: transparent;
color: var(--dark);
border: 2px solid var(--dark);
border-radius: 3px;
/* Hover: */
background: var(--dark);
color: #fff;
```
