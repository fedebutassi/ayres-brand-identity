# Typography — AYRES Pet Supply

## Font Families

### Raleway — Headings & UI
- **Source**: Google Fonts
- **Weights loaded**: 300, 400, 500, 600, 700, 800, 900
- **CSS variable**: `--font-h: 'Raleway', sans-serif`
- **Character**: Geometric, elegant, modern sans-serif with distinctive letterforms (note the unique "W" and "A")
- **Used for**: All headings, navigation links, buttons, tags/eyebrows, labels, CTAs

### Poppins — Body Text
- **Source**: Google Fonts
- **Weights loaded**: 300, 400, 500, 600, 700
- **CSS variable**: `--font-b: 'Poppins', sans-serif`
- **Character**: Geometric sans-serif, highly readable, friendly and approachable
- **Used for**: Body paragraphs, descriptions, form inputs, metadata, captions

## Why This Pairing Works

Raleway and Poppins are both geometric sans-serifs but serve different roles:
- **Raleway** brings **elegance and distinction** to headlines with its thinner strokes and wider letterforms
- **Poppins** brings **warmth and readability** to body text with its rounder, more compact forms
- Together they communicate: *premium but approachable*

## Text Hierarchy

### Hero Title
- **Font**: Raleway
- **Weight**: 900 (Black)
- **Size**: `clamp(38px, 7vw, 80px)` — fluid from 38px mobile to 80px desktop
- **Style**: Normal, no uppercase
- **Color**: White (over dark hero overlay)

### Section Titles (H2)
- **Font**: Raleway
- **Weight**: 800-900 (ExtraBold/Black)
- **Size**: `clamp(28px, 4vw, 46px)` — fluid from 28px to 46px
- **Color**: `--dark` (`#3E484E`)

### Tags / Eyebrows (above headings)
- **Font**: Raleway
- **Weight**: 700 (Bold)
- **Size**: 11px
- **Letter-spacing**: 3-4px
- **Transform**: UPPERCASE
- **Color**: `--green` (`#3DB870`)
- **Example**: "NUESTRA EMPRESA", "NUTRICIÓN PREMIUM"

### Navigation Links
- **Font**: Raleway
- **Weight**: 700 (Bold)
- **Size**: 11px
- **Letter-spacing**: 1.5px
- **Transform**: UPPERCASE
- **Color**: `--dark` → hover: `--green`

### Buttons
- **Font**: Raleway
- **Weight**: 700 (Bold)
- **Size**: 11px
- **Letter-spacing**: 2px
- **Transform**: UPPERCASE
- **Padding**: 14px 32px (primary), 13px 28px (secondary)

### Body Text
- **Font**: Poppins
- **Weight**: 400 (Regular)
- **Size**: 15-16px
- **Line-height**: 1.75-1.85
- **Color**: `--text` (`#3E484E`) or `--text-light` (`#7A8A92`)

### Small / Muted Text
- **Font**: Poppins
- **Weight**: 400-500
- **Size**: 12-13px
- **Color**: `--text-light` (`#7A8A92`)

### Form Inputs
- **Font**: Poppins
- **Weight**: 400
- **Size**: 16px (prevents iOS zoom on focus)

## Logo Typography

The logo uses a **custom geometric sans-serif** (not Raleway or Poppins):
- **"AYRES"**: Wide, geometric letterforms with distinctive cuts — the "A" has no crossbar, the "R" has an open counter, the "E" and "S" have unique curves
- **"PET SUPPLY"**: Same typeface, smaller size, wide letter-spacing
- Both in uppercase

## Key Typographic Patterns

### Section Header Pattern
```
[TAG: Raleway 700, 11px, 3-4px spacing, UPPERCASE, green]
↓ 6px gap
[TITLE: Raleway 800-900, clamp(28-46px), dark]
↓ 16px gap
[DESCRIPTION: Poppins 400, 15-16px, line-height 1.75, text-light]
```

### Card Pattern
```
[TITLE: Raleway 700, 18-20px, dark]
[BODY: Poppins 400, 14-15px, text-light, line-height 1.75]
```

### Stat/Metric Pattern
```
[NUMBER: Raleway 800, 36-44px, green or dark]
[LABEL: Poppins 400, 13px, text-light]
```
